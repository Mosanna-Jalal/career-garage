"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Avatar, ChipPicker, postJson, roleNames } from "@/components/connect/ui";
import { Chat } from "@/components/connect/chat";
import { CommunitiesView, CombinationChips, CreateCommunity } from "@/components/connect/communities";
import { PeopleView } from "@/components/connect/people";
import { timeAgo, type ConnectState } from "@/components/connect/types";
import {
  careerInterestOptions,
  classOptions,
  interestOptions,
  languageOptions,
  skillOptions,
  stateOptions,
} from "@/lib/connect/options";

type View = "home" | "people" | "communities" | "create" | "messages" | "experts" | "events" | "requests" | "profile";

const nav: { id: View; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "people", label: "People", icon: "👥" },
  { id: "communities", label: "Communities", icon: "🏘" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "experts", label: "Ask an Expert", icon: "🎓" },
  { id: "events", label: "Events", icon: "📅" },
  { id: "requests", label: "Requests", icon: "🔔" },
  { id: "profile", label: "My Profile", icon: "👤" },
];

type FeedItem = { id: string; text: string; from: ConnectState["me"] | null; community: { name: string; id: string }; answers: number; resolved: boolean; helpful: number; at: string };

function Feed({ onOpen }: { onOpen: (id: string) => void }) {
  const [tab, setTab] = useState<"latest" | "popular" | "unanswered">("latest");
  const [items, setItems] = useState<FeedItem[] | null>(null);
  useEffect(() => {
    let live = true;
    fetch(`/api/connect/feed?tab=${tab}`)
      .then((r) => r.json())
      .then((d) => live && setItems(d.items ?? []));
    return () => {
      live = false;
    };
  }, [tab]);
  return (
    <section className="rounded-3xl border border-brand-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold text-ink">Community feed</h2>
        <div className="flex gap-1">
          {(["latest", "popular", "unanswered"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${tab === t ? "bg-brand-600 text-white" : "text-ink/60 hover:bg-brand-50"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-4 divide-y divide-brand-50">
        {items === null && <li className="py-4 text-sm text-ink/50">Loading…</li>}
        {items?.length === 0 && <li className="py-4 text-sm text-ink/50">Nothing here yet — join a community and ask the first question.</li>}
        {items?.map((i) => (
          <li key={i.id}>
            <button onClick={() => onOpen(i.community.id)} className="flex w-full gap-3 py-4 text-left hover:bg-brand-50/40">
              {i.from && <Avatar name={i.from.name} color={i.from.color} verified={i.from.verified} size="h-9 w-9 text-xs" />}
              <span className="min-w-0 flex-1">
                <span className="text-xs text-ink/50">
                  <span className="font-bold text-ink">{i.from?.name}</span> · {i.from?.profile.className ?? roleNames[i.from?.role ?? ""]} · {timeAgo(i.at)}
                </span>
                <span className="mt-1 inline-block rounded bg-brand-50 px-1.5 text-[10px] font-bold text-brand-700">{i.community.name}</span>
                <span className="mt-1 block text-sm font-semibold text-ink">{i.text}</span>
                <span className="mt-1 block text-xs text-ink/50">
                  👍 {i.helpful} · {i.answers} answer{i.answers === 1 ? "" : "s"}
                  {i.resolved && <span className="ml-2 font-bold text-emerald-700">✓ Resolved</span>}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProfileEditor({ me, onSaved }: { me: ConnectState["me"]; onSaved: () => void }) {
  const [p, setP] = useState({ ...me.profile, className: me.profile.className ?? "", state: me.profile.state ?? "" });
  const [msg, setMsg] = useState<string | null>(null);
  const field = "mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-400";
  return (
    <div className="h-full overflow-y-auto p-5 sm:p-7">
      <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm">
        <div className="flex items-center gap-4 bg-gradient-to-r from-brand-800 to-indigo-700 p-6 text-white">
          <Avatar name={me.name} color={me.color} verified={me.verified} size="h-16 w-16 text-xl" />
          <div>
            <p className="text-2xl font-extrabold">{me.name}</p>
            <p className="text-sm text-white/75">{[roleNames[me.role], p.className, p.school].filter(Boolean).join(" · ")}</p>
          </div>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          {me.role === "student" ? (
            <label className="text-sm font-semibold text-ink/70">
              Class / stage
              <select value={p.className} onChange={(e) => setP({ ...p, className: e.target.value })} className={field}>
                <option value="">—</option>
                {classOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
          ) : (
            <label className="text-sm font-semibold text-ink/70">
              Headline
              <input value={p.headline ?? ""} onChange={(e) => setP({ ...p, headline: e.target.value })} className={field} />
            </label>
          )}
          <label className="text-sm font-semibold text-ink/70">
            Subject / field
            <input value={p.subject ?? ""} onChange={(e) => setP({ ...p, subject: e.target.value })} className={field} />
          </label>
          <label className="text-sm font-semibold text-ink/70">
            School / institution
            <input value={p.school ?? ""} onChange={(e) => setP({ ...p, school: e.target.value })} className={field} />
          </label>
          <label className="text-sm font-semibold text-ink/70">
            City
            <input value={p.city ?? ""} onChange={(e) => setP({ ...p, city: e.target.value })} className={field} />
          </label>
          <label className="text-sm font-semibold text-ink/70">
            State
            <select value={p.state} onChange={(e) => setP({ ...p, state: e.target.value })} className={field}>
              <option value="">—</option>
              {stateOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-ink/70">
            Goal
            <input value={p.goal ?? ""} onChange={(e) => setP({ ...p, goal: e.target.value })} className={field} />
          </label>
          {(
            [
              ["Interests", "interests", interestOptions],
              ["Career interests", "careerInterests", careerInterestOptions],
              ["Skills", "skills", skillOptions],
              ["Languages", "languages", languageOptions],
            ] as const
          ).map(([label, key, opts]) => (
            <div key={key} className="sm:col-span-2">
              <p className="mb-1.5 text-sm font-semibold text-ink/70">{label}</p>
              <ChipPicker options={opts} value={p[key]} onChange={(v) => setP({ ...p, [key]: v })} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 border-t border-brand-50 p-6">
          <button
            onClick={async () => {
              try {
                await postJson("/api/auth/profile", { profile: p }, "PATCH");
                setMsg("Saved ✓");
                onSaved();
              } catch (e) {
                setMsg(e instanceof Error ? e.message : "Could not save");
              }
            }}
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-bold text-white"
          >
            Save profile
          </button>
          {msg && <span className="text-sm font-semibold text-brand-700">{msg}</span>}
        </div>
      </div>
    </div>
  );
}

export function ConnectApp() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const view = (sp.get("view") as View) || (sp.get("c") ? "communities" : "home");
  const channelId = sp.get("c");
  const dm = sp.get("dm");
  const focus = sp.get("focus") ?? undefined;

  const [state, setState] = useState<ConnectState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/connect/state");
    const data = await res.json();
    if (!res.ok) setError(data.error ?? "Could not load Connect");
    else setState(data);
  }, []);
  useEffect(() => {
    let live = true;
    const tick = () => live && load();
    tick();
    const t = setInterval(tick, 20000);
    return () => {
      live = false;
      clearInterval(t);
    };
  }, [load]);

  const go = (params: Record<string, string | undefined>) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) q.set(k, v);
    router.push(`${pathname}${q.size ? `?${q}` : ""}`, { scroll: false });
  };
  const openCommunity = (id: string) => go({ c: id });
  const points = (cp: number) => {
    setToast(`+${cp} Career Points`);
    setTimeout(() => setToast(null), 2500);
  };

  if (error) return <p className="p-10 text-center text-ink/60">{error}</p>;
  if (!state) return <p className="p-10 text-center text-ink/50">Loading Career Garage Connect…</p>;

  const me = state.me;
  const community = channelId ? state.communities.find((c) => c.id === channelId) : undefined;
  const dmThread = dm ? state.connections.find((c) => c.channel === dm) : undefined;
  const requests = state.incoming.length;

  let main: React.ReactNode;
  if (channelId && community?.isMember) {
    main = (
      <Chat
        key={channelId}
        channel={`c:${channelId}`}
        title={community.name}
        subtitle={`${community.memberCount} members · ${community.category}`}
        community
        onPoints={points}
        header={
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">About</summary>
            <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-brand-100 bg-white p-4 shadow-xl">
              <p className="text-sm text-ink/70">{community.description}</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-ink/40">Who it&apos;s for</p>
              <div className="mt-1.5">
                <CombinationChips c={community.combination} />
              </div>
              {!community.isOwner && (
                <button
                  onClick={async () => {
                    if (!confirm(`Leave ${community.name}?`)) return;
                    await postJson(`/api/connect/communities/${community.id}`, { action: "leave" });
                    await load();
                    go({ view: "communities" });
                  }}
                  className="mt-4 text-xs font-semibold text-accent-600"
                >
                  Leave community
                </button>
              )}
            </div>
          </details>
        }
      />
    );
  } else if (view === "communities" || channelId) {
    main = <CommunitiesView communities={state.communities} onChanged={load} onOpen={openCommunity} onCreate={() => go({ view: "create" })} focus={focus ?? channelId ?? undefined} />;
  } else if (view === "create") {
    main = (
      <CreateCommunity
        onCreated={async (id) => {
          await load();
          openCommunity(id);
        }}
        onCancel={() => go({ view: "communities" })}
      />
    );
  } else if (view === "people") {
    main = <PeopleView me={me} />;
  } else if (view === "experts") {
    main = <PeopleView me={me} experts />;
  } else if (view === "messages") {
    main = (
      <div className="grid h-full min-h-0 md:grid-cols-[18rem_1fr]">
        <div className={`min-h-0 overflow-y-auto border-r border-brand-100 bg-white ${dmThread ? "hidden md:block" : ""}`}>
          <p className="px-5 pb-2 pt-5 text-lg font-extrabold text-ink">Messages</p>
          {state.connections.length === 0 && (
            <p className="px-5 text-sm text-ink/50">
              No conversations yet. Connect with people — a chat opens once they accept.
            </p>
          )}
          {state.connections.map((c) => (
            <button key={c.channel} onClick={() => go({ view: "messages", dm: c.channel })} className={`flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-brand-50 ${c.channel === dm ? "bg-brand-50" : ""}`}>
              <Avatar name={c.member.name} color={c.member.color} verified={c.member.verified} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-ink">{c.member.name}</span>
                <span className="block truncate text-xs text-ink/50">{c.last ? `${c.last.mine ? "You: " : ""}${c.last.text}` : roleNames[c.member.role]}</span>
              </span>
              {c.last && <span className="text-[10px] text-ink/40">{timeAgo(c.last.at)}</span>}
            </button>
          ))}
        </div>
        {dmThread ? (
          <Chat key={dm} channel={dmThread.channel} title={dmThread.member.name} subtitle={`${roleNames[dmThread.member.role]}${dmThread.member.verified ? " · Verified" : ""}`} community={false} />
        ) : (
          <div className="hidden items-center justify-center text-sm text-ink/45 md:flex">Choose a conversation</div>
        )}
      </div>
    );
  } else if (view === "events") {
    main = (
      <div className="h-full overflow-y-auto p-5 sm:p-7">
        <h1 className="text-2xl font-extrabold text-ink">Upcoming events</h1>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {state.events.map((e) => (
            <div key={e.id} className="hover-lift flex gap-4 rounded-3xl border border-brand-100 bg-white p-5 shadow-sm">
              <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-white">
                <span className="text-2xl font-extrabold leading-none">{new Date(e.date).getDate()}</span>
                <span className="text-[10px] font-bold uppercase">{new Date(e.date).toLocaleString("en-IN", { month: "short" })}</span>
              </span>
              <div>
                <span className="rounded bg-brand-50 px-1.5 text-[10px] font-bold text-brand-700">{e.tag}</span>
                <p className="mt-1 font-bold text-ink">{e.title}</p>
                <p className="text-xs text-ink/55">
                  {e.host} · {e.mode} · {new Date(e.date).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink/45">Registration opens with the events programme.</p>
      </div>
    );
  } else if (view === "requests") {
    main = (
      <div className="h-full overflow-y-auto p-5 sm:p-7">
        <h1 className="text-2xl font-extrabold text-ink">Requests</h1>
        <p className="mt-1 text-sm text-ink/60">Connection requests and requests to join communities you run.</p>
        <ul className="mt-5 space-y-3">
          {state.incoming.length === 0 && <li className="text-sm text-ink/50">No pending requests.</li>}
          {state.incoming.map((r) => (
            <li key={r.id} className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-white p-4">
              {r.from && <Avatar name={r.from.name} color={r.from.color} verified={r.from.verified} />}
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-bold text-ink">{r.from?.name}</span>{" "}
                  <span className="text-ink/60">{r.kind === "join" ? `wants to join ${r.community}` : `(${roleNames[r.from?.role ?? ""]}) wants to connect`}</span>
                </p>
                {r.from && <p className="text-xs text-ink/45">{[r.from.profile.className ?? r.from.profile.headline, r.from.profile.school].filter(Boolean).join(" · ")}</p>}
                {r.note && <p className="mt-1 text-sm italic text-ink/70">“{r.note}”</p>}
                <div className="mt-3 flex gap-2">
                  {(["accept", "decline"] as const).map((a) => (
                    <button
                      key={a}
                      onClick={async () => {
                        await postJson(`/api/connect/requests/${r.id}`, { action: a });
                        load();
                      }}
                      className={a === "accept" ? "rounded-full bg-brand-600 px-4 py-1.5 text-xs font-bold text-white" : "rounded-full border border-brand-200 px-4 py-1.5 text-xs font-semibold text-ink/60"}
                    >
                      {a === "accept" ? "Accept" : "Decline"}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (view === "profile") {
    main = <ProfileEditor me={me} onSaved={load} />;
  } else {
    const mine = state.communities.filter((c) => c.isMember);
    const suggested = state.communities.filter((c) => !c.isMember && c.fit).slice(0, 4);
    main = (
      <div className="h-full overflow-y-auto p-5 sm:p-7">
        <h1 className="text-2xl font-extrabold text-ink">Connect. Collaborate. Learn together.</h1>
        <p className="mt-1 text-sm text-ink/60">A moderated network of students, teachers, professors, counsellors and professionals.</p>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Feed onOpen={openCommunity} />
          <div className="space-y-6">
            <section className="rounded-3xl border border-brand-100 bg-white p-5 shadow-sm">
              <h2 className="font-extrabold text-ink">My communities</h2>
              <ul className="mt-3 space-y-1">
                {mine.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => openCommunity(c.id)} className="flex w-full justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-brand-50">
                      <span className="truncate font-semibold text-ink"># {c.name}</span>
                      <span className="text-xs text-ink/45">{c.memberCount}</span>
                    </button>
                  </li>
                ))}
                {mine.length === 0 && <li className="text-sm text-ink/50">Join a community to see it here.</li>}
              </ul>
            </section>
            {suggested.length > 0 && (
              <section className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-5">
                <h2 className="font-extrabold text-ink">Communities that fit you</h2>
                <ul className="mt-3 space-y-2">
                  {suggested.map((c) => (
                    <li key={c.id}>
                      <button onClick={() => go({ view: "communities", focus: c.id })} className="block w-full rounded-xl bg-white px-3 py-2 text-left text-sm hover:shadow">
                        <span className="font-semibold text-ink">{c.name}</span>
                        <span className="block text-xs text-ink/50">{c.memberCount} members · {c.joinMode === "open" ? "open" : "request to join"}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section className="rounded-3xl border border-brand-100 bg-white p-5 shadow-sm">
              <h2 className="font-extrabold text-ink">Next event</h2>
              <p className="mt-2 font-semibold text-ink">{state.events[0]?.title}</p>
              <p className="text-xs text-ink/50">{state.events[0] && new Date(state.events[0].date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  const activeNav: View = channelId ? "communities" : view === "create" ? "communities" : view;

  return (
    <div className="flex h-[calc(100dvh-4rem)] min-h-[32rem] bg-brand-50/40">
      {/* sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-[#14234a] text-white lg:flex">
        <Link href="/connect" className="flex items-center gap-2.5 px-6 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-amber-400 text-lg font-extrabold">G</span>
          <span className="leading-tight">
            <span className="block text-sm font-extrabold tracking-wide">CAREER GARAGE</span>
            <span className="block text-xs italic text-amber-300">Connect</span>
          </span>
        </Link>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => go({ view: n.id === "home" ? undefined : n.id })}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${activeNav === n.id ? "bg-indigo-500 text-white" : "text-white/75 hover:bg-white/10"}`}
            >
              <span className="w-5 text-center">{n.icon}</span>
              {n.label}
              {n.id === "requests" && requests > 0 && <span className="ml-auto rounded-full bg-accent-500 px-2 text-[11px]">{requests}</span>}
            </button>
          ))}
          <p className="px-3 pb-1 pt-5 text-[10px] font-bold uppercase tracking-wider text-white/40">My communities</p>
          {state.communities.filter((c) => c.isMember).map((c) => (
            <button key={c.id} onClick={() => openCommunity(c.id)} className={`block w-full truncate rounded-lg px-3 py-1.5 text-left text-sm ${channelId === c.id ? "bg-white/15 text-white" : "text-white/65 hover:bg-white/10"}`}>
              # {c.name}
            </button>
          ))}
        </nav>
        <Link href="/dashboard" className="m-3 flex items-center gap-3 rounded-2xl bg-white/10 p-3 hover:bg-white/15">
          <Avatar name={me.name} color={me.color} verified={me.verified} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold">{me.name}</span>
            <span className="text-xs text-white/60">View dashboard</span>
          </span>
        </Link>
      </aside>

      <main className="relative flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        <div className="min-h-0 flex-1">{main}</div>
        {/* mobile tab bar */}
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-brand-100 bg-white lg:hidden">
          {(["home", "communities", "messages", "people", "requests"] as View[]).map((id) => {
            const n = nav.find((x) => x.id === id)!;
            return (
              <button key={id} onClick={() => go({ view: id === "home" ? undefined : id })} className={`py-2 text-center text-[11px] font-semibold ${activeNav === id ? "text-indigo-600" : "text-ink/55"}`}>
                <span className="block text-lg">{n.icon}</span>
                {n.label.split(" ")[0]}
                {id === "requests" && requests > 0 && ` (${requests})`}
              </button>
            );
          })}
        </nav>
      </main>

      {toast && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 animate-pop-in rounded-full bg-amber-400 px-5 py-2.5 text-sm font-extrabold text-amber-950 shadow-xl lg:bottom-8">
          🎉 {toast}
        </div>
      )}
    </div>
  );
}
