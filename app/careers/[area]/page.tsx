import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon } from "@/components/icons";
import { DoodleField } from "@/components/doodles";
import { FamilyArt } from "@/components/family-art";
import { Reveal } from "@/components/reveal";
import { area, areas, families } from "@/lib/careers570";

export function generateStaticParams() {
  return areas().map((a) => ({ area: a.slug }));
}

export async function generateMetadata(props: PageProps<"/careers/[area]">): Promise<Metadata> {
  const { area: slug } = await props.params;
  const a = area(slug);
  return a ? { title: `${a.name} careers & courses`, description: `${a.count} careers in ${a.name}: courses, exams and counselling notes.` } : {};
}

const tone: Record<string, string> = { "Very High": "bg-emerald-100 text-emerald-800", High: "bg-teal-100 text-teal-800", Stable: "bg-sky-100 text-sky-800", Moderate: "bg-amber-100 text-amber-800" };

export default async function AreaPage(props: PageProps<"/careers/[area]">) {
  const { area: slug } = await props.params;
  const a = area(slug);
  if (!a) notFound();
  const fam = families[a.family];
  const uniq = (xs: string[]) => [...new Set(xs)];
  const ug = uniq(a.full.flatMap((c) => c.ug_courses)).slice(0, 12);
  const pg = uniq(a.full.flatMap((c) => c.pg_courses)).slice(0, 10);
  const certs = uniq(a.full.flatMap((c) => c.certifications)).slice(0, 8);
  const exams = uniq(a.full.flatMap((c) => c.entrance_exams)).slice(0, 12);
  const streams = uniq(a.full.map((c) => c.recommended_stream));

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${fam.color}14, #fff)` }}>
        <DoodleField variant="hero" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <nav className="text-sm text-ink/50">
              <Link href="/careers" className="hover:text-brand-600">
                Interest areas
              </Link>{" "}
              / <span style={{ color: fam.color }}>{fam.label}</span>
            </nav>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{a.name}</h1>
            <p className="mt-4 text-lg text-ink/70">
              {a.count} careers · {fam.blurb.toLowerCase()}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {Object.entries(a.outlook).map(([k, n]) => (
                <span key={k} className={`rounded-full px-3 py-1 text-xs font-bold ${tone[k] ?? "bg-ink/5 text-ink/60"}`}>
                  {n} × {k} outlook
                </span>
              ))}
            </div>
          </div>
          <FamilyArt family={a.family} color={fam.color} className="mx-auto w-full max-w-sm drop-shadow-xl" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-24 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-extrabold text-ink">Careers in this area</h2>
          <div className="stagger mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.full.map((c) => (
              <Link key={c.slug} href={`/careers/${a.slug}/${c.slug}`} className="hover-lift group flex flex-col rounded-3xl border border-brand-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-ink group-hover:text-brand-700">{c.name}</h3>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${tone[c.future_outlook] ?? "bg-ink/5 text-ink/60"}`}>{c.future_outlook}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-ink/60">{c.core_focus}</p>
                <dl className="mt-auto grid grid-cols-2 gap-2 pt-4 text-xs">
                  <div>
                    <dt className="text-ink/40">Starting pay</dt>
                    <dd className="font-semibold text-ink/80">{c.salary_india.early_career}</dd>
                  </div>
                  <div>
                    <dt className="text-ink/40">Demand</dt>
                    <dd className="font-semibold text-ink/80">{c.demand}</dd>
                  </div>
                </dl>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-600">
                  Courses &amp; counselling notes <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-ink">🎓 Courses that lead here</h2>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-ink/45">Undergraduate</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-ink/75">{ug.map((x) => <li key={x}>• {x}</li>)}</ul>
            <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-ink/45">Postgraduate</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-ink/75">{pg.map((x) => <li key={x}>• {x}</li>)}</ul>
            {certs.length > 0 && (
              <>
                <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-ink/45">Certifications</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-ink/75">{certs.map((x) => <li key={x}>• {x}</li>)}</ul>
              </>
            )}
          </section>
          <section className="space-y-6">
            <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-ink">📝 Entrance exams</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {exams.map((x) => (
                  <span key={x} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">{x}</span>
                ))}
              </div>
              <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-ink/45">Recommended streams</h3>
              <ul className="mt-2 space-y-1 text-sm text-ink/70">{streams.map((x) => <li key={x}>• {x}</li>)}</ul>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
              <h2 className="text-xl font-extrabold">🧭 Not sure this area fits?</h2>
              <p className="mt-2 text-sm text-brand-100">
                Try the RIASEC interest demo, then talk it through with a counsellor in Career Garage Connect.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/tests/riasec/take" className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-700">
                  Take the interest demo
                </Link>
                <Link href="/connect?view=experts" className="rounded-full border-2 border-white/40 px-5 py-2.5 text-sm font-bold">
                  Ask a counsellor
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
