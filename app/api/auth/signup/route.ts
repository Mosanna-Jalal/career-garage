import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson } from "@/lib/api-helpers";
import {
  ROLES,
  SESSION_COOKIE,
  defaultControls,
  hashPassword,
  membersCol,
  pickColor,
  profileCompleteness,
  sessionCookieOptions,
  sessionValue,
  type MemberDoc,
  type Role,
} from "@/lib/members";
import { profileFrom } from "@/lib/profile-input";
import { awardPoints } from "@/lib/points-engine";

/** POST /api/auth/signup — create a member account and sign in. */
export async function POST(request: Request) {
  if (!process.env.MONGODB_URI) return fail("Accounts need MONGODB_URI to be configured.", 503);
  const body = await readJson(request);
  if (!body) return fail("Invalid JSON");

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 120) : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role = ROLES.includes(body.role as Role) ? (body.role as Role) : null;
  if (name.length < 2) return fail("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email.");
  if (password.length < 8) return fail("Use a password of at least 8 characters.");
  if (!role) return fail("Choose who you are.");

  const col = await membersCol();
  if (await col.findOne({ email })) return fail("An account with this email already exists. Sign in instead.", 409);

  const profile = profileFrom(body.profile);
  const member: MemberDoc = {
    _id: new ObjectId(),
    name,
    email,
    passHash: hashPassword(password),
    role,
    // professionals start unverified until their credentials are checked
    verified: false,
    profile,
    controls: role === "student" ? { ...defaultControls } : undefined,
    color: pickColor(email),
    createdAt: new Date(),
  };
  await col.insertOne(member);
  if (profileCompleteness(role, profile) >= 80) await awardPoints(member, "GEN_PROFILE_80");

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, sessionValue(member._id.toString()), sessionCookieOptions);
  return res;
}
