import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, Icon, SparkIcon } from "@/components/icons";
import { programmes } from "@/lib/programmes";

export const metadata: Metadata = {
  title: "Programmes for Institutions & Events",
  description:
    "Internships, certification, scholarships and contests that Career Garage runs with schools, colleges, employers and sponsors.",
};

export default function ProgrammesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
            Organisations, Institutions & Events
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Four programmes that turn a syllabus into{" "}
            <span className="text-brand-600">a career.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Career Garage partners with schools, colleges, universities,
            employers, NGOs and CSR sponsors to run experience, credentials,
            funding and competition — as one connected student journey.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {programmes.map((p) => (
            <Link
              key={p.slug}
              href={`/programmes/${p.slug}`}
              className="group flex flex-col rounded-3xl border border-brand-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                {p.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink group-hover:text-brand-700">
                {p.headline}{" "}
                {p.headlineAccent && (
                  <span className="text-brand-600">{p.headlineAccent}</span>
                )}
              </h2>
              <p className="mt-3 text-sm font-semibold text-ink/70">
                {p.subhead}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">
                {p.intro[0]}
              </p>
              <ul className="mt-5 space-y-2">
                {p.badges.map((b) => (
                  <li
                    key={b.label}
                    className="flex items-center gap-2.5 text-sm text-ink/70"
                  >
                    <span className="rounded-lg bg-brand-50 p-1.5 text-brand-600">
                      <Icon name={b.icon} className="h-4 w-4" />
                    </span>
                    {b.label}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Explore programme <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            One integrated ecosystem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink/70">
            Assessments, mentorship, learning, internships, certifications and
            career guidance connect into a single student journey — so what a
            learner discovers in an assessment leads to a programme, and what
            they earn in a programme opens the next opportunity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Real-world experience",
              "Mentoring",
              "Projects",
              "Career readiness",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2.5 text-sm font-medium text-ink/80 shadow-sm"
              >
                <CheckIcon className="h-4 w-4 text-brand-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
