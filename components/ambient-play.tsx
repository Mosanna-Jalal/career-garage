"use client";

import { useEffect, useState } from "react";
import {
  BulbDoodle,
  CapDoodle,
  KidWithTrophy,
  PaperPlane,
  Rocket,
  RunningKid,
  Sparkle,
  StarDoodle,
} from "@/components/doodles";

/**
 * Keeps the empty edges of the site alive.
 *
 * - On wide screens, a few doodles float in the gutters beside the content.
 * - When the visitor stops interacting for a few seconds, short scenes play
 *   across the viewport: a rocket launch, a child running, a trophy moment
 *   with confetti, a paper plane. Any movement, scroll or key press fades
 *   them out immediately so they never compete with reading.
 *
 * Everything is pointer-events-none and disabled for reduced motion.
 */

const IDLE_MS = 6500;
const GAP_MS = 2600;
const scenes = ["rocket", "runner", "trophy", "plane", "race"] as const;
type Scene = (typeof scenes)[number];
const sceneLength: Record<Scene, number> = {
  rocket: 7200,
  runner: 9200,
  trophy: 7200,
  plane: 10200,
  race: 9600,
};

const confettiColors = ["#fe4711", "#29a29d", "#ffd166", "#7dd8d1", "#ff9d71", "#8a5cf6"];
const confetti = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2;
  const dist = 70 + ((i * 37) % 60);
  return {
    dx: `${Math.round(Math.cos(angle) * dist)}px`,
    dy: `${Math.round(Math.sin(angle) * dist - 40)}px`,
    rot: `${(i * 67) % 360}deg`,
    color: confettiColors[i % confettiColors.length],
    delay: `${(i % 5) * 0.05}s`,
  };
});

export function AmbientPlay() {
  const [scene, setScene] = useState<Scene | null>(null);
  const [active, setActive] = useState(false);
  const [take, setTake] = useState(0);

  useEffect(() => {
    // idle scenes are skipped entirely for reduced motion; the gutter
    // doodles stay, and globals.css already stops their animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let sceneTimer: ReturnType<typeof setTimeout> | undefined;
    let next = Math.floor(Math.random() * scenes.length);

    const play = () => {
      const s = scenes[next % scenes.length];
      next++;
      setScene(s);
      setTake((t) => t + 1);
      setActive(true);
      sceneTimer = setTimeout(() => {
        setActive(false);
        sceneTimer = setTimeout(play, GAP_MS);
      }, sceneLength[s]);
    };

    const wake = () => {
      clearTimeout(idleTimer);
      clearTimeout(sceneTimer);
      setActive(false);
      if (!document.hidden) idleTimer = setTimeout(play, IDLE_MS);
    };

    const events = ["pointermove", "pointerdown", "keydown", "scroll", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    document.addEventListener("visibilitychange", wake);
    wake();
    return () => {
      clearTimeout(idleTimer);
      clearTimeout(sceneTimer);
      events.forEach((e) => window.removeEventListener(e, wake));
      document.removeEventListener("visibilitychange", wake);
    };
  }, []);

  return (
    <>
      {/* Gutter doodles — only where there is real empty space beside content */}
      <div className="pointer-events-none fixed inset-y-0 left-0 z-10 hidden w-24 min-[1500px]:block" aria-hidden="true">
        <div className="absolute left-6 top-40 animate-float">
          <Rocket className="h-16 w-10 -rotate-12" />
        </div>
        <StarDoodle className="absolute left-12 top-[48%] h-6 w-6 animate-twinkle text-accent-400" />
        <div className="absolute bottom-28 left-5 animate-wiggle">
          <BulbDoodle className="h-11 w-9 text-brand-400" />
        </div>
      </div>
      <div className="pointer-events-none fixed inset-y-0 right-0 z-10 hidden w-24 min-[1500px]:block" aria-hidden="true">
        <div className="absolute right-4 top-48 animate-sway">
          <CapDoodle className="h-10 w-14 text-brand-500" />
        </div>
        <Sparkle className="absolute right-12 top-[58%] h-6 w-6 animate-twinkle text-brand-400 [animation-delay:-1.4s]" />
        <div className="absolute bottom-40 right-3 animate-float [animation-delay:-2s]">
          <PaperPlane trail={false} className="h-8 w-16 text-accent-400" />
        </div>
      </div>

      {/* Idle scenes */}
      <div
        className={`pointer-events-none fixed inset-0 z-[45] overflow-hidden transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {scene === "rocket" && (
          <div key={take} className="absolute left-0 top-0 animate-rocket-flight">
            <Rocket className="h-24 w-14 drop-shadow-lg" />
          </div>
        )}

        {scene === "plane" && (
          <div key={take} className="absolute left-0 top-0 animate-plane-glide">
            <PaperPlane className="h-16 w-36 text-brand-400 drop-shadow" />
          </div>
        )}

        {(scene === "runner" || scene === "race") && (
          <div key={take} className="absolute inset-x-0 bottom-0 h-28">
            <div className="absolute inset-x-0 bottom-2 border-b-2 border-dashed border-brand-200" />
            <div className="absolute bottom-3 left-0 flex animate-run-across items-end gap-3">
              {scene === "race" && (
                <RunningKid shirt="#fe4711" className="h-20 w-14" />
              )}
              <RunningKid className="h-20 w-14" />
              <div className="mb-14 animate-twinkle">
                <StarDoodle className="h-7 w-7 text-amber-400" fill="#ffd166" />
              </div>
            </div>
          </div>
        )}

        {scene === "trophy" && (
          <div key={take} className="absolute bottom-4 left-6 sm:left-12">
            <div className="relative animate-trophy-raise">
              <KidWithTrophy className="h-32 w-20" />
              <div className="absolute left-1/2 top-4">
                {confetti.map((c, i) => (
                  <span
                    key={i}
                    className="absolute block h-2.5 w-1.5 animate-confetti rounded-sm"
                    style={
                      {
                        background: c.color,
                        "--dx": c.dx,
                        "--dy": c.dy,
                        "--rot": c.rot,
                        animationDelay: c.delay,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
