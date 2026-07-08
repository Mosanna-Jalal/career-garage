import type { IconName } from "@/components/icons";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  icon: IconName;
  tint: string;
  date: string;
  readMinutes: number;
  body: { heading?: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "choosing-a-career-that-fits",
    title: "How to Choose a Career That Actually Fits You",
    excerpt:
      "Salary charts and job boards can't answer the only question that matters long-term: what kind of work leaves you with more energy than it takes?",
    category: "Career",
    icon: "compass",
    tint: "bg-violet-100 text-violet-700",
    date: "2026-05-14",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "Most career advice starts from the outside in: which industries are growing, which titles pay well, which skills are in demand. Those questions matter, but they can't tell you whether you'll still want the job in year three — after the novelty fades and the work becomes, simply, your life.",
          "Fit is the inside-out question. It asks what kind of tasks put you in flow, what kind of environments drain you, and what kind of problems you'd solve for free. People who choose on fit don't just report higher satisfaction; they tend to advance faster, because sustained interest beats sporadic willpower every time.",
        ],
      },
      {
        heading: "Start with interests, not titles",
        paragraphs: [
          "Job titles are bundles — a mix of tasks, environments, and social dynamics packaged under one name. 'Marketing manager' at one company means spreadsheets and dashboards; at another, it means workshops and storytelling. Unbundle the title and look at the tasks underneath.",
          "Interest research consistently finds that people cluster around a few stable themes: working with tools and systems, investigating questions, creating original things, helping people, persuading people, and organizing information. Knowing your top two themes lets you evaluate any role — present or future — by its actual ingredients.",
        ],
      },
      {
        heading: "Audit your energy, not just your skills",
        paragraphs: [
          "Being good at something is not the same as being nourished by it. Many people have a 'competence trap' skill — something they do well and quietly dread. Track a normal week and mark which hours left you energized and which left you depleted. Patterns show up fast, and they're more honest than any brainstorm.",
          "Then design toward the energizing column. You rarely need a dramatic career leap; often a role two doors down — same field, different task mix — recovers most of the fit that's missing.",
        ],
      },
      {
        heading: "Test cheaply before you commit",
        paragraphs: [
          "Before retraining or resigning, run small experiments: a freelance project, a volunteer role, twenty coffee chats with people doing the job you think you want. Ask them what a boring Tuesday looks like — not the highlight reel. Career changes fail most often on the parts nobody advertised.",
          "A good assessment shortens this search. It won't hand you a title, but it will tell you which themes to test first — and that can save years of drifting.",
        ],
      },
    ],
  },
  {
    slug: "introverts-at-work",
    title: "The Introvert's Guide to Thriving in a Loud Workplace",
    excerpt:
      "Open offices, stand-ups, brainstorms — the modern workplace was designed by and for the outspoken. Here's how quieter people win anyway.",
    category: "Personality",
    icon: "brain",
    tint: "bg-brand-100 text-brand-700",
    date: "2026-04-22",
    readMinutes: 5,
    body: [
      {
        paragraphs: [
          "Introversion is not shyness, and it is not a deficit of ideas. It's a difference in how energy and processing work: introverts think before speaking, recharge in solitude, and do their best work in depth rather than in bursts of interaction.",
          "The problem is that many workplaces score contribution by airtime. The person who speaks first and most is assumed to be the person with the most to offer — an assumption decades of group research contradict.",
        ],
      },
      {
        heading: "Move the conversation to your home field",
        paragraphs: [
          "Introverts routinely lose the meeting but win the memo. If decisions at your company happen in live discussion, get your thinking into the room in writing before the meeting starts — a one-page pre-read reframes the discussion around your analysis, delivered in the format where you're strongest.",
          "Follow-up notes work the same magic in reverse: the thoughtful summary that arrives an hour later often becomes the official record of what was decided.",
        ],
      },
      {
        heading: "Schedule your energy like a budget",
        paragraphs: [
          "Back-to-back social obligations bankrupt an introvert by 2 p.m. Cluster meetings where you can, protect recovery blocks around them, and treat deep-work time as an appointment with the same standing as anyone else's meeting.",
          "And speak up early in meetings — even briefly. Group dynamics research shows early speakers get invited back into the conversation; silence in the first ten minutes becomes hard to break by the thirty-minute mark.",
        ],
      },
    ],
  },
  {
    slug: "personality-types-in-relationships",
    title: "Why Opposites Attract — and Then Annoy Each Other",
    excerpt:
      "The traits that draw couples together are usually the same ones they fight about two years later. Personality science explains the pattern.",
    category: "Relationships",
    icon: "heart",
    tint: "bg-rose-100 text-rose-600",
    date: "2026-03-30",
    readMinutes: 5,
    body: [
      {
        paragraphs: [
          "The spontaneous one marries the planner and calls it balance. Two years later, the same couple is arguing about vacations booked eight months out versus booked at the airport. Nothing changed — except that novelty became normal, and 'refreshingly different' quietly rebranded as 'why are you like this.'",
          "Personality differences don't doom relationships. Unnamed personality differences do. When partners can label a clash as a difference in wiring rather than a failure of love, the argument changes shape entirely.",
        ],
      },
      {
        heading: "The three classic mismatches",
        paragraphs: [
          "The planner and the improviser fight about time and commitments. The feeler and the thinker fight about how problems should be discussed — comfort first or solutions first. The socializer and the homebody fight about weekends. Each pairing brings real advantages; each has a predictable script it will fall into under stress.",
          "The intervention is the same for all three: name the difference out loud in a calm moment, agree on what each person needs, and design small protocols — 'solutions after empathy,' 'one anchored plan per weekend' — before the next collision.",
        ],
      },
      {
        heading: "Difference is a feature with a maintenance cost",
        paragraphs: [
          "Couples matched on every trait have their own failure mode: shared blind spots. Two improvisers miss the flight together. Difference gives a relationship range — someone who can plan and someone who can pivot — but range requires maintenance, and maintenance starts with a shared vocabulary.",
          "That's the real value of taking a personality assessment together: not the labels, but the hour of conversation about the labels.",
        ],
      },
    ],
  },
  {
    slug: "science-of-personality-tests",
    title: "What Personality Tests Can and Can't Tell You",
    excerpt:
      "A candid look at the science: where personality assessment is genuinely predictive, where it's just fun, and how to be a smart consumer of both.",
    category: "Science",
    icon: "chart",
    tint: "bg-sky-100 text-sky-700",
    date: "2026-03-08",
    readMinutes: 7,
    body: [
      {
        paragraphs: [
          "Personality assessment sits on a spectrum. At one end is the five-factor model, with thousands of peer-reviewed studies linking traits to job performance, health behaviors, and relationship outcomes. At the other end are the quizzes that tell you which sandwich you are. Most popular tests live somewhere in between.",
          "Being a smart consumer means knowing what any given instrument can honestly claim — and what it can't.",
        ],
      },
      {
        heading: "What good tests do well",
        paragraphs: [
          "Well-built assessments do three things reliably. They describe: giving you accurate, organized language for patterns you half-knew about yourself. They compare: showing where you sit relative to other people, which self-reflection alone can't do. And they predict — modestly: conscientiousness correlates with job performance, extraversion with social network size, and so on. Modest correlations across large groups, not prophecies about individuals.",
          "That descriptive power is not trivial. A shared vocabulary for differences is the starting point of most workplace and relationship repair.",
        ],
      },
      {
        heading: "Where to keep your skepticism",
        paragraphs: [
          "Be wary of any test that claims to reveal your unchangeable essence, gate-keeps careers ('only these five jobs suit your type'), or is used to screen people out of opportunities. Type systems in particular draw sharp lines through what are really continuous dimensions — useful as a language, misleading as a verdict.",
          "Personality also changes: it shifts measurably across the lifespan, and deliberately with effort. A result is a snapshot of your current patterns, not a sentence.",
        ],
      },
      {
        heading: "How to use your results",
        paragraphs: [
          "Treat a report the way you'd treat a good friend's observation: seriously, but not as gospel. Look for the two or three findings that ring true and act on those — a boundary to set, a strength to lean into, a friction to finally name with your partner or team. The test is the conversation starter. You're still the expert on you.",
        ],
      },
    ],
  },
  {
    slug: "burnout-by-personality-type",
    title: "Burnout Has a Personality: How Different Types Run Out of Fuel",
    excerpt:
      "Burnout isn't one condition — the overcommitted helper, the perfectionist, and the bored high-performer are failing in three different ways.",
    category: "Wellbeing",
    icon: "leaf",
    tint: "bg-emerald-100 text-emerald-700",
    date: "2026-02-17",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "We talk about burnout as if it were a single ailment with a single cure — usually 'self-care.' But the helper who can't say no, the perfectionist who can't say done, and the restless talent who can't say why are depleting through entirely different mechanisms. Generic advice bounces off all three.",
        ],
      },
      {
        heading: "The empathic overcommitter",
        paragraphs: [
          "Warm, people-first types burn out through emotional overdraft: absorbing everyone's needs, saying yes reflexively, and treating their own limits as negotiable. The fix isn't a bubble bath; it's structural — fewer standing commitments, explicit boundaries, and practice tolerating the discomfort of disappointing someone.",
        ],
      },
      {
        heading: "The perfectionist",
        paragraphs: [
          "Conscientious, standards-driven types burn out through an unfinishable to-do list — because nothing they produce ever clears their internal bar. Their intervention is redefining 'done': time-boxing tasks, shipping at ninety percent, and noticing that the world did not, in fact, end.",
        ],
      },
      {
        heading: "The understimulated high-performer",
        paragraphs: [
          "The third burnout is quieter and often misdiagnosed as laziness: the quick, novelty-driven mind stuck in repetitive work. Energy collapses not from overload but from meaninglessness. The cure is redesign, not rest — negotiating for the new problem, the stretch project, the rotation. Rest just returns them, refreshed, to the same boredom.",
          "The common thread: burnout treatment starts with an accurate diagnosis of which fuel you've run out of. Know your pattern before it knows you.",
        ],
      },
    ],
  },
  {
    slug: "building-teams-with-type",
    title: "The Manager's Guide to Personality-Aware Teams",
    excerpt:
      "You don't need everyone to be the same type — you need everyone to know the types they're working with. A practical playbook for managers.",
    category: "Teams",
    icon: "users",
    tint: "bg-amber-100 text-amber-700",
    date: "2026-01-25",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "Every experienced manager eventually learns the same lesson: most 'performance problems' are actually fit and friction problems. The detail-oriented analyst drowning in ambiguity, the big-picture thinker suffocating under process, the quiet contributor whose ideas die in loud meetings — none of these people are underperforming. They're mis-deployed.",
        ],
      },
      {
        heading: "Map the team before the crisis",
        paragraphs: [
          "Run a lightweight assessment as a team exercise — voluntarily, with results shared by choice. The goal is a working map: who needs context before deciding, who needs deadlines to focus, who processes out loud, who processes overnight. Thirty minutes of discussion typically surfaces friction that has cost months.",
          "One rule keeps it healthy: results explain preferences, never excuse behavior, and never gate assignments. 'I'm a spontaneous type' explains why deadlines are hard; it doesn't waive them.",
        ],
      },
      {
        heading: "Design meetings for every wiring",
        paragraphs: [
          "Send the agenda and pre-read a day early — the internal processors will arrive with your meeting's best thinking. Open with two minutes of silent reading or writing before discussion. Go around the room once before decisions. None of this is exotic; all of it consistently doubles how many brains actually contribute.",
        ],
      },
      {
        heading: "Staff the friction on purpose",
        paragraphs: [
          "Homogeneous teams feel great and miss things. The planner-improviser pairing that annoys itself in week two is the same pairing that catches both the schedule risk and the pivot opportunity in month six. Personality-aware managers don't eliminate friction — they staff it deliberately and referee it kindly.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
