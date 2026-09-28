import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Quiz } from "@/components/quiz";
import { AssessmentRunner } from "@/components/assessment/runner";
import { getTest } from "@/lib/tests";
import { getAssessment, optionLabels } from "@/lib/assessments/catalog";
import { learnerInstructions, listNote } from "@/lib/assessments/content";
import { getBankItems, getTrialItems, toPublic } from "@/lib/assessments/server";

/** The demo set is editable from the admin panel, so read it per request. */
export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/tests/[slug]/take">
): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = getAssessment(slug);
  if (meta) return { title: `Free demo — ${meta.name}` };
  const test = getTest(slug);
  if (!test) return {};
  return { title: `Take the ${test.name}` };
}

export default async function TakeTestPage(
  props: PageProps<"/tests/[slug]/take">
) {
  const { slug } = await props.params;

  const meta = getAssessment(slug);
  if (meta) {
    const items = await getTrialItems(meta);
    return (
      <section className="min-h-[80vh] bg-gradient-to-b from-brand-50/70 to-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <AssessmentRunner
            slug={meta.slug}
            name={meta.title}
            mode="demo"
            objective={meta.scale === "objective"}
            items={toPublic(items)}
            options={optionLabels(meta)}
            instructions={learnerInstructions}
            note={listNote(meta.id)}
            fullCount={getBankItems(meta).length}
            color={meta.color}
          />
        </div>
      </section>
    );
  }

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
