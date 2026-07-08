import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getTest } from "@/lib/tests";

type ResultPayload = {
  testSlug: string;
  /** four-letter code for axis tests, e.g. "INFJ" */
  code?: string;
  /** top scale id for scale tests, e.g. "driver" */
  topScale?: string;
  /** per-axis or per-scale percentages keyed by id */
  breakdown?: Record<string, number>;
};

/**
 * Save an anonymous test result. No user identifiers are stored —
 * only the test slug, the computed outcome, and a timestamp.
 */
export async function POST(request: Request) {
  let payload: ResultPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const test = getTest(payload.testSlug ?? "");
  if (!test) {
    return NextResponse.json({ error: "Unknown test" }, { status: 400 });
  }

  // Validate outcome against the test definition so the collection
  // can't be polluted with arbitrary strings.
  let outcome: string | undefined;
  if (test.kind === "axes" && typeof payload.code === "string") {
    const valid = test.axes?.every(
      (axis, i) =>
        payload.code![i] === axis.left.code ||
        payload.code![i] === axis.right.code
    );
    if (valid && payload.code.length === (test.axes?.length ?? 0)) {
      outcome = payload.code;
    }
  } else if (test.kind === "scales" && typeof payload.topScale === "string") {
    if (test.scales?.some((s) => s.id === payload.topScale)) {
      outcome = payload.topScale;
    }
  }
  if (!outcome) {
    return NextResponse.json({ error: "Invalid result" }, { status: 400 });
  }

  const breakdown: Record<string, number> = {};
  if (payload.breakdown && typeof payload.breakdown === "object") {
    const validKeys =
      test.kind === "axes"
        ? (test.axes ?? []).map((a) => a.id)
        : (test.scales ?? []).map((s) => s.id);
    for (const key of validKeys) {
      const v = payload.breakdown[key];
      if (typeof v === "number" && Number.isFinite(v)) {
        breakdown[key] = Math.max(0, Math.min(100, Math.round(v)));
      }
    }
  }

  try {
    const db = await getDb();
    await db.collection("results").insertOne({
      testSlug: test.slug,
      outcome,
      breakdown,
      createdAt: new Date(),
    });
    const count = await db
      .collection("results")
      .countDocuments({ testSlug: test.slug });
    return NextResponse.json({ ok: true, count });
  } catch (err) {
    console.error("Failed to save result:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

/** GET /api/results?test=<slug> — anonymous aggregate stats for a test. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("test") ?? "";
  const test = getTest(slug);
  if (!test) {
    return NextResponse.json({ error: "Unknown test" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const [count, topOutcomes] = await Promise.all([
      db.collection("results").countDocuments({ testSlug: test.slug }),
      db
        .collection("results")
        .aggregate<{ _id: string; count: number }>([
          { $match: { testSlug: test.slug } },
          { $group: { _id: "$outcome", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ])
        .toArray(),
    ]);
    return NextResponse.json({
      count,
      topOutcomes: topOutcomes.map((o) => ({
        outcome: o._id,
        count: o.count,
      })),
    });
  } catch (err) {
    console.error("Failed to read results:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
