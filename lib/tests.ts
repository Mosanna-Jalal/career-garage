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
    slug: "personality-type",
    name: "Personality Type Assessment",
    tagline:
      "Discover which of the 16 personality types fits you best and what it means for your work, relationships, and growth.",
    minutes: 10,
    icon: "brain",
    tint: "bg-brand-100 text-brand-700",
    popular: true,
    category: "personality",
    description: [
      "Our flagship assessment sorts your preferences along four classic dimensions of personality: where you direct your energy, how you take in information, how you make decisions, and how you organize your life. The combination produces one of 16 distinct personality types.",
      "Each type comes with a full profile covering core motivations, strengths you can lean on, blind spots to watch for, and the careers and working styles where people like you tend to thrive.",
    ],
    measures: [
      "Whether you recharge with people or with solitude",
      "Whether you trust concrete facts or big-picture patterns",
      "Whether logic or values drives your decisions",
      "Whether you prefer structure or spontaneity",
    ],
    kind: "axes",
    axes: [
      {
        id: "ei",
        left: {
          code: "E",
          label: "Extraverted",
          blurb: "You draw energy from people, conversation, and action.",
        },
        right: {
          code: "I",
          label: "Introverted",
          blurb: "You recharge through solitude, reflection, and depth.",
        },
      },
      {
        id: "sn",
        left: {
          code: "S",
          label: "Sensing",
          blurb: "You trust concrete facts, details, and direct experience.",
        },
        right: {
          code: "N",
          label: "Intuitive",
          blurb: "You look for patterns, possibilities, and the big picture.",
        },
      },
      {
        id: "tf",
        left: {
          code: "T",
          label: "Thinking",
          blurb: "You weigh decisions with logic, consistency, and fairness.",
        },
        right: {
          code: "F",
          label: "Feeling",
          blurb: "You weigh decisions by values and impact on people.",
        },
      },
      {
        id: "jp",
        left: {
          code: "J",
          label: "Judging",
          blurb: "You like plans, closure, and a tidy sense of progress.",
        },
        right: {
          code: "P",
          label: "Perceiving",
          blurb: "You like options open, plans loose, and room to adapt.",
        },
      },
    ],
    questions: [
      { text: "A long evening of socializing usually leaves me energized rather than drained.", key: "ei", dir: -1 },
      { text: "I do my best thinking alone, before I ever say anything out loud.", key: "ei", dir: 1 },
      { text: "I'd rather work from proven facts than from an interesting hunch.", key: "sn", dir: -1 },
      { text: "I often catch myself imagining how things could be rather than noticing how they are.", key: "sn", dir: 1 },
      { text: "When a friend brings me a problem, my first instinct is to fix it, not to comfort.", key: "tf", dir: -1 },
      { text: "A decision that's logical but hurts someone still feels like the wrong decision.", key: "tf", dir: 1 },
      { text: "I feel calmer once the plan is settled, even if it's not perfect.", key: "jp", dir: -1 },
      { text: "Committing to a detailed schedule makes me feel boxed in.", key: "jp", dir: 1 },
      { text: "In group settings, I tend to speak up early and often.", key: "ei", dir: -1 },
      { text: "Step-by-step instructions bore me — I'd rather grasp the concept and improvise.", key: "sn", dir: 1 },
      { text: "I can set feelings aside and judge a situation purely on the merits.", key: "tf", dir: -1 },
      { text: "I often leave things to the last minute and still do great work.", key: "jp", dir: 1 },
    ],
    resultHeading: "Your four-letter type",
  },
  {
    slug: "enneagram",
    name: "Enneagram Test",
    tagline:
      "Find your center of intelligence — head, heart, or body — and the Enneagram types that drive your deepest motivations.",
    minutes: 8,
    icon: "target",
    tint: "bg-accent-100 text-accent-700",
    popular: true,
    category: "personality",
    description: [
      "The Enneagram describes nine interconnected personality types organized into three centers: the Body center (types 8, 9, 1), which processes the world through instinct; the Heart center (types 2, 3, 4), which processes through emotion and image; and the Head center (types 5, 6, 7), which processes through analysis and anticipation.",
      "This assessment identifies your dominant center and points you toward the types within it, so you can explore the core fears and desires that shape how you move through the world.",
    ],
    measures: [
      "Your dominant center of intelligence",
      "How you instinctively respond to stress",
      "The core motivations behind your habits",
      "Which Enneagram types to explore first",
    ],
    kind: "scales",
    scales: [
      {
        id: "body",
        label: "Body Center",
        icon: "anchor",
        blurb:
          "You lead with gut instinct and a strong sense of autonomy. Types 8, 9, and 1 live here — driven by control, peace, and integrity.",
      },
      {
        id: "heart",
        label: "Heart Center",
        icon: "heart",
        blurb:
          "You lead with feeling and connection, tuned to how you're seen. Types 2, 3, and 4 live here — driven by love, achievement, and authenticity.",
      },
      {
        id: "head",
        label: "Head Center",
        icon: "brain",
        blurb:
          "You lead with analysis and foresight, always scanning ahead. Types 5, 6, and 7 live here — driven by understanding, security, and possibility.",
      },
    ],
    questions: [
      { text: "My gut reaction is usually right, and I act on it before I can explain it.", key: "body" },
      { text: "I notice immediately when someone tries to control or push me.", key: "body" },
      { text: "It genuinely bothers me when things aren't done properly.", key: "body" },
      { text: "I can sense how someone feels about me within moments of meeting.", key: "heart" },
      { text: "Being appreciated by the people I care about matters more than almost anything.", key: "heart" },
      { text: "I put real effort into how I come across to others.", key: "heart" },
      { text: "I mentally rehearse worst-case scenarios so nothing catches me off guard.", key: "head" },
      { text: "I'd rather gather more information than commit too early.", key: "head" },
      { text: "My mind is always planning the next interesting thing.", key: "head" },
    ],
    resultHeading: "Your center of intelligence",
  },
  {
    slug: "big-five",
    name: "Big Five Personality Test",
    tagline:
      "Measure yourself on the five broad dimensions of personality used most widely in academic psychology.",
    minutes: 7,
    icon: "chart",
    tint: "bg-sky-100 text-sky-700",
    popular: true,
    category: "personality",
    description: [
      "The five-factor model is the most researched framework in personality science. Rather than sorting you into a type, it scores you along five continuous dimensions — so two people with the 'same' personality can still differ in meaningful ways.",
      "Your report shows where you land on each dimension and what that position tends to mean for work habits, relationships, and stress.",
    ],
    measures: [
      "Openness — curiosity and taste for novelty",
      "Conscientiousness — organization and follow-through",
      "Extraversion — sociability and drive",
      "Agreeableness — warmth and cooperation",
      "Emotional range — sensitivity to stress",
    ],
    kind: "scales",
    scales: [
      {
        id: "o",
        label: "Openness",
        icon: "palette",
        blurb: "High scorers chase new ideas, art, and experiences; low scorers prefer the familiar and practical.",
      },
      {
        id: "c",
        label: "Conscientiousness",
        icon: "clipboard",
        blurb: "High scorers are organized and reliable; low scorers are flexible and spontaneous.",
      },
      {
        id: "e",
        label: "Extraversion",
        icon: "megaphone",
        blurb: "High scorers seek stimulation and company; low scorers prefer calm and small doses of socializing.",
      },
      {
        id: "a",
        label: "Agreeableness",
        icon: "handshake",
        blurb: "High scorers prioritize harmony and trust; low scorers are competitive and skeptical.",
      },
      {
        id: "n",
        label: "Emotional Range",
        icon: "scale",
        blurb: "High scorers feel stress and moods intensely; low scorers stay even-keeled under pressure.",
      },
    ],
    questions: [
      { text: "I actively seek out art, music, or ideas that are unfamiliar to me.", key: "o" },
      { text: "Abstract, philosophical conversations energize me.", key: "o" },
      { text: "I finish what I start, even when the excitement has worn off.", key: "c" },
      { text: "My workspace, files, and calendar are genuinely organized.", key: "c" },
      { text: "I'm usually the one who gets the conversation going.", key: "e" },
      { text: "A packed social weekend sounds wonderful, not exhausting.", key: "e" },
      { text: "I give people the benefit of the doubt, even after a bad first impression.", key: "a" },
      { text: "I'd rather concede a small point than damage a relationship.", key: "a" },
      { text: "Small setbacks can affect my mood for the rest of the day.", key: "n" },
      { text: "I often replay conversations, worrying about what I said.", key: "n" },
    ],
    resultHeading: "Your five-factor profile",
  },
  {
    slug: "career-explorer",
    name: "Career Interest Explorer",
    tagline:
      "Map your interests across six work themes and get matched with career families that fit how you actually like to spend your time.",
    minutes: 9,
    icon: "compass",
    tint: "bg-violet-100 text-violet-700",
    popular: true,
    category: "career",
    description: [
      "Decades of vocational research show that interests cluster into a handful of stable themes — building, investigating, creating, helping, persuading, and organizing. Most people are a blend of two or three.",
      "This explorer scores you on all six themes and combines your top two into an interest profile, with example career families for each combination.",
    ],
    measures: [
      "Your top two work interest themes",
      "How strongly each of the six themes pulls you",
      "Career families that match your blend",
      "Work environments to seek out or avoid",
    ],
    kind: "scales",
    scales: [
      {
        id: "build",
        label: "The Builder",
        icon: "wrench",
        blurb: "Hands-on, practical work with tools, machines, systems, and the physical world.",
      },
      {
        id: "think",
        label: "The Investigator",
        icon: "brain",
        blurb: "Research, analysis, and the satisfaction of figuring out how things really work.",
      },
      {
        id: "create",
        label: "The Creator",
        icon: "palette",
        blurb: "Original expression — design, writing, performance, and open-ended problems.",
      },
      {
        id: "help",
        label: "The Helper",
        icon: "heart",
        blurb: "Teaching, coaching, caring — work that visibly improves someone's day or life.",
      },
      {
        id: "persuade",
        label: "The Persuader",
        icon: "megaphone",
        blurb: "Leading, selling, pitching — moving people and projects toward a goal.",
      },
      {
        id: "organize",
        label: "The Organizer",
        icon: "clipboard",
        blurb: "Bringing order to complexity with systems, data, and dependable processes.",
      },
    ],
    questions: [
      { text: "I'd enjoy assembling, repairing, or physically making something as part of my job.", key: "build" },
      { text: "Seeing a tangible, physical result at the end of the day is deeply satisfying.", key: "build" },
      { text: "I'd happily spend an afternoon going down a research rabbit hole.", key: "think" },
      { text: "I like questions that don't have an answer at the back of the book.", key: "think" },
      { text: "Given a blank page and no rules, I light up rather than freeze.", key: "create" },
      { text: "I care a lot about how things look, sound, or read — not just whether they work.", key: "create" },
      { text: "Helping someone have a breakthrough feels better than winning myself.", key: "help" },
      { text: "People regularly come to me for advice or support, and I like that.", key: "help" },
      { text: "I enjoy convincing people of an idea I believe in.", key: "persuade" },
      { text: "I'd rather lead the project than execute someone else's plan.", key: "persuade" },
      { text: "A messy spreadsheet, drawer, or process quietly begs me to fix it.", key: "organize" },
      { text: "I like clear procedures and take pride in getting details exactly right.", key: "organize" },
    ],
    resultHeading: "Your interest profile",
  },
  {
    slug: "workstyle-compass",
    name: "Workstyle Compass",
    tagline:
      "A fast read on how you drive work forward — and how to collaborate with people wired differently than you.",
    minutes: 6,
    icon: "trending",
    tint: "bg-emerald-100 text-emerald-700",
    category: "career",
    description: [
      "Teams run on four broad working styles: Drivers who push for results, Energizers who rally people, Anchors who keep things steady, and Analysts who protect quality. None is better — but mismatched styles are behind most workplace friction.",
      "This short assessment identifies your dominant style, your backup style, and practical tips for working with each of the other three.",
    ],
    measures: [
      "Your dominant and secondary working styles",
      "What you need from teammates to do your best work",
      "Friction points with each other style",
      "How you behave under deadline pressure",
    ],
    kind: "scales",
    scales: [
      {
        id: "driver",
        label: "The Driver",
        icon: "trending",
        blurb: "Direct and decisive. You set the pace, cut through noise, and measure days in outcomes.",
      },
      {
        id: "energizer",
        label: "The Energizer",
        icon: "spark",
        blurb: "Enthusiastic and persuasive. You generate momentum, ideas, and buy-in.",
      },
      {
        id: "anchor",
        label: "The Anchor",
        icon: "anchor",
        blurb: "Patient and dependable. You keep the team steady and make sure nobody is left behind.",
      },
      {
        id: "analyst",
        label: "The Analyst",
        icon: "eye",
        blurb: "Precise and thorough. You catch what others miss and hold the bar for quality.",
      },
    ],
    questions: [
      { text: "In meetings, I get impatient when the discussion circles without a decision.", key: "driver" },
      { text: "I'd rather ship something imperfect today than something perfect next month.", key: "driver" },
      { text: "I can usually get a room excited about an idea.", key: "energizer" },
      { text: "Brainstorming with other people is where I do my best work.", key: "energizer" },
      { text: "Teammates would describe me as the calm, steady one.", key: "anchor" },
      { text: "I check in on how people are doing, not just what they're doing.", key: "anchor" },
      { text: "I read the documentation before I touch anything.", key: "analyst" },
      { text: "A small error in my work bothers me long after everyone else has moved on.", key: "analyst" },
    ],
    resultHeading: "Your working style",
  },
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
