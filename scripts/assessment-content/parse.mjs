// Parse a handbook markdown dump (from docx2md.mjs) into chapters of typed blocks.
import fs from "node:fs";

const CALLOUT = /^([A-Z][A-Z0-9'’&\-\/ ,]{2,}[A-Z])\s{2,}(.+)$/;

export function parseHandbook(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const chapters = [];
  let cur = { label: "FRONT", title: "", tagline: "", blocks: [] };
  chapters.push(cur);
  let pendingLabel = null;
  let inTable = false;
  let table = null;

  const push = (b) => {
    const last = cur.blocks[cur.blocks.length - 1];
    if ((b.type === "ul" || b.type === "ol") && last && last.type === b.type) {
      last.items.push(...b.items);
    } else cur.blocks.push(b);
  };

  for (let raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (inTable) {
      if (line === "[/TABLE]") {
        inTable = false;
        push({ type: "table", rows: table });
        continue;
      }
      if (line.startsWith("| ")) {
        table.push(line.slice(2, -2).split(" | ").map((c) => c.trim()));
      } else if (table.length && line.trim()) {
        // multi-line cell continuation
        const r = table[table.length - 1];
        r[r.length - 1] += " " + line.trim();
      }
      continue;
    }
    if (line === "[TABLE]") {
      inTable = true;
      table = [];
      continue;
    }
    if (!line.trim()) continue;

    const h1 = line.match(/^# (.+)$/);
    if (h1) {
      const t = h1[1].trim();
      if (/^(CHAPTER|APPENDIX|PART)\b/.test(t) || /^(BEFORE YOU BEGIN|CONTENTS|COMMON|DOCUMENT CONTROL)/.test(t)) {
        pendingLabel = t;
        continue;
      }
      cur = { label: pendingLabel ?? "", title: t, tagline: "", blocks: [] };
      pendingLabel = null;
      chapters.push(cur);
      continue;
    }
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      push({ type: "h2", text: h2[1].trim() });
      continue;
    }
    let text = line;
    const style = (text.match(/\s{3}\{([A-Za-z0-9]+)\}$/) || [])[1];
    if (style) text = text.replace(/\s{3}\{[A-Za-z0-9]+\}$/, "");
    const img = text.match(/^\[IMG:(.+?)\]$/);
    if (img) {
      push({ type: "img", src: img[1].trim() });
      continue;
    }
    if (style === "ListBullet") {
      push({ type: "ul", items: [text.trim()] });
      continue;
    }
    if (style === "ListNumber" || text.startsWith("- ")) {
      push({ type: "ol", items: [text.replace(/^- /, "").trim()] });
      continue;
    }
    if (/^Figure \d+\./.test(text)) {
      push({ type: "caption", text: text.trim() });
      continue;
    }
    const co = text.match(CALLOUT);
    if (co) {
      push({ type: "callout", label: co[1].trim(), text: co[2].trim() });
      continue;
    }
    // first plain paragraph directly after a chapter title is its tagline
    if (!cur.tagline && cur.blocks.length === 0 && cur.label !== "FRONT") {
      cur.tagline = text.trim();
      continue;
    }
    push({ type: "p", text: text.trim() });
  }
  return chapters;
}

/** Find a chapter whose title matches (case-insensitive substring or regex). */
export function chapter(chs, match) {
  const re = match instanceof RegExp ? match : new RegExp(match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const c = chs.find((c) => re.test(c.title));
  if (!c) throw new Error("No chapter matching " + match);
  return c;
}

/** Blocks under an h2 (until the next h2). */
export function subsection(ch, h2) {
  const re = h2 instanceof RegExp ? h2 : new RegExp("^" + h2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const i = ch.blocks.findIndex((b) => b.type === "h2" && re.test(b.text));
  if (i < 0) throw new Error(`No subsection ${h2} in ${ch.title}`);
  const out = [];
  for (let j = i + 1; j < ch.blocks.length && ch.blocks[j].type !== "h2"; j++) out.push(ch.blocks[j]);
  return out;
}

/** Blocks before the first h2 of a chapter. */
export function intro(ch) {
  const out = [];
  for (const b of ch.blocks) {
    if (b.type === "h2") break;
    out.push(b);
  }
  return out;
}

if (process.argv[1] && process.argv[1].endsWith("parse.mjs") && process.argv[2]) {
  const chs = parseHandbook(process.argv[2]);
  for (const c of chs) {
    console.log(`\n## [${c.label}] ${c.title}  ::  ${c.tagline.slice(0, 90)}`);
    for (const b of c.blocks)
      console.log(
        "   ",
        b.type,
        b.type === "table" ? `${b.rows.length}x${b.rows[0]?.length} ${b.rows[0]?.join(" / ").slice(0, 80)}` :
        b.type === "ul" || b.type === "ol" ? `${b.items.length} items: ${b.items[0].slice(0, 60)}` :
        (b.label ? b.label + " :: " : "") + (b.text ?? b.src ?? "").slice(0, 90)
      );
  }
}
