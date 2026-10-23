import pointsJson from "./points.json";

/**
 * Career Points catalogue from the Universal Points, Rewards & Recognition
 * System 2026 handbook (scripts/site-content/build-points.mjs). Client-safe.
 */

export type PointAction = {
  code: string;
  section: string;
  activity: string;
  role?: string;
  cp: number;
  limit: string;
  evidence: string;
};

export type Level = { band: string; name: string; min: number; max: number | null; recognition: string };

export type PointsCatalogue = {
  architecture: { purpose: string; components: string[][]; multipliers: string[][]; principles: string[]; formula: string };
  roles: string[][];
  sections: { title: string; purpose: string }[];
  actions: PointAction[];
  referrals: { milestone: string; cp: string; condition: string }[];
  levels: Level[];
  badges: { name: string; criterion: string; group: string }[];
  boards: string[][];
  rewards: { reward: string; cp: string; group: string; control: string }[];
  wallet: string[][];
  caps: string[][];
  neverReward: string[];
  terms: string[];
};

export const points = pointsJson as unknown as PointsCatalogue;

export function actionByCode(code: string) {
  return points.actions.find((a) => a.code === code);
}

export function levelFor(lifetime: number) {
  const levels = points.levels;
  const i = Math.max(0, levels.findIndex((l) => lifetime >= l.min && (l.max === null || lifetime <= l.max)));
  const level = levels[i];
  const next = levels[i + 1];
  const progress = next ? Math.round(((lifetime - level.min) / (next.min - level.min)) * 100) : 100;
  return { level, next, progress };
}
