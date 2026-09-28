import type { AssessmentMeta } from "./catalog";

/**
 * Deterministic scoring engine — a direct implementation of the Career Garage
 * 13-Assessment Technical Specification Manual pseudocode:
 *
 *   keyed  = 6 - response  (reverse items)  |  response  (direct items)
 *   mean   = sum(keyed answered items) / answered_count
 *   index  = ((unrounded_mean - 1) / 4) * 100, rounded half-up for display
 *   a dimension is scored only when its minimum answered count is met
 *
 * plus the assessment-specific rules: top three and near ties (< 5 points)
 * for Enneagram/RIASEC, ranked tie groups for DISC/Work Values/Learning,
 * pole pairs with clarity and X codes for the MBTI-style programme, and
 * right/wrong domain percentages for Cognitive Aptitude (never an IQ).
 */

export type BankItem = {
  /** global question number, 1–772 */
  n: number;
  id: string;
  /** dimension (or pole) code */
  dim: string;
  text: string;
  rev?: boolean;
  /** objective items only */
  opts?: string[];
  ans?: string;
};

/** What the browser is allowed to see: no dimension, key or answer. */
export type PublicItem = { id: string; n: number; text: string; opts?: string[] };

export type Answers = Record<string, number | string>;
export type Band = { min: number; max: number; label: string; meaning: string };

export type DimScore = {
  code: string;
  answered: number;
  expected: number;
  status: "scored" | "insufficient";
  /** 0–100 display index (Likert) or percentage (objective) */
  index: number | null;
  /** unrounded, for ranking and tie checks */
  raw: number | null;
  band?: Band;
  correct?: number;
};

export type PairScore = {
  pair: string;
  a: string;
  b: string;
  status: "scored" | "incomplete";
  difference: number | null;
  clarity: number | null;
  band?: Band;
  /** leaning pole, or X when clarity < 10 */
  letter: string;
};

export type ScoreResult = {
  mode: AssessmentMeta["mode"];
  status: "complete" | "incomplete";
  answered: number;
  total: number;
  /** in display order: handbook order for independent, ranked otherwise */
  dims: DimScore[];
  topThree?: string[];
  /** adjacent dimension codes whose indices differ by less than 5 points */
  nearTies: [string, string][];
  pairs?: PairScore[];
  code?: string;
  aptitude?: { correct: number; attempted: number; outOf: number; percent: number | null };
  flags: string[];
};

export const NEAR_TIE = 5;

/** Round half-up, as the manual specifies for displayed indices. */
export const displayRound = (x: number) => Math.floor(x + 0.5);

export function bandFor(bands: Band[] | undefined, value: number | null) {
  if (!bands || value === null) return undefined;
  return bands.find((b) => value >= b.min && value <= b.max);
}

function keyed(item: BankItem, response: number) {
  return item.rev ? 6 - response : response;
}

function isLikert(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 5;
}

/** score_likert_dimension(item_rows, min_answered) from the manual. */
function scoreLikertDimension(
  code: string,
  items: BankItem[],
  answers: Answers,
  minAnswered: number,
  bands?: Band[]
): DimScore {
  const values: number[] = [];
  for (const item of items) {
    const r = answers[item.id];
    if (!isLikert(r)) continue;
    values.push(keyed(item, r));
  }
  if (values.length < minAnswered || values.length === 0) {
    return { code, answered: values.length, expected: items.length, status: "insufficient", index: null, raw: null };
  }
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const raw = ((mean - 1) / 4) * 100;
  const index = displayRound(raw);
  return {
    code,
    answered: values.length,
    expected: items.length,
    status: "scored",
    index,
    raw,
    band: bandFor(bands, index),
  };
}

/** Stable sort by unrounded index, highest first; unscored dimensions last. */
function ranked(dims: DimScore[]) {
  return dims
    .map((d, i) => ({ d, i }))
    .sort((x, y) => (y.d.raw ?? -1) - (x.d.raw ?? -1) || x.i - y.i)
    .map(({ d }) => d);
}

function adjacentTies(dims: DimScore[], limit = dims.length): [string, string][] {
  const out: [string, string][] = [];
  const scored = dims.filter((d) => d.raw !== null).slice(0, limit);
  for (let i = 1; i < scored.length; i++) {
    if (Math.abs(scored[i - 1].raw! - scored[i].raw!) < NEAR_TIE) {
      out.push([scored[i - 1].code, scored[i].code]);
    }
  }
  return out;
}

/** A long run of identical Likert answers is worth a gentle review note. */
function lowVariance(items: BankItem[], answers: Answers) {
  const vals = items.map((i) => answers[i.id]).filter(isLikert);
  return vals.length >= 8 && vals.every((v) => v === vals[0]);
}

export type ScoreOptions = {
  /**
   * Demo mode scores the ten trial questions with the same formula, but a
   * dimension needs only one answered item and there is no overall minimum.
   */
  demo?: boolean;
  bands?: Band[];
  clarityBands?: Band[];
  /** MBTI pole pairs in handbook order */
  pairs?: { pair: string; a: string; b: string }[];
};

