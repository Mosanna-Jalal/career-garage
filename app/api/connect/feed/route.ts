import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireMember } from "@/lib/api-helpers";
import { toPublic } from "@/lib/members";
import { ensureSeed } from "@/lib/connect/seed";
import { cols } from "@/lib/connect/store";

/** GET /api/connect/feed?tab=latest|popular|unanswered — questions across your communities. */
export async function GET(request: Request) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  await ensureSeed();
  const tab = new URL(request.url).searchParams.get("tab") ?? "latest";
  const { communities, messages, members } = await cols();
  const mine = await communities.find({ members: me._id.toString() }).project({ name: 1 }).toArray();
  const channels = mine.map((c) => `c:${c._id.toString()}`);
  const names = new Map(mine.map((c) => [`c:${c._id.toString()}`, { name: c.name as string, id: c._id.toString() }]));

  const questions = await messages.find({ channel: { $in: channels }, kind: "question", hidden: { $ne: true } }).sort({ createdAt: -1 }).limit(60).toArray();
  const answers = await messages.find({ parentId: { $in: questions.map((q) => q._id.toString()) }, hidden: { $ne: true } }).toArray();
  const people = await members.find({ _id: { $in: [...new Set(questions.map((q) => q.fromId))].filter(ObjectId.isValid).map((x) => new ObjectId(x)) } }).toArray();
  const byId = new Map(people.map((p) => [p._id.toString(), toPublic(p, me)]));

  let items = questions.map((q) => {
    const a = answers.filter((x) => x.parentId === q._id.toString());
    return {
      id: q._id.toString(),
      text: q.text,
      from: byId.get(q.fromId) ?? null,
      community: names.get(q.channel)!,
      answers: a.length,
      resolved: a.some((x) => x.accepted),
      helpful: q.helpful.length + a.reduce((n, x) => n + x.helpful.length, 0),
      at: q.createdAt,
    };
  });
  if (tab === "unanswered") items = items.filter((i) => i.answers === 0);
  if (tab === "popular") items = items.sort((x, y) => y.helpful + y.answers * 2 - (x.helpful + x.answers * 2));
  return NextResponse.json({ items: items.slice(0, 30) });
}
