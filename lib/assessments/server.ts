import bankJson from "./data/bank.json";
import narrativesJson from "./data/narratives.json";
import { getDb } from "@/lib/db";
import type { AssessmentMeta } from "./catalog";
import type { Narrative, ReportDim, ReportPayload } from "./report-types";
import {
  scoreAssessment,
  type Answers,
  type Band,
  type BankItem,
  type PublicItem,
} from "./scoring";

/**
 * Server-only helpers. The item bank holds the scoring keys and aptitude
 * answers, which the handbooks require to stay out of learner view — never
 * import this module from a client component.
 */

const bank = bankJson as Record<string, BankItem[]>;

type DimNarrative = Narrative & {
  name: string;
  levels?: string[][];
  pair?: string;
};

type NarrativeSet = {
  bands?: Band[];
  dims: Record<string, DimNarrative>;
  pairs?: { pair: string; a: string; b: string }[];
  patterns?: Record<string, { name: string; brings: string; stretch: string }>;
};

const narratives = narrativesJson as unknown as Record<string, NarrativeSet>;

export function getBankItems(meta: AssessmentMeta): BankItem[] {
  return bank[meta.id] ?? [];
}

export function toPublic(items: BankItem[]): PublicItem[] {
  return items.map(({ id, n, text, opts }) => (opts ? { id, n, text, opts } : { id, n, text }));
}

export function dimensionNames(meta: AssessmentMeta): Record<string, string> {
  const dims = narratives[meta.slug]?.dims ?? {};
  return Object.fromEntries(meta.dims.map((d) => [d, dims[d]?.name ?? d]));
}

/* ------------------------------------------------------------------ */
/* Trial (demo) question sets — editable from /admin/assessments        */
/* ------------------------------------------------------------------ */

export type CustomTrialItem = {
  id: string;
  dim: string;
  text: string;
  rev?: boolean;
  opts?: string[];
  ans?: string;
};

export type TrialConfig = {
  slug: string;
  itemIds: string[];
  custom: CustomTrialItem[];
  updatedAt?: string;
  /** true when no admin edit exists and the catalog default is in use */
  isDefault: boolean;
};

export const TRIAL_COLLECTION = "assessmentTrials";

export async function getTrialConfig(meta: AssessmentMeta): Promise<TrialConfig> {
  const fallback: TrialConfig = { slug: meta.slug, itemIds: meta.demo, custom: [], isDefault: true };
  if (!process.env.MONGODB_URI) return fallback;
  try {
    const db = await getDb();
    const doc = await db.collection(TRIAL_COLLECTION).findOne({ slug: meta.slug });
    if (!doc) return fallback;
    return {
      slug: meta.slug,
      itemIds: Array.isArray(doc.itemIds) ? doc.itemIds : meta.demo,
      custom: Array.isArray(doc.custom) ? doc.custom : [],
      updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : undefined,
      isDefault: false,
    };
  } catch (err) {
    console.error("Trial config unavailable, using defaults:", err);
    return fallback;
  }
}

/** Trial questions in question-bank order, custom questions after them. */
export async function getTrialItems(meta: AssessmentMeta): Promise<BankItem[]> {
  const config = await getTrialConfig(meta);
  const chosen = new Set(config.itemIds);
  const fromBank = getBankItems(meta).filter((i) => chosen.has(i.id));
  const custom = config.custom.map((c, i) => ({ ...c, n: 10_000 + i }));
  return [...fromBank, ...custom];
}

/* ------------------------------------------------------------------ */
/* Answer validation                                                    */
/* ------------------------------------------------------------------ */

