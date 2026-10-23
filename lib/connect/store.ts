import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { defaultControls, membersCol, toPublic, type MemberDoc, type PublicMember } from "@/lib/members";
import type { Combination } from "@/lib/connect/options";

/**
 * Career Garage Connect storage and rules, following "Community CG":
 *  - communities are the heart: each declares the combination it is for
 *  - Level 1 public: community posts/Q&A for members
 *  - Level 2/3 controlled: private messages only after an accepted
 *    connect request (with a purpose note for professionals)
 *  - parent controls decide who may contact a learner
 *  - report and block are available everywhere
 */

export type CommunityDoc = {
  _id: ObjectId;
  name: string;
  description: string;
  category: string;
  ownerId: string;
  joinMode: "open" | "request";
  combination: Combination;
  members: string[];
  demo?: boolean;
  createdAt: Date;
};

export type MessageDoc = {
  _id: ObjectId;
  /** c:<communityId> or d:<memberA>:<memberB> (ids sorted) */
  channel: string;
  fromId: string;
  text: string;
  kind: "message" | "question" | "answer";
  parentId?: string;
  helpful: string[];
  accepted?: boolean;
  hidden?: boolean;
  demo?: boolean;
  createdAt: Date;
};

export type RequestDoc = {
  _id: ObjectId;
  kind: "connect" | "join";
  fromId: string;
  toId: string;
  communityId?: string;
  note?: string;
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
  decidedAt?: Date;
};

export type ReportDoc = { _id?: ObjectId; reporterId: string; messageId?: string; memberId?: string; reason: string; createdAt: Date };

export async function cols() {
  const db = await getDb();
  return {
    members: await membersCol(),
    communities: db.collection<CommunityDoc>("communities"),
    messages: db.collection<MessageDoc>("messages"),
    requests: db.collection<RequestDoc>("requests"),
    reports: db.collection<ReportDoc>("reports"),
  };
}

export const dmChannel = (a: string, b: string) => `d:${[a, b].sort().join(":")}`;

export async function connectionIds(memberId: string) {
  const { requests } = await cols();
  const accepted = await requests
    .find({ kind: "connect", status: "accepted", $or: [{ fromId: memberId }, { toId: memberId }] })
    .toArray();
  return [...new Set(accepted.map((r) => (r.fromId === memberId ? r.toId : r.fromId)))];
}

export async function canUseChannel(member: MemberDoc, channel: string) {
  const id = member._id.toString();
  if (channel.startsWith("c:")) {
    const cid = channel.slice(2);
    if (!ObjectId.isValid(cid)) return false;
    const { communities } = await cols();
    return Boolean(await communities.findOne({ _id: new ObjectId(cid), members: id }));
  }
  if (channel.startsWith("d:")) {
    const [a, b] = channel.slice(2).split(":");
    if (a !== id && b !== id) return false;
    const other = a === id ? b : a;
    if ((member.blocked ?? []).includes(other)) return false;
    if (member.role === "student" && !(member.controls ?? defaultControls).privateMessages) return false;
    return (await connectionIds(id)).includes(other);
  }
  return false;
}

/**
 * May `from` send a connect request to `to`? Encodes the parent controls
 * and the rule that adults reach learners only through verified accounts.
 */
export function contactAllowed(from: MemberDoc, to: MemberDoc): string | null {
  if (from._id.equals(to._id)) return "You cannot connect with yourself.";
  if ((to.blocked ?? []).includes(from._id.toString())) return "This member is not accepting requests from you.";
  if (to.role === "student") {
    const c = to.controls ?? defaultControls;
    if (c.contactFrom === "nobody") return "This learner's parent controls don't allow new connections.";
    if (c.contactFrom === "students" && from.role !== "student") return "This learner can only connect with other students.";
    if (c.contactFrom === "verified" && from.role !== "student" && !from.verified)
      return "Only verified teachers and professionals can contact learners.";
  }
  if (from.role === "student") {
    const c = from.controls ?? defaultControls;
    if (c.contactFrom === "nobody") return "Your parent controls don't allow new connections right now.";
    if (c.contactFrom === "students" && to.role !== "student") return "Your parent controls allow connecting with students only.";
  }
  return null;
}

