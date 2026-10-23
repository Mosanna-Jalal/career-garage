/**
 * Discovery dimensions for Career Garage Connect, from "Community CG":
 * students find each other by class, subject, school, city/state, interests,
 * skills, career interests, languages and goals; communities declare the
 * combination they are for so people can judge fit before joining.
 * Client-safe (no server imports).
 */

export const roleOptions = ["student", "parent", "teacher", "professor", "counsellor", "professional"] as const;

export const classOptions = [
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
  "Undergraduate", "Postgraduate", "Graduate / working",
];

export const subjectOptions = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "Hindi",
  "Economics", "Accountancy", "Business Studies", "History", "Geography", "Political Science",
  "Psychology", "Fine Arts", "Music", "Physical Education",
];

export const interestOptions = [
  "AI & Robotics", "Coding", "Mathematics Olympiad", "Science Olympiad", "Debate & Public Speaking",
  "Creative Writing", "Climate & Sustainability", "Entrepreneurship", "Medicine", "Engineering",
  "Competitive Exams", "Scholarships", "Design", "Music", "Sports", "Research", "Finance & Investing",
  "Law & Policy", "Space & Astronomy", "Photography & Film",
];

export const skillOptions = [
  "Problem solving", "Programming", "Public speaking", "Writing", "Data analysis", "Design tools",
  "Leadership", "Teamwork", "Research", "Teaching", "Counselling", "Project management",
];

/** Career interest areas follow the 570-career library's meta families. */
export const careerInterestOptions = [
  "Technology", "Engineering", "Healthcare", "Science", "Business", "Law", "Public service",
  "Education", "Design", "Creative arts", "Service & hospitality", "Maritime", "Social impact", "Vocational",
];

export const languageOptions = ["English", "Hindi", "Bengali", "Marathi", "Tamil", "Telugu", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia", "Urdu"];

export const stateOptions = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab",
  "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const communityCategories = ["Career", "Exam Prep", "Study Group", "Technology", "Entrepreneurship", "Communication", "Science", "Professional"];

/** A community's (or a people search's) combination of dimensions. */
export type Combination = {
  roles: string[];
  classes: string[];
  subjects: string[];
  interests: string[];
  careerInterests: string[];
  states: string[];
  languages: string[];
};

export const emptyCombination: Combination = {
  roles: [], classes: [], subjects: [], interests: [], careerInterests: [], states: [], languages: [],
};

export const combinationFields: { key: keyof Combination; label: string; options: readonly string[] }[] = [
  { key: "roles", label: "Who", options: roleOptions },
  { key: "classes", label: "Class / stage", options: classOptions },
  { key: "subjects", label: "Subjects", options: subjectOptions },
  { key: "interests", label: "Interests", options: interestOptions },
  { key: "careerInterests", label: "Career interests", options: careerInterestOptions },
  { key: "states", label: "State", options: stateOptions },
  { key: "languages", label: "Languages", options: languageOptions },
];
