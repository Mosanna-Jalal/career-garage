"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { Rocket, StarDoodle, Sparkle } from "@/components/doodles";
import { ReportView } from "@/components/assessment/report-view";
import type { PublicItem } from "@/lib/assessments/scoring";
import type { ReportPayload } from "@/lib/assessments/report-types";

type Props = {
  slug: string;
  name: string;
  mode: "demo" | "full";
  objective: boolean;
  items: PublicItem[];
  /** labels for values 1–5, or A–D for objective items */
  options: string[];
  instructions: string[];
  note?: { response: string; note: string };
  fullCount: number;
  color: string;
};

type Answer = number | string;
const LETTERS = ["A", "B", "C", "D"];

const noSubscribe = () => () => {};
function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function AssessmentRunner(props: Props) {
  const { slug, name, mode, objective, items, options, instructions, note, fullCount, color } = props;
  const storageKey = `cg-assessment:${slug}:${mode}`;
  const [stage, setStage] = useState<"intro" | "questions" | "submitting" | "report">("intro");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [current, setCurrent] = useState(0);
  const [report, setReport] = useState<ReportPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = items.length;
  const answeredCount = items.filter((i) => answers[i.id] !== undefined).length;
  const progress = Math.round((answeredCount / total) * 100);
  const allAnswered = answeredCount === total;
  const canSubmit = objective ? answeredCount > 0 : allAnswered;

  // Progress saved earlier in this browser, so a long assessment can resume.
  const savedRaw = useSyncExternalStore(noSubscribe, () => readStorage(storageKey), () => null);
  const saved = useMemo(() => {
    try {
      const parsed = JSON.parse(savedRaw ?? "null");
      if (!parsed || typeof parsed !== "object") return null;
      const valid = Object.fromEntries(
        Object.entries(parsed as Record<string, Answer>).filter(([id]) => items.some((i) => i.id === id))
      );
      return Object.keys(valid).length > 0 ? valid : null;
    } catch {
      return null;
    }
  }, [savedRaw, items]);

  const begin = (resume: boolean) => {
    const start = resume && saved ? saved : {};
    if (!resume) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
    setAnswers(start);
    setCurrent(Math.max(0, items.findIndex((i) => start[i.id] === undefined)));
    setStage("questions");
  };

  useEffect(() => {
    if (stage !== "questions") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(answers));
    } catch {
      // ignore
    }
  }, [answers, stage, storageKey]);

  const submit = useCallback(
    async (final: Record<string, Answer>) => {
      setStage("submitting");
      setError(null);
      try {
        const res = await fetch(`/api/assessments/${slug}/score`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, answers: final }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Could not score your answers.");
        setReport(data as ReportPayload);
        setStage("report");
        try {
          localStorage.removeItem(storageKey);
        } catch {
          // ignore
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
        setStage("questions");
      }
    },
    [mode, slug, storageKey]
  );

  const choose = useCallback(
    (value: Answer) => {
      const item = items[current];
      const next = { ...answers, [item.id]: value };
      setAnswers(next);
      window.setTimeout(() => {
        if (current < total - 1) setCurrent((c) => Math.min(c + 1, total - 1));
        else {
          const firstGap = items.findIndex((i) => next[i.id] === undefined);
          if (firstGap >= 0 && !objective) setCurrent(firstGap);
        }
      }, 220);
    },
    [answers, current, items, objective, total]
  );

  // Keyboard: 1–5 for scales, A–D (or 1–4) for objective items
  useEffect(() => {
    if (stage !== "questions") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toUpperCase();
      if (objective) {
        const idx = LETTERS.includes(k) ? LETTERS.indexOf(k) : ["1", "2", "3", "4"].indexOf(k);
        if (idx >= 0) choose(LETTERS[idx]);
      } else if (["1", "2", "3", "4", "5"].includes(k)) {
        choose(Number(k));
      }
      if (e.key === "ArrowLeft") setCurrent((c) => Math.max(0, c - 1));
      if (e.key === "ArrowRight") setCurrent((c) => Math.min(total - 1, c + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, objective, choose, total]);

  /* ---------------- Report ---------------- */
  if (stage === "report" && report) {
    return (
      <ReportView
        report={report}
        color={color}
        onRetake={() => {
          setAnswers({});
          setCurrent(0);
          setReport(null);
          setStage("intro");
        }}
      />
    );
  }

  /* ---------------- Intro ---------------- */
  if (stage === "intro") {
    return (
      <div className="animate-fade-up">
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-white p-7 shadow-xl shadow-brand-900/5 sm:p-10">
          <StarDoodle className="absolute right-6 top-6 h-8 w-8 animate-twinkle text-accent-300" aria-hidden="true" />
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white"
            style={{ background: color }}
          >
            {mode === "demo" ? `Free demo · ${total} questions` : `Full assessment · ${total} questions`}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{name}</h1>

          <h2 className="mt-8 text-lg font-extrabold text-ink">Instructions</h2>
          <ul className="mt-4 space-y-3">
            {instructions.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="leading-relaxed text-ink/75">{t}</span>
              </li>
            ))}
          </ul>

          {note && (
            <div className="mt-8 rounded-2xl bg-brand-50/70 p-5">
              <p className="text-sm font-semibold text-brand-800">{note.note}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {options.map((o, i) => (
                  <span key={o} className="rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-ink/70">
                    {objective ? o : `${i + 1} · ${o}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {mode === "demo" && (
            <p className="mt-6 text-sm text-ink/60">
              The demo uses {total} of the {fullCount} questions and shows a few points of your report. The complete
              report comes with the full assessment.
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => begin(Boolean(saved))}
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
            >
              {saved ? `Resume (${Object.keys(saved).length}/${total} answered)` : "Start"}
              <ArrowRightIcon className="h-5 w-5" />
            </button>
            {saved && (
              <button
                type="button"
                onClick={() => begin(false)}
                className="rounded-full px-5 py-3 text-sm font-semibold text-ink/60 transition hover:text-ink"
              >
                Start over
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Questions ---------------- */
  const item = items[current];
  const selected = answers[item.id];
  const submitting = stage === "submitting";

  return (
    <div>
      {/* progress with a rocket riding it */}
      <div className="flex items-center justify-between text-sm font-semibold text-ink/60">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{progress}% complete</span>
      </div>
      <div className="relative mt-4 h-3 rounded-full bg-brand-100">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{ width: `${Math.max(progress, 2)}%`, background: `linear-gradient(90deg, #45bdb7, ${color})` }}
        />
        <div
          className="absolute -top-5 transition-all duration-500"
          style={{ left: `calc(${Math.max(progress, 2)}% - 14px)` }}
          aria-hidden="true"
        >
          <Rocket className="h-10 w-6 rotate-90" />
        </div>
      </div>

      <div key={item.id} className="relative mt-12 animate-fade-up rounded-[2rem] border border-brand-100 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-10">
        <Sparkle className="absolute -right-3 -top-3 h-7 w-7 animate-twinkle text-accent-300" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-wider text-ink/40">Q{current + 1}</p>
        <p className="mt-2 text-xl font-bold leading-snug text-ink sm:text-2xl">{item.text}</p>

        {objective && item.opts ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {item.opts.map((opt, i) => {
              const letter = LETTERS[i];
              const on = selected === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={submitting}
                  onClick={() => choose(letter)}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left font-semibold transition ${
                    on ? "border-brand-500 bg-brand-50 text-brand-800" : "border-brand-100 bg-white text-ink/80 hover:border-brand-300 hover:bg-brand-50/50"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                      on ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"
                    }`}
                  >
                    {letter}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {options.map((label, i) => {
              const value = i + 1;
              const on = selected === value;
              const size = ["h-11 w-11", "h-9 w-9", "h-7 w-7", "h-9 w-9", "h-11 w-11"][i];
              return (
                <button
                  key={label}
                  type="button"
                  disabled={submitting}
                  onClick={() => choose(value)}
                  className={`group flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition sm:flex-col sm:justify-center sm:px-2 sm:py-5 sm:text-center ${
                    on ? "border-brand-500 bg-brand-50" : "border-brand-100 bg-white hover:border-brand-300 hover:bg-brand-50/50"
                  }`}
                >
                  <span
                    className={`flex ${size} shrink-0 items-center justify-center rounded-full border-2 transition ${
                      on ? "border-brand-600 bg-brand-600 text-white" : "border-brand-200 text-transparent group-hover:border-brand-400"
                    }`}
                  >
                    <CheckIcon className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className={`text-sm font-semibold leading-tight ${on ? "text-brand-800" : "text-ink/70"}`}>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="mt-6 rounded-2xl bg-accent-50 p-4 text-sm font-semibold text-accent-700">{error}</p>}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0 || submitting}
          className="rounded-full px-5 py-2.5 text-ink/60 transition hover:text-ink disabled:invisible"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          {objective && current < total - 1 && selected === undefined && (
            <button
              type="button"
              onClick={() => setCurrent(current + 1)}
              className="rounded-full px-5 py-2.5 text-ink/50 transition hover:text-ink"
            >
              Skip for now
            </button>
          )}
          {selected !== undefined && current < total - 1 && (
            <button
              type="button"
              onClick={() => setCurrent(current + 1)}
              className="rounded-full px-5 py-2.5 text-brand-600 transition hover:text-brand-700"
            >
              Next →
            </button>
          )}
          {(current === total - 1 || allAnswered) && (
            <button
              type="button"
              disabled={!canSubmit || submitting}
              onClick={() => submit(answers)}
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 font-bold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Scoring…" : "See my report"}
              {!submitting && <ArrowRightIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
      {!objective && !allAnswered && current === total - 1 && (
        <p className="mt-3 text-right text-xs text-ink/50">
          Answer every question to see your report ({total - answeredCount} left).
        </p>
      )}

      <p className="mt-10 text-center text-xs text-ink/40">
        Tip: use keys {objective ? "A–D" : "1–5"} to answer and ← → to move.{" "}
        <Link href={`/tests/${slug}`} className="underline hover:text-ink/60">
          Back to the assessment page
        </Link>
      </p>
    </div>
  );
}
