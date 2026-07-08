import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon } from "@/components/icons";
import { testCategories, tests } from "@/lib/tests";

export const metadata: Metadata = {
  title: "All Personality & Career Tests",
  description:
    "Browse every free assessment on Career Garage: personality type, Enneagram, Big Five, career interests, working style, love styles, and leadership.",
};

export default function TestsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Personality &amp; career tests
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
            Every test is free, takes minutes, and ends with results you can
            use the same day. Pick the question you most want answered.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {testCategories.map((cat) => {
          const catTests = tests.filter((t) => t.category === cat.id);
          if (catTests.length === 0) return null;
          return (
            <div key={cat.id} className="mt-14 first:mt-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                {cat.label}
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {catTests.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tests/${t.slug}`}
                    className="group flex flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`inline-flex rounded-2xl p-3.5 ${t.tint} transition group-hover:scale-110`}
                      >
                        <Icon name={t.icon} className="h-7 w-7" />
                      </span>
                      {t.popular && (
                        <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-700">
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-ink group-hover:text-brand-700">
                      {t.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">
                      {t.tagline}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <p className="flex items-center gap-3 text-xs font-semibold text-ink/50">
                        <span>{t.minutes} min</span>
                        <span className="h-1 w-1 rounded-full bg-ink/30" />
                        <span>{t.questions.length} questions</span>
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                        Take test <ArrowRightIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
