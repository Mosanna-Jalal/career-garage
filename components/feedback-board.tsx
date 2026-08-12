"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, CloseIcon, DownloadIcon } from "@/components/icons";
import {
  CATEGORY_META,
  FEEDBACK_STATUSES,
  STATUS_META,
  type FeedbackRecord,
  type FeedbackStatus,
} from "@/lib/feedback";

type Filter = FeedbackStatus | "all";

/** "Today" / "Yesterday" / "Tuesday, 12 August 2026" */
function dayLabel(key: string) {
  if (key === "Unknown date") return key;
  const d = new Date(key);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** YYYY-MM-DD, for filenames. */
function isoDay(key: string) {
  const d = new Date(key);
  if (Number.isNaN(d.getTime())) return "unknown-date";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Render a day's comments as Markdown, grouped by page.
 * Written to be handed straight to a developer: every item carries the page,
 * the section, the exact element that was clicked, and the position.
 */
function toMarkdown(dayKey: string, list: FeedbackRecord[]) {
  const byPath = new Map<string, FeedbackRecord[]>();
  for (const i of list) {
    const arr = byPath.get(i.pathname) ?? [];
    arr.push(i);
    byPath.set(i.pathname, arr);
  }

  const counts = FEEDBACK_STATUSES.map((s) => {
    const n = list.filter((i) => i.status === s).length;
    return n ? `${n} ${STATUS_META[s].label.toLowerCase()}` : null;
  })
    .filter(Boolean)
    .join(" · ");

  const lines: string[] = [
    `# Career Garage — feedback for ${dayLabel(dayKey)}`,
    "",
    `**${dayKey}** · ${list.length} comment${list.length > 1 ? "s" : ""}${
      counts ? ` · ${counts}` : ""
    }`,
    "",
    `Exported ${new Date().toLocaleString()}`,
    "",
    "---",
    "",
  ];

  for (const [pathname, items] of Array.from(byPath.entries()).sort(
    (a, b) => b[1].length - a[1].length
  )) {
    lines.push(`## ${pathname}  (${items.length})`, "");

    items.forEach((i, n) => {
      const time = i.createdAt
        ? new Date(i.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "—";

      lines.push(`### ${n + 1}. ${i.message}`, "");
      lines.push(`- **Status:** ${STATUS_META[i.status].label}`);
      lines.push(
        `- **Category:** ${CATEGORY_META[i.category]?.label ?? i.category}`
      );
      if (i.section) lines.push(`- **Section:** ${i.section}`);
      if (i.elementText)
        lines.push(
          `- **Clicked on:** "${i.elementText.replace(/\s+/g, " ").slice(0, 160)}"`
        );
      if (i.elementPath) lines.push(`- **Element:** \`${i.elementPath}\``);
      lines.push(
        `- **Position:** ${i.x}×${i.y}px (${i.xPct}%, ${i.yPct}%) · viewport ${i.viewportW}×${i.viewportH}`
      );
      lines.push(`- **By:** ${i.author || "Anonymous"} at ${time}`);
      lines.push("");
    });
  }

  return lines.join("\n");
}

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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

  // One card per day, newest first.
  const byDay = useMemo(() => {
    const map = new Map<string, FeedbackRecord[]>();
    for (const item of visible) {
      const d = item.createdAt ? new Date(item.createdAt) : null;
      const key =
        d && !Number.isNaN(d.getTime()) ? d.toDateString() : "Unknown date";
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return Array.from(map.entries()).sort((a, b) => {
      const ta = a[0] === "Unknown date" ? 0 : new Date(a[0]).getTime();
      const tb = b[0] === "Unknown date" ? 0 : new Date(b[0]).getTime();
      return tb - ta;
    });
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
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (!items.length) return;
              const all = byDay
                .map(([day, list]) => toMarkdown(day, list))
                .join("\n\n---\n\n");
              downloadFile("career-garage-feedback-all.md", all);
            }}
            disabled={!items.length}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-40"
          >
            <DownloadIcon className="h-4 w-4" />
            Download all
          </button>
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
        <div className="mt-8 space-y-8">
          {byDay.map(([dayKey, list]) => (
            <section
              key={dayKey}
              className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm"
            >
              {/* one card header per day */}
              <div className="flex flex-wrap items-center gap-3 border-b border-brand-100 bg-cream/60 px-6 py-4">
                <h2 className="text-lg font-extrabold tracking-tight text-ink">
                  {dayLabel(dayKey)}
                </h2>
                <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
                  {list.length} comment{list.length > 1 ? "s" : ""}
                </span>

                <div className="ml-auto flex flex-wrap items-center gap-1.5">
                  {FEEDBACK_STATUSES.map((s) => {
                    const n = list.filter((i) => i.status === s).length;
                    if (!n) return null;
                    return (
                      <span
                        key={s}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_META[s].chip}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${STATUS_META[s].dot}`}
                        />
                        {n} {STATUS_META[s].label.toLowerCase()}
                      </span>
                    );
                  })}

                  <button
                    onClick={() =>
                      downloadFile(
                        `career-garage-feedback-${isoDay(dayKey)}.md`,
                        toMarkdown(dayKey, list)
                      )
                    }
                    title="Download this day's feedback as Markdown"
                    className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-brand-700"
                  >
                    <DownloadIcon className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>

              <ul className="divide-y divide-brand-100">
                {list.map((item) => (
                  <li
                    key={item.id}
                    className={`p-6 transition ${
                      busyId === item.id ? "opacity-50" : ""
                    }`}
                  >
                    {/* which page this comment belongs to */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Link
                        href={item.pathname}
                        className="inline-flex items-center gap-1 font-mono text-xs font-bold text-brand-700 hover:underline"
                      >
                        {item.pathname}
                        <ArrowRightIcon className="h-3 w-3" />
                      </Link>
                      <span className="text-xs text-ink/40">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>

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
