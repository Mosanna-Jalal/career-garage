import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, Icon, SparkIcon } from "@/components/icons";
import { PlayfulScene } from "@/components/decor";
import { audiences, getAudience } from "@/lib/audiences";

export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/for/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const audience = getAudience(slug);
  if (!audience) return {};
  return {
    title: `${audience.eyebrow} — ${audience.subhead}`,
    description: audience.intro[0],
  };
}

export default async function AudiencePage(props: PageProps<"/for/[slug]">) {
  const { slug } = await props.params;
  const audience = getAudience(slug);
  if (!audience) notFound();

  const playful = audience.style === "playful";
  // Playful pages bounce and tilt; older audiences get a restrained lift.
  const cardMotion = playful
    ? "hover-bounce animate-pop-in"
    : "hover-lift animate-reveal-up";
  const iconMotion = playful ? "animate-wiggle" : "";

  return (
    <>
      {/* ============ HERO ============ */}
      <section
        className={`relative overflow-hidden bg-gradient-to-b ${
          playful
            ? "from-accent-50 via-brand-50/40 to-white"
            : "from-brand-50 via-white to-white"
        }`}
      >
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 top-44 h-80 w-80 animate-blob bg-accent-200/30 blur-2xl [animation-delay:-4s]" />

        <div
          className={`relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24 ${
            playful ? "lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10" : ""
          }`}
        >
          <div className="max-w-3xl animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
              {audience.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              {audience.headline}{" "}
              {audience.headlineAccent && (
                <span className="text-brand-600">{audience.headlineAccent}</span>
              )}
            </h1>
            <p className="mt-4 text-xl font-semibold text-ink/80">
              {audience.subhead}
            </p>
            {audience.intro.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-ink/70">
                {p}
              </p>
            ))}

            <div className="mt-8 flex flex-wrap gap-3">
              {audience.badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-ink/80 shadow-sm"
                >
                  <Icon name={b.icon} className="h-4 w-4 text-brand-600" />
                  {b.label}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/register/student"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Explore Programs
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/tests"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-3.5 text-base font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
              >
                Take an assessment
              </Link>
            </div>
          </div>

          {playful && (
            <div className="mt-12 hidden justify-center lg:mt-0 lg:flex">
              <PlayfulScene />
            </div>
          )}
        </div>
      </section>

      {/* ============ WHY / FEATURES ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {audience.whyHeading}
        </h2>
        <p className="mt-3 text-xl font-semibold text-brand-700">
          {audience.whySub}
        </p>
        {audience.whyIntro && (
          <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
            {audience.whyIntro}
          </p>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audience.features.map((f, i) => (
            <div
              key={f.title}
              className={`group rounded-3xl border border-brand-100 bg-white p-7 shadow-sm hover:shadow-xl hover:shadow-brand-900/10 ${cardMotion}`}
              style={{ animationDelay: `${Math.min(i, 8) * 0.06}s` }}
            >
              <span
                className={`inline-flex rounded-2xl p-3.5 transition group-hover:scale-110 ${
                  playful
                    ? "bg-accent-50 text-accent-600 group-hover:bg-accent-100"
                    : "bg-brand-50 text-brand-700 group-hover:bg-brand-100"
                }`}
              >
                <Icon
                  name={f.icon}
                  className={`h-7 w-7 ${iconMotion}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ LISTS (what you'll learn / careers / skills) ============ */}
      {audience.lists.map((list) => (
        <section key={list.heading} className="bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {list.heading}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {list.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2.5 text-sm font-medium text-ink/80 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
                >
                  <CheckIcon className="h-4 w-4 text-brand-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ============ BENEFITS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {[audience.studentBenefits, audience.parentBenefits].map((block) => (
            <div
              key={block.heading}
              className="rounded-3xl border border-brand-100 bg-white p-8 shadow-sm"
            >
              <h3 className="text-2xl font-extrabold tracking-tight text-ink">
                {block.heading}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-brand-100 p-1 text-brand-700">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink/75">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      {audience.closing && (
        <section className="bg-brand-950 text-white">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {audience.closing.heading}
            </h2>
            {audience.closing.paragraphs.map((p) => (
              <p
                key={p}
                className="mx-auto mt-5 max-w-2xl leading-relaxed text-brand-100/80"
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 animate-blob bg-white/10 blur-xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 animate-blob bg-accent-400/20 blur-xl [animation-delay:-5s]" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {audience.cta.heading}
          </h2>
          {audience.cta.text && (
            <p className="mx-auto mt-4 max-w-xl text-brand-100/90">
              {audience.cta.text}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {audience.cta.badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
              >
                <SparkIcon className="h-4 w-4 text-accent-300" />
                {b}
              </span>
            ))}
          </div>
          <Link
            href="/register"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-2xl transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            Create your free account <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
