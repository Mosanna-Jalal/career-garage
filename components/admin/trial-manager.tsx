"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckIcon, CloseIcon } from "@/components/icons";
import type { BankItem } from "@/lib/assessments/scoring";
import type { CustomTrialItem } from "@/lib/assessments/server";

export type TrialAssessment = {
  slug: string;
  name: string;
  id: string;
  objective: boolean;
  dims: { code: string; name: string }[];
  defaults: string[];
  items: BankItem[];
  itemIds: string[];
  custom: CustomTrialItem[];
  isDefault: boolean;
  updatedAt?: string;
};

type Draft = { itemIds: string[]; custom: CustomTrialItem[] };
const LETTERS = ["A", "B", "C", "D"];
const RECOMMENDED = 10;

function sameDraft(a: Draft, b: Draft) {
  return (
    JSON.stringify([...a.itemIds].sort()) === JSON.stringify([...b.itemIds].sort()) &&
    JSON.stringify(a.custom) === JSON.stringify(b.custom)
  );
}

export function TrialManager({ data, dbConfigured }: { data: TrialAssessment[]; dbConfigured: boolean }) {
  const [active, setActive] = useState(data[0].slug);
  const [saved, setSaved] = useState<Record<string, Draft & { isDefault: boolean; updatedAt?: string }>>(() =>
    Object.fromEntries(data.map((d) => [d.slug, { itemIds: d.itemIds, custom: d.custom, isDefault: d.isDefault, updatedAt: d.updatedAt }]))
  );
  const [drafts, setDrafts] = useState<Record<string, Draft>>(() =>
    Object.fromEntries(data.map((d) => [d.slug, { itemIds: d.itemIds, custom: d.custom }]))
  );
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const a = data.find((d) => d.slug === active)!;
  const draft = drafts[active];
  const dirty = !sameDraft(draft, saved[active]);
  const dimName = useMemo(() => Object.fromEntries(a.dims.map((d) => [d.code, d.name])), [a]);
  const selected = new Set(draft.itemIds);
  const count = draft.itemIds.length + draft.custom.length;

  const setDraft = (d: Draft) => setDrafts((all) => ({ ...all, [active]: d }));
  const toggle = (id: string) =>
    setDraft({
      ...draft,
      itemIds: selected.has(id) ? draft.itemIds.filter((x) => x !== id) : [...draft.itemIds, id],
    });

  const visible = a.items.filter(
    (i) =>
      (filter === "all" || (filter === "selected" ? selected.has(i.id) : i.dim === filter)) &&
      (!query || `${i.id} ${i.text}`.toLowerCase().includes(query.toLowerCase()))
  );
  const trialInOrder = a.items.filter((i) => selected.has(i.id));

  async function save() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/assessments/${active}/trial`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not save");
      const next = { itemIds: body.itemIds, custom: body.custom };
      setDraft(next);
      setSaved((s) => ({ ...s, [active]: { ...next, isDefault: false, updatedAt: body.updatedAt } }));
      setMessage({ ok: true, text: "Saved — the demo now uses this trial set." });
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : "Could not save" });
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!confirm(`Restore the default ${RECOMMENDED}-question demo for ${a.name}? Custom trial questions will be removed.`)) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/assessments/${active}/trial`, { method: "DELETE" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not reset");
      const next = { itemIds: a.defaults, custom: [] };
      setDraft(next);
      setSaved((s) => ({ ...s, [active]: { ...next, isDefault: true } }));
      setMessage({ ok: true, text: "Restored the default demo." });
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : "Could not reset" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Trial questions</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink/60">
            Choose which questions each free demo uses, or add your own trial questions. Demo reports are scored with
            the same formula as the full assessment. {RECOMMENDED} questions per demo is recommended.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/feedback"
            className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Feedback queue
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/admin/login", { method: "DELETE" });
              window.location.reload();
            }}
            className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-ink/60 hover:bg-brand-50"
          >
            Sign out
          </button>
        </div>
      </div>

      {!dbConfigured && (
        <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          MONGODB_URI is not set, so changes cannot be saved. Demos use the default question sets.
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
        {/* assessment list */}
        <nav className="space-y-1.5 lg:sticky lg:top-24 lg:self-start">
          {data.map((d) => {
            const dr = drafts[d.slug];
            const n = dr.itemIds.length + dr.custom.length;
            const isDirty = !sameDraft(dr, saved[d.slug]);
            return (
              <button
                key={d.slug}
                onClick={() => {
                  setActive(d.slug);
                  setFilter("all");
                  setQuery("");
                  setMessage(null);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  d.slug === active ? "bg-brand-600 font-bold text-white" : "font-medium text-ink/75 hover:bg-brand-50"
                }`}
              >
                <span>
                  {d.name}
                  {isDirty && <span className="ml-1 text-accent-400">•</span>}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    d.slug === active ? "bg-white/20" : saved[d.slug].isDefault ? "bg-ink/5 text-ink/50" : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {n}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="min-w-0">
          {/* toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
            <div>
              <p className="font-bold text-ink">
                {a.name} <span className="font-mono text-xs text-ink/40">{a.id}</span>
              </p>
              <p className="text-xs text-ink/50">
                {count} trial question{count === 1 ? "" : "s"}
                {count !== RECOMMENDED && ` (recommended ${RECOMMENDED})`} ·{" "}
                {saved[active].isDefault ? "default set" : `customised${saved[active].updatedAt ? ` ${new Date(saved[active].updatedAt!).toLocaleString()}` : ""}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/tests/${a.slug}/take`}
                target="_blank"
                className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                Preview demo ↗
              </Link>
              <button
                onClick={reset}
                disabled={busy || !dbConfigured || saved[active].isDefault}
                className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-ink/60 hover:bg-brand-50 disabled:opacity-40"
              >
                Reset to default
              </button>
              <button
                onClick={save}
                disabled={busy || !dbConfigured || !dirty || count === 0}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-40"
              >
                {busy ? "Saving…" : "Save trial set"}
              </button>
            </div>
          </div>
          {message && (
            <p className={`mt-3 rounded-xl p-3 text-sm font-semibold ${message.ok ? "bg-brand-50 text-brand-800" : "bg-accent-50 text-accent-700"}`}>
              {message.text}
            </p>
          )}

          {/* current trial set */}
          <section className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-ink">Demo order (as learners see it)</h2>
            {count === 0 && <p className="mt-3 text-sm text-ink/50">No trial questions selected yet.</p>}
            <ol className="mt-3 space-y-2">
              {trialInOrder.map((i, n) => (
                <li key={i.id} className="flex items-start gap-3 rounded-xl bg-brand-50/50 p-3 text-sm">
                  <span className="font-mono text-xs font-bold text-brand-700">{n + 1}.</span>
                  <span className="flex-1 text-ink/80">
                    {i.text}
                    <span className="mt-1 block text-[11px] text-ink/45">
                      Q{i.n} · {i.id} · {dimName[i.dim]}
                      {i.rev ? " · reverse-scored" : ""}
                      {i.ans ? ` · answer ${i.ans}` : ""}
                    </span>
                  </span>
                  <button onClick={() => toggle(i.id)} className="text-ink/40 hover:text-accent-600" aria-label="Remove from trial">
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
              {draft.custom.map((c, n) => (
                <li key={c.id} className="flex items-start gap-3 rounded-xl bg-accent-50/60 p-3 text-sm">
                  <span className="font-mono text-xs font-bold text-accent-700">{trialInOrder.length + n + 1}.</span>
                  <span className="flex-1 text-ink/80">
                    {c.text}
                    {c.opts && (
                      <span className="mt-1 block text-xs text-ink/60">
                        {c.opts.map((o, k) => `${LETTERS[k]}. ${o}`).join("   ")}
                      </span>
                    )}
                    <span className="mt-1 block text-[11px] text-ink/45">
                      Custom · {dimName[c.dim]}
                      {c.rev ? " · reverse-scored" : ""}
                      {c.ans ? ` · answer ${c.ans}` : ""}
                    </span>
                  </span>
                  <button
                    onClick={() => setDraft({ ...draft, custom: draft.custom.filter((x) => x.id !== c.id) })}
                    className="text-ink/40 hover:text-accent-600"
                    aria-label="Remove custom question"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ol>
          </section>

          <CustomQuestionForm
            key={active}
            objective={a.objective}
            dims={a.dims}
            onAdd={(c) => setDraft({ ...draft, custom: [...draft.custom, c] })}
          />

          {/* bank browser */}
          <section className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-bold text-ink">Question bank ({a.items.length})</h2>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search text or item ID"
                className="w-full rounded-full border border-brand-200 px-4 py-2 text-sm outline-none focus:border-brand-400 sm:w-64"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[{ code: "all", name: "All" }, { code: "selected", name: "In trial" }, ...a.dims].map((d) => (
                <button
                  key={d.code}
                  onClick={() => setFilter(d.code)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    filter === d.code ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-800 hover:bg-brand-100"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
            <ul className="mt-4 divide-y divide-brand-50">
              {visible.map((i) => {
                const on = selected.has(i.id);
                return (
                  <li key={i.id}>
                    <button onClick={() => toggle(i.id)} className="flex w-full items-start gap-3 py-3 text-left text-sm hover:bg-brand-50/40">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                          on ? "border-brand-600 bg-brand-600 text-white" : "border-brand-200 text-transparent"
                        }`}
                      >
                        <CheckIcon className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="flex-1">
                        <span className="text-ink/85">{i.text}</span>
                        {i.opts && (
                          <span className="mt-1 block text-xs text-ink/55">
                            {i.opts.map((o, k) => `${LETTERS[k]}. ${o}`).join("   ")}
                          </span>
                        )}
                        <span className="mt-1 block text-[11px] text-ink/45">
                          Q{i.n} · {i.id} · {dimName[i.dim]}
                          {i.rev ? " · reverse-scored" : ""}
                          {i.ans ? ` · answer ${i.ans}` : ""}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
              {visible.length === 0 && <li className="py-6 text-center text-sm text-ink/50">No questions match.</li>}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function CustomQuestionForm({
  objective,
  dims,
  onAdd,
}: {
  objective: boolean;
  dims: { code: string; name: string }[];
  onAdd: (c: CustomTrialItem) => void;
}) {
  const [text, setText] = useState("");
  const [dim, setDim] = useState(dims[0].code);
  const [rev, setRev] = useState(false);
  const [opts, setOpts] = useState(["", "", "", ""]);
  const [ans, setAns] = useState("A");
  const valid = text.trim().length > 3 && (!objective || opts.every((o) => o.trim()));

  return (
    <section className="mt-6 rounded-2xl border border-dashed border-accent-200 bg-accent-50/30 p-5">
      <h2 className="font-bold text-ink">Add a custom trial question</h2>
      <p className="mt-1 text-xs text-ink/55">
        Custom questions appear after the bank questions in the demo and count toward the chosen{" "}
        {objective ? "domain's score" : "dimension's score"}.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        maxLength={300}
        placeholder={objective ? "Question text" : "First-person statement, e.g. “I plan my work before I begin.”"}
        className="mt-4 w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400"
      />
      {objective && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {opts.map((o, k) => (
            <label key={k} className="flex items-center gap-2 text-sm">
              <input type="radio" name="custom-answer" checked={ans === LETTERS[k]} onChange={() => setAns(LETTERS[k])} />
              <span className="font-bold text-ink/60">{LETTERS[k]}</span>
              <input
                value={o}
                onChange={(e) => setOpts(opts.map((x, j) => (j === k ? e.target.value : x)))}
                maxLength={160}
                placeholder={`Option ${LETTERS[k]}`}
                className="flex-1 rounded-lg border border-brand-200 bg-white px-3 py-1.5 outline-none focus:border-brand-400"
              />
            </label>
          ))}
          <p className="text-xs text-ink/50 sm:col-span-2">Select the radio button next to the correct answer.</p>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-ink/70">{objective ? "Domain" : "Dimension"}</span>
          <select value={dim} onChange={(e) => setDim(e.target.value)} className="rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-sm">
            {dims.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        {!objective && (
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" checked={rev} onChange={(e) => setRev(e.target.checked)} />
            Reverse-scored (agreement lowers the score)
          </label>
        )}
        <button
          disabled={!valid}
          onClick={() => {
            onAdd({
              id: `CUSTOM-${Math.random().toString(36).slice(2, 12)}`,
              dim,
              text: text.trim(),
              ...(objective ? { opts: opts.map((o) => o.trim()), ans } : { rev }),
            });
            setText("");
            setRev(false);
            setOpts(["", "", "", ""]);
            setAns("A");
          }}
          className="ml-auto rounded-full bg-accent-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-accent-600 disabled:opacity-40"
        >
          Add to trial
        </button>
      </div>
    </section>
  );
}
