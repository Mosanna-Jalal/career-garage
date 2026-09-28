import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon } from "@/components/icons";
import { DoodleField, RunningKid } from "@/components/doodles";
import { Reveal } from "@/components/reveal";
import { assessmentCategories, assessments } from "@/lib/assessments/catalog";
import { tests } from "@/lib/tests";

export const metadata: Metadata = {
  title: "Psychometric Assessments",
  description:
    "Twelve original Career Garage assessments — personality, motivation, interests, values, work style, aptitude, learning and readiness — each with a free demo.",
};

const counts: Record<string, number> = Object.fromEntries(
  assessments.map((a) => [a.slug, a.range[1] - a.range[0] + 1])
);

export default function TestsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <DoodleField variant="hero" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:px-6">
          <p className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            12 assessments · free demo on every one
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Psychometric assessments
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
            Original Career Garage instruments built from our handbooks. Try any demo in a couple of minutes, then
            take the full assessment for your complete report.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 overflow-hidden sm:block" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-2 border-b-2 border-dashed border-brand-100" />
          <div className="absolute bottom-3 left-0 animate-run-across [animation-duration:18s] [animation-iteration-count:infinite]">
            <RunningKid className="h-12 w-9" shirt="#fe4711" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {assessmentCategories.map((cat) => (
          <Reveal key={cat.id} className="mt-14 first:mt-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">{cat.label}</h2>
            <p className="mt-1 text-ink/60">{cat.blurb}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assessments
                .filter((a) => a.category === cat.id)
                .map((a) => (
                  <Link
                    key={a.slug}
                    href={`/tests/${a.slug}`}
                    className="hover-bounce group relative flex flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white p-7 shadow-sm hover:shadow-xl hover:shadow-brand-900/10"
                  >
                    <span
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 transition group-hover:scale-125"
                      style={{ background: a.color }}
                      aria-hidden="true"
                    />
                    <span className={`inline-flex w-fit rounded-2xl p-3.5 ${a.tint} transition group-hover:scale-110`}>
                      <Icon name={a.icon} className="h-7 w-7" />
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-ink group-hover:text-brand-700">{a.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/60">{a.tagline}</p>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <p className="flex items-center gap-3 text-xs font-semibold text-ink/50">
                        <span>{counts[a.slug]} questions</span>
                        <span className="h-1 w-1 rounded-full bg-ink/30" />
                        <span>{a.minutes} min</span>
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2">
                        Explore <ArrowRightIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </Reveal>
        ))}
      </section>

      {tests.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">More quick tests</h2>
            <p className="mt-1 text-ink/60">Short, free reflections with instant results.</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tests.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tests/${t.slug}`}
                  className="group flex items-center gap-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className={`inline-flex rounded-2xl p-3 ${t.tint}`}>
                    <Icon name={t.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-bold text-ink group-hover:text-brand-700">{t.name}</span>
                    <span className="text-xs font-semibold text-ink/50">
                      {t.minutes} min · {t.questions.length} questions
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
