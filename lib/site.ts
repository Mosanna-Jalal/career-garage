import type { IconName } from "@/components/icons";

/**
 * Single source of truth for the Career Garage information architecture.
 * Mirrors the six top-level sections in the client specification.
 */

export type NavLink = {
  href: string;
  label: string;
  blurb?: string;
  icon?: IconName;
};

export type NavSection = {
  label: string;
  href?: string;
  /** grouped children render as a mega-menu column */
  groups: { heading?: string; links: NavLink[] }[];
};

export const audienceLinks: NavLink[] = [
  {
    href: "/for/class-1-7",
    label: "Class 1–7 Students",
    blurb: "Fun, activity-led learning that builds confidence early",
    icon: "spark",
  },
  {
    href: "/for/class-8-9",
    label: "Class 8–9 Students",
    blurb: "Discover strengths and explore careers before streaming",
    icon: "compass",
  },
  {
    href: "/for/class-10-12",
    label: "Class 10–12 Students",
    blurb: "Choose the right stream, college and career path",
    icon: "target",
  },
  {
    href: "/for/college-graduates",
    label: "College & Graduates",
    blurb: "Turn your education into employability and a first job",
    icon: "briefcase",
  },
];

export const programmeLinks: NavLink[] = [
  {
    href: "/programmes/internships",
    label: "Internship & Training",
    blurb: "17 internship formats with mentors, projects and certificates",
    icon: "briefcase",
  },
  {
    href: "/programmes/certification",
    label: "Certification Programme",
    blurb: "Industry-recognised credentials with QR verification",
    icon: "shield",
  },
  {
    href: "/programmes/scholarships",
    label: "Scholarship with CG",
    blurb: "12 scholarship categories from merit to social impact",
    icon: "star",
  },
  {
    href: "/programmes/contests",
    label: "Contests & Competitions",
    blurb: "Class-wise contests, olympiads and a national championship",
    icon: "trending",
  },
];

export const roadMapLinks: NavLink[] = [
  {
    href: "/career-road-map",
    label: "Courses",
    blurb: "Explore careers, courses and entry routes",
    icon: "compass",
  },
  {
    href: "/personality-types",
    label: "The 16 Personality Types",
    blurb: "Type profiles, strengths and career fits",
    icon: "puzzle",
  },
  {
    href: "/career-road-map/enneagram",
    label: "The 9 Enneagram Types",
    blurb: "Core motivations, fears and growth paths",
    icon: "heart",
  },
  {
    href: "/career-road-map/big-five",
    label: "The Big Five Traits",
    blurb: "The most research-backed model of personality",
    icon: "chart",
  },
  {
    href: "/career-road-map/disc",
    label: "DISC Styles",
    blurb: "How you communicate and work with others",
    icon: "users",
  },
  {
    href: "/career-road-map/riasec",
    label: "RIASEC (Holland Codes)",
    blurb: "Six interest themes that map to real occupations",
    icon: "wrench",
  },
];

export const aboutLinks: NavLink[] = [
  { href: "/about", label: "Who Are We?" },
  { href: "/about/philosophy", label: "Our Philosophy" },
  { href: "/about/strengths", label: "Our Strengths" },
  { href: "/about/pedagogy", label: "Our Pedagogy" },
  { href: "/about/accord", label: "Our Accord" },
  { href: "/about/brand", label: "Brand Foundation" },
  { href: "/about/why-career-garage", label: "Why Career Garage?" },
  { href: "/about/team", label: "Our Team" },
];

export const legalLinks: NavLink[] = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Use" },
  { href: "/legal/ai-policy", label: "AI Usage & Responsible AI" },
  { href: "/legal/code-of-conduct", label: "Code of Conduct" },
];

/**
 * The 15 psychometric assessments named in the specification.
 * `available` marks the ones already implemented as playable tests.
 */
export const assessmentLinks: (NavLink & { available: boolean })[] = [
  { href: "/tests/big-five", label: "Big Five (OCEAN)", available: true },
  {
    href: "/tests/personality-type",
    label: "16 Types (MBTI-style)",
    available: true,
  },
  { href: "/tests/enneagram", label: "Enneagram-inspired", available: true },
  {
    href: "/tests/career-explorer",
    label: "RIASEC (Holland)",
    available: true,
  },
  { href: "/tests/workstyle-compass", label: "DISC-style", available: true },
  {
    href: "/tests/leadership-blueprint",
    label: "Leadership Potential",
    available: true,
  },
  {
    href: "/tests/emotional-intelligence",
    label: "Emotional Intelligence",
    available: false,
  },
  {
    href: "/tests/cognitive-aptitude",
    label: "Cognitive Aptitude",
    available: false,
  },
  { href: "/tests/work-values", label: "Work Values", available: false },
  {
    href: "/tests/learning-preferences",
    label: "Learning Preferences",
    available: false,
  },
  {
    href: "/tests/entrepreneurial-mindset",
    label: "Entrepreneurial Mindset",
    available: false,
  },
  {
    href: "/tests/career-readiness",
    label: "Career Readiness",
    available: false,
  },
  {
    href: "/tests/digital-skills-readiness",
    label: "Digital Skills Readiness",
    available: false,
  },
  {
    href: "/tests/employability-skills",
    label: "Employability Skills",
    available: false,
  },
  {
    href: "/tests/scholarship-test",
    label: "Scholarship Test",
    available: false,
  },
];

/**
 * Login / Sign Up menu. The client's note groups Student and Parent under a
 * single entry, which then branches into the two separate registration flows
 * the specification calls for.
 */
export const registerRoles: (NavLink & { summary: string })[] = [
  {
    href: "/register/educator",
    label: "Educator / Teacher",
    icon: "book",
    blurb: "Teach, mentor, judge contests and create content",
    summary:
      "Share your subject expertise with learners across schools and colleges.",
  },
  {
    href: "/register/institute",
    label: "School / Institute",
    icon: "globe",
    blurb: "Schools, colleges, universities, NGOs and training centres",
    summary:
      "Run guidance programmes, assessments and placements for your students.",
  },
  {
    href: "/register/student-parent",
    label: "Student / Parents",
    icon: "spark",
    blurb: "Two linked flows — one for students, one for parents",
    summary:
      "Students build a career profile; parents link to it and follow progress.",
  },
  {
    href: "/register/counsellor",
    label: "Counsellor / Psychologist",
    icon: "chat",
    blurb: "Career counsellors and licensed psychologists",
    summary:
      "Deliver counselling, interpret assessments and support student wellbeing.",
  },
  {
    href: "/register/trainer",
    label: "Professional / Skill Trainer",
    icon: "wrench",
    blurb: "Industry experts, trainers, freelancers and entrepreneurs",
    summary:
      "Run bootcamps, live classes and mentoring grounded in real industry work.",
  },
];

export const navSections: NavSection[] = [
  {
    label: "Students & Parents",
    groups: [{ heading: "By stage", links: audienceLinks }],
  },
  {
    label: "Institutions & Events",
    groups: [{ heading: "Programmes", links: programmeLinks }],
  },
  {
    label: "Career Road Map",
    groups: [{ heading: "Explore", links: roadMapLinks }],
  },
  {
    label: "Assessments",
    href: "/tests",
    groups: [],
  },
  {
    label: "About",
    groups: [
      { heading: "Company", links: aboutLinks },
      { heading: "Policies", links: legalLinks },
    ],
  },
];
