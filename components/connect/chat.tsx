"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, postJson, roleNames } from "@/components/connect/ui";
import { timeAgo, type Msg } from "@/components/connect/types";

/**
 * Message pane for a community channel (with Q&A) or a private conversation.
 * Polls every 5 s while open.
 */
export function Chat({
  channel,
  title,
  subtitle,
  community,
  header,
  onPoints,
}: {
  channel: string;
  title: string;
  subtitle?: string;
  community: boolean;
  header?: React.ReactNode;
  onPoints?: (cp: number) => void;
}) {
  const [msgs, setMsgs] = useState<Msg[] | null>(null);
  const [text, setText] = useState("");
  const [asQuestion, setAsQuestion] = useState(false);
  const [answering, setAnswering] = useState<Msg | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const lastCount = useRef(0);

  const load = useCallback(async () => {
    const res = await fetch(`/api/connect/messages?channel=${encodeURIComponent(channel)}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Could not load messages");
      setMsgs([]);
      return;
    }
    setMsgs(data.messages);
  }, [channel]);

  useEffect(() => {
    let live = true;
    const tick = () => live && load();
    tick();
    const t = setInterval(tick, 5000);
    return () => {
      live = false;
      clearInterval(t);
    };
  }, [load]);

  useEffect(() => {
    if (msgs && msgs.length !== lastCount.current) {
      lastCount.current = msgs.length;
      endRef.current?.scrollIntoView({ block: "end" });
    }
  }, [msgs]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    setError(null);
    try {
      const r = await postJson<{ points: number }>("/api/connect/messages", {
        channel,
        text,
        kind: answering ? "answer" : asQuestion ? "question" : "message",
        parentId: answering?.id,
      });
      if (r.points) onPoints?.(r.points);
      setText("");
      setAsQuestion(false);
      setAnswering(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setSending(false);
    }
  };

  const act = async (m: Msg, action: "helpful" | "accept" | "report") => {
    if (action === "report" && !confirm("Report this message to the moderators?")) return;
    try {
      await postJson(`/api/connect/messages/${m.id}`, { action });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update");
    }
  };

  const top = (msgs ?? []).filter((m) => m.kind !== "answer");
  const answersFor = (q: Msg) => (msgs ?? []).filter((m) => m.parentId === q.id);

  const bubble = (m: Msg, nested = false, question?: Msg) => (
    <div key={m.id} className={`group flex gap-3 ${m.mine && !community ? "flex-row-reverse text-right" : ""} ${nested ? "ml-10" : ""}`}>
      {m.from && <Avatar name={m.from.name} color={m.from.color} verified={m.from.verified} size="h-9 w-9 text-xs" />}
      <div className={`min-w-0 max-w-[85%] ${m.mine && !community ? "items-end" : ""}`}>
        <p className="text-xs text-ink/50">
          <span className="font-bold text-ink">{m.from?.name ?? "Member"}</span>
          {m.from && m.from.role !== "student" && <span className="ml-1 rounded bg-brand-50 px-1 text-[10px] font-bold text-brand-700">{roleNames[m.from.role]}</span>}
          <span className="ml-2">{timeAgo(m.at)}</span>
        </p>
        <div
          className={`mt-1 inline-block whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed ${
            m.kind === "question"
              ? "border-2 border-amber-200 bg-amber-50 text-ink"
              : m.accepted
                ? "border-2 border-emerald-300 bg-emerald-50 text-ink"
                : m.mine && !community
                  ? "bg-brand-600 text-white"
                  : "bg-white text-ink shadow-sm"
          }`}
        >
          {m.kind === "question" && <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-amber-700">Question</span>}
          {m.accepted && <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">✓ Accepted answer</span>}
          {m.text}
        </div>
        <div className="mt-1 flex flex-wrap gap-3 text-[11px] font-semibold text-ink/45">
          {community && !m.mine && (
            <button onClick={() => act(m, "helpful")} className={m.votedHelpful ? "text-brand-600" : "hover:text-brand-600"}>
              👍 Helpful{m.helpful ? ` · ${m.helpful}` : ""}
            </button>
          )}
          {community && m.mine && m.helpful > 0 && <span>👍 {m.helpful}</span>}
          {m.kind === "question" && (
            <button onClick={() => setAnswering(m)} className="hover:text-brand-600">
              ↳ Answer
            </button>
          )}
          {m.kind === "answer" && question?.mine && !m.mine && !m.accepted && (
            <button onClick={() => act(m, "accept")} className="hover:text-emerald-600">
              ✓ Accept answer
            </button>
          )}
          {!m.mine && (
            <button onClick={() => act(m, "report")} className="opacity-0 transition group-hover:opacity-100 hover:text-accent-600">
              Report
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-brand-100 bg-white px-5 py-3.5">
        <div className="min-w-0">
          <p className="truncate font-extrabold text-ink">{title}</p>
          {subtitle && <p className="truncate text-xs text-ink/50">{subtitle}</p>}
        </div>
        {header}
      </div>
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-brand-50/30 px-5 py-5">
        {msgs === null && <p className="text-sm text-ink/50">Loading…</p>}
        {msgs?.length === 0 && !error && <p className="text-center text-sm text-ink/50">No messages yet — say hello!</p>}
        {top.map((m) => (
          <div key={m.id} className="space-y-3">
            {bubble(m)}
            {m.kind === "question" && answersFor(m).map((a) => bubble(a, true, m))}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="border-t border-brand-100 bg-white p-3">
        {answering && (
          <p className="mb-2 flex items-center justify-between rounded-xl bg-amber-50 px-3 py-1.5 text-xs text-amber-900">
            <span className="truncate">Answering: {answering.text}</span>
            <button type="button" onClick={() => setAnswering(null)} className="ml-2 font-bold">
              ✕
            </button>
          </p>
        )}
        {error && <p className="mb-2 text-xs font-semibold text-accent-600">{error}</p>}
        <div className="flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                (e.currentTarget.form as HTMLFormElement).requestSubmit();
              }
            }}
            rows={1}
            maxLength={2000}
            placeholder={answering ? "Write your answer…" : community ? "Message the community…" : "Type a message…"}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400"
          />
          <button disabled={sending || !text.trim()} className="h-11 rounded-full bg-brand-600 px-5 text-sm font-bold text-white disabled:opacity-40">
            Send
          </button>
        </div>
        {community && !answering && (
          <label className="mt-2 flex items-center gap-2 text-xs text-ink/60">
            <input type="checkbox" checked={asQuestion} onChange={(e) => setAsQuestion(e.target.checked)} className="accent-amber-500" />
            Post as a question (others can answer; you can accept the best answer)
          </label>
        )}
      </form>
    </div>
  );
}
