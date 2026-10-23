import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ConnectApp } from "@/components/connect/connect-app";
import { currentMember } from "@/lib/members";

export const metadata: Metadata = {
  title: "Career Garage Connect",
  description: "Communities, Q&A, mentors and moderated messaging for learners, educators and professionals.",
  robots: { index: false },
};
export const dynamic = "force-dynamic";

export default async function ConnectPage() {
  if (!(await currentMember())) redirect("/login?next=/connect");
  return (
    <Suspense fallback={<p className="p-10 text-center text-ink/50">Loading Career Garage Connect…</p>}>
      <ConnectApp />
    </Suspense>
  );
}
