import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson, requireMember } from "@/lib/api-helpers";
import { cleanText } from "@/lib/members";
import { cols } from "@/lib/connect/store";

/**
 * POST /api/connect/communities/[id]  { action: "join" | "leave", note? }
 * Open communities join instantly; request-only ones send a join request
 * to the owner, who approves it from their requests.
 */
export async function POST(request: Request, ctx: RouteContext<"/api/connect/communities/[id]">) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) return fail("Unknown community", 404);
  const body = await readJson(request);
  const { communities, requests } = await cols();
  const c = await communities.findOne({ _id: new ObjectId(id) });
  if (!c) return fail("Unknown community", 404);
  const mid = me._id.toString();

  if (body?.action === "leave") {
    if (c.ownerId === mid) return fail("Owners can't leave their own community.");
    await communities.updateOne({ _id: c._id }, { $pull: { members: mid } });
    return NextResponse.json({ ok: true, status: "left" });
  }

  if (c.members.includes(mid)) return NextResponse.json({ ok: true, status: "member" });
  if (c.joinMode === "open") {
    await communities.updateOne({ _id: c._id }, { $addToSet: { members: mid } });
    return NextResponse.json({ ok: true, status: "member" });
  }
  const existing = await requests.findOne({ kind: "join", fromId: mid, communityId: id, status: "pending" });
  if (!existing) {
    await requests.insertOne({
      _id: new ObjectId(),
      kind: "join",
      fromId: mid,
      toId: c.ownerId,
      communityId: id,
      note: cleanText(body?.note, 200),
      status: "pending",
      createdAt: new Date(),
    });
  }
  return NextResponse.json({ ok: true, status: "requested" });
}
