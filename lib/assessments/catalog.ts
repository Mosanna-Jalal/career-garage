import type { IconName } from "@/components/icons";

/**
 * The twelve Career Garage assessment programmes built from the handbooks and
 * the 772-item master question bank. Leadership Potential (Q713–772) keeps its
 * earlier test for now.
 *
 * Scoring rules (minimums, ranking, ties) follow the 13-Assessment Technical
 * Specification Manual and each handbook's scoring pseudocode.
 */

export type ScaleKind =
  | "agreement"
  | "interest"
  | "importance"
  | "confidence"
  | "objective";

/**
 * independent — every dimension reported separately, no ranking claims
 * ranked      — all dimensions ranked with near-tie groups
 * topThree    — ranked, top three highlighted, near ties flagged
 * pairs       — MBTI-style pole pairs with clarity and an X-able code
 * objective   — right/wrong items, domain and total percentages
 */
export type ScoringMode =
  | "independent"
  | "ranked"
  | "topThree"
  | "pairs"
  | "objective";

export type AssessmentMeta = {
  slug: string;
  /** question-bank programme id, e.g. CG-BF */
  id: string;
  name: string;
  /** page heading */
  title: string;
  tagline: string;
  icon: IconName;
  /** hex used by doodles and charts */
  color: string;
  /** tailwind classes for icon tiles */
  tint: string;
  category: "personality" | "career" | "skills";
  range: [number, number];
  minutes: string;
  scale: ScaleKind;
  mode: ScoringMode;
  /** minimum answered items per dimension (per pole for MBTI) */
  minPerDim: number;
  /** minimum answered items overall for a complete profile */
  minOverall?: number;
  /** what one scored dimension is called in the report */
  dimNoun: string;
  /** dimension codes in handbook order */
  dims: string[];
  /** default ten-question demo set (item ids), used until an admin edits it */
  demo: string[];
};

export const scaleLabels: Record<Exclude<ScaleKind, "objective">, string[]> = {
  agreement: ["Strongly Disagree", "Disagree", "Not Sure", "Agree", "Strongly Agree"],
  interest: ["Strongly Dislike", "Dislike", "Not Sure", "Like", "Strongly Like"],
  importance: [
    "Not Important",
    "Slightly Important",
    "Moderately Important",
    "Very Important",
    "Extremely Important",
  ],
  confidence: [
    "Not Confident",
    "Slightly Confident",
    "Moderately Confident",
    "Confident",
    "Very Confident",
  ],
};

const ids = (prefix: string, list: string) =>
  list.split(" ").map((s) => `${prefix}-${s}`);

