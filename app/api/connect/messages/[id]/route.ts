import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson, requireMember } from "@/lib/api-helpers";
import { cleanText, membersCol } from "@/lib/members";
import { canUseChannel, cols } from "@/lib/connect/store";
import { awardPoints } from "@/lib/points-engine";

/**
 * POST /api/connect/messages/[id]  { action: "helpful" | "accept" | "report", reason? }
 * - helpful: one vote per member; the author earns CGC_HELPFUL
 * - accept: the question's author accepts an answer; its author earns CGC_ACCEPTED
 * - report: logged for moderators and hidden after three reports
 */
export async function POST(request: Request, ctx: RouteContext<"/api/connect/messages/[id]">) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) return fail("Unknown message", 404);
  const body = await readJson(request);
  const { messages, reports } = await cols();
  const msg = await messages.findOne({ _id: new ObjectId(id) });
  if (!msg || !(await canUseChannel(me, msg.channel))) return fail("Unknown message", 404);
  const mid = me._id.toString();
  const authorOf = async (memberId: string) =>
    ObjectId.isValid(memberId) ? (await membersCol()).findOne({ _id: new ObjectId(memberId) }) : null;

  if (body?.action === "helpful") {
    if (msg.fromId === mid) return fail("You can't vote on your own post.");
    const r = await messages.updateOne({ _id: msg._id, helpful: { $ne: mid } }, { $addToSet: { helpful: mid } });
    if (r.modifiedCount) {
      const author = await authorOf(msg.fromId);
      if (author) await awardPoints(author, "CGC_HELPFUL", { ref: msg._id.toString() });
    }
    return NextResponse.json({ ok: true });
  }

  if (body?.action === "accept") {
    if (msg.kind !== "answer" || !msg.parentId) return fail("Only answers can be accepted.");
    const q = await messages.findOne({ _id: new ObjectId(msg.parentId) });
    if (!q || q.fromId !== mid) return fail("Only the person who asked can accept an answer.", 403);
    if (msg.fromId === mid) return fail("You can't accept your own answer.");
    await messages.updateMany({ parentId: msg.parentId }, { $set: { accepted: false } });
    await messages.updateOne({ _id: msg._id }, { $set: { accepted: true } });
    const author = await authorOf(msg.fromId);
    if (author) await awardPoints(author, "CGC_ACCEPTED", { ref: msg._id.toString() });
    await awardPoints(me, "CGC_RESOLVE", { ref: q._id.toString() });
    return NextResponse.json({ ok: true });
  }

  if (body?.action === "report") {
    await reports.insertOne({ reporterId: mid, messageId: id, reason: cleanText(body.reason, 200) ?? "Reported", createdAt: new Date() });
    if ((await reports.countDocuments({ messageId: id })) >= 3) await messages.updateOne({ _id: msg._id }, { $set: { hidden: true } });
    return NextResponse.json({ ok: true });
  }
  return fail("Unknown action.");
}
