import { NextResponse } from "next/server";
import { requireMember } from "@/lib/api-helpers";
import { defaultControls, toPublic } from "@/lib/members";
import { combinationFields, type Combination } from "@/lib/connect/options";
import { cols, connectionIds, contactAllowed, fitsCombination, matchScore } from "@/lib/connect/store";

/**
 * GET /api/connect/people?roles=student&interests=Coding&states=Delhi…
 * Members matching every chosen dimension, best matches to you first.
 * Hidden: yourself, people who blocked you, learners whose parents turned
 * search visibility off.
 */
export async function GET(request: Request) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const sp = new URL(request.url).searchParams;
  const combo: Partial<Combination> = {};
  for (const f of combinationFields) {
    const v = sp.getAll(f.key).filter((x) => f.options.includes(x));
    if (v.length) combo[f.key] = v;
  }
  const q = (sp.get("q") ?? "").trim().toLowerCase().slice(0, 60);
  const experts = sp.get("experts") === "1";

  const { members, requests } = await cols();
  const id = me._id.toString();
  const [all, connected, pending] = await Promise.all([
    members.find({ _id: { $ne: me._id } }).limit(500).toArray(),
    connectionIds(id),
    requests.find({ kind: "connect", status: "pending", $or: [{ fromId: id }, { toId: id }] }).toArray(),
  ]);

  const results = all
    .filter((m) => !(m.blocked ?? []).includes(id))
    .filter((m) => m.role !== "student" || (m.controls ?? defaultControls).searchable)
    .filter((m) => !experts || (m.verified && m.role !== "student" && m.role !== "parent"))
    .filter((m) => m.role !== "parent" || me.role === "parent")
    .filter((m) => fitsCombination(m, combo))
    .filter((m) => !q || `${m.name} ${m.profile.headline ?? ""} ${m.profile.subject ?? ""} ${m.profile.school ?? ""}`.toLowerCase().includes(q))
    .map((m) => {
      const mid = m._id.toString();
      return {
        member: toPublic(m, me),
        score: matchScore(me.profile, m.profile),
        connected: connected.includes(mid),
        pending: pending.some((r) => r.fromId === mid || r.toId === mid),
        blockedReason: contactAllowed(me, m),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 60);

  return NextResponse.json({ results });
}
