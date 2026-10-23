"use client";

import { useMemo, useState } from "react";
import type { PointAction } from "@/lib/site-content/points";

/** Searchable "How to earn" catalogue of action codes. */
export function PointsCatalogue({ actions, sections }: { actions: PointAction[]; sections: { title: string; purpose: string }[] }) {
  const [sec, setSec] = useState(sections[0].title);
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      actions.filter((a) =>
        q ? `${a.code} ${a.activity} ${a.role ?? ""}`.toLowerCase().includes(q.toLowerCase()) : a.section === sec
      ),
    [actions, sec, q]
  );
  const purpose = sections.find((s) => s.title === sec)?.purpose;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s.title}
            onClick={() => {
              setSec(s.title);
              setQ("");
            }}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${!q && sec === s.title ? "bg-brand-600 text-white" : "bg-white text-ink/70 hover:bg-brand-50"}`}
          >
            {s.title.replace(/ points$/i, "")}
          </button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all 97 actions…" className="ml-auto w-full rounded-full border border-brand-200 bg-white px-4 py-2 text-sm outline-none focus:border-brand-400 sm:w-64" />
      </div>
      {!q && purpose && <p className="mt-4 text-sm text-ink/60">{purpose}</p>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <div key={a.code} className="hover-lift rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-[11px] font-bold text-brand-600">{a.code}</span>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-extrabold text-amber-800">+{a.cp} CP</span>
            </div>
            <p className="mt-2 font-semibold text-ink">{a.activity}</p>
            <p className="mt-2 text-xs text-ink/55">
              {a.role && <>{a.role} · </>}Limit: {a.limit}
            </p>
            <p className="text-xs text-ink/45">Verified by: {a.evidence}</p>
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="mt-6 text-sm text-ink/50">No actions match.</p>}
    </div>
  );
}
