import fs from "node:fs";
import path from "node:path";

/**
 * Career Garage Career Library 570 (site Contents/Career Library/
 * career_garage_library_570/career_garage_master_570.json): 570 careers in
 * 57 interest areas. ~8 MB, so it is read from disk once on the server
 * instead of being bundled.
 */

export type Career = {
  career_id: string;
  slug: string;
  name: string;
  category: string;
  meta_family: string;
  recommended_stream: string;
  work_environment: string;
  future_outlook: string;
  demand: string;
  competition: string;
  remote_potential: string;
  freelance_potential: string;
  entrepreneurship_potential: string;
  summary: string;
  core_focus: string;
  what_you_do: string[];
  day_in_life: string[];
  specialisations: string[];
  professional_opportunities: Record<string, string>;
  career_path: { stage: string; detail: string }[];
  alternate_routes: string[];
  subject_importance: Record<string, string>;
  ug_courses: string[];
  pg_courses: string[];
  certifications: string[];
  entrance_exams: string[];
  eligibility: string;
  representative_india_institutes: string[];
  representative_abroad_institutes: string[];
  education_cost_india: string;
  education_cost_abroad: string;
  scholarship_routes: string[];
  salary_india: { early_career: string; mid_career: string; senior: string };
  international_salary_note: string;
  recruiter_types: string[];
  technical_skills: string[];
  soft_skills: string[];
  riasec: string;
  personality_fit_indicators: string[];
  assessment_match_dimensions: string[];
  pros: string[];
  cons: string[];
  who_should_choose: string[];
  who_should_think_carefully: string[];
  ai_impact_label: string;
  ai_impact: string;
  future_opportunities: string[];
  internship_ideas: string[];
  training_ideas: string[];
  mentor_types: string[];
  faqs: { q: string; a: string }[];
  related_careers: string[];
  editorial_note: string;
  last_editorial_review: string;
};

type Library = { disclaimer: string; generated_on: string; categories: { name: string; career_count: number; careers: string[] }[]; careers: Career[] };

let cache: Library | null = null;
function lib(): Library {
  if (!cache) {
    cache = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "career-library-570.json"), "utf8")) as Library;
  }
  return cache;
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** The 14 meta families used to group interest areas and pick illustrations. */
export const families: Record<string, { label: string; color: string; blurb: string }> = {
  technology: { label: "Technology", color: "#2f6fd6", blurb: "Code, data, AI and the systems behind modern life" },
  engineering: { label: "Engineering", color: "#c68a2c", blurb: "Design, build and improve machines, structures and energy" },
  healthcare: { label: "Healthcare", color: "#e0457b", blurb: "Care for people's health, from clinics to labs" },
  science: { label: "Science", color: "#29a29d", blurb: "Discover how living things, the planet and matter work" },
  business: { label: "Business & Finance", color: "#7c5cff", blurb: "Money, markets, strategy, marketing and people" },
  law: { label: "Law & Governance", color: "#16323a", blurb: "Justice, rules, rights and compliance" },
  public: { label: "Public Service", color: "#1c6867", blurb: "Government, defence, diplomacy and policy" },
  education: { label: "Education & Research", color: "#0e7490", blurb: "Teach, research and share knowledge" },
  design: { label: "Design", color: "#fe4711", blurb: "Spaces, products, fashion and experiences" },
  creative: { label: "Media & Creative Arts", color: "#8a5cf6", blurb: "Stories, film, music, games and performance" },
  service: { label: "Hospitality, Sport & Logistics", color: "#ef8a07", blurb: "Travel, events, fitness and moving the world" },
  maritime: { label: "Maritime", color: "#0b5ea8", blurb: "Ships, ports and life at sea" },
  social: { label: "Social Impact", color: "#d0466f", blurb: "Communities, development and change" },
  vocational: { label: "Skilled Trades", color: "#7a5a2e", blurb: "Hands-on technical services and crafts" },
};

export type Area = { name: string; slug: string; family: string; count: number; outlook: Record<string, number>; careers: { name: string; slug: string; outlook: string }[] };

export function areas(): Area[] {
  const l = lib();
  return l.categories.map((c) => {
    const careers = l.careers.filter((x) => x.category === c.name);
    const outlook: Record<string, number> = {};
    careers.forEach((x) => (outlook[x.future_outlook] = (outlook[x.future_outlook] ?? 0) + 1));
    return {
      name: c.name,
      slug: slugify(c.name),
      family: careers[0]?.meta_family ?? "vocational",
      count: careers.length,
      outlook,
      careers: careers.map((x) => ({ name: x.name, slug: x.slug, outlook: x.future_outlook })),
    };
  });
}

export function area(slug: string) {
  const a = areas().find((x) => x.slug === slug);
  if (!a) return undefined;
  return { ...a, full: lib().careers.filter((x) => x.category === a.name) };
}

export function career(slug: string) {
  return lib().careers.find((c) => c.slug === slug);
}

export function careerByName(name: string) {
  return lib().careers.find((c) => c.name === name);
}

export function libraryNote() {
  return lib().disclaimer;
}

/** Lightweight index for client-side search. */
export function searchIndex() {
  return lib().careers.map((c) => ({ n: c.name, s: c.slug, a: slugify(c.category), c: c.category }));
}
