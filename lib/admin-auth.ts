import { cookies } from "next/headers";

/**
 * Minimal shared-secret gate for the internal feedback panel.
 *
 * This is deliberately simple: one token, shared by the team, held in an
 * httpOnly cookie. It keeps the review queue off the public internet — it is
 * NOT a user authentication system, and should be replaced with real accounts
 * before anything sensitive lives behind it.
 */

export const ADMIN_COOKIE = "cg_admin";

function expectedToken() {
  return process.env.ADMIN_TOKEN?.trim();
}

/** True when the admin token is configured at all. */
export function adminConfigured() {
  return Boolean(expectedToken());
}

/** Constant-time-ish comparison to avoid trivially leaking length. */
export function tokenMatches(candidate: string | undefined) {
  const expected = expectedToken();
  if (!expected || !candidate) return false;
  if (candidate.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ candidate.charCodeAt(i);
  }
  return diff === 0;
}

/** Read the cookie in a Server Component or Route Handler. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return tokenMatches(store.get(ADMIN_COOKIE)?.value);
}
