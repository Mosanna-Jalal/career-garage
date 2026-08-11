/**
 * Review feedback pinned directly to a point on a page.
 *
 * The client clicks the floating button, then clicks the spot they want to
 * comment on. We record the URL, the coordinates, and the nearest meaningful
 * section so the comment can be located again later.
 */

export const FEEDBACK_STATUSES = ["pending", "in-progress", "done"] as const;
export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

export const FEEDBACK_CATEGORIES = [
  "content",
  "design",
  "bug",
  "idea",
] as const;
export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export type FeedbackInput = {
  pathname: string;
  search?: string;
  /** heading or landmark nearest the click */
  section?: string;
  /** short DOM path, for locating the exact element */
  elementPath?: string;
  /** text content of the clicked element, truncated */
  elementText?: string;
  /** click position relative to the whole document, in px */
  x: number;
  y: number;
  /** click position as a percentage of document width/height */
  xPct: number;
  yPct: number;
  viewportW: number;
  viewportH: number;
  category: FeedbackCategory;
  message: string;
  author?: string;
};

export type FeedbackRecord = FeedbackInput & {
  id: string;
  status: FeedbackStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
};

export const STATUS_META: Record<
  FeedbackStatus,
  { label: string; chip: string; dot: string }
> = {
  pending: {
    label: "Pending",
    chip: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  "in-progress": {
    label: "In progress",
    chip: "bg-sky-50 text-sky-800 border-sky-200",
    dot: "bg-sky-500",
  },
  done: {
    label: "Done",
    chip: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500",
  },
};

export const CATEGORY_META: Record<
  FeedbackCategory,
  { label: string; chip: string }
> = {
  content: { label: "Content / copy", chip: "bg-violet-50 text-violet-700" },
  design: { label: "Design / layout", chip: "bg-rose-50 text-rose-700" },
  bug: { label: "Bug", chip: "bg-red-50 text-red-700" },
  idea: { label: "Idea", chip: "bg-teal-50 text-teal-700" },
};

/** Server-side validation for anything arriving from the browser. */
export function parseFeedbackInput(raw: unknown): FeedbackInput | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : undefined;
  const num = (v: unknown) =>
    typeof v === "number" && Number.isFinite(v) ? v : undefined;

  const pathname = str(r.pathname, 300);
  const message = str(r.message, 4000);
  const x = num(r.x);
  const y = num(r.y);

  if (!pathname || !pathname.startsWith("/")) return null;
  if (!message) return null;
  if (x === undefined || y === undefined) return null;

  const category = FEEDBACK_CATEGORIES.includes(r.category as FeedbackCategory)
    ? (r.category as FeedbackCategory)
    : "content";

  const clampPct = (v: unknown) => Math.max(0, Math.min(100, num(v) ?? 0));

  return {
    pathname,
    search: str(r.search, 300),
    section: str(r.section, 200),
    elementPath: str(r.elementPath, 400),
    elementText: str(r.elementText, 300),
    x: Math.round(x),
    y: Math.round(y),
    xPct: Math.round(clampPct(r.xPct) * 100) / 100,
    yPct: Math.round(clampPct(r.yPct) * 100) / 100,
    viewportW: Math.round(num(r.viewportW) ?? 0),
    viewportH: Math.round(num(r.viewportH) ?? 0),
    category,
    message,
    author: str(r.author, 80),
  };
}
