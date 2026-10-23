import { NextResponse, after } from "next/server";
import { getAssessment } from "@/lib/assessments/catalog";
import {
  buildReport,
  cleanAnswers,
  getBankItems,
  getTrialItems,
  logResult,
} from "@/lib/assessments/server";
import { isSubscriber } from "@/lib/subscription";
import { currentMember } from "@/lib/members";
import { awardPoints } from "@/lib/points-engine";

/**
 * POST /api/assessments/[slug]/score — score answers on the server so the
 * reverse keys and aptitude answers never ship to the browser.
 *
 * Body: { mode: "demo" | "full", answers: { [itemId]: 1–5 | "A"–"D" } }
 * Demo scores the trial set and returns a partial report; full requires a
 * subscription and returns the complete report.
 */
export async function POST(
  request: Request,
  ctx: RouteContext<"/api/assessments/[slug]/score">
) {
  const { slug } = await ctx.params;
  const meta = getAssessment(slug);
  if (!meta) {
    return NextResponse.json({ error: "Unknown assessment" }, { status: 404 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const body = (raw ?? {}) as Record<string, unknown>;
  const mode = body.mode === "full" ? "full" : "demo";

  const subscriber = await isSubscriber();
  if (mode === "full" && !subscriber) {
    return NextResponse.json(
      { error: "The full assessment is available to subscribers." },
      { status: 403 }
    );
  }

  const items = mode === "full" ? getBankItems(meta) : await getTrialItems(meta);
  const answers = cleanAnswers(meta, items, body.answers);
  if (Object.keys(answers).length === 0) {
    return NextResponse.json({ error: "No valid answers" }, { status: 400 });
  }

  const report = buildReport(meta, items, answers, mode, subscriber);
  const member = await currentMember();
  after(async () => {
    await logResult(report, member?._id.toString());
    // Career Points reward authentic completion only — never the result itself
    if (member && mode === "full" && report.status === "complete") {
      await awardPoints(member, "ASM_COMPLETE", { ref: meta.slug });
    }
  });
  return NextResponse.json(report);
}
