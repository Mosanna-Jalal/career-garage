import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentMember, dashboardKind } from "@/lib/members";
import { loadDashboard } from "@/lib/dashboard";
import { EducatorDashboard, ParentDashboard, StudentDashboard } from "@/components/dashboard/views";

export const metadata: Metadata = { title: "My dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

/** One URL, three designs: student, educator (teacher/professor/counsellor/professional) and parent. */
export default async function DashboardPage() {
  const me = await currentMember();
  if (!me) redirect("/login?next=/dashboard");
  const d = await loadDashboard(me);
  const kind = dashboardKind(me.role);
  if (kind === "parent") return <ParentDashboard d={d} />;
  if (kind === "educator") return <EducatorDashboard d={d} />;
  return <StudentDashboard d={d} />;
}
