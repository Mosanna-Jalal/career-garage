import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginPanel } from "@/components/auth/login-panel";
import { DoodleField } from "@/components/doodles";
import { currentMember } from "@/lib/members";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function LoginPage(props: PageProps<"/login">) {
  const sp = await props.searchParams;
  const next = typeof sp.next === "string" && sp.next.startsWith("/") && !sp.next.startsWith("//") ? sp.next : "/dashboard";
  if (await currentMember()) redirect(next);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <DoodleField variant="hero" />
      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-ink">Welcome back</h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink/65">
          Your dashboard, communities and Career Points are waiting.
        </p>
        <div className="mt-10">
          <LoginPanel next={next} />
        </div>
      </div>
    </section>
  );
}
