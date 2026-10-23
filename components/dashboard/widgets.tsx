"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, postJson, roleNames } from "@/components/connect/ui";
import type { RequestSummary } from "@/lib/dashboard";
import type { Controls } from "@/lib/members";

export function RequestList({ requests }: { requests: RequestSummary[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (requests.length === 0) return <p className="text-sm text-ink/50">No pending requests.</p>;
  const decide = async (id: string, action: "accept" | "decline") => {
    setBusy(id);
    setError(null);
    try {
      await postJson(`/api/connect/requests/${id}`, { action });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update");
    } finally {
      setBusy(null);
    }
  };
  return (
    <ul className="space-y-3">
      {requests.map((r) => (
        <li key={r.id} className="flex items-start gap-3 rounded-2xl bg-brand-50/50 p-3">
          {r.from && <Avatar name={r.from.name} color={r.from.color} verified={r.from.verified} />}
          <div className="min-w-0 flex-1">
            <p className="text-sm text-ink">
              <span className="font-bold">{r.from?.name ?? "Someone"}</span>{" "}
              <span className="text-ink/60">
                {r.kind === "join" ? `wants to join ${r.community}` : `(${roleNames[r.from?.role ?? ""] ?? "member"}) wants to connect`}
              </span>
            </p>
            {r.note && <p className="mt-1 text-xs italic text-ink/60">“{r.note}”</p>}
            <div className="mt-2 flex gap-2">
              <button disabled={busy === r.id} onClick={() => decide(r.id, "accept")} className="rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold text-white disabled:opacity-50">
                Accept
              </button>
              <button disabled={busy === r.id} onClick={() => decide(r.id, "decline")} className="rounded-full border border-brand-200 px-4 py-1.5 text-xs font-semibold text-ink/60 disabled:opacity-50">
                Decline
              </button>
            </div>
          </div>
        </li>
      ))}
      {error && <li className="text-xs font-semibold text-accent-600">{error}</li>}
    </ul>
  );
}

export function LinkChild() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMsg(null);
        try {
          await postJson("/api/auth/profile", { childEmail: email }, "PATCH");
          router.refresh();
        } catch (err) {
          setMsg(err instanceof Error ? err.message : "Could not link");
        }
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your child's account email"
        className="flex-1 rounded-full border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400"
      />
      <button className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white">Link account</button>
      {msg && <p className="text-xs font-semibold text-accent-600 sm:self-center">{msg}</p>}
    </form>
  );
}

const contactChoices: { id: Controls["contactFrom"]; label: string; hint: string }[] = [
  { id: "verified", label: "Students and verified adults", hint: "Recommended — teachers and experts must be verified" },
  { id: "students", label: "Students only", hint: "No adult can send a request" },
  { id: "anyone", label: "Anyone on Career Garage", hint: "Least restrictive" },
  { id: "nobody", label: "Nobody", hint: "No new connections" },
];

export function ParentControls({ childName, initial }: { childName: string; initial: Controls }) {
  const router = useRouter();
  const [c, setC] = useState(initial);
  const [state, setState] = useState<"idle" | "saving" | "saved" | string>("idle");
  const toggle = (k: "privateMessages" | "showSchool" | "showCity" | "searchable", label: string) => (
    <label className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 text-sm">
      <span className="text-ink/80">{label}</span>
      <input type="checkbox" checked={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.checked })} className="h-4 w-4 accent-brand-600" />
    </label>
  );
  return (
    <div>
      <p className="text-sm font-bold text-ink">Who can contact {childName.split(" ")[0]}?</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {contactChoices.map((o) => (
          <label
            key={o.id}
            className={`cursor-pointer rounded-xl border-2 p-3 text-sm transition ${c.contactFrom === o.id ? "border-brand-500 bg-white" : "border-transparent bg-white/70"}`}
          >
            <input type="radio" name="contactFrom" className="sr-only" checked={c.contactFrom === o.id} onChange={() => setC({ ...c, contactFrom: o.id })} />
            <span className="block font-semibold text-ink">{o.label}</span>
            <span className="text-xs text-ink/55">{o.hint}</span>
          </label>
        ))}
      </div>
      <p className="mt-5 text-sm font-bold text-ink">Privacy</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {toggle("privateMessages", "Private messages with connections")}
        {toggle("searchable", "Appear in people search")}
        {toggle("showSchool", "Show school name")}
        {toggle("showCity", "Show city")}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={async () => {
            setState("saving");
            try {
              await postJson("/api/auth/profile", { controls: c }, "PATCH");
              setState("saved");
              router.refresh();
            } catch (e) {
              setState(e instanceof Error ? e.message : "Could not save");
            }
          }}
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-bold text-white"
        >
          {state === "saving" ? "Saving…" : "Save controls"}
        </button>
        {state === "saved" && <span className="text-sm font-semibold text-brand-700">Saved ✓</span>}
        {state !== "idle" && state !== "saving" && state !== "saved" && <span className="text-sm font-semibold text-accent-600">{state}</span>}
      </div>
    </div>
  );
}
