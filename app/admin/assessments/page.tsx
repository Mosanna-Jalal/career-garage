import type { Metadata } from "next";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin-login";
import { TrialManager, type TrialAssessment } from "@/components/admin/trial-manager";
import { assessments } from "@/lib/assessments/catalog";
import { dimensionNames, getBankItems, getTrialConfig } from "@/lib/assessments/server";

export const metadata: Metadata = {
  title: "Assessment trial questions",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Admin: choose which questions make up each free demo ("trial") and add
 * custom trial questions, so the demo pages can be shaped before launch.
 */
export default async function AdminAssessmentsPage() {
  if (!(await isAdmin())) {
    return <AdminLogin configured={adminConfigured()} title="Assessment admin" />;
  }

  const data: TrialAssessment[] = await Promise.all(
    assessments.map(async (meta) => {
      const names = dimensionNames(meta);
      const config = await getTrialConfig(meta);
      return {
        slug: meta.slug,
        name: meta.name,
        id: meta.id,
        objective: meta.scale === "objective",
        dims: meta.dims.map((code) => ({ code, name: names[code] })),
        defaults: meta.demo,
        items: getBankItems(meta),
        itemIds: config.itemIds,
        custom: config.custom,
        isDefault: config.isDefault,
        updatedAt: config.updatedAt,
      };
    })
  );

  return <TrialManager data={data} dbConfigured={Boolean(process.env.MONGODB_URI)} />;
}
