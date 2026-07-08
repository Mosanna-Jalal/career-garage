"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRightIcon, CheckIcon, Icon } from "@/components/icons";
import { getTypeByCode } from "@/lib/personality-types";
import type { Test } from "@/lib/tests";

const likert = [
  { value: -2, label: "Strongly disagree" },
  { value: -1, label: "Disagree" },
  { value: 0, label: "Neutral" },
  { value: 1, label: "Agree" },
  { value: 2, label: "Strongly agree" },
];

type ScaleResult = {
  id: string;
  label: string;
  blurb: string;
  icon: string;
  percent: number;
};

export function Quiz({ test }: { test: Test }) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array(test.questions.length).fill(null) as (number | null)[]
  );
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [takerCount, setTakerCount] = useState<number | null>(null);

  const total = test.questions.length;
  const answered = answers.filter((a) => a !== null).length;
  const progress = Math.round((answered / total) * 100);

  function answer(value: number) {
    const next = [...answers];
    next[current] = value;
    setAnswers(next);
    if (current < total - 1) {
      setCurrent(current + 1);
    } else if (next.every((a) => a !== null)) {
      setDone(true);
    } else {
      // jump back to the first unanswered question
      setCurrent(next.findIndex((a) => a === null));
    }
  }

  const results = useMemo(() => {
    if (!done) return null;

    if (test.kind === "axes" && test.axes) {
      // score each axis from -1 (left pole) .. +1 (right pole)
      const axisScores = test.axes.map((axis) => {
        const qs = test.questions
          .map((q, i) => ({ q, a: answers[i] ?? 0 }))
          .filter(({ q }) => q.key === axis.id);
        const max = qs.length * 2;
        const raw = qs.reduce((sum, { q, a }) => sum + a * (q.dir ?? 1), 0);
        const norm = max === 0 ? 0 : raw / max;
        const side = norm >= 0 ? axis.right : axis.left;
        return {
          axis,
          side,
          // strength of the preference, 50–100
          percent: Math.round(50 + Math.abs(norm) * 50),
        };
      });
      const code = axisScores.map((s) => s.side.code).join("");
      return { kind: "axes" as const, axisScores, code };
    }

    if (test.kind === "scales" && test.scales) {
      const scaleResults: ScaleResult[] = test.scales
        .map((scale) => {
          const qs = test.questions
            .map((q, i) => ({ q, a: answers[i] ?? 0 }))
            .filter(({ q }) => q.key === scale.id);
          const max = qs.length * 4; // -2..2 shifted to 0..4
          const raw = qs.reduce((sum, { a }) => sum + (a + 2), 0);
          return {
            id: scale.id,
            label: scale.label,
            blurb: scale.blurb,
            icon: scale.icon,
            percent: max === 0 ? 0 : Math.round((raw / max) * 100),
          };
        })
        .sort((a, b) => b.percent - a.percent);
      return { kind: "scales" as const, scaleResults };
    }

    return null;
  }, [done, answers, test]);

  // Persist an anonymous result summary (never the raw answers) and
  // pick up how many people have taken this test.
  useEffect(() => {
    if (!results) return;
    const payload =
      results.kind === "axes"
        ? {
            testSlug: test.slug,
            code: results.code,
            breakdown: Object.fromEntries(
              results.axisScores.map((s) => [s.axis.id, s.percent])
            ),
          }
        : {
            testSlug: test.slug,
            topScale: results.scaleResults[0].id,
            breakdown: Object.fromEntries(
              results.scaleResults.map((s) => [s.id, s.percent])
            ),
          };
    fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.count === "number") setTakerCount(data.count);
      })
      .catch(() => {
        // stats are a nice-to-have; results still render without them
      });
  }, [results, test.slug]);

  /* ---------------- Results view ---------------- */
  if (done && results) {
    const matchedType =
      results.kind === "axes" ? getTypeByCode(results.code) : undefined;

    return (
      <div className="animate-fade-up">
        <div className="text-center">
          <span className="inline-flex animate-pulse-soft rounded-3xl bg-brand-100 p-5 text-brand-700">
            <Icon name={test.icon} className="h-10 w-10" />
          </span>
          <p className="mt-5 text-sm font-bold uppercase tracking-wider text-brand-600">
            {test.resultHeading}
          </p>

          {results.kind === "axes" && (
            <>
              <h1 className="mt-2 font-mono text-5xl font-extrabold tracking-tight text-ink">
                {results.code}
              </h1>
              {matchedType && (
                <p className="mt-2 text-xl font-bold text-brand-700">
                  {matchedType.name}
                </p>
              )}
              {matchedType && (
                <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink/70">
                  {matchedType.summary}
                </p>
              )}
            </>
          )}

          {results.kind === "scales" && (
            <>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">
                {results.scaleResults[0].label}
              </h1>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink/70">
                {results.scaleResults[0].blurb}
              </p>
            </>
          )}
        </div>

        {takerCount !== null && takerCount > 1 && (
          <p className="mt-6 text-center text-sm text-ink/50">
            You&apos;re one of{" "}
            <span className="font-bold text-brand-600">
              {takerCount.toLocaleString()}
            </span>{" "}
            people who have taken this test.
          </p>
        )}

        {/* Breakdown */}
        <div className="mt-12 rounded-3xl border border-brand-100 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Your full breakdown</h2>

          {results.kind === "axes" && (
            <div className="mt-6 space-y-7">
              {results.axisScores.map(({ axis, side, percent }, i) => (
                <div key={axis.id}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span
                      className={
                        side.code === axis.left.code
                          ? "font-bold text-brand-700"
                          : "text-ink/50"
                      }
                    >
                      {axis.left.label}
                    </span>
                    <span
                      className={
                        side.code === axis.right.code
                          ? "font-bold text-brand-700"
                          : "text-ink/50"
                      }
                    >
                      {axis.right.label}
                    </span>
                  </div>
                  <div className="relative mt-2 h-3 rounded-full bg-brand-50">
                    <div
                      className="animate-grow-bar absolute h-3 rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                      style={{
                        width: `${percent}%`,
                        left: side.code === axis.left.code ? 0 : undefined,
                        right: side.code === axis.right.code ? 0 : undefined,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-ink/60">
                    <span className="font-bold text-ink">{percent}%</span>{" "}
                    {side.label.toLowerCase()} — {side.blurb}
                  </p>
                </div>
              ))}
            </div>
          )}

          {results.kind === "scales" && (
            <div className="mt-6 space-y-6">
              {results.scaleResults.map((s, i) => (
                <div key={s.id}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className={i === 0 ? "font-bold text-brand-700" : "font-medium text-ink/80"}>
                      {i === 0 && "★ "}
                      {s.label}
                    </span>
                    <span className="font-mono text-xs text-ink/60">
                      {s.percent}%
                    </span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-brand-50">
                    <div
                      className="animate-grow-bar h-3 rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                      style={{
                        width: `${s.percent}%`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                    {s.blurb}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {matchedType && (
            <Link
              href={`/personality-types/${matchedType.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-bold text-white shadow-xl shadow-accent-500/25 transition hover:bg-accent-600"
            >
              Read your full {results.kind === "axes" ? results.code : ""}{" "}
              profile <ArrowRightIcon className="h-5 w-5" />
            </Link>
          )}
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Try another test
          </Link>
          <button
            type="button"
            onClick={() => {
              setAnswers(Array(total).fill(null) as (number | null)[]);
              setCurrent(0);
              setDone(false);
              setTakerCount(null);
            }}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-ink/60 transition hover:text-ink"
          >
            Retake
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- Question view ---------------- */
  const q = test.questions[current];

  return (
    <div>
      {/* progress */}
      <div className="flex items-center justify-between text-sm font-semibold text-ink/60">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{progress}% complete</span>
      </div>
      <div className="mt-3 h-2.5 rounded-full bg-brand-100">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500"
          style={{ width: `${Math.max(progress, 3)}%` }}
        />
      </div>

      <div key={current} className="mt-10 animate-fade-up">
        <p className="min-h-24 text-center text-2xl font-bold leading-snug text-ink sm:text-[1.7rem]">
          “{q.text}”
        </p>

        <div className="mt-8 grid gap-3">
          {likert.map((opt) => {
            const selected = answers[current] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => answer(opt.value)}
                className={`group flex items-center justify-between rounded-2xl border-2 px-6 py-4 text-left font-semibold transition ${
                  selected
                    ? "border-brand-500 bg-brand-50 text-brand-800"
                    : "border-brand-100 bg-white text-ink/80 hover:border-brand-300 hover:bg-brand-50/50"
                }`}
              >
                {opt.label}
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                    selected
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-brand-200 text-transparent group-hover:border-brand-400"
                  }`}
                >
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-between text-sm font-semibold">
        <button
          type="button"
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="rounded-full px-5 py-2.5 text-ink/60 transition hover:text-ink disabled:invisible"
        >
          ← Back
        </button>
        {answers[current] !== null && current < total - 1 && (
          <button
            type="button"
            onClick={() => setCurrent(current + 1)}
            className="rounded-full px-5 py-2.5 text-brand-600 transition hover:text-brand-700"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
