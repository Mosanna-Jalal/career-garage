import Image from "next/image";
import { CheckIcon } from "@/components/icons";
import type { ContentBlock } from "@/lib/assessments/content";

/**
 * Renders handbook content blocks. Tables get a layout that suits their
 * shape: numbered stages become a timeline, two-column specifications become
 * a spec sheet, the 16-pattern tables become cards, anything else a table.
 */

const SPEC_HEADS = /^(Design element|Element|Field|Specification field|Control field|Operation|Step)$/i;

function StageTimeline({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <ol className="relative mt-6 space-y-4 before:absolute before:bottom-4 before:left-[1.35rem] before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-brand-300 before:to-accent-300">
      {body.map((r) => {
        const m = r[0].match(/^(\d+)\.\s*(.+)$/);
        return (
          <li key={r[0]} className="relative flex gap-4">
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brand-200 bg-white font-extrabold text-brand-700 shadow-sm">
              {m?.[1] ?? "•"}
            </span>
            <div className="flex-1 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="font-bold text-ink">{m?.[2] ?? r[0]}</p>
              <dl className="mt-1.5 grid gap-1.5 text-sm sm:grid-cols-2 sm:gap-4">
                {r.slice(1).map((cell, i) => (
                  <div key={i}>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/40">{head[i + 1]}</dt>
                    <dd className="leading-relaxed text-ink/70">{cell}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function SpecSheet({ rows }: { rows: string[][] }) {
  const [, ...body] = rows;
  return (
    <dl className="mt-6 grid overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm sm:grid-cols-2">
      {body.map(([k, v]) => (
        <div key={k} className="border-b border-brand-50 p-5 last:border-b-0 sm:odd:border-r">
          <dt className="text-xs font-bold uppercase tracking-wider text-brand-600">{k}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink/75">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const patternTints = [
  "from-brand-50 to-white border-brand-100",
  "from-accent-50 to-white border-accent-100",
  "from-violet-50 to-white border-violet-100",
  "from-amber-50 to-white border-amber-100",
];

function PatternCards({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="stagger mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {body.map((r, i) => (
        <div
          key={r[0]}
          className={`hover-lift rounded-3xl border bg-gradient-to-br p-5 shadow-sm ${patternTints[i % patternTints.length]}`}
        >
          <p className="font-mono text-2xl font-extrabold tracking-widest text-ink">{r[0]}</p>
          <p className="mt-1 font-bold text-brand-700">{r[1]}</p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-ink/40">{head[2]}</p>
          <p className="text-sm leading-relaxed text-ink/70">{r[2]}</p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-ink/40">{head[3]}</p>
          <p className="text-sm leading-relaxed text-ink/70">{r[3]}</p>
        </div>
      ))}
    </div>
  );
}

function DataTable({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="mt-6 overflow-x-auto rounded-3xl border border-brand-100 bg-white shadow-sm">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <thead className="bg-brand-50/70">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, i) => (
            <tr key={i} className="border-t border-brand-50 align-top">
              {r.map((c, j) => (
                <td key={j} className={`px-5 py-3.5 leading-relaxed ${j === 0 ? "font-semibold text-ink" : "text-ink/70"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContentTable({ rows }: { rows: string[][] }) {
  if (rows.length < 2) return null;
  const body = rows.slice(1);
  if (body.every((r) => /^\d+\.\s/.test(r[0]))) return <StageTimeline rows={rows} />;
  if (rows[0].length === 2 && SPEC_HEADS.test(rows[0][0])) return <SpecSheet rows={rows} />;
  if (rows[0][0] === "Code" && rows[0][1] === "Original descriptor") return <PatternCards rows={rows} />;
  return <DataTable rows={rows} />;
}

export function Callout({ label, text }: { label: string; text: string }) {
  return (
    <aside className="relative mt-6 overflow-hidden rounded-2xl border-l-4 border-accent-400 bg-accent-50/60 p-5">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-accent-700">{label.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</p>
      <p className="mt-1.5 leading-relaxed text-ink/80">{text}</p>
    </aside>
  );
}

export function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mt-4 text-[1.05rem] leading-relaxed text-ink/75">
                {b.text}
              </p>
            );
          case "h2":
            return (
              <h3 key={i} className="mt-10 text-xl font-extrabold tracking-tight text-ink">
                {b.text}
              </h3>
            );
          case "ul":
          case "ol":
            return (
              <ul key={i} className="mt-5 space-y-3">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3">
                    {b.type === "ol" ? (
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                        {j + 1}
                      </span>
                    ) : (
                      <span className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                        <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    )}
                    <span className="leading-relaxed text-ink/75">{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "table":
            return <ContentTable key={i} rows={b.rows} />;
          case "callout":
            return <Callout key={i} label={b.label} text={b.text} />;
          case "img":
            return <Figure key={i} block={b} />;
          case "caption":
            return (
              <p key={i} className="mt-3 text-center text-xs italic text-ink/50">
                {b.text}
              </p>
            );
        }
      })}
    </>
  );
}

export function Figure({ block }: { block: Extract<ContentBlock, { type: "img" }> }) {
  return (
    <figure className="relative mt-6 rounded-3xl border border-brand-100 bg-white p-4 shadow-xl shadow-brand-900/5 sm:p-6">
      {/* washi-tape corners */}
      <span className="absolute -left-3 -top-3 h-6 w-16 -rotate-12 rounded-sm bg-accent-200/70" aria-hidden="true" />
      <span className="absolute -bottom-3 -right-3 h-6 w-16 -rotate-12 rounded-sm bg-brand-200/70" aria-hidden="true" />
      <Image src={block.src} width={block.w} height={block.h} alt={block.alt} className="h-auto w-full" sizes="(min-width: 1024px) 560px, 100vw" />
    </figure>
  );
}
