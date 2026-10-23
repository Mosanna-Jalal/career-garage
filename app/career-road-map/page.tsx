import type { Metadata } from "next";
import Link from "next/link";
import { CareerLibrary } from "@/components/career-library/career-library";

export const metadata: Metadata = {
  title: "Career Roadmap — Career Library",
  description:
    "Explore careers, pathways, courses, exams, skills and future opportunities in one career discovery library.",
};

/** Students & Parents → Career Roadmap: the Career Garage Career Library. */
export default function CareerRoadmapPage() {
  return (
    <>
      <Link
        href="/careers"
        className="block bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white hover:from-brand-700"
      >
        New: explore 570 careers in 57 interest areas — courses, entrance exams and counselling notes →
      </Link>
      <CareerLibrary />
    </>
  );
}
