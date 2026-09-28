import type { CSSProperties, SVGProps } from "react";

/**
 * Hand-drawn doodles used to decorate negative space. Server-safe; motion
 * comes from the animation classes in globals.css (all of which switch off
 * under prefers-reduced-motion).
 */

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Squiggle(props: P) {
  return (
    <svg viewBox="0 0 120 24" aria-hidden="true" {...props}>
      <path className="doodle-draw" d="M3 14c8-10 14 8 22 0s14-10 22 0 14 8 22 0 14-10 22 0 14 8 22 0" {...stroke} />
    </svg>
  );
}

export function Underline(props: P) {
  return (
    <svg viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true" {...props}>
      <path className="doodle-draw" d="M4 11C50 4 120 3 196 8M30 14c40-4 90-5 140-3" {...stroke} strokeWidth={3} />
    </svg>
  );
}

export function StarDoodle(props: P) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <path d="M20 4l4.6 10.4L36 15.6l-8.4 7.6 2.4 11.4L20 29l-10 5.6 2.4-11.4L4 15.6l11.4-1.2z" {...stroke} />
    </svg>
  );
}

export function Sparkle(props: P) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path d="M16 3v8M16 21v8M3 16h8M21 16h8M7 7l4 4M21 21l4 4M25 7l-4 4M11 21l-4 4" {...stroke} />
    </svg>
  );
}

export function Spiral(props: P) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path className="doodle-draw" d="M24 24c0-3 4-3 4 0 0 5-8 5-8 0 0-7 12-7 12 0 0 9-16 9-16 0 0-11 20-11 20 0 0 13-24 13-24 0" {...stroke} />
    </svg>
  );
}

export function CurlyArrow(props: P) {
  return (
    <svg viewBox="0 0 80 60" aria-hidden="true" {...props}>
      <path className="doodle-draw" d="M6 50c10-30 34-40 50-22 8 9-6 16-10 6-4-12 12-24 26-20" {...stroke} />
      <path d="M64 8l8 6-9 4" {...stroke} />
    </svg>
  );
}

export function BulbDoodle(props: P) {
  return (
    <svg viewBox="0 0 48 56" aria-hidden="true" {...props}>
      <path d="M24 6c-9 0-15 7-15 15 0 6 3 9 6 12 2 2 3 4 3 7h12c0-3 1-5 3-7 3-3 6-6 6-12 0-8-6-15-15-15z" {...stroke} />
      <path d="M18 46h12M20 51h8M24 16v10M20 22l4 4 4-4" {...stroke} />
      <path d="M4 12l4 3M44 12l-4 3M24 1v2" {...stroke} />
    </svg>
  );
}

export function BookDoodle(props: P) {
  return (
    <svg viewBox="0 0 56 44" aria-hidden="true" {...props}>
      <path d="M28 10C20 4 10 4 4 6v30c6-2 16-2 24 4 8-6 18-6 24-4V6c-6-2-16-2-24 4zM28 10v30" {...stroke} />
      <path d="M10 14c4-1 9-1 12 1M10 20c4-1 9-1 12 1M34 15c3-2 8-2 12-1M34 21c3-2 8-2 12-1" {...stroke} strokeWidth={1.6} />
    </svg>
  );
}

export function CapDoodle(props: P) {
  return (
    <svg viewBox="0 0 64 44" aria-hidden="true" {...props}>
      <path d="M32 4L4 16l28 12 28-12z" {...stroke} />
      <path d="M14 21v10c6 6 30 6 36 0V21M58 17v14" {...stroke} />
      <circle cx="58" cy="34" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function HeartDoodle(props: P) {
  return (
    <svg viewBox="0 0 40 36" aria-hidden="true" {...props}>
      <path d="M20 32S4 22 4 12c0-5 4-8 8-8 4 0 7 3 8 6 1-3 4-6 8-6 4 0 8 3 8 8 0 10-16 20-16 20z" {...stroke} />
    </svg>
  );
}

export function CloudDoodle(props: P) {
  return (
    <svg viewBox="0 0 72 40" aria-hidden="true" {...props}>
      <path d="M16 34h42c6 0 10-4 10-9s-4-9-10-9c0-7-6-12-13-12-6 0-10 3-12 8-2-2-5-3-8-3-6 0-10 5-10 10-5 1-9 4-9 8 0 4 4 7 10 7z" {...stroke} />
    </svg>
  );
}

export function PaperPlane({ trail = true, ...props }: P & { trail?: boolean }) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true" {...props}>
      {trail && (
        <path d="M4 50c14-2 22-12 36-10s16 10 30 2" {...stroke} strokeDasharray="3 7" strokeWidth={2} />
      )}
      <path d="M74 34L116 8 96 50 86 38z" {...stroke} fill="#ffffff" />
      <path d="M116 8L86 38l-2 12 8-8" {...stroke} />
    </svg>
  );
}

