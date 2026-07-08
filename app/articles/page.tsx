import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon } from "@/components/icons";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles on Personality, Careers & Relationships",
  description:
    "Practical, research-informed writing on personality types, career fit, teams, and relationships.",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Articles
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Practical writing on personality, career fit, teams, and
            relationships — grounded in research, translated for real life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Featured */}
        <Link
          href={`/articles/${featured.slug}`}
          className="group grid gap-8 rounded-3xl border border-brand-100 bg-white p-8 shadow-sm transition hover:shadow-xl hover:shadow-brand-900/10 md:grid-cols-[1fr_1.6fr] md:p-10"
        >
          <div
            className={`flex items-center justify-center rounded-3xl ${featured.tint} min-h-48`}
          >
            <Icon
              name={featured.icon}
              className="h-20 w-20 animate-float opacity-80"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Featured · {featured.category}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-ink group-hover:text-brand-700 sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink/60">
              {featured.excerpt}
            </p>
            <p className="mt-4 text-xs text-ink/50">
              {formatDate(featured.date)} · {featured.readMinutes} min read
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all group-hover:gap-3">
              Read article <ArrowRightIcon className="h-4 w-4" />
            </span>
          </div>
        </Link>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group flex flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
            >
              <span className={`inline-flex w-fit rounded-2xl p-3 ${a.tint}`}>
                <Icon name={a.icon} className="h-6 w-6" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-600">
                {a.category}
              </p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-ink group-hover:text-brand-700">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/60">
                {a.excerpt}
              </p>
              <p className="mt-auto pt-4 text-xs text-ink/50">
                {formatDate(a.date)} · {a.readMinutes} min read
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
