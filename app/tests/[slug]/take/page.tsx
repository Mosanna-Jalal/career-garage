import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Quiz } from "@/components/quiz";
import { getTest, tests } from "@/lib/tests";

export function generateStaticParams() {
  return tests.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  props: PageProps<"/tests/[slug]/take">
): Promise<Metadata> {
  const { slug } = await props.params;
  const test = getTest(slug);
  if (!test) return {};
  return { title: `Take the ${test.name}` };
}

export default async function TakeTestPage(
  props: PageProps<"/tests/[slug]/take">
) {
  const { slug } = await props.params;
  const test = getTest(slug);
  if (!test) notFound();

  return (
    <section className="bg-gradient-to-b from-brand-50/60 to-white">
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-wider text-brand-600">
          {test.name}
        </p>
        <div className="mt-8">
          <Quiz test={test} />
        </div>
      </div>
    </section>
  );
}