export function Rocket({ flame = true, ...props }: P & { flame?: boolean }) {
  return (
    <svg viewBox="0 0 48 84" aria-hidden="true" {...props}>
      {flame && (
        <g className="animate-flame">
          <path d="M18 62c0 8 3 14 6 20 3-6 6-12 6-20z" fill="#ff9d71" />
          <path d="M21 62c0 5 1 9 3 13 2-4 3-8 3-13z" fill="#ffd166" />
        </g>
      )}
      <path d="M24 4c10 8 14 22 13 38l-4 20H15l-4-20C10 26 14 12 24 4z" fill="#ffffff" stroke="#16323a" strokeWidth={2.4} strokeLinejoin="round" />
      <path d="M24 4c5 4 8 9 10 15H14c2-6 5-11 10-15z" fill="#fe4711" />
      <circle cx="24" cy="32" r="6" fill="#7dd8d1" stroke="#16323a" strokeWidth={2.4} />
      <path d="M11 42L3 56l10-2M37 42l8 14-10-2" fill="#29a29d" stroke="#16323a" strokeWidth={2.4} strokeLinejoin="round" />
    </svg>
  );
}

export function Trophy(props: P) {
  return (
    <svg viewBox="0 0 56 60" aria-hidden="true" {...props}>
      <path d="M16 6h24v14a12 12 0 01-24 0z" fill="#ffd166" stroke="#16323a" strokeWidth={2.4} strokeLinejoin="round" />
      <path d="M16 10H7c0 8 4 12 10 12M40 10h9c0 8-4 12-10 12" fill="none" stroke="#16323a" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M24 32h8v9h-8zM17 41h22v7H17z" fill="#ff9d71" stroke="#16323a" strokeWidth={2.4} strokeLinejoin="round" />
      <path d="M28 12l1.6 3.4 3.6.4-2.7 2.4.8 3.6-3.3-1.9-3.3 1.9.8-3.6-2.7-2.4 3.6-.4z" fill="#ffffff" />
    </svg>
  );
}

const SKIN = "#ffc5a8";
const INK = "#16323a";

