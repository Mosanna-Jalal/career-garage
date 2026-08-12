"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChatIcon, CheckIcon, CloseIcon, SparkIcon } from "@/components/icons";
import {
  CATEGORY_META,
  FEEDBACK_CATEGORIES,
  type FeedbackCategory,
  type FeedbackInput,
} from "@/lib/feedback";

type Pin = Pick<
  FeedbackInput,
  | "x"
  | "y"
  | "xPct"
  | "yPct"
  | "viewportW"
  | "viewportH"
  | "section"
  | "elementPath"
  | "elementText"
>;

/** Nearest meaningful heading above/around the clicked element. */
function describeSection(el: Element | null): string {
  if (!el) return "";

  // 1. explicit marker wins
  const marked = el.closest("[data-section]");
  const label = marked?.getAttribute("data-section");
  if (label) return label.slice(0, 200);

  // 2. nearest landmark ancestor that contains a heading
  let node: Element | null = el;
  while (node && node !== document.body) {
    if (node.matches("section, article, header, footer, nav, main, aside")) {
      const h = node.querySelector("h1, h2, h3");
      const text = h?.textContent?.trim();
      if (text) return text.slice(0, 200);
    }
    node = node.parentElement;
  }

  // 3. last heading that appears above the click
  const rect = el.getBoundingClientRect();
  const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
  let best = "";
  for (const h of headings) {
    if (h.getBoundingClientRect().top <= rect.top + 4) {
      best = h.textContent?.trim() ?? best;
    }
  }
  return best.slice(0, 200);
}

/** Compact DOM path so a developer can find the exact element again. */
function describePath(el: Element | null): string {
  if (!el) return "";
  const parts: string[] = [];
  let node: Element | null = el;
  let depth = 0;
  while (node && node !== document.body && depth < 4) {
    let part = node.tagName.toLowerCase();
    if (node.id) {
      part += `#${node.id}`;
      parts.unshift(part);
      break;
    }
    const cls = Array.from(node.classList)
      // skip utility noise; keep something human-recognisable
      .filter((c) => !/^(hover|focus|sm|md|lg|xl|dark):/.test(c))
      .slice(0, 2)
      .join(".");
    if (cls) part += `.${cls}`;
    parts.unshift(part);
    node = node.parentElement;
    depth++;
  }
  return parts.join(" > ").slice(0, 400);
}

