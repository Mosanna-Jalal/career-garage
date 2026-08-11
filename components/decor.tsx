/**
 * Decorative animated scenes used in place of photography.
 * Server-safe (no hooks). All motion respects prefers-reduced-motion via
 * the animation utilities in globals.css.
 */

type SceneProps = { className?: string };

/** Bright, cartoonish cluster for the younger audience pages. */
export function PlayfulScene({ className = "" }: SceneProps) {
  return (
    <div
      className={`pointer-events-none relative aspect-square w-full max-w-md ${className}`}
      aria-hidden="true"
    >
      {/* soft backdrop blob */}
      <div className="absolute inset-6 animate-blob bg-gradient-to-br from-brand-200/70 to-accent-100/70" />

      {/* orbit ring */}
      <div className="absolute inset-10 animate-spin-slow rounded-full border-4 border-dashed border-white/70" />

      {/* centre: happy planet */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-jelly rounded-full bg-white p-7 shadow-2xl shadow-brand-900/15">
          <svg viewBox="0 0 64 64" className="h-16 w-16">
            <circle cx="32" cy="32" r="28" fill="#45bdb7" />
            <circle cx="23" cy="26" r="4" fill="#09272a" />
            <circle cx="41" cy="26" r="4" fill="#09272a" />
            <path
              d="M20 38c4 7 20 7 24 0"
              stroke="#09272a"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="15" cy="36" r="3.5" fill="#ff9d71" opacity="0.9" />
            <circle cx="49" cy="36" r="3.5" fill="#ff9d71" opacity="0.9" />
          </svg>
        </div>
      </div>

      {/* pencil */}
      <div className="absolute left-2 top-14 animate-wiggle">
        <div className="rounded-2xl bg-white p-3 shadow-xl">
          <svg viewBox="0 0 32 32" className="h-8 w-8">
            <path d="M6 26l2-6 14-14 4 4-14 14z" fill="#ff6a38" />
            <path d="M22 6l4 4 2-2-4-4z" fill="#1e8280" />
            <path d="M6 26l2-6 3 3z" fill="#16323a" />
          </svg>
        </div>
      </div>

      {/* rocket */}
      <div className="absolute right-3 top-24 animate-hop">
        <div className="rounded-2xl bg-white p-3 shadow-xl">
          <svg viewBox="0 0 32 32" className="h-8 w-8">
            <path
              d="M16 3c5 4 7 10 7 15l-4 4h-6l-4-4c0-5 2-11 7-15z"
              fill="#29a29d"
            />
            <circle cx="16" cy="13" r="3" fill="#fff" />
            <path d="M13 24l3 6 3-6z" fill="#fe4711" />
          </svg>
        </div>
      </div>

      {/* paint palette */}
      <div className="absolute bottom-16 left-6 animate-sway">
        <div className="rounded-2xl bg-white p-3 shadow-xl">
          <svg viewBox="0 0 32 32" className="h-8 w-8">
            <path
              d="M16 4a12 12 0 100 24c2 0 3-1 3-2s-1-2-1-3 1-2 3-2h2a5 5 0 005-5c0-6-5-12-12-12z"
              fill="#ffc5a8"
            />
            <circle cx="11" cy="12" r="2.2" fill="#fe4711" />
            <circle cx="18" cy="9" r="2.2" fill="#1e8280" />
            <circle cx="10" cy="20" r="2.2" fill="#7dd8d1" />
          </svg>
        </div>
      </div>

      {/* trophy */}
      <div className="absolute bottom-10 right-10 animate-hop [animation-delay:-1.1s]">
        <div className="rounded-2xl bg-white p-3 shadow-xl">
          <svg viewBox="0 0 32 32" className="h-8 w-8">
            <path d="M10 5h12v8a6 6 0 01-12 0z" fill="#ff9d71" />
            <path d="M14 19h4v5h-4z" fill="#c61e08" />
            <path d="M10 24h12v3H10z" fill="#1c6867" />
          </svg>
        </div>
      </div>

      {/* twinkling stars */}
      {[
        "left-1/2 top-2",
        "right-6 bottom-1/3",
        "left-10 bottom-4",
        "right-1/4 top-6",
      ].map((pos, i) => (
        <svg
          key={pos}
          viewBox="0 0 24 24"
          className={`absolute ${pos} h-5 w-5 animate-twinkle text-accent-400`}
          style={{ animationDelay: `${i * 0.7}s` }}
          fill="currentColor"
        >
          <path d="M12 0l2.6 8.4L23 12l-8.4 2.6L12 24l-2.6-9.4L1 12l8.4-3.6z" />
        </svg>
      ))}
    </div>
  );
}

/** Calmer orbiting-node scene for framework / road-map pages. */
export function FrameworkScene({
  nodes,
  className = "",
}: SceneProps & { nodes: string[] }) {
  return (
    <div
      className={`pointer-events-none relative aspect-square w-full max-w-sm ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 animate-spin-slower-reverse rounded-full border border-dashed border-brand-200" />
      <div className="absolute inset-12 rounded-full border border-brand-100" />

      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#b0eae4"
          strokeWidth="1.5"
          className="animate-draw-line"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="animate-pulse-soft rounded-full bg-brand-600 px-5 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl">
          You
        </div>
      </div>

      {nodes.slice(0, 6).map((label, i) => {
        const angle = (i / Math.min(nodes.length, 6)) * 2 * Math.PI - Math.PI / 2;
        const r = 42; // percent from centre
        const x = 50 + r * Math.cos(angle);
        const y = 50 + r * Math.sin(angle);
        return (
          <span
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-pop-in whitespace-nowrap rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-700 shadow-md"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animationDelay: `${0.15 * i}s`,
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