/** A running child: limbs swing from shoulder and hip. */
export function RunningKid({
  shirt = "#29a29d",
  className = "",
  style,
}: {
  shirt?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 64 88" aria-hidden="true" className={className} style={style}>
      <g className="animate-bob">
        {/* back arm and leg */}
        <path className="kid-arm alt" d="M33 30v15" stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
        <path className="kid-leg alt" d="M29 52v22" stroke="#1c6867" strokeWidth={6} strokeLinecap="round" />
        {/* torso */}
        <path d="M34 26l-5 26" stroke={shirt} strokeWidth={13} strokeLinecap="round" />
        {/* front leg and arm */}
        <path className="kid-leg" d="M29 52v22" stroke="#1b5353" strokeWidth={6} strokeLinecap="round" />
        <path className="kid-arm" d="M33 30v15" stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
        {/* head */}
        <circle cx="37" cy="14" r="9" fill={SKIN} stroke={INK} strokeWidth={2} />
        <path d="M29 11c2-6 12-8 17-2-4 0-7 1-9 4-2-2-5-3-8-2z" fill={INK} />
        <circle cx="41" cy="15" r="1.3" fill={INK} />
        <path d="M40 19c1.5 1 3 1 4 0" stroke={INK} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** A child holding a trophy overhead. */
export function KidWithTrophy({
  shirt = "#fe4711",
  className = "",
}: {
  shirt?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 72 110" aria-hidden="true" className={className}>
      <g transform="translate(18 0) scale(0.64)">
        <path d="M16 6h24v14a12 12 0 01-24 0z" fill="#ffd166" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <path d="M16 10H7c0 8 4 12 10 12M40 10h9c0 8-4 12-10 12" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <path d="M24 32h8v9h-8zM17 41h22v7H17z" fill="#ff9d71" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      </g>
      {/* raised arms */}
      <path d="M28 52L24 34M44 52l4-18" stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
      {/* torso and legs */}
      <path d="M36 50v24" stroke={shirt} strokeWidth={14} strokeLinecap="round" />
      <path d="M31 76l-3 24M41 76l3 24" stroke="#1b5353" strokeWidth={6} strokeLinecap="round" />
      {/* head */}
      <circle cx="36" cy="38" r="9" fill={SKIN} stroke={INK} strokeWidth={2} />
      <path d="M27 32c2-7 16-8 18 0-4-2-8-2-9 0-3-2-6-2-9 0z" fill={INK} />
      <path d="M32 41c2 3 6 3 8 0" stroke={INK} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

type Spot = {
  kind: "star" | "sparkle" | "squiggle" | "spiral" | "arrow" | "bulb" | "book" | "cap" | "heart" | "cloud" | "plane" | "rocket";
  pos: string;
  size: string;
  color: string;
  anim?: string;
};

const layouts: Record<string, Spot[]> = {
  hero: [
    { kind: "rocket", pos: "right-[6%] top-8", size: "h-20 w-12", color: "", anim: "animate-float" },
    { kind: "star", pos: "left-[4%] top-10", size: "h-8 w-8", color: "text-accent-400", anim: "animate-twinkle" },
    { kind: "sparkle", pos: "right-[30%] top-6", size: "h-6 w-6", color: "text-brand-400", anim: "animate-twinkle [animation-delay:-1.2s]" },
    { kind: "squiggle", pos: "left-[8%] bottom-10", size: "h-5 w-28", color: "text-brand-300" },
    { kind: "cloud", pos: "left-[38%] top-4", size: "h-8 w-16", color: "text-brand-200", anim: "animate-float-x" },
    { kind: "spiral", pos: "right-[4%] bottom-12", size: "h-10 w-10", color: "text-accent-300", anim: "animate-drift" },
  ],
  section: [
    { kind: "star", pos: "-left-2 top-6", size: "h-7 w-7", color: "text-accent-300", anim: "animate-twinkle" },
    { kind: "arrow", pos: "-right-4 top-2", size: "h-12 w-16", color: "text-brand-300" },
    { kind: "sparkle", pos: "right-8 bottom-4", size: "h-5 w-5", color: "text-brand-400", anim: "animate-twinkle [animation-delay:-0.8s]" },
  ],
  learn: [
    { kind: "bulb", pos: "-left-4 top-4", size: "h-12 w-10", color: "text-accent-400", anim: "animate-wiggle" },
    { kind: "book", pos: "-right-2 bottom-6", size: "h-10 w-12", color: "text-brand-400", anim: "animate-drift" },
    { kind: "star", pos: "right-10 top-2", size: "h-5 w-5", color: "text-accent-300", anim: "animate-twinkle" },
  ],
  grad: [
    { kind: "cap", pos: "-right-2 top-2", size: "h-10 w-14", color: "text-brand-500", anim: "animate-sway" },
    { kind: "heart", pos: "-left-3 bottom-8", size: "h-7 w-8", color: "text-accent-300", anim: "animate-pulse-soft" },
    { kind: "squiggle", pos: "left-1/3 -bottom-2", size: "h-4 w-24", color: "text-brand-200" },
  ],
  sky: [
    { kind: "plane", pos: "-left-6 top-0", size: "h-10 w-24", color: "text-brand-300", anim: "animate-float" },
    { kind: "cloud", pos: "-right-4 top-8", size: "h-8 w-16", color: "text-brand-200", anim: "animate-float-x" },
    { kind: "sparkle", pos: "right-1/4 bottom-2", size: "h-5 w-5", color: "text-accent-400", anim: "animate-twinkle" },
  ],
};

function Doodle({ kind, className }: { kind: Spot["kind"]; className: string }) {
  switch (kind) {
    case "star":
      return <StarDoodle className={className} />;
    case "sparkle":
      return <Sparkle className={className} />;
    case "squiggle":
      return <Squiggle className={className} />;
    case "spiral":
      return <Spiral className={className} />;
    case "arrow":
      return <CurlyArrow className={className} />;
    case "bulb":
      return <BulbDoodle className={className} />;
    case "book":
      return <BookDoodle className={className} />;
    case "cap":
      return <CapDoodle className={className} />;
    case "heart":
      return <HeartDoodle className={className} />;
    case "cloud":
      return <CloudDoodle className={className} />;
    case "plane":
      return <PaperPlane className={className} />;
    case "rocket":
      return <Rocket className={className} />;
  }
}

/**
 * A handful of doodles pinned to the edges of the nearest positioned
 * ancestor. Hidden below the sm breakpoint so small screens stay clean.
 */
export function DoodleField({
  variant = "section",
  className = "",
}: {
  variant?: keyof typeof layouts;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 hidden sm:block ${className}`} aria-hidden="true">
      {layouts[variant].map((s, i) => (
        <div key={i} className={`absolute ${s.pos} ${s.anim ?? ""}`}>
          <Doodle kind={s.kind} className={`${s.size} ${s.color} opacity-80`} />
        </div>
      ))}
    </div>
  );
}
