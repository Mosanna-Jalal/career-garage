import type { Metadata } from "next";
import faq from "@/lib/site-content/faq.json";
import { FaqExplorer, type FaqSection } from "@/components/faq-explorer";
import { DoodleField } from "@/components/doodles";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "400 questions and answers about Career Garage — assessments, counselling, mentorship, courses, internships, Connect, privacy and more.",
};

export default function FaqPage() {
  const sections = faq.sections as FaqSection[];
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <DoodleField variant="hero" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <p className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            {sections.length} categories · 400 answers
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Frequently asked questions</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
            Everything people ask about Career Garage — from assessments and counselling to Connect, privacy and pricing.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <FaqExplorer sections={sections} />
      </section>
    </>
  );
}
