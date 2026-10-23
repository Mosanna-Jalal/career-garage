import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { defaultControls, membersCol, toPublic, type MemberDoc, type PublicMember } from "@/lib/members";
import { ensureSeed } from "@/lib/connect/seed";
import { cols, connectionIds, matchScore, publicCommunities, type PublicCommunity } from "@/lib/connect/store";
import { getWallet, type Wallet } from "@/lib/points-engine";

export type ResultSummary = { slug: string; mode: string; status: string; headline?: string; code?: string; at: string };
export type RequestSummary = { id: string; kind: "connect" | "join"; from: PublicMember | null; community?: string; note?: string; at: string };

export type DashboardData = {
  me: PublicMember & { email: string; controls: MemberDoc["controls"] };
  wallet: Wallet;
  communities: PublicCommunity[];
  requests: RequestSummary[];
  connections: number;
  results: ResultSummary[];
  suggestions: (PublicMember & { score: number })[];
  openQuestions: { community: string; communityId: string; text: string; from: string; at: string }[];
  child?: {
    member: PublicMember;
    controls: NonNullable<MemberDoc["controls"]>;
    results: ResultSummary[];
    communities: string[];
    connections: number;
    wallet: Wallet;
  };
};

async function resultsFor(memberId: string): Promise<ResultSummary[]> {
  const db = await getDb();
  const rows = await db
    .collection("assessmentResults")
    .find({ memberId })
    .sort({ createdAt: -1 })
    .limit(40)
    .toArray();
  const seen = new Set<string>();
  const out: ResultSummary[] = [];
  for (const r of rows) {
    const key = `${r.slug}:${r.mode}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ slug: r.slug, mode: r.mode, status: r.status, headline: r.headline, code: r.code, at: (r.createdAt as Date).toISOString() });
  }
  return out;
}

export async function loadDashboard(me: MemberDoc): Promise<DashboardData> {
  await ensureSeed();
  const id = me._id.toString();
  const { requests, members, messages } = await cols();
  const [wallet, communities, pending, connected, results, others] = await Promise.all([
    getWallet(me),
    publicCommunities(me),
    requests.find({ toId: id, status: "pending" }).sort({ createdAt: -1 }).limit(20).toArray(),
    connectionIds(id),
    resultsFor(id),
    members.find({ _id: { $ne: me._id }, role: { $ne: "parent" } }).limit(300).toArray(),
  ]);

  const fromIds = pending.map((r) => r.fromId).filter(ObjectId.isValid);
  const fromDocs = await members.find({ _id: { $in: fromIds.map((x) => new ObjectId(x)) } }).toArray();
  const byId = new Map(fromDocs.map((d) => [d._id.toString(), toPublic(d, me)]));

  const suggestions = others
    .filter((o) => !connected.includes(o._id.toString()))
    .filter((o) => o.role !== "student" || (o.controls ?? defaultControls).searchable)
    .map((o) => ({ ...toPublic(o, me), score: matchScore(me.profile, o.profile) }))
    .filter((o) => o.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  // Educators: unanswered questions in communities they belong to
  const myCommunities = communities.filter((c) => c.isMember);
  let openQuestions: DashboardData["openQuestions"] = [];
  if (me.role !== "student" && me.role !== "parent" && myCommunities.length) {
    const qs = await messages
      .find({ channel: { $in: myCommunities.map((c) => `c:${c.id}`) }, kind: "question", hidden: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();
    const answered = new Set(
      (await messages.find({ parentId: { $in: qs.map((q) => q._id.toString()) } }).toArray()).map((a) => a.parentId)
    );
    const askers = await members.find({ _id: { $in: qs.map((q) => new ObjectId(q.fromId)) } }).toArray();
    const names = new Map(askers.map((a) => [a._id.toString(), a.name]));
    openQuestions = qs
      .filter((q) => !answered.has(q._id.toString()))
      .slice(0, 5)
      .map((q) => {
        const c = myCommunities.find((x) => `c:${x.id}` === q.channel)!;
        return { community: c.name, communityId: c.id, text: q.text, from: names.get(q.fromId) ?? "Member", at: q.createdAt.toISOString() };
      });
  }

  const data: DashboardData = {
    me: { ...toPublic(me, me), email: me.email, controls: me.controls },
    wallet,
    communities,
    requests: pending.map((r) => ({
      id: r._id.toString(),
      kind: r.kind,
      from: byId.get(r.fromId) ?? null,
      community: r.communityId ? communities.find((c) => c.id === r.communityId)?.name : undefined,
      note: r.note,
      at: r.createdAt.toISOString(),
    })),
    connections: connected.length,
    results,
    suggestions,
    openQuestions,
  };

  if (me.role === "parent" && me.childId && ObjectId.isValid(me.childId)) {
    const child = await (await membersCol()).findOne({ _id: new ObjectId(me.childId) });
    if (child) {
      const childCommunities = (await cols()).communities;
      const joined = await childCommunities.find({ members: child._id.toString() }).project({ name: 1 }).toArray();
      data.child = {
        member: toPublic(child, child),
        controls: child.controls ?? defaultControls,
        results: await resultsFor(child._id.toString()),
        communities: joined.map((c) => c.name as string),
        connections: (await connectionIds(child._id.toString())).length,
        wallet: await getWallet(child),
      };
    }
  }
  return data;
}
