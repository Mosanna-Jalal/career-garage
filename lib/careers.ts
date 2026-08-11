import type { IconName } from "@/components/icons";

/**
 * Career Road Map library — the Career Garage equivalent of a career library.
 *
 * Structure mirrors a standard career-library layout (flat list of careers,
 * grouped by cluster, each with about / pathway / eligibility / skills /
 * specialisations / institutes / outlook). All copy is written for Career
 * Garage.
 *
 * SALARY NOTE: bands are broad and indicative only. They vary by city,
 * employer, sector and year, and should be reviewed against current market
 * data before publication.
 */

export type Career = {
  slug: string;
  name: string;
  cluster: string;
  tagline: string;
  icon: IconName;
  tint: string;
  about: string[];
  whatYouDo: string[];
  pathway: { stage: string; detail: string }[];
  entranceExams: string[];
  skills: string[];
  specialisations: string[];
  instituteTypes: string[];
  salary: { level: string; range: string }[];
  suitsYouIf: string[];
  considerThat: string[];
  /** RIASEC themes this career leans on — links back to the framework pages */
  riasec: string[];
  related: string[];
};

export const careers: Career[] = [
  /* ---------------- ENGINEERING & TECHNOLOGY ---------------- */
  {
    slug: "software-engineer",
    name: "Software Engineer",
    cluster: "Engineering & Technology",
    tagline: "Design, build and maintain the systems people use every day",
    icon: "wrench",
    tint: "bg-sky-50 text-sky-700",
    about: [
      "Software engineers turn a problem description into working, reliable software. That covers everything from the apps on your phone to the payment systems behind a bank, the logistics software moving goods across the country, and the tools other engineers build with.",
      "The job is less about typing code than about deciding what to build and how it should be structured. Most working engineers spend a large share of their time reading existing code, discussing trade-offs, testing, and fixing things that break in ways nobody predicted.",
    ],
    whatYouDo: [
      "Translate requirements into technical designs",
      "Write, review and test code",
      "Debug failures in live systems",
      "Work with designers, product managers and other engineers",
      "Maintain and improve software already in use",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail:
          "Choose the Science stream with Mathematics. Physics, Chemistry and Maths (PCM) keeps engineering entrance options open.",
      },
      {
        stage: "After Class 12",
        detail:
          "Pursue B.Tech/B.E. in Computer Science or IT, or BCA followed by MCA. Some enter through diploma routes or self-taught portfolios, particularly in web development.",
      },
      {
        stage: "During your degree",
        detail:
          "Build real projects, contribute to open source, and take internships. A portfolio of working software often matters more to employers than marks alone.",
      },
      {
        stage: "Entry to work",
        detail:
          "Campus placement, direct application, or starting in a smaller company or startup where you'll touch more of the stack.",
      },
    ],
    entranceExams: ["JEE Main", "JEE Advanced", "State CETs", "BITSAT", "CUET"],
    skills: [
      "Problem solving",
      "Logical reasoning",
      "Programming languages",
      "Data structures & algorithms",
      "Debugging",
      "Communication",
      "Version control",
    ],
    specialisations: [
      "Frontend development",
      "Backend development",
      "Mobile development",
      "DevOps & cloud",
      "Machine learning engineering",
      "Cybersecurity",
      "Embedded systems",
      "Game development",
    ],
    instituteTypes: [
      "IITs and NITs",
      "IIITs",
      "State engineering colleges",
      "Private universities",
      "Recognised online degree programmes",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Varies widely by employer tier" },
      { level: "Mid (3–7 yrs)", range: "Rises steeply with demonstrated skill" },
      { level: "Senior (8+ yrs)", range: "Among the higher-paying technical tracks" },
    ],
    suitsYouIf: [
      "You enjoy breaking hard problems into smaller ones",
      "You're comfortable being wrong and iterating",
      "You like building things you can show people",
      "You can concentrate for long stretches",
    ],
    considerThat: [
      "The field changes constantly — learning never really stops",
      "Long screen hours and periods of high pressure near deadlines",
      "Entry-level competition is intense; projects help you stand out",
    ],
    riasec: ["Investigative", "Realistic"],
    related: ["data-scientist", "ui-ux-designer", "cybersecurity-analyst"],
  },

  {
    slug: "data-scientist",
    name: "Data Scientist",
    cluster: "Engineering & Technology",
    tagline: "Find the signal in messy data and turn it into decisions",
    icon: "chart",
    tint: "bg-violet-50 text-violet-700",
    about: [
      "Data scientists use statistics, programming and domain knowledge to answer questions organisations can't answer by intuition — which customers are about to leave, which crops are failing, which transactions look fraudulent.",
      "Much of the work is unglamorous and essential: finding the data, cleaning it, checking whether it means what people assume it means. Modelling is often the smallest part of the job.",
    ],
    whatYouDo: [
      "Frame business questions as analysable problems",
      "Collect, clean and validate datasets",
      "Build statistical and machine-learning models",
      "Visualise findings for non-technical audiences",
      "Monitor models once they're in production",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail:
          "Science with Mathematics. Statistics and Maths are the foundation of everything here.",
      },
      {
        stage: "After Class 12",
        detail:
          "B.Tech (CS/IT), B.Sc in Statistics, Mathematics, Economics or Data Science. Strong quantitative grounding matters more than the exact degree name.",
      },
      {
        stage: "Postgraduate",
        detail:
          "M.Sc/M.Tech in Data Science, Statistics or AI, or a specialised postgraduate diploma. Many enter from physics, economics or engineering backgrounds.",
      },
      {
        stage: "Entry to work",
        detail:
          "Analyst roles are a common entry point. A portfolio of end-to-end projects with real datasets carries significant weight.",
      },
    ],
    entranceExams: ["JEE Main", "CUET", "GATE", "University entrance tests"],
    skills: [
      "Statistics",
      "Python or R",
      "SQL",
      "Machine learning",
      "Data visualisation",
      "Critical thinking",
      "Communication",
    ],
    specialisations: [
      "Machine learning",
      "Natural language processing",
      "Computer vision",
      "Business analytics",
      "Bioinformatics",
      "Quantitative finance",
    ],
    instituteTypes: [
      "IITs and IISc",
      "ISI (Indian Statistical Institute)",
      "IIITs",
      "Central and state universities",
      "Specialised analytics institutes",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Competitive with software roles" },
      { level: "Mid (3–7 yrs)", range: "Strong growth with specialisation" },
      { level: "Senior (8+ yrs)", range: "High, particularly in finance and tech" },
    ],
    suitsYouIf: [
      "You're genuinely curious about why numbers move",
      "You're sceptical of claims without evidence",
      "You enjoy explaining complex things simply",
    ],
    considerThat: [
      "Far more data cleaning than modelling in practice",
      "Requires real statistical rigour, not just tool familiarity",
      "Results are often ambiguous and need careful communication",
    ],
    riasec: ["Investigative", "Conventional"],
    related: ["software-engineer", "actuary", "economist"],
  },

  {
    slug: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    cluster: "Engineering & Technology",
    tagline: "Defend systems, data and people from attack",
    icon: "shield",
    tint: "bg-emerald-50 text-emerald-700",
    about: [
      "Cybersecurity analysts protect an organisation's systems and data. They monitor for intrusions, investigate incidents, test defences by trying to break them, and design the policies that make attacks harder.",
      "It's an adversarial field: someone is actively working against you. That makes it unusually engaging, and occasionally stressful when something goes wrong at 3am.",
    ],
    whatYouDo: [
      "Monitor networks for suspicious activity",
      "Investigate and contain security incidents",
      "Run penetration tests and vulnerability assessments",
      "Design security policies and train staff",
      "Keep up with new attack techniques",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "B.Tech in Computer Science, IT or a dedicated Cybersecurity programme; BCA is also a viable entry.",
      },
      {
        stage: "Certifications",
        detail:
          "Industry certifications carry real weight here — often more than in other technology fields.",
      },
      {
        stage: "Entry to work",
        detail:
          "Security operations centre (SOC) analyst roles are the usual starting point, moving into specialisms later.",
      },
    ],
    entranceExams: ["JEE Main", "State CETs", "CUET"],
    skills: [
      "Networking fundamentals",
      "Operating systems",
      "Scripting",
      "Threat analysis",
      "Attention to detail",
      "Ethical judgement",
    ],
    specialisations: [
      "Penetration testing",
      "Digital forensics",
      "Cloud security",
      "Governance & compliance",
      "Incident response",
      "Application security",
    ],
    instituteTypes: [
      "IITs and NITs",
      "IIITs",
      "Private universities with security programmes",
      "Recognised certification bodies",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "In line with software engineering" },
      { level: "Mid (3–7 yrs)", range: "Premium for scarce specialisms" },
      { level: "Senior (8+ yrs)", range: "High; demand exceeds supply" },
    ],
    suitsYouIf: [
      "You like puzzles with an opponent on the other side",
      "You're methodical and document carefully",
      "You hold a strong ethical line under pressure",
    ],
    considerThat: [
      "On-call and incident response can disrupt personal time",
      "Requires continuous learning as threats evolve",
      "Access to sensitive systems carries real responsibility",
    ],
    riasec: ["Investigative", "Conventional"],
    related: ["software-engineer", "data-scientist"],
  },

  {
    slug: "mechanical-engineer",
    name: "Mechanical Engineer",
    cluster: "Engineering & Technology",
    tagline: "Design and build the physical machinery the world runs on",
    icon: "wrench",
    tint: "bg-stone-100 text-stone-700",
    about: [
      "Mechanical engineering is the broadest engineering discipline. It covers anything that moves or transfers energy — engines, turbines, manufacturing lines, HVAC systems, robotics, medical devices and vehicles.",
      "Because it's so broad, mechanical engineers work across almost every sector, from automotive and aerospace to energy, manufacturing and increasingly renewables.",
    ],
    whatYouDo: [
      "Design mechanical components and systems",
      "Model and simulate designs before building",
      "Test prototypes and analyse failures",
      "Oversee manufacturing and quality processes",
      "Improve efficiency of existing systems",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail: "Science stream with Physics, Chemistry and Mathematics.",
      },
      {
        stage: "After Class 12",
        detail:
          "B.Tech/B.E. in Mechanical Engineering, or a diploma followed by lateral entry.",
      },
      {
        stage: "Postgraduate (optional)",
        detail:
          "M.Tech for specialisation, or an MBA for management tracks. Many move into operations or product roles.",
      },
    ],
    entranceExams: ["JEE Main", "JEE Advanced", "State CETs", "GATE"],
    skills: [
      "Mathematics and physics",
      "CAD software",
      "Problem solving",
      "Materials knowledge",
      "Project management",
      "Practical hands-on ability",
    ],
    specialisations: [
      "Automotive",
      "Aerospace",
      "Robotics & mechatronics",
      "Thermal & energy systems",
      "Manufacturing",
      "Renewable energy",
    ],
    instituteTypes: [
      "IITs and NITs",
      "State engineering colleges",
      "Private universities",
      "Polytechnics (diploma route)",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Moderate; varies by sector" },
      { level: "Mid (3–7 yrs)", range: "Steady growth with specialisation" },
      { level: "Senior (8+ yrs)", range: "Strong in energy and aerospace" },
    ],
    suitsYouIf: [
      "You like understanding how physical things work",
      "You enjoy both theory and hands-on building",
      "You're patient with iterative testing",
    ],
    considerThat: [
      "Core manufacturing roles may involve plant or site postings",
      "Salary growth is often slower than software early on",
      "Some roles require relocation to industrial hubs",
    ],
    riasec: ["Realistic", "Investigative"],
    related: ["civil-engineer", "software-engineer", "commercial-pilot"],
  },

  {
    slug: "civil-engineer",
    name: "Civil Engineer",
    cluster: "Engineering & Technology",
    tagline: "Plan and build infrastructure that lasts generations",
    icon: "anchor",
    tint: "bg-amber-50 text-amber-700",
    about: [
      "Civil engineers design and oversee construction of the built environment — roads, bridges, dams, water systems, railways and buildings. The work sits at the intersection of physics, materials, budgets and public safety.",
      "It's one of the few careers where your output is visibly permanent, and where an error carries genuine public consequence. Regulation and accountability are correspondingly serious.",
    ],
    whatYouDo: [
      "Survey sites and assess feasibility",
      "Design structures to meet safety codes",
      "Estimate materials, costs and timelines",
      "Supervise construction on site",
      "Inspect and maintain existing infrastructure",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail: "Science stream with PCM.",
      },
      {
        stage: "After Class 12",
        detail: "B.Tech/B.E. in Civil Engineering, or diploma plus lateral entry.",
      },
      {
        stage: "Career entry",
        detail:
          "Private construction and consultancy firms, or public sector through competitive examinations.",
      },
    ],
    entranceExams: ["JEE Main", "JEE Advanced", "State CETs", "GATE", "SSC JE"],
    skills: [
      "Structural analysis",
      "CAD and modelling software",
      "Site management",
      "Cost estimation",
      "Regulatory knowledge",
      "Team coordination",
    ],
    specialisations: [
      "Structural engineering",
      "Transportation",
      "Geotechnical",
      "Water resources",
      "Environmental engineering",
      "Construction management",
    ],
    instituteTypes: [
      "IITs and NITs",
      "State engineering colleges",
      "Private universities",
      "Polytechnics",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Modest in private construction" },
      { level: "Mid (3–7 yrs)", range: "Improves with site responsibility" },
      { level: "Senior (8+ yrs)", range: "Strong in consultancy and PSUs" },
    ],
    suitsYouIf: [
      "You want visible, lasting results from your work",
      "You're comfortable combining office and field work",
      "You take safety and precision seriously",
    ],
    considerThat: [
      "Site postings can mean living away from cities",
      "Project timelines are long and weather-dependent",
      "Public-sector routes require competitive exams",
    ],
    riasec: ["Realistic", "Conventional"],
    related: ["architect", "mechanical-engineer"],
  },

  /* ---------------- MEDICAL & HEALTHCARE ---------------- */
  {
    slug: "doctor",
    name: "Doctor (MBBS)",
    cluster: "Medical & Healthcare",
    tagline: "Diagnose, treat and care for patients",
    icon: "heart",
    tint: "bg-rose-50 text-rose-700",
    about: [
      "Medicine is a long training pathway leading to one of the most trusted roles in society. Doctors diagnose illness, prescribe treatment, perform procedures and guide patients and families through difficult decisions.",
      "It demands sustained academic effort over many years, genuine comfort with human suffering, and the emotional resilience to keep making careful decisions when tired.",
    ],
    whatYouDo: [
      "Examine patients and take medical histories",
      "Order and interpret diagnostic tests",
      "Diagnose conditions and plan treatment",
      "Perform procedures or surgery, depending on specialism",
      "Counsel patients and families",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail:
          "Science stream with Physics, Chemistry and Biology (PCB). Biology is mandatory.",
      },
      {
        stage: "After Class 12",
        detail:
          "Clear NEET-UG and complete MBBS — five and a half years including a compulsory rotating internship.",
      },
      {
        stage: "Postgraduate",
        detail:
          "NEET-PG for MD/MS specialisation, typically three further years. Super-specialisation (DM/MCh) adds more.",
      },
      {
        stage: "Practice",
        detail:
          "Register with the relevant medical council before practising independently.",
      },
    ],
    entranceExams: ["NEET-UG", "NEET-PG", "INI-CET"],
    skills: [
      "Scientific knowledge",
      "Clinical judgement",
      "Empathy",
      "Communication under stress",
      "Stamina",
      "Attention to detail",
    ],
    specialisations: [
      "General medicine",
      "Surgery",
      "Paediatrics",
      "Cardiology",
      "Psychiatry",
      "Radiology",
      "Anaesthesiology",
      "Orthopaedics",
    ],
    instituteTypes: [
      "AIIMS institutions",
      "Government medical colleges",
      "Private medical colleges",
      "State universities",
    ],
    salary: [
      { level: "Internship", range: "Stipend only" },
      { level: "Post-MBBS", range: "Modest relative to years invested" },
      { level: "Post-specialisation", range: "Rises substantially" },
    ],
    suitsYouIf: [
      "You can sustain long-term study without losing motivation",
      "You stay calm when others are distressed",
      "You genuinely want to care for people, not just study science",
    ],
    considerThat: [
      "The pathway is long — often a decade before full specialisation",
      "Night shifts, long hours and emotional weight are real",
      "Entrance competition is among the most intense in India",
    ],
    riasec: ["Investigative", "Social"],
    related: ["psychologist", "physiotherapist", "pharmacist"],
  },

  {
    slug: "physiotherapist",
    name: "Physiotherapist",
    cluster: "Medical & Healthcare",
    tagline: "Restore movement and function after injury or illness",
    icon: "users",
    tint: "bg-teal-50 text-teal-700",
    about: [
      "Physiotherapists help people recover physical function after injury, surgery, stroke or long-term illness. They assess movement, design exercise and manual therapy programmes, and coach patients through often slow recovery.",
      "It's a hands-on, relationship-driven branch of healthcare with a shorter training path than medicine and strong demand in sports, geriatrics and rehabilitation.",
    ],
    whatYouDo: [
      "Assess movement, strength and pain",
      "Design and adjust rehabilitation programmes",
      "Deliver manual therapy and guided exercise",
      "Educate patients on prevention and self-care",
      "Work alongside doctors and occupational therapists",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail: "Science stream with Biology.",
      },
      {
        stage: "After Class 12",
        detail:
          "Bachelor of Physiotherapy (BPT) — typically four and a half years including internship.",
      },
      {
        stage: "Postgraduate (optional)",
        detail:
          "MPT for specialisation in sports, neurology, orthopaedics or paediatrics.",
      },
    ],
    entranceExams: ["NEET (some states)", "CUET", "University entrance tests"],
    skills: [
      "Anatomy and physiology",
      "Manual therapy technique",
      "Patience",
      "Motivational communication",
      "Physical stamina",
    ],
    specialisations: [
      "Sports physiotherapy",
      "Neurological rehabilitation",
      "Orthopaedic physiotherapy",
      "Paediatrics",
      "Geriatrics",
      "Cardiopulmonary",
    ],
    instituteTypes: [
      "Government medical colleges",
      "Private physiotherapy institutes",
      "Health science universities",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Modest; grows with reputation" },
      { level: "Mid (3–7 yrs)", range: "Improves in private practice" },
      { level: "Senior (8+ yrs)", range: "Strong for sports and private clinics" },
    ],
    suitsYouIf: [
      "You want healthcare work with a shorter training path",
      "You enjoy sustained one-to-one relationships",
      "You're physically active and hands-on",
    ],
    considerThat: [
      "Physically demanding — you're on your feet",
      "Progress with patients can be slow and uneven",
      "Private practice requires business skills too",
    ],
    riasec: ["Social", "Realistic"],
    related: ["doctor", "psychologist"],
  },

  {
    slug: "pharmacist",
    name: "Pharmacist",
    cluster: "Medical & Healthcare",
    tagline: "The medicines expert in the healthcare chain",
    icon: "leaf",
    tint: "bg-emerald-50 text-emerald-700",
    about: [
      "Pharmacists are the specialists on how drugs work, interact and should be dispensed. They work in community pharmacies, hospitals, drug manufacturing, regulatory affairs and clinical research.",
      "The role extends well beyond dispensing — hospital and clinical pharmacists advise on dosing, flag dangerous interactions and contribute directly to treatment decisions.",
    ],
    whatYouDo: [
      "Dispense medicines and verify prescriptions",
      "Check for interactions and dosage errors",
      "Advise patients and clinicians on drug use",
      "Support drug development and quality control",
      "Manage inventory and regulatory compliance",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "D.Pharm (two years) for a faster entry, or B.Pharm (four years) for wider options.",
      },
      {
        stage: "Postgraduate",
        detail:
          "M.Pharm or Pharm.D for clinical and research roles; Pharm.D is a six-year clinically focused route.",
      },
      {
        stage: "Registration",
        detail:
          "Register with the State Pharmacy Council to practise.",
      },
    ],
    entranceExams: ["NEET (some states)", "GPAT (postgraduate)", "State CETs"],
    skills: [
      "Pharmacology knowledge",
      "Precision and care",
      "Patient communication",
      "Regulatory awareness",
      "Record keeping",
    ],
    specialisations: [
      "Clinical pharmacy",
      "Industrial pharmacy",
      "Regulatory affairs",
      "Pharmacovigilance",
      "Community pharmacy",
      "Pharmaceutical research",
    ],
    instituteTypes: [
      "NIPER institutes",
      "Government pharmacy colleges",
      "Private pharmacy institutes",
      "Health science universities",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Modest in retail; better in industry" },
      { level: "Mid (3–7 yrs)", range: "Good in regulatory and pharmacovigilance" },
      { level: "Senior (8+ yrs)", range: "Strong in pharma industry roles" },
    ],
    suitsYouIf: [
      "You like chemistry and biology applied practically",
      "You're meticulous — errors here matter",
      "You want healthcare work without surgical training",
    ],
    considerThat: [
      "Retail pharmacy can be repetitive",
      "Industry roles may require relocation to manufacturing hubs",
      "Continuous learning as new drugs arrive",
    ],
    riasec: ["Investigative", "Conventional"],
    related: ["doctor", "data-scientist"],
  },

  /* ---------------- COMMERCE & FINANCE ---------------- */
  {
    slug: "chartered-accountant",
    name: "Chartered Accountant",
    cluster: "Commerce & Finance",
    tagline: "Audit, tax and financial stewardship at a professional standard",
    icon: "clipboard",
    tint: "bg-sky-50 text-sky-700",
    about: [
      "Chartered Accountants audit financial statements, manage taxation, advise on regulation and increasingly guide business strategy. The qualification is demanding and highly portable across industries.",
      "It's one of the few professional routes where you can qualify without a conventional degree path, though the examinations are notoriously difficult and the pass rates low.",
    ],
    whatYouDo: [
      "Audit and verify financial statements",
      "Plan and file taxation",
      "Advise on compliance and regulation",
      "Support mergers, valuations and due diligence",
      "Design internal financial controls",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail:
          "Commerce stream is the natural fit, though students from any stream can enter.",
      },
      {
        stage: "After Class 12",
        detail:
          "Register for the CA Foundation, then progress through Intermediate and Final levels.",
      },
      {
        stage: "Articleship",
        detail:
          "Complete a mandatory practical training period under a practising CA — this is where most of the real learning happens.",
      },
      {
        stage: "Membership",
        detail: "Qualify and register with ICAI to practise as a CA.",
      },
    ],
    entranceExams: ["CA Foundation", "CA Intermediate", "CA Final"],
    skills: [
      "Numerical accuracy",
      "Accounting standards",
      "Taxation law",
      "Analytical thinking",
      "Ethics and integrity",
      "Attention to detail",
    ],
    specialisations: [
      "Audit and assurance",
      "Direct and indirect taxation",
      "Forensic accounting",
      "Corporate finance",
      "Risk advisory",
      "Management consulting",
    ],
    instituteTypes: [
      "ICAI (professional body)",
      "Coaching institutes",
      "Articleship firms — Big Four and mid-tier",
    ],
    salary: [
      { level: "Fresh CA", range: "Varies sharply by firm tier" },
      { level: "Mid (3–7 yrs)", range: "Strong, especially in industry roles" },
      { level: "Senior / Partner", range: "Among the highest in commerce" },
    ],
    suitsYouIf: [
      "You're disciplined enough for multi-year self-study",
      "You're precise and comfortable with rules",
      "You want a portable professional qualification",
    ],
    considerThat: [
      "Low pass rates — many take multiple attempts",
      "Articleship stipends are low relative to hours",
      "Busy seasons involve very long hours",
    ],
    riasec: ["Conventional", "Enterprising"],
    related: ["actuary", "investment-banker", "economist"],
  },

  {
    slug: "investment-banker",
    name: "Investment Banker",
    cluster: "Commerce & Finance",
    tagline: "Advise on capital, mergers and large financial transactions",
    icon: "trending",
    tint: "bg-amber-50 text-amber-700",
    about: [
      "Investment bankers help companies raise capital, go public, and buy or merge with other companies. The work involves financial modelling, valuation, structuring deals and pitching to clients.",
      "It's high-paying and high-pressure, with famously long hours at junior levels. The skills transfer well into private equity, corporate strategy and entrepreneurship.",
    ],
    whatYouDo: [
      "Build financial models and valuations",
      "Prepare pitch materials for clients",
      "Run due diligence on transactions",
      "Structure and negotiate deals",
      "Maintain client relationships",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "B.Com, BBA, Economics or Engineering — the field recruits from all of these.",
      },
      {
        stage: "Postgraduate",
        detail:
          "MBA in Finance from a top-tier institution is the most common route; CFA is a strong complement.",
      },
      {
        stage: "Entry to work",
        detail:
          "Analyst roles via campus placement at leading business schools, or through internships converted to offers.",
      },
    ],
    entranceExams: ["CAT", "XAT", "GMAT", "CFA (professional)"],
    skills: [
      "Financial modelling",
      "Valuation",
      "Excel proficiency",
      "Commercial awareness",
      "Presentation",
      "Stamina under pressure",
    ],
    specialisations: [
      "Mergers & acquisitions",
      "Equity capital markets",
      "Debt capital markets",
      "Private equity",
      "Restructuring",
    ],
    instituteTypes: [
      "IIMs and top private business schools",
      "Delhi University commerce colleges",
      "CFA Institute",
    ],
    salary: [
      { level: "Analyst", range: "High relative to peers, with long hours" },
      { level: "Associate", range: "Substantial, bonus-weighted" },
      { level: "VP and above", range: "Among the highest in finance" },
    ],
    suitsYouIf: [
      "You thrive under deadline pressure",
      "You're comfortable with numbers and negotiation",
      "You want high earnings early and accept the trade-off",
    ],
    considerThat: [
      "Working hours at junior levels are genuinely punishing",
      "Highly cyclical — hiring contracts in downturns",
      "Entry is concentrated in a few institutions",
    ],
    riasec: ["Enterprising", "Conventional"],
    related: ["chartered-accountant", "actuary", "economist"],
  },

  {
    slug: "actuary",
    name: "Actuary",
    cluster: "Commerce & Finance",
    tagline: "Price risk using mathematics and probability",
    icon: "scale",
    tint: "bg-violet-50 text-violet-700",
    about: [
      "Actuaries use statistics and probability to quantify financial risk — how much an insurer should charge, how much a pension fund needs to hold, how a catastrophe would affect a balance sheet.",
      "It's a small, well-compensated profession built on a long series of professional examinations that most candidates take while working.",
    ],
    whatYouDo: [
      "Model future risk and uncertainty",
      "Price insurance products",
      "Value pension and insurance liabilities",
      "Advise on reserves and solvency",
      "Communicate risk to non-technical stakeholders",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail: "Science or Commerce with strong Mathematics.",
      },
      {
        stage: "After Class 12",
        detail:
          "B.Sc in Statistics, Mathematics or Actuarial Science; Economics also works.",
      },
      {
        stage: "Professional exams",
        detail:
          "Clear the actuarial examination series while working — this typically takes several years.",
      },
    ],
    entranceExams: ["ACET", "CUET", "Actuarial professional examinations"],
    skills: [
      "Advanced mathematics",
      "Probability and statistics",
      "Programming",
      "Business judgement",
      "Persistence",
    ],
    specialisations: [
      "Life insurance",
      "General insurance",
      "Health insurance",
      "Pensions",
      "Investment",
      "Enterprise risk management",
    ],
    instituteTypes: [
      "Institute of Actuaries of India",
      "ISI and statistics departments",
      "Universities with actuarial programmes",
    ],
    salary: [
      { level: "Student actuary", range: "Reasonable while studying" },
      { level: "Part-qualified", range: "Rises with each exam cleared" },
      { level: "Fellow", range: "Very high; small talent pool" },
    ],
    suitsYouIf: [
      "You're genuinely strong at mathematics",
      "You can sustain exam study alongside a job for years",
      "You like precise, consequential analysis",
    ],
    considerThat: [
      "The exam series is long and attrition is high",
      "Smaller job market than general finance",
      "Work can be narrow and technical",
    ],
    riasec: ["Investigative", "Conventional"],
    related: ["data-scientist", "chartered-accountant", "economist"],
  },

  {
    slug: "economist",
    name: "Economist",
    cluster: "Commerce & Finance",
    tagline: "Analyse how resources, policy and markets interact",
    icon: "chart",
    tint: "bg-sky-50 text-sky-700",
    about: [
      "Economists study how people, firms and governments allocate scarce resources. They work in policy institutions, banks, consultancies, research bodies and international organisations.",
      "The discipline blends theory with heavy empirical work, and increasingly overlaps with data science in its methods.",
    ],
    whatYouDo: [
      "Research economic questions using data",
      "Forecast trends and model policy effects",
      "Write reports and advise decision-makers",
      "Evaluate programmes and interventions",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "BA/B.Sc in Economics. Mathematics at Class 12 is strongly advantageous.",
      },
      {
        stage: "Postgraduate",
        detail:
          "MA/M.Sc in Economics is effectively the entry requirement for most roles.",
      },
      {
        stage: "Research track",
        detail:
          "PhD for academic, central bank and senior research positions.",
      },
    ],
    entranceExams: ["CUET", "DSE entrance", "ISI admission test", "JNU entrance"],
    skills: [
      "Econometrics",
      "Statistical software",
      "Analytical writing",
      "Mathematics",
      "Policy awareness",
    ],
    specialisations: [
      "Development economics",
      "Macroeconomics",
      "Behavioural economics",
      "Public policy",
      "International trade",
      "Environmental economics",
    ],
    instituteTypes: [
      "Delhi School of Economics",
      "ISI",
      "JNU and central universities",
      "Private universities with strong economics faculties",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Moderate; higher in private sector" },
      { level: "Mid (3–7 yrs)", range: "Good in consulting and banking" },
      { level: "Senior (8+ yrs)", range: "Strong in policy and research leadership" },
    ],
    suitsYouIf: [
      "You're curious about why societies work as they do",
      "You enjoy argument backed by evidence",
      "You're comfortable with mathematics and writing both",
    ],
    considerThat: [
      "Most good roles require a postgraduate degree",
      "Academic paths are competitive and slow",
      "Policy work can be politically constrained",
    ],
    riasec: ["Investigative", "Enterprising"],
    related: ["data-scientist", "actuary", "civil-services-officer"],
  },

  /* ---------------- LAW ---------------- */
  {
    slug: "lawyer",
    name: "Lawyer",
    cluster: "Law & Judiciary",
    tagline: "Advise, advocate and resolve disputes within the legal system",
    icon: "scale",
    tint: "bg-stone-100 text-stone-700",
    about: [
      "Lawyers advise clients on their rights and obligations, draft and negotiate agreements, and represent people in court. The profession splits broadly into litigation — arguing cases — and corporate practice, which is largely advisory and transactional.",
      "It rewards clear writing, structured argument and a high tolerance for detail. Reputation compounds slowly, so early years are often lean.",
    ],
    whatYouDo: [
      "Research statutes, precedent and regulation",
      "Draft contracts, notices and pleadings",
      "Advise clients on risk and options",
      "Appear before courts or tribunals",
      "Negotiate settlements and agreements",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "Five-year integrated law degree (BA LLB, BBA LLB) via entrance examination.",
      },
      {
        stage: "After graduation",
        detail:
          "Three-year LLB if you already hold a bachelor's degree in another subject.",
      },
      {
        stage: "Enrolment",
        detail:
          "Enrol with a State Bar Council and clear the All India Bar Examination to practise.",
      },
    ],
    entranceExams: ["CLAT", "AILET", "LSAT India", "State law entrances"],
    skills: [
      "Legal research",
      "Precise drafting",
      "Oral advocacy",
      "Analytical reasoning",
      "Negotiation",
      "Ethical judgement",
    ],
    specialisations: [
      "Corporate law",
      "Criminal law",
      "Constitutional law",
      "Intellectual property",
      "Tax law",
      "Family law",
      "Environmental law",
    ],
    instituteTypes: [
      "National Law Universities",
      "Faculty of Law, central universities",
      "Private law schools",
    ],
    salary: [
      { level: "Litigation entry", range: "Low initially; builds with reputation" },
      { level: "Corporate entry", range: "High at tier-one firms" },
      { level: "Senior", range: "Very high for established practitioners" },
    ],
    suitsYouIf: [
      "You argue carefully rather than loudly",
      "You read closely and write precisely",
      "You're patient about long-term reputation building",
    ],
    considerThat: [
      "Independent litigation practice pays little at first",
      "Corporate law involves very long hours",
      "Court timelines in India can be slow and frustrating",
    ],
    riasec: ["Enterprising", "Investigative"],
    related: ["civil-services-officer", "chartered-accountant", "journalist"],
  },

  /* ---------------- DESIGN & ARCHITECTURE ---------------- */
  {
    slug: "ui-ux-designer",
    name: "UI/UX Designer",
    cluster: "Design & Architecture",
    tagline: "Make digital products understandable and pleasant to use",
    icon: "palette",
    tint: "bg-violet-50 text-violet-700",
    about: [
      "UX designers work out what a product should do and how it should behave; UI designers shape how it looks and feels. In most teams the roles overlap considerably.",
      "The craft is grounded in research — watching real people struggle with something is usually more informative than any amount of opinion about it.",
    ],
    whatYouDo: [
      "Research user needs and behaviour",
      "Map flows and information architecture",
      "Create wireframes and interactive prototypes",
      "Design interfaces and design systems",
      "Test designs with real users and iterate",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "B.Des in Interaction or Communication Design, or a degree in psychology, computer science or fine arts followed by specialisation.",
      },
      {
        stage: "Portfolio",
        detail:
          "A portfolio of real projects is the single most important hiring factor — often more than the degree.",
      },
      {
        stage: "Entry to work",
        detail:
          "Junior designer roles, internships or freelance work building toward a body of case studies.",
      },
    ],
    entranceExams: ["UCEED", "NID DAT", "NIFT entrance", "CEED (postgraduate)"],
    skills: [
      "User research",
      "Visual design",
      "Prototyping tools",
      "Information architecture",
      "Empathy",
      "Communication and critique",
    ],
    specialisations: [
      "Product design",
      "Interaction design",
      "Design systems",
      "UX research",
      "Service design",
      "Accessibility",
    ],
    instituteTypes: [
      "NID and IITs (Design)",
      "Srishti and private design schools",
      "Recognised online design programmes",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Comparable to junior engineering" },
      { level: "Mid (3–7 yrs)", range: "Strong in product companies" },
      { level: "Senior (8+ yrs)", range: "High for lead and principal roles" },
    ],
    suitsYouIf: [
      "You notice when things are badly designed and why",
      "You can take critique without taking it personally",
      "You're curious about how other people think",
    ],
    considerThat: [
      "Your work is constantly reviewed and revised",
      "Requires defending decisions with evidence, not taste",
      "Junior market is competitive without a portfolio",
    ],
    riasec: ["Artistic", "Investigative"],
    related: ["graphic-designer", "software-engineer", "architect"],
  },

  {
    slug: "graphic-designer",
    name: "Graphic Designer",
    cluster: "Design & Architecture",
    tagline: "Communicate ideas visually across print and screen",
    icon: "palette",
    tint: "bg-orange-50 text-orange-700",
    about: [
      "Graphic designers use typography, colour, image and layout to communicate a message — brand identities, packaging, publications, campaigns and digital content.",
      "It's a craft with a low barrier to entry and a high ceiling. The difference between beginner and expert is usually judgement rather than software skill.",
    ],
    whatYouDo: [
      "Interpret a brief into visual concepts",
      "Design layouts, identities and assets",
      "Select typography and colour systems",
      "Prepare files for print or digital production",
      "Present and revise work with clients",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "B.Des or BFA in Applied/Communication Design; diploma routes are also common.",
      },
      {
        stage: "Portfolio",
        detail:
          "Build a portfolio of varied, well-presented work — this is what gets you hired.",
      },
      {
        stage: "Entry to work",
        detail:
          "Studios, agencies, in-house brand teams, or freelance practice.",
      },
    ],
    entranceExams: ["NID DAT", "UCEED", "NIFT entrance", "CUET"],
    skills: [
      "Typography",
      "Colour theory",
      "Layout and composition",
      "Design software",
      "Client communication",
      "Time management",
    ],
    specialisations: [
      "Brand identity",
      "Packaging design",
      "Motion graphics",
      "Editorial design",
      "Illustration",
      "Environmental graphics",
    ],
    instituteTypes: [
      "NID",
      "Government and private art colleges",
      "Design institutes and polytechnics",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Modest, especially in agencies" },
      { level: "Mid (3–7 yrs)", range: "Better in-house or freelancing" },
      { level: "Senior (8+ yrs)", range: "Strong for art directors" },
    ],
    suitsYouIf: [
      "You're visually observant",
      "You enjoy variety across many small projects",
      "You can work to someone else's brief",
    ],
    considerThat: [
      "Client revisions can be frustrating",
      "Freelance income is irregular",
      "Increasing pressure from automated design tools",
    ],
    riasec: ["Artistic", "Enterprising"],
    related: ["ui-ux-designer", "fashion-designer", "filmmaker"],
  },

  {
    slug: "architect",
    name: "Architect",
    cluster: "Design & Architecture",
    tagline: "Design buildings that are beautiful, usable and safe",
    icon: "anchor",
    tint: "bg-amber-50 text-amber-700",
    about: [
      "Architects design buildings and spaces, balancing aesthetics against structure, budget, regulation, climate and how people will actually use them. The role spans creative design and technical coordination.",
      "Training is long and licence-regulated, and early-career pay tends to lag the hours invested. The compensation is work that physically shapes how people live.",
    ],
    whatYouDo: [
      "Interpret client needs into design concepts",
      "Produce drawings, models and specifications",
      "Ensure compliance with building codes",
      "Coordinate with engineers and contractors",
      "Supervise construction against the design",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail: "Science stream with Mathematics — Maths is mandatory.",
      },
      {
        stage: "After Class 12",
        detail:
          "Five-year B.Arch through NATA or JEE Main Paper 2.",
      },
      {
        stage: "Registration",
        detail:
          "Register with the Council of Architecture to practise as an architect.",
      },
    ],
    entranceExams: ["NATA", "JEE Main Paper 2", "State architecture entrances"],
    skills: [
      "Spatial reasoning",
      "Drawing and modelling",
      "CAD and BIM software",
      "Structural understanding",
      "Regulatory knowledge",
      "Client management",
    ],
    specialisations: [
      "Sustainable architecture",
      "Urban design",
      "Landscape architecture",
      "Interior architecture",
      "Heritage conservation",
      "Housing",
    ],
    instituteTypes: [
      "SPA institutions",
      "IITs and NITs with architecture",
      "State architecture colleges",
      "Private universities",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Low relative to training length" },
      { level: "Mid (3–7 yrs)", range: "Improves with licensure and portfolio" },
      { level: "Principal / own practice", range: "Highly variable" },
    ],
    suitsYouIf: [
      "You think in three dimensions",
      "You can hold creative and technical constraints together",
      "You're patient — projects take years",
    ],
    considerThat: [
      "Five-year degree plus low initial pay",
      "Long hours during design deadlines",
      "Creative control is often limited by budget and client",
    ],
    riasec: ["Artistic", "Realistic"],
    related: ["civil-engineer", "ui-ux-designer", "graphic-designer"],
  },

  {
    slug: "fashion-designer",
    name: "Fashion Designer",
    cluster: "Design & Architecture",
    tagline: "Design clothing and accessories from concept to production",
    icon: "palette",
    tint: "bg-rose-50 text-rose-700",
    about: [
      "Fashion designers research trends, sketch collections, select fabrics and oversee garment production. The industry spans luxury couture, mass-market retail, sportswear and increasingly sustainable and handloom-focused labels.",
      "It combines genuine creative work with hard commercial constraints — costing, sourcing, sizing and production timelines shape what can actually be made.",
    ],
    whatYouDo: [
      "Research trends and develop concepts",
      "Sketch designs and create technical drawings",
      "Select fabrics, trims and colour palettes",
      "Oversee sampling and fittings",
      "Coordinate with manufacturers on production",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "B.Des in Fashion Design, or B.Sc in Fashion Technology. Any stream can apply.",
      },
      {
        stage: "Portfolio and internships",
        detail:
          "Industry internships and a strong portfolio matter significantly at entry.",
      },
      {
        stage: "Entry to work",
        detail:
          "Design houses, export units, retail brands, or launching an independent label.",
      },
    ],
    entranceExams: ["NIFT entrance", "NID DAT", "UCEED", "Pearl Academy entrance"],
    skills: [
      "Sketching and illustration",
      "Textile knowledge",
      "Pattern making",
      "Trend awareness",
      "Costing and sourcing",
      "Commercial judgement",
    ],
    specialisations: [
      "Apparel design",
      "Textile design",
      "Accessory design",
      "Sustainable fashion",
      "Costume design",
      "Fashion styling",
    ],
    instituteTypes: [
      "NIFT campuses",
      "NID",
      "Private fashion institutes",
      "Craft and handloom institutes",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Low; internships often unpaid or minimal" },
      { level: "Mid (3–7 yrs)", range: "Moderate in established brands" },
      { level: "Own label", range: "Highly variable — business dependent" },
    ],
    suitsYouIf: [
      "You have a genuine visual and material sensibility",
      "You're resilient about rejection and criticism",
      "You can pair creativity with commercial thinking",
    ],
    considerThat: [
      "Entry pay is low and hours are long",
      "Highly competitive with limited formal openings",
      "Independent labels require capital and business skill",
    ],
    riasec: ["Artistic", "Enterprising"],
    related: ["graphic-designer", "ui-ux-designer"],
  },

  /* ---------------- MEDIA & COMMUNICATION ---------------- */
  {
    slug: "journalist",
    name: "Journalist",
    cluster: "Arts, Media & Communication",
    tagline: "Find, verify and report what matters",
    icon: "megaphone",
    tint: "bg-orange-50 text-orange-700",
    about: [
      "Journalists gather information, verify it, and present it clearly to the public. The work spans politics, business, sport, culture, science and investigation, across print, broadcast and digital.",
      "The core skill is not writing but verification — knowing how to tell whether something is true, and being willing to drop a good story that doesn't hold up.",
    ],
    whatYouDo: [
      "Identify and develop stories",
      "Interview sources and build contacts",
      "Verify facts and cross-check claims",
      "Write, edit and file to deadline",
      "Produce audio, video or data-led reporting",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "BA in Journalism and Mass Communication, or any subject degree plus a journalism qualification.",
      },
      {
        stage: "Postgraduate",
        detail:
          "MA in Journalism or a specialist diploma; subject expertise in economics, law or science is highly valued.",
      },
      {
        stage: "Entry to work",
        detail:
          "Internships and desk roles at newsrooms; freelancing and independent publishing are increasingly common routes.",
      },
    ],
    entranceExams: ["CUET", "IIMC entrance", "ACJ entrance", "University tests"],
    skills: [
      "Clear writing",
      "Interviewing",
      "Fact-checking",
      "News judgement",
      "Persistence",
      "Ethical reasoning",
    ],
    specialisations: [
      "Political reporting",
      "Business journalism",
      "Investigative journalism",
      "Data journalism",
      "Sports journalism",
      "Broadcast and podcasting",
    ],
    instituteTypes: [
      "IIMC",
      "Asian College of Journalism",
      "Central universities",
      "Private media schools",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Low across most of the industry" },
      { level: "Mid (3–7 yrs)", range: "Moderate; better in business media" },
      { level: "Senior (8+ yrs)", range: "Good for established bylines and editors" },
    ],
    suitsYouIf: [
      "You're curious and persistent about finding things out",
      "You write clearly under time pressure",
      "You care about accuracy more than being first",
    ],
    considerThat: [
      "Pay is modest relative to the skill required",
      "Irregular hours and unpredictable assignments",
      "The industry is under commercial and political pressure",
    ],
    riasec: ["Artistic", "Enterprising"],
    related: ["filmmaker", "lawyer", "psychologist"],
  },

  {
    slug: "filmmaker",
    name: "Filmmaker",
    cluster: "Arts, Media & Communication",
    tagline: "Tell stories through moving image and sound",
    icon: "eye",
    tint: "bg-violet-50 text-violet-700",
    about: [
      "Filmmaking spans direction, cinematography, editing, sound and production. Most people specialise, though independent work often means doing several of these at once.",
      "It's a collaborative craft learned largely by doing. Access to equipment has never been cheaper, which means the barrier is now taste, persistence and the ability to finish things.",
    ],
    whatYouDo: [
      "Develop scripts and visual treatments",
      "Plan shoots, budgets and schedules",
      "Direct performers and crew",
      "Shoot, edit and finish the material",
      "Navigate distribution and festivals",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "BA in Film, Mass Communication or a related field. Many successful filmmakers come from unrelated degrees.",
      },
      {
        stage: "Film school (optional)",
        detail:
          "Specialised training in direction, cinematography, editing or sound.",
      },
      {
        stage: "Entry to work",
        detail:
          "Assist on productions, make short films, build a reel. Credits and relationships open doors more than qualifications.",
      },
    ],
    entranceExams: ["FTII entrance", "SRFTI entrance", "CUET", "Private institute tests"],
    skills: [
      "Visual storytelling",
      "Technical camera and sound knowledge",
      "Editing",
      "Collaboration and leadership",
      "Budgeting",
      "Persistence",
    ],
    specialisations: [
      "Direction",
      "Cinematography",
      "Editing",
      "Sound design",
      "Documentary",
      "Animation",
      "Production management",
    ],
    instituteTypes: [
      "FTII Pune",
      "SRFTI Kolkata",
      "Private film schools",
      "University media departments",
    ],
    salary: [
      { level: "Entry", range: "Irregular; often project-to-project" },
      { level: "Established crew", range: "Reasonable day rates" },
      { level: "Successful director/DoP", range: "Very high but unpredictable" },
    ],
    suitsYouIf: [
      "You finish creative projects rather than just starting them",
      "You work well leading a team under pressure",
      "You can tolerate financial uncertainty",
    ],
    considerThat: [
      "Income is irregular, especially early",
      "Long, physically demanding shoot schedules",
      "Success depends heavily on networks and luck",
    ],
    riasec: ["Artistic", "Enterprising"],
    related: ["journalist", "graphic-designer", "ui-ux-designer"],
  },

  /* ---------------- CIVIL SERVICES & DEFENCE ---------------- */
  {
    slug: "civil-services-officer",
    name: "Civil Services Officer (IAS/IPS)",
    cluster: "Civil Services & Government",
    tagline: "Administer public policy and public institutions",
    icon: "globe",
    tint: "bg-sky-50 text-sky-700",
    about: [
      "Civil services officers run the machinery of government — implementing policy, administering districts, managing law and order, and directing public programmes. The scope of responsibility early in the career is unusual by any standard.",
      "Entry is through one of the most competitive examinations in the world, with a very low selection ratio and a preparation period usually measured in years.",
    ],
    whatYouDo: [
      "Implement government policy and schemes",
      "Administer districts or departments",
      "Manage budgets and public resources",
      "Coordinate across agencies in crises",
      "Advise ministers on policy options",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "Any bachelor's degree — the examination does not require a specific subject.",
      },
      {
        stage: "Preparation",
        detail:
          "Sustained study across general studies, an optional subject, current affairs and essay writing.",
      },
      {
        stage: "Examination",
        detail:
          "Clear Prelims, Mains and the Interview, then complete training at the relevant academy.",
      },
    ],
    entranceExams: ["UPSC Civil Services Examination", "State PSC examinations"],
    skills: [
      "Broad general knowledge",
      "Analytical writing",
      "Decision making",
      "Leadership",
      "Integrity",
      "Stress management",
    ],
    specialisations: [
      "IAS — administration",
      "IPS — police service",
      "IFS — foreign service",
      "IRS — revenue service",
      "Other central services",
    ],
    instituteTypes: [
      "Any recognised university for the degree",
      "Civil services coaching institutes",
      "LBSNAA and service academies (post-selection)",
    ],
    salary: [
      { level: "Entry", range: "Government pay scale plus allowances" },
      { level: "Mid-career", range: "Structured progression with housing and benefits" },
      { level: "Senior", range: "Secretary-level scales" },
    ],
    suitsYouIf: [
      "You want public impact over private earnings",
      "You can study consistently for years without feedback",
      "You handle responsibility and public scrutiny well",
    ],
    considerThat: [
      "Selection ratios are extremely low",
      "Preparation often takes multiple attempts",
      "Postings can be remote and transfers frequent",
      "Political pressure is a real part of the job",
    ],
    riasec: ["Enterprising", "Social"],
    related: ["lawyer", "economist", "teacher"],
  },

  {
    slug: "commercial-pilot",
    name: "Commercial Pilot",
    cluster: "Hospitality, Tourism & Aviation",
    tagline: "Fly passengers and cargo safely and to schedule",
    icon: "compass",
    tint: "bg-sky-50 text-sky-700",
    about: [
      "Commercial pilots operate aircraft for airlines, charter operators and cargo carriers. The work is highly proceduralised — most of the skill lies in disciplined adherence to checklists and calm handling of the rare abnormal situation.",
      "Training is expensive and the licensing pathway strictly regulated, with recurring medical and proficiency checks throughout a career.",
    ],
    whatYouDo: [
      "Plan flights including fuel, weather and route",
      "Conduct pre-flight inspections",
      "Operate the aircraft and manage systems",
      "Communicate with air traffic control",
      "Respond to abnormal and emergency situations",
    ],
    pathway: [
      {
        stage: "After Class 10",
        detail: "Science stream with Physics and Mathematics — both required.",
      },
      {
        stage: "After Class 12",
        detail:
          "Enrol at a DGCA-approved flying school; obtain a Student Pilot Licence, then a Private Pilot Licence.",
      },
      {
        stage: "Licensing",
        detail:
          "Accumulate required flying hours and clear DGCA examinations for a Commercial Pilot Licence, plus a Class 1 medical.",
      },
      {
        stage: "Airline entry",
        detail:
          "Type rating on a specific aircraft, then first officer roles progressing toward captain.",
      },
    ],
    entranceExams: ["DGCA examinations", "Airline cadet programme selections"],
    skills: [
      "Situational awareness",
      "Procedural discipline",
      "Quick decision making",
      "Communication",
      "Physical and mental fitness",
    ],
    specialisations: [
      "Commercial airline",
      "Cargo aviation",
      "Charter and business aviation",
      "Flight instruction",
      "Helicopter operations",
    ],
    instituteTypes: [
      "DGCA-approved flying training organisations",
      "Indira Gandhi Institute of Aeronautics and similar",
      "Airline cadet programmes",
    ],
    salary: [
      { level: "First officer", range: "Good, rising quickly with hours" },
      { level: "Senior first officer", range: "Strong" },
      { level: "Captain", range: "Among the highest non-managerial salaries" },
    ],
    suitsYouIf: [
      "You're disciplined about procedure",
      "You stay calm when things go wrong",
      "You accept an irregular lifestyle away from home",
    ],
    considerThat: [
      "Training costs are substantial and usually self-funded",
      "Hiring is cyclical and tied to airline health",
      "Strict ongoing medical requirements — a condition can end a career",
    ],
    riasec: ["Realistic", "Conventional"],
    related: ["mechanical-engineer", "hotel-manager"],
  },

  /* ---------------- EDUCATION & PSYCHOLOGY ---------------- */
  {
    slug: "psychologist",
    name: "Psychologist",
    cluster: "Education & Training",
    tagline: "Understand and support how people think, feel and behave",
    icon: "brain",
    tint: "bg-rose-50 text-rose-700",
    about: [
      "Psychologists study behaviour and mental processes, and apply that understanding in clinical practice, schools, organisations, research and public health.",
      "Clinical practice in particular is regulated, requiring supervised training beyond a degree. Counselling, organisational and research paths have different requirements.",
    ],
    whatYouDo: [
      "Assess psychological functioning",
      "Provide therapy or counselling, where qualified",
      "Design and run research studies",
      "Advise schools and organisations on behaviour and wellbeing",
      "Write reports and treatment plans",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "BA/B.Sc in Psychology. Any stream can apply, though Biology helps for clinical routes.",
      },
      {
        stage: "Postgraduate",
        detail:
          "MA/M.Sc in Psychology, then specialisation. Clinical practice requires M.Phil in Clinical Psychology from a recognised institution.",
      },
      {
        stage: "Licensure",
        detail:
          "Clinical psychologists must be registered with the Rehabilitation Council of India to practise.",
      },
    ],
    entranceExams: ["CUET", "NIMHANS entrance", "University entrance tests"],
    skills: [
      "Active listening",
      "Assessment and diagnosis",
      "Research methods",
      "Statistics",
      "Ethical boundaries",
      "Emotional resilience",
    ],
    specialisations: [
      "Clinical psychology",
      "Counselling psychology",
      "Organisational psychology",
      "Educational psychology",
      "Neuropsychology",
      "Sports psychology",
    ],
    instituteTypes: [
      "NIMHANS",
      "Central universities",
      "Institutes recognised by RCI",
      "Private universities",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Modest, especially in counselling" },
      { level: "Mid (3–7 yrs)", range: "Better in organisational roles" },
      { level: "Senior / private practice", range: "Good with established practice" },
    ],
    suitsYouIf: [
      "You listen more than you talk",
      "You can hold difficult emotion without absorbing it",
      "You're interested in evidence, not just intuition",
    ],
    considerThat: [
      "Clinical practice requires competitive postgraduate entry",
      "Emotionally demanding — supervision and self-care matter",
      "Titles are regulated; you cannot practise clinically without licensure",
    ],
    riasec: ["Investigative", "Social"],
    related: ["doctor", "teacher", "physiotherapist"],
  },

  {
    slug: "teacher",
    name: "Teacher",
    cluster: "Education & Training",
    tagline: "Help people learn things they couldn't learn alone",
    icon: "book",
    tint: "bg-emerald-50 text-emerald-700",
    about: [
      "Teachers plan and deliver learning, assess understanding, and adapt to the very different ways individual students take things in. The role extends well beyond subject knowledge into pastoral care and classroom management.",
      "It's among the most consequential careers available — and one where the effects of doing it well are visible for decades.",
    ],
    whatYouDo: [
      "Plan lessons and schemes of work",
      "Teach and adapt to different learners",
      "Assess progress and give feedback",
      "Manage classroom behaviour",
      "Communicate with parents and colleagues",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "Bachelor's degree in your subject, or an integrated B.A./B.Sc. B.Ed programme.",
      },
      {
        stage: "Teaching qualification",
        detail:
          "B.Ed is required for most school teaching roles; D.El.Ed for primary in many states.",
      },
      {
        stage: "Eligibility tests",
        detail:
          "CTET or the relevant State TET for government school positions. NET/SET for college-level teaching.",
      },
    ],
    entranceExams: ["CTET", "State TETs", "UGC NET", "B.Ed entrance tests"],
    skills: [
      "Subject mastery",
      "Explanation and clarity",
      "Patience",
      "Classroom management",
      "Assessment design",
      "Adaptability",
    ],
    specialisations: [
      "Primary education",
      "Secondary subject teaching",
      "Special education",
      "Educational technology",
      "Curriculum design",
      "School leadership",
    ],
    instituteTypes: [
      "Regional Institutes of Education",
      "University education departments",
      "B.Ed colleges",
      "Central universities",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Varies widely — government scales are higher" },
      { level: "Mid (3–7 yrs)", range: "Steady, with structured increments in government" },
      { level: "Senior / leadership", range: "Good in international and leadership roles" },
    ],
    suitsYouIf: [
      "You explain things clearly and patiently",
      "You find other people's progress genuinely rewarding",
      "You can hold authority without hostility",
    ],
    considerThat: [
      "Workload extends well beyond classroom hours",
      "Private school pay can be low relative to demands",
      "Emotionally demanding, particularly in under-resourced settings",
    ],
    riasec: ["Social", "Artistic"],
    related: ["psychologist", "civil-services-officer"],
  },

  /* ---------------- HOSPITALITY ---------------- */
  {
    slug: "hotel-manager",
    name: "Hotel Management Professional",
    cluster: "Hospitality, Tourism & Aviation",
    tagline: "Run the operations behind hospitality experiences",
    icon: "handshake",
    tint: "bg-amber-50 text-amber-700",
    about: [
      "Hotel management covers front office, food and beverage, housekeeping, events and revenue management. The training is deliberately broad, and graduates often move into aviation, cruise lines, retail and event management too.",
      "The work is operational and people-facing, with real responsibility early — but it involves shifts, weekends and holidays when others are off.",
    ],
    whatYouDo: [
      "Oversee guest services and satisfaction",
      "Manage staff rosters and training",
      "Control costs, inventory and budgets",
      "Coordinate events and banquets",
      "Handle escalations and service recovery",
    ],
    pathway: [
      {
        stage: "After Class 12",
        detail:
          "BHM or BSc in Hospitality and Hotel Administration, typically through a national entrance test.",
      },
      {
        stage: "Industrial training",
        detail:
          "Placements within hotels form a core part of the degree and often lead to offers.",
      },
      {
        stage: "Career progression",
        detail:
          "Start in a department, then move toward departmental head and general management.",
      },
    ],
    entranceExams: ["NCHMCT JEE", "IHM entrance tests", "Private institute tests"],
    skills: [
      "Service orientation",
      "Team leadership",
      "Cost control",
      "Communication",
      "Composure under pressure",
      "Multitasking",
    ],
    specialisations: [
      "Front office",
      "Food and beverage",
      "Culinary arts",
      "Housekeeping",
      "Revenue management",
      "Event management",
    ],
    instituteTypes: [
      "IHMs (Institutes of Hotel Management)",
      "Private hospitality schools",
      "University hospitality programmes",
    ],
    salary: [
      { level: "Entry (0–2 yrs)", range: "Low, often with accommodation and meals" },
      { level: "Mid (3–7 yrs)", range: "Improves at supervisory level" },
      { level: "General manager", range: "Strong, particularly in luxury chains" },
    ],
    suitsYouIf: [
      "You genuinely enjoy looking after people",
      "You stay composed when guests are unhappy",
      "You're comfortable with shift work",
    ],
    considerThat: [
      "Shifts include nights, weekends and festivals",
      "Entry pay is low relative to hours",
      "Physically demanding and highly seasonal",
    ],
    riasec: ["Enterprising", "Social"],
    related: ["commercial-pilot", "teacher"],
  },
];

export function getCareer(slug: string) {
  return careers.find((c) => c.slug === slug);
}

export function careerClusterNames() {
  return Array.from(new Set(careers.map((c) => c.cluster))).sort();
}
