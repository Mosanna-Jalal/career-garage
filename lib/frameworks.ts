import type { IconName } from "@/components/icons";

/**
 * Career Road Map framework libraries.
 *
 * Big Five, RIASEC/Holland, DISC and the Enneagram are long-established,
 * publicly documented models. All descriptions here are written for Career
 * Garage rather than adapted from any provider's copy.
 */

export type FrameworkItem = {
  code: string;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  growth: string[];
  careers: string[];
  tint: string;
  icon: IconName;
};

export type Framework = {
  slug: string;
  label: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string[];
  whatItMeasures: string;
  itemNoun: string;
  items: FrameworkItem[];
  /** short labels for the orbiting scene */
  nodes: string[];
  relatedTest?: { href: string; label: string };
};

export const frameworks: Framework[] = [
  /* ==================== ENNEAGRAM ==================== */
  {
    slug: "enneagram",
    label: "The 9 Enneagram Types",
    eyebrow: "Enneagram",
    headline: "Nine motivations,",
    headlineAccent: "nine ways of coping.",
    intro: [
      "The Enneagram describes nine patterns of motivation — not what you do, but why you do it. Each type is organised around a core desire and a core fear, and most people recognise themselves in one pattern more strongly than the rest.",
      "Because it focuses on motivation rather than behaviour, the Enneagram is useful for understanding why two people can do the same job in completely different ways, and what each of them needs in order to do it well.",
    ],
    whatItMeasures:
      "Core motivation, characteristic fear, and the coping strategy you fall back on under pressure.",
    itemNoun: "type",
    nodes: [
      "Reformer",
      "Helper",
      "Achiever",
      "Investigator",
      "Loyalist",
      "Peacemaker",
    ],
    relatedTest: { href: "/tests/enneagram", label: "Take the Enneagram test" },
    items: [
      {
        code: "1",
        name: "The Reformer",
        tagline: "Principled, purposeful and self-disciplined",
        description:
          "Ones are guided by a strong internal sense of how things ought to be. They notice the gap between what is and what should be, and feel responsible for closing it. At their best they bring integrity and steady judgement; under strain the inner critic gets loud.",
        strengths: ["Integrity", "Attention to detail", "Reliability", "Fairness"],
        growth: [
          "Allowing 'good enough'",
          "Softening self-criticism",
          "Delegating without redoing",
        ],
        careers: ["Law", "Quality assurance", "Teaching", "Audit", "Policy"],
        tint: "bg-sky-50 text-sky-700",
        icon: "scale",
      },
      {
        code: "2",
        name: "The Helper",
        tagline: "Warm, generous and people-focused",
        description:
          "Twos read what other people need quickly and move to meet it. They build trust easily and hold teams together. The growth edge is noticing their own needs before exhaustion or resentment makes the point for them.",
        strengths: ["Empathy", "Relationship building", "Generosity", "Warmth"],
        growth: [
          "Naming your own needs",
          "Accepting help",
          "Setting boundaries",
        ],
        careers: ["Counselling", "Nursing", "HR", "Teaching", "Social work"],
        tint: "bg-rose-50 text-rose-700",
        icon: "heart",
      },
      {
        code: "3",
        name: "The Achiever",
        tagline: "Driven, adaptable and results-oriented",
        description:
          "Threes set goals and clear them. They read what success looks like in a given room and reshape themselves to hit it, which makes them effective almost anywhere. The work is separating who they are from what they achieve.",
        strengths: ["Drive", "Adaptability", "Efficiency", "Confidence"],
        growth: [
          "Resting without guilt",
          "Valuing process, not just outcome",
          "Being seen off-stage",
        ],
        careers: ["Sales", "Marketing", "Entrepreneurship", "Consulting"],
        tint: "bg-amber-50 text-amber-700",
        icon: "trending",
      },
      {
        code: "4",
        name: "The Individualist",
        tagline: "Expressive, sensitive and self-aware",
        description:
          "Fours are attuned to feeling and meaning, and want their work to be authentically theirs. They bring depth and originality, and often see what is emotionally true in a situation before anyone else names it.",
        strengths: ["Creativity", "Emotional depth", "Authenticity", "Empathy"],
        growth: [
          "Steadiness through flat patches",
          "Comparing less",
          "Finishing as well as starting",
        ],
        careers: ["Design", "Writing", "Music", "Therapy", "Film"],
        tint: "bg-violet-50 text-violet-700",
        icon: "palette",
      },
      {
        code: "5",
        name: "The Investigator",
        tagline: "Perceptive, independent and analytical",
        description:
          "Fives want to understand things properly before acting. They conserve energy, go deep rather than wide, and are comfortable with problems that take a long time to solve. The edge is re-entering the world with what they have learned.",
        strengths: [
          "Analytical depth",
          "Objectivity",
          "Independence",
          "Calm under pressure",
        ],
        growth: [
          "Sharing work before it's perfect",
          "Engaging socially",
          "Acting on partial information",
        ],
        careers: ["Research", "Engineering", "Data science", "Academia"],
        tint: "bg-slate-100 text-slate-700",
        icon: "eye",
      },
      {
        code: "6",
        name: "The Loyalist",
        tagline: "Committed, prepared and trustworthy",
        description:
          "Sixes scan for what could go wrong and prepare for it, which makes them exceptional at risk work and genuinely dependable colleagues. They are loyal to people and institutions they believe in.",
        strengths: [
          "Preparedness",
          "Loyalty",
          "Problem anticipation",
          "Team commitment",
        ],
        growth: [
          "Trusting your own judgement",
          "Tolerating uncertainty",
          "Distinguishing risk from worry",
        ],
        careers: ["Risk management", "Security", "Operations", "Public service"],
        tint: "bg-emerald-50 text-emerald-700",
        icon: "shield",
      },
      {
        code: "7",
        name: "The Enthusiast",
        tagline: "Curious, energetic and future-focused",
        description:
          "Sevens generate options. They see possibility everywhere, keep morale up, and are excellent at the early, ambiguous stage of any project. The growth edge is staying with one thing long enough for it to pay off.",
        strengths: ["Ideation", "Optimism", "Versatility", "Energy"],
        growth: ["Following through", "Sitting with discomfort", "Focusing"],
        careers: ["Startups", "Product", "Travel", "Events", "Journalism"],
        tint: "bg-orange-50 text-orange-700",
        icon: "spark",
      },
      {
        code: "8",
        name: "The Challenger",
        tagline: "Direct, decisive and protective",
        description:
          "Eights take charge, say the uncomfortable thing, and protect the people under them. They are comfortable with conflict and move fast when others hesitate. The work is letting people see the softer reasoning underneath.",
        strengths: ["Decisiveness", "Courage", "Leadership", "Protectiveness"],
        growth: ["Showing vulnerability", "Inviting dissent", "Modulating force"],
        careers: ["Leadership", "Law", "Entrepreneurship", "Advocacy"],
        tint: "bg-red-50 text-red-700",
        icon: "anchor",
      },
      {
        code: "9",
        name: "The Peacemaker",
        tagline: "Steady, accepting and harmonising",
        description:
          "Nines see every side of a disagreement and lower the temperature in a room simply by being in it. They are natural mediators. The edge is making sure their own position gets stated rather than absorbed.",
        strengths: ["Mediation", "Patience", "Inclusiveness", "Steadiness"],
        growth: [
          "Stating your preference",
          "Handling conflict directly",
          "Prioritising",
        ],
        careers: ["Mediation", "Counselling", "Diplomacy", "HR", "Teaching"],
        tint: "bg-teal-50 text-teal-700",
        icon: "leaf",
      },
    ],
  },

  /* ==================== BIG FIVE ==================== */
  {
    slug: "big-five",
    label: "The Big Five Traits",
    eyebrow: "Big Five (OCEAN)",
    headline: "Five dimensions,",
    headlineAccent: "measured not sorted.",
    intro: [
      "The Big Five is the model most personality researchers actually use. Rather than sorting people into boxes, it places each person somewhere along five independent scales — so your result is a profile, not a label.",
      "Because the traits are measured as ranges rather than either/or types, small differences show up honestly, and your profile can shift gradually over a lifetime.",
    ],
    whatItMeasures:
      "Where you sit on five broad, independent dimensions of personality.",
    itemNoun: "trait",
    nodes: [
      "Openness",
      "Conscientiousness",
      "Extraversion",
      "Agreeableness",
      "Emotional Range",
    ],
    relatedTest: { href: "/tests/big-five", label: "Take the Big Five test" },
    items: [
      {
        code: "O",
        name: "Openness to Experience",
        tagline: "Curiosity, imagination and appetite for the new",
        description:
          "High scorers are drawn to ideas, abstraction, art and novelty. Lower scorers prefer the concrete, proven and familiar — which is an advantage wherever consistency and precedent matter more than invention.",
        strengths: ["Creative thinking", "Comfort with ambiguity", "Learning appetite"],
        growth: ["Grounding ideas in practicality", "Finishing before starting again"],
        careers: ["Research", "Design", "Writing", "Strategy", "Architecture"],
        tint: "bg-violet-50 text-violet-700",
        icon: "lightbulb",
      },
      {
        code: "C",
        name: "Conscientiousness",
        tagline: "Organisation, diligence and impulse control",
        description:
          "This trait predicts academic and job performance more reliably than any other. High scorers plan, follow through and keep commitments. Lower scorers are more flexible and spontaneous, which suits fast-changing work.",
        strengths: ["Reliability", "Planning", "Persistence", "Attention to detail"],
        growth: ["Flexibility when plans change", "Avoiding perfectionism"],
        careers: ["Project management", "Finance", "Medicine", "Engineering"],
        tint: "bg-sky-50 text-sky-700",
        icon: "clipboard",
      },
      {
        code: "E",
        name: "Extraversion",
        tagline: "Where your energy comes from",
        description:
          "Extraverts gain energy from interaction and think out loud; introverts recharge alone and often think before speaking. Neither is better — they simply need different conditions to do their best work.",
        strengths: ["Social confidence", "Enthusiasm", "Team energy"],
        growth: ["Listening as much as speaking", "Working alone comfortably"],
        careers: ["Sales", "Teaching", "Public relations", "Events", "Law"],
        tint: "bg-orange-50 text-orange-700",
        icon: "megaphone",
      },
      {
        code: "A",
        name: "Agreeableness",
        tagline: "Warmth, trust and cooperation",
        description:
          "High scorers prioritise harmony and assume good faith, which makes them trusted teammates. Lower scorers are more sceptical and comfortable challenging — valuable in negotiation, critique and quality control.",
        strengths: ["Cooperation", "Empathy", "Trust building"],
        growth: ["Negotiating firmly", "Giving hard feedback"],
        careers: ["Counselling", "Nursing", "HR", "Community work", "Teaching"],
        tint: "bg-emerald-50 text-emerald-700",
        icon: "handshake",
      },
      {
        code: "N",
        name: "Emotional Range",
        tagline: "Sensitivity to stress and negative emotion",
        description:
          "Often called neuroticism. Higher scorers feel stress keenly and notice threats early; lower scorers stay level under pressure. High sensitivity paired with good coping strategies is a genuine asset in careful, high-stakes work.",
        strengths: ["Risk awareness", "Emotional attunement", "Vigilance"],
        growth: ["Stress management", "Separating worry from evidence"],
        careers: ["Quality control", "Safety", "Editing", "Research"],
        tint: "bg-amber-50 text-amber-700",
        icon: "chart",
      },
    ],
  },

  /* ==================== DISC ==================== */
  {
    slug: "disc",
    label: "DISC Styles",
    eyebrow: "DISC",
    headline: "How you work",
    headlineAccent: "with other people.",
    intro: [
      "DISC is a workplace communication model. It describes four behavioural styles based on two questions: how fast you move, and whether you focus first on the task or on the people doing it.",
      "It's deliberately practical. DISC won't tell you who you are, but it is very good at explaining why a colleague's email felt blunt, or why your carefully prepared plan met impatience.",
    ],
    whatItMeasures:
      "Your default pace and focus at work, and how those read to colleagues.",
    itemNoun: "style",
    nodes: ["Dominance", "Influence", "Steadiness", "Conscientiousness"],
    relatedTest: {
      href: "/tests/workstyle-compass",
      label: "Take the Workstyle assessment",
    },
    items: [
      {
        code: "D",
        name: "Dominance",
        tagline: "Direct, results-first, fast-moving",
        description:
          "D styles want the headline, the decision and the next action. They are comfortable with risk and impatient with process for its own sake. Give them the bottom line first and the detail on request.",
        strengths: ["Decisiveness", "Drive for results", "Comfort with risk"],
        growth: ["Slowing down for buy-in", "Listening fully before deciding"],
        careers: ["Leadership", "Sales", "Entrepreneurship", "Operations"],
        tint: "bg-red-50 text-red-700",
        icon: "target",
      },
      {
        code: "I",
        name: "Influence",
        tagline: "Sociable, persuasive, energising",
        description:
          "I styles work through people. They build networks quickly, sell an idea well, and lift the mood of a team. They benefit from written follow-ups so momentum turns into delivery.",
        strengths: ["Persuasion", "Networking", "Enthusiasm", "Collaboration"],
        growth: ["Following through on detail", "Managing time"],
        careers: ["Marketing", "PR", "Training", "Business development"],
        tint: "bg-orange-50 text-orange-700",
        icon: "megaphone",
      },
      {
        code: "S",
        name: "Steadiness",
        tagline: "Patient, dependable, cooperative",
        description:
          "S styles are the stabilisers. They keep commitments, support colleagues quietly, and prefer considered change to sudden change. Teams often only notice how much they hold together when they leave.",
        strengths: ["Dependability", "Patience", "Team support", "Consistency"],
        growth: ["Adapting quickly to change", "Voicing disagreement early"],
        careers: ["Customer support", "Nursing", "Administration", "Teaching"],
        tint: "bg-emerald-50 text-emerald-700",
        icon: "anchor",
      },
      {
        code: "C",
        name: "Conscientiousness",
        tagline: "Precise, analytical, quality-focused",
        description:
          "C styles care whether it is actually correct. They want the data, the method and the caveats, and they will find the flaw others missed. Give them time and specifics rather than pressure and slogans.",
        strengths: ["Accuracy", "Analysis", "High standards", "Systematic thinking"],
        growth: ["Shipping before perfect", "Communicating warmly"],
        careers: ["Accounting", "Engineering", "Data analysis", "Compliance"],
        tint: "bg-sky-50 text-sky-700",
        icon: "puzzle",
      },
    ],
  },

  /* ==================== RIASEC ==================== */
  {
    slug: "riasec",
    label: "RIASEC (Holland Codes)",
    eyebrow: "RIASEC / Holland Codes",
    headline: "Six interests that",
    headlineAccent: "map to real jobs.",
    intro: [
      "RIASEC, developed by psychologist John Holland, sorts work interests into six themes. Most people are a blend of two or three, and that combination points remarkably well at occupations they tend to enjoy.",
      "Of all the frameworks here, RIASEC is the one built specifically for career choice — it connects what you like doing to the environments where that preference is genuinely useful.",
    ],
    whatItMeasures:
      "The kinds of activities and work environments you're drawn to.",
    itemNoun: "theme",
    nodes: [
      "Realistic",
      "Investigative",
      "Artistic",
      "Social",
      "Enterprising",
      "Conventional",
    ],
    relatedTest: {
      href: "/tests/career-explorer",
      label: "Take the Career Interest Explorer",
    },
    items: [
      {
        code: "R",
        name: "Realistic",
        tagline: "The doers",
        description:
          "Hands-on, practical work with tools, machines, plants, animals or the outdoors. Realistic types like problems with visible, physical results and tend to prefer doing over discussing.",
        strengths: ["Practical skill", "Mechanical aptitude", "Physical coordination"],
        growth: ["Communicating work to non-technical people"],
        careers: [
          "Engineering",
          "Agriculture",
          "Skilled trades",
          "Aviation",
          "Defence",
        ],
        tint: "bg-stone-100 text-stone-700",
        icon: "wrench",
      },
      {
        code: "I",
        name: "Investigative",
        tagline: "The thinkers",
        description:
          "Observing, analysing and solving. Investigative types are drawn to research, theory and evidence, and are comfortable with problems that have no known answer yet.",
        strengths: ["Analytical reasoning", "Curiosity", "Precision"],
        growth: ["Deciding with incomplete data", "Collaborating early"],
        careers: ["Research", "Medicine", "Data science", "Biotechnology"],
        tint: "bg-sky-50 text-sky-700",
        icon: "brain",
      },
      {
        code: "A",
        name: "Artistic",
        tagline: "The creators",
        description:
          "Expressive, original work with few rules and room to interpret. Artistic types value self-expression and tend to be uncomfortable in highly standardised environments.",
        strengths: ["Originality", "Aesthetic judgement", "Expression"],
        growth: ["Working within constraints", "Handling critique"],
        careers: ["Design", "Media", "Writing", "Animation", "Architecture"],
        tint: "bg-violet-50 text-violet-700",
        icon: "palette",
      },
      {
        code: "S",
        name: "Social",
        tagline: "The helpers",
        description:
          "Teaching, guiding, healing and supporting. Social types measure a good day by whether someone else is better off, and they read group dynamics well.",
        strengths: ["Communication", "Empathy", "Teaching", "Patience"],
        growth: ["Protecting your own time", "Saying no"],
        careers: ["Teaching", "Counselling", "Healthcare", "Social work", "HR"],
        tint: "bg-emerald-50 text-emerald-700",
        icon: "users",
      },
      {
        code: "E",
        name: "Enterprising",
        tagline: "The persuaders",
        description:
          "Leading, selling, negotiating and taking commercial risk. Enterprising types are energised by influence and outcomes, and comfortable being judged on results.",
        strengths: ["Persuasion", "Initiative", "Risk tolerance", "Leadership"],
        growth: ["Patience with detail", "Listening before pitching"],
        careers: ["Business", "Sales", "Law", "Entrepreneurship", "Politics"],
        tint: "bg-orange-50 text-orange-700",
        icon: "briefcase",
      },
      {
        code: "C",
        name: "Conventional",
        tagline: "The organisers",
        description:
          "Structured work with data, records and systems. Conventional types like clear standards and produce accurate, orderly work others can rely on.",
        strengths: ["Accuracy", "Organisation", "Reliability", "Numeracy"],
        growth: ["Adapting when rules don't fit", "Tolerating ambiguity"],
        careers: ["Accounting", "Banking", "Logistics", "Administration"],
        tint: "bg-amber-50 text-amber-700",
        icon: "clipboard",
      },
    ],
  },
];

