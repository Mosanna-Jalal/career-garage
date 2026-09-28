import Link from "next/link";
import { ArrowRightIcon, Icon, ShieldIcon, SparkIcon } from "@/components/icons";
import {
  DoodleField,
  KidWithTrophy,
  PaperPlane,
  RunningKid,
  Squiggle,
  Underline,
} from "@/components/doodles";
import { Reveal } from "@/components/reveal";
import { Blocks, Figure } from "@/components/assessment/blocks";
import type { AssessmentMeta } from "@/lib/assessments/catalog";
import type { ContentBlock, ContentSection, PageContent } from "@/lib/assessments/content";

const scaleText: Record<AssessmentMeta["scale"], string> = {
  agreement: "5-point agreement scale",
  interest: "5-point interest scale",
  importance: "5-point importance scale",
  confidence: "5-point confidence scale",
  objective: "4-option objective questions",
};

const fieldVariants = ["section", "learn", "sky", "grad"] as const;

/** Orbit of dimension names used as the hero illustration. */
function DimensionOrbit({ meta, names }: { meta: AssessmentMeta; names: Record<string, string> }) {
  const codes = meta.dims;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden="true">
      <div className="absolute inset-0 animate-spin-slower-reverse rounded-full border-2 border-dashed border-brand-200" />
      <div className="absolute inset-[18%] rounded-full border border-brand-100 bg-white/60" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-jelly rounded-[2rem] p-6 text-white shadow-2xl" style={{ background: meta.color }}>
          <Icon name={meta.icon} className="h-12 w-12" />
        </div>
      </div>
      {codes.map((code, i) => {
        const angle = (i / codes.length) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + 43 * Math.cos(angle);
        const y = 50 + 43 * Math.sin(angle);
        const label = meta.mode === "pairs" ? `${code} · ${names[code]}` : names[code];
        return (
          <span
            key={code}
            className="absolute max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 animate-pop-in rounded-full border border-brand-100 bg-white px-3 py-1.5 text-center text-[11px] font-semibold leading-tight text-brand-800 shadow-md"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${0.1 * i}s` }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

function SectionHeading({ index, title, lead }: { index: number; title: string; lead?: string }) {
  return (
    <div>
      <p className="font-mono text-sm font-bold text-accent-500">{String(index).padStart(2, "0")}</p>
      <h2 className="relative mt-1 inline-block text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {title}
        <Underline className="absolute -bottom-2 left-0 h-3 w-full text-accent-300" />
      </h2>
      {lead && <p className="mt-5 text-lg font-medium leading-relaxed text-brand-800">{lead}</p>}
    </div>
  );
}

function splitMedia(blocks: ContentBlock[]) {
  const media = blocks.filter((b) => b.type === "img" || b.type === "caption");
  const tables = blocks.filter((b) => b.type === "table");
  const text = blocks.filter((b) => b.type !== "img" && b.type !== "caption" && b.type !== "table");
  return { media, tables, text };
}

function Section({ section, index }: { section: ContentSection; index: number }) {
  const tinted = index % 2 === 0;
  const { media, tables, text } = splitMedia(section.blocks);
  const img = media.find((b) => b.type === "img") as Extract<ContentBlock, { type: "img" }> | undefined;
  const caption = media.find((b) => b.type === "caption") as Extract<ContentBlock, { type: "caption" }> | undefined;

  if (section.id === "instructions") {
    return (
      <section id={section.id} className={tinted ? "bg-cream" : "bg-white"}>
        <Reveal className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <DoodleField variant="learn" />
          <SectionHeading index={index} title={section.title} lead={section.lead} />
          <div className="relative mt-8 rotate-[-0.6deg] rounded-3xl border-2 border-dashed border-brand-200 bg-[repeating-linear-gradient(white,white_31px,#d7f5f1_32px)] p-7 shadow-lg sm:p-9">
            <span className="absolute -top-4 left-8 rounded-full bg-accent-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
              Read before you start
            </span>
            {section.blocks.map((b, i) =>
              b.type === "p" ? (
                <p key={i} className="text-lg leading-8 text-ink/80">
                  {b.text}
                </p>
              ) : null
            )}
          </div>
        </Reveal>
      </section>
    );
  }

  if (img) {
    return (
      <section id={section.id} className={tinted ? "bg-cream" : "bg-white"}>
        <Reveal className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <DoodleField variant={fieldVariants[index % fieldVariants.length]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <SectionHeading index={index} title={section.title} lead={section.lead} />
              <Blocks blocks={text} />
            </div>
            <div>
              <Figure block={img} />
              {caption && <p className="mt-4 text-center text-xs italic text-ink/50">{caption.text}</p>}
            </div>
          </div>
          {tables.length > 0 && (
            <div className="mt-6">
              <Blocks blocks={tables} />
            </div>
          )}
        </Reveal>
      </section>
    );
  }

  const wide = section.blocks.some((b) => b.type === "table");
  return (
    <section id={section.id} className={tinted ? "bg-cream" : "bg-white"}>
      <Reveal className={`relative mx-auto px-4 py-20 sm:px-6 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        <DoodleField variant={fieldVariants[index % fieldVariants.length]} />
        <SectionHeading index={index} title={section.title} lead={section.lead} />
        <Blocks blocks={section.blocks} />
      </Reveal>
    </section>
  );
}

export function AssessmentLanding({
  meta,
  page,
  names,
  totalItems,
}: {
  meta: AssessmentMeta;
  page: PageContent;
  names: Record<string, string>;
  totalItems: number;
}) {
  const faqIndex = page.sections.length + 1;
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 animate-blob bg-accent-100/60 blur-2xl [animation-delay:-4s]" />
        <DoodleField variant="hero" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <nav className="text-sm text-ink/50">
              <Link href="/tests" className="hover:text-brand-600">
                Psychometric assessments
              </Link>{" "}
              / <span className="text-ink/70">{meta.name}</span>
            </nav>
            <p className="mt-5 inline-flex animate-pop-in items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
              {meta.id} · {totalItems} questions · {meta.minutes} min
            </p>
            <h1 className="mt-5 animate-fade-up text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {meta.title}
            </h1>
            <p className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink/70 delay-100">{meta.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/tests/${meta.slug}/take`}
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-4 text-base font-bold text-white shadow-xl shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Try the free demo <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href={`/tests/${meta.slug}/full`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-4 text-base font-bold text-brand-700 transition hover:-translate-y-0.5 hover:border-brand-400"
              >
                Full assessment
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-700">
                  Subscribers
                </span>
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink/50">
              <ShieldIcon className="h-4 w-4 text-brand-500" />
              Answers are scored securely on our server — scoring keys never reach your browser.
            </p>
          </div>
          <DimensionOrbit meta={meta} names={names} />
        </div>
        {/* a little runner along the hero's bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 overflow-hidden sm:block" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-2 border-b-2 border-dashed border-brand-100" />
          <div className="absolute bottom-3 left-0 animate-run-across [animation-duration:16s] [animation-iteration-count:infinite]">
            <RunningKid className="h-12 w-9" shirt={meta.color} />
          </div>
        </div>
      </section>

      {/* ============ QUICK FACTS ============ */}
      <section className="border-y border-brand-100 bg-white">
        <div className="stagger mx-auto grid max-w-6xl grid-cols-2 gap-px bg-brand-100 sm:grid-cols-4">
          {[
            { k: `${totalItems}`, v: "questions in the full assessment" },
            { k: "Free", v: "demo with a sample report" },
            { k: `${meta.minutes} min`, v: "estimated time" },
            { k: meta.dims.length.toString(), v: `${meta.mode === "pairs" ? "poles in four pairs" : `${meta.dimNoun}s`} · ${scaleText[meta.scale]}` },
          ].map((s) => (
            <div key={s.v} className="bg-white px-5 py-6 text-center">
              <p className="text-3xl font-extrabold tracking-tight" style={{ color: meta.color }}>
                {s.k}
              </p>
              <p className="mt-1 text-xs font-semibold leading-snug text-ink/60">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ HANDBOOK SECTIONS ============ */}
      {page.sections.map((s, i) => (
        <Section key={s.id} section={s} index={i + 1} />
      ))}

      {/* ============ FAQ ============ */}
      <section id="faq" className={faqIndex % 2 === 0 ? "bg-cream" : "bg-white"}>
        <Reveal className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <DoodleField variant="section" />
          <SectionHeading index={faqIndex} title="Frequently asked questions" />
          <div className="mt-8 space-y-3">
            {page.faq.items.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-brand-100 bg-white px-5 py-4 shadow-sm open:shadow-md [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg text-brand-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="-mt-2 pb-1">
                  <Blocks blocks={f.a} />
                </div>
              </details>
            ))}
          </div>
          {page.faq.note && (
            <p className="mt-8 rounded-2xl bg-brand-50 p-5 text-sm leading-relaxed text-brand-900">
              <span className="font-bold">Responsible use. </span>
              {page.faq.note.text}
            </p>
          )}
        </Reveal>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 to-brand-900 px-8 py-14 text-white sm:px-14">
          <div className="pointer-events-none absolute -right-6 bottom-0 hidden sm:block" aria-hidden="true">
            <KidWithTrophy className="h-40 w-28 animate-hop" shirt="#ffd166" />
          </div>
          <div className="pointer-events-none absolute left-6 top-6 animate-float" aria-hidden="true">
            <PaperPlane className="h-10 w-24 text-brand-300" />
          </div>
          <Squiggle className="pointer-events-none absolute bottom-6 left-10 h-5 w-32 text-accent-300" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to see your {meta.name} profile?</h2>
            <p className="mt-3 text-lg text-brand-100/90">
              Start with the free demo for a taste of your report, then unlock all {totalItems} questions and the
              complete report with a subscription.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/tests/${meta.slug}/take`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-50"
              >
                Try the free demo <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 font-bold text-white transition hover:border-white"
              >
                See subscription
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
