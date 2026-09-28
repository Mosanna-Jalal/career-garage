/**
 * The report payload returned by POST /api/assessments/[slug]/score.
 * Shared by the API and the client report view — keep it free of imports
 * from the question bank so no keys reach the browser bundle.
 */

export type Narrative = {
  tagline?: string;
  definition?: string;
  lens?: string[][];
  strengths?: string[];
  careers?: string;
  actions?: string[];
  reflection?: string;
  communication?: string;
  watch?: string;
};

export type ReportDim = {
  code: string;
  name: string;
  index: number | null;
  band?: { label: string; meaning: string };
  status: "scored" | "insufficient";
  answered: number;
  expected: number;
  correct?: number;
  /** demo reports hide the score and narrative for all but the lead dimension */
  locked?: boolean;
  narrative?: Narrative;
  /** Big Five: the handbook's "how this level may appear" text for the band */
  levelText?: string;
};

export type ReportPair = {
  pair: string;
  a: { code: string; name: string; index: number | null };
  b: { code: string; name: string; index: number | null };
  clarity: number | null;
  band?: { label: string; meaning: string };
  letter: string;
  status: "scored" | "incomplete";
  locked?: boolean;
};

export type ReportPayload = {
  slug: string;
  name: string;
  mode: "demo" | "full";
  scoringMode: "independent" | "ranked" | "topThree" | "pairs" | "objective";
  status: "complete" | "incomplete";
  answered: number;
  total: number;
  dimNoun: string;
  headline: { eyebrow: string; title: string; text?: string; code?: string };
  dims: ReportDim[];
  topThree?: string[];
  nearTies: [string, string][];
  pairs?: ReportPair[];
  code?: string;
  pattern?: { code: string; name: string; brings: string; stretch: string };
  aptitude?: { correct: number; attempted: number; outOf: number; percent: number | null };
  flags: string[];
  /** demo only: report sections available after subscribing */
  lockedSections?: string[];
  /** full-test item count, for the demo upsell */
  fullItemCount: number;
  /** link to a related profile page, e.g. the 16-type profile for a code */
  related?: { href: string; label: string };
};
