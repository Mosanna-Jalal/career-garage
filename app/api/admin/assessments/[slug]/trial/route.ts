import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";
import { getAssessment } from "@/lib/assessments/catalog";
import {
  TRIAL_COLLECTION,
  getBankItems,
  type CustomTrialItem,
} from "@/lib/assessments/server";

const MAX_TRIAL_ITEMS = 30;

/**
 * PUT /api/admin/assessments/[slug]/trial — choose which questions make up
 * the free demo and add custom trial questions. Admin only.
 * Body: { itemIds: string[], custom: CustomTrialItem[] }
 */
export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/admin/assessments/[slug]/trial">
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
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

  const bankIds = new Set(getBankItems(meta).map((i) => i.id));
  const itemIds = Array.isArray(body.itemIds)
    ? [...new Set(body.itemIds.filter((id): id is string => typeof id === "string" && bankIds.has(id)))]
    : [];

  const custom: CustomTrialItem[] = [];
  if (Array.isArray(body.custom)) {
    for (const c of body.custom as Record<string, unknown>[]) {
      const text = typeof c?.text === "string" ? c.text.trim().slice(0, 300) : "";
      const dim = typeof c?.dim === "string" ? c.dim : "";
      if (!text || !meta.dims.includes(dim)) continue;
      const id =
        typeof c.id === "string" && /^CUSTOM-[a-z0-9]{6,20}$/.test(c.id)
          ? c.id
          : `CUSTOM-${Math.random().toString(36).slice(2, 12)}`;
      if (meta.scale === "objective") {
        const opts = Array.isArray(c.opts)
          ? c.opts.slice(0, 4).map((o) => String(o ?? "").trim().slice(0, 160))
          : [];
        const ans = typeof c.ans === "string" ? c.ans : "";
        if (opts.length !== 4 || opts.some((o) => !o) || !["A", "B", "C", "D"].includes(ans)) continue;
        custom.push({ id, dim, text, opts, ans });
      } else {
        custom.push({ id, dim, text, rev: c.rev === true });
      }
    }
  }

  if (itemIds.length + custom.length === 0) {
    return NextResponse.json({ error: "Choose at least one trial question." }, { status: 400 });
  }
  if (itemIds.length + custom.length > MAX_TRIAL_ITEMS) {
    return NextResponse.json(
      { error: `A trial can have at most ${MAX_TRIAL_ITEMS} questions.` },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    const updatedAt = new Date();
    await db
      .collection(TRIAL_COLLECTION)
      .updateOne({ slug }, { $set: { slug, itemIds, custom, updatedAt } }, { upsert: true });
    return NextResponse.json({ ok: true, itemIds, custom, updatedAt: updatedAt.toISOString() });
  } catch (err) {
    console.error("Failed to save trial config:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

/** DELETE — restore the catalog's default ten-question demo. */
export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/admin/assessments/[slug]/trial">
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  const meta = getAssessment(slug);
  if (!meta) {
    return NextResponse.json({ error: "Unknown assessment" }, { status: 404 });
  }
  try {
    const db = await getDb();
    await db.collection(TRIAL_COLLECTION).deleteOne({ slug });
    return NextResponse.json({ ok: true, itemIds: meta.demo, custom: [] });
  } catch (err) {
    console.error("Failed to reset trial config:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
