import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  CheckIcon,
  ClipboardIcon,
  Icon,
  ShieldIcon,
  SparkIcon,
} from "@/components/icons";
import { getTest, tests } from "@/lib/tests";

export function generateStaticParams() {
  return tests.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  props: PageProps<"/tests/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const test = getTest(slug);
  if (!test) return {};
  return { title: test.name, description: test.tagline };
}

export default async function TestPage(props: PageProps<"/tests/[slug]">) {
  const { slug } = await props.params;
  const test = getTest(slug);
  if (!test) notFound();

  const others = tests.filter((t) => t.slug !== test.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="pointer-events-none absolute -right-24 -top-10 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="flex flex-wrap items-center gap-3 text-sm font-semibold text-ink/60">
              <span className={`inline-flex rounded-xl p-2 ${test.tint}`}>
                <Icon name={test.icon} className="h-5 w-5" />
              </span>
              <span>{test.minutes} minutes</span>
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>{test.questions.length} questions</span>
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span className="text-brand-600">100% free</span>
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {test.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
              {test.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/tests/${test.slug}/take`}
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Start the test <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink/50">
              <ShieldIcon className="h-4 w-4 text-brand-500" />
              Answers are scored in your browser — only an anonymous result is
              saved.
            </p>
          </div>

          {/* Animated measure card in place of a product photo */}
          <div className="rounded-3xl border border-brand-100 bg-white p-7 shadow-xl shadow-brand-900/5">
            <p className="flex items-center gap-2 text-sm font-bold text-ink">
              <ClipboardIcon className="h-5 w-5 text-brand-600" />
              This test measures
            </p>
            <ul className="mt-4 space-y-3">
              {test.measures.map((m, i) => (
                <li
                  key={m}
                  className={`flex animate-fade-up items-start gap-3 delay-${(i + 1) * 100}`}
                >
                  <span className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-ink/70">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          About this test
        </h2>
        {test.description.map((p) => (
          <p key={p.slice(0, 32)} className="mt-4 leading-relaxed text-ink/70">
            {p}
          </p>
        ))}
      </section>

      {/* What you'll see in results */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">
            {test.kind === "axes"
              ? "The four dimensions"
              : "What your results cover"}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {test.kind === "axes" &&
              test.axes?.map((axis) => (
                <div
                  key={axis.id}
                  className="rounded-3xl bg-white p-6 shadow-sm"
                >
                  <p className="font-mono text-sm font-bold text-brand-600">
                    {axis.left.code} / {axis.right.code}
                  </p>
                  <h3 className="mt-1 font-bold text-ink">
                    {axis.left.label} vs. {axis.right.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {axis.left.blurb} Or — {axis.right.blurb.toLowerCase()}
                  </p>
                </div>
              ))}
            {test.kind === "scales" &&
              test.scales?.map((s) => (
                <div key={s.id} className="rounded-3xl bg-white p-6 shadow-sm">
                  <span className={`inline-flex rounded-xl p-2.5 ${test.tint}`}>
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-bold text-ink">{s.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {s.blurb}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA + related */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white">
          <SparkIcon className="mx-auto h-8 w-8 animate-pulse-soft text-accent-300" />
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Ready when you are
          </h2>
          <p className="mx-auto mt-2 max-w-md text-brand-100/90">
            {test.questions.length} questions. {test.minutes} minutes. A clearer
            picture of yourself.
          </p>
          <Link
            href={`/tests/${test.slug}/take`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 transition hover:bg-brand-50"
          >
            Start the test <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>

        <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-ink">
          You might also like
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {others.map((t) => (
            <Link
              key={t.slug}
              href={`/tests/${t.slug}`}
              className="group rounded-3xl border border-brand-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className={`inline-flex rounded-2xl p-3 ${t.tint}`}>
                <Icon name={t.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-bold text-ink group-hover:text-brand-700">
                {t.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-ink/50">
                {t.minutes} min · Free
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
