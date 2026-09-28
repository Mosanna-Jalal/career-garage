import { isAdmin } from "@/lib/admin-auth";

/**
 * Who may take the full-length assessments and see complete reports.
 *
 * Payments and learner accounts are not built yet, so for now only the team
 * (signed in at /admin/feedback or /admin/assessments) passes — enough to
 * preview the subscriber experience. Replace the body with a real
 * subscription lookup once billing exists; every gate calls this function.
 */
export async function isSubscriber(): Promise<boolean> {
  return isAdmin();
}
