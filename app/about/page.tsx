import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BookIcon,
  ChartIcon,
  CheckIcon,
  GlobeIcon,
  HeartIcon,
  LightbulbIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Career Garage builds free, thoughtful personality and career assessments — honest about the science, generous with the insight.",
};

const values = [
  {
    icon: BookIcon,
    title: "Honest about the science",
    text: "We tell you what an assessment can predict, what it can only describe, and where you should stay skeptical. No mystical claims, no unchangeable 'essences.'",
  },
  {
    icon: HeartIcon,
    title: "Insight for everyone",
    text: "Every core test is free, with no email wall in front of your results. Self-knowledge shouldn't have a paywall.",
  },
  {
    icon: ShieldIcon,
    title: "Private by design",
    text: "Your answers are scored in your browser. We store only an anonymous result summary to power our statistics — never your identity or your raw answers.",
  },
  {
    icon: LightbulbIcon,
    title: "Insight you can act on",
    text: "A label alone changes nothing. Every result ships with concrete next steps — for your career, your team, and your relationships.",
  },
];

const faqs = [
  {
    q: "Are the tests really free?",
    a: "Yes. Every assessment on Career Garage is free to take, and you see your full results immediately — no account, no email address, no trial that quietly becomes a subscription. We offer paid tools for teams, which is how the lights stay on.",
  },
  {
    q: "How accurate are the results?",
    a: "As accurate as your answers are honest. Self-report assessments describe your current patterns; they aren't verdicts. We recommend reading your result critically — keep the parts that ring true, question the parts that don't, and retake the test if your life circumstances change substantially.",
  },
  {
    q: "Can a personality test tell me which career to choose?",
    a: "No test can — and you should be wary of any that claims to. What a good assessment does is narrow the search: it identifies the work themes that energize you so you can run cheaper, faster experiments in the right neighborhoods. The deciding is still yours.",
  },
  {
    q: "Do my personality results ever change?",
    a: "They can. Personality is stable enough to be meaningful and flexible enough to be hopeful — traits shift gradually across the lifespan and with deliberate effort. Think of your result as a well-lit snapshot, not a tattoo.",
  },
  {
    q: "Can I use these tests for hiring?",
    a: "Please don't. Our assessments are built for self-insight and team development, not selection. Using personality tests to screen candidates raises both fairness and validity problems we take seriously.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            We help people understand themselves
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Career Garage started with a simple observation: the most useful
            question in any career, team, or relationship is rarely{" "}
            <em>&ldquo;what should I do?&rdquo;</em> — it&apos;s{" "}
            <em>&ldquo;how am I wired, and what does that mean here?&rdquo;</em>{" "}
            We build free, carefully written assessments that help you answer
            it.
          </p>
        </div>
      </section>

      {/* Mission stats */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: UsersIcon, value: "2M+", label: "people have taken our tests" },
            { icon: GlobeIcon, value: "150+", label: "countries reached" },
            { icon: ChartIcon, value: "7", label: "free assessments and counting" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-sm"
            >
              <span className="inline-flex rounded-2xl bg-brand-100 p-3.5 text-brand-700">
                <s.icon className="h-7 w-7" />
              </span>
              <p className="mt-4 text-3xl font-extrabold text-brand-700">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section id="science" className="scroll-mt-20 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            What we believe
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl bg-white p-8 shadow-sm">
                <span className="inline-flex rounded-2xl bg-brand-100 p-3 text-brand-700">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-brand-100 bg-white p-6 shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="rounded-full bg-brand-50 p-1.5 text-brand-600 transition-transform group-open:rotate-45">
                  <CheckIcon className="hidden h-4 w-4" />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Come see for yourself
          </h2>
          <p className="mx-auto mt-2 max-w-md text-brand-100/90">
            The best introduction to Career Garage is ten minutes with one of
            our tests.
          </p>
          <Link
            href="/tests"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 transition hover:bg-brand-50"
          >
            Browse the tests <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
