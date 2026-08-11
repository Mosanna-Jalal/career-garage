import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, Icon, SparkIcon } from "@/components/icons";
import { FrameworkScene } from "@/components/decor";
import { frameworks, getFramework } from "@/lib/frameworks";

export function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(
  props: PageProps<"/career-road-map/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const framework = getFramework(slug);
  if (!framework) return {};
  return { title: framework.label, description: framework.intro[0] };
}

export default async function FrameworkPage(
  props: PageProps<"/career-road-map/[slug]">
) {
  const { slug } = await props.params;
  const framework = getFramework(slug);
  if (!framework) notFound();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <div>
            <p className="inline-flex animate-pop-in items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
              {framework.eyebrow}
            </p>
            <h1 className="mt-6 animate-reveal-up text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              {framework.headline}{" "}
              <span className="text-brand-600">{framework.headlineAccent}</span>
            </h1>
            {framework.intro.map((p, i) => (
              <p
                key={p}
                className="mt-5 animate-reveal-up leading-relaxed text-ink/70"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                {p}
              </p>
            ))}

            <div className="mt-7 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                What it measures
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/75">
                {framework.whatItMeasures}
              </p>
            </div>

            {framework.relatedTest && (
              <Link
                href={framework.relatedTest.href}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
              >
                {framework.relatedTest.label}
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            )}
          </div>

          <div className="mx-auto hidden lg:block">
            <FrameworkScene nodes={framework.nodes} />
          </div>
        </div>
      </section>

      {/* ============ ITEMS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          The {framework.items.length} {framework.itemNoun}s
        </h2>

        <div className="stagger mt-10 grid gap-6 lg:grid-cols-2">
          {framework.items.map((item) => (
            <article
              key={item.code}
              className="hover-lift flex flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-sm hover:shadow-xl hover:shadow-brand-900/10"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold ${item.tint}`}
                >
                  {item.code}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-ink">{item.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-brand-600">
                    {item.tagline}
                  </p>
                </div>
                <span className={`ml-auto rounded-xl p-2.5 ${item.tint}`}>
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {item.description}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
                    Strengths
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {item.strengths.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm text-ink/70"
                      >
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
                    Growth edges
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {item.growth.map((g) => (
                      <li
                        key={g}
                        className="flex items-start gap-2 text-sm text-ink/70"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 border-t border-brand-100 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
                  Careers where this fits
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.careers.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-ink/65"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ OTHER FRAMEWORKS ============ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">
            Explore another framework
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/personality-types"
              className="rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              The 16 Personality Types
            </Link>
            {frameworks
              .filter((f) => f.slug !== framework.slug)
              .map((f) => (
                <Link
                  key={f.slug}
                  href={`/career-road-map/${f.slug}`}
                  className="rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                >
                  {f.label}
                </Link>
              ))}
          </div>

          <p className="mt-8 text-sm leading-relaxed text-ink/60">
            No single framework describes a person completely. Read two or three
            and notice where they agree — that overlap is usually the most
            useful thing to act on.
          </p>
        </div>
      </section>
    </>
  );
}
