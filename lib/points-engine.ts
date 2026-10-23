import { getDb } from "@/lib/db";
import { actionByCode, levelFor, points } from "@/lib/site-content/points";
import type { MemberDoc } from "@/lib/members";

/**
 * Career Points ledger. Implements the handbook's award formula:
 *
 *   CP = min(activity cap, base points × verified quantity × quality multiplier + bonus) − reversals
 *
 * and enforces each action code's frequency/cap column ("Once", "5/day",
 * "Max 8/month", "Annual", "10/answer; 25/day/user", "Per event" …).
 * Never awarded for answers, outcomes or purchases — only verified process.
 */

export type LedgerLine = {
  memberId: string;
  code: string;
  cp: number;
  ref?: string;
  status: "available" | "pending" | "reversed";
  activity: string;
  section: string;
  ruleVersion: string;
  createdAt: Date;
};

const DAY = 86_400_000;
const windows: Record<string, number> = { day: DAY, week: 7 * DAY, month: 30 * DAY, quarter: 91 * DAY, term: 182 * DAY };

async function ledger() {
  return (await getDb()).collection<LedgerLine>("pointsLedger");
}

/** Interpret a limit string into checks against the member's existing lines. */
async function allowed(memberId: string, code: string, limit: string, ref?: string) {
  const col = await ledger();
  const base = { memberId, code, status: { $ne: "reversed" as const } };
  const lim = limit.toLowerCase();

  // counted windows, e.g. "5/day", "Max 8/month", "25/day/user", "4/quarter"
  for (const m of lim.matchAll(/(\d[\d,]*)\s*\/\s*(day|week|month|quarter|term|answer|event|report|contest|placement)/g)) {
    const n = Number(m[1].replace(/,/g, ""));
    const unit = m[2];
    const filter = windows[unit]
      ? { ...base, createdAt: { $gte: new Date(Date.now() - windows[unit]) } }
      : { ...base, ref };
    if ((await col.countDocuments(filter)) >= n) return false;
  }
  // per-report maxima, e.g. "Max 3 per report"
  const perRef = lim.match(/max (\d+) per/);
  if (perRef && (await col.countDocuments({ ...base, ref })) >= Number(perRef[1])) return false;

  // periodic one-offs
  const periodic: Record<string, number> = { annual: 365 * DAY, monthly: 30 * DAY, weekly: 7 * DAY, quarterly: 91 * DAY, "once/month": 30 * DAY };
  for (const [word, ms] of Object.entries(periodic)) {
    if (lim.startsWith(word)) {
      return (await col.countDocuments({ ...base, createdAt: { $gte: new Date(Date.now() - ms) } })) === 0;
    }
  }
  // once ever (or once per ref)
  if (/^(once|first|one\/|per )/.test(lim)) {
    return (await col.countDocuments(ref ? { ...base, ref } : base)) === 0;
  }
  return true;
}

/**
 * Award points for a verified action. Returns the posted line, or null when a
 * cap/frequency rule blocks it (or the DB is unavailable).
 */
export async function awardPoints(
  member: Pick<MemberDoc, "_id">,
  code: string,
  opts: { ref?: string; quality?: number; quantity?: number; bonus?: number } = {}
): Promise<LedgerLine | null> {
  const action = actionByCode(code);
  if (!action || !process.env.MONGODB_URI) return null;
  const memberId = member._id.toString();
  try {
    if (!(await allowed(memberId, code, action.limit, opts.ref))) return null;
    const quality = opts.quality ?? 1;
    const cp = Math.round(action.cp * (opts.quantity ?? 1) * quality + (opts.bonus ?? 0));
    if (cp <= 0) return null;
    const line: LedgerLine = {
      memberId,
      code,
      cp,
      ref: opts.ref,
      status: "available",
      activity: action.activity,
      section: action.section,
      ruleVersion: "1.0",
      createdAt: new Date(),
    };
    await (await ledger()).insertOne(line);
    return line;
  } catch (err) {
    console.error("Points award failed:", err);
    return null;
  }
}

export type Wallet = {
  lifetime: number;
  available: number;
  level: ReturnType<typeof levelFor>;
  lines: (Omit<LedgerLine, "createdAt"> & { createdAt: string })[];
  badges: { name: string; criterion: string; group: string; earned: boolean }[];
};

/** Badge rules that can be checked from the ledger today. */
const badgeRules: Record<string, (count: (code: string | RegExp) => number, m: MemberDoc) => boolean> = {
  Explorer: (c) => c("ASM_COMPLETE") >= 1,
  "Helpful Voice": (c) => c("CGC_ANSWER") + c("CGC_EXPERT") >= 10,
  "Trusted Expert": (c, m) => m.verified && c("CGC_EXPERT") >= 25,
  "Career Ally": (c) => c(/^PAR_/) >= 3,
};

export async function getWallet(member: MemberDoc): Promise<Wallet> {
  const empty = (lines: LedgerLine[]) => {
    const live = lines.filter((l) => l.status !== "reversed");
    const lifetime = live.reduce((n, l) => n + l.cp, 0);
    const available = live.filter((l) => l.status === "available").reduce((n, l) => n + l.cp, 0);
    const count = (code: string | RegExp) =>
      live.filter((l) => (typeof code === "string" ? l.code === code : code.test(l.code))).length;
    return {
      lifetime,
      available,
      level: levelFor(lifetime),
      lines: lines.slice(0, 50).map((l) => ({ ...l, createdAt: l.createdAt.toISOString() })),
      badges: points.badges.map((b) => ({ ...b, earned: Boolean(badgeRules[b.name]?.(count, member)) })),
    };
  };
  if (!process.env.MONGODB_URI) return empty([]);
  try {
    const lines = await (await ledger())
      .find({ memberId: member._id.toString() }, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
    return empty(lines);
  } catch {
    return empty([]);
  }
}
