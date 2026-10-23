import {
  careerInterestOptions,
  classOptions,
  interestOptions,
  languageOptions,
  skillOptions,
  stateOptions,
} from "@/lib/connect/options";
import { cleanList, cleanText, type Profile } from "@/lib/members";

/** Validate a profile payload against the Connect option lists. */
export function profileFrom(raw: unknown): Profile {
  const p = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const pick = (v: unknown, opts: string[]) => {
    const s = cleanText(v, 60);
    return s && opts.includes(s) ? s : undefined;
  };
  return {
    className: pick(p.className, classOptions),
    subject: cleanText(p.subject, 60),
    school: cleanText(p.school, 100),
    city: cleanText(p.city, 60),
    state: pick(p.state, stateOptions),
    interests: cleanList(p.interests, interestOptions),
    skills: cleanList(p.skills, skillOptions),
    careerInterests: cleanList(p.careerInterests, careerInterestOptions),
    languages: cleanList(p.languages, languageOptions),
    goal: cleanText(p.goal, 160),
    headline: cleanText(p.headline, 100),
  };
}
