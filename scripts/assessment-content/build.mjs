/**
 * Generates the assessment data under lib/assessments/data from the Career
 * Garage handbooks and master question bank (Google Drive: "!3 aasessment hand
 * book", "assessment questions", "technical codes 13 assessment").
 *
 * Usage:
 *   1. Download the handbooks (.docx), Career_Garage_772_Questions_List.docx,
 *      Career_Garage_13_Assessment_Question_Bank.xlsx and
 *      Career_Garage_13_Assessment_Website_Content_Pack.docx.
 *   2. Unzip each .docx/.xlsx into <src>/x/<Name>/ and run docx2md.mjs on the
 *      .docx folders to produce <src>/md/<Name>.md (names listed in HANDBOOKS).
 *   3. node scripts/assessment-content/build.mjs <src>
 *
 * Section selection follows the client's 25/09/2026 content notes: each page
 * uses only the handbook sections (and parts of sections) listed there.
 */
import fs from "node:fs";
import path from "node:path";
import { parseHandbook, chapter, subsection } from "./parse.mjs";

const SRC = process.argv[2];
if (!SRC) throw new Error("Pass the source folder (containing md/ and x/)");
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "../..");
const OUT = path.join(ROOT, "lib/assessments/data");
const PUB = path.join(ROOT, "public/assessments");
fs.mkdirSync(OUT, { recursive: true });

const md = (n) => path.join(SRC, "md", n + ".md");
const hb = Object.fromEntries(
  ["BigFive", "MBTI", "Enneagram", "DISC", "RIASEC", "EI", "WorkValues", "Learning", "DigitalSkills", "Entrepreneurial", "CareerReadiness", "TechSpec", "WebsiteContentPack", "CareerInterest13"].map((n) => [n, parseHandbook(md(n))])
);

/* ------------------------------------------------------------------ */
/* Item bank (from the admin question bank workbook)                    */
/* ------------------------------------------------------------------ */

