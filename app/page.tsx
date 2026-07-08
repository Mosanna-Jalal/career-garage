import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BrainIcon,
  ChartIcon,
  CheckIcon,
  CompassIcon,
  HeartIcon,
  Icon,
  LightbulbIcon,
  PuzzleIcon,
  QuoteIcon,
  SparkIcon,
  StarIcon,
  TargetIcon,
  UsersIcon,
} from "@/components/icons";
import { tests } from "@/lib/tests";
import { personalityTypes, typeGroups } from "@/lib/personality-types";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Career Garage — Personality Tests & Career Assessments",
};

const stats = [
  { value: "2M+", label: "tests completed" },
  { value: "16", label: "personality types explored" },
  { value: "7", label: "free assessments" },
  { value: "4.8/5", label: "average user rating" },
];

const steps = [
  {
    icon: PuzzleIcon,
    title: "Answer honestly",
    text: "Work through a short set of carefully written questions. There are no right answers — only accurate ones.",
  },
  {
    icon: ChartIcon,
    title: "See your results instantly",
    text: "Get a clear, visual breakdown of your personality profile the moment you finish. No email wall, no waiting.",
  },
  {
    icon: LightbulbIcon,
    title: "Put it to work",
    text: "Explore your full type profile — strengths, blind spots, career matches — and turn insight into action.",
  },
];

const testimonials = [
  {
    quote:
      "I've taken a lot of these tests over the years. This is the first one where the career suggestions actually matched what I secretly wanted to do.",
    name: "Priya S.",
    role: "switched from finance to UX research",
  },
  {
    quote:
      "My partner and I took the love styles test on a whim. We ended up talking for two hours. Cheapest couples therapy ever.",
    name: "Marcus T.",
    role: "took the Love Styles test",
  },
  {
    quote:
      "We ran the workstyle assessment with my team of nine. The 'aha' moments in that meeting solved friction I'd been mediating for a year.",
    name: "Elena R.",
    role: "engineering manager",
  },
];

