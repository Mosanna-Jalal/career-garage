import type { IconName } from "@/components/icons";

export type PersonalityType = {
  slug: string;
  code: string;
  name: string;
  group: "analysts" | "idealists" | "guardians" | "adventurers";
  icon: IconName;
  tint: string;
  summary: string;
  detail: string[];
  strengths: string[];
  growth: string[];
  careers: string[];
};

export const typeGroups: Record<
  PersonalityType["group"],
  { label: string; blurb: string; tint: string }
> = {
  analysts: {
    label: "Analysts",
    blurb: "Intuitive, logical minds drawn to systems, strategy, and ideas.",
    tint: "bg-violet-100 text-violet-700",
  },
  idealists: {
    label: "Idealists",
    blurb: "Intuitive, empathetic types guided by meaning and human potential.",
    tint: "bg-brand-100 text-brand-700",
  },
  guardians: {
    label: "Guardians",
    blurb: "Practical, dependable types who keep people and institutions strong.",
    tint: "bg-sky-100 text-sky-700",
  },
  adventurers: {
    label: "Adventurers",
    blurb: "Hands-on, present-focused types who act boldly and adapt fast.",
    tint: "bg-amber-100 text-amber-700",
  },
};

export const personalityTypes: PersonalityType[] = [
  {
    slug: "intj",
    code: "INTJ",
    name: "The Strategist",
    group: "analysts",
    icon: "target",
    tint: "bg-violet-100 text-violet-700",
    summary:
      "Independent, long-range thinkers who quietly design the future and then execute it with unnerving persistence.",
    detail: [
      "Strategists live several moves ahead. They absorb complex systems quickly, spot the leverage points, and build a private roadmap toward a goal others haven't even named yet. They prefer competence to charisma and results to recognition.",
      "Because they trust their own analysis deeply, Strategists can seem dismissive of process, hierarchy, or small talk. Their growth edge is usually people: learning that bringing others along is part of the plan, not a distraction from it.",
    ],
    strengths: ["Long-range strategic vision", "Independent, rigorous thinking", "Relentless follow-through", "Calm under complexity"],
    growth: ["Can dismiss input that arrives emotionally", "Impatient with inefficiency and repetition", "May under-communicate the plan"],
    careers: ["Systems architect", "Research scientist", "Strategy consultant", "Investment analyst", "Engineer", "University professor"],
  },
  {
    slug: "intp",
    code: "INTP",
    name: "The Theorist",
    group: "analysts",
    icon: "puzzle",
    tint: "bg-violet-100 text-violet-700",
    summary:
      "Curious, precise minds who take ideas apart to see how they work — and can't rest until the model is internally consistent.",
    detail: [
      "Theorists are the quality inspectors of the idea world. Hand them a claim and they'll probe it for contradictions, edge cases, and unstated assumptions — not to win, but because an inconsistent model is genuinely unbearable to them.",
      "Their challenge is shipping. A Theorist's inner standard of 'fully understood' can postpone action indefinitely, and practical details like deadlines and paperwork feel like static. Pairing with an executor often unlocks their best work.",
    ],
    strengths: ["Original analytical insight", "Intellectual honesty", "Comfort with ambiguity", "Rapid learning in new domains"],
    growth: ["Chronic perfectionism about understanding", "Neglects routine and admin", "Can seem detached in conversation"],
    careers: ["Software developer", "Mathematician", "Data scientist", "Philosopher", "Forensic analyst", "Technical writer"],
  },
  {
    slug: "entj",
    code: "ENTJ",
    name: "The Director",
    group: "analysts",
    icon: "trending",
    tint: "bg-violet-100 text-violet-700",
    summary:
      "Decisive organizers of people and resources who see the goal, build the machine, and drive it there on schedule.",
    detail: [
      "Directors treat the world as a set of problems awaiting an owner. They naturally take charge, set direction, and hold everyone — starting with themselves — to a visible standard. Inefficiency reads to them as disrespect for everyone's time.",
      "The same force that makes Directors effective can flatten quieter voices. Their growth work is usually slowing down to gather buy-in and remembering that morale is infrastructure too.",
    ],
    strengths: ["Natural command of complex projects", "Direct, efficient communication", "High standards, higher energy", "Comfortable with hard decisions"],
    growth: ["Can steamroll gentler teammates", "Impatience with process and consensus", "Ties self-worth to output"],
    careers: ["Executive", "Operations leader", "Entrepreneur", "Attorney", "Management consultant", "Program director"],
  },
  {
    slug: "entp",
    code: "ENTP",
    name: "The Trailblazer",
    group: "analysts",
    icon: "spark",
    tint: "bg-violet-100 text-violet-700",
    summary:
      "Quick, contrarian innovators who generate possibilities faster than anyone can evaluate them — and love the argument that follows.",
    detail: [
      "Trailblazers think by sparring. They'll argue a position brilliantly, switch sides, and argue the other one better — because for them, debate is how an idea earns the right to exist. They're at their best at the messy front edge of anything new.",
      "Their struggle is the long middle of projects, after novelty fades and before results arrive. Trailblazers grow by finishing: choosing fewer ideas and carrying them past the boring parts.",
    ],
    strengths: ["Fast, inventive ideation", "Persuasive on their feet", "Fearless toward sacred cows", "Energized by change"],
    growth: ["Loses interest after the novelty phase", "Debates when listening would serve better", "Scatters effort across too many fronts"],
    careers: ["Founder", "Product manager", "Creative director", "Litigator", "Growth marketer", "Broadcast host"],
  },
  {
    slug: "infj",
    code: "INFJ",
    name: "The Visionary",
    group: "idealists",
    icon: "eye",
    tint: "bg-brand-100 text-brand-700",
    summary:
      "Quiet idealists with a long inner sight — they read people deeply and work patiently toward a more humane future.",
    detail: [
      "Visionaries combine an intuitive read on people with a strong private compass. They often understand what someone is feeling before that person does, and they channel that insight into causes, institutions, and one-on-one care.",
      "Because they hold their ideals so tightly, Visionaries are prone to quiet burnout: absorbing everyone's needs, saying yes past their limits, then withdrawing abruptly. Boundaries are not a betrayal of their values — they're what sustains them.",
    ],
    strengths: ["Deep insight into people", "Principled, future-oriented purpose", "Writes and speaks with quiet power", "Devoted to the few, not the many"],
    growth: ["Absorbs others' emotions as their own", "Perfectionism about living their values", "Withdraws instead of voicing needs"],
    careers: ["Counselor", "Nonprofit leader", "Writer", "Physician", "HR development lead", "Professor"],
  },
  {
    slug: "infp",
    code: "INFP",
    name: "The Dreamer",
    group: "idealists",
    icon: "leaf",
    tint: "bg-brand-100 text-brand-700",
    summary:
      "Gentle, imaginative souls guided by a fierce inner code — quiet on the surface, unshakeable underneath.",
    detail: [
      "Dreamers navigate by an internal sense of what is good and true, and they measure every choice against it. They may seem easygoing about small things, but on matters of principle they simply will not move.",
      "Their rich inner world can make the outer one feel clumsy — deadlines, networking, self-promotion. Dreamers thrive when they find work that lets their values and imagination pay the bills together, and wilt in roles that feel meaningless.",
    ],
    strengths: ["Deep authenticity and empathy", "Vivid creative imagination", "Loyal beyond convenience", "Sees the good others miss"],
    growth: ["Avoids conflict until it compounds", "Idealizes people, then feels betrayed", "Struggles with routine and structure"],
    careers: ["Author", "Therapist", "Graphic designer", "Librarian", "Special-education teacher", "UX researcher"],
  },
  {
    slug: "enfj",
    code: "ENFJ",
    name: "The Mentor",
    group: "idealists",
    icon: "users",
    tint: "bg-brand-100 text-brand-700",
    summary:
      "Warm, articulate leaders who see who people could become — and can't help organizing the world to get them there.",
    detail: [
      "Mentors read a room instantly and instinctively take responsibility for it. They draw out quiet voices, smooth over friction, and make individuals feel personally seen — which is why people follow them without quite noticing they've been led.",
      "The cost is self-neglect. Mentors are often the last to know what they themselves need, and can feel wounded when their care isn't reciprocated in kind. Their growth is letting others give back — and letting some problems belong to someone else.",
    ],
    strengths: ["Inspires genuine loyalty", "Reads group dynamics precisely", "Communicates with warmth and clarity", "Develops people patiently"],
    growth: ["Over-invests in others' problems", "Sensitive to criticism and conflict", "Neglects their own needs"],
    careers: ["Teacher", "Team lead", "Communications director", "Coach", "Clergy", "Customer success leader"],
  },
  {
    slug: "enfp",
    code: "ENFP",
    name: "The Spark",
    group: "idealists",
    icon: "spark",
    tint: "bg-brand-100 text-brand-700",
    summary:
      "Effervescent possibility-seekers who connect people and ideas with contagious enthusiasm — and mean every word of it.",
    detail: [
      "Sparks experience the world as an unfinished map of possibilities, most of them involving people. They start conversations with strangers, projects with friends, and movements with both. Their enthusiasm isn't performance; it's how they metabolize life.",
      "The shadow side is commitment. So many futures look bright that choosing one feels like a small death. Sparks do their best work with structures — partners, deadlines, rituals — that convert their inspiration into follow-through.",
    ],
    strengths: ["Contagious enthusiasm", "Connects unlikely people and ideas", "Improvises brilliantly", "Genuinely curious about everyone"],
    growth: ["Overcommits, then overwhelms", "Bored by maintenance and detail", "Seeks external validation when low"],
    careers: ["Journalist", "Event producer", "Recruiter", "Actor", "Brand strategist", "Community manager"],
  },
  {
    slug: "istj",
    code: "ISTJ",
    name: "The Steward",
    group: "guardians",
    icon: "shield",
    tint: "bg-sky-100 text-sky-700",
    summary:
      "Thorough, word-keeping realists — the quiet load-bearing walls of every family, team, and institution.",
    detail: [
      "Stewards believe that promises are kept, procedures exist for reasons, and someone has to actually do the thing. Usually, that someone is them. They value proof over promise and prefer their praise infrequent and earned.",
      "Change for its own sake strikes Stewards as vandalism, which can make them slow to adopt genuinely better ways. Their growth is distinguishing 'untested' from 'wrong' — and saying out loud the appreciation they quietly feel.",
    ],
    strengths: ["Impeccable reliability", "Sharp memory for facts and details", "Steady under pressure", "Fair and consistent"],
    growth: ["Resists unproven change", "Underestimates emotional needs — including their own", "Assumes duty speaks for itself"],
    careers: ["Accountant", "Compliance officer", "Logistics manager", "Judge", "Database administrator", "Military officer"],
  },
  {
    slug: "isfj",
    code: "ISFJ",
    name: "The Caretaker",
    group: "guardians",
    icon: "heart",
    tint: "bg-sky-100 text-sky-700",
    summary:
      "Warm, meticulous protectors who remember the details of your life and quietly arrange the world around your comfort.",
    detail: [
      "Caretakers notice what people need before it's asked — the refilled cup, the remembered anniversary, the report finished early because you looked tired. Their care is practical, specific, and constant.",
      "Because they serve so quietly, Caretakers are chronically overlooked and chronically overloaded. Learning to ask, delegate, and occasionally disappoint someone is not a moral failure; it's how they last.",
    ],
    strengths: ["Attentive, practical kindness", "Superb memory for people's details", "Patient and thorough", "Loyal through difficulty"],
    growth: ["Can't say no until depleted", "Avoids necessary confrontation", "Resists changes to cherished routines"],
    careers: ["Nurse", "Elementary teacher", "Office manager", "Dietitian", "Social worker", "Veterinary technician"],
  },
  {
    slug: "estj",
    code: "ESTJ",
    name: "The Organizer",
    group: "guardians",
    icon: "clipboard",
    tint: "bg-sky-100 text-sky-700",
    summary:
      "Energetic, no-nonsense administrators who turn chaos into schedules, and schedules into results.",
    detail: [
      "Organizers walk into a disordered situation and start assigning owners. They respect rules, deadlines, and chain of command — not out of timidity, but because they've watched what happens without them. They say the quiet part out loud, on time, in a memo.",
      "Their certainty can shade into rigidity, and their bluntness can bruise. Organizers grow by asking one more question before ruling, and by treating feelings as data rather than noise.",
    ],
    strengths: ["Gets things actually done", "Clear, honest communication", "Builds order that outlasts them", "Dependable in a crisis"],
    growth: ["Judges before all facts arrive", "Dismisses the 'soft stuff' at a cost", "Overworks and expects the same"],
    careers: ["Operations manager", "School principal", "Project manager", "Financial officer", "Sales director", "Civil servant"],
  },
  {
    slug: "esfj",
    code: "ESFJ",
    name: "The Host",
    group: "guardians",
    icon: "smile",
    tint: "bg-sky-100 text-sky-700",
    summary:
      "Sociable, dutiful connectors who hold communities together with casseroles, calendars, and genuine concern.",
    detail: [
      "Hosts are the social infrastructure of any group: they remember birthdays, organize the farewell card, and notice who's been quiet lately. Harmony isn't an abstraction to them — it's a project they personally maintain.",
      "Their sensitivity to the group's opinion cuts both ways: it makes them attentive, but criticism or exclusion can wound deeply. Hosts grow by rooting their worth in their values, not their reviews.",
    ],
    strengths: ["Builds warm, functioning communities", "Practically generous", "Reliable and organized", "Makes newcomers belong"],
    growth: ["Takes criticism personally", "Can prioritize harmony over honesty", "Needs appreciation to stay motivated"],
    careers: ["Event coordinator", "Pediatric nurse", "Real estate agent", "Hotel manager", "Teacher", "Fundraiser"],
  },
  {
    slug: "istp",
    code: "ISTP",
    name: "The Tinkerer",
    group: "adventurers",
    icon: "wrench",
    tint: "bg-amber-100 text-amber-700",
    summary:
      "Cool-headed mechanics of the real world — they understand things by taking them apart and fix crises without drama.",
    detail: [
      "Tinkerers learn with their hands. Manuals bore them; disassembly enlightens them. In an emergency they're strangely calm, because a crisis is just a system displaying interesting behavior — and systems can be fixed.",
      "Words are not their native medium, and long-term plans feel hypothetical. Tinkerers thrive with autonomy and concrete problems, and grow by occasionally narrating their inner world to the people who care about them.",
    ],
    strengths: ["Superb practical problem-solving", "Ice-calm in emergencies", "Efficient — no wasted motion", "Fearless with tools and machines"],
    growth: ["Communicates on a need-to-know basis", "Allergic to long-term commitment", "Bored quickly by routine"],
    careers: ["Mechanical engineer", "Paramedic", "Pilot", "Electrician", "Systems administrator", "Forensic technician"],
  },
  {
    slug: "isfp",
    code: "ISFP",
    name: "The Maker",
    group: "adventurers",
    icon: "palette",
    tint: "bg-amber-100 text-amber-700",
    summary:
      "Gentle, sensory artists who speak through what they make — a meal, a garden, a song — rather than what they say.",
    detail: [
      "Makers live in the present tense of the senses: color, texture, sound, taste. They express care and identity through crafted things and shared experiences, and they extend to everyone a live-and-let-live courtesy they hope to receive back.",
      "They dislike being defined, scheduled, or argued with, and will quietly exit rather than fight. Makers grow by staying — voicing a need or a boundary instead of vanishing behind an agreeable smile.",
    ],
    strengths: ["Refined aesthetic sense", "Warm, unpretentious presence", "Adapts gracefully to change", "Deeply loyal to their few"],
    growth: ["Avoids conflict by disappearing", "Underplans for the future", "Harshly self-critical about their art"],
    careers: ["Chef", "Photographer", "Interior designer", "Massage therapist", "Jeweler", "Landscape designer"],
  },
  {
    slug: "estp",
    code: "ESTP",
    name: "The Dynamo",
    group: "adventurers",
    icon: "trending",
    tint: "bg-amber-100 text-amber-700",
    summary:
      "Bold, fast-twitch realists who act while others deliberate — persuasive, alert, and impossible to bore.",
    detail: [
      "Dynamos have a genius for the present moment. They read body language like text, negotiate in real time, and treat obstacles as terrain rather than tragedy. When the plan collapses, everyone looks at the Dynamo — and the Dynamo is already moving.",
      "Consequences, however, live in the future, a place Dynamos visit reluctantly. Their growth is adding one beat of reflection before the leap, and finishing the paperwork the adventure generated.",
    ],
    strengths: ["Acts decisively in real time", "Street-smart persuasion", "Unshakeable under fire", "Makes work feel like play"],
    growth: ["Underweights long-term consequences", "Impatient with theory and process", "Risk appetite can outrun judgment"],
    careers: ["Sales executive", "Emergency responder", "Stock trader", "Construction manager", "Detective", "Sports coach"],
  },
  {
    slug: "esfp",
    code: "ESFP",
    name: "The Live Wire",
    group: "adventurers",
    icon: "megaphone",
    tint: "bg-amber-100 text-amber-700",
    summary:
      "Playful, generous entertainers who turn ordinary moments into occasions — and make everyone feel like the party's guest of honor.",
    detail: [
      "Live Wires believe joy is a renewable resource and they are its local utility. They notice what delights people and provide it: the perfect song, the spontaneous toast, the well-timed joke that dissolves a tense room.",
      "Difficult emotions and dull obligations get postponed — sometimes indefinitely. Live Wires grow by learning that facing the boring or painful thing today is what protects tomorrow's fun.",
    ],
    strengths: ["Instantly likeable and inclusive", "Sharp practical observation", "Generous with time and things", "Turns setbacks into stories"],
    growth: ["Avoids unpleasant topics", "Spends impulsively — money and energy", "Distracted from long-term goals"],
    careers: ["Performer", "Flight attendant", "Public relations", "Fitness instructor", "Restaurant manager", "Tour guide"],
  },
];

