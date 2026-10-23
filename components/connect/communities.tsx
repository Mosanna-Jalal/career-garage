"use client";

import { useMemo, useState } from "react";
import { Avatar, ChipPicker, postJson, roleNames } from "@/components/connect/ui";
import type { PCommunity } from "@/components/connect/types";
import {
  combinationFields,
  communityCategories,
  emptyCombination,
  type Combination,
} from "@/lib/connect/options";

const categoryIcon: Record<string, string> = {
  Career: "🩺", "Exam Prep": "📝", "Study Group": "📚", Technology: "🤖", Entrepreneurship: "🚀",
  Communication: "🎤", Science: "🔬", Professional: "🎓",
};

export function CombinationChips({ c }: { c: Combination }) {
  const chips = combinationFields.flatMap((f) => c[f.key].map((v) => ({ k: f.label, v: f.key === "roles" ? roleNames[v] + "s" : v })));
  if (!chips.length) return <p className="text-xs text-ink/45">Open to everyone</p>;
  return (
    <div className="flex flex-wrap gap-1">
      {chips.slice(0, 10).map((ch) => (
        <span key={ch.k + ch.v} title={ch.k} className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-800">
          {ch.v}
        </span>
      ))}
      {chips.length > 10 && <span className="text-[11px] text-ink/45">+{chips.length - 10}</span>}
    </div>
  );
}

export function CommunityCard({ c, onChanged, onOpen, focus }: { c: PCommunity; onChanged: () => void; onOpen: (id: string) => void; focus?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const join = async () => {
    setBusy(true);
    setError(null);
    try {
      const r = await postJson<{ status: string }>(`/api/connect/communities/${c.id}`, { action: "join" });
      onChanged();
      if (r.status === "member") onOpen(c.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not join");
    } finally {
      setBusy(false);
    }
  };
  return (
    <article className={`hover-lift flex flex-col rounded-3xl border bg-white p-5 shadow-sm ${focus ? "border-accent-400 ring-4 ring-accent-100" : "border-brand-100"}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-2xl">{categoryIcon[c.category] ?? "💬"}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-extrabold leading-tight text-ink">{c.name}</h3>
          <p className="mt-0.5 text-xs text-ink/50">
            {c.memberCount} member{c.memberCount === 1 ? "" : "s"} · {c.category} · {c.joinMode === "open" ? "Open" : "Request to join"}
          </p>
        </div>
        {c.fit && !c.isMember && <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">Fits you</span>}
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-ink/65">{c.description}</p>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-ink/40">Who it&apos;s for</p>
      <div className="mt-1.5">
        <CombinationChips c={c.combination} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink/50">
        {Object.entries(c.roleCounts).map(([r, n]) => (
          <span key={r}>
            {n} {roleNames[r]?.toLowerCase()}
            {n > 1 ? "s" : ""}
          </span>
        ))}
        {c.activity > 0 && <span>· {c.activity} posts this week</span>}
      </div>
      {c.owner && (
        <p className="mt-3 flex items-center gap-2 text-xs text-ink/55">
          <Avatar name={c.owner.name} color={c.owner.color} verified={c.owner.verified} size="h-6 w-6 text-[9px]" />
          Run by {c.owner.name}
        </p>
      )}
      <div className="mt-auto pt-4">
        {c.isMember ? (
          <button onClick={() => onOpen(c.id)} className="w-full rounded-full bg-brand-600 py-2.5 text-sm font-bold text-white">
            Open
          </button>
        ) : c.requested ? (
          <span className="block w-full rounded-full bg-ink/5 py-2.5 text-center text-sm font-bold text-ink/50">Request sent to owner</span>
        ) : (
          <button disabled={busy} onClick={join} className="w-full rounded-full border-2 border-brand-300 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50 disabled:opacity-50">
            {c.joinMode === "open" ? "Join" : "Request to join"}
          </button>
        )}
        {error && <p className="mt-2 text-xs font-semibold text-accent-600">{error}</p>}
      </div>
    </article>
  );
}

export function CommunitiesView({ communities, onChanged, onOpen, onCreate, focus }: { communities: PCommunity[]; onChanged: () => void; onOpen: (id: string) => void; onCreate: () => void; focus?: string }) {
  const [tab, setTab] = useState<"all" | "mine" | "discover">("all");
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      communities
        .filter((c) => (tab === "mine" ? c.isMember : tab === "discover" ? !c.isMember : true))
        .filter((c) => !q || `${c.name} ${c.description} ${c.category}`.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => Number(b.id === focus) - Number(a.id === focus) || Number(b.fit) - Number(a.fit)),
    [communities, tab, q, focus]
  );
  return (
    <div className="h-full overflow-y-auto p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink">Communities</h1>
        <button onClick={onCreate} className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent-500/20">
          + Create
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {(["all", "mine", "discover"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === t ? "bg-brand-600 text-white" : "bg-white text-ink/70 hover:bg-brand-50"}`}>
            {t === "all" ? "All communities" : t === "mine" ? "My communities" : "Discover"}
          </button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search communities…" className="ml-auto w-full rounded-full border border-brand-200 bg-white px-4 py-2 text-sm outline-none focus:border-brand-400 sm:w-64" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <CommunityCard key={c.id} c={c} onChanged={onChanged} onOpen={onOpen} focus={c.id === focus} />
        ))}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-sm text-ink/50">No communities here yet.</p>}
    </div>
  );
}

