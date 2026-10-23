"use client";

import { useCallback, useEffect, useState } from "react";
import { Avatar, ChipPicker, postJson, roleNames } from "@/components/connect/ui";
import type { PMember } from "@/components/connect/types";
import { combinationFields, emptyCombination, type Combination } from "@/lib/connect/options";

type Result = { member: PMember; score: number; connected: boolean; pending: boolean; blockedReason: string | null };

function PersonCard({ r, me, onDone, expert }: { r: Result; me: PMember; onDone: () => void; expert?: boolean }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [state, setState] = useState<string | null>(null);
  const needsPurpose = me.role === "student" && r.member.role !== "student";
  const p = r.member.profile;

  const send = async () => {
    try {
      await postJson("/api/connect/requests", { toId: r.member.id, note });
      setState("Request sent ✓");
      setOpen(false);
      onDone();
    } catch (e) {
      setState(e instanceof Error ? e.message : "Could not send");
    }
  };
  const block = async () => {
    if (!confirm(`Block ${r.member.name}? They won't be able to contact you.`)) return;
    await postJson(`/api/connect/members/${r.member.id}`, { action: "block" });
    onDone();
  };

  return (
    <article className="hover-lift flex flex-col rounded-3xl border border-brand-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar name={r.member.name} color={r.member.color} verified={r.member.verified} size="h-12 w-12 text-sm" />
        <div className="min-w-0 flex-1">
          <p className="font-extrabold text-ink">{r.member.name}</p>
          <p className="text-xs text-ink/55">
            {roleNames[r.member.role]}
            {r.member.verified && " · Verified"}
            {p.headline ? ` · ${p.headline}` : p.className ? ` · ${p.className}` : ""}
          </p>
          <p className="text-xs text-ink/45">{[p.school, p.city, p.state].filter(Boolean).join(", ")}</p>
        </div>
        {r.score > 0 && <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{r.score} match</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {[...p.interests, ...p.careerInterests].slice(0, 6).map((t) => (
          <span key={t} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${me.profile.interests.includes(t) || me.profile.careerInterests.includes(t) ? "bg-emerald-100 text-emerald-800" : "bg-ink/5 text-ink/60"}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-4">
        {r.connected ? (
          <span className="block rounded-full bg-emerald-50 py-2 text-center text-sm font-bold text-emerald-700">Connected — message from Messages</span>
        ) : r.pending || state === "Request sent ✓" ? (
          <span className="block rounded-full bg-ink/5 py-2 text-center text-sm font-bold text-ink/50">Request pending</span>
        ) : r.blockedReason ? (
          <span className="block rounded-xl bg-ink/5 px-3 py-2 text-center text-xs text-ink/55">{r.blockedReason}</span>
        ) : open ? (
          <div className="space-y-2">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              maxLength={240}
              placeholder={needsPurpose || expert ? "Purpose — e.g. 'I'd like advice on choosing between B.Sc Physics and B.Tech.'" : "Add a note (optional)"}
              className="w-full rounded-xl border border-brand-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
            />
            <div className="flex gap-2">
              <button onClick={send} disabled={needsPurpose && !note.trim()} className="flex-1 rounded-full bg-brand-600 py-2 text-sm font-bold text-white disabled:opacity-40">
                Send request
              </button>
              <button onClick={() => setOpen(false)} className="rounded-full px-3 text-sm text-ink/55">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setOpen(true)} className="flex-1 rounded-full bg-brand-600 py-2 text-sm font-bold text-white">
              {expert ? "Ask a question" : "Connect"}
            </button>
            <button onClick={block} className="rounded-full border border-brand-100 px-3 text-xs font-semibold text-ink/45 hover:text-accent-600" title="Block">
              Block
            </button>
          </div>
        )}
        {state && state !== "Request sent ✓" && <p className="mt-2 text-xs font-semibold text-accent-600">{state}</p>}
      </div>
    </article>
  );
}

export function PeopleView({ me, experts = false }: { me: PMember; experts?: boolean }) {
  const [combo, setCombo] = useState<Combination>({ ...emptyCombination });
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[] | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const load = useCallback(async () => {
    const sp = new URLSearchParams();
    for (const f of combinationFields) combo[f.key].forEach((v) => sp.append(f.key, v));
    if (q) sp.set("q", q);
    if (experts) sp.set("experts", "1");
    const res = await fetch(`/api/connect/people?${sp}`);
    const data = await res.json();
    setResults(data.results ?? []);
  }, [combo, q, experts]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const active = combinationFields.reduce((n, f) => n + combo[f.key].length, 0);
  const fields = experts ? combinationFields.filter((f) => f.key !== "classes") : combinationFields;

  return (
    <div className="h-full overflow-y-auto p-5 sm:p-7">
      {experts ? (
        <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-extrabold">Ask an Expert</h1>
          <p className="mt-1 text-sm text-white/80">Connect with verified teachers, professors, counsellors and industry experts. They approve each request before a conversation opens.</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-extrabold text-ink">Find people</h1>
          <p className="mt-1 text-sm text-ink/60">Pick any combination — class, subjects, interests, state, languages — to find students, teachers and mentors who match.</p>
        </>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, school, subject…" className="w-full rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-400 sm:w-80" />
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700">
          Filters{active ? ` · ${active}` : ""} {filtersOpen ? "▲" : "▼"}
        </button>
        {active > 0 && (
          <button onClick={() => setCombo({ ...emptyCombination })} className="text-sm font-semibold text-ink/50">
            Clear
          </button>
        )}
      </div>
      {filtersOpen && (
        <div className="mt-4 grid gap-4 rounded-3xl border border-brand-100 bg-white p-5 lg:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key}>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-ink/45">{f.label}</p>
              <ChipPicker
                options={experts && f.key === "roles" ? f.options.filter((o) => !["student", "parent"].includes(o)) : f.options}
                value={combo[f.key]}
                onChange={(v) => setCombo({ ...combo, [f.key]: v })}
                limit={10}
              />
            </div>
          ))}
        </div>
      )}
      <p className="mt-5 text-sm text-ink/50">{results === null ? "Searching…" : `${results.length} ${results.length === 1 ? "person" : "people"} match`}</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {results?.map((r) => <PersonCard key={r.member.id} r={r} me={me} onDone={load} expert={experts} />)}
      </div>
    </div>
  );
}
