import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckIcon,
  Icon,
  LeafIcon,
  SparkIcon,
} from "@/components/icons";
import {
  getPersonalityType,
  personalityTypes,
  typeGroups,
} from "@/lib/personality-types";

export function generateStaticParams() {
  return personalityTypes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  props: PageProps<"/personality-types/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const type = getPersonalityType(slug);
  if (!type) return {};
  return {
    title: `${type.code} — ${type.name}`,
    description: type.summary,
  };
}

export default async function TypePage(
  props: PageProps<"/personality-types/[slug]">
) {
  const { slug } = await props.params;
  const type = getPersonalityType(slug);
  if (!type) notFound();

  const group = typeGroups[type.group];
  const siblings = personalityTypes.filter(
    (t) => t.group === type.group && t.slug !== type.slug
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span
            className={`inline-flex animate-float rounded-3xl p-5 ${type.tint}`}
          >
            <Icon name={type.icon} className="h-12 w-12" />
          </span>
          <p className="mt-6 font-mono text-lg font-extrabold tracking-[0.3em] text-brand-600">
            {type.code}
          </p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {type.name}
          </h1>
          <p className={`mx-auto mt-4 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider ${group.tint}`}>
            {group.label}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            {type.summary}
          </p>
        </div>
      </section>

      {/* Detail */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          Inside the {type.name.replace("The ", "")} mind
        </h2>
        {type.detail.map((p) => (
          <p key={p.slice(0, 32)} className="mt-4 leading-relaxed text-ink/70">
            {p}
          </p>
        ))}
      </section>

      {/* Strengths / growth */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="flex items-center gap-2.5 text-lg font-bold text-ink">
              <span className="rounded-xl bg-brand-100 p-2 text-brand-700">
                <SparkIcon className="h-5 w-5" />
              </span>
              Signature strengths
            </h3>
            <ul className="mt-5 space-y-3">
              {type.strengths.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-ink/70">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="flex items-center gap-2.5 text-lg font-bold text-ink">
              <span className="rounded-xl bg-accent-100 p-2 text-accent-600">
                <LeafIcon className="h-5 w-5" />
              </span>
              Growth edges
            </h3>
            <ul className="mt-5 space-y-3">
              {type.growth.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-full bg-accent-100 p-1 text-accent-600">
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-ink/70">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-ink">
          <span className="rounded-xl bg-sky-100 p-2 text-sky-700">
            <BriefcaseIcon className="h-6 w-6" />
          </span>
          Careers where {type.code}s thrive
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {type.careers.map((c) => (
            <span
              key={c}
              className="rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink/80 transition hover:border-brand-400 hover:bg-brand-50"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink/60">
          Wondering how your interests line up? The{" "}
          <Link
            href="/tests/career-explorer"
            className="font-semibold text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700"
          >
            Career Interest Explorer
          </Link>{" "}
          maps your top work themes in about nine minutes.
        </p>
      </section>

      {/* CTA + siblings */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Not sure {type.code} is you?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-brand-100/90">
            Take the free assessment and find out in about ten minutes.
          </p>
          <Link
            href="/tests/personality-type"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 transition hover:bg-brand-50"
          >
            Take the test <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>

        <h2 className="mt-14 text-xl font-extrabold tracking-tight text-ink">
          Other {group.label}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {siblings.map((t) => (
            <Link
              key={t.slug}
              href={`/personality-types/${t.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className={`rounded-xl p-2.5 ${t.tint}`}>
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-mono text-xs font-bold text-ink/40">
                  {t.code}
                </span>
                <span className="block text-sm font-bold text-ink group-hover:text-brand-700">
                  {t.name}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