export function CreateCommunity({ onCreated, onCancel }: { onCreated: (id: string) => void; onCancel: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Study Group");
  const [joinMode, setJoinMode] = useState<"open" | "request">("request");
  const [combo, setCombo] = useState<Combination>({ ...emptyCombination });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await postJson<{ id: string }>("/api/connect/communities", { name, description, category, joinMode, combination: combo });
      onCreated(r.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create");
      setBusy(false);
    }
  };

  const preview: PCommunity = {
    id: "preview", name: name || "Your community", description: description || "Describe what members will do together.", category, owner: null,
    joinMode, combination: combo, memberCount: 1, roleCounts: {}, isMember: true, isOwner: true, requested: false, fit: true, activity: 0,
  };

  return (
    <div className="h-full overflow-y-auto p-5 sm:p-7">
      <h1 className="text-2xl font-extrabold text-ink">Create a community</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink/60">
        Choose the combination of people it&apos;s for. Everyone sees this before joining, and people who match are shown it first.
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-ink/70 sm:col-span-2">
              Name
              <input required value={name} onChange={(e) => setName(e.target.value)} maxLength={60} className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 outline-none focus:border-brand-400" />
            </label>
            <label className="text-sm font-semibold text-ink/70 sm:col-span-2">
              What will members do together?
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={280} rows={3} className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 outline-none focus:border-brand-400" />
            </label>
            <label className="text-sm font-semibold text-ink/70">
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5">
                {communityCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <div className="text-sm font-semibold text-ink/70">
              Joining
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(["request", "open"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setJoinMode(m)} className={`rounded-xl border-2 py-2.5 text-sm ${joinMode === m ? "border-brand-500 bg-brand-50 text-brand-800" : "border-brand-100 bg-white text-ink/60"}`}>
                    {m === "request" ? "Owner approves" : "Open"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-brand-100 bg-white p-5">
            <p className="font-bold text-ink">Who is it for?</p>
            {combinationFields.map((f) => (
              <div key={f.key}>
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-ink/45">{f.label}</p>
                <ChipPicker options={f.options} value={combo[f.key]} onChange={(v) => setCombo({ ...combo, [f.key]: v })} limit={f.key === "states" ? 10 : 14} />
              </div>
            ))}
          </div>
          {error && <p className="text-sm font-semibold text-accent-600">{error}</p>}
          <div className="flex gap-3">
            <button disabled={busy} className="rounded-full bg-accent-500 px-7 py-3 font-bold text-white disabled:opacity-50">
              {busy ? "Creating…" : "Create community"}
            </button>
            <button type="button" onClick={onCancel} className="rounded-full px-5 py-3 font-semibold text-ink/60">
              Cancel
            </button>
          </div>
        </form>
        <div className="lg:sticky lg:top-4 lg:self-start">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink/40">Preview — what others will see</p>
          <CommunityCard c={preview} onChanged={() => {}} onOpen={() => {}} />
        </div>
      </div>
    </div>
  );
}
