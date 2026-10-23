"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/** Instant search over all 570 career names. */
export function CareerSearch({ index }: { index: { n: string; s: string; a: string; c: string }[] }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return index.filter((i) => i.n.toLowerCase().includes(t) || i.c.toLowerCase().includes(t)).slice(0, 8);
  }, [q, index]);
  return (
    <div className="relative mx-auto mt-8 max-w-2xl">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search 570 careers — e.g. pilot, psychologist, data scientist…"
        className="w-full rounded-full border-2 border-brand-200 bg-white px-6 py-4 text-base shadow-xl shadow-brand-900/5 outline-none focus:border-brand-400"
      />
      {hits.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-brand-100 bg-white text-left shadow-2xl">
          {hits.map((h) => (
            <li key={h.s}>
              <Link href={`/careers/${h.a}/${h.s}`} className="flex justify-between gap-4 px-5 py-3 hover:bg-brand-50">
                <span className="font-semibold text-ink">{h.n}</span>
                <span className="truncate text-xs text-ink/50">{h.c}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
