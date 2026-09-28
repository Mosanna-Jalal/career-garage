import type { Metadata } from "next";
import { CareerLibrary } from "@/components/career-library/career-library";

export const metadata: Metadata = {
  title: "Career Roadmap — Career Library",
  description:
    "Explore careers, pathways, courses, exams, skills and future opportunities in one career discovery library.",
};

/** Students & Parents → Career Roadmap: the Career Garage Career Library. */
export default function CareerRoadmapPage() {
  return <CareerLibrary />;
}
