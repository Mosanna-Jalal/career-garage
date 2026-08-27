import type { IconName } from "@/components/icons";

/**
 * "Organisations / Institutions or Events" section of the client specification:
 * Internship & Training, Certification, Scholarship with CG, and Contests.
 */

export type ProgrammeSection =
  | {
      kind: "cards";
      heading: string;
      intro?: string;
      cards: { title: string; text?: string; items?: string[] }[];
    }
  | {
      kind: "features";
      heading: string;
      intro?: string;
      groups: { title: string; items: string[] }[];
    }
  | { kind: "pills"; heading: string; intro?: string; items: string[] }
  | { kind: "table"; heading: string; columns: string[]; rows: string[][] }
  | { kind: "steps"; heading: string; intro?: string; steps: string[] }
  | { kind: "prose"; heading?: string; paragraphs: string[] };

export type Programme = {
  slug: string;
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  subhead: string;
  intro: string[];
  badges: { icon: IconName; label: string }[];
  sections: ProgrammeSection[];
  cta: { heading: string; text?: string };
};

export const programmes: Programme[] = [
  /* ==================== INTERNSHIPS ==================== */
  {
    slug: "internships",
    eyebrow: "Internship & Training Programme",
    headline: "Real experience,",
    headlineAccent: "before you need it.",
    subhead: "Eleven ways to turn learning into work-ready capability",
    intro: [
      "Career Garage runs internships and training in every format a learner might need — remote, on-site, hybrid, micro, seasonal and international — each with an assigned industry mentor, structured reviews and a verifiable certificate at the end.",
      "Programmes combine practical projects, professional skills training and employer evaluation so students leave with evidence of what they can do, not just a line on a résumé.",
    ],
    badges: [
      { icon: "briefcase", label: "11 internship formats" },
      { icon: "handshake", label: "Industry mentor assigned" },
      { icon: "shield", label: "Verified certificates" },
      { icon: "trending", label: "Internship-to-job pathway" },
    ],
    sections: [
      {
        kind: "cards",
        heading: "Internship Formats",
        intro:
          "Every format carries mentoring, structured review and a performance record.",
        cards: [
          {
            title: "1. Virtual Internship Program",
            items: [
              "Remote internships from anywhere in India",
              "Flexible schedules",
              "Industry mentor assigned",
              "Weekly review meetings",
              "Digital attendance tracking",
              "Internship certificate",
              "Experience letter",
              "Performance scorecard",
            ],
          },
          {
            title: "2. On-Site Internship",
            items: [
              "Office-based internships",
              "Factory visits",
              "Company exposure",
              "Professional work culture",
              "Team collaboration",
              "Workplace ethics",
              "Supervisor evaluation",
            ],
          },
          {
            title: "3. Hybrid Internship",
            items: [
              "Mix of online and offline learning",
              "Flexible attendance",
              "Live project work",
              "Weekly mentor sessions",
            ],
          },
          {
            title: "4. Industry Training Program",
            text: "Professional skill development before internships.",
            items: [
              "Communication Skills",
              "Corporate Etiquette",
              "Business English",
              "Email Writing",
              "Presentation Skills",
              "Teamwork",
              "Time Management",
              "Critical Thinking",
              "Problem Solving",
              "Leadership",
            ],
          },
          {
            title: "5. Technical Training",
            items: [
              "Python",
              "Java",
              "Web Development",
              "AI & Machine Learning",
              "Data Science",
              "Cyber Security",
              "UI/UX Design",
              "Cloud Computing",
              "Digital Marketing",
              "Graphic Design",
              "Video Editing",
              "Excel & Power BI",
            ],
          },
          {
            title: "6. Career Readiness Bootcamp",
            items: [
              "Resume Building",
              "ATS Resume Optimization",
              "LinkedIn Profile Development",
              "Portfolio Building",
              "Mock Interviews",
              "HR Interview Practice",
              "Group Discussion",
              "Aptitude Preparation",
              "Salary Negotiation",
              "Personal Branding",
            ],
          },
          {
            title: "7. Skill Certification Program",
            text: "Industry-recognised certification awarded after training completion, assessment, project submission, viva and mentor approval.",
          },
          {
            title: "8. Startup Internship",
            text: "Work directly with startups across marketing, sales, product management, technology, finance, operations and customer support.",
          },
          {
            title: "9. Entrepreneurship Internship",
            items: [
              "Startup ideation",
              "Business planning",
              "Market research",
              "Fundraising",
              "Branding",
              "Customer validation",
              "Financial planning",
              "Pitching",
            ],
          },
          {
            title: "10. Social Impact Internship",
            text: "Partner with NGOs, government initiatives and community organisations across healthcare, environment, rural development and women's empowerment.",
          },
          {
            title: "11. International Virtual Internship",
            items: [
              "Global mentors",
              "Cross-cultural collaboration",
              "International projects",
              "Global certification",
              "Time-zone collaboration",
            ],
          },
        ],
      },
      {
        kind: "features",
        heading: "Platform Features",
        intro:
          "The programme runs on a platform built for learners, mentors and employers alike.",
        groups: [
          {
            title: "AI Career Matching",
            items: [
              "Personality",
              "RIASEC",
              "Skills",
              "Interests",
              "Career goals",
            ],
          },
          {
            title: "Personalized Learning Path",
            items: [
              "Customized roadmap",
              "Skill gap analysis",
              "Recommended courses",
            ],
          },
          {
            title: "Mentor Support",
            items: [
              "Industry experts",
              "Weekly mentoring",
              "Career guidance",
              "Project reviews",
            ],
          },
          {
            title: "Learning Management System",
            items: [
              "Video lessons",
              "Assignments",
              "Quizzes",
              "Live classes",
              "Discussion forums",
            ],
          },
          {
            title: "Internship Dashboard",
            items: [
              "Progress tracker",
              "Attendance",
              "Tasks",
              "Deadlines",
              "Certificates",
              "Mentor feedback",
              "Performance analytics",
            ],
          },
          {
            title: "Employer Dashboard",
            items: [
              "Post internships",
              "Screen applicants",
              "Interview scheduling",
              "Evaluate interns",
              "Issue certificates",
              "Offer PPOs",
            ],
          },
          {
            title: "Portfolio Builder",
            items: [
              "Project showcase",
              "Certificates",
              "Skills",
              "Resume",
              "GitHub integration",
              "Design portfolio",
              "Research publications",
            ],
          },
          {
            title: "AI Resume Builder",
            items: [
              "ATS-friendly resumes",
              "Cover letters",
              "Resume scoring",
              "AI suggestions",
            ],
          },
          {
            title: "AI Interview Practice",
            items: [
              "Mock interviews",
              "Voice analysis",
              "Confidence score",
              "Feedback reports",
            ],
          },
          {
            title: "Skill Assessments",
            items: [
              "Pre-test",
              "Mid-term evaluation",
              "Final assessment",
              "Practical evaluation",
            ],
          },
          {
            title: "Performance Analytics",
            items: [
              "Weekly scores",
              "Mentor ratings",
              "Skill growth",
              "Project completion",
              "Attendance",
              "Employability score",
            ],
          },
          {
            title: "Digital Credentials",
            items: [
              "Secure certificates",
              "Experience letters",
              "Digital badges",
              "QR-code verification",
            ],
          },
          {
            title: "Placement Support",
            items: [
              "Internship-to-job pathway",
              "Campus hiring",
              "Employer referrals",
              "Job recommendations",
              "Career coaching",
            ],
          },
          {
            title: "Rewards & Gamification",
            items: [
              "XP points",
              "Badges",
              "Leaderboards",
              "Achievement levels",
              "Rewards",
              "Scholarships",
            ],
          },
          {
            title: "Community",
            items: [
              "Student networking",
              "Mentor Q&A",
              "Discussion groups",
              "Hackathons",
              "Challenges",
              "Competitions",
            ],
          },
          {
            title: "Safety & Compliance",
            items: [
              "Verified employers",
              "Background checks",
              "Code of conduct",
              "Child safety measures",
              "Anti-harassment policy",
              "Data privacy",
              "Complaint resolution",
            ],
          },
        ],
      },
      {
        kind: "pills",
        heading: "Internship Categories",
        intro: "Recommended domains available across the programme.",
        items: [
          "Artificial Intelligence",
          "Finance & Accounting",
          "Human Resources",
          "Sales & Business Development",
          "Video Editing & Animation",
          "Content Writing",
          "Journalism & Media",
          "Psychology & Counselling",
          "Education & EdTech",
          "Legal Research",
          "Biotechnology",
          "Civil Engineering",
          "Mechanical Engineering",
          "Electrical & Electronics",
          "Agriculture & AgriTech",
          "Food Technology",
          "Environmental Science",
          "Logistics & Supply Chain",
          "Retail & E-commerce",
          "Entrepreneurship",
          "Research & Innovation",
          "NGO & Social Impact",
        ],
      },
    ],
    cta: {
      heading: "Bring Career Garage internships to your students",
      text: "Partner with us to run internships, training and placement pathways for your institution.",
    },
  },

  /* ==================== CERTIFICATION ==================== */
  {
    slug: "certification",
    eyebrow: "Certification Programme",
    headline: "Credentials that",
    headlineAccent: "can be verified.",
    subhead: "Industry-recognised certification with QR-verified records",
    intro: [
      "Career Garage certifications are awarded on evidence, not attendance. Each credential follows training completion, assessment, a submitted project, a viva and mentor approval.",
      "Every certificate, experience letter and digital badge carries QR-code verification so employers and institutions can confirm it independently.",
    ],
    badges: [
      { icon: "shield", label: "QR-code verified" },
      { icon: "clipboard", label: "Project & viva assessed" },
      { icon: "star", label: "Digital badges" },
      { icon: "briefcase", label: "LinkedIn-ready" },
    ],
    sections: [
      {
        kind: "steps",
        heading: "How certification is earned",
        intro:
          "Industry-recognised certifications are issued only after every stage is cleared.",
        steps: [
          "Training completion",
          "Assessment",
          "Project submission",
          "Viva",
          "Mentor approval",
        ],
      },
      {
        kind: "features",
        heading: "What you receive",
        groups: [
          {
            title: "Digital Credentials",
            items: [
              "Secure certificates",
              "Experience letters",
              "Digital badges",
              "QR-code verification",
            ],
          },
          {
            title: "Performance Record",
            items: [
              "Skill-wise scores",
              "Mentor ratings",
              "Project completion",
              "Employability score",
            ],
          },
          {
            title: "Portfolio Evidence",
            items: [
              "Project showcase",
              "Design portfolio",
              "Research publications",
              "GitHub integration",
            ],
          },
        ],
      },
      {
        kind: "pills",
        heading: "Certification tracks",
        items: [
          "Communication Skills",
          "Corporate Etiquette",
          "Business English",
          "Presentation Skills",
          "Leadership",
          "Python",
          "Java",
          "Web Development",
          "AI & Machine Learning",
          "Data Science",
          "Cyber Security",
          "UI/UX Design",
          "Cloud Computing",
          "Digital Marketing",
          "Graphic Design",
          "Video Editing",
          "Excel & Power BI",
          "Entrepreneurship Essentials",
        ],
      },
    ],
    cta: {
      heading: "Certify your learners with Career Garage",
      text: "Run assessed, verifiable certification programmes for your school, college or organisation.",
    },
  },

  /* ==================== SCHOLARSHIPS ==================== */
  {
    slug: "scholarships",
    eyebrow: "Scholarship with CG",
    headline: "Recognise talent.",
    headlineAccent: "Remove the barrier.",
    subhead:
      "Scholarships funded by Career Garage, schools, CSR, NGOs and corporate sponsors",
    intro: [
      "The Career Garage Scholarship Programme is designed to recognise talent, support financially deserving students, and encourage continuous learning.",
      "Scholarships can be funded by Career Garage, partner schools, CSR initiatives, NGOs, universities and corporate sponsors — with a transparent digital application and selection process throughout.",
    ],
    badges: [
      { icon: "star", label: "2 scholarship categories" },
      { icon: "scale", label: "Transparent selection" },
      { icon: "shield", label: "QR-verified awards" },
      { icon: "handshake", label: "CSR & NGO funded" },
    ],
    sections: [
      {
        kind: "cards",
        heading: "Scholarship Categories",
        cards: [
          {
            title: "1. Merit Scholarship",
            text: "Awarded to students with outstanding academic performance. Eligibility considers academic scores, scholarship test performance, consistent attendance and an optional teacher recommendation.",
          },
          {
            title: "2. National Scholarship Challenge",
            text: "A competitive scholarship exam open to students across India, with awards based on performance and category-wise rankings.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Scholarship Levels",
        columns: ["Level", "Benefit"],
        rows: [
          [
            "Platinum Scholar",
            "100% scholarship + Premium membership + Mentorship",
          ],
          ["Gold Scholar", "75% scholarship"],
          ["Silver Scholar", "50% scholarship"],
          ["Bronze Scholar", "25% scholarship"],
          ["Merit Award", "Certificate + Digital Badge + Learning Resources"],
        ],
      },
      {
        kind: "pills",
        heading: "Scholarship Benefits",
        items: [
          "Full or partial course fee waivers",
          "Free access to Career Garage premium features",
          "Free psychometric assessments",
          "Career counselling sessions",
          "Mentorship from industry experts",
          "Internship opportunities",
          "Training programme access",
          "Certification vouchers",
          "Digital learning resources",
          "Scholarship certificate and digital badge",
        ],
      },
      {
        kind: "steps",
        heading: "Application Process",
        steps: [
          "Create a Career Garage account.",
          "Complete the student profile.",
          "Upload required documents (if applicable).",
          "Take the scholarship assessment or qualifying test.",
          "Attend an interview if required.",
          "Receive the scholarship decision.",
          "Accept the award and begin the programme.",
        ],
      },
      {
        kind: "table",
        heading: "Annual Scholarship Calendar",
        columns: ["Period", "Activity"],
        rows: [
          ["January–February", "National Scholarship Test"],
          ["April", "Merit Scholarship Applications"],
          ["August", "STEM & Innovation Scholarships"],
          ["October", "Talent & Leadership Scholarships"],
          ["December", "Career Garage Grand Scholarship Awards"],
        ],
      },
      {
        kind: "pills",
        heading: "AI-Powered Features",
        items: [
          "Personalized scholarship recommendations",
          "Eligibility prediction",
          "Skill-gap analysis",
          "Career pathway suggestions",
          "Automated document verification",
          "Fraud detection",
          "AI-based essay evaluation (where applicable)",
        ],
      },
    ],
    cta: {
      heading: "Fund a scholarship, change a trajectory",
      text: "Partner with Career Garage to sponsor scholarships and reach students who deserve the opportunity.",
    },
  },

  /* ==================== CONTESTS ==================== */
  {
    slug: "contests",
    eyebrow: "Contests & Competitions",
    headline: "Compete, learn,",
    headlineAccent: "and grow.",
    subhead:
      "A year-round contest ecosystem from Class 1 to graduate level",
    intro: [
      "Career Garage contests are designed to inspire creativity, innovation, leadership and problem-solving by giving students genuine opportunities to compete, learn and grow.",
      "Every contest connects back to the wider platform — assessments, learning modules, mentorship, internships and certifications — so a strong performance opens real doors.",
    ],
    badges: [
      { icon: "trending", label: "Year-round contest calendar" },
      { icon: "globe", label: "District, state & national levels" },
      { icon: "brain", label: "AI-assisted evaluation" },
      { icon: "star", label: "Prizes & scholarships" },
    ],
    sections: [
      {
        kind: "features",
        heading: "How contests run",
        groups: [
          {
            title: "Smart Registration",
            items: [
              "One-click registration",
              "Eligibility verification",
              "Team creation",
              "Entry fee management (if applicable)",
            ],
          },
          {
            title: "Secure Online Exam Platform",
            items: [
              "Timer",
              "Randomized questions",
              "Auto-save",
              "Anti-cheating measures",
              "Device compatibility",
            ],
          },
          {
            title: "Live Leaderboard",
            items: [
              "Real-time rankings",
              "State and national rankings",
              "School rankings",
              "Team rankings",
            ],
          },
          {
            title: "AI Evaluation",
            items: [
              "Objective auto-scoring",
              "AI-assisted review for essays and presentations",
              "Plagiarism detection",
              "Detailed performance reports",
            ],
          },
          {
            title: "Certificates & Awards",
            items: [
              "Participation certificates",
              "Merit certificates",
              "Winner trophies",
              "Digital badges",
              "QR-code verification",
              "Scholarship opportunities",
            ],
          },
          {
            title: "Performance Analytics",
            items: [
              "Skill-wise scores",
              "Strengths and improvement areas",
              "National percentile",
              "Career readiness indicators",
              "Personalized learning recommendations",
            ],
          },
          {
            title: "Rewards & Recognition",
            items: [
              "Cash prizes",
              "Scholarships",
              "Gift vouchers",
              "Internship opportunities",
              "Mentorship sessions",
              "Career Garage Hall of Fame",
            ],
          },
          {
            title: "Accessibility & Safety",
            items: [
              "Multilingual support",
              "Inclusive design",
              "Age-appropriate content",
              "Verified judges",
              "Transparent evaluation",
              "Child safety and privacy protections",
            ],
          },
        ],
      },
      {
        kind: "table",
        heading: "Age-Wise Contest Structure",
        columns: ["Group", "Recommended Contests"],
        rows: [
          [
            "Class 1–3",
            "Drawing, Storytelling, GK Quiz, Math Fun, Creative Activities",
          ],
          [
            "Class 4–7",
            "Olympiads, Coding Basics, Science Quiz, Art, Writing, Public Speaking",
          ],
          [
            "Class 8–10",
            "Career Quiz, Coding, Robotics, Entrepreneurship, Debate, Innovation",
          ],
          [
            "Class 11–12",
            "AI Challenge, Research, Business Plan, Design, STEM, Career Readiness",
          ],
          [
            "College & Graduates",
            "Hackathons, Startup Competitions, Case Studies, Research, Product Design, Leadership Challenges",
          ],
        ],
      },
      {
        kind: "table",
        heading: "Annual Contest Calendar",
        columns: ["Month", "Major Event"],
        rows: [
          ["January", "National General Knowledge Championship"],
          ["February", "Mathematics & Science Olympiad"],
          ["March", "Coding & Robotics Challenge"],
          ["April", "Creativity & Art Festival"],
          ["May", "Summer Innovation Challenge"],
          ["June", "Career Awareness Quiz"],
          ["July", "AI & Technology Challenge"],
          ["August", "Independence Knowledge Championship"],
          ["September", "Entrepreneurship Challenge"],
          ["October", "Research & Innovation Expo"],
          ["November", "National Aptitude Championship"],
          ["December", "Career Garage Grand National Championship"],
        ],
      },
    ],
    cta: {
      heading: "Host a Career Garage contest at your institution",
      text: "Run olympiads, hackathons and championships with proctoring, judging and verified certificates handled for you.",
    },
  },
];

export function getProgramme(slug: string) {
  return programmes.find((p) => p.slug === slug);
}
