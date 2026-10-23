import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { ContentTable } from "@/components/assessment/blocks";
import { Trophy } from "@/components/doodles";
import { methodNames, partnerChapter, partnerPosition, perksForRole } from "@/lib/site-content/partner";

/** "Your perks" panel for professional sign-up pages (instructors, counsellors, trainers, institutions). */
export function PartnerPerks({ role, roleLabel }: { role: string; roleLabel: string }) {
  const rows = perksForRole(role);
  if (rows.length === 0) return null;
  const levels = partnerChapter("10")?.blocks.find((b) => b.type === "table");
  const cycle = partnerChapter("11")?.blocks.find((b) => b.type === "ol");

  return (
    <section className="relative mt-12 overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-accent-50/40 p-7 shadow-sm sm:p-10">
      <div className="pointer-events-none absolute right-6 top-6 hidden animate-hop sm:block" aria-hidden="true">
        <Trophy className="h-14 w-12" />
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">Partner perks</p>
      <h2 className="mt-2 max-w-xl text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        What you can earn as a {roleLabel}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">{partnerPosition}</p>

      <div className="stagger mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <div key={`${r.earner}-${r.activity}`} className="hover-lift rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-brand-600">{r.earner}</p>
            <p className="mt-1 font-bold text-ink">{r.activity}</p>
            <p className="mt-2 text-2xl font-extrabold text-accent-600">{r.default}</p>
            <p className="text-xs text-ink/55">{methodNames[r.mode] ?? r.mode}</p>
            <p className="mt-2 text-xs text-ink/50">Payable after: {r.evidence}</p>
          </div>
        ))}
      </div>

      {levels && levels.type === "table" && (
        <>
          <h3 className="mt-10 text-lg font-extrabold text-ink">Grow your level</h3>
          <ContentTable rows={levels.rows} />
        </>
      )}
      {cycle && cycle.type === "ol" && (
        <>
          <h3 className="mt-10 text-lg font-extrabold text-ink">How you get paid each month</h3>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {cycle.items.map((t, i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-white/80 p-3 text-sm text-ink/75">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </>
      )}
      <Link
        href="/partners"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
      >
        Read the full partner earnings guide <ArrowRightIcon className="h-4 w-4" />
      </Link>
      <p className="mt-4 text-xs text-ink/45">
        Default rates are the recommended launch rate card; the live rate locked to each booking applies. No income is guaranteed.
      </p>
    </section>
  );
}
