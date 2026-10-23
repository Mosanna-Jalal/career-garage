import Link from "next/link";
import type { Metadata } from "next";
import { ContentTable } from "@/components/assessment/blocks";
import { DoodleField, KidWithTrophy, Trophy } from "@/components/doodles";
import { PointsCatalogue } from "@/components/points-catalogue";
import { Reveal } from "@/components/reveal";
import { currentMember } from "@/lib/members";
import { getWallet } from "@/lib/points-engine";
import { points } from "@/lib/site-content/points";

export const metadata: Metadata = {
  title: "Career Points",
  description: "How Career Points, levels, badges and rewards work at Career Garage.",
};
export const dynamic = "force-dynamic";

export default async function PointsPage() {
  const me = await currentMember();
  const wallet = me ? await getWallet(me) : null;
  const a = points.architecture;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-white">
        <DoodleField variant="hero" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-1.5 text-xs font-semibold text-amber-800">
              Career Points · Rewards &amp; Recognition
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Earn points for real progress — <span className="text-accent-600">not for clicks.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/70">{a.purpose}</p>
            <p className="mt-4 rounded-2xl bg-white/80 p-4 font-mono text-sm text-ink/75 shadow-sm">{a.formula}</p>
          </div>
          {wallet ? (
            <div className="relative rounded-[2rem] bg-gradient-to-br from-amber-400 to-accent-500 p-7 text-white shadow-2xl">
              <div className="pointer-events-none absolute -right-3 -top-6 animate-hop" aria-hidden="true">
                <Trophy className="h-16 w-14" />
              </div>
              <p className="text-sm font-bold text-white/80">{me!.name}</p>
              <p className="mt-2 text-5xl font-extrabold">{wallet.available.toLocaleString()}</p>
              <p className="text-sm text-white/80">available CP · {wallet.lifetime.toLocaleString()} lifetime</p>
              <p className="mt-5 font-bold">
                {wallet.level.level.band} · {wallet.level.level.name}
              </p>
              <div className="mt-2 h-3 rounded-full bg-white/25">
                <div className="h-3 rounded-full bg-white" style={{ width: `${Math.max(wallet.level.progress, 3)}%` }} />
              </div>
              {wallet.level.next && (
                <p className="mt-1.5 text-xs text-white/85">
                  {(wallet.level.next.min - wallet.lifetime).toLocaleString()} CP to {wallet.level.next.name}
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-[2rem] border-2 border-dashed border-amber-200 bg-white p-7 text-center">
              <div className="mx-auto w-fit animate-hop" aria-hidden="true">
                <KidWithTrophy className="h-28 w-20" />
              </div>
              <p className="mt-3 font-bold text-ink">Sign in to see your points, level and badges.</p>
              <div className="mt-4 flex justify-center gap-3">
                <Link href="/login?next=/points" className="rounded-full border-2 border-brand-200 px-5 py-2.5 text-sm font-bold text-brand-700">
                  Log in
                </Link>
                <Link href="/signup" className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-white">
                  Sign up free
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-24 sm:px-6">
        {wallet && (
          <Reveal className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-ink">Your points statement</h2>
              <ul className="mt-4 divide-y divide-brand-50">
                {wallet.lines.map((l, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-ink">{l.activity}</span>
                      <span className="text-xs text-ink/45">
                        {l.code} · {new Date(l.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })} · {l.status} · rule v{l.ruleVersion}
                      </span>
                    </span>
                    <span className="shrink-0 font-extrabold text-brand-700">+{l.cp}</span>
                  </li>
                ))}
                {wallet.lines.length === 0 && (
                  <li className="py-4 text-sm text-ink/50">
                    No points yet. Complete your profile, ask or answer questions in{" "}
                    <Link href="/connect" className="font-semibold text-brand-600">
                      Connect
                    </Link>{" "}
                    or finish a full assessment.
                  </li>
                )}
              </ul>
            </section>
            <section className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-ink">Badges</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {wallet.badges.map((b) => (
                  <li key={b.name} title={b.criterion} className={`rounded-2xl p-3 text-center ${b.earned ? "bg-amber-100" : "bg-ink/[0.03] opacity-60"}`}>
                    <span className="text-2xl">{b.earned ? "🏅" : "🔒"}</span>
                    <span className="block text-xs font-bold text-ink">{b.name}</span>
                    <span className="block text-[10px] text-ink/50">{b.criterion}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">How to earn</h2>
          <p className="mt-2 text-ink/60">Every action has a code, a value, a limit and a verification gate.</p>
          <div className="mt-6">
            <PointsCatalogue actions={points.actions} sections={points.sections} />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">Levels</h2>
          <div className="stagger mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {points.levels.map((l, i) => (
              <div key={l.band} className={`rounded-3xl p-5 ${wallet?.level.level.band === l.band ? "bg-gradient-to-br from-amber-400 to-accent-500 text-white shadow-xl" : "border border-brand-100 bg-white"}`}>
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">{l.band}</p>
                <p className="mt-1 text-xl font-extrabold">{l.name}</p>
                <p className="text-sm opacity-80">
                  {l.min.toLocaleString()}
                  {l.max ? `–${l.max.toLocaleString()}` : "+"} CP
                </p>
                <p className="mt-2 text-xs opacity-75">{l.recognition}</p>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: i + 1 }).map((_, k) => (
                    <span key={k}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Badges</h2>
            <ContentTable rows={[["Badge", "Criterion", "Eligible group"], ...points.badges.map((b) => [b.name, b.criterion, b.group])]} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Referrals</h2>
            <ContentTable rows={[["Referral milestone", "CP", "Posting condition"], ...points.referrals.map((r) => [r.milestone, r.cp, r.condition])]} />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-2xl font-extrabold text-ink">Rewards you can redeem</h2>
          <ContentTable rows={[["Reward", "Indicative CP", "Eligible group", "Control"], ...points.rewards.map((r) => [r.reward, r.cp, r.group, r.control])]} />
        </Reveal>

        <Reveal className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Principles</h2>
            <ul className="mt-4 space-y-2.5">
              {a.principles.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-ink/75">
                  <span className="text-brand-600">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg font-extrabold text-ink">Never rewarded</h3>
            <ul className="mt-3 space-y-2">
              {points.neverReward.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-ink/70">
                  <span className="text-accent-600">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Quality multipliers</h2>
            <ContentTable rows={[["Quality multiplier", "When used", "Result"], ...a.multipliers]} />
            <h2 className="mt-10 text-2xl font-extrabold text-ink">Caps &amp; integrity</h2>
            <ContentTable rows={[["Control", "Recommended default", "Response"], ...points.caps]} />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-2xl font-extrabold text-ink">Career Points terms</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {points.terms.map((t) => (
              <li key={t} className="rounded-2xl bg-cream p-4 text-sm leading-relaxed text-ink/75">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </>
  );
}
