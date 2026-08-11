"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, CloseIcon } from "@/components/icons";
import {
  CATEGORY_META,
  FEEDBACK_STATUSES,
  STATUS_META,
  type FeedbackRecord,
  type FeedbackStatus,
} from "@/lib/feedback";

type Filter = FeedbackStatus | "all";

export function FeedbackBoard() {
  const [items, setItems] = useState<FeedbackRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not load feedback");
      setItems(data.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load feedback");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: string, status: FeedbackStatus) {
    setBusyId(id);
    // optimistic — the queue should feel instant to triage
    const previous = items;
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, status } : i)));
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setItems(previous);
      setError("Could not update that item — reverted.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    setBusyId(id);
    const previous = items;
    setItems((cur) => cur.filter((i) => i.id !== id));
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setItems(previous);
      setError("Could not delete that item — restored.");
    } finally {
      setBusyId(null);
    }
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const s of FEEDBACK_STATUSES) {
      c[s] = items.filter((i) => i.status === s).length;
    }
    return c;
  }, [items]);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter]
  );

  // Group by page so related comments read together.
  const grouped = useMemo(() => {
    const map = new Map<string, FeedbackRecord[]>();
    for (const item of visible) {
      const list = map.get(item.pathname) ?? [];
      list.push(item);
      map.set(item.pathname, list);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [visible]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">
            Feedback queue
          </h1>
          <p className="mt-1.5 text-sm text-ink/60">
            Comments pinned by reviewers, grouped by page.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Refresh
          </button>
          <button
            onClick={async () => {
              await fetch("/api/admin/login", { method: "DELETE" });
              window.location.reload();
            }}
            className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-ink/60 hover:bg-brand-50"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* filters */}
      <div className="mt-7 flex flex-wrap gap-2">
        {(["all", ...FEEDBACK_STATUSES] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === f
                ? "bg-brand-600 text-white"
                : "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
            }`}
          >
            {f === "all" ? "All" : STATUS_META[f].label}
            <span className="ml-2 opacity-60">{counts[f] ?? 0}</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-10 text-sm text-ink/50">Loading…</p>
      ) : visible.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-brand-200 bg-cream/50 p-10 text-center">
          <p className="text-sm text-ink/60">
            Nothing here yet. Use the Feedback button on any page to pin a
            comment.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map(([pathname, list]) => (
            <section key={pathname}>
              <div className="flex flex-wrap items-center gap-3 border-b border-brand-100 pb-2">
                <h2 className="font-mono text-sm font-bold text-ink">
                  {pathname}
                </h2>
                <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold text-ink/50">
                  {list.length}
                </span>
                <Link
                  href={pathname}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                >
                  Open page <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>

              <ul className="mt-4 space-y-4">
                {list.map((item) => (
                  <li
                    key={item.id}
                    className={`rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition ${
                      busyId === item.id ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-start gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
                          STATUS_META[item.status].chip
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            STATUS_META[item.status].dot
                          }`}
                        />
                        {STATUS_META[item.status].label}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          CATEGORY_META[item.category]?.chip ?? "bg-cream"
                        }`}
                      >
                        {CATEGORY_META[item.category]?.label ?? item.category}
                      </span>
                      <button
                        onClick={() => remove(item.id)}
                        aria-label="Delete feedback"
                        className="ml-auto rounded-lg p-1 text-ink/30 hover:bg-red-50 hover:text-red-600"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink/85">
                      {item.message}
                    </p>

                    <dl className="mt-4 grid gap-x-6 gap-y-1.5 text-xs text-ink/55 sm:grid-cols-2">
                      {item.section && (
                        <div className="sm:col-span-2">
                          <dt className="inline font-semibold">Section: </dt>
                          <dd className="inline">{item.section}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="inline font-semibold">Position: </dt>
                        <dd className="inline">
                          {item.x}×{item.y}px ({item.xPct}%, {item.yPct}%)
                        </dd>
                      </div>
                      <div>
                        <dt className="inline font-semibold">Viewport: </dt>
                        <dd className="inline">
                          {item.viewportW}×{item.viewportH}
                        </dd>
                      </div>
                      {item.elementPath && (
                        <div className="sm:col-span-2">
                          <dt className="inline font-semibold">Element: </dt>
                          <dd className="inline font-mono">
                            {item.elementPath}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="inline font-semibold">By: </dt>
                        <dd className="inline">{item.author || "Anonymous"}</dd>
                      </div>
                      <div>
                        <dt className="inline font-semibold">When: </dt>
                        <dd className="inline">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleString()
                            : "—"}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-brand-100 pt-4">
                      {FEEDBACK_STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(item.id, s)}
                          disabled={item.status === s}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                            item.status === s
                              ? "cursor-default bg-brand-600 text-white"
                              : "border border-brand-200 text-ink/70 hover:bg-brand-50"
                          }`}
                        >
                          {STATUS_META[s].label}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
