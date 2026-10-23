"use client";

import Link from "next/link";
import { useState } from "react";
import { ChipPicker, postJson, roleNames } from "@/components/connect/ui";
import {
  careerInterestOptions,
  classOptions,
  interestOptions,
  languageOptions,
  skillOptions,
  stateOptions,
} from "@/lib/connect/options";

const roles = [
  { id: "student", blurb: "Classes 6–12, college and graduates" },
  { id: "parent", blurb: "Follow and support your child" },
  { id: "teacher", blurb: "School teachers and tutors" },
  { id: "professor", blurb: "College and university faculty" },
  { id: "counsellor", blurb: "Career counsellors and psychologists" },
  { id: "professional", blurb: "Industry experts and mentors" },
];

const input = "mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 outline-none focus:border-brand-400";

export function SignupForm({ initialRole }: { initialRole?: string }) {
  const [role, setRole] = useState(roles.some((r) => r.id === initialRole) ? initialRole! : "student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [p, setP] = useState({
    className: "", subject: "", school: "", city: "", state: "", goal: "", headline: "",
    interests: [] as string[], skills: [] as string[], careerInterests: [] as string[], languages: [] as string[],
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof p, v: string | string[]) => setP((x) => ({ ...x, [k]: v }));
  const student = role === "student";
  const parent = role === "parent";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await postJson("/api/auth/signup", { name, email, password, role, profile: p });
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <section>
        <h2 className="text-lg font-extrabold text-ink">I am a…</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`rounded-2xl border-2 p-4 text-left transition ${role === r.id ? "border-brand-500 bg-brand-50" : "border-brand-100 bg-white hover:border-brand-300"}`}
            >
              <span className="block font-bold text-ink">{roleNames[r.id]}</span>
              <span className="text-xs text-ink/55">{r.blurb}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-sm sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink/70">
          Full name
          <input required value={name} onChange={(e) => setName(e.target.value)} className={input} />
        </label>
        <label className="text-sm font-semibold text-ink/70">
          Email
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
        </label>
        <label className="text-sm font-semibold text-ink/70 sm:col-span-2">
          Password <span className="font-normal text-ink/45">(at least 8 characters)</span>
          <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        </label>
      </section>

      <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-ink">Your profile</h2>
        <p className="mt-1 text-sm text-ink/55">
          These help Career Garage Connect match you with the right people and communities. Complete 80% to earn your first Career Points.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {student && (
            <label className="text-sm font-semibold text-ink/70">
              Class / stage
              <select value={p.className} onChange={(e) => set("className", e.target.value)} className={input}>
                <option value="">Select…</option>
                {classOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
          )}
          {!parent && (
            <label className="text-sm font-semibold text-ink/70">
              {student ? "Favourite subject" : "Subject / field"}
              <input value={p.subject} onChange={(e) => set("subject", e.target.value)} className={input} />
            </label>
          )}
          {!parent && (
            <label className="text-sm font-semibold text-ink/70">
              {student ? "School / college" : "Institution / organisation"}
              <input value={p.school} onChange={(e) => set("school", e.target.value)} className={input} />
            </label>
          )}
          {!student && (
            <label className="text-sm font-semibold text-ink/70">
              Headline
              <input value={p.headline} onChange={(e) => set("headline", e.target.value)} placeholder={parent ? "Parent of a Class 10 student" : "e.g. Physics teacher · 10 years"} className={input} />
            </label>
          )}
          <label className="text-sm font-semibold text-ink/70">
            City
            <input value={p.city} onChange={(e) => set("city", e.target.value)} className={input} />
          </label>
          <label className="text-sm font-semibold text-ink/70">
            State
            <select value={p.state} onChange={(e) => set("state", e.target.value)} className={input}>
              <option value="">Select…</option>
              {stateOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          {!parent && (
            <label className="text-sm font-semibold text-ink/70 sm:col-span-2">
              {student ? "My goal" : "What I want to help with"}
              <input value={p.goal} onChange={(e) => set("goal", e.target.value)} className={input} />
            </label>
          )}
        </div>
        <div className="mt-6 space-y-5">
          {[
            ["Interests", "interests", interestOptions],
            ["Career interests", "careerInterests", careerInterestOptions],
            ...(parent ? [] : [["Skills", "skills", skillOptions]]),
            ["Languages", "languages", languageOptions],
          ].map(([label, key, opts]) => (
            <div key={key as string}>
              <p className="mb-2 text-sm font-semibold text-ink/70">{label as string}</p>
              <ChipPicker options={opts as string[]} value={p[key as "interests"]} onChange={(v) => set(key as "interests", v)} />
            </div>
          ))}
        </div>
      </section>

      {student && (
        <p className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          Under 18? A parent or guardian can link to your account and choose who may contact you. Only verified teachers and
          professionals can send you requests by default.
        </p>
      )}
      {error && <p className="rounded-xl bg-accent-50 p-3 text-sm font-semibold text-accent-700">{error}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={busy} className="rounded-full bg-accent-500 px-8 py-4 font-bold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600 disabled:opacity-50">
          {busy ? "Creating…" : "Create my account"}
        </button>
        <p className="text-sm text-ink/60">
          Already have one?{" "}
          <Link href="/login" className="font-bold text-brand-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