export const assessments: AssessmentMeta[] = [
  {
    slug: "big-five",
    id: "CG-BF",
    name: "Big Five (OCEAN)",
    title: "Big Five (OCEAN) Personality Assessment",
    tagline:
      "Five broad personality continua — Openness, Conscientiousness, Extraversion, Agreeableness and Emotional Reactivity — scored as tendencies, never boxes.",
    icon: "chart",
    color: "#29a29d",
    tint: "bg-brand-100 text-brand-700",
    category: "personality",
    range: [1, 60],
    minutes: "12–15",
    scale: "agreement",
    mode: "independent",
    minPerDim: 10,
    dimNoun: "trait",
    dims: ["OPE", "CON", "EXT", "AGR", "EMR"],
    demo: ids("CG-BF", "OPE-01 OPE-10 CON-01 CON-10 EXT-01 EXT-10 AGR-01 AGR-10 EMR-01 EMR-10"),
  },
  {
    slug: "mbti",
    id: "CG-MB",
    name: "16 Types (MBTI-style)",
    title: "16 Types — Four-Dimension Preferences Assessment",
    tagline:
      "Four paired preferences — Social Energy, Information Focus, Decision Approach and Lifestyle Structure — with honest clarity scores and an X when the evidence is balanced.",
    icon: "puzzle",
    color: "#7c5cff",
    tint: "bg-violet-100 text-violet-700",
    category: "personality",
    range: [61, 124],
    minutes: "12–18",
    scale: "agreement",
    mode: "pairs",
    minPerDim: 7,
    dimNoun: "preference",
    dims: ["E", "I", "S", "N", "T", "F", "J", "P"],
    demo: ids(
      "CG-MB",
      "SE-E-01 SE-E-02 SE-I-01 SE-I-02 IF-S-01 IF-N-01 DA-T-01 DA-F-01 LS-J-01 LS-P-01"
    ),
  },
  {
    slug: "enneagram",
    id: "CG-EN",
    name: "Enneagram-inspired",
    title: "Nine Motivation Patterns (Enneagram-inspired)",
    tagline:
      "Nine original motivation patterns explored as continuous scores, with your top three as discussion priorities — never a fixed type.",
    icon: "target",
    color: "#fe4711",
    tint: "bg-accent-100 text-accent-700",
    category: "personality",
    range: [125, 196],
    minutes: "12–16",
    scale: "agreement",
    mode: "topThree",
    minPerDim: 7,
    minOverall: 63,
    dimNoun: "pattern",
    dims: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"],
    demo: ids("CG-EN", "P1-01 P2-01 P3-01 P4-01 P5-01 P6-01 P7-01 P7-02 P8-01 P9-01"),
  },
  {
    slug: "riasec",
    id: "CG-RI",
    name: "RIASEC (Holland)",
    title: "RIASEC Career Interest Assessment",
    tagline:
      "Six career-interest themes — Realistic, Investigative, Artistic, Social, Enterprising and Conventional — and a top-three interest code to explore.",
    icon: "compass",
    color: "#2f6fd6",
    tint: "bg-sky-100 text-sky-700",
    category: "career",
    range: [197, 256],
    minutes: "10–15",
    scale: "interest",
    mode: "topThree",
    minPerDim: 9,
    minOverall: 54,
    dimNoun: "theme",
    dims: ["R", "I", "A", "S", "E", "C"],
    demo: ids("CG-RI", "R-01 R-02 I-01 A-01 A-02 S-01 S-02 E-01 E-02 C-01"),
  },
  {
    slug: "disc",
    id: "CG-DS",
    name: "DISC-style",
    title: "Four Work-Style Dimensions (DISC-style)",
    tagline:
      "How you approach shared work — Directing, Engaging, Stabilising and Systematic — with every dimension kept visible.",
    icon: "trending",
    color: "#c68a2c",
    tint: "bg-amber-100 text-amber-700",
    category: "career",
    range: [257, 304],
    minutes: "8–12",
    scale: "agreement",
    mode: "ranked",
    minPerDim: 11,
    minOverall: 44,
    dimNoun: "work style",
    dims: ["DIR", "ENG", "STA", "SYS"],
    demo: ids("CG-DS", "DIR-01 DIR-02 DIR-10 ENG-01 ENG-02 STA-01 STA-02 SYS-01 SYS-02 SYS-10"),
  },
  {
    slug: "emotional-intelligence",
    id: "CG-EI",
    name: "Emotional Intelligence",
    title: "Emotional Intelligence Assessment",
    tagline:
      "Five emotional competencies — self-awareness, self-regulation, internal motivation, empathy and relationship management — as a development profile.",
    icon: "heart",
    color: "#e0457b",
    tint: "bg-rose-100 text-rose-600",
    category: "personality",
    range: [305, 364],
    minutes: "10–15",
    scale: "agreement",
    mode: "independent",
    minPerDim: 11,
    minOverall: 55,
    dimNoun: "competency",
    dims: ["SAW", "SRG", "IMO", "EMP", "RMG"],
    demo: ids("CG-EI", "SAW-01 SAW-10 SRG-01 SRG-10 IMO-01 IMO-10 EMP-01 EMP-10 RMG-01 RMG-10"),
  },
  {
    slug: "work-values",
    id: "CG-WV",
    name: "Work Values",
    title: "Work Values Assessment",
    tagline:
      "Six priorities for meaningful work — achievement, autonomy, security, impact, relationships and growth — ranked to support real decisions.",
    icon: "scale",
    color: "#1e8280",
    tint: "bg-emerald-100 text-emerald-700",
    category: "career",
    range: [365, 424],
    minutes: "10–15",
    scale: "importance",
    mode: "ranked",
    minPerDim: 9,
    minOverall: 54,
    dimNoun: "value",
    dims: ["ACH", "AUT", "SEC", "IMP", "REL", "GRV"],
    demo: ids("CG-WV", "ACH-01 ACH-02 AUT-01 AUT-02 SEC-01 SEC-02 IMP-01 IMP-02 REL-01 GRV-01"),
  },
  {
    slug: "cognitive-aptitude",
    id: "CG-CA",
    name: "Cognitive Aptitude",
    title: "Cognitive Aptitude Profile",
    tagline:
      "Sixty objective reasoning questions across verbal, numerical, logical, spatial, data and accuracy domains — performance evidence, never an IQ.",
    icon: "lightbulb",
    color: "#16323a",
    tint: "bg-slate-100 text-slate-700",
    category: "skills",
    range: [425, 484],
    minutes: "25–35",
    scale: "objective",
    mode: "objective",
    minPerDim: 8,
    minOverall: 60,
    dimNoun: "domain",
    dims: ["VER", "NUM", "LOG", "SPA", "DAT", "ATT"],
    demo: ids("CG-CA", "VER-01 VER-02 NUM-01 NUM-03 LOG-01 LOG-07 SPA-01 SPA-06 DAT-01 ATT-02"),
  },
  {
    slug: "learning-preferences",
    id: "CG-LP",
    name: "Learning Preferences",
    title: "Learning Preferences Profile",
    tagline:
      "Four flexible ways of learning — visual organisation, verbal explanation, active experience and reflective structure — to build a study toolkit, not a label.",
    icon: "book",
    color: "#8a5cf6",
    tint: "bg-indigo-100 text-indigo-700",
    category: "skills",
    range: [485, 532],
    minutes: "8–12",
    scale: "agreement",
    mode: "ranked",
    minPerDim: 10,
    minOverall: 42,
    dimNoun: "preference",
    dims: ["VIS", "VER", "ACT", "REF"],
    demo: ids("CG-LP", "VIS-01 VIS-02 VIS-10 VER-01 VER-02 ACT-01 ACT-02 ACT-10 REF-01 REF-02"),
  },
  {
    slug: "entrepreneurial-mindset",
    id: "CG-EM",
    name: "Entrepreneurial Mindset",
    title: "Entrepreneurial Mindset Assessment",
    tagline:
      "Six enterprise and innovation dimensions — from spotting opportunities to understanding customers — as a practical development profile.",
    icon: "spark",
    color: "#ef2d07",
    tint: "bg-orange-100 text-orange-700",
    category: "skills",
    range: [533, 592],
    minutes: "10–15",
    scale: "agreement",
    mode: "independent",
    minPerDim: 9,
    minOverall: 54,
    dimNoun: "dimension",
    dims: ["OPR", "INI", "RJK", "RES", "RSF", "CUS"],
    demo: ids("CG-EM", "OPR-01 OPR-02 INI-01 INI-02 RJK-01 RJK-02 RES-01 RES-02 RSF-01 CUS-01"),
  },
  {
    slug: "digital-skills-readiness",
    id: "CG-DR",
    name: "Digital Skills Readiness",
    title: "Digital Skills Readiness Assessment",
    tagline:
      "Six practical digital-readiness domains — information, collaboration, creation, safety, problem solving and AI literacy.",
    icon: "globe",
    color: "#0e7490",
    tint: "bg-cyan-100 text-cyan-700",
    category: "skills",
    range: [593, 652],
    minutes: "10–15",
    scale: "confidence",
    mode: "independent",
    minPerDim: 9,
    minOverall: 54,
    dimNoun: "domain",
    dims: ["IDL", "DCC", "DCR", "DSP", "DPS", "AIL"],
    demo: ids("CG-DR", "IDL-01 IDL-02 DCC-01 DCC-02 DCR-01 DCR-03 DSP-01 DSP-03 DPS-01 AIL-01"),
  },
  {
    slug: "career-readiness",
    id: "CG-CR",
    name: "Career Readiness",
    title: "Career Readiness Assessment",
    tagline:
      "Six career-management dimensions — know yourself, explore, decide, build employability, prepare for opportunities and plan action.",
    icon: "briefcase",
    color: "#1c6867",
    tint: "bg-teal-100 text-teal-700",
    category: "career",
    range: [653, 712],
    minutes: "10–15",
    scale: "agreement",
    mode: "independent",
    minPerDim: 9,
    minOverall: 54,
    dimNoun: "dimension",
    dims: ["CSA", "CEX", "CDM", "CES", "COP", "CAP"],
    demo: ids("CG-CR", "CSA-01 CSA-02 CEX-01 CEX-02 CDM-01 CDM-02 CES-01 CES-04 COP-01 CAP-01"),
  },
];

export function getAssessment(slug: string): AssessmentMeta | undefined {
  return assessments.find((a) => a.slug === slug);
}

export const assessmentCategories: {
  id: AssessmentMeta["category"];
  label: string;
  blurb: string;
}[] = [
  {
    id: "personality",
    label: "Personality & motivation",
    blurb: "How you tend to think, feel, decide and what keeps you going.",
  },
  {
    id: "career",
    label: "Interests, values & work style",
    blurb: "What attracts you, what matters to you and how you work with others.",
  },
  {
    id: "skills",
    label: "Skills, learning & readiness",
    blurb: "How you reason, learn and prepare for real opportunities.",
  },
];

/** Question labels shown in the runner for every Likert-style scale. */
export function optionLabels(meta: AssessmentMeta): string[] {
  return meta.scale === "objective" ? ["A", "B", "C", "D"] : scaleLabels[meta.scale];
}
