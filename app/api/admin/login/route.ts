import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminConfigured, tokenMatches } from "@/lib/admin-auth";

/** POST /api/admin/login — exchange the shared token for a session cookie. */
export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN is not set on the server." },
      { status: 500 }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const token = (raw as Record<string, unknown>)?.token;
  if (typeof token !== "string" || !tokenMatches(token)) {
    return NextResponse.json({ error: "Incorrect token" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // Stay signed in for a year — this is an internal review tool and
    // re-entering the password on every visit is friction we don't need.
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

/** DELETE /api/admin/login — sign out. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
