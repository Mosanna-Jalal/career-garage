import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, Icon, SparkIcon } from "@/components/icons";
import {
  getProgramme,
  programmes,
  type ProgrammeSection,
} from "@/lib/programmes";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/programmes/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const programme = getProgramme(slug);
  if (!programme) return {};
  return {
    title: `${programme.eyebrow} — ${programme.subhead}`,
    description: programme.intro[0],
  };
}

function Section({ section }: { section: ProgrammeSection }) {
  switch (section.kind) {
    case "cards":
      return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {section.heading}
          </h2>
          {section.intro && (
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
              {section.intro}
            </p>
          )}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.cards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-3xl border border-brand-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
              >
                <h3 className="text-base font-bold text-ink">{card.title}</h3>
                {card.text && (
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {card.text}
                  </p>
                )}
                {card.items && (
                  <ul className="mt-3 space-y-1.5">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-ink/70"
                      >
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      );

    case "features":
      return (
        <section className="bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {section.heading}
            </h2>
            {section.intro && (
              <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
                {section.intro}
              </p>
            )}
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {section.groups.map((g) => (
                <div
                  key={g.title}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <h3 className="text-sm font-bold text-brand-700">
                    {g.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-ink/70"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "pills":
      return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {section.heading}
          </h2>
          {section.intro && (
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
              {section.intro}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {section.items.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2.5 text-sm font-medium text-ink/80 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
              >
                <CheckIcon className="h-4 w-4 text-brand-500" />
                {item}
              </span>
            ))}
          </div>
        </section>
      );

    case "table":
      return (
        <section className="bg-cream">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {section.heading}
            </h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-100 bg-white shadow-sm">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <thead>
                  <tr className="bg-brand-50">
                    {section.columns.map((col) => (
                      <th
                        key={col}
                        className="px-5 py-3.5 text-sm font-bold text-brand-800"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row) => (
                    <tr
                      key={row[0]}
                      className="border-t border-brand-100 transition hover:bg-brand-50/40"
                    >
                      {row.map((cell, i) => (
                        <td
                          key={cell}
                          className={`px-5 py-3.5 text-sm ${
                            i === 0
                              ? "font-semibold text-ink"
                              : "text-ink/70"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );

    case "steps":
      return (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {section.heading}
          </h2>
          {section.intro && (
            <p className="mt-3 leading-relaxed text-ink/70">{section.intro}</p>
          )}
          <ol className="mt-10 space-y-4">
            {section.steps.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-sm font-medium text-ink/80">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>
      );

    case "prose":
      return (
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {section.heading && (
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {section.heading}
            </h2>
          )}
          {section.paragraphs.map((p) => (
            <p key={p} className="mt-4 leading-relaxed text-ink/70">
              {p}
            </p>
          ))}
        </section>
      );
  }
}

export default async function ProgrammePage(
  props: PageProps<"/programmes/[slug]">
) {
  const { slug } = await props.params;
  const programme = getProgramme(slug);
  if (!programme) notFound();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 top-44 h-80 w-80 animate-blob bg-accent-200/30 blur-2xl [animation-delay:-4s]" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
              {programme.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              {programme.headline}{" "}
              {programme.headlineAccent && (
                <span className="text-brand-600">
                  {programme.headlineAccent}
                </span>
              )}
            </h1>
            <p className="mt-4 text-xl font-semibold text-ink/80">
              {programme.subhead}
            </p>
            {programme.intro.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-ink/70">
                {p}
              </p>
            ))}

            <div className="mt-8 flex flex-wrap gap-3">
              {programme.badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-ink/80 shadow-sm"
                >
                  <Icon name={b.icon} className="h-4 w-4 text-brand-600" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {programme.sections.map((section, i) => (
        <Section key={`${section.kind}-${i}`} section={section} />
      ))}

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 animate-blob bg-white/10 blur-xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 animate-blob bg-accent-400/20 blur-xl [animation-delay:-5s]" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {programme.cta.heading}
          </h2>
          {programme.cta.text && (
            <p className="mx-auto mt-4 max-w-xl text-brand-100/90">
              {programme.cta.text}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register/institute"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-2xl transition hover:-translate-y-0.5 hover:bg-brand-50"
            >
              Partner with us <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/register/student"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10"
            >
              Register as a student
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
