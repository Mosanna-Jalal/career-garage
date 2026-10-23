import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, Icon } from "@/components/icons";
import { Avatar, roleNames } from "@/components/connect/ui";
import { LinkChild, ParentControls, RequestList } from "@/components/dashboard/widgets";
import { DoodleField, KidWithTrophy, Rocket } from "@/components/doodles";
import { assessments } from "@/lib/assessments/catalog";
import { events } from "@/lib/connect/events";
import type { DashboardData, ResultSummary } from "@/lib/dashboard";
import { perksForRole } from "@/lib/site-content/partner";
import type { Wallet } from "@/lib/points-engine";

function Card({ title, action, children, className = "" }: { title: string; action?: { href: string; label: string }; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-brand-100 bg-white p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-extrabold text-ink">{title}</h2>
        {action && (
          <Link href={action.href} className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:gap-2">
            {action.label} <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Banner({ d, subtitle, accent }: { d: DashboardData; subtitle: string; accent: string }) {
  const { level, next, progress } = d.wallet.level;
  return (
    <section className="relative overflow-hidden rounded-[2rem] p-7 text-white shadow-xl sm:p-9" style={{ background: `linear-gradient(135deg, ${accent}, #16323a)` }}>
      <div className="pointer-events-none absolute right-6 top-4 hidden animate-float sm:block" aria-hidden="true">
        <Rocket className="h-20 w-12 rotate-12" />
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <Avatar name={d.me.name} color="rgba(255,255,255,0.18)" verified={d.me.verified} size="h-16 w-16 text-xl" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{roleNames[d.me.role]} dashboard</p>
          <h1 className="text-3xl font-extrabold tracking-tight">Hi, {d.me.name.replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/, "").split(" ")[0]} 👋</h1>
          <p className="mt-1 text-sm text-white/75">{subtitle}</p>
        </div>
      </div>
      <div className="mt-6 max-w-md">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-bold">
            {level.band} · {level.name}
          </span>
          <span className="text-white/75">{d.wallet.lifetime.toLocaleString()} CP</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-white/20">
          <div className="h-2.5 rounded-full bg-amber-300" style={{ width: `${Math.max(progress, 3)}%` }} />
        </div>
        {next && <p className="mt-1.5 text-xs text-white/70">{(next.min - d.wallet.lifetime).toLocaleString()} CP to {next.name}</p>}
      </div>
    </section>
  );
}

function PointsCard({ wallet }: { wallet: Wallet }) {
  return (
    <Card title="Career Points" action={{ href: "/points", label: "Points hub" }}>
      <div className="flex items-end gap-6">
        <div>
          <p className="text-4xl font-extrabold text-accent-600">{wallet.available.toLocaleString()}</p>
          <p className="text-xs text-ink/50">available CP</p>
        </div>
        <div>
          <p className="text-xl font-extrabold text-ink">{wallet.lifetime.toLocaleString()}</p>
          <p className="text-xs text-ink/50">lifetime CP</p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5 text-sm">
        {wallet.lines.slice(0, 4).map((l, i) => (
          <li key={i} className="flex justify-between gap-3 text-ink/70">
            <span className="truncate">{l.activity}</span>
            <span className="shrink-0 font-bold text-brand-700">+{l.cp}</span>
          </li>
        ))}
        {wallet.lines.length === 0 && <li className="text-ink/50">Complete your profile, ask or answer in a community to earn your first points.</li>}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {wallet.badges.filter((b) => b.earned).map((b) => (
          <span key={b.name} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
            🏅 {b.name}
          </span>
        ))}
      </div>
    </Card>
  );
}

function statusOf(results: ResultSummary[], slug: string) {
  const full = results.find((r) => r.slug === slug && r.mode === "full");
  const demo = results.find((r) => r.slug === slug && r.mode === "demo");
  if (full) return { label: full.status === "complete" ? "Full report" : "In progress", tone: "bg-emerald-100 text-emerald-800", detail: full.code ?? full.headline };
  if (demo) return { label: "Demo taken", tone: "bg-amber-100 text-amber-800", detail: demo.headline };
  return { label: "Not started", tone: "bg-ink/5 text-ink/50", detail: undefined };
}

function AssessmentsCard({ results, title = "My assessments" }: { results: ResultSummary[]; title?: string }) {
  const done = assessments.filter((a) => results.some((r) => r.slug === a.slug)).length;
  return (
    <Card title={`${title} · ${done}/${assessments.length}`} action={{ href: "/tests", label: "All assessments" }}>
      <ul className="grid gap-2 sm:grid-cols-2">
        {assessments.map((a) => {
          const s = statusOf(results, a.slug);
          return (
            <li key={a.slug}>
              <Link href={`/tests/${a.slug}`} className="flex items-center gap-3 rounded-2xl p-2 hover:bg-brand-50">
                <span className={`rounded-xl p-2 ${a.tint}`}>
                  <Icon name={a.icon} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">{a.name}</span>
                  {s.detail && <span className="block truncate text-xs text-ink/50">{s.detail}</span>}
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.tone}`}>{s.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function CommunitiesCard({ d }: { d: DashboardData }) {
  const mine = d.communities.filter((c) => c.isMember);
  const discover = d.communities.filter((c) => !c.isMember && c.fit).slice(0, 3);
  return (
    <Card title="My communities" action={{ href: "/connect", label: "Open Connect" }}>
      <ul className="space-y-2">
        {mine.map((c) => (
          <li key={c.id}>
            <Link href={`/connect?c=${c.id}`} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 hover:bg-brand-50">
              <span className="truncate text-sm font-semibold text-ink">
                {c.isOwner && "👑 "}
                {c.name}
              </span>
              <span className="shrink-0 text-xs text-ink/50">{c.memberCount} members</span>
            </Link>
          </li>
        ))}
        {mine.length === 0 && <li className="text-sm text-ink/50">You haven&apos;t joined a community yet.</li>}
      </ul>
      {discover.length > 0 && (
        <>
          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink/40">Made for people like you</p>
          <ul className="mt-2 space-y-2">
            {discover.map((c) => (
              <li key={c.id}>
                <Link href={`/connect?view=communities&focus=${c.id}`} className="block rounded-xl border border-dashed border-brand-200 px-3 py-2 hover:bg-brand-50">
                  <span className="text-sm font-semibold text-ink">{c.name}</span>
                  <span className="block text-xs text-ink/50">
                    {c.category} · {c.memberCount} members · {c.joinMode === "open" ? "open to join" : "request to join"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}

function PeopleCard({ d, title }: { d: DashboardData; title: string }) {
  return (
    <Card title={title} action={{ href: "/connect?view=people", label: "Find people" }}>
      <ul className="space-y-3">
        {d.suggestions.map((p) => (
          <li key={p.id} className="flex items-center gap-3">
            <Avatar name={p.name} color={p.color} verified={p.verified} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink">{p.name}</span>
              <span className="block truncate text-xs text-ink/50">
                {roleNames[p.role]} · {p.profile.headline ?? p.profile.className ?? p.profile.subject}
              </span>
            </span>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{p.score} in common</span>
          </li>
        ))}
        {d.suggestions.length === 0 && <li className="text-sm text-ink/50">Add interests to your profile to get suggestions.</li>}
      </ul>
    </Card>
  );
}

function EventsCard() {
  return (
    <Card title="Upcoming events" action={{ href: "/connect?view=events", label: "All events" }}>
      <ul className="space-y-3">
        {events.slice(0, 3).map((e) => (
          <li key={e.id} className="flex gap-3">
            <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-accent-50 text-accent-700">
              <span className="text-lg font-extrabold leading-none">{new Date(e.date).getDate()}</span>
              <span className="text-[10px] font-bold uppercase">{new Date(e.date).toLocaleString("en-IN", { month: "short" })}</span>
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{e.title}</span>
              <span className="text-xs text-ink/50">
                {e.host} · {e.mode}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
      <DoodleField variant="section" className="opacity-60" />
      <div className="relative mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}

export function StudentDashboard({ d }: { d: DashboardData }) {
  const next = assessments.find((a) => !d.results.some((r) => r.slug === a.slug));
  return (
    <Shell>
      <Banner d={d} accent="#1e8280" subtitle={d.me.profile.goal ?? "Discover. Plan. Build your future."} />
      {next && (
        <Link href={`/tests/${next.slug}/take`} className="hover-lift flex items-center justify-between gap-4 rounded-3xl border-2 border-dashed border-accent-200 bg-accent-50/50 p-5">
          <span>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-700">Next step</span>
            <span className="block text-lg font-extrabold text-ink">Try the {next.name} demo</span>
            <span className="text-sm text-ink/60">10 questions · a first look at your report</span>
          </span>
          <ArrowRightIcon className="h-6 w-6 shrink-0 text-accent-600" />
        </Link>
      )}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <AssessmentsCard results={d.results} />
        <div className="space-y-6">
          <PointsCard wallet={d.wallet} />
          <Card title={`Requests · ${d.requests.length}`}>
            <RequestList requests={d.requests} />
          </Card>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <CommunitiesCard d={d} />
        <PeopleCard d={d} title="Students like you" />
        <EventsCard />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Career roadmap" action={{ href: "/careers", label: "Interest areas" }}>
          <p className="text-sm text-ink/65">Explore 570 careers in 57 interest areas — courses, entrance exams, counselling notes and more.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {d.me.profile.careerInterests.map((c) => (
              <span key={c} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">{c}</span>
            ))}
          </div>
        </Card>
        <Card title="Safety" action={{ href: "/connect", label: "Connect" }}>
          <p className="text-sm text-ink/65">
            Private messages open only after you accept a request. Only verified teachers and professionals can contact you
            {d.me.controls?.contactFrom === "students" ? " — your parent has limited this to students only." : "."} You can block
            or report anyone from Connect.
          </p>
        </Card>
      </div>
    </Shell>
  );
}

const perkRole: Record<string, string> = { teacher: "educator", professor: "educator", counsellor: "counsellor", professional: "trainer" };

export function EducatorDashboard({ d }: { d: DashboardData }) {
  const owned = d.communities.filter((c) => c.isOwner);
  const perks = perksForRole(perkRole[d.me.role] ?? "educator").slice(0, 4);
  return (
    <Shell>
      <Banner d={d} accent="#2f6fd6" subtitle={d.me.profile.headline ?? "Guide, teach and grow your community."} />
      {!d.me.verified && (
        <p className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          <span className="font-bold">Verification pending.</span> Students can find your profile once your credentials are verified. Until
          then you can join professional communities and set up your profile.
        </p>
      )}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title={`Requests · ${d.requests.length}`} className="lg:col-span-2">
          <RequestList requests={d.requests} />
        </Card>
        <PointsCard wallet={d.wallet} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Questions waiting for an answer" action={{ href: "/connect", label: "Open Connect" }}>
          <ul className="space-y-3">
            {d.openQuestions.map((q, i) => (
              <li key={i}>
                <Link href={`/connect?c=${q.communityId}`} className="block rounded-2xl bg-brand-50/60 p-3 hover:bg-brand-50">
                  <span className="text-xs font-bold text-brand-700">{q.community}</span>
                  <span className="mt-0.5 block text-sm text-ink">{q.text}</span>
                  <span className="text-xs text-ink/50">asked by {q.from}</span>
                </Link>
              </li>
            ))}
            {d.openQuestions.length === 0 && <li className="text-sm text-ink/50">All caught up — no unanswered questions in your communities.</li>}
          </ul>
        </Card>
        <Card title="Communities I run" action={{ href: "/connect?view=create", label: "Create community" }}>
          <ul className="space-y-2">
            {owned.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 hover:bg-brand-50">
                <Link href={`/connect?c=${c.id}`} className="truncate text-sm font-semibold text-ink">
                  {c.name}
                </Link>
                <span className="shrink-0 text-xs text-ink/50">
                  {Object.entries(c.roleCounts).map(([r, n]) => `${n} ${roleNames[r]?.toLowerCase()}${n > 1 ? "s" : ""}`).join(" · ")}
                </span>
              </li>
            ))}
            {owned.length === 0 && <li className="text-sm text-ink/50">Create a community by choosing who it is for — class, subjects, interests and more.</li>}
          </ul>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Your partner perks" action={{ href: "/partners", label: "Earnings guide" }}>
          <ul className="space-y-2">
            {perks.map((p) => (
              <li key={p.activity + p.earner} className="flex justify-between gap-3 text-sm">
                <span className="text-ink/70">{p.activity}</span>
                <span className="shrink-0 font-bold text-accent-600">{p.default}</span>
              </li>
            ))}
          </ul>
        </Card>
        <PeopleCard d={d} title="People you could help" />
        <EventsCard />
      </div>
    </Shell>
  );
}

export function ParentDashboard({ d }: { d: DashboardData }) {
  const c = d.child;
  return (
    <Shell>
      <Banner d={d} accent="#e0457b" subtitle={c ? `Following ${c.member.name}'s journey` : "Link your child's account to follow their journey."} />
      {!c ? (
        <Card title="Link your child">
          <p className="mb-4 text-sm text-ink/65">
            Enter the email your child used for their Career Garage account. You&apos;ll see their progress and control who can contact them.
          </p>
          <LinkChild />
        </Card>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <Card title={c.member.name}>
              <div className="flex items-center gap-4">
                <Avatar name={c.member.name} color={c.member.color} size="h-14 w-14 text-lg" />
                <div className="text-sm text-ink/70">
                  <p className="font-semibold text-ink">{[c.member.profile.className, c.member.profile.school].filter(Boolean).join(" · ")}</p>
                  <p>{c.member.profile.goal}</p>
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  [c.results.length, "assessments"],
                  [c.communities.length, "communities"],
                  [c.wallet.lifetime, "Career Points"],
                ].map(([n, l]) => (
                  <div key={l as string} className="rounded-2xl bg-brand-50 p-3">
                    <dt className="text-2xl font-extrabold text-brand-700">{n as number}</dt>
                    <dd className="text-[11px] text-ink/55">{l as string}</dd>
                  </div>
                ))}
              </dl>
              {c.communities.length > 0 && <p className="mt-4 text-xs text-ink/55">Communities: {c.communities.join(", ")}</p>}
              <p className="mt-1 text-xs text-ink/55">
                {c.connections} accepted connection{c.connections === 1 ? "" : "s"} · level {c.wallet.level.level.name}
              </p>
            </Card>
            <Card title="Parent Control Center" className="bg-brand-50/40">
              <ParentControls childName={c.member.name} initial={c.controls} />
            </Card>
          </div>
          <AssessmentsCard results={c.results} title={`${c.member.name.split(" ")[0]}'s assessments`} />
        </>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        <PointsCard wallet={d.wallet} />
        <EventsCard />
        <Card title="Supporting without pressure" action={{ href: "/about/faq", label: "Parent FAQs" }}>
          <div className="flex items-start gap-3">
            <KidWithTrophy className="h-20 w-14 shrink-0 animate-hop" />
            <p className="text-sm text-ink/65">
              Reports describe tendencies, not destinies. Use them to ask your child what feels true, explore options together and plan
              one small next step.
            </p>
          </div>
        </Card>
      </div>
    </Shell>
  );
}

