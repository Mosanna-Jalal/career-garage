import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon, SparkIcon } from "@/components/icons";
import { registerRoles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Log in or sign up",
  description:
    "Create a Career Garage account as a student, parent, educator, institution, counsellor or skill trainer.",
};

const flow = [
  {
    step: "Create Account",
    items: ["Name", "Mobile number", "Email address", "Password", "OTP verification"],
  },
  {
    step: "Academic Profile",
    items: ["Class / grade", "School or college", "Board", "Stream"],
  },
  {
    step: "Career Profile",
    items: ["Career interests", "Skills", "Goals", "Preferred language"],
  },
  {
    step: "Parent Link",
    items: ["Add parent / guardian details", "Send invitation or verify via OTP"],
  },
  {
    step: "Dashboard Setup",
    items: [
      "Recommended assessments",
      "Suggested mentors and counsellors",
      "Personalised career roadmap",
    ],
  },
];

export default function RegisterPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
            Login / Sign Up
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Tell us who you are, and{" "}
            <span className="text-brand-600">we&apos;ll do the rest.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Career Garage supports six kinds of account, each with its own
            dashboard. Pick the one that fits you — registration takes a few
            minutes and you can finish your profile later.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">
          Choose your account type
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {registerRoles.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="group flex flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
            >
              {role.icon && (
                <span className="inline-flex w-fit rounded-2xl bg-brand-50 p-3.5 text-brand-700 transition group-hover:scale-110 group-hover:bg-brand-100">
                  <Icon name={role.icon} className="h-7 w-7" />
                </span>
              )}
              <h3 className="mt-4 text-lg font-bold text-ink group-hover:text-brand-700">
                {role.label}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                {role.blurb}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {role.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Register <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            How registration works
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
            A short multi-step flow, so you are never faced with one enormous
            form. Each step saves as you go.
          </p>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {flow.map((f, i) => (
              <li
                key={f.step}
                className="relative rounded-2xl bg-white p-6 shadow-sm"
              >
                <span className="absolute -top-3 left-6 rounded-full bg-accent-500 px-3 py-0.5 text-xs font-bold text-white">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-base font-bold text-ink">{f.step}</h3>
                <ul className="mt-3 space-y-1.5">
                  {f.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-ink/70"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
