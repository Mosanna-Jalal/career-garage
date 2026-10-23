import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { fail, readJson, requireMember } from "@/lib/api-helpers";
import { cleanList, cleanText } from "@/lib/members";
import { combinationFields, communityCategories, emptyCombination, type Combination } from "@/lib/connect/options";
import { cols } from "@/lib/connect/store";

/**
 * POST /api/connect/communities — create a community from a chosen
 * combination (who, class, subjects, interests, …) so others can see who it
 * is for before they join. Body: { name, description, category, joinMode, combination }
 */
export async function POST(request: Request) {
  const me = await requireMember();
  if (me instanceof NextResponse) return me;
  const body = await readJson(request);
  if (!body) return fail("Invalid JSON");

  const name = cleanText(body.name, 60);
  const description = cleanText(body.description, 280) ?? "";
  if (!name || name.length < 3) return fail("Give the community a name.");
  const raw = (body.combination ?? {}) as Record<string, unknown>;
  const combination: Combination = { ...emptyCombination };
  for (const f of combinationFields) combination[f.key] = cleanList(raw[f.key], f.options, 20);
  if (Object.values(combination).every((v) => v.length === 0)) {
    return fail("Choose at least one option for who the community is for.");
  }

  const { communities } = await cols();
  if (await communities.findOne({ name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") })) {
    return fail("A community with that name already exists.", 409);
  }
  const id = me._id.toString();
  const doc = {
    _id: new ObjectId(),
    name,
    description,
    category: communityCategories.includes(String(body.category)) ? String(body.category) : "Study Group",
    ownerId: id,
    joinMode: body.joinMode === "open" ? ("open" as const) : ("request" as const),
    combination,
    members: [id],
    createdAt: new Date(),
  };
  await communities.insertOne(doc);
  return NextResponse.json({ ok: true, id: doc._id.toString() });
}
