import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon } from "@/components/icons";
import {
  enneagramTypes,
  personalityTypes,
  typeGroups,
} from "@/lib/personality-types";

export const metadata: Metadata = {
  title: "Personality Types Explorer",
  description:
    "Explore all 16 personality types and the 9 Enneagram types — strengths, growth areas, careers, and what makes each one tick.",
};

const centerLabels: Record<string, string> = {
  body: "Body Center",
  heart: "Heart Center",
  head: "Head Center",
};

export default function PersonalityTypesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            The personality types
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
            Sixteen four-letter types. Nine Enneagram types. One of each is
            yours. Start exploring — or{" "}
            <Link
              href="/tests/personality-type"
              className="font-semibold text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700"
            >
              take the test
            </Link>{" "}
            to find out for sure.
          </p>
        </div>
      </section>

      {/* 16 types by group */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        {Object.entries(typeGroups).map(([groupKey, group]) => {
          const groupTypes = personalityTypes.filter(
            (t) => t.group === groupKey
          );
          return (
            <div key={groupKey} className="mt-12 first:mt-2">
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                  {group.label}
                </h2>
                <p className="text-sm text-ink/60">{group.blurb}</p>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {groupTypes.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/personality-types/${t.slug}`}
                    className="group rounded-3xl border border-brand-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex rounded-2xl p-3 ${t.tint}`}>
                        <Icon name={t.icon} className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-sm font-extrabold tracking-widest text-ink/40 group-hover:text-brand-600">
                        {t.code}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink group-hover:text-brand-700">
                      {t.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/60">
                      {t.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2">
                      Full profile <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Enneagram */}
      <section id="enneagram" className="mt-16 bg-cream scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            The 9 Enneagram types
          </h2>
          <p className="mt-3 max-w-2xl text-ink/70">
            The Enneagram maps nine core motivations, organized into three
            centers of intelligence.{" "}
            <Link
              href="/tests/enneagram"
              className="font-semibold text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700"
            >
              Take the Enneagram test
            </Link>{" "}
            to find your center.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {enneagramTypes.map((t) => (
              <div
                key={t.slug}
                className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-xl font-extrabold text-brand-700">
                    {t.number}
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{t.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                      {centerLabels[t.center]}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  {t.summary}
                </p>
                <dl className="mt-4 space-y-1.5 text-xs">
                  <div className="flex gap-2">
                    <dt className="font-bold text-brand-700">Core desire:</dt>
                    <dd className="text-ink/60">{t.coreDesire}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-bold text-accent-600">Core fear:</dt>
                    <dd className="text-ink/60">{t.coreFear}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
