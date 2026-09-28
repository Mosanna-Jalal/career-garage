// Convert an extracted docx folder (word/document.xml) into rough markdown.
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
const xml = fs.readFileSync(path.join(dir, "word/document.xml"), "utf8");
let rels = {};
try {
  const r = fs.readFileSync(path.join(dir, "word/_rels/document.xml.rels"), "utf8");
  for (const m of r.matchAll(/<Relationship [^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) rels[m[1]] = m[2];
  for (const m of r.matchAll(/<Relationship [^>]*Target="([^"]+)"[^>]*Id="([^"]+)"/g)) rels[m[2]] = m[1];
} catch {}

const decode = (s) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");

function paraText(p) {
  let out = "";
  for (const m of p.matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>|<w:tab\/>|<w:br\/>|r:embed="([^"]+)"/g)) {
    if (m[1] !== undefined) out += decode(m[1]);
    else if (m[0] === "<w:tab/>") out += "\t";
    else if (m[0] === "<w:br/>") out += "\n";
    else if (m[2]) out += ` [IMG:${rels[m[2]] || m[2]}] `;
  }
  return out;
}

function style(p) {
  const m = p.match(/<w:pStyle w:val="([^"]+)"/);
  return m ? m[1] : "";
}

const body = xml.slice(xml.indexOf("<w:body>") + 8, xml.lastIndexOf("</w:body>"));
// Split top-level body children: <w:p ...>...</w:p> and <w:tbl>...</w:tbl>
const out = [];
let i = 0;
while (i < body.length) {
  if (body.startsWith("<w:tbl>", i) || body.startsWith("<w:tbl ", i)) {
    // find matching end handling nesting
    let depth = 0, j = i;
    while (j < body.length) {
      if (body.startsWith("<w:tbl>", j) || body.startsWith("<w:tbl ", j)) depth++;
      else if (body.startsWith("</w:tbl>", j)) { depth--; if (depth === 0) { j += 8; break; } }
      j++;
    }
    const tbl = body.slice(i, j);
    const rows = [...tbl.matchAll(/<w:tr[ >][\s\S]*?<\/w:tr>/g)].map((r) =>
      [...r[0].matchAll(/<w:tc>[\s\S]*?<\/w:tc>/g)].map((c) =>
        [...c[0].matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)].map((p) => paraText(p[0])).join(" / ").trim()
      )
    );
    out.push("\n[TABLE]");
    for (const r of rows) out.push("| " + r.join(" | ") + " |");
    out.push("[/TABLE]\n");
    i = j;
  } else if (body.startsWith("<w:p>", i) || body.startsWith("<w:p ", i)) {
    const j = body.indexOf("</w:p>", i);
    // handle self-closing <w:p/>
    const selfClose = body.indexOf("/>", i);
    const nextOpen = body.indexOf(">", i);
    if (body[nextOpen - 1] === "/" && nextOpen === selfClose) { i = nextOpen + 1; continue; }
    const p = body.slice(i, j + 6);
    const s = style(p);
    const t = paraText(p).trim();
    if (t) {
      const hm = s.match(/Heading(\d)|^Title$/i);
      const numbered = /<w:numPr>/.test(p);
      if (hm) out.push(`\n${"#".repeat(hm[1] ? +hm[1] : 1)} ${t}`);
      else out.push((numbered ? "- " : "") + t + (s && !numbered ? `   {${s}}` : ""));
    }
    i = j + 6;
  } else {
    const nx = body.indexOf("<", i + 1);
    i = nx === -1 ? body.length : nx;
  }
}
process.stdout.write(out.join("\n"));
