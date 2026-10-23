import { NextResponse } from "next/server";
import { currentMember, type MemberDoc } from "@/lib/members";

export const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const raw = await request.json();
    return raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** The signed-in member, or a 401/503 response to return as-is. */
export async function requireMember(): Promise<MemberDoc | NextResponse> {
  if (!process.env.MONGODB_URI) return fail("Accounts need MONGODB_URI to be configured.", 503);
  const m = await currentMember();
  return m ?? fail("Please sign in.", 401);
}
