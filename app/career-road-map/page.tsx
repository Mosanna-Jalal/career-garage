import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon, SparkIcon } from "@/components/icons";
import { FrameworkScene } from "@/components/decor";
import { careerClusters, frameworks } from "@/lib/frameworks";

export const metadata: Metadata = {
  title: "Career Road Map — Courses, careers and personality frameworks",
  description:
    "Explore career clusters, courses and the personality frameworks that help you understand which paths fit you.",
};

export default function CareerRoadMapPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 animate-blob bg-accent-200/25 blur-2xl [animation-delay:-4s]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <p className="inline-flex animate-pop-in items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
              Career Road Map
            </p>
            <h1 className="mt-6 animate-reveal-up text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              Every career has a route.{" "}
              <span className="text-brand-600">Find yours.</span>
            </h1>
            <p className="mt-5 animate-reveal-up text-lg leading-relaxed text-ink/70 [animation-delay:0.1s]">
              Start from who you are, not from a list of job titles. Explore the
              frameworks that describe how people differ, then follow those
              insights into the courses, qualifications and career clusters that
              suit you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tests"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Start with an assessment
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#clusters"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-3.5 text-base font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
              >
                Browse career clusters
              </Link>
            </div>
          </div>

          <div className="mx-auto hidden lg:block">
            <FrameworkScene
              nodes={[
                "Interests",
                "Personality",
                "Aptitude",
                "Values",
                "Skills",
                "Goals",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ============ FRAMEWORKS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Personality frameworks
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
          Four established models, each answering a different question about
          how you work. Read the library, then take the matching assessment.
        </p>

        <div className="stagger mt-10 grid gap-6 sm:grid-cols-2">
          {[
            {
              href: "/personality-types",
              label: "The 16 Personality Types",
              eyebrow: "TypeFinder / MBTI-style",
              blurb:
                "Four preferences combine into sixteen recognisable types, each with its own strengths and natural career fits.",
              count: "16 types",
              icon: "puzzle" as const,
            },
            ...frameworks.map((f) => ({
              href: `/career-road-map/${f.slug}`,
              label: f.label,
              eyebrow: f.eyebrow,
              blurb: f.whatItMeasures,
              count: `${f.items.length} ${f.itemNoun}s`,
              icon: f.items[0].icon,
            })),
          ].map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="hover-lift group flex flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-sm hover:shadow-xl hover:shadow-brand-900/10"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex rounded-2xl bg-brand-50 p-3.5 text-brand-700 transition group-hover:scale-110">
                  <Icon name={f.icon} className="h-7 w-7" />
                </span>
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink/50">
                  {f.count}
                </span>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-600">
                {f.eyebrow}
              </p>
              <h3 className="mt-1 text-xl font-bold text-ink group-hover:text-brand-700">
                {f.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {f.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Explore <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ CAREER CLUSTERS ============ */}
      <section id="clusters" className="scroll-mt-20 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Career clusters
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
            Explore the fields Career Garage covers, and the courses and
            qualifications that lead into each one.
          </p>

          <div className="stagger mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {careerClusters.map((c) => (
              <div
                key={c.name}
                className="hover-lift rounded-3xl bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-brand-900/10"
              >
                <span className="inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{c.name}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.fields.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-ink/60"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-ink/50">
            Detailed course pages, entrance requirements and college listings
            are being built out cluster by cluster.
          </p>
        </div>
      </section>
    </>
  );
}
