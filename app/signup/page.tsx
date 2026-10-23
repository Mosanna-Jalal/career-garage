import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { DoodleField } from "@/components/doodles";

export const metadata: Metadata = { title: "Create your account" };

export default async function SignupPage(props: PageProps<"/signup">) {
  const sp = await props.searchParams;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <DoodleField variant="hero" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink">Create your Career Garage account</h1>
        <p className="mt-3 text-ink/65">
          One account for your dashboard, Career Garage Connect communities and Career Points.
        </p>
        <div className="mt-10">
          <SignupForm initialRole={typeof sp.role === "string" ? sp.role : undefined} />
        </div>
      </div>
    </section>
  );
}