/** How many of the viewer's attributes another member shares. */
export function matchScore(a: MemberDoc["profile"], b: MemberDoc["profile"]) {
  const overlap = (x: string[] = [], y: string[] = []) => x.filter((v) => y.includes(v)).length;
  return (
    overlap(a.interests, b.interests) * 3 +
    overlap(a.careerInterests, b.careerInterests) * 2 +
    overlap(a.skills, b.skills) +
    overlap(a.languages, b.languages) +
    (a.className && a.className === b.className ? 2 : 0) +
    (a.subject && a.subject === b.subject ? 2 : 0) +
    (a.state && a.state === b.state ? 1 : 0) +
    (a.school && a.school === b.school ? 1 : 0)
  );
}

/** Does a member fit every chosen dimension of a combination? */
export function fitsCombination(m: MemberDoc, c: Partial<Combination>) {
  const p = m.profile;
  const any = (want: string[] | undefined, have: string[]) => !want?.length || want.some((w) => have.includes(w));
  return (
    any(c.roles, [m.role]) &&
    any(c.classes, p.className ? [p.className] : []) &&
    any(c.subjects, p.subject ? [p.subject] : []) &&
    any(c.interests, p.interests) &&
    any(c.careerInterests, p.careerInterests) &&
    any(c.states, p.state ? [p.state] : []) &&
    any(c.languages, p.languages)
  );
}

export type PublicCommunity = {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: PublicMember | null;
  joinMode: "open" | "request";
  combination: Combination;
  memberCount: number;
  roleCounts: Record<string, number>;
  isMember: boolean;
  isOwner: boolean;
  requested: boolean;
  fit: boolean;
  activity: number;
};

export async function publicCommunities(viewer: MemberDoc): Promise<PublicCommunity[]> {
  const { communities, members, requests, messages } = await cols();
  const id = viewer._id.toString();
  const list = await communities.find().sort({ createdAt: -1 }).toArray();
  const memberIds = [...new Set(list.flatMap((c) => [...c.members, c.ownerId]))].filter(ObjectId.isValid);
  const people = await members.find({ _id: { $in: memberIds.map((x) => new ObjectId(x)) } }).toArray();
  const byId = new Map(people.map((p) => [p._id.toString(), p]));
  const pending = await requests.find({ kind: "join", fromId: id, status: "pending" }).toArray();
  const weekAgo = new Date(Date.now() - 7 * 86_400_000);
  const counts = await messages
    .aggregate<{ _id: string; n: number }>([{ $match: { channel: /^c:/, createdAt: { $gte: weekAgo } } }, { $group: { _id: "$channel", n: { $sum: 1 } } }])
    .toArray();
  const activity = new Map(counts.map((c) => [c._id, c.n]));
  return list.map((c) => {
    const roleCounts: Record<string, number> = {};
    for (const m of c.members) {
      const r = byId.get(m)?.role;
      if (r) roleCounts[r] = (roleCounts[r] ?? 0) + 1;
    }
    const owner = byId.get(c.ownerId);
    return {
      id: c._id.toString(),
      name: c.name,
      description: c.description,
      category: c.category,
      owner: owner ? toPublic(owner, viewer) : null,
      joinMode: c.joinMode,
      combination: c.combination,
      memberCount: c.members.length,
      roleCounts,
      isMember: c.members.includes(id),
      isOwner: c.ownerId === id,
      requested: pending.some((r) => r.communityId === c._id.toString()),
      fit: fitsCombination(viewer, c.combination),
      activity: activity.get(`c:${c._id.toString()}`) ?? 0,
    };
  });
}
