import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { defaultControls, pickColor, type MemberDoc } from "@/lib/members";
import { emptyCombination, type Combination } from "@/lib/connect/options";
import type { CommunityDoc, MessageDoc } from "@/lib/connect/store";

/**
 * Demo content so Connect and the dashboards can be reviewed before real
 * sign-ups exist. Runs once per database; every document carries
 * `demo: true` so it can be removed in one query before launch:
 *   db.members.deleteMany({demo:true}); db.communities.deleteMany({demo:true}); db.messages.deleteMany({demo:true})
 */

const SEED_VERSION = 1;

type SeedMember = Omit<MemberDoc, "_id" | "createdAt" | "color" | "email" | "demo"> & { key: string };

const people: SeedMember[] = [
  { key: "aarav", name: "Aarav Sharma", role: "student", verified: false, profile: { className: "Class 12", subject: "Physics", school: "Delhi Public School", city: "New Delhi", state: "Delhi", interests: ["AI & Robotics", "Coding", "Competitive Exams"], skills: ["Problem solving", "Programming"], careerInterests: ["Technology", "Engineering"], languages: ["English", "Hindi"], goal: "Prepare for JEE and explore computer science" } },
  { key: "riya", name: "Riya Verma", role: "student", verified: false, profile: { className: "Class 12", subject: "Mathematics", school: "St. Xavier's High School", city: "Mumbai", state: "Maharashtra", interests: ["Competitive Exams", "Mathematics Olympiad", "Coding"], skills: ["Problem solving", "Teamwork"], careerInterests: ["Engineering", "Technology"], languages: ["English", "Marathi", "Hindi"], goal: "Engineering entrance and research" } },
  { key: "neha", name: "Neha Gupta", role: "student", verified: false, profile: { className: "Class 11", subject: "Biology", school: "Kendriya Vidyalaya", city: "Patna", state: "Bihar", interests: ["Medicine", "Science Olympiad", "Creative Writing"], skills: ["Research", "Writing"], careerInterests: ["Healthcare", "Science"], languages: ["Hindi", "English"], goal: "NEET and a career in medicine" } },
  { key: "ankit", name: "Ankit Rao", role: "student", verified: false, profile: { className: "Class 10", subject: "Mathematics", school: "National Public School", city: "Bengaluru", state: "Karnataka", interests: ["AI & Robotics", "Coding", "Space & Astronomy"], skills: ["Programming", "Design tools"], careerInterests: ["Technology", "Science"], languages: ["English", "Kannada"], goal: "Build robots for competitions" } },
  { key: "meera", name: "Dr. Meera Nair", role: "professor", verified: true, profile: { subject: "Physics", school: "IIT Delhi", city: "New Delhi", state: "Delhi", headline: "Professor of Physics", interests: ["Research", "Science Olympiad", "Space & Astronomy"], skills: ["Teaching", "Research"], careerInterests: ["Science", "Engineering"], languages: ["English", "Malayalam", "Hindi"], goal: "Mentor future physicists" } },
  { key: "arvind", name: "Mr. Arvind Kumar", role: "counsellor", verified: true, profile: { subject: "Career Guidance", school: "Career Garage", city: "Lucknow", state: "Uttar Pradesh", headline: "Career Counsellor · 15+ years", interests: ["Competitive Exams", "Scholarships", "Entrepreneurship"], skills: ["Counselling", "Public speaking"], careerInterests: ["Education", "Business"], languages: ["Hindi", "English"], goal: "Help students choose with evidence" } },
  { key: "priya", name: "Ms. Priya Iyer", role: "professional", verified: true, profile: { subject: "Data Science", school: "Microsoft", city: "Hyderabad", state: "Telangana", headline: "Data Scientist · AI & ML", interests: ["AI & Robotics", "Coding", "Finance & Investing"], skills: ["Data analysis", "Programming", "Leadership"], careerInterests: ["Technology", "Business"], languages: ["English", "Tamil"], goal: "Open doors into AI careers" } },
  { key: "rahul", name: "Mr. Rahul Singh", role: "teacher", verified: true, profile: { subject: "Mathematics", school: "Delhi Public School", city: "New Delhi", state: "Delhi", headline: "Mathematics Teacher · Olympiad coach", interests: ["Mathematics Olympiad", "Competitive Exams"], skills: ["Teaching", "Problem solving"], careerInterests: ["Education", "Science"], languages: ["Hindi", "English"], goal: "Grow a national maths community" } },
  { key: "sunita", name: "Mrs. Sunita Sharma", role: "parent", verified: false, profile: { city: "New Delhi", state: "Delhi", headline: "Parent of Aarav", interests: ["Scholarships", "Competitive Exams"], skills: [], careerInterests: ["Engineering"], languages: ["Hindi", "English"] } },
];

type SeedCommunity = { name: string; description: string; category: string; owner: string; joinMode: "open" | "request"; members: string[]; combination: Partial<Combination> };

