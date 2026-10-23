import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson, requireMember } from "@/lib/api-helpers";
import { toPublic } from "@/lib/members";
import { canUseChannel, cols } from "@/lib/connect/store";
import { awardPoints } from "@/lib/points-engine";

/** GET /api/connect/messages?channel=c:<id>|d:<a>:<b>&after=<iso> */
export async function GET(request: Request) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const sp = new URL(request.url).searchParams;
  const channel = sp.get("channel") ?? "";
  if (!(await canUseChannel(me, channel))) return fail("You don't have access to this conversation.", 403);

  const { messages, members } = await cols();
  const list = await messages.find({ channel, hidden: { $ne: true } }).sort({ createdAt: -1 }).limit(150).toArray();
  list.reverse();
  const ids = [...new Set(list.map((m) => m.fromId))].filter(ObjectId.isValid);
  const people = await members.find({ _id: { $in: ids.map((x) => new ObjectId(x)) } }).toArray();
  const byId = new Map(people.map((p) => [p._id.toString(), toPublic(p, me)]));
  const mid = me._id.toString();
  return NextResponse.json({
    messages: list.map((m) => ({
      id: m._id.toString(),
      from: byId.get(m.fromId) ?? null,
      mine: m.fromId === mid,
      text: m.text,
      kind: m.kind,
      parentId: m.parentId,
      helpful: m.helpful.length,
      votedHelpful: m.helpful.includes(mid),
      accepted: Boolean(m.accepted),
      at: m.createdAt,
    })),
  });
}

/**
 * POST /api/connect/messages  { channel, text, kind?: "message"|"question"|"answer", parentId? }
 * Community questions and answers earn Career Points (CGC_QUESTION,
 * CGC_ANSWER, or CGC_EXPERT for verified experts) within the handbook caps.
 */
export async function POST(request: Request) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const body = await readJson(request);
  const channel = typeof body?.channel === "string" ? body.channel : "";
  const text = typeof body?.text === "string" ? body.text.trim().slice(0, 2000) : "";
  if (!text) return fail("Write a message first.");
  if (!(await canUseChannel(me, channel))) return fail("You don't have access to this conversation.", 403);

  const community = channel.startsWith("c:");
  let kind: "message" | "question" | "answer" = "message";
  let parentId: string | undefined;
  const { messages } = await cols();
  if (community && body?.kind === "question") kind = "question";
  if (community && body?.kind === "answer" && typeof body.parentId === "string" && ObjectId.isValid(body.parentId)) {
    const q = await messages.findOne({ _id: new ObjectId(body.parentId), channel, kind: "question" });
    if (!q) return fail("That question no longer exists.");
    kind = "answer";
    parentId = body.parentId;
  }

  const doc = { _id: new ObjectId(), channel, fromId: me._id.toString(), text, kind, parentId, helpful: [], createdAt: new Date() };
  await messages.insertOne(doc);

  let points = null;
  if (kind === "question") points = await awardPoints(me, "CGC_QUESTION", { ref: doc._id.toString() });
  if (kind === "answer") {
    const expert = me.verified && me.role !== "student" && me.role !== "parent";
    points = await awardPoints(me, expert ? "CGC_EXPERT" : "CGC_ANSWER", { ref: doc._id.toString() });
  }
  return NextResponse.json({ ok: true, id: doc._id.toString(), points: points?.cp ?? 0 });
}
