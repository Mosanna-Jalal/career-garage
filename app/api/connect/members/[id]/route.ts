import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson, requireMember } from "@/lib/api-helpers";
import { cleanText, membersCol } from "@/lib/members";
import { cols } from "@/lib/connect/store";

/**
 * POST /api/connect/members/[id]  { action: "block" | "unblock" | "report", reason? }
 * Blocking removes the person from your conversations and stops their requests.
 */
export async function POST(request: Request, ctx: RouteContext<"/api/connect/members/[id]">) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id) || id === me._id.toString()) return fail("Unknown member", 404);
  const body = await readJson(request);
  const col = await membersCol();
  if (body?.action === "block") {
    await col.updateOne({ _id: me._id }, { $addToSet: { blocked: id } });
    const { requests } = await cols();
    await requests.updateMany(
      { status: "pending", $or: [{ fromId: id, toId: me._id.toString() }, { fromId: me._id.toString(), toId: id }] },
      { $set: { status: "declined", decidedAt: new Date() } }
    );
    return NextResponse.json({ ok: true });
  }
  if (body?.action === "unblock") {
    await col.updateOne({ _id: me._id }, { $pull: { blocked: id } });
    return NextResponse.json({ ok: true });
  }
  if (body?.action === "report") {
    const { reports } = await cols();
    await reports.insertOne({ reporterId: me._id.toString(), memberId: id, reason: cleanText(body.reason, 200) ?? "Reported", createdAt: new Date() });
    return NextResponse.json({ ok: true });
  }
  return fail("Unknown action.");
}
