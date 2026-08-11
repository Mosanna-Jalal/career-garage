import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, Icon, SparkIcon } from "@/components/icons";
import { aboutPages, getAboutPage } from "@/lib/about";
import { aboutLinks } from "@/lib/site";

export function generateStaticParams() {
  return aboutPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/about/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getAboutPage(slug);
  if (!page) return {};
  return { title: page.label, description: page.intro[0] };
}

export default async function AboutSubPage(props: PageProps<"/about/[slug]">) {
  const { slug } = await props.params;
  const page = getAboutPage(slug);
  if (!page) notFound();

  return (
    <div className="bg-white">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="pointer-events-none absolute -left-24 top-4 h-64 w-64 animate-blob bg-brand-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 top-32 h-72 w-72 animate-blob bg-accent-200/25 blur-2xl [animation-delay:-4s]" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="inline-flex animate-pop-in items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
            {page.eyebrow}
          </p>
          <h1 className="mt-6 animate-reveal-up text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            {page.headline}{" "}
            {page.headlineAccent && (
              <span className="text-brand-600">{page.headlineAccent}</span>
            )}
          </h1>
          {page.intro.map((p, i) => (
            <p
              key={p}
              className="mt-5 animate-reveal-up text-lg leading-relaxed text-ink/70"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid lg:grid-cols-[15rem_1fr]">
        {/* Sidebar */}
        <aside className="mb-10 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
              About Career Garage
            </p>
            <nav className="mt-3 space-y-1">
              {aboutLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    l.href === `/about/${page.slug}`
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink/70 hover:bg-brand-50 hover:text-brand-700"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Body */}
        <article className="min-w-0">
          {page.blocks.map((block, bi) => (
            <section key={block.heading ?? bi} className="mb-14">
              {block.heading && (
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                  {block.heading}
                </h2>
              )}
              {block.intro && (
                <p className="mt-2 leading-relaxed text-ink/70">{block.intro}</p>
              )}
              {block.paragraphs?.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-ink/75">
                  {p}
                </p>
              ))}

              {block.items && (
                <div className="stagger mt-8 grid gap-5 sm:grid-cols-2">
                  {block.items.map((item) => (
                    <div
                      key={item.title}
                      className="hover-lift rounded-3xl border border-brand-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-brand-900/10"
                    >
                      {item.icon && (
                        <span className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700">
                          <Icon name={item.icon} className="h-6 w-6" />
                        </span>
                      )}
                      <h3 className="text-base font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {page.closing && (
            <div className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-cream p-8">
              {page.closing.map((p) => (
                <p
                  key={p}
                  className="text-lg font-semibold leading-relaxed text-brand-800 [&+p]:mt-3"
                >
                  {p}
                </p>
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
            >
              Create your free account <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/tests"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
            >
              Take an assessment
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
