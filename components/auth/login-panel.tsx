"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, postJson, roleNames } from "@/components/connect/ui";

type Demo = { id: string; name: string; role: string; color: string; verified: boolean; headline?: string };

export function LoginPanel({ next = "/dashboard" }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demos, setDemos] = useState<Demo[] | null>(null);

  useEffect(() => {
    fetch("/api/auth/demo")
      .then((r) => r.json())
      .then((d) => setDemos(d.members ?? []))
      .catch(() => setDemos([]));
  }, []);

  const go = () => {
    window.location.href = next;
  };

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await postJson("/api/auth/login", { email, password });
      go();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={login} className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl shadow-brand-900/5">
        <h2 className="text-2xl font-extrabold text-ink">Sign in</h2>
        <label className="mt-6 block text-sm font-semibold text-ink/70">
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-400" />
        </label>
        <label className="mt-4 block text-sm font-semibold text-ink/70">
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-400" />
        </label>
        {error && <p className="mt-4 rounded-xl bg-accent-50 p-3 text-sm font-semibold text-accent-700">{error}</p>}
        <button disabled={busy} className="mt-6 w-full rounded-full bg-accent-500 py-3.5 font-bold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600 disabled:opacity-50">
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-5 text-center text-sm text-ink/60">
          New here?{" "}
          <Link href="/signup" className="font-bold text-brand-600 hover:underline">
            Create an account
          </Link>
        </p>
      </form>

      <div className="rounded-[2rem] border-2 border-dashed border-brand-200 bg-brand-50/50 p-8">
        <h2 className="text-xl font-extrabold text-ink">Try a demo profile</h2>
        <p className="mt-1.5 text-sm text-ink/60">
          Explore the student, teacher and parent dashboards and Career Garage Connect without signing up.
        </p>
        {demos === null && <p className="mt-6 text-sm text-ink/50">Loading profiles…</p>}
        {demos?.length === 0 && <p className="mt-6 text-sm text-ink/50">Demo profiles need the database to be configured.</p>}
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {demos?.map((d) => (
            <button
              key={d.id}
              onClick={async () => {
                setError(null);
                try {
                  await postJson("/api/auth/demo", { id: d.id });
                  go();
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Could not open demo");
                }
              }}
              className="hover-lift flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-3 text-left shadow-sm"
            >
              <Avatar name={d.name} color={d.color} verified={d.verified} />
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink">{d.name}</span>
                <span className="block truncate text-xs text-ink/55">
                  {roleNames[d.role]}
                  {d.headline ? ` · ${d.headline}` : ""}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
