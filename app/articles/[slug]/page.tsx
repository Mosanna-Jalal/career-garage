import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon } from "@/components/icons";
import { articles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/articles/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage(
  props: PageProps<"/articles/[slug]">
) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <header>
          <span className={`inline-flex rounded-2xl p-3.5 ${article.tint}`}>
            <Icon name={article.icon} className="h-7 w-7" />
          </span>
          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-600">
            {article.category}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-ink/50">
            {formatDate(article.date)} · {article.readMinutes} min read · Career
            Garage Editorial
          </p>
        </header>

        <div className="mt-10">
          {article.body.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="mt-10 text-xl font-extrabold tracking-tight text-ink">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 32)}
                  className="mt-4 leading-relaxed text-ink/75"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-brand-50 p-8 text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            Curious where you land?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
            Take a free assessment and turn this article into personal insight.
          </p>
          <Link
            href="/tests"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
          >
            Browse the tests <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </article>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            Keep reading
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {more.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group flex flex-col rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  {a.category}
                </p>
                <h3 className="mt-2 font-bold leading-snug text-ink group-hover:text-brand-700">
                  {a.title}
                </h3>
                <p className="mt-auto pt-3 text-xs text-ink/50">
                  {a.readMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
