import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/db";

/**
 * Member accounts for dashboards, Career Garage Connect and Career Points.
 *
 * Passwords are scrypt-hashed; the session cookie holds the member id plus an
 * HMAC (SESSION_SECRET), so it cannot be forged or edited. Seeded demo
 * profiles (demo: true) can be entered without a password for review.
 */

export const ROLES = ["student", "parent", "teacher", "professor", "counsellor", "professional"] as const;
export type Role = (typeof ROLES)[number];

export const roleLabels: Record<Role, string> = {
  student: "Student",
  parent: "Parent / Guardian",
  teacher: "Teacher",
  professor: "Professor",
  counsellor: "Career Counsellor",
  professional: "Industry Professional",
};

/** Which dashboard a role uses. */
export function dashboardKind(role: Role): "student" | "parent" | "educator" {
  return role === "student" ? "student" : role === "parent" ? "parent" : "educator";
}

export type Profile = {
  className?: string;
  subject?: string;
  school?: string;
  city?: string;
  state?: string;
  interests: string[];
  skills: string[];
  careerInterests: string[];
  languages: string[];
  goal?: string;
  headline?: string;
};

/** Parent Control Center settings stored on the student's record. */
export type Controls = {
  /** who may send this learner a connect request */
  contactFrom: "anyone" | "students" | "verified" | "nobody";
  privateMessages: boolean;
  showSchool: boolean;
  showCity: boolean;
  searchable: boolean;
};

export const defaultControls: Controls = {
  contactFrom: "verified",
  privateMessages: true,
  showSchool: true,
  showCity: true,
  searchable: true,
};

export type MemberDoc = {
  _id: ObjectId;
  name: string;
  email: string;
  passHash?: string;
  role: Role;
  verified: boolean;
  profile: Profile;
  childId?: string;
  controls?: Controls;
  blocked?: string[];
  color: string;
  demo?: boolean;
  createdAt: Date;
};

/** What the browser may see about any member. */
export type PublicMember = {
  id: string;
  name: string;
  role: Role;
  verified: boolean;
  profile: Profile;
  color: string;
  demo?: boolean;
};

export const SESSION_COOKIE = "cg_session";
const palette = ["#29a29d", "#fe4711", "#7c5cff", "#2f6fd6", "#e0457b", "#c68a2c", "#1c6867", "#0e7490"];

export async function membersCol(): Promise<Collection<MemberDoc>> {
  const db = await getDb();
  return db.collection<MemberDoc>("members");
}

export function toPublic(m: MemberDoc, viewer?: MemberDoc | null): PublicMember {
  const p = { ...m.profile };
  // Child safety: younger learners' school and city follow parent controls,
  // and are only shown to fellow students or verified adults.
  if (m.role === "student" && viewer?._id.toString() !== m._id.toString()) {
    const c = m.controls ?? defaultControls;
    const trusted = viewer && (viewer.role === "student" || viewer.verified);
    if (!c.showSchool || !trusted) delete p.school;
    if (!c.showCity || !trusted) delete p.city;
  }
  return { id: m._id.toString(), name: m.name, role: m.role, verified: m.verified, profile: p, color: m.color, demo: m.demo };
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

export function passwordMatches(password: string, stored?: string) {
  if (!stored) return false;
  const [salt, hash] = stored.split(":");
  const a = Buffer.from(hash, "hex");
  const b = scryptSync(password, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}

function secret() {
  const s = process.env.SESSION_SECRET || process.env.ADMIN_TOKEN;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

export function sessionValue(id: string) {
  return `${id}.${createHmac("sha256", secret()).update(id).digest("hex")}`;
}

function idFromSession(value?: string) {
  if (!value) return null;
  const [id, sig] = value.split(".");
  if (!id || !sig || !ObjectId.isValid(id)) return null;
  const expected = sessionValue(id).split(".")[1];
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b) ? id : null;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

/** The signed-in member, or null. Safe to call when the DB is not configured. */
export async function currentMember(): Promise<MemberDoc | null> {
  if (!process.env.MONGODB_URI) return null;
  const store = await cookies();
  const id = idFromSession(store.get(SESSION_COOKIE)?.value);
  if (!id) return null;
  try {
    return await (await membersCol()).findOne({ _id: new ObjectId(id) });
  } catch {
    return null;
  }
}

export function profileCompleteness(role: Role, p: Profile) {
  const checks =
    role === "student"
      ? [p.className, p.school, p.city, p.state, p.interests.length, p.careerInterests.length, p.languages.length, p.subject, p.goal, p.skills.length]
      : role === "parent"
        ? [p.city, p.state, p.languages.length, p.headline, p.interests.length]
        : [p.subject, p.school, p.city, p.state, p.headline, p.interests.length, p.skills.length, p.languages.length, p.careerInterests.length, p.goal];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function pickColor(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  return palette[Math.abs(h) % palette.length];
}

export function cleanList(v: unknown, allowed?: readonly string[], max = 12): string[] {
  if (!Array.isArray(v)) return [];
  const out = v.filter((x): x is string => typeof x === "string").map((x) => x.trim().slice(0, 60)).filter(Boolean);
  return [...new Set(allowed ? out.filter((x) => allowed.includes(x)) : out)].slice(0, max);
}

export function cleanText(v: unknown, max = 120) {
  return typeof v === "string" ? v.trim().slice(0, max) || undefined : undefined;
}
