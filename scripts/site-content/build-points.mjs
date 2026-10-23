/**
 * Builds lib/site-content/points.json from
 * Career_Garage_Universal_Points_Rewards_and_Recognition_System_2026.docx (as markdown).
 * Usage: node scripts/site-content/build-points.mjs <Points.md>
 */
import fs from "node:fs";
import { parseHandbook } from "../assessment-content/parse.mjs";

const chs = parseHandbook(process.argv[2]);
const ch = (n) => chs.find((c) => c.title.startsWith(`${n}. `));
const table = (c, i = 0) => c.blocks.filter((b) => b.type === "table")[i].rows;
const purpose = (c) => c.tagline.replace(/^Purpose\s+/, "");

const actions = [];
for (const n of [3, 4, 5, 6, 7, 8, 9, 10, 11]) {
  const c = ch(n);
  const [head, ...rows] = table(c);
  const col = (re) => head.findIndex((h) => re.test(h));
  const iRole = col(/^Role$/), iCp = col(/^CP$/), iLim = col(/^(Frequency|Limit|Cap)$/), iEv = col(/^(Evidence|Verification|Gate)$/);
  for (const r of rows) {
    actions.push({
      code: r[0],
      section: c.title.replace(/^\d+\.\s*/, ""),
      activity: r[1],
      role: iRole >= 0 ? r[iRole] : undefined,
      cp: Number(String(r[iCp]).replace(/[^\d.]/g, "")) || 0,
      limit: r[iLim],
      evidence: r[iEv],
    });
  }
}
const sections = [3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({ title: ch(n).title.replace(/^\d+\.\s*/, ""), purpose: purpose(ch(n)) }));
const rows = (c, i) => table(c, i).slice(1);
const levels = rows(ch(13), 0).map(([band, name, range, recognition]) => {
  const [min, max] = range.replace(/,/g, "").split(/[-+]/).map((x) => (x ? Number(x) : null));
  return { band, name, min, max, recognition };
});
const list = (c, h2) => {
  const i = c.blocks.findIndex((b) => b.type === "h2" && b.text.startsWith(h2));
  return c.blocks.slice(i + 1).find((b) => b.type === "ol" || b.type === "ul")?.items ?? [];
};

const out = {
  architecture: { purpose: purpose(ch(1)), components: rows(ch(1), 0), multipliers: rows(ch(1), 1), principles: list(ch(1), "Non-negotiable"),
    formula: ch(1).blocks.find((b) => b.type === "p" && b.text.startsWith("Award formula") || (b.type === "callout" && /AWARD/.test(b.label)))?.text ?? null },
  roles: rows(ch(2), 0),
  sections,
  actions,
  referrals: rows(ch(12), 0).map(([milestone, cp, condition]) => ({ milestone, cp, condition })),
  levels,
  badges: rows(ch(13), 1).map(([name, criterion, group]) => ({ name, criterion, group })),
  boards: rows(ch(14), 0),
  rewards: rows(ch(15), 0).map(([reward, cp, group, control]) => ({ reward, cp, group, control })),
  wallet: rows(ch(16), 0),
  caps: rows(ch(17), 0),
  neverReward: list(ch(17), "Never reward"),
  terms: chs.find((c) => c.title.startsWith("B.")).blocks.filter((b) => b.type === "p").map((b) => b.text),
};
// The award formula sits in a "Award formula" subsection callout
const af = ch(1).blocks.findIndex((b) => b.type === "h2" && b.text === "Award formula");
out.architecture.formula = ch(1).blocks[af + 1]?.text ?? out.architecture.formula;
fs.writeFileSync("lib/site-content/points.json", JSON.stringify(out, null, 1) + "\n");
console.log("actions", actions.length, "levels", levels.length, "badges", out.badges.length, "rewards", out.rewards.length, "terms", out.terms.length);
console.log("formula:", out.architecture.formula);
console.log("limits:", [...new Set(actions.map((a) => a.limit))].join(" ; "));
