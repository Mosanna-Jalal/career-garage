import Link from "next/link";
import type { Metadata } from "next";
import { CareerSearch } from "@/components/career-search";
import { DoodleField } from "@/components/doodles";
import { FamilyArt } from "@/components/family-art";
import { Reveal } from "@/components/reveal";
import { areas, families, searchIndex } from "@/lib/careers570";

export const metadata: Metadata = {
  title: "Interest areas & courses",
  description:
    "Explore 570 careers across 57 interest areas — courses, entrance exams, counselling notes, salaries and future outlook.",
};

export default function CareersPage() {
  const all = areas();
  const grouped = Object.keys(families)
    .map((f) => ({ f, list: all.filter((a) => a.family === f) }))
    .filter((g) => g.list.length);
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <DoodleField variant="hero" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <p className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            Career Library · 570 careers · 57 interest areas
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Find the interest area <span className="text-brand-600">that lights you up.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
            Every area shows its careers, the courses and entrance exams that lead there, and counselling notes on who each path suits.
          </p>
          <CareerSearch index={searchIndex()} />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-24 pt-6 sm:px-6">
        {grouped.map(({ f, list }) => (
          <Reveal key={f}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: families[f].color }}>
                  {families[f].label}
                </h2>
                <p className="text-sm text-ink/55">{families[f].blurb}</p>
              </div>
              <span className="text-xs font-semibold text-ink/40">{list.reduce((n, a) => n + a.count, 0)} careers</span>
            </div>
            <div className="stagger mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((a) => (
                <Link
                  key={a.slug}
                  href={`/careers/${a.slug}`}
                  className="hover-bounce group flex gap-4 rounded-3xl border border-brand-100 bg-white p-4 shadow-sm hover:shadow-xl"
                >
                  <FamilyArt family={a.family} color={families[a.family].color} className="h-24 w-32 shrink-0" />
                  <span className="min-w-0">
                    <span className="block font-bold leading-snug text-ink group-hover:text-brand-700">{a.name}</span>
                    <span className="mt-1 block text-xs text-ink/50">{a.count} careers</span>
                    <span className="mt-2 block line-clamp-2 text-xs text-ink/60">{a.careers.slice(0, 3).map((c) => c.name).join(" · ")}</span>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
