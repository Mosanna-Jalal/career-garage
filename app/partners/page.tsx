import Link from "next/link";
import type { Metadata } from "next";
import { Blocks } from "@/components/assessment/blocks";
import { DoodleField, KidWithTrophy } from "@/components/doodles";
import { Reveal } from "@/components/reveal";
import { partnerChapters, partnerPosition } from "@/lib/site-content/partner";

export const metadata: Metadata = {
  title: "Partner earnings & perks",
  description:
    "How instructors, counsellors, trainers, mentors and institutions earn with Career Garage — rate cards, levels, referrals and the monthly payout cycle.",
};

export default function PartnersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <DoodleField variant="hero" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              Partner Earnings &amp; Payout System · India 2026
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Teach, mentor and guide — <span className="text-brand-600">and know exactly what you earn.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">{partnerPosition}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                ["/register/educator", "Join as educator / teacher"],
                ["/register/trainer", "Join as trainer / professional"],
                ["/register/counsellor", "Join as counsellor"],
                ["/register/institute", "Partner as an institution"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="rounded-full border-2 border-brand-200 bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition hover:border-brand-400">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mx-auto hidden w-fit animate-hop lg:block" aria-hidden="true">
            <KidWithTrophy className="h-56 w-36" shirt="#29a29d" />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[15rem_1fr]">
        <nav className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-xs font-bold uppercase tracking-wider text-ink/40">On this page</p>
          <ul className="mt-3 space-y-1 text-sm">
            {partnerChapters.map((c) => (
              <li key={c.id}>
                <a href={`#ch-${c.id}`} className="block rounded-lg px-2 py-1.5 text-ink/70 hover:bg-brand-50 hover:text-brand-700">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">
          {partnerChapters.map((c) => (
            <Reveal key={c.id} as="section" className="scroll-mt-24 border-b border-brand-50 py-12 last:border-0">
              <div id={`ch-${c.id}`} className="scroll-mt-24" />
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{c.title}</h2>
              {c.lead && <p className="mt-3 text-lg font-medium leading-relaxed text-brand-800">{c.lead}</p>}
              <Blocks blocks={c.blocks} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
