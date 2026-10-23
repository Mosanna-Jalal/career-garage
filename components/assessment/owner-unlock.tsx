"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * "See report as admin": the owner enters the owner password once and can
 * then view full reports and full assessments without a subscription.
 * Without `onUnlocked`, the current page is refreshed.
 */
export function OwnerUnlock({ onUnlocked, className = "" }: { onUnlocked?: () => void; className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/owner/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not unlock");
      setOpen(false);
      setPassword("");
      if (onUnlocked) onUnlocked();
      else router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not unlock");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/15 bg-white px-5 py-2.5 text-sm font-bold text-ink/70 transition hover:border-ink/40 hover:text-ink ${className}`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        </svg>
        See report as admin
      </button>
    );
  }

  return (
    <form onSubmit={submit} className={`flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-3 text-left ${className}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-ink/50" htmlFor="owner-password">
        Owner password
      </label>
      <div className="flex gap-2">
        <input
          id="owner-password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="min-w-0 flex-1 rounded-full border border-brand-200 px-4 py-2 text-sm outline-none focus:border-brand-400"
        />
        <button
          type="submit"
          disabled={busy || !password}
          className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
        >
          {busy ? "…" : "Unlock"}
        </button>
      </div>
      {error && <p className="text-xs font-semibold text-accent-600">{error}</p>}
    </form>
  );
}
