/**
 * Role-based registration forms from the client specification.
 *
 * NOTE: these render the field STRUCTURE only. Nothing is submitted or stored.
 * Several roles collect government ID (Aadhaar/PAN), banking details and
 * information about minors — those must not be captured until a backend with
 * proper consent, verification and retention handling exists.
 */

export type Field =
  | string
  | {
      label: string;
      type?: "text" | "email" | "tel" | "date" | "select" | "textarea" | "file";
      required?: boolean;
      options?: string[];
      /** flags a field as sensitive so the UI can mark it clearly */
      sensitive?: boolean;
    };

export type FieldGroup = {
  heading: string;
  note?: string;
  fields: Field[];
};

export type RoleForm = {
  slug: string;
  label: string;
  eyebrow: string;
  intro: string;
  /** some roles (student/parent) have two linked flows */
  flows: { name: string; groups: FieldGroup[] }[];
  consents: string[];
};

const COMMON_CONSENTS = [
  "I certify that the information provided is accurate.",
  "I agree to the Terms of Use.",
  "I agree to the Privacy Policy.",
  "I agree to the Child Safety Policy.",
];

const LANGUAGES = [
  "English",
  "Hindi",
  "Urdu",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Other",
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SLOTS = ["Morning", "Afternoon", "Evening", "Night"];

const BOARDS = [
  "CBSE",
  "ICSE",
  "State Board",
  "IB",
  "IGCSE",
  "NIOS",
  "University",
  "Other",
];

const ID_TYPES = ["Aadhaar", "PAN", "Passport", "Driving Licence"];

const IDENTITY_GROUP: FieldGroup = {
  heading: "Identity Verification",
  note: "Collected for verification only. Not stored until secure handling is in place.",
  fields: [
    { label: "Government ID Type", type: "select", options: ID_TYPES },
    { label: "ID Number", sensitive: true },
    { label: "Upload ID Proof", type: "file", sensitive: true },
  ],
};

const BANKING_GROUP: FieldGroup = {
  heading: "Banking Details (Optional)",
  note: "Used for payouts. Not stored until secure handling is in place.",
  fields: [
    "Account Holder Name",
    "Bank Name",
    { label: "Account Number", sensitive: true },
    { label: "IFSC Code", sensitive: true },
    { label: "UPI ID", sensitive: true },
  ],
};

export const roleForms: RoleForm[] = [
  /* ---------------- STUDENT / PARENT ---------------- */
  {
    slug: "student-parent",
    label: "Student / Parents",
    eyebrow: "Student & Parent Registration",
    intro:
      "Two separate registration flows that link to each other, so students and parents each get their own dashboard while staying connected.",
    flows: [
      {
        name: "Student Sign-up",
        groups: [
          {
            heading: "1. Personal Information",
            fields: [
              { label: "First Name", required: true },
              { label: "Last Name", required: true },
              { label: "Profile Photo", type: "file" },
              {
                label: "Gender",
                type: "select",
                options: ["Male", "Female", "Other", "Prefer not to say"],
              },
              { label: "Date of Birth", type: "date", required: true },
              { label: "Mobile Number", type: "tel", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Country", required: true },
              { label: "State", required: true },
              { label: "District", required: true },
              { label: "City", required: true },
              "PIN Code",
            ],
          },
          {
            heading: "2. Academic Information",
            fields: [
              {
                label: "Current Class / Grade",
                type: "select",
                required: true,
                options: [
                  "Class 6–12",
                  "Diploma",
                  "Undergraduate",
                  "Postgraduate",
                  "Working Professional",
                ],
              },
              {
                label: "School / College / University Name",
                required: true,
              },
              { label: "Board / University", type: "select", options: BOARDS },
              {
                label: "Stream",
                type: "select",
                options: [
                  "Science",
                  "Commerce",
                  "Arts/Humanities",
                  "Vocational",
                  "Other",
                ],
              },
              "Year of Passing",
              "Current Percentage / CGPA (Optional)",
            ],
          },
          {
            heading: "3. Career Interests",
            note: "Select all that apply.",
            fields: [
              "Engineering",
              "Medical",
              "Law",
              "Business",
              "Design",
              "Arts",
              "Media",
              "Government Jobs",
              "Defence",
              "Entrepreneurship",
              "Data Science",
              "Artificial Intelligence",
              "Software Development",
              "Finance",
              "Teaching",
              "Psychology",
              "Civil Services",
              "Sports",
              "Agriculture",
              "Hospitality",
              "Aviation",
              "Fashion",
              "Animation",
              "Architecture",
              "Biotechnology",
              "Environmental Science",
              "Undecided",
            ],
          },
          {
            heading: "4. Skills & Interests",
            note: "Select all that apply.",
            fields: [
              "Leadership",
              "Public Speaking",
              "Coding",
              "Creativity",
              "Writing",
              "Music",
              "Dance",
              "Sports",
              "Photography",
              "Robotics",
              "Graphic Design",
              "Problem Solving",
              "Critical Thinking",
              "Entrepreneurship",
              "Communication",
              "Teamwork",
              "Research",
              "Volunteering",
            ],
          },
          {
            heading: "5. Goals",
            note: "What do you want help with?",
            fields: [
              "Career Selection",
              "Subject Selection",
              "Stream Selection",
              "College Selection",
              "Exam Preparation",
              "Skill Development",
              "Internship",
              "Mentorship",
              "Personality Assessment",
              "Career Assessment",
              "Scholarships",
              "Overseas Education",
              "Resume Building",
              "Interview Preparation",
            ],
          },
          {
            heading: "6. Parent / Guardian Details",
            fields: [
              { label: "Parent / Guardian Name", required: true },
              { label: "Relationship", required: true },
              { label: "Mobile Number", type: "tel", required: true },
              { label: "Email Address", type: "email" },
              "Occupation",
            ],
          },
          {
            heading: "7. Preferences",
            fields: [
              {
                label: "Preferred Language",
                type: "select",
                options: ["English", "Hindi", "Regional Language"],
              },
              {
                label: "Preferred Counseling Mode",
                type: "select",
                options: ["Online", "Offline", "Hybrid"],
              },
            ],
          },
        ],
      },
      {
        name: "Parent / Guardian Sign-up",
        groups: [
          {
            heading: "1. Personal Information",
            fields: [
              { label: "Full Name", required: true },
              { label: "Profile Photo", type: "file" },
              { label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
              { label: "Mobile Number", type: "tel", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Date of Birth", type: "date" },
              "Occupation",
              "Annual Household Income (Optional)",
            ],
          },
          {
            heading: "2. Address",
            fields: ["Country", "State", "District", "City", "PIN Code"],
          },
          {
            heading: "3. Student Details",
            fields: [
              { label: "Student Name", required: true },
              { label: "Student Date of Birth", type: "date", required: true },
              { label: "Student Class", required: true },
              { label: "School / College", required: true },
              { label: "Board", type: "select", options: BOARDS },
              "Student Mobile Number (Optional)",
              "Student Email (Optional)",
            ],
          },
          {
            heading: "4. Career Support Interests",
            note: "Select all that apply.",
            fields: [
              "Career Counseling",
              "Psychometric Assessments",
              "Subject Selection",
              "Stream Selection",
              "College Admissions",
              "Scholarships",
              "Competitive Exams",
              "Skill Development",
              "Mental Well-being",
              "Parenting Workshops",
              "Study Planning",
              "Overseas Education",
            ],
          },
          {
            heading: "5. Preferred Communication",
            fields: [
              {
                label: "Channel",
                type: "select",
                options: ["WhatsApp", "Email", "Phone Call", "SMS"],
              },
              {
                label: "Preferred Language",
                type: "select",
                options: ["English", "Hindi", "Regional Language"],
              },
            ],
          },
          {
            heading: "6. Link Student Account",
            fields: ["Student Email or Mobile Number", "Verification Code (OTP)"],
          },
        ],
      },
    ],
    consents: [
      "I am the legal parent/guardian of the student. (parent flow)",
      ...COMMON_CONSENTS.slice(1),
      "I consent to Career Garage processing assessment and counselling data as permitted by applicable law.",
      "I agree to receive updates regarding assessments, mentoring, competitions, internships, scholarships and career opportunities.",
    ],
  },

  /* ---------------- EDUCATOR ---------------- */
  {
    slug: "educator",
    label: "Educator / Teacher",
    eyebrow: "Educator Registration",
    intro:
      "For teachers, tutors and career educators who want to teach, mentor, judge contests or build content on Career Garage.",
    flows: [
      {
        name: "Educator / Teacher Registration",
        groups: [
          {
            heading: "1. Personal Information",
            fields: [
              { label: "Full Name", required: true },
              { label: "Profile Photo", type: "file" },
              { label: "Gender", type: "select", options: ["Male", "Female"] },
              { label: "Date of Birth", type: "date" },
              { label: "Mobile Number", type: "tel", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Current City", required: true },
              { label: "State", required: true },
              { label: "Country", required: true },
              "Nationality",
            ],
          },
          {
            heading: "2. Professional Information",
            fields: [
              { label: "Current Designation", required: true },
              {
                label: "Organization / School / College / Institute",
                required: true,
              },
              {
                label: "Employment Type",
                type: "select",
                options: [
                  "Full-Time",
                  "Part-Time",
                  "Freelance",
                  "Retired",
                  "Self-employed",
                ],
              },
              {
                label: "Total Teaching Experience",
                type: "select",
                required: true,
                options: [
                  "0–2 Years",
                  "3–5 Years",
                  "6–10 Years",
                  "11–15 Years",
                  "15+ Years",
                ],
              },
            ],
          },
          {
            heading: "3. Teaching Details",
            fields: [
              { label: "Subjects You Teach", required: true },
              {
                label: "Grade / Class Levels",
                type: "select",
                options: [
                  "Primary",
                  "Middle School",
                  "High School",
                  "Higher Secondary",
                  "Undergraduate",
                  "Postgraduate",
                  "Competitive Exams",
                  "Professional Courses",
                ],
              },
              { label: "Boards / Curriculum", type: "select", options: BOARDS },
            ],
          },
          {
            heading: "4. Areas of Expertise",
            note: "Select all that apply.",
            fields: [
              "Mathematics",
              "Science",
              "Physics",
              "Chemistry",
              "Biology",
              "English",
              "Hindi",
              "Social Science",
              "Computer Science",
              "Coding",
              "Commerce",
              "Economics",
              "Business Studies",
              "Accountancy",
              "Psychology",
              "Career Guidance",
              "Soft Skills",
              "Aptitude",
              "Reasoning",
              "Spoken English",
              "Personality Development",
              "Interview Preparation",
              "Entrepreneurship",
              "Artificial Intelligence",
              "Data Science",
            ],
          },
          {
            heading: "5. Qualifications",
            fields: [
              { label: "Highest Qualification", required: true },
              "Degree Name",
              "Specialization",
              "University",
              "Graduation Year",
              {
                label: "Additional Qualifications",
                type: "select",
                options: [
                  "B.Ed.",
                  "M.Ed.",
                  "PhD",
                  "NET",
                  "SET",
                  "CTET",
                  "TET",
                  "Other Certifications",
                ],
              },
            ],
          },
          {
            heading: "6. Certifications",
            fields: [
              "Certification Name",
              "Issuing Organization",
              "Year",
              { label: "Upload Certificate", type: "file" },
            ],
          },
          {
            heading: "7. Teaching Preferences",
            fields: [
              {
                label: "Mode of Teaching",
                type: "select",
                options: ["Online", "Offline", "Hybrid"],
              },
              {
                label: "Available Languages",
                type: "select",
                options: LANGUAGES,
              },
              {
                label: "Preferred Student Age",
                type: "select",
                options: [
                  "6–10",
                  "11–14",
                  "15–18",
                  "College Students",
                  "Working Professionals",
                ],
              },
            ],
          },
          {
            heading: "8. Availability",
            fields: [
              { label: "Available Days", type: "select", options: DAYS },
              { label: "Preferred Time Slots", type: "select", options: SLOTS },
              "Hours Available Per Week",
            ],
          },
          {
            heading: "9. Career Garage Services",
            note: "Interested in:",
            fields: [
              "Career Counseling",
              "Teaching Courses",
              "Live Classes",
              "Workshops",
              "Mentorship",
              "Webinars",
              "Assessment Interpretation",
              "Competition Judge",
              "Internship Mentor",
              "Content Creation",
              "Course Development",
            ],
          },
          {
            heading: "10. Social & Professional Profiles",
            fields: [
              "LinkedIn",
              "Portfolio Website",
              "YouTube",
              "Google Scholar",
              "ResearchGate",
              "GitHub (if applicable)",
            ],
          },
          IDENTITY_GROUP,
          BANKING_GROUP,
          {
            heading: "13. Bio",
            fields: [
              { label: "Professional Summary (max 500 words)", type: "textarea" },
            ],
          },
          {
            heading: "14. Achievements",
            fields: [
              "Awards",
              "Publications",
              "Research Papers",
              "Books Authored",
              "Patents",
              "Conferences",
            ],
          },
          {
            heading: "15. References",
            fields: ["Name", "Organization", "Designation", "Mobile", "Email"],
          },
          {
            heading: "16. Documents Upload",
            fields: [
              { label: "Resume / CV", type: "file", required: true },
              { label: "Educational Certificates", type: "file", required: true },
              { label: "Experience Certificate", type: "file" },
              { label: "Professional License", type: "file" },
              { label: "Teaching Demo Video (Optional)", type: "file" },
            ],
          },
          {
            heading: "17. Background Declaration",
            fields: [
              "Have you ever been convicted of any criminal offence?",
              "Are you legally eligible to teach?",
              "Have you worked with children before?",
              "Are all the details provided true?",
            ],
          },
        ],
      },
    ],
    consents: [
      ...COMMON_CONSENTS,
      "I consent to Career Garage verifying my credentials.",
      "I agree to receive communications regarding opportunities, events and updates.",
    ],
  },

  /* ---------------- SCHOOL / INSTITUTE ---------------- */
  {
    slug: "institute",
    label: "School / Institute",
    eyebrow: "Institution Registration",
    intro:
      "For schools, colleges, universities, coaching institutes, training centres, NGOs and other educational organisations.",
    flows: [
      {
        name: "School / Institute Registration",
        groups: [
          {
            heading: "1. Basic Information",
            fields: [
              { label: "Institution Name", required: true },
              {
                label: "Institution Type",
                type: "select",
                required: true,
                options: [
                  "School",
                  "College",
                  "University",
                  "Coaching Institute",
                  "Training Institute",
                  "Skill Development Center",
                  "NGO",
                  "Other",
                ],
              },
              "Year Established",
              "Registration Number",
              "Affiliated Board / University",
              { label: "Institution Logo", type: "file" },
              "Website",
              { label: "Official Email Address", type: "email", required: true },
              { label: "Official Phone Number", type: "tel", required: true },
            ],
          },
          {
            heading: "2. Address Details",
            fields: [
              { label: "Address Line 1", required: true },
              "Address Line 2",
              { label: "City", required: true },
              { label: "District", required: true },
              { label: "State", required: true },
              { label: "PIN Code", required: true },
              { label: "Country", required: true },
            ],
          },
          {
            heading: "3. Authorized Representative",
            fields: [
              { label: "Full Name", required: true },
              { label: "Designation", required: true },
              { label: "Mobile Number", type: "tel", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Government ID Type", type: "select", options: ID_TYPES },
              { label: "Government ID Number", sensitive: true },
              { label: "Upload ID Proof", type: "file", sensitive: true },
            ],
          },
          {
            heading: "4. Institution Details",
            fields: [
              "Total Student Strength",
              "Number of Teachers",
              "Number of Counselors",
              "Number of Campuses",
              {
                label: "Medium of Instruction",
                type: "select",
                options: ["English", "Hindi", "Regional Language", "Bilingual"],
              },
              {
                label: "Grades Offered",
                type: "select",
                options: [
                  "Pre-Primary",
                  "Primary",
                  "Middle School",
                  "Secondary",
                  "Senior Secondary",
                  "Diploma",
                  "Undergraduate",
                  "Postgraduate",
                  "Professional Courses",
                ],
              },
            ],
          },
          {
            heading: "5. Curriculum / Board",
            note: "Select all that apply.",
            fields: [...BOARDS, "AICTE", "UGC", "NCVT", "SCVT"],
          },
          {
            heading: "6. Services Interested In",
            note: "Select all that apply.",
            fields: [
              "Career Guidance Programs",
              "Psychometric Assessments",
              "Career Counseling",
              "Student Mentoring",
              "Parent Counseling",
              "Teacher Training",
              "Skill Development Programs",
              "Internship Programs",
              "Campus Recruitment Support",
              "Competitions & Olympiads",
              "Workshops & Seminars",
              "AI Career Reports",
              "College Admission Guidance",
              "Scholarship Guidance",
              "Certification Programs",
            ],
          },
          {
            heading: "7. Infrastructure",
            note: "Available facilities.",
            fields: [
              "Computer Lab",
              "Internet Access",
              "Smart Classrooms",
              "Projector",
              "Seminar Hall",
              "Auditorium",
              "Library",
              "Career Guidance Cell",
            ],
          },
          {
            heading: "8. Preferred Program Delivery",
            fields: [
              {
                label: "Mode",
                type: "select",
                options: ["Online", "Offline", "Hybrid"],
              },
              {
                label: "Preferred Session Duration",
                type: "select",
                options: ["1 Hour", "Half Day", "Full Day", "Multi-Day Program"],
              },
              {
                label: "Preferred Schedule",
                type: "select",
                options: [
                  "Weekdays",
                  "Weekends",
                  "During School Hours",
                  "After School Hours",
                  "Holidays",
                ],
              },
            ],
          },
          {
            heading: "9. Institutional Documents",
            fields: [
              { label: "Registration Certificate", type: "file", required: true },
              { label: "Affiliation Certificate", type: "file" },
              { label: "Recognition Certificate", type: "file" },
              { label: "PAN Card", type: "file", sensitive: true },
              { label: "GST Certificate (if applicable)", type: "file" },
              "UDISE Code (for schools)",
              "AISHE Code (for higher education institutions)",
            ],
          },
          {
            heading: "10. Billing Information",
            fields: [
              "Organization Name",
              "Billing Address",
              "GSTIN (Optional)",
              { label: "PAN Number", sensitive: true },
              "Accounts Contact Name",
              "Accounts Email",
              "Accounts Phone",
            ],
          },
          {
            heading: "11. Primary Objectives",
            fields: [
              "Career Awareness",
              "Career Planning",
              "Student Employability",
              "Skill Development",
              "Higher Education Guidance",
              "Entrepreneurship",
              "Teacher Capacity Building",
              "Parent Engagement",
              "Mental Well-being",
              "Placement Support",
            ],
          },
        ],
      },
    ],
    consents: [
      "I confirm that the information provided is accurate.",
      "I am authorized to register this institution.",
      ...COMMON_CONSENTS.slice(1),
      "I consent to Career Garage verifying our institution and documents.",
    ],
  },

  /* ---------------- COUNSELLOR ---------------- */
  {
    slug: "counsellor",
    label: "Counsellor / Psychologist",
    eyebrow: "Counsellor Registration",
    intro:
      "For career counsellors, school counsellors and licensed psychologists. Verification is required before you can provide counselling on the platform.",
    flows: [
      {
        name: "Counsellor / Psychologist Registration",
        groups: [
          {
            heading: "1. Personal Information",
            fields: [
              { label: "First Name", required: true },
              { label: "Last Name", required: true },
              { label: "Profile Photo", type: "file" },
              {
                label: "Gender",
                type: "select",
                options: ["Male", "Female", "Other", "Prefer not to say"],
              },
              { label: "Date of Birth", type: "date", required: true },
              { label: "Mobile Number", type: "tel", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Country", required: true },
              { label: "State", required: true },
              { label: "City", required: true },
            ],
          },
          {
            heading: "2. Professional Information",
            fields: [
              {
                label: "Professional Title",
                type: "select",
                required: true,
                options: [
                  "Career Counsellor",
                  "School Counsellor",
                  "Psychologist",
                  "Clinical Psychologist",
                  "Counselling Psychologist",
                  "Rehabilitation Psychologist",
                  "Educational Psychologist",
                  "Child Psychologist",
                  "Mental Health Professional",
                  "Life Coach",
                ],
              },
              "Current Organization",
              "Current Designation",
              {
                label: "Employment Status",
                type: "select",
                options: [
                  "Full-Time",
                  "Part-Time",
                  "Independent Practitioner",
                  "Consultant",
                  "Freelance",
                  "Retired",
                ],
              },
              {
                label: "Years of Experience",
                type: "select",
                required: true,
                options: ["0–2", "3–5", "6–10", "11–15", "15+"],
              },
            ],
          },
          {
            heading: "3. Qualifications",
            fields: [
              { label: "Highest Qualification", required: true },
              { label: "Degree", required: true },
              { label: "Specialization", required: true },
              { label: "University / Institution", required: true },
              { label: "Graduation Year", required: true },
            ],
          },
          {
            heading: "4. Professional Registration & Licenses",
            fields: [
              "Registration Number (if applicable)",
              "Registration / Licensing Authority",
              { label: "Expiry Date (if applicable)", type: "date" },
              { label: "Upload Registration Certificate", type: "file" },
            ],
          },
          {
            heading: "5. Certifications",
            note: "Select all that apply.",
            fields: [
              "Career Counselling",
              "Psychometric Assessment",
              "Cognitive Behaviour Therapy (CBT)",
              "REBT",
              "NLP",
              "Child Counselling",
              "Family Counselling",
              "Grief Counselling",
              "Crisis Intervention",
              "Mental Health First Aid",
              "Positive Psychology",
              "Coaching",
            ],
          },
          {
            heading: "6. Areas of Specialization",
            note: "Career guidance, psychology and student development.",
            fields: [
              "Career Planning",
              "Stream Selection",
              "Subject Selection",
              "College Admissions",
              "Study Abroad",
              "Scholarship Guidance",
              "Career Transition",
              "Child Psychology",
              "Adolescent Psychology",
              "Educational Psychology",
              "Counselling Psychology",
              "Clinical Psychology",
              "Family Counselling",
              "Parenting Guidance",
              "Stress Management",
              "Emotional Well-being",
              "Behavioural Issues",
              "Learning Difficulties",
              "Personality Development",
              "Leadership",
              "Communication Skills",
              "Goal Setting",
              "Confidence Building",
              "Time Management",
            ],
          },
          {
            heading: "7. Target Audience",
            fields: [
              "Primary School",
              "Middle School",
              "High School",
              "Senior Secondary",
              "College Students",
              "Graduates",
              "Working Professionals",
              "Parents",
              "Teachers",
              "Schools",
              "Corporate Employees",
            ],
          },
          {
            heading: "8. Services Offered",
            fields: [
              "One-to-One Counselling",
              "Group Counselling",
              "Career Assessments",
              "Psychometric Assessment Interpretation",
              "Workshops",
              "Parent Counselling",
              "Teacher Training",
              "School Programs",
              "Webinars",
              "Corporate Sessions",
            ],
          },
          {
            heading: "9. Session Preferences",
            fields: [
              {
                label: "Mode",
                type: "select",
                options: ["Online", "Offline", "Hybrid"],
              },
              {
                label: "Session Duration",
                type: "select",
                options: ["30 Minutes", "45 Minutes", "60 Minutes", "90 Minutes"],
              },
              { label: "Languages Spoken", type: "select", options: LANGUAGES },
              { label: "Availability", type: "select", options: DAYS },
              { label: "Preferred Time Slots", type: "select", options: SLOTS },
            ],
          },
          {
            heading: "10. Professional Profile",
            fields: [
              {
                label: "Professional Biography (max 500 words)",
                type: "textarea",
              },
              { label: "Counseling Philosophy", type: "textarea" },
              "Years of Counseling Practice",
              "Approximate Number of Clients Served",
            ],
          },
          {
            heading: "11. Documents Upload",
            fields: [
              { label: "Resume / CV", type: "file", required: true },
              { label: "Educational Certificates", type: "file", required: true },
              { label: "Professional License / Registration", type: "file" },
              { label: "Experience Certificates", type: "file" },
              {
                label: "Government ID Proof",
                type: "file",
                required: true,
                sensitive: true,
              },
            ],
          },
          IDENTITY_GROUP,
          {
            heading: "13. Emergency Contact",
            fields: ["Name", "Relationship", "Mobile Number"],
          },
          BANKING_GROUP,
          {
            heading: "15. Background & Professional Declaration",
            fields: [
              "Have you ever had a professional license suspended or revoked?",
              "Have you ever been convicted of a criminal offence?",
              "Are there any ongoing disciplinary proceedings against you?",
              "Are all qualifications and experience details accurate?",
            ],
          },
        ],
      },
    ],
    consents: [
      ...COMMON_CONSENTS,
      "I agree to the Code of Conduct for Counselors.",
      "I consent to Career Garage verifying my identity, qualifications, registrations and professional credentials.",
      "I understand that verification is required before I can provide counseling services on the platform.",
    ],
  },

  /* ---------------- SKILL TRAINER ---------------- */
  {
    slug: "trainer",
    label: "Professional / Skill Trainer",
    eyebrow: "Skill Trainer Registration",
    intro:
      "For industry experts, corporate trainers, freelancers, entrepreneurs and practitioners who teach practical, employability, technical or business skills.",
    flows: [
      {
        name: "Professional / Skill Trainer Registration",
        groups: [
          {
            heading: "1. Personal Information",
            fields: [
              { label: "First Name", required: true },
              { label: "Last Name", required: true },
              { label: "Profile Photo", type: "file" },
              {
                label: "Gender",
                type: "select",
                options: ["Male", "Female", "Other"],
              },
              { label: "Date of Birth", type: "date", required: true },
              { label: "Mobile Number", type: "tel", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Country", required: true },
              { label: "State", required: true },
              { label: "City", required: true },
            ],
          },
          {
            heading: "2. Professional Information",
            fields: [
              { label: "Current Job Title", required: true },
              "Current Company / Organization",
              { label: "Industry", required: true },
              {
                label: "Employment Type",
                type: "select",
                options: [
                  "Full-Time",
                  "Part-Time",
                  "Freelancer",
                  "Consultant",
                  "Entrepreneur",
                  "Self-Employed",
                  "Retired",
                ],
              },
              {
                label: "Total Industry Experience",
                type: "select",
                required: true,
                options: [
                  "0–2 Years",
                  "3–5 Years",
                  "6–10 Years",
                  "11–15 Years",
                  "15+ Years",
                ],
              },
              {
                label: "Total Training Experience",
                type: "select",
                required: true,
                options: [
                  "0–2 Years",
                  "3–5 Years",
                  "6–10 Years",
                  "11–15 Years",
                  "15+ Years",
                ],
              },
            ],
          },
          {
            heading: "3. Education",
            fields: [
              { label: "Highest Qualification", required: true },
              "Degree / Diploma",
              "Specialization",
              "Institution / University",
              "Graduation Year",
            ],
          },
          {
            heading: "4. Areas of Expertise",
            note: "Technology, business, creative and vocational tracks.",
            fields: [
              "Programming",
              "Web Development",
              "Mobile App Development",
              "Artificial Intelligence",
              "Machine Learning",
              "Data Science",
              "Cloud Computing",
              "Cybersecurity",
              "DevOps",
              "UI/UX Design",
              "Blockchain",
              "Robotics",
              "Entrepreneurship",
              "Marketing",
              "Digital Marketing",
              "Sales",
              "Finance",
              "Accounting",
              "HR",
              "Operations",
              "Product Management",
              "Business Analytics",
              "Graphic Design",
              "Video Editing",
              "Animation",
              "Photography",
              "Content Writing",
              "Public Speaking",
              "Resume Building",
              "Interview Preparation",
              "Communication Skills",
              "Personality Development",
              "Leadership",
              "Workplace Readiness",
              "Electrician",
              "Plumbing",
              "Carpentry",
              "Fashion Design",
              "Beauty & Wellness",
              "Hospitality",
              "Retail",
              "Agriculture",
              "Food Processing",
            ],
          },
          {
            heading: "5. Training Details",
            note: "Services you can provide.",
            fields: [
              "Live Classes",
              "Recorded Courses",
              "Workshops",
              "Bootcamps",
              "Masterclasses",
              "Corporate Training",
              "College Training",
              "School Programs",
              "Career Mentoring",
              "Internship Mentoring",
              "Project Guidance",
              "Mock Interviews",
              "Certification Programs",
            ],
          },
          {
            heading: "6. Target Audience & Languages",
            fields: [
              {
                label: "Target Audience",
                type: "select",
                options: [
                  "School Students",
                  "College Students",
                  "Graduates",
                  "Working Professionals",
                  "Entrepreneurs",
                  "Teachers",
                  "Parents",
                  "Corporate Teams",
                ],
              },
              {
                label: "Languages You Can Teach In",
                type: "select",
                options: LANGUAGES,
              },
            ],
          },
          {
            heading: "7. Session Preferences",
            fields: [
              {
                label: "Training Mode",
                type: "select",
                options: ["Online", "Offline", "Hybrid"],
              },
              {
                label: "Preferred Session Duration",
                type: "select",
                options: [
                  "30 Minutes",
                  "60 Minutes",
                  "Half Day",
                  "Full Day",
                  "Multi-Day Bootcamp",
                ],
              },
              { label: "Availability", type: "select", options: DAYS },
              { label: "Preferred Time Slots", type: "select", options: SLOTS },
            ],
          },
          {
            heading: "8. Professional Profile",
            fields: [
              {
                label: "Professional Summary (max 500 words)",
                type: "textarea",
              },
              { label: "Teaching Philosophy", type: "textarea" },
              "Number of Learners Trained",
              "Number of Workshops Conducted",
              "Major Projects",
              "Industries Served",
            ],
          },
          {
            heading: "9. Portfolio & Professional Links",
            fields: [
              "LinkedIn",
              "Personal Website",
              "Portfolio",
              "GitHub (if applicable)",
              "Behance (if applicable)",
              "Dribbble (if applicable)",
              "YouTube",
              "Kaggle (if applicable)",
            ],
          },
          {
            heading: "10. Course & Content Information",
            fields: [
              "Course Topics You Can Deliver",
              {
                label: "Skill Levels",
                type: "select",
                options: ["Beginner", "Intermediate", "Advanced"],
              },
              "Typical Batch Size",
              "Maximum Batch Size",
              "Course Duration",
              { label: "Upload Sample Course Outline (Optional)", type: "file" },
            ],
          },
          {
            heading: "11. Documents Upload",
            fields: [
              { label: "Resume / CV", type: "file", required: true },
              { label: "Educational Certificates", type: "file" },
              { label: "Industry Certifications", type: "file" },
              { label: "Experience Certificates", type: "file" },
              {
                label: "Government ID Proof",
                type: "file",
                required: true,
                sensitive: true,
              },
              { label: "Sample Training Video (Optional)", type: "file" },
            ],
          },
          IDENTITY_GROUP,
          BANKING_GROUP,
          {
            heading: "14. References",
            fields: ["Name", "Organization", "Designation", "Email", "Mobile Number"],
          },
          {
            heading: "15. Professional Declaration",
            fields: [
              "Have you ever been suspended or terminated for professional misconduct?",
              "Are all qualifications and experience details accurate?",
              "Are you authorized to teach and share the content you upload?",
              "Do you agree to maintain professional conduct while interacting with learners?",
            ],
          },
        ],
      },
    ],
    consents: [
      ...COMMON_CONSENTS,
      "I agree to the Code of Conduct.",
      "I consent to Career Garage verifying my identity, qualifications, certifications and experience.",
      "I understand that approval is required before I can offer training on the platform.",
    ],
  },
];

export function getRoleForm(slug: string) {
  return roleForms.find((r) => r.slug === slug);
}
