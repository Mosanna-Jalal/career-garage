import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson } from "@/lib/api-helpers";
import { SESSION_COOKIE, membersCol, sessionCookieOptions, sessionValue } from "@/lib/members";
import { ensureSeed } from "@/lib/connect/seed";

/**
 * Demo profiles for reviewing dashboards and Connect without sign-up.
 * Only members flagged demo:true can be entered this way.
 */
export async function GET() {
  if (!process.env.MONGODB_URI) return NextResponse.json({ members: [] });
  await ensureSeed();
  const list = await (await membersCol())
    .find({ demo: true }, { projection: { name: 1, role: 1, color: 1, profile: 1, verified: 1 } })
    .toArray();
  return NextResponse.json({
    members: list.map((m) => ({ id: m._id.toString(), name: m.name, role: m.role, color: m.color, verified: m.verified, headline: m.profile.headline ?? m.profile.className })),
  });
}

export async function POST(request: Request) {
  if (!process.env.MONGODB_URI) return fail("Accounts need MONGODB_URI to be configured.", 503);
  const body = await readJson(request);
  const id = typeof body?.id === "string" && ObjectId.isValid(body.id) ? body.id : null;
  const member = id ? await (await membersCol()).findOne({ _id: new ObjectId(id), demo: true }) : null;
  if (!member) return fail("Unknown demo profile.", 404);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, sessionValue(member._id.toString()), sessionCookieOptions);
  return res;
}
