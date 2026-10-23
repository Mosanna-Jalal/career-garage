import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson, requireMember } from "@/lib/api-helpers";
import { defaultControls, membersCol, profileCompleteness, type Controls } from "@/lib/members";
import { profileFrom } from "@/lib/profile-input";
import { awardPoints } from "@/lib/points-engine";

const CONTACT = ["anyone", "students", "verified", "nobody"] as const;

/**
 * PATCH /api/auth/profile
 *  { profile }        — update your own profile
 *  { childEmail }     — parent: link a student account
 *  { controls }       — parent: Parent Control Center for the linked child
 */
export async function PATCH(request: Request) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const body = await readJson(request);
  if (!body) return fail("Invalid JSON");
  const col = await membersCol();

  if (body.profile) {
    const profile = profileFrom(body.profile);
    await col.updateOne({ _id: me._id }, { $set: { profile } });
    if (profileCompleteness(me.role, profile) >= 80) await awardPoints(me, "GEN_PROFILE_80");
    return NextResponse.json({ ok: true });
  }

  if (me.role !== "parent") return fail("Only parents can manage child settings.", 403);

  if (typeof body.childEmail === "string") {
    const child = await col.findOne({ email: body.childEmail.trim().toLowerCase(), role: "student" });
    if (!child) return fail("No student account uses that email.", 404);
    await col.updateOne({ _id: me._id }, { $set: { childId: child._id.toString() } });
    return NextResponse.json({ ok: true, childName: child.name });
  }

  if (body.controls && typeof body.controls === "object") {
    if (!me.childId) return fail("Link your child's account first.");
    const c = body.controls as Record<string, unknown>;
    const controls: Controls = {
      contactFrom: CONTACT.includes(c.contactFrom as Controls["contactFrom"]) ? (c.contactFrom as Controls["contactFrom"]) : defaultControls.contactFrom,
      privateMessages: c.privateMessages !== false,
      showSchool: c.showSchool !== false,
      showCity: c.showCity !== false,
      searchable: c.searchable !== false,
    };
    await col.updateOne({ _id: new ObjectId(me.childId), role: "student" }, { $set: { controls } });
    await awardPoints(me, "PAR_CONSENT", { ref: "controls" });
    return NextResponse.json({ ok: true, controls });
  }

  return fail("Nothing to update.");
}
