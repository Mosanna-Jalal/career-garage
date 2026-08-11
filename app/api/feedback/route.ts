import { NextResponse } from "next/server";
import type { Document, Filter } from "mongodb";
import { getDb } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import {
  FEEDBACK_STATUSES,
  parseFeedbackInput,
  type FeedbackRecord,
  type FeedbackStatus,
} from "@/lib/feedback";

/**
 * POST /api/feedback — submit a pinned comment. Open by design: the whole
 * point is that a reviewer can leave a note without logging in.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const input = parseFeedbackInput(raw);
  if (!input) {
    return NextResponse.json(
      { error: "A message and a pinned location are required." },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    const res = await db.collection("feedback").insertOne({
      ...input,
      status: "pending" satisfies FeedbackStatus,
      createdAt: new Date(),
    });
    return NextResponse.json({ ok: true, id: res.insertedId.toString() });
  } catch (err) {
    console.error("Failed to save feedback:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

/**
 * GET /api/feedback — the review queue. Admin only.
 * Optional filters: ?status=pending &path=/for/class-1-7
 */
export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const path = searchParams.get("path");

  const query: Filter<Document> = {};
  if (status && FEEDBACK_STATUSES.includes(status as FeedbackStatus)) {
    query.status = status;
  }
  if (path) query.pathname = path;

  try {
    const db = await getDb();
    const docs = await db
      .collection("feedback")
      .find(query)
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();

    const items: FeedbackRecord[] = docs.map((d) => ({
      id: d._id.toString(),
      pathname: d.pathname,
      search: d.search,
      section: d.section,
      elementPath: d.elementPath,
      elementText: d.elementText,
      x: d.x,
      y: d.y,
      xPct: d.xPct,
      yPct: d.yPct,
      viewportW: d.viewportW,
      viewportH: d.viewportH,
      category: d.category,
      message: d.message,
      author: d.author,
      status: d.status,
      adminNote: d.adminNote,
      createdAt: (d.createdAt as Date)?.toISOString?.() ?? "",
      updatedAt: (d.updatedAt as Date)?.toISOString?.(),
    }));

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Failed to read feedback:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