const communities: SeedCommunity[] = [
  { name: "AI & Robotics Club", description: "Build, code and compete — from first Arduino projects to national robotics contests.", category: "Technology", owner: "priya", joinMode: "open", members: ["aarav", "ankit", "riya"], combination: { roles: ["student", "professional", "teacher"], classes: ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"], interests: ["AI & Robotics", "Coding"], careerInterests: ["Technology", "Engineering"] } },
  { name: "IIT Aspirants 2026", description: "Daily JEE practice, doubt-solving and revision plans with verified mentors.", category: "Exam Prep", owner: "rahul", joinMode: "request", members: ["aarav", "riya"], combination: { roles: ["student", "teacher"], classes: ["Class 11", "Class 12"], subjects: ["Physics", "Chemistry", "Mathematics"], interests: ["Competitive Exams"], careerInterests: ["Engineering"] } },
  { name: "Future Doctors Community", description: "NEET preparation, hospital shadowing stories and healthcare careers beyond MBBS.", category: "Career", owner: "arvind", joinMode: "open", members: ["neha"], combination: { roles: ["student", "counsellor", "professional"], classes: ["Class 11", "Class 12"], subjects: ["Biology", "Chemistry"], interests: ["Medicine"], careerInterests: ["Healthcare"] } },
  { name: "Young Entrepreneurs India", description: "Turn everyday problems into ventures: ideas, pitches, mentors and school-to-school collaboration.", category: "Entrepreneurship", owner: "arvind", joinMode: "open", members: ["ankit", "riya"], combination: { roles: ["student", "professional", "counsellor"], interests: ["Entrepreneurship", "Finance & Investing"], careerInterests: ["Business"] } },
  { name: "Maths Study Group", description: "Olympiad problems, proofs and peer explanations. Moderated by a verified teacher.", category: "Study Group", owner: "rahul", joinMode: "request", members: ["riya", "ankit"], combination: { roles: ["student", "teacher"], classes: ["Class 9", "Class 10", "Class 11", "Class 12"], subjects: ["Mathematics"], interests: ["Mathematics Olympiad"] } },
  { name: "Debate & Public Speaking", description: "Weekly motions, speech feedback and inter-school debate leagues.", category: "Communication", owner: "arvind", joinMode: "open", members: ["neha", "aarav"], combination: { roles: ["student", "teacher"], interests: ["Debate & Public Speaking", "Law & Policy"] } },
  { name: "Career Counsellors Network", description: "Professional community for counsellors and educators: tools, cases and assessment practice.", category: "Professional", owner: "arvind", joinMode: "request", members: ["rahul", "meera"], combination: { roles: ["counsellor", "teacher", "professor"], careerInterests: ["Education"] } },
];

export async function ensureSeed() {
  if (!process.env.MONGODB_URI) return;
  const db = await getDb();
  const meta = db.collection<{ _id: string; version: number; at: Date }>("meta");
  const res = await meta.updateOne(
    { _id: "connect-seed", version: { $gte: SEED_VERSION } },
    { $setOnInsert: { version: SEED_VERSION, at: new Date() } },
    { upsert: true }
  ).catch(() => null);
  if (!res || res.upsertedCount === 0) return; // already seeded (or another request is seeding)

  const ids: Record<string, ObjectId> = {};
  const now = Date.now();
  const members: MemberDoc[] = people.map((p, i) => {
    const _id = new ObjectId();
    ids[p.key] = _id;
    const { key, ...rest } = p;
    return {
      ...rest,
      _id,
      email: `demo.${key}@careergarage.demo`,
      color: pickColor(p.name),
      demo: true,
      controls: p.role === "student" ? { ...defaultControls } : undefined,
      createdAt: new Date(now - (people.length - i) * 86_400_000),
    };
  });
  members.find((m) => m.name === "Mrs. Sunita Sharma")!.childId = ids.aarav.toString();
  await db.collection<MemberDoc>("members").insertMany(members);

  const cIds: Record<string, ObjectId> = {};
  const docs: CommunityDoc[] = communities.map((c, i) => {
    const _id = new ObjectId();
    cIds[c.name] = _id;
    return {
      _id,
      name: c.name,
      description: c.description,
      category: c.category,
      ownerId: ids[c.owner].toString(),
      joinMode: c.joinMode,
      combination: { ...emptyCombination, ...c.combination },
      members: [...new Set([c.owner, ...c.members])].map((k) => ids[k].toString()),
      demo: true,
      createdAt: new Date(now - (10 - i) * 86_400_000),
    };
  });
  await db.collection<CommunityDoc>("communities").insertMany(docs);

  const at = (mins: number) => new Date(now - mins * 60_000);
  const q1 = new ObjectId();
  const q2 = new ObjectId();
  const msg = (channel: string, from: string, text: string, mins: number, extra: Partial<MessageDoc> = {}): MessageDoc => ({
    _id: new ObjectId(), channel, fromId: ids[from].toString(), text, kind: "message", helpful: [], createdAt: at(mins), demo: true, ...extra,
  });
  const c = (name: string) => `c:${cIds[name].toString()}`;
  await db.collection<MessageDoc>("messages").insertMany([
    msg(c("IIT Aspirants 2026"), "rahul", "Welcome! Post one doubt at a time and mark it as a question so others can answer.", 3000),
    { ...msg(c("IIT Aspirants 2026"), "aarav", "Can anyone explain why the capacitors in this combination are in series and not parallel?", 180), _id: q1, kind: "question" },
    msg(c("IIT Aspirants 2026"), "riya", "Look at the path the charge takes: if there's no junction between them, the same charge flows through both — that's series.", 150, { kind: "answer", parentId: q1.toString() }),
    msg(c("AI & Robotics Club"), "priya", "Mini-challenge this week: make a line-following robot with any kit you have. Share a 20-second video!", 900),
    msg(c("AI & Robotics Club"), "ankit", "I only have an Arduino Uno and two IR sensors. Is that enough?", 600),
    msg(c("AI & Robotics Club"), "priya", "Yes — that's exactly the classic setup. Start with one sensor and a simple threshold.", 560),
    { ...msg(c("Future Doctors Community"), "neha", "Which books should I use for NEET Biology besides NCERT?", 1500), _id: q2, kind: "question" },
    msg(c("Future Doctors Community"), "arvind", "Master NCERT line by line first; then add one question bank and previous-year papers. More books rarely means more marks.", 1300, { kind: "answer", parentId: q2.toString() }),
    msg(c("Maths Study Group"), "rahul", "Problem of the day: prove that the product of any four consecutive integers plus one is a perfect square.", 400),
  ]);
}