function readXlsxRows(dir, sheetIndex) {
  const strip = (s) => s.replace(/<(\/?)x:/g, "<$1");
  const decode = (s) =>
    s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
  let shared = [];
  const ssPath = path.join(dir, "xl/sharedStrings.xml");
  if (fs.existsSync(ssPath)) {
    shared = [...strip(fs.readFileSync(ssPath, "utf8")).matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) =>
      decode([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => t[1]).join(""))
    );
  }
  const x = strip(fs.readFileSync(path.join(dir, `xl/worksheets/sheet${sheetIndex}.xml`), "utf8"));
  const col = (ref) => [...ref.replace(/\d+/g, "")].reduce((a, c) => a * 26 + c.charCodeAt(0) - 64, 0) - 1;
  const rows = [];
  for (const row of x.matchAll(/<row [^>]*>([\s\S]*?)<\/row>/g)) {
    const cells = [];
    for (const c of row[1].matchAll(/<c ([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const ref = (c[1].match(/r="([A-Z]+\d+)"/) || [])[1];
      const t = (c[1].match(/t="([^"]+)"/) || [])[1];
      let v = ((c[2] || "").match(/<v>([\s\S]*?)<\/v>/) || [])[1];
      if (t === "s") v = shared[+v];
      else if (t === "inlineStr") v = decode([...(c[2] || "").matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((m) => m[1]).join(""));
      else if (v) v = decode(v);
      if (ref) cells[col(ref)] = v ?? "";
    }
    rows.push(Array.from(cells, (v) => v ?? ""));
  }
  return rows;
}

const qbRows = readXlsxRows(path.join(SRC, "x/QB"), 2);
const header = qbRows.findIndex((r) => r[2] === "Item ID");
const bank = {};
let n = 0;
for (const r of qbRows.slice(header + 1)) {
  if (!/^CG-[A-Z]{2}-/.test(r[2] ?? "")) continue;
  n++;
  const aid = r[1];
  const parts = r[2].split("-");
  const dim = aid === "CG-MB" ? parts[3] : parts[2];
  const item = { n, id: r[2], dim, text: r[6].trim() };
  if (aid === "CG-CA") {
    item.opts = [r[9], r[10], r[11], r[12]].map((o) => String(o).trim());
    item.ans = r[13].trim();
  } else if (/^yes$/i.test(r[8])) item.rev = true;
  (bank[aid] ??= []).push(item);
}
if (n !== 772) throw new Error(`Expected 772 items, found ${n}`);

/* ------------------------------------------------------------------ */
/* Question-list instructions and per-assessment scale notes            */
/* ------------------------------------------------------------------ */

const qlLines = fs.readFileSync(md("Questions772"), "utf8").split("\n");
const learnerStart = qlLines.findIndex((l) => l.startsWith("## Learner Instructions"));
const learnerInstructions = qlLines
  .slice(learnerStart + 1)
  .filter((l) => l.includes("{ListBullet}"))
  .slice(0, 4)
  .map((l) => l.replace(/\s{3}\{ListBullet\}$/, "").trim());
const listNotes = {};
qlLines.forEach((l, i) => {
  const m = l.match(/^# ASSESSMENT \d+\s+·\s+(.+)$/);
  if (!m) return;
  const idx = { "BIG FIVE (OCEAN)": "CG-BF", "MBTI-STYLE (ORIGINAL)": "CG-MB", "ENNEAGRAM-INSPIRED": "CG-EN", "RIASEC (HOLLAND)": "CG-RI", "DISC-STYLE (ORIGINAL)": "CG-DS", "EMOTIONAL INTELLIGENCE": "CG-EI", "WORK VALUES": "CG-WV", "COGNITIVE APTITUDE": "CG-CA", "LEARNING PREFERENCES": "CG-LP", "ENTREPRENEURIAL MINDSET": "CG-EM", "DIGITAL SKILLS READINESS": "CG-DR", "CAREER READINESS": "CG-CR", "LEADERSHIP POTENTIAL": "CG-LD" }[m[1].trim()];
  listNotes[idx] = { response: qlLines[i + 2].replace(/^Response:\s*/, "").trim(), note: qlLines[i + 3].trim() };
});

/* ------------------------------------------------------------------ */
/* Helpers for page content                                             */
/* ------------------------------------------------------------------ */

const blocksOf = (ch) => ch.blocks;
const noTables = (bs) => bs.filter((b) => b.type !== "table");
/** Blocks before the first table or subheading — the chapter's intro. */
const introPoints = (ch) => {
  const out = [];
  for (const b of ch.blocks) {
    if (b.type === "table" || b.type === "h2") break;
    out.push(b);
  }
  return out;
};
const tables = (ch) => ch.blocks.filter((b) => b.type === "table");
const lead = (ch) => ch.tagline;

function faq(chs) {
  const ch = chapter(chs, /^Frequently asked questions$/);
  const items = [];
  let note;
  for (const b of ch.blocks) {
    if (b.type === "h2") items.push({ q: b.text, a: [] });
    else if (b.type === "callout" && /RESPONSIBLE-USE STATEMENT/.test(b.label)) note = b;
    else if (items.length) items[items.length - 1].a.push(b);
  }
  return { items, note };
}

const images = {};
function overviewImage(slug, handbookDir, file = "image1.png", alt) {
  const src = path.join(SRC, "x", handbookDir, "word/media", file);
  const buf = fs.readFileSync(src);
  fs.mkdirSync(path.join(PUB, slug), { recursive: true });
  fs.copyFileSync(src, path.join(PUB, slug, "overview.png"));
  const img = { type: "img", src: `/assessments/${slug}/overview.png`, w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), alt };
  images[slug] = img;
  return img;
}
/** Swap the handbook's "[IMG:media/image1.png]" block for the published copy. */
const withImage = (bs, img) => bs.map((b) => (b.type === "img" ? img : b));

function section(id, title, blocks, opts = {}) {
  return { id, title, ...opts, blocks };
}

/** Executive overview: tagline, diagram, caption and its points, without tables. */
function executiveOverview(slug, chs, dir, alt, title = "Overview") {
  const ch = chapter(chs, /^(Executive overview|Platform overview)/);
  const img = overviewImage(slug, dir, "image1.png", alt);
  return section("overview", title, withImage(noTables(blocksOf(ch)), img), { lead: lead(ch) });
}
const whatIs = (chs, re, id = "what") => {
  const ch = chapter(chs, re);
  return section(id, ch.title, introPoints(ch), { lead: lead(ch) });
};
const howThisModelWorks = (chs) => {
  const ch = chapter(chs, /^How (the )?Career Garage (model )?works$/);
  return section("model", "How this Career Garage model works", blocksOf(ch), { lead: lead(ch) });
};
const architecture = (chs) => {
  const ch = chapter(chs, /^Assessment architecture$/);
  return section("architecture", "Assessment architecture", blocksOf(ch), { lead: lead(ch) });
};

/* ------------------------------------------------------------------ */
/* Page content per assessment (client note items 2–14)                 */
/* ------------------------------------------------------------------ */

const content = {};

// 2. Big Five (OCEAN)
{
  const c = hb.BigFive;
  const what = chapter(c, /^What is the Big Five\?$/);
  const how = chapter(c, /^How personality assessment works$/);
  const arch = chapter(c, /^Career Garage Big Five assessment architecture$/);
  const admin = chapter(c, /^Administration and learner experience$/);
  const spec = chapter(c, /^Technical specification at a glance$/);
  const scoring = chapter(c, /^Scoring the Career Garage Big Five$/);
  const img = overviewImage("big-five", "BigFive", "image1.png", "The five OCEAN continua: Openness, Conscientiousness, Extraversion, Agreeableness and Emotional Reactivity");
  const specRows = tables(spec)[0].rows.filter((r, i) =>
    i === 0 || /^(Response options|Reverse-scored items|Domain score|Display index|Minimum scored items|Interpretation)$/.test(r[0])
  );
  content["big-five"] = {
    sections: [
      // "don't use the taxonomy headline but use its content as the answer"
      section("what", "What is the Big Five?", [...subsection(what, "A taxonomy before a theory"), img], { lead: lead(what) }),
      // "use only 'traits are continua, not boxes' content, without the headline"
      section("how", "How personality assessment works", subsection(how, "Traits are continua, not boxes"), { lead: lead(how) }),
      // "use only table content… remove line which says about version"
      section("architecture", "Career Garage Big Five assessment architecture", [
        { type: "table", rows: tables(arch)[0].rows.filter((r) => !/Version \d/.test(r.join(" "))) },
      ]),
      // "use only sub heading as student instruction"
      section("instructions", "Student instructions", subsection(admin, "Recommended student instructions").map((b) => (b.type === "callout" ? { type: "p", text: b.text } : b))),
      // "use formulae from Technical specification at a glance to analyse answers"
      section("analysis", "How your answers are analysed", [
        { type: "table", rows: specRows },
        tables(scoring).find((t) => t.rows[0][0] === "Index"),
      ]),
    ],
    faq: faq(c),
  };
}

// 5. 16 Types (MBTI-style)
{
  const c = hb.MBTI;
  const exec = chapter(c, /^Executive overview$/);
  const img = overviewImage("mbti", "MBTI", "image1.png", "The four paired preference dimensions: Social Energy, Information Focus, Decision Approach and Lifestyle Structure");
  const execBlocks = [];
  for (const b of exec.blocks) {
    if (b.type === "h2" && /^What Career Garage does/.test(b.text)) break;
    execBlocks.push(b.type === "img" ? img : b);
  }
  const what = chapter(c, /^What is a type-preference framework\?$/);
  const hist = subsection(what, "Historical foundation")[0].text;
  const cut = hist.indexOf("16 four-letter combinations.");
  const patterns1 = chapter(c, /^Sixteen original Career Garage pattern summaries$/);
  const patterns2 = chapter(c, /^Sixteen original pattern summaries$/);
  content.mbti = {
    sections: [
      section("overview", "Executive overview", execBlocks, { lead: lead(exec) }),
      section("does", "What Career Garage does", subsection(exec, "What Career Garage does")),
      // "use its content till … 16 four-letter combinations"
      section("what", what.title, [{ type: "p", text: hist.slice(0, cut + "16 four-letter combinations.".length) }], { lead: lead(what) }),
      // "use only 1st and 2nd table contents"
      section("patterns", patterns1.title, [tables(patterns1)[0], tables(patterns2)[0]]),
      section("architecture", chapter(c, /^Career Garage assessment architecture$/).title, blocksOf(chapter(c, /^Career Garage assessment architecture$/)), {
        lead: lead(chapter(c, /^Career Garage assessment architecture$/)),
      }),
    ],
    faq: faq(c),
  };
}

// 4. Enneagram-inspired
{
  const c = hb.Enneagram;
  const exec = chapter(c, /^Executive overview$/);
  const img = overviewImage("enneagram", "Enneagram", "image1.png", "Career Garage Nine Motivation Pattern Map");
  const what = chapter(c, /^What is an Enneagram-inspired framework\?$/);
  const model = chapter(c, /^How the Career Garage model works$/);
  const arch = chapter(c, /^Assessment architecture$/);
  content.enneagram = {
    sections: [
      // diagram with its brief explanation
      section("overview", "Executive overview", [
        img,
        exec.blocks.find((b) => b.type === "caption"),
        subsection(exec, "The central idea").find((b) => b.type === "p"),
      ], { lead: lead(exec) }),
      // "use 'the broader tradition' content without the subheading"
      section("what", what.title, subsection(what, "The broader tradition"), { lead: lead(what) }),
      // "use only table details"
      section("model", "How this Career Garage model works", [tables(model)[0]]),
      section("architecture", "Assessment architecture", [tables(arch)[0]]),
    ],
    faq: faq(c),
  };
}

// 6. DISC-style
{
  const c = hb.DISC;
  const hist = chapter(c, /^Historical roots/);
  content.disc = {
    sections: [
      executiveOverview("disc", c, "DISC", "Career Garage four work-style dimensions: Directing, Engaging, Stabilising and Systematic"),
      whatIs(c, /^What is a work-style assessment\?$/),
      section("history", hist.title, introPoints(hist), { lead: lead(hist) }),
      howThisModelWorks(c),
      architecture(c),
    ],
    faq: faq(c),
  };
}

// 7. RIASEC (Holland)
{
  const c = hb.RIASEC;
  content.riasec = {
    sections: [
      executiveOverview("riasec", c, "RIASEC", "Career Garage six-theme interest map"),
      whatIs(c, /^What are vocational interests\?$/),
      whatIs(c, /^Holland's RIASEC theory$/, "theory"),
      howThisModelWorks(c),
      architecture(c),
    ],
    faq: faq(c),
  };
}

// 8–13. Same pattern: overview, "what is…", model, architecture, FAQ
for (const [slug, dir, whatRe, alt] of [
  ["emotional-intelligence", "EI", /^What is emotional intelligence\?$/, "Career Garage five-competency emotional intelligence model"],
  ["career-readiness", "CareerReadiness", /^What is career readiness\?$/, "Career Garage six-domain career readiness model"],
  ["work-values", "WorkValues", /^What are work values\?$/, "Career Garage six work-value priorities"],
  ["learning-preferences", "Learning", /^What are learning preferences\?$/, "Career Garage four learning preferences"],
  ["digital-skills-readiness", "DigitalSkills", /^What is digital skills readiness\?$/, "Career Garage six digital-readiness domains"],
  ["entrepreneurial-mindset", "Entrepreneurial", /^What is an entrepreneurial mindset\?$/, "Career Garage six entrepreneurial-mindset dimensions"],
]) {
  const c = hb[dir];
  content[slug] = {
    sections: [executiveOverview(slug, c, dir, alt), whatIs(c, whatRe), howThisModelWorks(c), architecture(c)],
    faq: faq(c),
  };
}

// 14. Cognitive Aptitude — no handbook; built from the Website Content Pack
// (page 08) and the Technical Specification Manual (Part I).
{
  const ts = hb.TechSpec;
  const part = chapter(ts, /^Cognitive Aptitude$/);
  const img = overviewImage("cognitive-aptitude", "WebsiteContentPack", "image9.png", "Cognitive Aptitude Profile: six reasoning domains");
  // The content pack repeats the same headings on every website page, so work
  // from the raw lines of page 08 onwards.
  const lines = fs.readFileSync(md("WebsiteContentPack"), "utf8").split("\n");
  const s = lines.findIndex((l) => l.trim() === "Cognitive Aptitude Profile");
  const pageStart = lines.findIndex((l, i) => i > s && l.startsWith("# What this assessment helps you understand"));
  const pageParas = lines.slice(pageStart + 1, pageStart + 3).map((l) => ({ type: "p", text: l.trim() }));
  const faqStart = lines.findIndex((l, i) => i > s && l.startsWith("## Frequently asked questions"));
  const faqItems = [];
  for (let i = faqStart + 1; i < lines.length && !lines[i].startsWith("[TABLE]"); i++) {
    const l = lines[i].trim();
    if (l.startsWith("### ")) faqItems.push({ q: l.slice(4), a: [] });
    else if (l && faqItems.length) faqItems[faqItems.length - 1].a.push({ type: "p", text: l });
  }
  const packLine = (starts) => lines.slice(s).find((l) => l.trim().startsWith(starts)).trim();
  const tableAfter = (heading) => {
    const i = lines.findIndex((l, j) => j > s && l.trim() === heading);
    const rows = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].startsWith("[/TABLE]")) break;
      if (lines[j].startsWith("| ")) rows.push(lines[j].slice(2, -2).split(" | ").map((x) => x.trim()));
    }
    return { type: "table", rows };
  };
  const listAfter = (heading) => {
    const i = lines.findIndex((l, j) => j > s && l.trim() === heading);
    const items = [];
    for (let j = i + 1; j < lines.length && (lines[j].startsWith("- ") || !lines[j].trim()); j++)
      if (lines[j].startsWith("- ")) items.push(lines[j].slice(2).trim());
    return items;
  };
  const tsSpec = tables(part)[0].rows;
  const tsMap = tables(part)[1];
  const missing = ts.find((ch) => ch.blocks.some((b) => b.type === "callout" && b.label === "COGNITIVE MISSING ANSWERS"))
    .blocks.find((b) => b.label === "COGNITIVE MISSING ANSWERS");
  const boundary = part.blocks.find((b) => b.type === "callout" && b.label === "INTERPRETATION BOUNDARY");
  const responsible = lines.slice(s).find((l) => l.startsWith("| RESPONSIBLE-USE NOTE / Aptitude")).slice(2, -2).split(" / ")[1].trim();
  content["cognitive-aptitude"] = {
    sections: [
      section("overview", "Cognitive Aptitude Profile", [
        { type: "p", text: packLine("The Career Garage Cognitive Aptitude Profile uses") },
        img,
      ], { lead: packLine("See how you approach unfamiliar problems.") }),
      section("what", "What this assessment helps you understand", [...pageParas, { type: "h2", text: "What it measures" }, tableAfter("## What it measures")]),
      section("model", "How this Career Garage model works", [
        { type: "ol", items: listAfter("## How Career Garage turns answers into action") },
        { type: "h2", text: "What your report includes" },
        { type: "ul", items: listAfter("## What your report includes") },
        { type: "h2", text: "Career connection" },
        { type: "p", text: lines[lines.findIndex((l, j) => j > s && l.startsWith("## Career connection")) + 1].trim() },
      ], { lead: part.tagline }),
      section("architecture", "Assessment architecture", [
        { type: "table", rows: [["Specification field", "Controlled value"], ...tsSpec.slice(1)] },
        { type: "h2", text: "Domain and key map" },
        tsMap,
        { type: "callout", label: boundary.label, text: boundary.text },
      ]),
    ],
    faq: {
      items: [
        ...faqItems,
        { q: "What happens if I skip a question?", a: [{ type: "p", text: missing.text }] },
        { q: "Will I get an IQ score or percentile?", a: [{ type: "p", text: boundary.text }] },
        { q: "Can this score be used for admission or selection?", a: [{ type: "p", text: responsible }] },
      ],
    },
  };
}

// Drop undefined entries defensively and number FAQ answers as block arrays.
for (const v of Object.values(content)) for (const s of v.sections) s.blocks = s.blocks.filter(Boolean);

/* ------------------------------------------------------------------ */
/* Report narratives (dimension chapters) and planning bands            */
/* ------------------------------------------------------------------ */

function dimNarrative(ch) {
  const out = { tagline: ch.tagline };
  const def = ch.blocks.find((b) => b.type === "callout" && /DEFINITION|SIGNAL/.test(b.label));
  out.definition = def ? def.text : ch.blocks.find((b) => b.type === "p")?.text;
  const lens = ch.blocks.find((b) => b.type === "table" && /^Lens$/i.test(b.rows[0][0]));
  if (lens) out.lens = lens.rows.slice(1);
  let h = "";
  for (const b of ch.blocks) {
    if (b.type === "h2") { h = b.text; continue; }
    if (/strength/i.test(h)) {
      if (b.type === "ul" || b.type === "ol") out.strengths = b.items;
      else if (b.type === "p") out.strengths = b.text.replace(/\.$/, "").split(/;\s*/);
      else if (b.type === "table") out.strengths = b.rows.slice(1).map((r) => r[0]);
    } else if (/career/i.test(h) && b.type === "p" && !out.careers) out.careers = b.text;
    else if (/development|evidence-building|actions|practices|tasks|experiments/i.test(h) && (b.type === "ol" || b.type === "ul")) out.actions = b.items;
    else if (/communication practice/i.test(h) && b.type === "p") out.communication = b.text;
    else if (/levels may appear/i.test(h) && b.type === "table") out.levels = b.rows.slice(1);
  }
  const refl = ch.blocks.find((b) => b.type === "callout" && b.label === "REFLECTION PROMPT");
  if (refl) out.reflection = refl.text;
  return out;
}

function bandsFrom(chs, re = /^Scoring/) {
  const ch = chs.find((c) => re.test(c.title));
  const t = ch.blocks.find((b) => b.type === "table" && /^(Index|Clarity index)$/.test(b.rows[0][0]) && /^0-39|^0-9/.test(b.rows[1][0]));
  return t.rows.slice(1).map(([range, label, meaning]) => {
    const [min, max] = range.split("-").map(Number);
    return { min, max, label, meaning };
  });
}

const codeTitled = (chs) =>
  Object.fromEntries(
    chs
      .filter((c) => /^[A-Z0-9]{1,3} - /.test(c.title))
      .map((c) => {
        const [code, ...name] = c.title.split(" - ");
        return [code, { name: name.join(" - "), ...dimNarrative(c) }];
      })
  );

const narratives = {};

narratives["big-five"] = {
  bands: bandsFrom(hb.BigFive),
  dims: Object.fromEntries(
    [["OPE", "Openness to Experience"], ["CON", "Conscientiousness"], ["EXT", "Extraversion"], ["AGR", "Agreeableness"], ["EMR", "Emotional Reactivity"]].map(
      ([code, title]) => [code, { name: title, ...dimNarrative(chapter(hb.BigFive, new RegExp(`^${title}$`))) }]
    )
  ),
};

{
  const pairs = [["Social Energy", "E", "I"], ["Information Focus", "S", "N"], ["Decision Approach", "T", "F"], ["Lifestyle Structure", "J", "P"]];
  const dims = {};
  for (const [pair, a, b] of pairs) {
    const ch = chapter(hb.MBTI, new RegExp(`^${pair}: ${a} and ${b}$`));
    const n = dimNarrative(ch);
    const poles = subsection(ch, "The two poles").find((x) => x.type === "table").rows;
    const strengths = subsection(ch, "Potential strengths and overuse risks").find((x) => x.type === "table").rows;
    [a, b].forEach((code, i) => {
      const name = poles[0][i].replace(/\s*\([A-Z]\)$/, "");
      const s = strengths.find((r) => r[0].endsWith(`(${code})`));
      dims[code] = {
        name,
        pair,
        tagline: ch.tagline,
        definition: poles[1][i],
        strengths: s[1].split(/,\s*/),
        watch: s[2],
        careers: n.careers,
        actions: n.actions,
        reflection: n.reflection,
      };
    });
  }
  const patternRows = [
    ...tables(chapter(hb.MBTI, /^Sixteen original Career Garage pattern summaries$/))[0].rows.slice(1),
    ...tables(chapter(hb.MBTI, /^Sixteen original pattern summaries$/))[0].rows.slice(1),
  ];
  narratives.mbti = {
    bands: bandsFrom(hb.MBTI),
    dims,
    pairs: pairs.map(([pair, a, b]) => ({ pair, a, b })),
    patterns: Object.fromEntries(patternRows.map(([code, name, brings, stretch]) => [code, { name, brings, stretch }])),
  };
}

narratives.enneagram = { bands: bandsFrom(hb.Enneagram), dims: codeTitled(hb.Enneagram) };
narratives.disc = { bands: bandsFrom(hb.DISC), dims: codeTitled(hb.DISC) };
narratives.riasec = { bands: bandsFrom(hb.RIASEC), dims: codeTitled(hb.RIASEC) };
narratives["emotional-intelligence"] = { bands: bandsFrom(hb.EI), dims: codeTitled(hb.EI) };
narratives["work-values"] = { bands: bandsFrom(hb.WorkValues), dims: codeTitled(hb.WorkValues) };
narratives["learning-preferences"] = { bands: bandsFrom(hb.Learning), dims: codeTitled(hb.Learning) };
narratives["digital-skills-readiness"] = { bands: bandsFrom(hb.DigitalSkills), dims: codeTitled(hb.DigitalSkills) };
narratives["entrepreneurial-mindset"] = { bands: bandsFrom(hb.Entrepreneurial), dims: codeTitled(hb.Entrepreneurial) };
narratives["career-readiness"] = { bands: bandsFrom(hb.CareerReadiness), dims: codeTitled(hb.CareerReadiness) };

{
  // Aptitude: domain definitions from the content pack; career signals from the
  // 13-assessment career interest handbook's aptitude programme.
  const lines = fs.readFileSync(md("CareerInterest13"), "utf8").split("\n");
  const signal = (heading) => {
    const i = lines.findIndex((l) => l.trim() === `## ${heading}`);
    const o = {};
    for (let j = i + 1; j < lines.length && lines[j].startsWith("- "); j++) {
      const [k, ...v] = lines[j].slice(2).split(": ");
      o[k.trim()] = v.join(": ").trim();
    }
    return o;
  };
  const packLines = fs.readFileSync(md("WebsiteContentPack"), "utf8").split("\n");
  const s = packLines.findIndex((l) => l.trim() === "Cognitive Aptitude Profile");
  const m = packLines.findIndex((l, j) => j > s && l.startsWith("## What it measures"));
  const defs = {};
  for (let j = m; j < packLines.length && !packLines[j].startsWith("[/TABLE]"); j++) {
    if (packLines[j].startsWith("| ") && !packLines[j].startsWith("| DIMENSION")) {
      const [k, v] = packLines[j].slice(2, -2).split(" | ");
      defs[k.trim()] = v.trim();
    }
  }
  const dim = (name, def, sig) => {
    const x = signal(sig);
    return {
      name,
      definition: defs[def],
      tagline: x["Career signal"],
      strengths: x["Often energised by"] ? [x["Often energised by"]] : undefined,
      careers: [x["Career clusters"], x["Example roles"] && `Example roles: ${x["Example roles"]}`].filter(Boolean).join(". "),
      actions: [x["Development edge"]].filter(Boolean),
      watch: x["Approach cautiously"],
    };
  };
  narratives["cognitive-aptitude"] = {
    dims: {
      VER: dim("Verbal Reasoning", "Verbal reasoning", "Verbal Reasoning Strength"),
      NUM: dim("Numerical Reasoning", "Numerical reasoning", "Numerical Reasoning Strength"),
      LOG: dim("Logical and Abstract Reasoning", "Logical reasoning", "Abstract and Logical Reasoning Strength"),
      SPA: dim("Spatial Reasoning", "Abstract and spatial reasoning", "Spatial Reasoning Strength"),
      DAT: dim("Data Interpretation", "Data interpretation", "Integrated Problem-Solving Strength"),
      ATT: dim("Attention and Accuracy", "Attention and problem-solving", "Attention and Accuracy Strength"),
    },
  };
}

// Dimension names straight from the question bank for anything a handbook lacks
for (const [slug, aid] of Object.entries({
  "big-five": "CG-BF", mbti: "CG-MB", enneagram: "CG-EN", riasec: "CG-RI", disc: "CG-DS", "emotional-intelligence": "CG-EI",
  "work-values": "CG-WV", "cognitive-aptitude": "CG-CA", "learning-preferences": "CG-LP", "entrepreneurial-mindset": "CG-EM",
  "digital-skills-readiness": "CG-DR", "career-readiness": "CG-CR",
})) {
  const dims = [...new Set(bank[aid].map((i) => i.dim))];
  for (const d of dims) if (!narratives[slug].dims[d]) throw new Error(`${slug}: no narrative for ${d}`);
}

/* ------------------------------------------------------------------ */

const write = (name, data) => {
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(data, null, 1) + "\n");
  console.log("wrote", name, (fs.statSync(path.join(OUT, name)).size / 1024).toFixed(1) + "KB");
};
delete bank["CG-LD"]; // Leadership Potential keeps its existing test for now
write("bank.json", bank);
write("content.json", { learnerInstructions, listNotes, pages: content });
write("narratives.json", narratives);
