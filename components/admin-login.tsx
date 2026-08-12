"use client";

import { useState } from "react";
import { ShieldIcon } from "@/components/icons";

export function AdminLogin({ configured }: { configured: boolean }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not sign in");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4">
      <div className="rounded-3xl border border-brand-100 bg-white p-8 shadow-sm">
        <span className="inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700">
          <ShieldIcon className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
          Feedback panel
        </h1>

        {configured ? (
          <>
            <p className="mt-2 text-sm text-ink/60">
              Enter the password to view the review queue. You&apos;ll stay
              signed in on this browser for a year.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full rounded-xl border border-brand-100 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
              {error && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  {error}
                </p>
              )}
              <button
                disabled={busy || !token}
                className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-40"
              >
                {busy ? "Checking…" : "Sign in"}
              </button>
            </form>
          </>
        ) : (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm leading-relaxed text-amber-900">
              <strong>No password is set.</strong> Add{" "}
              <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">
                ADMIN_TOKEN=King2026
              </code>{" "}
              to <code className="text-xs">.env.local</code> and restart the dev
              server.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
