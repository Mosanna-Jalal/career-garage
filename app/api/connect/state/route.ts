import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireMember } from "@/lib/api-helpers";
import { toPublic } from "@/lib/members";
import { ensureSeed } from "@/lib/connect/seed";
import { cols, connectionIds, dmChannel, publicCommunities } from "@/lib/connect/store";
import { events } from "@/lib/connect/events";

/** GET /api/connect/state — everything the Connect sidebar and home need. */
export async function GET() {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  await ensureSeed();
  const id = me._id.toString();
  const { members, requests, messages } = await cols();

  const [communities, connections, incoming, outgoing] = await Promise.all([
    publicCommunities(me),
    connectionIds(id),
    requests.find({ toId: id, status: "pending" }).sort({ createdAt: -1 }).toArray(),
    requests.find({ fromId: id, status: "pending" }).toArray(),
  ]);

  const peopleIds = [...new Set([...connections, ...incoming.map((r) => r.fromId)])].filter(ObjectId.isValid);
  const people = await members.find({ _id: { $in: peopleIds.map((x) => new ObjectId(x)) } }).toArray();
  const byId = new Map(people.map((p) => [p._id.toString(), toPublic(p, me)]));

  const dmChannels = connections.map((c) => dmChannel(id, c));
  const lastDms = await messages
    .aggregate<{ _id: string; text: string; fromId: string; createdAt: Date }>([
      { $match: { channel: { $in: dmChannels }, hidden: { $ne: true } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$channel", text: { $first: "$text" }, fromId: { $first: "$fromId" }, createdAt: { $first: "$createdAt" } } },
    ])
    .toArray();
  const lastByChannel = new Map(lastDms.map((m) => [m._id, m]));

  return NextResponse.json({
    me: { ...toPublic(me, me), controls: me.controls ?? null },
    communities,
    connections: connections.map((c) => {
      const last = lastByChannel.get(dmChannel(id, c));
      return {
        member: byId.get(c) ?? null,
        channel: dmChannel(id, c),
        last: last ? { text: last.text, mine: last.fromId === id, at: last.createdAt } : null,
      };
    }).filter((c) => c.member),
    incoming: incoming.map((r) => ({
      id: r._id.toString(),
      kind: r.kind,
      from: byId.get(r.fromId) ?? null,
      communityId: r.communityId,
      community: r.communityId ? communities.find((c) => c.id === r.communityId)?.name : undefined,
      note: r.note,
      at: r.createdAt,
    })),
    outgoing: outgoing.map((r) => ({ kind: r.kind, toId: r.toId, communityId: r.communityId })),
    events,
  });
}
