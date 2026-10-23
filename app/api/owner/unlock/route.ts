import { NextResponse } from "next/server";
import { OWNER_COOKIE, ownerCookieValue, ownerPasswordMatches } from "@/lib/subscription";

/** POST /api/owner/unlock — "See report as admin". Body: { password } */
export async function POST(request: Request) {
  if (!process.env.OWNER_REPORT_PASSWORD) {
    return NextResponse.json({ error: "Owner access is not configured." }, { status: 500 });
  }
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const password = (raw as Record<string, unknown>)?.password;
  if (!ownerPasswordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(OWNER_COOKIE, ownerCookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

/** DELETE — leave owner mode. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(OWNER_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
