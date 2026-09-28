import type { IconName } from "@/components/icons";

/**
 * A unipolar scale: each answer adds points toward one scale.
 * Result shows ranked percentage bars; the top scale defines the headline result.
 */
export type Scale = {
  id: string;
  label: string;
  icon: IconName;
  blurb: string;
};

/**
 * A bipolar axis: answers push toward the left or right pole.
 * Used by the type indicator to build a four-letter code.
 */
export type Axis = {
  id: string;
  left: { code: string; label: string; blurb: string };
  right: { code: string; label: string; blurb: string };
};

export type Question = {
  text: string;
  /** id of the Scale or Axis this question feeds */
  key: string;
  /** for bipolar axes: 1 = agreement pushes right pole, -1 = pushes left pole */
  dir?: 1 | -1;
};

export type Test = {
  slug: string;
  name: string;
  tagline: string;
  minutes: number;
  icon: IconName;
  /** tailwind classes for the card tile */
  tint: string;
  popular?: boolean;
  category: "personality" | "career" | "relationships";
  description: string[];
  measures: string[];
  kind: "scales" | "axes";
  scales?: Scale[];
  axes?: Axis[];
  questions: Question[];
  resultHeading: string;
};

export const tests: Test[] = [
  {
    slug: "love-styles",
    name: "Love Styles Test",
    tagline:
      "Understand how you naturally give and want to receive care in close relationships.",
    minutes: 6,
    icon: "heart",
    tint: "bg-rose-100 text-rose-600",
    category: "relationships",
    description: [
      "People express and register affection in noticeably different ways: through words, through time and presence, through acts of practical support, or through physical warmth. Mismatches here are a classic source of 'I do so much and they don't notice.'",
      "This test surfaces your primary and secondary styles so you and the people close to you can meet each other where it actually counts.",
    ],
    measures: [
      "Your primary way of feeling loved",
      "How you instinctively show care",
      "Where mismatches with a partner may hide",
      "Small changes with outsized impact",
    ],
    kind: "scales",
    scales: [
      {
        id: "words",
        label: "Words & Affirmation",
        icon: "chat",
        blurb: "Compliments, encouragement, and hearing it said out loud land deepest for you.",
      },
      {
        id: "time",
        label: "Presence & Time",
        icon: "smile",
        blurb: "Undivided attention — real conversation, shared rituals, phones face-down.",
      },
      {
        id: "support",
        label: "Acts of Support",
        icon: "handshake",
        blurb: "Someone quietly handling something for you says more than any card could.",
      },
      {
        id: "warmth",
        label: "Physical Warmth",
        icon: "heart",
        blurb: "Closeness, hugs, a hand on the shoulder — presence you can feel.",
      },
    ],
    questions: [
      { text: "An unexpected, specific compliment can make my whole week.", key: "words" },
      { text: "When someone I love praises my work, I replay it in my head for days.", key: "words" },
      { text: "My favorite gift is a full evening of someone's undivided attention.", key: "time" },
      { text: "Cancelled plans sting me more than a forgotten gift ever would.", key: "time" },
      { text: "When I'm overwhelmed, the most romantic thing is someone taking a task off my plate.", key: "support" },
      { text: "I show love by doing things — fixing, cooking, organizing, driving.", key: "support" },
      { text: "A long hug can fix a bad day faster than a long talk.", key: "warmth" },
      { text: "I naturally reach out — a squeeze of the hand, a pat on the back.", key: "warmth" },
    ],
    resultHeading: "Your love style",
  },
  {
    slug: "leadership-blueprint",
    name: "Leadership Blueprint",
    tagline:
      "Identify the leadership approach you default to — and the situations where it shines or backfires.",
    minutes: 8,
    icon: "star",
    tint: "bg-amber-100 text-amber-700",
    category: "career",
    description: [
      "There is no single 'leadership personality.' Visionaries, coaches, operators, and diplomats all build great teams — in different ways and in different situations.",
      "This assessment maps which of four leadership modes you reach for first, and gives you a playbook for stretching into the others when the moment demands it.",
    ],
    measures: [
      "Your default leadership mode",
      "Situations where your style excels",
      "Failure modes to watch for",
      "How to flex toward the other styles",
    ],
    kind: "scales",
    scales: [
      {
        id: "visionary",
        label: "The Visionary",
        icon: "lightbulb",
        blurb: "You lead by painting the destination — a future compelling enough that people pull toward it.",
      },
      {
        id: "coach",
        label: "The Coach",
        icon: "users",
        blurb: "You lead by growing people — spotting potential and building the confidence to use it.",
      },
      {
        id: "operator",
        label: "The Operator",
        icon: "clipboard",
        blurb: "You lead by making the machine run — clear goals, clean handoffs, promises kept.",
      },
      {
        id: "diplomat",
        label: "The Diplomat",
        icon: "handshake",
        blurb: "You lead by building alignment — bridging factions until everyone can move together.",
      },
    ],
    questions: [
      { text: "I'm at my best when describing where we could be in three years.", key: "visionary" },
      { text: "I'd rather inspire people toward a goal than assign them tasks.", key: "visionary" },
      { text: "Watching someone I mentored succeed beats succeeding myself.", key: "coach" },
      { text: "I adapt how I communicate for each individual person on a team.", key: "coach" },
      { text: "A team without clear owners and deadlines makes me itch.", key: "operator" },
      { text: "I trust well-designed processes more than heroic individual effort.", key: "operator" },
      { text: "I can usually find the compromise both sides can live with.", key: "diplomat" },
      { text: "Before pushing a decision, I make sure every voice has been heard.", key: "diplomat" },
    ],
    resultHeading: "Your leadership mode",
  },
];

export function getTest(slug: string): Test | undefined {
  return tests.find((t) => t.slug === slug);
}

export const testCategories: { id: Test["category"]; label: string }[] = [
  { id: "personality", label: "Personality" },
  { id: "career", label: "Career" },
  { id: "relationships", label: "Relationships" },
];
