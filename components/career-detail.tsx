import Link from "next/link";
import { ArrowRightIcon, CheckIcon, Icon, SparkIcon } from "@/components/icons";
import type { Career } from "@/lib/careers";
import { getCareer } from "@/lib/careers";

export function CareerDetail({ career }: { career: Career }) {
  const related = career.related
    .map((s) => getCareer(s))
    .filter((c): c is Career => Boolean(c));

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/50">
            <Link href="/career-road-map" className="hover:text-brand-600">
              Career Road Map
            </Link>
            <span>/</span>
            <Link
              href={`/career-road-map/careers?cluster=${encodeURIComponent(
                career.cluster
              )}`}
              className="hover:text-brand-600"
            >
              {career.cluster}
            </Link>
          </nav>

          <div className="mt-6 flex flex-wrap items-start gap-5">
            <span className={`inline-flex rounded-3xl p-4 ${career.tint}`}>
              <Icon name={career.icon} className="h-10 w-10" />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="animate-reveal-up text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
                {career.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-brand-700">
                {career.tagline}
              </p>
            </div>
          </div>

          {career.about.map((p, i) => (
            <p
              key={p}
              className="mt-5 animate-reveal-up leading-relaxed text-ink/75"
              style={{ animationDelay: `${0.08 * (i + 1)}s` }}
            >
              {p}
            </p>
          ))}

          <div className="mt-7 flex flex-wrap gap-2">
            {career.riasec.map((r) => (
              <Link
                key={r}
                href="/career-road-map/riasec"
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
                {r} type
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* ---- What you do ---- */}
        <Section title="What you actually do">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {career.whatYouDo.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-ink/75">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {d}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---- Pathway ---- */}
        <Section title="How to get there">
          <ol className="space-y-4">
            {career.pathway.map((step, i) => (
              <li
                key={step.stage}
                className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{step.stage}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ---- Exams + skills ---- */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Panel title="Entrance examinations">
            <ChipList items={career.entranceExams} />
          </Panel>
          <Panel title="Skills that matter">
            <ChipList items={career.skills} />
          </Panel>
        </div>

        {/* ---- Specialisations ---- */}
        <Section title="Specialisations">
          <ChipList items={career.specialisations} />
        </Section>

        {/* ---- Where to study ---- */}
        <Section title="Where to study">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {career.instituteTypes.map((inst) => (
              <li
                key={inst}
                className="flex items-start gap-2.5 text-sm text-ink/75"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {inst}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---- Earnings ---- */}
        <Section title="Earnings outlook">
          <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white shadow-sm">
            <table className="w-full min-w-[28rem] border-collapse text-left">
              <thead>
                <tr className="bg-brand-50">
                  <th className="px-5 py-3 text-sm font-bold text-brand-800">
                    Stage
                  </th>
                  <th className="px-5 py-3 text-sm font-bold text-brand-800">
                    Outlook
                  </th>
                </tr>
              </thead>
              <tbody>
                {career.salary.map((s) => (
                  <tr key={s.level} className="border-t border-brand-100">
                    <td className="px-5 py-3 text-sm font-semibold text-ink">
                      {s.level}
                    </td>
                    <td className="px-5 py-3 text-sm text-ink/70">{s.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink/50">
            Indicative only. Earnings vary considerably by city, employer,
            sector and year — treat these as direction, not figures.
          </p>
        </Section>

        {/* ---- Fit ---- */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h3 className="text-base font-bold text-emerald-900">
              This may suit you if
            </h3>
            <ul className="mt-4 space-y-2.5">
              {career.suitsYouIf.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 text-sm text-emerald-900/80"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-amber-100 bg-amber-50/50 p-6">
            <h3 className="text-base font-bold text-amber-900">
              Worth knowing before you commit
            </h3>
            <ul className="mt-4 space-y-2.5">
              {career.considerThat.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 text-sm text-amber-900/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Related ---- */}
        {related.length > 0 && (
          <Section title="Related careers">
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/career-road-map/${r.slug}`}
                  className="hover-lift group rounded-2xl border border-brand-100 bg-white p-5 shadow-sm hover:shadow-lg"
                >
                  <span className={`inline-flex rounded-xl p-2.5 ${r.tint}`}>
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-sm font-bold text-ink group-hover:text-brand-700">
                    {r.name}
                  </p>
                  <p className="mt-1 text-xs text-ink/55">{r.cluster}</p>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* ---- CTA ---- */}
        <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-center text-white">
          <h3 className="text-2xl font-extrabold tracking-tight">
            Not sure if this fits you?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-brand-100/90">
            Take a career assessment and see how your interests, personality and
            aptitudes line up against this path.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/tests/career-explorer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 transition hover:-translate-y-0.5"
            >
              Take the interest test <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/career-road-map/careers"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Browse all careers
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-extrabold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span
          key={i}
          className="rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm text-ink/75 shadow-sm"
        >
          {i}
        </span>
      ))}
    </div>
  );
}