export function cleanAnswers(meta: AssessmentMeta, items: BankItem[], raw: unknown): Answers {
  const out: Answers = {};
  if (!raw || typeof raw !== "object") return out;
  const source = raw as Record<string, unknown>;
  for (const item of items) {
    const v = source[item.id];
    if (meta.scale === "objective") {
      if (typeof v === "string" && ["A", "B", "C", "D"].includes(v)) out[item.id] = v;
    } else if (typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 5) {
      out[item.id] = v;
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Report building                                                      */
/* ------------------------------------------------------------------ */

const demoLockedSections: Record<AssessmentMeta["mode"], string[]> = {
  independent: ["Every score and band", "Strengths and watch-outs", "Career environments to explore", "Development actions", "Reflection prompts"],
  ranked: ["Full ranked profile", "Near-tie analysis", "Strengths and trade-offs", "Career environments to explore", "Development actions"],
  topThree: ["Your full top-three profile", "Near-tie analysis", "Strengths and pressure trade-offs", "Career environments to explore", "Development practices"],
  pairs: ["All four preference pairs", "Clarity scores for every pair", "Your original pattern summary", "Career-environment clues", "Development actions"],
  objective: ["Every domain percentage", "Worked explanations", "Career and course demands", "Practice priorities"],
};

/** The Big Five handbook describes lower, middle and higher expression. */
function bigFiveLevel(n: DimNarrative | undefined, index: number | null) {
  if (!n?.levels || index === null) return undefined;
  const key = index < 40 ? /^Lower/ : index < 60 ? /^Middle/ : /^Higher/;
  return n.levels.find((r) => key.test(r[0]))?.[1];
}

function narrativeOf(n: DimNarrative | undefined): Narrative | undefined {
  if (!n) return undefined;
  const { tagline, definition, lens, strengths, careers, actions, reflection, communication, watch } = n;
  return { tagline, definition, lens, strengths, careers, actions, reflection, communication, watch };
}

export function buildReport(
  meta: AssessmentMeta,
  items: BankItem[],
  answers: Answers,
  mode: "demo" | "full"
): ReportPayload {
  const set = narratives[meta.slug];
  const demo = mode === "demo";
  const result = scoreAssessment(meta, items, answers, {
    demo,
    bands: meta.mode === "pairs" ? undefined : set.bands,
    clarityBands: meta.mode === "pairs" ? set.bands : undefined,
    pairs: set.pairs,
  });
  const name = (code: string) => set.dims[code]?.name ?? code;

  const dims: ReportDim[] = result.dims.map((d) => ({
    code: d.code,
    name: name(d.code),
    index: d.index,
    band: d.band ? { label: d.band.label, meaning: d.band.meaning } : undefined,
    status: d.status,
    answered: d.answered,
    expected: d.expected,
    correct: d.correct,
    narrative: narrativeOf(set.dims[d.code]),
    levelText: meta.slug === "big-five" ? bigFiveLevel(set.dims[d.code], d.index) : undefined,
  }));

  // Lead dimension: highest scored index (display order is already ranked
  // for every mode except independent, where handbook order is kept).
  const scored = dims.filter((d) => d.index !== null);
  const lead = [...scored].sort((a, b) => (b.index ?? 0) - (a.index ?? 0))[0];

  const payload: ReportPayload = {
    slug: meta.slug,
    name: meta.name,
    mode,
    scoringMode: meta.mode,
    status: result.status,
    answered: result.answered,
    total: result.total,
    dimNoun: meta.dimNoun,
    headline: { eyebrow: "", title: "" },
    dims,
    topThree: result.topThree,
    nearTies: result.nearTies,
    flags: result.flags,
    fullItemCount: getBankItems(meta).length,
  };

  if (meta.mode === "pairs" && result.pairs) {
    const pole = (code: string) => result.dims.find((d) => d.code === code);
    payload.pairs = result.pairs.map((p) => ({
      pair: p.pair,
      a: { code: p.a, name: name(p.a), index: pole(p.a)?.index ?? null },
      b: { code: p.b, name: name(p.b), index: pole(p.b)?.index ?? null },
      clarity: p.clarity,
      band: p.band ? { label: p.band.label, meaning: p.band.meaning } : undefined,
      letter: p.letter,
      status: p.status,
    }));
    payload.code = result.code;
    const pattern = result.code && !/[X?]/.test(result.code) ? set.patterns?.[result.code] : undefined;
    if (pattern) {
      payload.pattern = { code: result.code!, ...pattern };
      payload.related = { href: `/personality-types/${result.code!.toLowerCase()}`, label: `Explore the ${result.code} profile` };
    }
    payload.headline = {
      eyebrow: "Your current preference pattern",
      title: pattern ? pattern.name : "Your four preference pairs",
      code: result.code,
      text: pattern
        ? `May bring: ${pattern.brings}.`
        : "One or more pairs are balanced, so an X keeps that position open rather than forcing a letter.",
    };
  } else if (meta.mode === "objective" && result.aptitude) {
    payload.aptitude = result.aptitude;
    payload.headline = {
      eyebrow: "Your reasoning snapshot",
      title: lead ? `Strongest domain: ${lead.name}` : "Your reasoning snapshot",
      text: `${result.aptitude.correct} correct out of ${result.aptitude.attempted} attempted. This is current performance evidence — not an IQ, percentile or fixed ability label.`,
    };
  } else if (meta.mode === "topThree" && result.topThree) {
    payload.code = result.code;
    payload.headline = {
      eyebrow: `Your top three ${meta.dimNoun}s`,
      title: result.topThree.map(name).join(" · "),
      code: result.code,
      text: lead?.narrative?.definition,
    };
  } else if (lead) {
    payload.headline = {
      eyebrow: meta.mode === "ranked" ? `Your leading ${meta.dimNoun}` : `Your most strongly expressed ${meta.dimNoun}`,
      title: lead.name,
      text: lead.narrative?.definition,
    };
  } else {
    payload.headline = { eyebrow: "Your profile", title: "Not enough answers to score yet" };
  }

  if (demo) return redactForDemo(payload, lead?.code);
  return payload;
}

/**
 * The demo shows only a few points of the report: the lead dimension with its
 * score, band and definition. Everything else is withheld server-side (not just
 * blurred in the browser) until the learner subscribes.
 */
function redactForDemo(p: ReportPayload, leadCode?: string): ReportPayload {
  const dims: ReportDim[] = p.dims.map((d) =>
    d.code === leadCode
      ? {
          ...d,
          narrative: d.narrative && {
            tagline: d.narrative.tagline,
            definition: d.narrative.definition,
            strengths: d.narrative.strengths?.slice(0, 1),
          },
          levelText: undefined,
        }
      : { code: d.code, name: d.name, index: null, status: d.status, answered: 0, expected: 0, locked: true }
  );
  const pairs = p.pairs?.map((pair, i) =>
    i === 0 ? pair : { ...pair, a: { ...pair.a, index: null }, b: { ...pair.b, index: null }, clarity: null, band: undefined, locked: true }
  );
  const lead = dims.find((d) => d.code === leadCode);
  let headline = p.headline;
  if (p.scoringMode === "pairs") {
    // keep the code, but the pattern name and description are for subscribers
    headline = { ...p.headline, title: "Your preference pattern", text: undefined };
  } else if (p.scoringMode === "topThree" && lead) {
    headline = { eyebrow: `Your leading ${p.dimNoun}`, title: lead.name, text: lead.narrative?.definition };
  }
  return {
    ...p,
    dims,
    pairs,
    pattern: undefined,
    related: undefined,
    headline,
    topThree: undefined,
    code: p.scoringMode === "pairs" ? p.code : undefined,
    nearTies: [],
    aptitude: p.aptitude && { ...p.aptitude, percent: null },
    lockedSections: demoLockedSections[p.scoringMode],
  };
}

/* ------------------------------------------------------------------ */
/* Anonymous result log                                                 */
/* ------------------------------------------------------------------ */

export async function logResult(report: ReportPayload) {
  if (!process.env.MONGODB_URI) return;
  try {
    const db = await getDb();
    await db.collection("assessmentResults").insertOne({
      slug: report.slug,
      mode: report.mode,
      status: report.status,
      code: report.code,
      indices: Object.fromEntries(report.dims.filter((d) => d.index !== null).map((d) => [d.code, d.index])),
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("Failed to log assessment result:", err);
  }
}
