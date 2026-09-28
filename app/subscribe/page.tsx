import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, Icon } from "@/components/icons";
import { DoodleField, KidWithTrophy, Rocket } from "@/components/doodles";
import { Reveal } from "@/components/reveal";
import { assessments } from "@/lib/assessments/catalog";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Unlock the full Career Garage assessments and complete reports — every question, every score, and practical next steps.",
};

const included = [
  "All twelve full-length assessments — every question, in sequence",
  "Complete reports: every score, band and near-tie check",
  "Strengths, watch-outs and career environments to explore",
  "Development actions and reflection prompts you can act on",
  "Printable reports to share with a parent or counsellor",
];

export default function SubscribePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <DoodleField variant="hero" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              Career Garage subscription
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Go beyond the demo. <span className="text-brand-600">Get your full report.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              Every assessment has a free demo with a few points of your report. A subscription unlocks the complete
              questionnaires and full reports across all twelve assessments.
            </p>
            <ul className="mt-8 space-y-3">
              {included.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                    <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-ink/75">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-[2rem] border border-brand-100 bg-white p-8 shadow-2xl shadow-brand-900/10">
            <div className="pointer-events-none absolute -right-4 -top-10 animate-float" aria-hidden="true">
              <Rocket className="h-24 w-14 rotate-12" />
            </div>
            <h2 className="text-2xl font-extrabold text-ink">Subscriptions are opening soon</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Online checkout is being set up. Register now and we&apos;ll get in touch as soon as plans are available —
              schools and institutes can arrange access for their learners directly.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="/register/student-parent"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
              >
                Register as a student or parent <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/register/institute"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-200 px-6 py-3.5 font-bold text-brand-700 transition hover:border-brand-400"
              >
                Register a school or institute
              </Link>
            </div>
            <div className="pointer-events-none mx-auto mt-6 w-fit animate-hop" aria-hidden="true">
              <KidWithTrophy className="h-24 w-16" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">What you unlock</h2>
          <div className="stagger mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {assessments.map((a) => (
              <Link
                key={a.slug}
                href={`/tests/${a.slug}`}
                className="hover-lift flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm"
              >
                <span className={`rounded-xl p-2.5 ${a.tint}`}>
                  <Icon name={a.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{a.name}</span>
                  <span className="text-xs text-ink/50">{a.range[1] - a.range[0] + 1} questions</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
