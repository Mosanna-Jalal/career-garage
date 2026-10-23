/**
 * Builds lib/site-content/faq.json from Career_Garage_400_Questions_Best_Answers.docx
 * (converted to markdown with scripts/assessment-content/docx2md.mjs).
 * Usage: node scripts/site-content/build-faq.mjs <FAQ400.md>
 */
import fs from "node:fs";
const lines = fs.readFileSync(process.argv[2], "utf8").split("\n");
const sections = [];
let cur = null, q = null;
for (const raw of lines) {
  const line = raw.trim();
  const sec = line.match(/^# (\d+)\. (.+)$/);
  if (sec) { cur = { id: Number(sec[1]), title: sec[2].trim(), items: [] }; sections.push(cur); q = null; continue; }
  if (line.startsWith("# ")) { cur = null; continue; } // appendices etc.
  if (!cur || !line) continue;
  const qm = line.match(/^Q(\d+)\.\s+(.+?)\s*\{Question\}$/);
  if (qm) { q = { n: Number(qm[1]), q: qm[2], a: "" }; cur.items.push(q); continue; }
  if (q) q.a = (q.a ? q.a + " " : "") + line.replace(/\s*\{Answer\}$/, "").replace(/\s*\{[A-Za-z]+\}$/, "");
}
const total = sections.reduce((n, s) => n + s.items.length, 0);
const empty = sections.flatMap((s) => s.items).filter((i) => !i.a);
fs.writeFileSync("lib/site-content/faq.json", JSON.stringify({ sections }, null, 1) + "\n");
console.log("sections", sections.length, "questions", total, "missing answers", empty.length);
