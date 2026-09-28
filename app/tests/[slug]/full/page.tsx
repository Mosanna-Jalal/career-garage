import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, Icon } from "@/components/icons";
import { AssessmentRunner } from "@/components/assessment/runner";
import { DoodleField, KidWithTrophy } from "@/components/doodles";
import { getAssessment, optionLabels } from "@/lib/assessments/catalog";
import { learnerInstructions, listNote } from "@/lib/assessments/content";
import { getBankItems, toPublic } from "@/lib/assessments/server";
import { isSubscriber } from "@/lib/subscription";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/tests/[slug]/full">
): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = getAssessment(slug);
  return meta ? { title: `Full assessment — ${meta.name}` } : {};
}

export default async function FullAssessmentPage(
  props: PageProps<"/tests/[slug]/full">
) {
  const { slug } = await props.params;
  const meta = getAssessment(slug);
  if (!meta) notFound();
  const items = getBankItems(meta);

  if (!(await isSubscriber())) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <DoodleField variant="hero" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <span className={`inline-flex rounded-3xl p-5 ${meta.tint}`}>
            <Icon name={meta.icon} className="h-10 w-10" />
          </span>
          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-brand-600">For subscribers</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            The full {meta.name} assessment
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
            All {items.length} questions in sequence, scored with the complete Career Garage formula, and a full report
            you can print or save.
          </p>
          <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
            {[
              `All ${items.length} questions on the ${meta.scale === "objective" ? "A–D answer format" : "full response scale"}`,
              `Every ${meta.dimNoun} scored, with bands and near-tie checks`,
              "Strengths, watch-outs and career environments to explore",
              "Development actions and reflection prompts",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-ink/75">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/subscribe"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 font-bold text-white shadow-xl shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-600"
            >
              Subscribe to unlock <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href={`/tests/${meta.slug}/take`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-8 py-4 font-bold text-brand-700 transition hover:border-brand-400"
            >
              Try the free demo first
            </Link>
          </div>
          <p className="mt-8 text-xs text-ink/50">
            Career Garage team?{" "}
            <Link href="/admin/assessments" className="font-semibold text-brand-600 hover:underline">
              Sign in
            </Link>{" "}
            to preview the subscriber experience.
          </p>
          <div className="pointer-events-none mx-auto mt-10 w-fit animate-hop" aria-hidden="true">
            <KidWithTrophy className="h-28 w-20" shirt={meta.color} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-brand-50/70 to-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <AssessmentRunner
          slug={meta.slug}
          name={meta.title}
          mode="full"
          objective={meta.scale === "objective"}
          items={toPublic(items)}
          options={optionLabels(meta)}
          instructions={learnerInstructions}
          note={listNote(meta.id)}
          fullCount={items.length}
          color={meta.color}
        />
      </div>
    </section>
  );
}