export function getFramework(slug: string) {
  return frameworks.find((f) => f.slug === slug);
}

/** Career clusters shown on the Career Road Map hub. */
export const careerClusters: { name: string; icon: IconName; fields: string[] }[] =
  [
    {
      name: "Engineering & Technology",
      icon: "wrench",
      fields: [
        "Software",
        "AI & Data Science",
        "Mechanical",
        "Civil",
        "Electrical",
        "Robotics",
      ],
    },
    {
      name: "Medical & Healthcare",
      icon: "heart",
      fields: [
        "Medicine",
        "Nursing",
        "Allied health",
        "Public health",
        "Biotechnology",
      ],
    },
    {
      name: "Commerce & Finance",
      icon: "chart",
      fields: ["Accounting", "Banking", "Investment", "Insurance", "Actuarial"],
    },
    {
      name: "Law & Judiciary",
      icon: "scale",
      fields: ["Corporate law", "Litigation", "Legal research", "Judiciary"],
    },
    {
      name: "Design & Architecture",
      icon: "palette",
      fields: ["UI/UX", "Product", "Interior", "Fashion", "Architecture"],
    },
    {
      name: "Arts, Media & Communication",
      icon: "megaphone",
      fields: ["Journalism", "Film", "Animation", "Advertising", "Content"],
    },
    {
      name: "Civil Services & Government",
      icon: "globe",
      fields: ["IAS/IPS", "State services", "Public policy", "Administration"],
    },
    {
      name: "Defence & Uniformed Services",
      icon: "shield",
      fields: ["Army", "Navy", "Air Force", "Paramilitary", "Coast Guard"],
    },
    {
      name: "Entrepreneurship & Startups",
      icon: "spark",
      fields: ["Founding", "Product", "Growth", "Venture", "Operations"],
    },
    {
      name: "Education & Training",
      icon: "book",
      fields: ["Teaching", "EdTech", "Curriculum", "Academic research"],
    },
    {
      name: "Environment & Sustainability",
      icon: "leaf",
      fields: [
        "Climate",
        "Conservation",
        "Renewable energy",
        "Sustainability consulting",
      ],
    },
    {
      name: "Hospitality, Tourism & Aviation",
      icon: "compass",
      fields: ["Hotel management", "Travel", "Cabin crew", "Piloting"],
    },
  ];
