import { NextResponse } from "next/server";
import { currentMember } from "@/lib/members";

/** GET /api/auth/me — who is signed in (for the header). */
export async function GET() {
  const m = await currentMember();
  return NextResponse.json({ member: m ? { name: m.name, role: m.role, color: m.color } : null });
}