export function FeedbackWidget() {
  const pathname = usePathname();
  const [picking, setPicking] = useState(false);
  const [pin, setPin] = useState<Pin | null>(null);
  const [category, setCategory] = useState<FeedbackCategory>("content");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Remember who is reviewing, so they don't retype it every time.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cg_feedback_author");
      if (saved) setAuthor(saved);
    } catch {
      /* storage unavailable — not important */
    }
  }, []);

  const cancelPicking = useCallback(() => {
    setPicking(false);
    document.documentElement.classList.remove("cg-picking");
  }, []);

  const startPicking = useCallback(() => {
    setSent(false);
    setError(null);
    setPin(null);
    setPicking(true);
    document.documentElement.classList.add("cg-picking");
  }, []);

  // Capture-phase click so we intercept before links navigate.
  useEffect(() => {
    if (!picking) return;

    function onClick(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();

      const target = e.target as Element | null;
      const docW = document.documentElement.scrollWidth || 1;
      const docH = document.documentElement.scrollHeight || 1;

      setPin({
        x: Math.round(e.pageX),
        y: Math.round(e.pageY),
        xPct: Math.round((e.pageX / docW) * 10000) / 100,
        yPct: Math.round((e.pageY / docH) * 10000) / 100,
        viewportW: window.innerWidth,
        viewportH: window.innerHeight,
        section: describeSection(target),
        elementPath: describePath(target),
        elementText: (target?.textContent ?? "").trim().slice(0, 300),
      });
      cancelPicking();
      setTimeout(() => textareaRef.current?.focus(), 60);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") cancelPicking();
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [picking, cancelPicking]);

  // Clean up the crosshair if the component unmounts mid-pick.
  useEffect(
    () => () => document.documentElement.classList.remove("cg-picking"),
    []
  );

  async function submit() {
    if (!pin || !message.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pin,
          pathname,
          search: window.location.search,
          category,
          message: message.trim(),
          author: author.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not save");
      try {
        if (author.trim())
          localStorage.setItem("cg_feedback_author", author.trim());
      } catch {
        /* ignore */
      }
      setSent(true);
      setMessage("");
      setPin(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  const open = Boolean(pin) || sent;

  return (
    <>
      {/* ---------- picking overlay ---------- */}
      {picking && (
        <div className="pointer-events-none fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-brand-950/10" />
          <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-brand-950 px-5 py-2.5 text-sm font-semibold text-white shadow-2xl">
            Click anywhere to pin your comment
            <span className="ml-2 rounded bg-white/15 px-2 py-0.5 text-xs">
              Esc to cancel
            </span>
          </div>
        </div>
      )}

      {/* ---------- composer ---------- */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[101] w-[min(92vw,26rem)] animate-pop-in rounded-3xl border border-brand-100 bg-white shadow-2xl shadow-brand-900/20">
          <div className="flex items-start justify-between gap-3 border-b border-brand-100 p-5">
            <div>
              <p className="text-sm font-bold text-ink">
                {sent ? "Thanks — noted" : "Leave feedback"}
              </p>
              {!sent && pin && (
                <p className="mt-0.5 text-xs text-ink/55">
                  {pathname}
                  {pin.section ? ` · ${pin.section}` : ""}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setPin(null);
                setSent(false);
                setError(null);
              }}
              aria-label="Close feedback"
              className="rounded-lg p-1.5 text-ink/50 hover:bg-brand-50 hover:text-ink"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {sent ? (
            <div className="p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckIcon className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm text-ink/70">
                Your comment was saved with its exact location on this page.
              </p>
              <button
                onClick={startPicking}
                className="mt-5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Pin another
              </button>
            </div>
          ) : (
            <div className="space-y-4 p-5">
              {pin?.elementText && (
                <p className="rounded-xl bg-cream px-3 py-2 text-xs italic text-ink/55">
                  “{pin.elementText.slice(0, 90)}
                  {pin.elementText.length > 90 ? "…" : ""}”
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {FEEDBACK_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      category === c
                        ? "bg-brand-600 text-white"
                        : "border border-brand-200 text-ink/70 hover:bg-brand-50"
                    }`}
                  >
                    {CATEGORY_META[c].label}
                  </button>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="What should change here?"
                className="w-full rounded-xl border border-brand-100 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />

              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full rounded-xl border border-brand-100 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />

              {error && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  {error}
                </p>
              )}

              <button
                onClick={submit}
                disabled={sending || !message.trim()}
                className="w-full rounded-full bg-accent-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? "Saving…" : "Send feedback"}
              </button>
            </div>
          )}

          <div className="border-t border-brand-100 px-5 py-3">
            <a
              href="/admin/feedback"
              className="text-xs font-semibold text-ink/45 transition hover:text-brand-600"
            >
              Open the feedback queue →
            </a>
          </div>
        </div>
      )}

      {/* ---------- sticky trigger ---------- */}
      <button
        onClick={picking ? cancelPicking : startPicking}
        aria-label={picking ? "Cancel pinning" : "Leave feedback on this page"}
        className={`fixed bottom-5 right-5 z-[101] flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold shadow-2xl transition hover:-translate-y-0.5 ${
          picking
            ? "bg-ink text-white"
            : "bg-brand-600 text-white shadow-brand-900/30 hover:bg-brand-700"
        }`}
      >
        {picking ? (
          <>
            <CloseIcon className="h-5 w-5" />
            Cancel
          </>
        ) : (
          <>
            <ChatIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Feedback</span>
            <SparkIcon className="h-3.5 w-3.5 text-accent-300" />
          </>
        )}
      </button>
    </>
  );
}
