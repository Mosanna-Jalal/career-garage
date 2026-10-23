/**
 * Builds lib/site-content/partner.json from
 * Career_Garage_Partner_Earnings_and_Payout_System_India_2026.docx (as markdown).
 * Only partner-facing chapters are published; internal finance, governance and
 * engineering chapters (0, 14, 16–19, C) are left out.
 * Usage: node scripts/site-content/build-partner.mjs <Partner.md>
 */
import fs from "node:fs";
import { parseHandbook } from "../assessment-content/parse.mjs";

const chs = parseHandbook(process.argv[2]);
const byNum = (n) => chs.find((c) => c.title.startsWith(`${n}. `));
const label = /^([A-Z][A-Za-z][\w -]{2,30}?)\s{2,}(.+)$/;
const tidy = (blocks) =>
  blocks.map((b) => {
    if (b.type !== "p") return b;
    const m = b.text.match(label);
    return m ? { type: "callout", label: m[1].toUpperCase(), text: m[2] } : b;
  });
const chapter = (n) => {
  const c = byNum(n);
  return { id: String(n), title: c.title.replace(/^\w+\.\s*/, ""), lead: c.tagline.replace(/^Purpose\s+/, ""), blocks: tidy(c.blocks) };
};

const chapters = ["1", "2", "3", "4", "5", "6", "8", "9", "10", "11", "12", "13", "15", "B"].map(chapter);
const rate = byNum(4).blocks.find((b) => b.type === "table").rows;
const matrix = byNum("A").blocks.filter((b) => b.type === "table").flatMap((t) => t.rows.slice(1));
const front = chs[0].blocks.find((b) => b.type === "p" && b.text.startsWith("Recommended launch position"));

fs.writeFileSync(
  "lib/site-content/partner.json",
  JSON.stringify(
    {
      position: front?.text.replace(/^Recommended launch position\s+/, ""),
      chapters,
      rateCard: rate,
      matrix: matrix.map(([earner, activity, mode, def, evidence]) => ({ earner, activity, mode, default: def, evidence })),
    },
    null,
    1
  ) + "\n"
);
console.log("chapters", chapters.map((c) => c.title).join(" | "), "\nmatrix rows", matrix.length);
