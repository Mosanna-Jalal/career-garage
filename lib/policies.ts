/**
 * Legal and policy pages from the client specification:
 * Privacy Policy, Terms of Use, AI Usage & Responsible AI Policy, Code of Conduct.
 */

export type PolicyBlock = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  groups?: { heading: string; items: string[] }[];
};

export type Policy = {
  slug: string;
  title: string;
  summary: string;
  intro: string[];
  blocks: PolicyBlock[];
  closing?: string[];
};

const CONTACT: PolicyBlock = {
  heading: "Contact Us",
  paragraphs: [
    "Career Garage — Email: support@careergarage.in · Website: www.careergarage.in",
  ],
};

export const policies: Policy[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary:
      "How Career Garage collects, uses, stores, protects and shares your personal information.",
    intro: [
      'Welcome to Career Garage ("Career Garage", "we", "our", or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, store, protect, and share your personal information when you use our website, mobile application, assessments, counseling services, mentorship programs, internship platform, certification programs, competitions, and other related services (collectively, the "Services").',
      "By accessing or using our Services, you agree to this Privacy Policy.",
    ],
    blocks: [
      {
        heading: "1. Information We Collect",
        paragraphs: ["We may collect the following categories of information:"],
        groups: [
          {
            heading: "Personal Information",
            items: [
              "Full name",
              "Date of birth or age",
              "Gender (optional where applicable)",
              "Email address",
              "Mobile number",
              "Address (if required)",
              "Educational information",
              "Occupation",
              "Institution or organization",
            ],
          },
          {
            heading: "Career Information",
            items: [
              "Career interests",
              "Academic background",
              "Skills and competencies",
              "Work experience",
              "Career goals",
              "Learning preferences",
            ],
          },
          {
            heading: "Assessment Information",
            items: [
              "Assessment responses",
              "Scores",
              "Reports",
              "Career preferences",
              "Personality-related insights generated through our assessment process",
            ],
          },
          {
            heading: "Account Information",
            items: [
              "Username",
              "Password (stored securely in encrypted or hashed form)",
              "Login activity",
              "Device information",
            ],
          },
          {
            heading: "Technical Information",
            items: [
              "IP address",
              "Browser type",
              "Device type",
              "Operating system",
              "Cookies and similar technologies",
              "Usage analytics",
            ],
          },
        ],
      },
      {
        heading: "2. How We Use Your Information",
        paragraphs: ["We use your information to:"],
        items: [
          "Create and manage your account",
          "Deliver career guidance and personalized recommendations",
          "Generate assessment reports",
          "Provide mentorship and learning services",
          "Recommend internships, competitions, certifications, and relevant opportunities",
          "Improve our products and services",
          "Respond to support requests",
          "Send important service notifications",
          "Prevent fraud and protect platform security",
          "Comply with applicable legal obligations",
        ],
      },
      {
        heading: "3. AI-Powered Features",
        paragraphs: [
          "Career Garage may use artificial intelligence to assist in generating personalized insights, recommendations, and learning pathways.",
          "AI-generated recommendations are designed to support informed decision-making and should be considered alongside individual judgment, professional advice, and personal circumstances. AI does not make decisions on behalf of users.",
        ],
      },
      {
        heading: "4. Sharing of Information",
        paragraphs: [
          "We do not sell your personal information. We may share information only when necessary with:",
        ],
        items: [
          "Authorized mentors or counselors (where relevant)",
          "Internship or placement partners (with your consent where required)",
          "Educational institutions (where applicable and authorized)",
          "Technology service providers who help us operate our platform",
          "Government authorities when required by law",
        ],
      },
      {
        heading: "5. Data Security",
        paragraphs: [
          "We implement reasonable technical and organizational measures to protect your information from unauthorized access, misuse, alteration, disclosure, or loss.",
          "While we strive to protect your information, no internet-based system can guarantee absolute security.",
        ],
      },
      {
        heading: "6. Data Retention",
        paragraphs: [
          "We retain your information only for as long as necessary to provide our Services, maintain your account, meet legal and regulatory obligations, resolve disputes, and improve our platform.",
          "When information is no longer required, we will delete or anonymize it in accordance with applicable laws and our data retention practices.",
        ],
      },
      {
        heading: "7. Your Rights",
        paragraphs: ["Subject to applicable law, you may have the right to:"],
        items: [
          "Access your personal information",
          "Correct inaccurate information",
          "Update your profile",
          "Request deletion of your account or certain personal data",
          "Withdraw consent where processing is based on consent",
          "Request a copy of your information, where applicable",
        ],
      },
      {
        heading: "8. Children's Privacy",
        paragraphs: [
          "Some of our Services are intended for students under the age of 18.",
          "Where required by applicable law, we seek appropriate consent from a parent or legal guardian before collecting or processing the personal information of minors.",
          "Parents and guardians may contact us to review, update, or request deletion of their child's personal information, subject to applicable legal requirements.",
        ],
      },
      {
        heading: "9. Cookies",
        paragraphs: ["We use cookies and similar technologies to:"],
        items: [
          "Improve website performance",
          "Remember user preferences",
          "Analyze traffic",
          "Enhance user experience",
        ],
      },
      {
        heading: "10. Third-Party Services",
        paragraphs: [
          "Our platform may integrate with trusted third-party services, such as payment gateways, communication tools, analytics providers, or educational partners.",
          "These third parties operate under their own privacy policies, and we encourage users to review those policies before using their services.",
        ],
      },
      {
        heading: "11. Changes to This Privacy Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time to reflect changes in our Services, technology, or legal obligations. The updated version will be published on our website with a revised effective date.",
        ],
      },
      CONTACT,
    ],
    closing: [
      "By using Career Garage, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and processing of your information as described above.",
    ],
  },

  {
    slug: "terms",
    title: "Terms of Use",
    summary:
      "The terms governing your access to and use of the Career Garage platform and services.",
    intro: [
      'Welcome to Career Garage ("Career Garage", "we", "our", or "us"). These Terms of Use ("Terms") govern your access to and use of our website, mobile application, assessments, career counseling services, mentorship programs, internship platform, competitions, certification programs, and all related services (collectively, the "Services").',
      "By accessing or using Career Garage, you agree to be bound by these Terms. If you do not agree, please do not use our Services.",
    ],
    blocks: [
      {
        heading: "1. Eligibility",
        paragraphs: ["You may use Career Garage if:"],
        items: [
          "You are at least 18 years old; or",
          "You are under 18 and use the platform with the consent and supervision of a parent or legal guardian, where required.",
        ],
      },
      {
        heading: "2. User Account",
        paragraphs: [
          "To access certain features, you may be required to create an account. You agree to:",
        ],
        items: [
          "Provide accurate and up-to-date information.",
          "Keep your login credentials confidential.",
          "Notify us promptly of any unauthorized access to your account.",
          "Be responsible for all activities conducted through your account.",
        ],
      },
      {
        heading: "3. Our Services",
        paragraphs: ["Career Garage provides services that may include:"],
        items: [
          "Career guidance",
          "Psychometric and career-related assessments",
          "AI-assisted recommendations",
          "Mentorship",
          "Internship opportunities",
          "Competitions",
          "Certification programs",
          "Career resources",
          "Learning and development content",
        ],
      },
      {
        heading: "4. Responsible Use of AI",
        paragraphs: [
          "Career Garage may use artificial intelligence to provide personalized insights and recommendations.",
          "Our AI tools are designed to assist users in making informed career decisions. They do not replace professional judgment, human expertise, or personal decision-making.",
        ],
      },
      {
        heading: "5. Assessments and Reports",
        paragraphs: [
          "Assessment results are intended to support self-understanding and career exploration. They should not be interpreted as guarantees of career success, admission, employment, or future outcomes.",
          "Career decisions remain the responsibility of the individual.",
        ],
      },
      {
        heading: "6. User Responsibilities",
        paragraphs: ["You agree not to:"],
        items: [
          "Provide false or misleading information.",
          "Impersonate another person.",
          "Misuse assessments or reports.",
          "Attempt to interfere with the platform's operation or security.",
          "Upload unlawful, offensive, harmful, or infringing content.",
          "Use automated tools to access the platform without authorization.",
        ],
      },
      {
        heading: "7. Payments and Refunds",
        paragraphs: [
          "Certain services may require payment. Applicable fees, payment terms, and refund policies will be communicated before purchase.",
          "Unless otherwise stated, payments made for completed digital services, assessments, or counseling sessions may not be refundable, except where required by applicable law.",
        ],
      },
      {
        heading: "8. Mentorship, Internships, and Third-Party Opportunities",
        paragraphs: [
          "While we strive to work with reputable partners, Career Garage does not guarantee admission, employment, internship selection, scholarship awards, business opportunities, or specific outcomes.",
          "Users are encouraged to conduct their own evaluation before accepting opportunities.",
        ],
      },
      {
        heading: "9. Intellectual Property",
        paragraphs: [
          "All content on Career Garage, including text, graphics, logos, assessments, software, reports, designs, videos, trademarks, and educational materials, is owned by or licensed to Career Garage and is protected by applicable intellectual property laws.",
          "Users may not reproduce, distribute, modify, sell, or commercially exploit our content without prior written permission.",
        ],
      },
      {
        heading: "10. Acceptable Use",
        paragraphs: [
          "Activities that may result in suspension or termination include:",
        ],
        items: [
          "Fraudulent activity",
          "Harassment",
          "Distribution of harmful software",
          "Unauthorized commercial use",
          "Attempting to access restricted systems",
          "Violating applicable laws",
        ],
      },
      {
        heading: "11. Service Availability",
        paragraphs: [
          "We may modify, update, suspend, or discontinue features or services without prior notice where reasonably necessary. We do not guarantee uninterrupted or error-free access to the platform.",
        ],
      },
      {
        heading: "12. Limitation of Liability",
        paragraphs: [
          "To the fullest extent permitted by applicable law, Career Garage shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from the use of our Services.",
          "Career Garage's assessments, recommendations, educational resources, and guidance are intended to support informed decision-making and should not be considered guarantees of specific educational, employment, financial, or career outcomes.",
        ],
      },
      {
        heading: "13. Governing Law",
        paragraphs: [
          "These Terms shall be governed by and interpreted in accordance with the laws of India.",
          "Any disputes arising from these Terms shall be subject to the jurisdiction of the competent courts located in the city where Career Garage has its registered office, unless otherwise required by applicable law.",
        ],
      },
      CONTACT,
    ],
    closing: [
      "By accessing or using Career Garage, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.",
    ],
  },

  {
    slug: "ai-policy",
    title: "AI Usage & Responsible AI Policy",
    summary:
      "How Career Garage uses artificial intelligence, and the principles that govern it.",
    intro: [
      "At Career Garage, we believe that Artificial Intelligence can make career guidance more personalized, accessible, and efficient. However, we also believe that technology should always serve people — not replace their judgment.",
      "This Responsible AI Policy explains how Career Garage uses AI, the principles that guide its development and deployment, and the responsibilities of both Career Garage and our users.",
    ],
    blocks: [
      {
        heading: "Our AI Philosophy",
        paragraphs: [
          "Artificial Intelligence is designed to assist, inform, and support decision-making — not to make decisions on behalf of individuals.",
          "Our AI systems provide personalized insights and recommendations based on available information, but career decisions remain the responsibility of the individual.",
        ],
      },
      {
        heading: "How We Use AI",
        paragraphs: ["Career Garage may use AI to assist with:"],
        items: [
          "Career discovery",
          "Career pathway recommendations",
          "Learning pathway suggestions",
          "Skill-gap analysis",
          "Psychometric report interpretation",
          "Personalized learning recommendations",
          "Mentor matching",
          "Internship recommendations",
          "Educational content recommendations",
          "Resume feedback",
          "Interview preparation",
          "Progress tracking",
          "Student engagement",
          "Customer support",
          "Language translation and accessibility features",
        ],
      },
      {
        heading: "What AI Does Not Do",
        paragraphs: ["Career Garage's AI does not:"],
        items: [
          "Guarantee career success",
          "Guarantee admission to educational institutions",
          "Guarantee employment or internships",
          "Replace professional counselors or mentors",
          "Diagnose psychological or medical conditions",
          "Make legally binding decisions",
          "Make final decisions for users",
        ],
      },
      {
        heading: "Human Oversight",
        paragraphs: [
          "Career Garage believes that important career decisions deserve human understanding. Where appropriate, AI-generated insights may be supplemented by career counselors, mentors, educators and subject matter experts.",
          "Users are encouraged to seek professional advice when making significant educational or career decisions.",
        ],
      },
      {
        heading: "Responsible Use Principles",
        groups: [
          {
            heading: "1. Human-Centered",
            items: [
              "People remain at the center of every recommendation.",
              "Technology exists to empower individuals — not control them.",
            ],
          },
          {
            heading: "2. Transparency",
            items: [
              "Where AI significantly contributes to recommendations, we aim to make this clear.",
              "We strive to explain recommendations in understandable language.",
            ],
          },
          {
            heading: "3. Fairness",
            items: [
              "We work to reduce unfair bias in our AI systems.",
              "We continually evaluate and improve our models to promote equitable treatment.",
            ],
          },
          {
            heading: "4. Privacy",
            items: [
              "AI systems only process information in accordance with our Privacy Policy.",
              "We do not sell personal information.",
            ],
          },
          {
            heading: "5. Security",
            items: [
              "We implement reasonable safeguards to protect AI systems and user information.",
            ],
          },
          {
            heading: "6. Continuous Improvement",
            items: [
              "We regularly review system performance and improve recommendations based on research, feedback and testing.",
            ],
          },
        ],
      },
      {
        heading: "User Responsibilities",
        paragraphs: ["Users are encouraged to:"],
        items: [
          "Provide accurate information.",
          "Review AI-generated recommendations thoughtfully.",
          "Consider their own goals, interests, and circumstances.",
          "Consult qualified professionals when appropriate.",
          "Report inaccurate or inappropriate recommendations.",
        ],
      },
      {
        heading: "Limitations of AI",
        paragraphs: ["Recommendations may be affected by:"],
        items: [
          "Incomplete information",
          "Changes in educational systems",
          "Changes in labor markets",
          "Emerging careers",
          "User-provided data",
          "Technological limitations",
        ],
      },
      {
        heading: "Ethical AI Commitment",
        paragraphs: ["Career Garage is committed to developing AI that is:"],
        items: [
          "Fair",
          "Transparent",
          "Secure",
          "Privacy-conscious",
          "Inclusive",
          "Accountable",
          "Human-centered",
        ],
      },
      CONTACT,
    ],
    closing: [
      "At Career Garage, we believe Artificial Intelligence should empower people — not replace them. Our commitment is to use AI responsibly, ethically, and transparently to help individuals better understand themselves, explore opportunities, and make informed career decisions with confidence.",
    ],
  },

  {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    summary:
      "The standards of behaviour expected from every member of the Career Garage community.",
    intro: [
      "At Career Garage, we are committed to creating a safe, respectful, inclusive, and professional environment where individuals can learn, grow, collaborate, and make informed career decisions.",
      "This Code of Conduct outlines the standards of behavior expected from every member of the Career Garage community. By using our platform or participating in our programs, you agree to follow these principles.",
    ],
    blocks: [
      {
        heading: "Our Principles",
        paragraphs: [
          "Every member of the Career Garage community is expected to demonstrate:",
        ],
        items: [
          "Respect",
          "Integrity",
          "Professionalism",
          "Responsibility",
          "Inclusivity",
          "Honesty",
          "Collaboration",
          "Accountability",
        ],
      },
      {
        heading: "Respect for Others",
        paragraphs: [
          "Treat every individual with dignity and respect, regardless of age, gender, religion, language, disability, socioeconomic background, educational background, career aspirations or personal opinions.",
          "Discrimination, harassment, or abusive behavior will not be tolerated.",
        ],
      },
      {
        heading: "Academic and Professional Integrity",
        paragraphs: ["Users must:"],
        items: [
          "Provide accurate information.",
          "Complete assessments honestly.",
          "Submit original work in competitions and assignments.",
          "Respect intellectual property rights.",
          "Avoid plagiarism, cheating, or misrepresentation.",
        ],
      },
      {
        heading: "Responsible Use of the Platform",
        paragraphs: ["Users agree not to:"],
        items: [
          "Create fake accounts.",
          "Impersonate another person.",
          "Share false or misleading information.",
          "Attempt to access unauthorized systems or data.",
          "Introduce malicious software or harmful code.",
          "Disrupt platform operations.",
          "Misuse assessments, reports, or certifications.",
        ],
      },
      {
        heading: "Mentorship and Counseling Ethics",
        paragraphs: ["Mentors and counselors should:"],
        items: [
          "Act professionally and respectfully.",
          "Maintain confidentiality where appropriate.",
          "Avoid conflicts of interest.",
          "Provide guidance based on knowledge and experience.",
          "Respect professional boundaries.",
          "Never exploit users financially, emotionally, or personally.",
        ],
      },
      {
        heading: "Safe Environment",
        paragraphs: ["The following behaviors are prohibited:"],
        items: [
          "Bullying",
          "Harassment",
          "Hate speech",
          "Threats",
          "Intimidation",
          "Stalking",
          "Sexual harassment",
          "Discrimination",
          "Offensive or abusive language",
        ],
      },
      {
        heading: "Child Protection",
        paragraphs: [
          "Extra care must be taken when interacting with users under 18 years of age. Adults interacting with minors must behave professionally, respect safeguarding policies, avoid inappropriate communication, and report any safety concerns immediately.",
          "Career Garage maintains a zero-tolerance approach toward child exploitation, grooming, or abuse.",
        ],
      },
      {
        heading: "Fair Participation",
        paragraphs: ["Participants must not:"],
        items: [
          "Cheat",
          "Manipulate results",
          "Misrepresent achievements",
          "Use unfair means to gain advantages",
        ],
      },
      {
        heading: "Consequences of Violations",
        paragraphs: [
          "Violations of this Code may result in one or more of the following actions:",
        ],
        items: [
          "Educational warning",
          "Temporary restriction of platform features",
          "Suspension of account",
          "Permanent account termination",
          "Removal from competitions, mentorships, or programs",
          "Revocation of certificates, where justified",
          "Reporting to relevant authorities where required by law",
        ],
      },
      {
        heading: "Reporting Misconduct",
        paragraphs: [
          "If you witness behavior that violates this Code of Conduct, you are encouraged to report it through our designated reporting channels.",
          "Reports will be reviewed fairly and confidentially, to the extent reasonably possible. Retaliation against individuals who report concerns in good faith is not permitted.",
        ],
      },
    ],
    closing: [
      "Career Garage is more than a technology platform — it is a community built on trust, respect, learning, and opportunity.",
      "Together, we are building a community where every person is treated with dignity, every voice is respected, and every career journey is valued.",
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
