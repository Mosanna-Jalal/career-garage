import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { FEEDBACK_STATUSES, type FeedbackStatus } from "@/lib/feedback";

/** PATCH /api/feedback/[id] — move an item through the queue. Admin only. */
export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/feedback/[id]">
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const body = (raw ?? {}) as Record<string, unknown>;
  const update: Record<string, unknown> = { updatedAt: new Date() };

  if (typeof body.status === "string") {
    if (!FEEDBACK_STATUSES.includes(body.status as FeedbackStatus)) {
      return NextResponse.json({ error: "Unknown status" }, { status: 400 });
    }
    update.status = body.status;
  }
  if (typeof body.adminNote === "string") {
    update.adminNote = body.adminNote.trim().slice(0, 2000);
  }

  if (Object.keys(update).length === 1) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const res = await db
      .collection("feedback")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (res.matchedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to update feedback:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

/** DELETE /api/feedback/[id] — remove a resolved or duplicate item. Admin only. */
export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/feedback/[id]">
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const res = await db
      .collection("feedback")
      .deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete feedback:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
