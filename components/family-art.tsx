import type { CSSProperties, ReactNode } from "react";

/**
 * Animated illustration for each of the 14 career families in the 570-career
 * library. Pure SVG + the animation utilities in globals.css (which switch
 * off under prefers-reduced-motion).
 */

const ink = "#16323a";
const box: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };
const base: CSSProperties = { transformBox: "fill-box", transformOrigin: "bottom center" };

function G({ cls, style = box, children }: { cls: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <g className={cls} style={style}>
      {children}
    </g>
  );
}

const scenes: Record<string, (c: string) => ReactNode> = {
  technology: (c) => (
    <>
      <rect x="38" y="34" width="84" height="54" rx="6" fill="#fff" stroke={ink} strokeWidth="3" />
      <rect x="28" y="88" width="104" height="8" rx="4" fill={c} />
      <G cls="animate-pulse-soft">
        <path d="M52 50l-8 8 8 8M70 66l8-8-8-8" stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <rect x="84" y="54" width="22" height="4" rx="2" fill={c} opacity=".6" />
        <rect x="84" y="62" width="14" height="4" rx="2" fill={c} opacity=".4" />
      </G>
      <G cls="animate-spin-slow">
        <circle cx="128" cy="30" r="10" fill="none" stroke={c} strokeWidth="4" strokeDasharray="5 4" />
      </G>
      <G cls="animate-twinkle"><circle cx="30" cy="28" r="4" fill="#ffd166" /></G>
    </>
  ),
  engineering: (c) => (
    <>
      <G cls="animate-spin-slow">
        <circle cx="62" cy="62" r="24" fill={c} />
        <circle cx="62" cy="62" r="9" fill="#fff" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="58" y="30" width="8" height="10" fill={c} transform={`rotate(${i * 45} 62 62)`} />
        ))}
      </G>
      <G cls="animate-spin-slower-reverse">
        <circle cx="108" cy="44" r="16" fill="#fff" stroke={ink} strokeWidth="3" />
        <circle cx="108" cy="44" r="5" fill={ink} />
      </G>
      <rect x="30" y="98" width="100" height="6" rx="3" fill={ink} opacity=".15" />
    </>
  ),
  healthcare: (c) => (
    <>
      <rect x="54" y="20" width="52" height="52" rx="12" fill={c} />
      <path d="M80 32v28M66 46h28" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
      <path d="M20 92h30l8-16 10 30 10-22 6 8h46" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-line" style={{ strokeDasharray: 400 }} />
      <G cls="animate-pulse-soft"><circle cx="136" cy="92" r="5" fill={c} /></G>
    </>
  ),
  science: (c) => (
    <>
      <path d="M68 22h24M72 22v26L52 92a6 6 0 005 9h46a6 6 0 005-9L88 48V22" fill="#fff" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 78h40l7 13a4 4 0 01-4 6H57a4 4 0 01-4-6z" fill={c} />
      {[0, 1, 2].map((i) => (
        <G key={i} cls="animate-float" style={{ ...box, animationDelay: `${-i * 1.4}s` }}>
          <circle cx={70 + i * 10} cy={70 - i * 10} r={3 + i} fill={c} opacity=".7" />
        </G>
      ))}
      <G cls="animate-spin-slow">
        <ellipse cx="128" cy="36" rx="16" ry="6" fill="none" stroke={c} strokeWidth="2.5" />
        <circle cx="128" cy="36" r="3.5" fill={ink} />
      </G>
    </>
  ),
  business: (c) => (
    <>
      {[30, 46, 62, 78].map((h, i) => (
        <G key={i} cls="animate-pulse-soft" style={{ ...base, animationDelay: `${i * 0.3}s` }}>
          <rect x={36 + i * 22} y={100 - h} width="14" height={h} rx="3" fill={i === 3 ? c : `${c}88`} />
        </G>
      ))}
      <path d="M34 72l26-14 22 8 34-30" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" className="animate-draw-line" style={{ strokeDasharray: 400 }} />
      <path d="M108 34h10v10" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      <G cls="animate-float"><circle cx="136" cy="70" r="9" fill="#ffd166" stroke={ink} strokeWidth="2" /></G>
    </>
  ),
  law: (c) => (
    <>
      <path d="M80 18v80M56 98h48" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <G cls="animate-sway" style={{ transformBox: "fill-box", transformOrigin: "top center" }}>
        <path d="M44 34h72" stroke={ink} strokeWidth="4" strokeLinecap="round" />
        <path d="M44 34l-12 28h24zM116 34l-12 28h24z" fill={c} opacity=".85" />
      </G>
      <circle cx="80" cy="18" r="5" fill={c} />
    </>
  ),
  public: (c) => (
    <>
      <path d="M40 46l40-22 40 22z" fill={c} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={48 + i * 19} y="50" width="7" height="40" fill="#fff" stroke={ink} strokeWidth="2" />)}
      <rect x="36" y="90" width="88" height="8" rx="2" fill={ink} />
      <path d="M118 22v-12" stroke={ink} strokeWidth="2.5" />
      <G cls="animate-wiggle" style={{ transformBox: "fill-box", transformOrigin: "left center" }}>
        <path d="M118 10h20l-5 5 5 5h-20z" fill="#fe4711" />
      </G>
    </>
  ),
  education: (c) => (
    <>
      <path d="M80 44C66 34 48 34 36 38v54c12-4 30-4 44 6 14-10 32-10 44-6V38c-12-4-30-4-44 6zM80 44v54" fill="#fff" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M46 52c8-2 16-2 24 2M46 62c8-2 16-2 24 2M90 54c8-4 16-4 24-2" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <G key={i} cls="animate-twinkle" style={{ ...box, animationDelay: `${i * 0.7}s` }}>
          <path d={`M${60 + i * 22} ${20 - (i % 2) * 6}l3 7 7 3-7 3-3 7-3-7-7-3 7-3z`} fill="#ffd166" />
        </G>
      ))}
    </>
  ),
  design: (c) => (
    <>
      <path d="M30 96c20-40 50-50 70-30s30 10 34-20" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" className="animate-draw-line" style={{ strokeDasharray: 400 }} />
      <G cls="animate-wiggle">
        <path d="M120 30l12 12-38 38-16 4 4-16z" fill="#ffd166" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      </G>
      <circle cx="40" cy="36" r="10" fill={`${c}55`} />
      <rect x="54" y="22" width="16" height="16" rx="3" fill={`${c}33`} transform="rotate(15 62 30)" />
    </>
  ),
  creative: (c) => (
    <>
      <rect x="40" y="40" width="64" height="48" rx="6" fill={ink} />
      <path d="M66 54v20l16-10z" fill="#fff" />
      <path d="M40 40l10-14h12l-10 14M62 40l10-14h12l-10 14M84 40l10-14h10" stroke={c} strokeWidth="5" />
      {[0, 1].map((i) => (
        <G key={i} cls="animate-float" style={{ ...box, animationDelay: `${-i * 2}s` }}>
          <path d={`M${118 + i * 14} ${44 + i * 16}v-16l10-3v16`} stroke={c} strokeWidth="3" fill="none" />
          <circle cx={116 + i * 14} cy={45 + i * 16} r="4" fill={c} />
        </G>
      ))}
    </>
  ),
  service: (c) => (
    <>
      <G cls="animate-float">
        <path d="M30 60l90-26c8-2 12 6 4 10L42 74z" fill="#fff" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <path d="M70 52l-6-22 10-2 16 20M60 70l4 16 9-2 6-18" fill={c} />
      </G>
      <path d="M24 100c20-6 40-6 60 0s40 6 60 0" stroke={c} strokeWidth="3" fill="none" strokeDasharray="4 6" />
    </>
  ),
  maritime: (c) => (
    <>
      <G cls="animate-sway">
        <path d="M44 74h72l-12 18H56z" fill={c} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <path d="M80 30v44M80 34l24 30H80z" fill="#fff" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      </G>
      <path d="M20 98c10-6 20-6 30 0s20 6 30 0 20-6 30 0 20 6 30 0" stroke="#45bdb7" strokeWidth="4" fill="none" className="animate-float-x" />
    </>
  ),
  social: (c) => (
    <>
      <G cls="animate-pulse-soft">
        <path d="M80 96S44 74 44 50c0-11 8-18 17-18 9 0 15 6 19 13 4-7 10-13 19-13 9 0 17 7 17 18 0 24-36 46-36 46z" fill={c} />
      </G>
      {[30, 130].map((x, i) => (
        <G key={x} cls="animate-hop" style={{ ...base, animationDelay: `${i * 0.5}s` }}>
          <circle cx={x} cy="66" r="7" fill="#ffc5a8" stroke={ink} strokeWidth="2" />
          <path d={`M${x} 74v18`} stroke={ink} strokeWidth="5" strokeLinecap="round" />
        </G>
      ))}
    </>
  ),
  vocational: (c) => (
    <>
      <G cls="animate-wiggle">
        <path d="M56 96l34-34a16 16 0 0020-20l-10 10-8-2-2-8 10-10a16 16 0 00-20 20L46 86z" fill={c} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      </G>
      <G cls="animate-spin-slow">
        <circle cx="124" cy="78" r="12" fill="none" stroke={ink} strokeWidth="3" strokeDasharray="6 5" />
      </G>
      <G cls="animate-twinkle"><circle cx="36" cy="34" r="4" fill="#ffd166" /></G>
    </>
  ),
};

export function FamilyArt({ family, className = "", color }: { family: string; className?: string; color: string }) {
  const draw = scenes[family] ?? scenes.vocational;
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      <rect x="0" y="0" width="160" height="120" rx="22" fill={`${color}14`} />
      <circle cx="132" cy="104" r="34" fill={`${color}10`} />
      {draw(color)}
    </svg>
  );
}
