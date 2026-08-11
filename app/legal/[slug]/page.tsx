import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { policies, getPolicy } from "@/lib/policies";
import { legalLinks } from "@/lib/site";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/legal/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return { title: policy.title, description: policy.summary };
}

export default async function PolicyPage(props: PageProps<"/legal/[slug]">) {
  const { slug } = await props.params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-brand-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {policy.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            {policy.summary}
          </p>
          <p className="mt-4 text-sm font-medium text-ink/50">
            Effective Date: [DD Month YYYY]
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[16rem_1fr]">
        {/* Sidebar */}
        <aside className="mb-10 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
              Policies
            </p>
            <nav className="mt-3 space-y-1">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    l.href === `/legal/${policy.slug}`
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
          {policy.intro.map((p) => (
            <p key={p} className="mb-4 leading-relaxed text-ink/75">
              {p}
            </p>
          ))}

          {policy.blocks.map((block) => (
            <section key={block.heading} className="mt-10">
              <h2 className="text-xl font-extrabold tracking-tight text-ink">
                {block.heading}
              </h2>

              {block.paragraphs?.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-ink/75">
                  {p}
                </p>
              ))}

              {block.items && (
                <ul className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink/75"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {block.groups && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {block.groups.map((g) => (
                    <div
                      key={g.heading}
                      className="rounded-2xl border border-brand-100 bg-cream/60 p-5"
                    >
                      <h3 className="text-sm font-bold text-brand-700">
                        {g.heading}
                      </h3>
                      <ul className="mt-2.5 space-y-1.5">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-ink/70"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {policy.closing && (
            <div className="mt-12 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
              {policy.closing.map((p) => (
                <p
                  key={p}
                  className="text-sm font-medium leading-relaxed text-ink/80 [&+p]:mt-3"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
