import type { Metadata } from "next";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin-login";
import { FeedbackBoard } from "@/components/feedback-board";

export const metadata: Metadata = {
  title: "Feedback queue",
  robots: { index: false, follow: false },
};

/** Internal review panel — never statically rendered. */
export const dynamic = "force-dynamic";

export default async function AdminFeedbackPage() {
  if (!(await isAdmin())) {
    return <AdminLogin configured={adminConfigured()} />;
  }
  return <FeedbackBoard />;
}
