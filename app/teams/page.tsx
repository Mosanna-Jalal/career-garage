import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  ChartIcon,
  ChatIcon,
  CheckIcon,
  ClipboardIcon,
  HandshakeIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Career Garage for Teams",
  description:
    "Bring personality-aware collaboration to your team: shared assessments, team maps, and facilitation guides for managers.",
};

const features = [
  {
    icon: UsersIcon,
    title: "Team personality map",
    text: "See your whole team's working styles on one shared dashboard — who processes out loud, who needs the pre-read, who holds the quality bar.",
  },
  {
    icon: ChatIcon,
    title: "Facilitation guides",
    text: "Ready-to-run workshop scripts turn results into an honest, useful team conversation — no organizational psychologist required.",
  },
  {
    icon: ChartIcon,
    title: "Friction forecasts",
    text: "Pairwise style comparisons flag where collaboration is likely to grind — planner vs. improviser, driver vs. analyst — before it costs you a quarter.",
  },
  {
    icon: ClipboardIcon,
    title: "Manager playbooks",
    text: "Per-person guidance on feedback, delegation, and motivation, tailored to how each teammate is wired.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    blurb: "For small teams who want to try personality-aware collaboration.",
    highlights: [
      "Up to 5 team members",
      "All 7 assessments",
      "Basic team overview",
      "Community support",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Team",
    price: "$6",
    period: "per member / month",
    blurb: "For managers who want the full toolkit, meeting-ready.",
    highlights: [
      "Unlimited team members",
      "Full team personality map",
      "Facilitation guides & workshop kits",
      "Friction forecasts & pairing tips",
      "Manager playbooks",
      "Priority support",
    ],
    cta: "Start a trial",
    featured: true,
  },
  {
    name: "Organization",
    price: "Custom",
    period: "annual billing",
    blurb: "For companies rolling out across departments.",
    highlights: [
      "Everything in Team",
      "SSO & admin controls",
      "Org-level analytics",
      "Onboarding & live training",
      "Dedicated success manager",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export default function TeamsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 animate-blob bg-brand-600/30 blur-2xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 animate-blob bg-accent-500/20 blur-2xl [animation-delay:-6s]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-700 bg-brand-900/60 px-4 py-1.5 text-xs font-semibold text-brand-200">
              <HandshakeIcon className="h-4 w-4 text-accent-400" />
              Career Garage for Teams
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Most team friction is a{" "}
              <span className="text-brand-400">wiring mismatch</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100/80">
              Give your team a shared language for how each person thinks,
              decides, and communicates — and watch the &ldquo;personality
              conflicts&rdquo; turn into complementary strengths.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-bold text-white shadow-xl shadow-accent-500/30 transition hover:bg-accent-600"
              >
                See pricing <ArrowRightIcon className="h-5 w-5" />
              </a>
              <Link
                href="/tests/workstyle-compass"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-700 px-7 py-3.5 font-semibold text-brand-100 transition hover:border-brand-500 hover:bg-brand-900"
              >
                Try the workstyle test
              </Link>
            </div>
          </div>

          {/* Animated team-map illustration in place of a product screenshot */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl bg-white/5 p-8 backdrop-blur">
              <p className="text-sm font-bold text-brand-100">
                Team workstyle map
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { name: "Ada", style: "Driver", tint: "bg-emerald-400/20 text-emerald-300", pct: "38%" },
                  { name: "Ben", style: "Analyst", tint: "bg-sky-400/20 text-sky-300", pct: "27%" },
                  { name: "Chloe", style: "Energizer", tint: "bg-amber-400/20 text-amber-300", pct: "21%" },
                  { name: "Dev", style: "Anchor", tint: "bg-violet-400/20 text-violet-300", pct: "14%" },
                ].map((m, i) => (
                  <div
                    key={m.name}
                    className={`animate-fade-up rounded-2xl p-4 ${m.tint} delay-${(i + 1) * 100}`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold">
                      {m.name[0]}
                    </span>
                    <p className="mt-2 text-sm font-bold text-white">{m.name}</p>
                    <p className="text-xs opacity-90">{m.style}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-white/10 p-4 text-xs leading-relaxed text-brand-100/80">
                <span className="font-bold text-white">Pairing tip:</span> Ada
                decides fast; Ben verifies deeply. Agree on a
                &ldquo;decision-by&rdquo; date so speed and rigor both get their
                turn.
              </div>
            </div>
            <div className="absolute -right-4 -top-4 animate-float rounded-2xl bg-brand-500 p-3 shadow-xl">
              <UsersIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Everything a manager needs
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink/70">
          From individual insight to team-level tools, in one place.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-brand-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="inline-flex rounded-2xl bg-brand-100 p-3.5 text-brand-700">
                <f.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Simple pricing
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
            Individuals always test free. Teams pay for the tools around the
            tests.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl p-8 ${
                  tier.featured
                    ? "bg-brand-950 text-white shadow-2xl shadow-brand-900/30 lg:-translate-y-3"
                    : "border border-brand-100 bg-white text-ink shadow-sm"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <p
                  className={`mt-1 text-sm ${tier.featured ? "text-brand-200/80" : "text-ink/60"}`}
                >
                  {tier.blurb}
                </p>
                <p className="mt-6">
                  <span className="text-4xl font-extrabold">{tier.price}</span>{" "}
                  <span
                    className={`text-sm ${tier.featured ? "text-brand-200/70" : "text-ink/50"}`}
                  >
                    {tier.period}
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 rounded-full p-1 ${
                          tier.featured
                            ? "bg-brand-500/30 text-brand-300"
                            : "bg-brand-100 text-brand-700"
                        }`}
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className={`text-sm ${tier.featured ? "text-brand-100/90" : "text-ink/70"}`}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 rounded-full px-6 py-3.5 font-bold transition ${
                    tier.featured
                      ? "bg-accent-500 text-white hover:bg-accent-600"
                      : "border-2 border-brand-200 text-brand-700 hover:border-brand-400 hover:bg-brand-50"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-ink/50">
            Demo pricing for illustration — this is a portfolio project, not a
            live service.
          </p>
        </div>
      </section>
    </>
  );
}
