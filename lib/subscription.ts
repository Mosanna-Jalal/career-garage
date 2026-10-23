import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isAdmin } from "@/lib/admin-auth";

/**
 * Who may take the full-length assessments and see complete reports.
 *
 * Payments are not built yet, so two groups pass:
 *  - the team, signed in at /admin/feedback or /admin/assessments
 *  - the owner, after "See report as admin" with OWNER_REPORT_PASSWORD
 * Replace or extend this once billing exists; every gate calls it.
 */

export const OWNER_COOKIE = "cg_owner";

function ownerDigest(password: string) {
  return createHash("sha256").update(`cg-owner:${password}`).digest("hex");
}

/** True when the given password matches OWNER_REPORT_PASSWORD. */
export function ownerPasswordMatches(candidate: unknown): boolean {
  const expected = process.env.OWNER_REPORT_PASSWORD;
  if (!expected || typeof candidate !== "string") return false;
  const a = Buffer.from(ownerDigest(candidate));
  const b = Buffer.from(ownerDigest(expected));
  return timingSafeEqual(a, b);
}

/** Cookie value proving the owner password was entered (never the password itself). */
export function ownerCookieValue() {
  return ownerDigest(process.env.OWNER_REPORT_PASSWORD ?? "");
}

export async function isOwner(): Promise<boolean> {
  if (!process.env.OWNER_REPORT_PASSWORD) return false;
  const store = await cookies();
  const v = store.get(OWNER_COOKIE)?.value;
  if (!v) return false;
  const a = Buffer.from(v);
  const b = Buffer.from(ownerCookieValue());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isSubscriber(): Promise<boolean> {
  return (await isAdmin()) || (await isOwner());
}
