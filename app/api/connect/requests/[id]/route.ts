import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson, requireMember } from "@/lib/api-helpers";
import { cols } from "@/lib/connect/store";

/**
 * POST /api/connect/requests/[id]  { action: "accept" | "decline" }
 * Only the recipient (a member, or the community owner for join requests)
 * can decide.
 */
export async function POST(request: Request, ctx: RouteContext<"/api/connect/requests/[id]">) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) return fail("Unknown request", 404);
  const body = await readJson(request);
  const action = body?.action === "accept" ? "accepted" : body?.action === "decline" ? "declined" : null;
  if (!action) return fail("Choose accept or decline.");

  const { requests, communities } = await cols();
  const r = await requests.findOne({ _id: new ObjectId(id), status: "pending" });
  if (!r || r.toId !== me._id.toString()) return fail("Unknown request", 404);

  if (r.kind === "join" && action === "accepted" && r.communityId) {
    const c = await communities.findOne({ _id: new ObjectId(r.communityId) });
    if (!c || c.ownerId !== me._id.toString()) return fail("Only the owner can approve members.", 403);
    await communities.updateOne({ _id: c._id }, { $addToSet: { members: r.fromId } });
  }
  await requests.updateOne({ _id: r._id }, { $set: { status: action, decidedAt: new Date() } });
  return NextResponse.json({ ok: true, status: action });
}