export default function HomePage() {
  const popular = tests.filter((t) => t.popular);
  const featuredTypes = personalityTypes.slice(0, 8);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        {/* animated background blobs */}
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 animate-blob bg-accent-200/30 blur-2xl [animation-delay:-4s]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
              Free · Instant results · No sign-up required
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Understand yourself.{" "}
              <span className="text-brand-600">Build a life that fits.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              Thoughtful, research-informed personality tests and career
              assessments that show you how you&apos;re wired — and what to do
              with it at work, in love, and everywhere in between.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/tests/personality-type"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Find your type
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/tests"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-3.5 text-base font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
              >
                Browse all tests
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-ink/60">
              <span className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </span>
              Loved by over 2 million curious humans
            </div>
          </div>

          {/* Animated illustration in place of a hero photo */}
          <div className="relative mx-auto hidden h-[420px] w-[420px] max-w-full lg:block">
            <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-brand-200" />
            <div className="absolute inset-10 animate-spin-slower-reverse rounded-full border-2 border-dashed border-accent-200" />
            <div className="absolute inset-24 rounded-full bg-gradient-to-br from-brand-100 to-brand-50 shadow-inner" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="animate-float rounded-3xl bg-white p-6 shadow-2xl shadow-brand-900/10">
                <BrainIcon className="h-16 w-16 text-brand-600" />
              </div>
            </div>
            <div className="absolute left-6 top-16 animate-float [animation-delay:-1.2s]">
              <div className="rounded-2xl bg-white p-3.5 shadow-xl shadow-brand-900/10">
                <HeartIcon className="h-8 w-8 text-rose-500" />
              </div>
            </div>
            <div className="absolute right-4 top-28 animate-float [animation-delay:-2.4s]">
              <div className="rounded-2xl bg-white p-3.5 shadow-xl shadow-brand-900/10">
                <CompassIcon className="h-8 w-8 text-violet-500" />
              </div>
            </div>
            <div className="absolute bottom-16 left-12 animate-float [animation-delay:-3.1s]">
              <div className="rounded-2xl bg-white p-3.5 shadow-xl shadow-brand-900/10">
                <TargetIcon className="h-8 w-8 text-accent-500" />
              </div>
            </div>
            <div className="absolute bottom-10 right-14 animate-float [animation-delay:-0.6s]">
              <div className="rounded-2xl bg-white p-3.5 shadow-xl shadow-brand-900/10">
                <ChartIcon className="h-8 w-8 text-sky-500" />
              </div>
            </div>
          </div>
        </div>

        {/* stats bar */}
        <div className="relative border-t border-brand-100 bg-white/70 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-brand-700">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-ink/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POPULAR TESTS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Our most popular tests
            </h2>
            <p className="mt-3 max-w-xl text-ink/70">
              Every assessment is free to take, takes minutes to finish, and
              delivers results you can actually use.
            </p>
          </div>
          <Link
            href="/tests"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View all tests <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((t) => (
            <Link
              key={t.slug}
              href={`/tests/${t.slug}`}
              className="group animate-fade-up rounded-3xl border border-brand-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
            >
              <span
                className={`inline-flex rounded-2xl p-3.5 ${t.tint} transition group-hover:scale-110`}
              >
                <Icon name={t.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink group-hover:text-brand-700">
                {t.name}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/60">
                {t.tagline}
              </p>
              <p className="mt-4 flex items-center gap-3 text-xs font-semibold text-ink/50">
                <span>{t.minutes} min</span>
                <span className="h-1 w-1 rounded-full bg-ink/30" />
                <span>{t.questions.length} questions</span>
                <span className="h-1 w-1 rounded-full bg-ink/30" />
                <span className="text-brand-600">Free</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-ink/70">
            From first question to real insight in about ten minutes.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative rounded-3xl bg-white p-8 shadow-sm"
              >
                <span className="absolute -top-4 left-8 rounded-full bg-accent-500 px-3.5 py-1 text-sm font-bold text-white shadow-lg shadow-accent-500/30">
                  {i + 1}
                </span>
                <span className="inline-flex animate-pulse-soft rounded-2xl bg-brand-100 p-4 text-brand-700">
                  <s.icon className="h-8 w-8" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 16 TYPES TEASER ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Meet the 16 personality types
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Every type is a different answer to the same four questions: where
              your energy comes from, what information you trust, how you
              decide, and how you like your life arranged. Find yours, then
              explore the full profile — strengths, growth edges, and the
              careers where your type thrives.
            </p>
            <ul className="mt-6 space-y-3">
              {Object.entries(typeGroups).map(([key, g]) => (
                <li key={key} className="flex items-start gap-3">
                  <span className={`mt-0.5 rounded-lg p-1 ${g.tint}`}>
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-ink/70">
                    <span className="font-bold text-ink">{g.label}.</span>{" "}
                    {g.blurb}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/personality-types"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-600/25 transition hover:bg-brand-700"
            >
              Explore all types <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {featuredTypes.map((t) => (
              <Link
                key={t.slug}
                href={`/personality-types/${t.slug}`}
                className="group animate-fade-up rounded-2xl border border-brand-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className={`inline-flex rounded-xl p-2.5 ${t.tint}`}>
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <p className="mt-2 font-mono text-sm font-bold text-ink">
                  {t.code}
                </p>
                <p className="text-xs text-ink/60 group-hover:text-brand-600">
                  {t.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CREDIBILITY ============ */}
      <section className="bg-brand-950 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built on personality science,
              <br />
              written for humans
            </h2>
            <p className="mt-4 leading-relaxed text-brand-100/80">
              We draw on the frameworks psychologists actually use — trait
              theory, type dynamics, and vocational interest research — then
              translate the findings into plain language you can act on the
              same day.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Questions reviewed for clarity, bias, and balance",
                "Results explain the why, not just the label",
                "Honest about what tests can and can't predict",
                "Anonymous results only — no account, no identity stored",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-full bg-brand-500/20 p-1 text-brand-300">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-brand-100/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Animated "report" illustration in place of a screenshot */}
          <div className="relative">
            <div className="rounded-3xl bg-white/5 p-8 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-brand-500/20 p-2.5 text-brand-300">
                  <UsersIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-bold">Your Personality Profile</p>
                  <p className="text-xs text-brand-200/60">Sample report</p>
                </div>
              </div>
              <div className="mt-7 space-y-5">
                {[
                  { label: "Openness", width: "82%", color: "bg-violet-400" },
                  { label: "Conscientiousness", width: "64%", color: "bg-sky-400" },
                  { label: "Extraversion", width: "45%", color: "bg-accent-400" },
                  { label: "Agreeableness", width: "73%", color: "bg-emerald-400" },
                  { label: "Emotional Range", width: "38%", color: "bg-amber-400" },
                ].map((bar, i) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs text-brand-100/80">
                      <span>{bar.label}</span>
                      <span className="font-mono">{bar.width}</span>
                    </div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-white/10">
                      <div
                        className={`animate-grow-bar h-full rounded-full ${bar.color}`}
                        style={{
                          width: bar.width,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-4 -top-4 animate-float rounded-2xl bg-accent-500 p-3 shadow-xl">
              <SparkIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          What people discover
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl border border-brand-100 bg-white p-7 shadow-sm"
            >
              <QuoteIcon className="h-8 w-8 text-brand-200" />
              <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">
                    {t.name}
                  </span>
                  <span className="block text-xs text-ink/50">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============ ARTICLES PREVIEW ============ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Fresh from the blog
              </h2>
              <p className="mt-3 text-ink/70">
                Practical writing on personality, careers, and relationships.
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              All articles <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group flex flex-col rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
              >
                <span className={`inline-flex w-fit rounded-2xl p-3 ${a.tint}`}>
                  <Icon name={a.icon} className="h-6 w-6" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-600">
                  {a.category}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-ink group-hover:text-brand-700">
                  {a.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/60">
                  {a.excerpt}
                </p>
                <p className="mt-auto pt-4 text-xs text-ink/50">
                  {a.readMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 animate-blob bg-white/10 blur-xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 animate-blob bg-accent-400/20 blur-xl [animation-delay:-5s]" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to meet yourself?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100/90">
            Ten minutes from now you could know your personality type, your top
            strengths, and the careers where people like you thrive.
          </p>
          <Link
            href="/tests/personality-type"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-2xl transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            Start the free test <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <p className="mt-4 text-xs text-brand-100/70">
            No sign-up · No credit card · Instant results
          </p>
        </div>
      </section>
    </>
  );
}