export type EnneagramType = {
  slug: string;
  number: number;
  name: string;
  center: "body" | "heart" | "head";
  icon: IconName;
  coreDesire: string;
  coreFear: string;
  summary: string;
};

export const enneagramTypes: EnneagramType[] = [
  {
    slug: "type-1",
    number: 1,
    name: "The Idealist",
    center: "body",
    icon: "scale",
    coreDesire: "To be good, balanced, and beyond reproach",
    coreFear: "Being corrupt, careless, or wrong",
    summary:
      "Ones carry an inner critic with a clipboard. They see how things ought to be and feel personally responsible for closing the gap — with high standards, quiet resentment when others don't share them, and real integrity underneath it all.",
  },
  {
    slug: "type-2",
    number: 2,
    name: "The Giver",
    center: "heart",
    icon: "heart",
    coreDesire: "To be loved and needed",
    coreFear: "Being unwanted or unworthy of love",
    summary:
      "Twos read needs like weather and move to meet them, often before being asked. Their generosity is real — and so is the unspoken ledger. Growth begins when Twos let themselves receive without earning it first.",
  },
  {
    slug: "type-3",
    number: 3,
    name: "The Striver",
    center: "heart",
    icon: "trending",
    coreDesire: "To be valuable and admired for achievement",
    coreFear: "Being worthless apart from what they accomplish",
    summary:
      "Threes are adaptable achievers who can become whatever the room rewards. Efficient, polished, and driven, their work is telling the difference between the performance and the person — and letting the person be seen.",
  },
  {
    slug: "type-4",
    number: 4,
    name: "The Original",
    center: "heart",
    icon: "palette",
    coreDesire: "To be authentic and significant",
    coreFear: "Having no identity or meaning",
    summary:
      "Fours feel life at full saturation and refuse to pretend otherwise. Drawn to beauty, depth, and what's missing, they turn longing into art. Their growth is discovering they were never as deficient as the ache insisted.",
  },
  {
    slug: "type-5",
    number: 5,
    name: "The Observer",
    center: "head",
    icon: "eye",
    coreDesire: "To be capable and self-sufficient",
    coreFear: "Being depleted, invaded, or helpless",
    summary:
      "Fives manage life from a well-stocked inner library, trading participation for understanding. Brilliant in their chosen domains, they grow by discovering that engagement replenishes some resources that withdrawal never could.",
  },
  {
    slug: "type-6",
    number: 6,
    name: "The Guardian",
    center: "head",
    icon: "shield",
    coreDesire: "To have security and support",
    coreFear: "Being without guidance when it matters",
    summary:
      "Sixes are loyal skeptics who stress-test everything — plans, promises, authorities — because someone has to. At their best they're the most courageous and committed people in the room; the work is trusting their own inner authority.",
  },
  {
    slug: "type-7",
    number: 7,
    name: "The Explorer",
    center: "head",
    icon: "compass",
    coreDesire: "To be satisfied and free",
    coreFear: "Being trapped in pain or deprivation",
    summary:
      "Sevens keep several futures open at once, reframing every setback into an option. Their enthusiasm is genuine and their calendars are full — sometimes to outrun discomfort. Growth is staying present long enough to be fully satisfied.",
  },
  {
    slug: "type-8",
    number: 8,
    name: "The Protector",
    center: "body",
    icon: "anchor",
    coreDesire: "To be strong and in control of their own life",
    coreFear: "Being controlled, betrayed, or vulnerable",
    summary:
      "Eights meet the world at full strength and expect it to push back. They protect their people fiercely and challenge power reflexively. Their growth is discovering that vulnerability, chosen freely, is the deepest form of strength.",
  },
  {
    slug: "type-9",
    number: 9,
    name: "The Harmonizer",
    center: "body",
    icon: "leaf",
    coreDesire: "To have inner and outer peace",
    coreFear: "Conflict, loss, and separation",
    summary:
      "Nines merge with the current of other people's agendas so smoothly they can forget they had their own. Steady, accepting, and quietly stubborn, their growth is waking up to their own priorities — and saying them out loud.",
  },
];

export function getPersonalityType(slug: string) {
  return personalityTypes.find((t) => t.slug === slug);
}

export function getTypeByCode(code: string) {
  return personalityTypes.find((t) => t.code === code.toUpperCase());
}
