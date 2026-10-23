import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson, requireMember } from "@/lib/api-helpers";
import { cleanText } from "@/lib/members";
import { cols, connectionIds, contactAllowed } from "@/lib/connect/store";

/**
 * POST /api/connect/requests  { toId, note }
 * A connect ("friend") request. Private messages open only after the other
 * person accepts. Requests to professionals carry a purpose note.
 */
export async function POST(request: Request) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const body = await readJson(request);
  const toId = typeof body?.toId === "string" && ObjectId.isValid(body.toId) ? body.toId : null;
  if (!toId) return fail("Unknown member", 404);
  const { members, requests } = await cols();
  const to = await members.findOne({ _id: new ObjectId(toId) });
  if (!to) return fail("Unknown member", 404);

  const reason = contactAllowed(me, to);
  if (reason) return fail(reason, 403);
  const note = cleanText(body?.note, 240);
  if (me.role === "student" && to.role !== "student" && !note) {
    return fail("Add a short purpose so the expert knows how they can help.");
  }

  const mid = me._id.toString();
  if ((await connectionIds(mid)).includes(toId)) return NextResponse.json({ ok: true, status: "connected" });
  const open = await requests.findOne({
    kind: "connect",
    status: "pending",
    $or: [{ fromId: mid, toId }, { fromId: toId, toId: mid }],
  });
  if (open) return NextResponse.json({ ok: true, status: "pending" });

  await requests.insertOne({ _id: new ObjectId(), kind: "connect", fromId: mid, toId, note, status: "pending", createdAt: new Date() });
  return NextResponse.json({ ok: true, status: "pending" });
}