export function scoreAssessment(
  meta: AssessmentMeta,
  items: BankItem[],
  answers: Answers,
  opts: ScoreOptions = {}
): ScoreResult {
  const demo = Boolean(opts.demo);
  const dimsPresent = meta.dims.filter((d) => items.some((i) => i.dim === d));
  const byDim = (code: string) => items.filter((i) => i.dim === code);
  const answered = items.filter((i) => answers[i.id] !== undefined && answers[i.id] !== null).length;
  const flags: string[] = [];

  /* ---------- Cognitive Aptitude: objective right/wrong ---------- */
  if (meta.mode === "objective") {
    let correct = 0;
    let attempted = 0;
    const dims: DimScore[] = dimsPresent.map((code) => {
      const its = byDim(code);
      const tried = its.filter((i) => ["A", "B", "C", "D"].includes(String(answers[i.id])));
      const right = tried.filter((i) => answers[i.id] === i.ans).length;
      correct += right;
      attempted += tried.length;
      const min = demo ? 1 : meta.minPerDim;
      if (tried.length < min) {
        return { code, answered: tried.length, expected: its.length, status: "insufficient", index: null, raw: null, correct: right };
      }
      // manual: domain_percent = (correct / 10) * 100 — the denominator is the
      // domain's item count, so skipped items are missing, not rescaled away
      const raw = (right / its.length) * 100;
      return { code, answered: tried.length, expected: its.length, status: "scored", index: displayRound(raw), raw, correct: right };
    });
    const complete = attempted === items.length;
    if (!complete) flags.push("incomplete");
    const r = ranked(dims);
    return {
      mode: meta.mode,
      status: complete ? "complete" : "incomplete",
      answered: attempted,
      total: items.length,
      dims: r,
      nearTies: [],
      aptitude: {
        correct,
        attempted,
        outOf: items.length,
        // manual: total only when every item was attempted
        percent: complete ? displayRound((correct / items.length) * 100) : null,
      },
      flags,
    };
  }

  /* ---------- MBTI-style: eight direct pole means, four pairs ---------- */
  if (meta.mode === "pairs") {
    const min = demo ? 1 : meta.minPerDim;
    const poles = new Map(
      dimsPresent.map((code) => [code, scoreLikertDimension(code, byDim(code), answers, min, opts.bands)])
    );
    const pairs: PairScore[] = (opts.pairs ?? []).map(({ pair, a, b }) => {
      const pa = poles.get(a);
      const pb = poles.get(b);
      if (!pa || !pb || pa.status !== "scored" || pb.status !== "scored") {
        return { pair, a, b, status: "incomplete", difference: null, clarity: null, letter: "?" };
      }
      // difference of means == difference of indices * 4 / 100
      const meanA = (pa.raw! / 100) * 4 + 1;
      const meanB = (pb.raw! / 100) * 4 + 1;
      const difference = meanA - meanB;
      const clarityRaw = (Math.abs(difference) / 4) * 100;
      const clarity = displayRound(clarityRaw);
      return {
        pair,
        a,
        b,
        status: "scored",
        difference,
        clarity,
        band: bandFor(opts.clarityBands, clarity),
        letter: clarityRaw < 10 ? "X" : difference > 0 ? a : b,
      };
    });
    const complete = pairs.every((p) => p.status === "scored");
    if (!complete) flags.push("incomplete");
    if (lowVariance(items, answers)) flags.push("low_variance");
    return {
      mode: meta.mode,
      status: complete ? "complete" : "incomplete",
      answered,
      total: items.length,
      dims: [...poles.values()],
      nearTies: [],
      pairs,
      code: pairs.map((p) => p.letter).join(""),
      flags,
    };
  }

  /* ---------- Likert dimension programmes ---------- */
  const min = demo ? 1 : meta.minPerDim;
  const dims = dimsPresent.map((code) => scoreLikertDimension(code, byDim(code), answers, min, opts.bands));
  const everyScored = dims.every((d) => d.status === "scored");
  const overallOk = demo || meta.minOverall === undefined || answered >= meta.minOverall;
  const complete = everyScored && overallOk;
  if (!complete) flags.push("incomplete");
  if (lowVariance(items, answers)) flags.push("low_variance");

  if (meta.mode === "independent") {
    // each trait persisted independently; no global score, no rank claims
    return { mode: meta.mode, status: complete ? "complete" : "incomplete", answered, total: items.length, dims, nearTies: [], flags };
  }

  const order = ranked(dims);
  if (meta.mode === "topThree") {
    // manual: suppress the top three when the profile is incomplete
    const topThree = complete ? order.slice(0, 3).map((d) => d.code) : undefined;
    const nearTies = complete ? adjacentTies(order, 3) : [];
    if (nearTies.length) flags.push("near_tie");
    return {
      mode: meta.mode,
      status: complete ? "complete" : "incomplete",
      answered,
      total: items.length,
      dims: order,
      topThree,
      nearTies,
      code: meta.id === "CG-RI" && topThree ? topThree.join("") : undefined,
      flags,
    };
  }

  // ranked: all dimensions, stable order, adjacent tie groups
  const nearTies = adjacentTies(order);
  if (nearTies.length) flags.push("near_tie");
  return { mode: meta.mode, status: complete ? "complete" : "incomplete", answered, total: items.length, dims: order, nearTies, flags };
}
