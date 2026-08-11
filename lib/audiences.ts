import type { IconName } from "@/components/icons";

/**
 * Audience landing pages for the "Student / Parents" section of the
 * client specification: Class 1–7, Class 8–9, Class 10–12 and College.
 */

export type Feature = { icon: IconName; title: string; text: string };

export type Audience = {
  slug: string;
  navLabel: string;
  /** drives which animation vocabulary the page uses */
  style: "playful" | "professional";
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  subhead: string;
  intro: string[];
  badges: { icon: IconName; label: string }[];
  whyHeading: string;
  whySub: string;
  whyIntro?: string;
  features: Feature[];
  /** optional checklist blocks rendered as pill grids */
  lists: { heading: string; items: string[] }[];
  studentBenefits: { heading: string; items: string[] };
  parentBenefits: { heading: string; items: string[] };
  closing?: { heading: string; paragraphs: string[] };
  cta: { heading: string; text?: string; badges: string[] };
};

export const audiences: Audience[] = [
  {
    slug: "class-1-7",
    navLabel: "Class 1–7 Students",
    style: "playful",
    eyebrow: "Class 1–7 Students",
    headline: "Discover. Learn. Grow.",
    headlineAccent: "Shine.",
    subhead: "Fun Learning for Bright Young Minds",
    intro: [
      "Welcome to Career Garage, where children from Class 1 to Class 7 develop confidence, creativity, communication skills, and future-ready abilities through exciting activities, interactive learning, and personalized guidance.",
      "Every child has unique talents. Our mission is to help them discover their strengths, build essential life skills, and enjoy learning beyond textbooks.",
    ],
    badges: [
      { icon: "target", label: "Designed for Classes 1–7" },
      { icon: "puzzle", label: "Fun & Interactive Learning" },
      { icon: "brain", label: "Skill Development & Personality Growth" },
      { icon: "star", label: "Certificates, Competitions & Rewards" },
    ],
    whyHeading: "Why Parents & Students Love Career Garage",
    whySub: "Learning That Builds a Strong Foundation",
    whyIntro:
      "At Career Garage, we believe education should inspire curiosity, creativity, and confidence — not just better marks.",
    features: [
      {
        icon: "spark",
        title: "Age-Appropriate Learning",
        text: "Specially designed programs for students from Class 1 to Class 7.",
      },
      {
        icon: "brain",
        title: "Brain Development Activities",
        text: "Fun exercises that improve memory, concentration, logical thinking, and problem-solving skills.",
      },
      {
        icon: "palette",
        title: "Creativity & Innovation",
        text: "Drawing, storytelling, public speaking, coding basics, science activities, quizzes, and creative challenges.",
      },
      {
        icon: "chat",
        title: "Communication & Confidence",
        text: "Help children become confident speakers, active learners, and effective communicators.",
      },
      {
        icon: "book",
        title: "Beyond School Learning",
        text: "Interactive sessions that complement school education with practical knowledge and life skills.",
      },
      {
        icon: "star",
        title: "Exciting Competitions",
        text: "National-level quizzes, Olympiads, talent contests, and creative competitions with certificates and rewards.",
      },
      {
        icon: "shield",
        title: "Safe AI-Powered Learning",
        text: "Personalized recommendations and engaging activities tailored to every child's learning journey.",
      },
      {
        icon: "users",
        title: "Parent Progress Dashboard",
        text: "Track learning progress, achievements, certificates, and skill development — all in one place.",
      },
    ],
    lists: [],
    studentBenefits: {
      heading: "Benefits for Students",
      items: [
        "Build confidence from an early age",
        "Improve communication and creativity",
        "Develop problem-solving abilities",
        "Learn through games and activities",
        "Earn certificates and digital badges",
        "Participate in national competitions",
        "Discover talents and interests",
        "Become future-ready with essential life skills",
      ],
    },
    parentBenefits: {
      heading: "Benefits for Parents",
      items: [
        "Monitor your child's progress anytime",
        "Understand your child's strengths and interests",
        "Access expert guidance and learning resources",
        "Encourage healthy screen time through educational activities",
        "Prepare children with skills for tomorrow's world",
      ],
    },
    cta: {
      heading: "Give Your Child the Best Start for a Successful Future",
      text: "Learning today shapes tomorrow's leaders. Join thousands of parents who are helping their children build confidence, creativity, and lifelong learning habits with Career Garage.",
      badges: [
        "Register Today",
        "Free Trial Available",
        "Learning Made Fun, Safe & Meaningful",
      ],
    },
  },

  {
    slug: "class-8-9",
    navLabel: "Class 8–9 Students",
    style: "playful",
    eyebrow: "Class 8–9 Students",
    headline: "Discover Your Strengths.",
    headlineAccent: "Shape Your Future.",
    subhead: "Build Skills Today. Create Opportunities Tomorrow.",
    intro: [
      "Class 8 and 9 are the years when students begin exploring their interests, talents, and future aspirations. At Career Garage, we help students go beyond classroom learning by developing the skills, confidence, and awareness needed to make informed decisions for the years ahead.",
      "Our interactive, AI-powered platform combines learning, career exploration, competitions, mentorship, and skill development to prepare students for future success.",
    ],
    badges: [
      { icon: "target", label: "Designed for Class 8–9 Students" },
      { icon: "brain", label: "AI-Powered Personalized Learning" },
      { icon: "compass", label: "Career Exploration & Guidance" },
      { icon: "star", label: "Competitions, Certificates & Scholarships" },
    ],
    whyHeading: "Why Career Garage?",
    whySub: "More Than Academics — A Platform for Future Success",
    features: [
      {
        icon: "brain",
        title: "Know Yourself Better",
        text: "Explore your personality, interests, strengths, learning style, and natural abilities through engaging assessments.",
      },
      {
        icon: "target",
        title: "Career Awareness",
        text: "Discover exciting career fields in science, commerce, arts, technology, business, healthcare, design, sports, public services, entrepreneurship, and many more.",
      },
      {
        icon: "chat",
        title: "Communication & Leadership",
        text: "Develop public speaking, teamwork, leadership, confidence, and interpersonal skills through practical activities.",
      },
      {
        icon: "wrench",
        title: "Future Skills",
        text: "Learn coding, AI fundamentals, digital literacy, financial literacy, creativity, critical thinking, and problem-solving.",
      },
      {
        icon: "book",
        title: "Academic Excellence",
        text: "Improve study techniques, time management, exam preparation, note-making, goal setting, and productivity.",
      },
      {
        icon: "handshake",
        title: "Learn from Experts",
        text: "Attend live sessions with educators, mentors, industry professionals, psychologists, and career counselors.",
      },
      {
        icon: "trending",
        title: "Competitions & Challenges",
        text: "Participate in quizzes, Olympiads, innovation contests, coding competitions, debates, creative writing, and talent showcases.",
      },
      {
        icon: "star",
        title: "Earn Recognized Achievements",
        text: "Collect certificates, badges, rankings, and portfolio achievements that showcase your growth and participation.",
      },
    ],
    lists: [
      {
        heading: "What You'll Learn",
        items: [
          "Career Exploration",
          "Personality & Interest Assessments",
          "Coding & AI Basics",
          "Financial Literacy",
          "Communication Skills",
          "Public Speaking",
          "Leadership Development",
          "Critical Thinking",
          "Logical Reasoning",
          "Creativity & Innovation",
          "STEM Activities",
          "Entrepreneurship Basics",
          "Digital Safety & Responsible Technology",
          "Study Skills & Exam Preparation",
          "Emotional Intelligence & Well-being",
          "General Knowledge & Current Affairs",
        ],
      },
    ],
    studentBenefits: {
      heading: "Student Benefits",
      items: [
        "Discover your strengths and interests.",
        "Build confidence and leadership skills.",
        "Explore future careers before choosing a stream.",
        "Develop practical skills beyond textbooks.",
        "Learn from experienced mentors and professionals.",
        "Participate in national-level competitions.",
        "Earn certificates and digital achievements.",
        "Build a strong foundation for Class 10 and beyond.",
      ],
    },
    parentBenefits: {
      heading: "Parent Benefits",
      items: [
        "Track your child's learning journey and progress.",
        "Understand their interests, strengths, and development areas.",
        "Receive expert guidance for academic and career planning.",
        "Encourage balanced growth through academics, life skills, and extracurricular learning.",
        "Help your child make informed decisions for future stream selection.",
      ],
    },
    closing: {
      heading: "Prepare for the Next Big Step",
      paragraphs: [
        "The choices students make after Class 10 can shape their future. Career Garage helps students explore possibilities early, build confidence, and develop the knowledge and skills needed to choose the right path.",
        "Whether your dream is to become a doctor, engineer, designer, entrepreneur, scientist, artist, lawyer, athlete, civil servant, or something entirely unique, your journey starts here.",
      ],
    },
    cta: {
      heading: "Start Exploring Your Future Today!",
      badges: [
        "Join Career Garage",
        "Try Free Learning Modules",
        "Learn, Explore, Compete & Grow",
      ],
    },
  },

  {
    slug: "class-10-12",
    navLabel: "Class 10–12 Students",
    style: "professional",
    eyebrow: "Class 10–12 Students",
    headline: "Choose the Right Path.",
    headlineAccent: "Build the Future You Dream Of.",
    subhead: "Your Career Journey Starts Here",
    intro: [
      "Class 10, 11, and 12 are some of the most important years in a student's life. The decisions you make during this stage can influence your higher education, career opportunities, and future goals.",
      "Career Garage empowers students with expert guidance, AI-powered insights, skill development, and personalized career planning to help them make informed decisions with confidence.",
      "Whether you're choosing a stream after Class 10, preparing for competitive exams, selecting a college, or exploring career options, Career Garage is your trusted partner every step of the way.",
    ],
    badges: [
      { icon: "target", label: "Designed for Class 10–12 Students" },
      { icon: "brain", label: "AI-Powered Career Guidance" },
      { icon: "compass", label: "College & Career Planning" },
      { icon: "star", label: "Assessments, Mentorship & Certifications" },
    ],
    whyHeading: "Why Career Garage?",
    whySub: "Everything You Need to Plan Your Future",
    features: [
      {
        icon: "compass",
        title: "Career Discovery & Planning",
        text: "Explore 500+ career pathways across Science, Commerce, Arts, Humanities, Design, Law, Medicine, Engineering, Business, Technology, Defence, Civil Services, Creative Industries, Skilled Trades, and Emerging Careers.",
      },
      {
        icon: "brain",
        title: "Advanced Psychometric Assessments",
        text: "Understand your personality, interests, aptitudes, strengths, values, and learning preferences through scientifically designed assessments that support informed career exploration.",
      },
      {
        icon: "puzzle",
        title: "Stream & Subject Selection",
        text: "Get guidance to choose the right stream and subject combinations based on your aspirations, abilities, and interests.",
      },
      {
        icon: "globe",
        title: "College & Course Explorer",
        text: "Discover universities, colleges, entrance requirements, scholarships, eligibility criteria, and academic programs to build a personalized higher education plan.",
      },
      {
        icon: "book",
        title: "Competitive Exam Guidance",
        text: "Learn about national and state-level entrance examinations, eligibility, preparation strategies, timelines, and planning resources.",
      },
      {
        icon: "handshake",
        title: "Expert Mentorship",
        text: "Connect with experienced teachers, career counselors, psychologists, industry professionals, and university mentors through live sessions and one-on-one guidance.",
      },
      {
        icon: "wrench",
        title: "Future-Ready Skills",
        text: "Develop communication, leadership, critical thinking, financial literacy, digital literacy, AI awareness, entrepreneurship, teamwork, and professional skills valued across industries.",
      },
      {
        icon: "trending",
        title: "Competitions & Portfolio Building",
        text: "Participate in innovation challenges, quizzes, research projects, hackathons, Olympiads, case competitions, and creative contests to strengthen your profile.",
      },
      {
        icon: "shield",
        title: "Certifications",
        text: "Earn industry-relevant certificates and digital badges that showcase your learning, achievements, and extracurricular engagement.",
      },
      {
        icon: "spark",
        title: "Personalized AI Recommendations",
        text: "Receive customized learning suggestions, career resources, and development plans based on your goals, interests, and progress.",
      },
    ],
    lists: [
      {
        heading: "Career Exploration",
        items: [
          "Engineering & Technology",
          "Medical & Healthcare",
          "Commerce & Finance",
          "Law & Judiciary",
          "Design & Architecture",
          "Arts, Media & Communication",
          "Civil Services & Government Careers",
          "Defence & Uniformed Services",
          "Entrepreneurship & Startups",
          "Artificial Intelligence & Data Science",
          "Environmental & Sustainability Careers",
          "Hospitality, Tourism & Aviation",
          "Skilled Trades & Vocational Careers",
          "International Education Pathways",
        ],
      },
      {
        heading: "Build Essential Skills",
        items: [
          "Career Decision-Making",
          "Communication & Public Speaking",
          "Leadership & Teamwork",
          "Critical Thinking",
          "Problem Solving",
          "Emotional Intelligence",
          "Interview Preparation",
          "Resume & Portfolio Building",
          "Time Management",
          "Financial Literacy",
          "AI & Digital Skills",
          "Research & Innovation",
          "Entrepreneurship",
          "Personal Branding",
        ],
      },
    ],
    studentBenefits: {
      heading: "Student Benefits",
      items: [
        "Make informed stream and career decisions.",
        "Explore a wide range of career opportunities.",
        "Build a personalized roadmap for college and beyond.",
        "Prepare for higher education with confidence.",
        "Develop future-ready skills alongside academics.",
        "Learn from experienced mentors and professionals.",
        "Earn certificates and build a strong student portfolio.",
        "Gain clarity, confidence, and direction for the future.",
      ],
    },
    parentBenefits: {
      heading: "Parent Benefits",
      items: [
        "Support your child with informed academic and career decisions.",
        "Monitor learning progress and skill development.",
        "Access expert guidance and career planning resources.",
        "Understand your child's strengths, interests, and aspirations.",
        "Help your child prepare for higher education and lifelong success.",
      ],
    },
    closing: {
      heading: "Your Future Deserves a Clear Direction",
      paragraphs: [
        "Every student has unique potential. Career Garage helps you discover your strengths, explore meaningful opportunities, and create a practical roadmap toward your goals.",
        "Whether your ambition is to become a doctor, engineer, lawyer, entrepreneur, scientist, designer, artist, pilot, civil servant, researcher, or pursue a path that is uniquely your own, Career Garage equips you with the guidance, knowledge, and skills to move forward with confidence.",
      ],
    },
    cta: {
      heading: "Start Planning Your Future Today",
      badges: [
        "Join Career Garage",
        "Explore Careers & Colleges",
        "Take Career Assessments",
        "Learn, Grow & Achieve Your Goals",
      ],
    },
  },

  {
    slug: "college-graduates",
    navLabel: "College & Graduates",
    style: "professional",
    eyebrow: "College Students & Graduates",
    headline: "Turn Your Education Into a",
    headlineAccent: "Successful Career.",
    subhead: "Learn. Build. Connect. Get Hired.",
    intro: [
      "Graduation is not the finish line — it's the beginning of your professional journey. Whether you're pursuing a diploma, undergraduate degree, postgraduate program, or have recently graduated, Career Garage helps you bridge the gap between education and employment.",
      "From career planning and skill development to internships, certifications, mentorship, and job readiness, Career Garage provides everything you need to confidently launch your career.",
    ],
    badges: [
      { icon: "compass", label: "Designed for College Students & Graduates" },
      { icon: "briefcase", label: "Career Development & Employability" },
      { icon: "trending", label: "Internships, Jobs & Entrepreneurship" },
      { icon: "brain", label: "AI-Powered Career Guidance" },
    ],
    whyHeading: "Why Career Garage?",
    whySub: "Everything You Need to Build a Successful Career",
    features: [
      {
        icon: "target",
        title: "Career Planning",
        text: "Identify your strengths, interests, skills, and career goals to create a personalized roadmap for your professional journey.",
      },
      {
        icon: "brain",
        title: "Advanced Career Assessments",
        text: "Gain insights through scientifically designed assessments that evaluate personality, interests, aptitudes, work preferences, and career fit.",
      },
      {
        icon: "briefcase",
        title: "Internship Opportunities",
        text: "Access internships across multiple industries to gain practical experience, develop workplace skills, and strengthen your resume.",
      },
      {
        icon: "trending",
        title: "Job Readiness",
        text: "Prepare for campus placements and professional recruitment with interview preparation, aptitude practice, group discussion training, communication skills, and workplace etiquette.",
      },
      {
        icon: "clipboard",
        title: "Resume & LinkedIn Profile Builder",
        text: "Create professional resumes, portfolios, cover letters, and LinkedIn profiles that help you stand out to employers.",
      },
      {
        icon: "handshake",
        title: "Mentorship",
        text: "Learn directly from industry professionals, career coaches, entrepreneurs, alumni, recruiters, and subject experts through live sessions and personalized guidance.",
      },
      {
        icon: "shield",
        title: "Professional Certifications",
        text: "Earn certificates in in-demand skills that demonstrate continuous learning and enhance your employability.",
      },
      {
        icon: "wrench",
        title: "Future Skills",
        text: "Build expertise in AI literacy, digital productivity, data analysis, communication, project management, entrepreneurship, financial literacy, and other high-demand workplace skills.",
      },
      {
        icon: "globe",
        title: "Higher Education Guidance",
        text: "Explore postgraduate programs, scholarships, entrance examinations, research opportunities, and international study pathways.",
      },
      {
        icon: "lightbulb",
        title: "Entrepreneurship Support",
        text: "Learn how to validate business ideas, develop business models, understand startup fundamentals, and connect with entrepreneurial resources.",
      },
    ],
    lists: [
      {
        heading: "Explore Career Opportunities",
        items: [
          "Information Technology & Software",
          "Artificial Intelligence & Data Science",
          "Engineering & Manufacturing",
          "Healthcare & Life Sciences",
          "Finance & Banking",
          "Marketing & Sales",
          "Human Resources",
          "Business & Management",
          "Law & Legal Services",
          "Government & Public Sector",
          "Civil Services",
          "Education & Training",
          "Media & Communication",
          "Design & Creative Industries",
          "Hospitality & Tourism",
          "Research & Academia",
          "Sustainability & Green Careers",
          "Startups & Entrepreneurship",
        ],
      },
      {
        heading: "Career Development Programs",
        items: [
          "Career Planning & Goal Setting",
          "Employability Skills",
          "Communication & Professional English",
          "Leadership Development",
          "Public Speaking & Presentation Skills",
          "Critical Thinking & Problem Solving",
          "Interview Preparation",
          "Aptitude & Reasoning Practice",
          "Resume & Cover Letter Writing",
          "LinkedIn & Personal Branding",
          "Networking Skills",
          "Workplace Ethics & Professionalism",
          "AI & Digital Skills",
          "Financial Literacy",
          "Entrepreneurship Essentials",
        ],
      },
    ],
    studentBenefits: {
      heading: "Student & Graduate Benefits",
      items: [
        "Discover career paths that match your strengths.",
        "Develop skills valued by employers.",
        "Gain internship and project experience.",
        "Build a professional resume and digital profile.",
        "Learn directly from experienced mentors and industry experts.",
        "Earn certifications that showcase your abilities.",
        "Improve placement and employment readiness.",
        "Prepare for higher education or competitive examinations.",
        "Build confidence for interviews and professional networking.",
        "Stay future-ready through continuous learning.",
      ],
    },
    parentBenefits: {
      heading: "For Final-Year Students & Fresh Graduates",
      items: [
        "Transitioning from college to the workplace can be challenging — we provide practical guidance and structured learning.",
        "Expert support to help you move from classroom learning to real-world opportunities.",
        "Secure your first job with placement and interview preparation.",
        "Pursue higher education or prepare for competitive examinations.",
        "Launch a startup or build a long-term professional career.",
      ],
    },
    closing: {
      heading: "Your Career Begins with the Right Preparation",
      paragraphs: [
        "Success isn't defined by a degree alone — it's built through knowledge, practical skills, continuous learning, meaningful experiences, and informed decisions.",
        "At Career Garage, we're committed to helping you unlock your potential, build your professional identity, and prepare for a rewarding future.",
      ],
    },
    cta: {
      heading: "Take the Next Step Toward Your Career",
      badges: [
        "Join Career Garage Today",
        "Explore Internships & Career Programs",
        "Build Skills, Gain Experience & Achieve Your Goals",
      ],
    },
  },
];

export function getAudience(slug: string) {
  return audiences.find((a) => a.slug === slug);
}
