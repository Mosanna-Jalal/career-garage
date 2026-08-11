import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon, SparkIcon } from "@/components/icons";
import { careers, careerClusterNames } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Career Library — explore careers by cluster",
  description:
    "Browse careers across engineering, medicine, commerce, law, design, media, civil services, education and hospitality — with pathways, eligibility, skills and outlook for each.",
};

export default async function CareerLibraryPage(
  props: PageProps<"/career-road-map/careers">
) {
  const params = await props.searchParams;
  const raw = params.cluster;
  const active = Array.isArray(raw) ? raw[0] : raw;

  const clusters = careerClusterNames();
  const visible = active
    ? careers.filter((c) => c.cluster === active)
    : careers;

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-ink/50">
            <Link href="/career-road-map" className="hover:text-brand-600">
              Career Road Map
            </Link>
            <span>/</span>
            <span className="text-ink/70">Career Library</span>
          </nav>

          <p className="mt-6 inline-flex animate-pop-in items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
            {careers.length} careers · {clusters.length} clusters
          </p>
          <h1 className="mt-5 animate-reveal-up text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Career Library
          </h1>
          <p className="mt-4 max-w-2xl animate-reveal-up text-lg leading-relaxed text-ink/70 [animation-delay:0.1s]">
            Every entry covers what the work actually involves, how to get
            there from where you are now, what it pays, and — just as
            usefully — what might make you decide against it.
          </p>
        </div>
      </section>

      {/* ============ FILTER ============ */}
      <section className="border-b border-brand-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-4 sm:px-6">
          <Link
            href="/career-road-map/careers"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              !active
                ? "bg-brand-600 text-white"
                : "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
            }`}
          >
            All careers
          </Link>
          {clusters.map((c) => (
            <Link
              key={c}
              href={`/career-road-map/careers?cluster=${encodeURIComponent(c)}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === c
                  ? "bg-brand-600 text-white"
                  : "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* ============ GRID ============ */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {active && (
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink">
            {active}{" "}
            <span className="font-medium text-ink/40">
              ({visible.length})
            </span>
          </h2>
        )}

        <div className="stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <Link
              key={c.slug}
              href={`/career-road-map/${c.slug}`}
              className="hover-lift group flex flex-col rounded-3xl border border-brand-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-brand-900/10"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`inline-flex rounded-2xl p-3 ${c.tint}`}>
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">
                  {c.riasec[0]}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-ink group-hover:text-brand-700">
                {c.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                {c.cluster}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">
                {c.tagline}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.specialisations.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-ink/60"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Read the guide <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm leading-relaxed text-ink/50">
          More careers are being added cluster by cluster. If a path you&apos;re
          considering isn&apos;t listed yet, an assessment will still point you
          toward the cluster it belongs to.
        </p>
      </section>
    </>
  );
}
