"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, CheckIcon, ShieldIcon } from "@/components/icons";
import { KidWithTrophy, StarDoodle, Squiggle } from "@/components/doodles";
import type { ReportDim, ReportPair, ReportPayload } from "@/lib/assessments/report-types";

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 118 0v4" />
    </svg>
  );
}

const confettiColors = ["#fe4711", "#29a29d", "#ffd166", "#7dd8d1", "#8a5cf6"];

function Celebration() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setOn(false), 1900);
    return () => clearTimeout(t);
  }, []);
  if (!on) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-16 z-10" aria-hidden="true">
      {Array.from({ length: 26 }, (_, i) => {
        const a = (i / 26) * Math.PI * 2;
        const d = 90 + ((i * 41) % 90);
        return (
          <span
            key={i}
            className="absolute block h-3 w-1.5 animate-confetti rounded-sm"
            style={
              {
                background: confettiColors[i % confettiColors.length],
                "--dx": `${Math.round(Math.cos(a) * d)}px`,
                "--dy": `${Math.round(Math.sin(a) * d)}px`,
                "--rot": `${(i * 73) % 360}deg`,
                animationDelay: `${(i % 4) * 0.04}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

function Bar({ dim, i, color, medal }: { dim: ReportDim; i: number; color: string; medal?: number }) {
  if (dim.locked) {
    return (
      <div className="relative">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium text-ink/70">{dim.name}</span>
          <LockIcon className="h-4 w-4 text-ink/40" />
        </div>
        <div className="locked-blur mt-2 h-3 rounded-full bg-brand-50">
          <div className="h-3 rounded-full bg-brand-200" style={{ width: `${35 + ((i * 23) % 45)}%` }} />
        </div>
      </div>
    );
  }
  if (dim.index === null) {
    return (
      <div>
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium text-ink/70">{dim.name}</span>
          <span className="text-xs text-ink/50">Not enough answers to score</span>
        </div>
        <div className="mt-2 h-3 rounded-full bg-ink/5" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-bold text-ink">
          {medal && (
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-300 text-[11px] font-extrabold text-amber-900">
              {medal}
            </span>
          )}
          {dim.name}
        </span>
        <span className="shrink-0 font-mono text-xs text-ink/60">
          {dim.correct !== undefined ? `${dim.correct}/${dim.expected} · ` : ""}
          {dim.index}
          {dim.correct !== undefined ? "%" : ""}
        </span>
      </div>
      <div className="mt-2 h-3 rounded-full bg-brand-50">
        <div
          className="animate-grow-bar h-3 rounded-full"
          style={{ width: `${Math.max(dim.index, 3)}%`, background: `linear-gradient(90deg, #7dd8d1, ${color})`, animationDelay: `${i * 0.1}s` }}
        />
      </div>
      {dim.band && <p className="mt-1.5 text-xs font-semibold text-brand-700">{dim.band.label}</p>}
    </div>
  );
}

function PairBar({ pair, i, color }: { pair: ReportPair; i: number; color: string }) {
  const lean = pair.letter === pair.a.code ? "a" : pair.letter === pair.b.code ? "b" : "x";
  const width = pair.clarity === null ? 0 : Math.max(pair.clarity / 2, 2);
  return (
    <div className={pair.locked ? "relative" : ""}>
      <div className="flex items-baseline justify-between text-sm">
        <span className={lean === "a" ? "font-bold text-brand-700" : "text-ink/60"}>
          {pair.a.code} · {pair.a.name}
          {pair.a.index !== null && <span className="ml-1 font-mono text-xs text-ink/50">{pair.a.index}</span>}
        </span>
        <span className={`text-right ${lean === "b" ? "font-bold text-brand-700" : "text-ink/60"}`}>
          {pair.b.index !== null && <span className="mr-1 font-mono text-xs text-ink/50">{pair.b.index}</span>}
          {pair.b.name} · {pair.b.code}
        </span>
      </div>
      <div className={`relative mt-2 h-3 rounded-full bg-brand-50 ${pair.locked ? "locked-blur" : ""}`}>
        <div className="absolute left-1/2 top-[-4px] h-5 w-0.5 bg-ink/20" />
        {!pair.locked && lean !== "x" && (
          <div
            className="animate-grow-bar absolute h-3 rounded-full"
            style={{
              width: `${width}%`,
              [lean === "a" ? "right" : "left"]: "50%",
              background: color,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        )}
        {pair.locked && <div className="absolute left-[30%] h-3 w-[25%] rounded-full bg-brand-200" />}
      </div>
      <p className="mt-1.5 text-xs text-ink/60">
        {pair.locked ? (
          <span className="inline-flex items-center gap-1 font-semibold text-ink/40">
            <LockIcon className="h-3.5 w-3.5" /> Unlock with the full report
          </span>
        ) : pair.status === "scored" ? (
          <>
            <span className="font-bold text-ink">{pair.band?.label ?? "Clarity"}</span> · clarity {pair.clarity}
            {pair.letter === "X" && " — shown as X"}
          </>
        ) : (
          "Not enough answers for this pair"
        )}
      </p>
    </div>
  );
}

function NarrativeCard({ dim, color, open = true }: { dim: ReportDim; color: string; open?: boolean }) {
  const n = dim.narrative;
  if (!n) return null;
  return (
    <details open={open} className="group rounded-3xl border border-brand-100 bg-white p-6 shadow-sm open:shadow-md [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div>
          <p className="text-xl font-extrabold tracking-tight text-ink">{dim.name}</p>
          {n.tagline && <p className="mt-1 text-sm font-medium text-brand-700">{n.tagline}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {dim.index !== null && (
            <span className="rounded-full px-3 py-1 font-mono text-sm font-bold text-white" style={{ background: color }}>
              {dim.index}
            </span>
          )}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-lg text-brand-600 transition group-open:rotate-45">+</span>
        </div>
      </summary>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink/75">
        {dim.band && (
          <p className="rounded-2xl bg-brand-50/70 p-3">
            <span className="font-bold text-brand-800">{dim.band.label}: </span>
            {dim.band.meaning}
          </p>
        )}
        {n.definition && <p>{n.definition}</p>}
        {dim.levelText && (
          <p>
            <span className="font-bold text-ink">How this may appear for you: </span>
            {dim.levelText}
          </p>
        )}
        {n.lens && (
          <dl className="grid gap-3 sm:grid-cols-2">
            {n.lens.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-brand-50 p-3">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-brand-600">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {n.strengths && n.strengths.length > 0 && (
          <div>
            <p className="font-bold text-ink">Potential strengths</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {n.strengths.map((s) => (
                <span key={s} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {n.watch && (
          <p>
            <span className="font-bold text-ink">Watch for: </span>
            {n.watch}
          </p>
        )}
        {n.communication && (
          <p>
            <span className="font-bold text-ink">Communication practice: </span>
            {n.communication}
          </p>
        )}
        {n.careers && (
          <p>
            <span className="font-bold text-ink">Career environments to explore: </span>
            {n.careers}
          </p>
        )}
        {n.actions && n.actions.length > 0 && (
          <div>
            <p className="font-bold text-ink">Try next</p>
            <ul className="mt-2 space-y-2">
              {n.actions.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-brand-100 p-0.5 text-brand-700">
                    <CheckIcon className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
        {n.reflection && (
          <p className="rounded-2xl border-l-4 border-accent-400 bg-accent-50/60 p-3 italic">
            <span className="not-italic font-bold text-accent-700">Reflect: </span>
            {n.reflection}
          </p>
        )}
      </div>
    </details>
  );
}

const flagText: Record<string, string> = {
  incomplete:
    "Some parts of the profile could not be scored because too few questions were answered. Scores that are shown are still valid; complete the remaining questions for a full profile.",
  low_variance:
    "Your answers were very similar throughout. That can be genuine, but it can also make a profile less informative — consider discussing the result with a counsellor.",
};

export function ReportView({ report, color, onRetake }: { report: ReportPayload; color: string; onRetake: () => void }) {
  const demo = report.mode === "demo";
  const top = new Set(report.topThree ?? []);
  const narrativeDims = (() => {
    if (demo) return report.dims.filter((d) => !d.locked && d.narrative);
    if (report.scoringMode === "pairs")
      return report.dims.filter((d) => report.pairs?.some((p) => p.letter === d.code));
    return report.dims.filter((d) => d.narrative && d.status === "scored");
  })();
  const code = report.headline.code;

  return (
    <div className="relative animate-fade-up">
      <Celebration />

      {/* ---------- headline ---------- */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-900 p-8 text-white shadow-2xl sm:p-10">
        <div className="pointer-events-none absolute -right-2 bottom-0 hidden sm:block" aria-hidden="true">
          <KidWithTrophy className="h-36 w-24 animate-hop" shirt="#ffd166" />
        </div>
        <StarDoodle className="pointer-events-none absolute left-6 top-6 h-7 w-7 animate-twinkle text-accent-300" aria-hidden="true" />
        <div className="relative max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-200">
            {demo ? "Demo report" : "Your report"} · {report.name}
          </p>
          <p className="mt-4 text-sm font-semibold text-brand-100">{report.headline.eyebrow}</p>
          {code && (
            <p className="mt-2 flex gap-2">
              {code.split("").map((l, i) => (
                <span
                  key={i}
                  className={`flex h-14 w-12 items-center justify-center rounded-2xl font-mono text-3xl font-extrabold ${
                    l === "X" || l === "?" ? "bg-white/15 text-white/70" : "bg-white text-brand-800"
                  }`}
                >
                  {l}
                </span>
              ))}
            </p>
          )}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{report.headline.title}</h1>
          {report.headline.text && <p className="mt-3 leading-relaxed text-brand-100/90">{report.headline.text}</p>}
          {report.aptitude && (
            <p className="mt-4 inline-flex items-baseline gap-2 rounded-2xl bg-white/10 px-4 py-2">
              <span className="text-3xl font-extrabold">
                {report.aptitude.correct}/{report.aptitude.attempted}
              </span>
              <span className="text-sm text-brand-100">correct{report.aptitude.percent !== null ? ` · ${report.aptitude.percent}% overall` : ""}</span>
            </p>
          )}
        </div>
      </div>

      {demo && (
        <p className="mt-5 flex items-start gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0" />
          This is a demo estimate from {report.answered} of {report.fullItemCount} questions, scored with the same formula
          as the full assessment. The full assessment applies the complete scoring and completion rules.
        </p>
      )}

      {/* ---------- profile ---------- */}
      <div className="mt-8 rounded-[2rem] border border-brand-100 bg-white p-7 shadow-sm sm:p-9">
        <h2 className="text-lg font-extrabold text-ink">
          {report.scoringMode === "pairs" ? "Your four preference pairs" : `Your ${report.dimNoun} profile`}
        </h2>
        <div className="mt-6 space-y-6">
          {report.pairs
            ? report.pairs.map((p, i) => <PairBar key={p.pair} pair={p} i={i} color={color} />)
            : report.dims.map((d, i) => (
                <Bar
                  key={d.code}
                  dim={d}
                  i={i}
                  color={color}
                  medal={top.has(d.code) ? [...top].indexOf(d.code) + 1 : undefined}
                />
              ))}
        </div>
        {report.nearTies.length > 0 && (
          <p className="mt-6 rounded-2xl bg-brand-50/70 p-4 text-sm text-brand-900">
            <span className="font-bold">Near tie: </span>
            {report.nearTies
              .map(([a, b]) => `${report.dims.find((d) => d.code === a)?.name} and ${report.dims.find((d) => d.code === b)?.name}`)
              .join("; ")}{" "}
            are less than 5 points apart, so treat their order as provisional and explore both.
          </p>
        )}
        {report.pattern && (
          <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Original pattern summary · {report.pattern.code}</p>
            <p className="mt-1 text-lg font-extrabold text-ink">{report.pattern.name}</p>
            <p className="mt-2 text-sm text-ink/75">
              <span className="font-bold">May bring: </span>
              {report.pattern.brings}
            </p>
            <p className="mt-1 text-sm text-ink/75">
              <span className="font-bold">Useful stretch question: </span>
              {report.pattern.stretch}
            </p>
          </div>
        )}
      </div>

      {/* ---------- narratives ---------- */}
      {narrativeDims.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-extrabold text-ink">{demo ? "A first look" : "What your results may suggest"}</h2>
          {narrativeDims.map((d, i) => (
            <NarrativeCard
              key={d.code}
              dim={d}
              color={color}
              open={demo || report.scoringMode === "independent" || report.scoringMode === "pairs" || i < 3}
            />
          ))}
        </div>
      )}

      {/* ---------- locked sections (demo) ---------- */}
      {demo && report.lockedSections && (
        <div className="relative mt-8 overflow-hidden rounded-[2rem] border-2 border-dashed border-brand-200 bg-white p-7 sm:p-9">
          <div className="locked-blur space-y-3" aria-hidden="true">
            {report.lockedSections.map((s, i) => (
              <div key={s} className="rounded-2xl bg-brand-50 p-4">
                <div className="h-3 w-1/3 rounded bg-brand-200" />
                <div className="mt-3 h-2 rounded bg-brand-100" style={{ width: `${70 + ((i * 11) % 25)}%` }} />
                <div className="mt-2 h-2 w-3/5 rounded bg-brand-100" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/55 p-6">
            <div className="max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <LockIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-ink">Unlock your full report</h3>
              <ul className="mt-4 space-y-1.5 text-left text-sm text-ink/70">
                {report.lockedSections.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
                    {s}
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
                  All {report.fullItemCount} questions for a complete profile
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 font-bold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
                >
                  Subscribe to unlock <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link href={`/tests/${report.slug}/full`} className="text-sm font-semibold text-brand-700 hover:underline">
                  Already subscribed? Take the full assessment
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- notes ---------- */}
      {report.flags.filter((f) => flagText[f] && !(demo && f === "incomplete")).map((f) => (
        <p key={f} className="mt-6 rounded-2xl bg-ink/[0.03] p-4 text-sm text-ink/70">
          {flagText[f]}
        </p>
      ))}
      <p className="mt-6 text-xs leading-relaxed text-ink/50">
        Career Garage assessments are original, development-stage guidance tools — not diagnoses or population-normed tests.
        Scores describe your responses to this version; combine them with other evidence and a counsellor&apos;s view before
        important decisions.
      </p>

      <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-3">
        {report.related && (
          <Link
            href={report.related.href}
            className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 font-bold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
          >
            {report.related.label} <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )}
        {!demo && (
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full border-2 border-brand-200 bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Print / save as PDF
          </button>
        )}
        <Link href="/tests" className="rounded-full border-2 border-brand-200 bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50">
          Explore other assessments
        </Link>
        <button type="button" onClick={onRetake} className="rounded-full px-6 py-3 font-semibold text-ink/60 transition hover:text-ink">
          Retake
        </button>
      </div>
      <Squiggle className="mx-auto mt-10 h-5 w-32 text-brand-200" aria-hidden="true" />
    </div>
  );
}
