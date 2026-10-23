"use client";

import { useMemo, useState } from "react";

export type FaqSection = { id: number; title: string; items: { n: number; q: string; a: string }[] };

/** Searchable, categorised FAQ list for /about/faq. */
export function FaqExplorer({ sections }: { sections: FaqSection[] }) {
  const [cat, setCat] = useState<number | "all">("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      sections
        .filter((s) => cat === "all" || s.id === cat)
        .map((s) => ({
          ...s,
          items: q ? s.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(q)) : s.items,
        }))
        .filter((s) => s.items.length > 0),
    [sections, cat, q]
  );
  const count = visible.reduce((n, s) => n + s.items.length, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 400 questions…"
          className="w-full rounded-full border border-brand-200 bg-white px-5 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:max-h-[65vh] lg:flex-col lg:overflow-y-auto lg:pb-0">
          {[{ id: "all" as const, title: "All categories", items: sections.flatMap((s) => s.items) }, ...sections].map((s) => (
            <button
              key={s.id}
              onClick={() => setCat(s.id)}
              className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                cat === s.id ? "bg-brand-600 font-bold text-white" : "text-ink/75 hover:bg-brand-50"
              }`}
            >
              <span>{s.title}</span>
              <span className={`text-xs ${cat === s.id ? "text-white/80" : "text-ink/40"}`}>{s.items.length}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <p className="text-sm text-ink/50">
          {count} question{count === 1 ? "" : "s"}
          {q && ` matching “${query.trim()}”`}
        </p>
        {visible.map((s) => (
          <section key={s.id} className="mt-8 first:mt-4">
            <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-100 text-sm font-extrabold text-accent-700">
                {s.id}
              </span>
              {s.title}
            </h2>
            <div className="mt-4 space-y-2.5">
              {s.items.map((i) => (
                <div key={i.n} className="rounded-2xl border border-brand-100 bg-white shadow-sm">
                  <button
                    onClick={() => setOpen(open === i.n ? null : i.n)}
                    aria-expanded={open === i.n}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-ink">
                      <span className="mr-2 font-mono text-xs text-brand-600">Q{i.n}</span>
                      {i.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg text-brand-600 transition ${
                        open === i.n ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {open === i.n && <p className="animate-fade-up px-5 pb-5 leading-relaxed text-ink/70">{i.a}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
        {count === 0 && <p className="mt-10 text-center text-ink/50">No questions match your search.</p>}
      </div>
    </div>
  );
}
