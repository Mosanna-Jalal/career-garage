import type { IconName } from "@/components/icons";

/**
 * "About Us" sub-pages from the client specification.
 */

export type AboutBlock = {
  heading?: string;
  intro?: string;
  paragraphs?: string[];
  items?: { title: string; text: string; icon?: IconName }[];
};

export type AboutPage = {
  slug: string;
  label: string;
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  intro: string[];
  blocks: AboutBlock[];
  closing?: string[];
};

export const aboutPages: AboutPage[] = [
  {
    slug: "philosophy",
    label: "Our Philosophy",
    eyebrow: "Our Philosophy",
    headline: "Careers aren't found by chance.",
    headlineAccent: "They're built.",
    intro: [
      "At Career Garage, we believe that every individual has unique potential waiting to be discovered. Career success should never be determined by confusion, social pressure, or limited awareness — it should be guided by self-understanding, informed choices, and continuous growth.",
      "We believe that the right career is not found by chance; it is built through clarity, knowledge, experience, and the courage to make informed decisions.",
    ],
    blocks: [
      {
        heading: "Five core principles",
        items: [
          {
            icon: "compass",
            title: "Self-Discovery First",
            text: "Every successful career begins with understanding who you are — your strengths, interests, personality, values, and aspirations.",
          },
          {
            icon: "scale",
            title: "Guidance Backed by Evidence",
            text: "We combine scientifically grounded assessments, expert guidance, and responsible use of technology to provide personalized career insights that support better decision-making.",
          },
          {
            icon: "book",
            title: "Learning Never Stops",
            text: "Career development is a lifelong journey. We encourage continuous learning, skill development, mentorship, and practical experience at every stage of life.",
          },
          {
            icon: "globe",
            title: "Opportunity for Everyone",
            text: "Quality career guidance should be accessible to everyone, regardless of geography, financial background, or educational institution.",
          },
          {
            icon: "spark",
            title: "Empowering People, Not Choosing for Them",
            text: "Our goal is not to make decisions on behalf of individuals. Instead, we empower them with the knowledge, tools, and confidence to make informed decisions for themselves.",
          },
        ],
      },
    ],
    closing: [
      "At Career Garage, we are building more than a platform — we are building an ecosystem where people discover their potential, develop their abilities, connect with opportunities, and confidently shape their future.",
    ],
  },

  {
    slug: "strengths",
    label: "Our Strengths",
    eyebrow: "Our Strengths",
    headline: "Technology, expertise and",
    headlineAccent: "real opportunity.",
    intro: [
      "At Career Garage, our strength lies in bringing together technology, expert guidance, and real-world opportunities to help individuals make informed career decisions and achieve their full potential.",
    ],
    blocks: [
      {
        items: [
          {
            icon: "brain",
            title: "AI-Powered Personalization",
            text: "We leverage artificial intelligence to deliver personalized career insights, learning recommendations, and guidance tailored to each individual's unique profile, goals, and aspirations.",
          },
          {
            icon: "puzzle",
            title: "Comprehensive Career Ecosystem",
            text: "From psychometric assessments and career counseling to mentorship, internships, competitions, and certification programs, we provide an integrated platform that supports every stage of career development.",
          },
          {
            icon: "chart",
            title: "Evidence-Based Assessments",
            text: "Our approach is built on scientifically informed assessment methods that help individuals better understand their interests, strengths, personality traits, and career preferences.",
          },
          {
            icon: "handshake",
            title: "Expert Mentor Network",
            text: "We connect learners with experienced mentors, educators, industry professionals, and career specialists who provide practical guidance and real-world perspectives.",
          },
          {
            icon: "wrench",
            title: "Practical Learning Opportunities",
            text: "We believe that career development extends beyond theory. Through internships, competitions, projects, and certifications, we encourage hands-on learning and skill development.",
          },
          {
            icon: "users",
            title: "Inclusive for Every Career Stage",
            text: "Our platform is designed to support students, professionals, parents, teachers, and skill specialists, creating a collaborative ecosystem where every stakeholder contributes to career success.",
          },
          {
            icon: "globe",
            title: "Accessibility and Affordability",
            text: "We are committed to making quality career guidance accessible through technology-driven solutions and affordable pricing, ensuring that more people can benefit from personalized career support.",
          },
          {
            icon: "trending",
            title: "Continuous Growth",
            text: "Career development is an ongoing journey. Our platform is designed to evolve with users by providing ongoing recommendations, learning pathways, mentoring, and opportunities as their goals and careers progress.",
          },
          {
            icon: "shield",
            title: "Commitment to Trust and Ethics",
            text: "We value transparency, privacy, fairness, and responsible use of AI. Our aim is to support informed decision-making while respecting the individuality and aspirations of every user.",
          },
        ],
      },
    ],
    closing: [
      "At Career Garage, our greatest strength is our commitment to helping people discover their potential, build meaningful careers, and make confident decisions through a combination of technology, expert guidance, and lifelong learning.",
    ],
  },

  {
    slug: "pedagogy",
    label: "Our Pedagogy",
    eyebrow: "Our Pedagogy",
    headline: "Discover, understand,",
    headlineAccent: "then do.",
    intro: [
      "At Career Garage, we believe that meaningful career development goes beyond acquiring knowledge — it begins with self-discovery, grows through guided learning, and is strengthened by real-world experience.",
      "Our pedagogy is built on a learner-centric approach that combines scientific assessment, responsible use of artificial intelligence, expert mentorship, practical exposure, and continuous feedback to support informed career decisions.",
    ],
    blocks: [
      {
        heading: "The six stages",
        items: [
          {
            icon: "compass",
            title: "1. Discover Yourself",
            text: "Every journey begins with understanding your unique personality, interests, strengths, values, aptitudes, and aspirations through carefully designed assessments and reflective learning.",
          },
          {
            icon: "eye",
            title: "2. Understand Your Possibilities",
            text: "Using personalized insights, AI-powered recommendations, and expert guidance, learners explore career pathways, emerging industries, educational opportunities, and future-ready skills aligned with their individual profiles.",
          },
          {
            icon: "target",
            title: "3. Learn with Purpose",
            text: "We encourage competency-based learning by helping individuals identify skill gaps and pursue relevant courses, certifications, workshops, and learning experiences that support their career goals.",
          },
          {
            icon: "wrench",
            title: "4. Learn by Doing",
            text: "We believe practical experience is essential. Through internships, competitions, projects, simulations, and real-world challenges, learners apply knowledge, build confidence, and develop workplace-ready skills.",
          },
          {
            icon: "handshake",
            title: "5. Learn from Experts",
            text: "Mentorship plays a vital role in our approach. Learners gain insights from experienced professionals, educators, and industry experts who provide guidance, encouragement, and practical perspectives throughout their career journey.",
          },
          {
            icon: "trending",
            title: "6. Grow Continuously",
            text: "Career development is not a one-time event. Our platform supports continuous reflection, progress tracking, skill enhancement, and lifelong learning so individuals can adapt to changing opportunities and evolving career aspirations.",
          },
        ],
      },
      {
        heading: "Our Learning Philosophy",
        intro: "Our pedagogy is guided by five core principles:",
        items: [
          {
            title: "Personalized Learning",
            text: "Every learner follows a path tailored to their goals, strengths, and aspirations.",
          },
          {
            title: "Evidence-Informed Guidance",
            text: "Recommendations are based on structured assessments, expert knowledge, and responsible use of technology.",
          },
          {
            title: "Experiential Learning",
            text: "Real-world practice enhances understanding and career readiness.",
          },
          {
            title: "Mentorship and Collaboration",
            text: "Learning is strengthened through meaningful human connections and shared experiences.",
          },
          {
            title: "Lifelong Development",
            text: "Career success is a continuous journey of learning, adaptation, and growth.",
          },
        ],
      },
    ],
    closing: [
      "At Career Garage, we don't simply prepare people for examinations or jobs — we help them understand themselves, develop their capabilities, and confidently navigate every stage of their professional journey.",
    ],
  },

  {
    slug: "accord",
    label: "Our Accord",
    eyebrow: "Our Accord",
    headline: "Trust is the",
    headlineAccent: "foundation.",
    intro: [
      "At Career Garage, we believe that trust is the foundation of every meaningful relationship. Our accord is a commitment to every learner, parent, educator, mentor, and professional who chooses to be part of our community.",
    ],
    blocks: [
      {
        heading: "We are committed to",
        items: [
          {
            icon: "heart",
            title: "Putting People First",
            text: "Every recommendation, program, and service is designed with the individual's growth, aspirations, and well-being at its core.",
          },
          {
            icon: "compass",
            title: "Providing Responsible Guidance",
            text: "We strive to offer personalized career insights based on structured assessments, expert guidance, and responsible use of artificial intelligence. Our goal is to support informed decision-making — not to replace human judgment.",
          },
          {
            icon: "scale",
            title: "Ensuring Fairness and Inclusivity",
            text: "We are committed to creating equal opportunities for individuals from diverse backgrounds, regardless of geography, gender, socioeconomic status, or educational institution.",
          },
          {
            icon: "shield",
            title: "Protecting Privacy and Trust",
            text: "We respect the confidentiality of personal information and are committed to handling user data with transparency, security, and integrity.",
          },
          {
            icon: "book",
            title: "Promoting Lifelong Learning",
            text: "Career development is an ongoing journey. We will continue to provide opportunities for learning, mentorship, skill development, and professional growth throughout every stage of life.",
          },
          {
            icon: "star",
            title: "Upholding Quality and Integrity",
            text: "We are dedicated to maintaining high standards in our assessments, guidance, learning experiences, and partnerships while continuously improving our platform and services.",
          },
          {
            icon: "trending",
            title: "Building Meaningful Impact",
            text: "Our success is measured not only by the number of users we serve but by the positive impact we create through informed career choices, personal growth, and meaningful opportunities.",
          },
        ],
      },
    ],
    closing: [
      "At Career Garage, this accord represents our promise to empower every individual with the knowledge, guidance, and opportunities needed to build a confident and fulfilling career journey.",
    ],
  },

  {
    slug: "brand",
    label: "Brand Foundation",
    eyebrow: "Career Garage Brand Foundation",
    headline: "Mission, vision",
    headlineAccent: "and values.",
    intro: [
      "To empower individuals to make informed and confident career decisions through responsible use of technology, scientifically informed assessments, expert guidance, mentorship, and real-world opportunities.",
    ],
    blocks: [
      {
        heading: "Our Mission",
        paragraphs: [
          "We are committed to helping students, professionals, parents, teachers, and skill specialists discover their potential, develop future-ready skills, and build meaningful careers through a personalized and accessible career development ecosystem.",
        ],
      },
      {
        heading: "Our Vision",
        paragraphs: [
          "To become India's most trusted AI-powered Career Intelligence Platform, transforming the way people discover their potential, make career decisions, and achieve lifelong professional success.",
          "Our long-term vision is to create a world where every individual — regardless of background, location, or economic status — has access to reliable career guidance, meaningful opportunities, and continuous learning throughout every stage of life.",
        ],
      },
      {
        heading: "Our Core Values",
        items: [
          {
            title: "1. People First",
            text: "Every decision we make begins with the needs, aspirations, and long-term success of the individuals we serve.",
          },
          {
            title: "2. Integrity",
            text: "We believe in honesty, transparency, fairness, and ethical practices in every interaction, recommendation, and partnership.",
          },
          {
            title: "3. Responsible Innovation",
            text: "We embrace technology and artificial intelligence to enhance career guidance while ensuring that human judgment, empathy, and ethical responsibility remain central to our approach.",
          },
          {
            title: "4. Lifelong Learning",
            text: "Learning never ends. We encourage curiosity, continuous improvement, skill development, and adaptability throughout every stage of life.",
          },
          {
            title: "5. Evidence-Informed Guidance",
            text: "Our recommendations are based on structured assessments, research-informed methodologies, expert knowledge, and thoughtful analysis.",
          },
          {
            title: "6. Accessibility",
            text: "Quality career guidance should be available to everyone. We strive to make our platform inclusive, affordable, and accessible regardless of geography or socioeconomic background.",
          },
          {
            title: "7. Excellence",
            text: "We continuously improve our platform, services, and learning experiences to deliver meaningful value and lasting impact.",
          },
          {
            title: "8. Collaboration",
            text: "We believe meaningful career development happens through collaboration among learners, parents, teachers, mentors, educational institutions, and industry professionals.",
          },
          {
            title: "9. Empowerment",
            text: "We empower individuals with knowledge, opportunities, and confidence so they can make their own informed career decisions.",
          },
          {
            title: "10. Impact",
            text: "We measure our success by the positive difference we make in people's lives, careers, and communities.",
          },
        ],
      },
      {
        heading: "Our Tone of Voice",
        intro:
          "The way we communicate reflects who we are and the trust people place in us.",
        items: [
          {
            title: "Clear",
            text: "We communicate in simple, understandable language without unnecessary complexity.",
          },
          {
            title: "Encouraging",
            text: "We inspire confidence and motivate individuals to explore opportunities and believe in their potential.",
          },
          {
            title: "Professional",
            text: "We maintain credibility through accurate information, respectful communication, and thoughtful guidance.",
          },
          {
            title: "Empathetic",
            text: "We understand that career decisions can be challenging. We listen, support, and guide with compassion and respect.",
          },
          {
            title: "Trustworthy",
            text: "We communicate honestly and transparently, avoiding exaggerated promises or unrealistic claims.",
          },
          {
            title: "Inclusive",
            text: "We welcome learners from all backgrounds and respect diverse aspirations, experiences, and career journeys.",
          },
          {
            title: "Future-Focused",
            text: "We embrace innovation, emerging technologies, and changing career landscapes while preparing individuals for tomorrow's opportunities.",
          },
          {
            title: "Action-Oriented",
            text: "We encourage practical steps, continuous learning, and informed decision-making that leads to meaningful career progress.",
          },
        ],
      },
      {
        heading: "Our Brand Promise",
        paragraphs: [
          "At Career Garage, we promise to provide every individual with responsible guidance, personalized insights, meaningful opportunities, and continuous support to help them build a career with clarity, confidence, and purpose.",
        ],
      },
    ],
    closing: ["We don't decide your future — we help you discover it."],
  },

  {
    slug: "why-career-garage",
    label: "Why Career Garage?",
    eyebrow: "Why Career Garage?",
    headline: "Not just another",
    headlineAccent: "career test.",
    intro: [
      "Choosing a career is one of the most important decisions in life, yet many people make it with limited guidance, incomplete information, or external pressure. At Career Garage, we believe everyone deserves access to trusted guidance, personalized insights, and meaningful opportunities to make informed career decisions.",
      "Unlike platforms that focus only on learning or assessments, Career Garage brings together career discovery, guidance, skill development, and real-world opportunities into one integrated ecosystem.",
    ],
    blocks: [
      {
        items: [
          {
            icon: "brain",
            title: "Personalized Career Insights",
            text: "Our platform combines structured assessments, AI-powered analysis, and expert guidance to help individuals better understand their strengths, interests, personality, and career preferences.",
          },
          {
            icon: "puzzle",
            title: "More Than Just Career Counseling",
            text: "We support your entire career journey through mentorship, internships, competitions, certifications, and continuous learning opportunities — not just a one-time counseling session.",
          },
          {
            icon: "users",
            title: "One Platform for Every Stakeholder",
            text: "Whether you are a student, professional, parent, teacher, or skill specialist, Career Garage offers tailored resources and experiences designed for your unique goals and responsibilities.",
          },
          {
            icon: "handshake",
            title: "AI with Human Expertise",
            text: "Technology enhances our guidance, but people remain at the heart of every career journey. Our platform combines intelligent recommendations with the knowledge and experience of mentors, educators, and career experts.",
          },
          {
            icon: "briefcase",
            title: "Practical Career Development",
            text: "We believe career readiness comes from both knowledge and experience. That's why we connect learners with projects, competitions, internships, mentorship, and industry exposure.",
          },
          {
            icon: "trending",
            title: "Lifelong Career Support",
            text: "Career decisions don't end after choosing a course or getting your first job. We support individuals through different stages of education, career growth, career transitions, and lifelong learning.",
          },
          {
            icon: "globe",
            title: "Accessible and Inclusive",
            text: "We are committed to making quality career guidance accessible to individuals from diverse backgrounds through technology-driven, affordable, and learner-focused solutions.",
          },
          {
            icon: "spark",
            title: "Built for the Future",
            text: "As industries evolve and new career opportunities emerge, Career Garage continuously adapts to help individuals develop future-ready skills and confidently navigate a changing world.",
          },
        ],
      },
      {
        heading: "Why We Exist",
        paragraphs: [
          "Because every individual deserves the opportunity to discover their potential, make informed career decisions, and build a future based on their abilities — not uncertainty.",
        ],
      },
    ],
    closing: [
      "At Career Garage, we don't just help people choose careers.",
      "We help them discover themselves, prepare for opportunities, and build meaningful futures.",
    ],
  },

  {
    slug: "team",
    label: "Our Team",
    eyebrow: "Our Team",
    headline: "The people behind",
    headlineAccent: "Career Garage.",
    intro: [
      "Our team brings together educators, career counsellors, psychologists, technologists and industry practitioners who share one belief: that good guidance, offered at the right moment, changes what a person believes is possible.",
    ],
    blocks: [
      {
        heading: "Coming soon",
        paragraphs: [
          "Team profiles are being prepared and will be published here shortly.",
          "If you would like to join the network as a mentor, counsellor, educator or skill trainer, you can register today and we will be in touch.",
        ],
      },
    ],
  },
];

export function getAboutPage(slug: string) {
  return aboutPages.find((p) => p.slug === slug);
}
