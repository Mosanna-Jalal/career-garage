import { NextResponse } from "next/server";
import { fail, readJson } from "@/lib/api-helpers";
import { SESSION_COOKIE, membersCol, passwordMatches, sessionCookieOptions, sessionValue } from "@/lib/members";

/** POST /api/auth/login — email + password. */
export async function POST(request: Request) {
  if (!process.env.MONGODB_URI) return fail("Accounts need MONGODB_URI to be configured.", 503);
  const body = await readJson(request);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const member = email ? await (await membersCol()).findOne({ email }) : null;
  if (!member || !passwordMatches(password, member.passHash)) return fail("Email or password is incorrect.", 401);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, sessionValue(member._id.toString()), sessionCookieOptions);
  return res;
}

/** DELETE /api/auth/login — sign out. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
