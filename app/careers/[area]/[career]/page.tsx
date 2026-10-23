import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { DoodleField } from "@/components/doodles";
import { FamilyArt } from "@/components/family-art";
import { Reveal } from "@/components/reveal";
import { getAssessment } from "@/lib/assessments/catalog";
import { career, careerByName, families, libraryNote, slugify } from "@/lib/careers570";

export async function generateMetadata(props: PageProps<"/careers/[area]/[career]">): Promise<Metadata> {
  const { career: slug } = await props.params;
  const c = career(slug);
  return c ? { title: `${c.name} — courses, exams & career guide`, description: c.summary.slice(0, 160) } : {};
}

/** The library's six "assessment match dimensions" → the Career Garage assessment that evidences each. */
const matchToAssessment: Record<string, string> = {
  "Interest fit": "riasec",
  "Aptitude/academic readiness": "cognitive-aptitude",
  "Work-style preference": "disc",
  "Values fit": "work-values",
  "Skill readiness": "career-readiness",
  "Learning commitment": "learning-preferences",
};

function Panel({ title, icon, children, className = "" }: { title: string; icon: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-brand-100 bg-white p-6 shadow-sm ${className}`}>
      <h2 className="text-lg font-extrabold text-ink">
        <span className="mr-2">{icon}</span>
        {title}
      </h2>
      <div className="mt-4 text-sm leading-relaxed text-ink/75">{children}</div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5">
    {items.map((x) => (
      <li key={x} className="flex gap-2">
        <span className="text-brand-500">•</span>
        {x}
      </li>
    ))}
  </ul>
);

export default async function CareerPage(props: PageProps<"/careers/[area]/[career]">) {
  const { area: areaSlug, career: slug } = await props.params;
  const c = career(slug);
  if (!c || slugify(c.category) !== areaSlug) notFound();
  const fam = families[c.meta_family] ?? families.vocational;

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${fam.color}14, #fff)` }}>
        <DoodleField variant="hero" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <nav className="text-sm text-ink/50">
              <Link href="/careers" className="hover:text-brand-600">Interest areas</Link> /{" "}
              <Link href={`/careers/${areaSlug}`} className="hover:text-brand-600">{c.category}</Link>
            </nav>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{c.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">{c.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
              {[
                ["Outlook", c.future_outlook],
                ["Demand", c.demand],
                ["Competition", c.competition],
                ["Remote", c.remote_potential],
                ["Stream", c.recommended_stream],
              ].map(([k, v]) => (
                <span key={k} className="rounded-full border border-brand-100 bg-white px-3 py-1.5 text-ink/70">
                  {k}: <span className="text-ink">{v}</span>
                </span>
              ))}
            </div>
          </div>
          <FamilyArt family={c.meta_family} color={fam.color} className="mx-auto w-full max-w-sm drop-shadow-xl" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-24 sm:px-6">
        <Reveal className="grid gap-6 lg:grid-cols-2">
          <Panel title="What you do" icon="🛠">
            <List items={c.what_you_do} />
          </Panel>
          <Panel title="A day in the life" icon="☀️">
            <List items={c.day_in_life} />
          </Panel>
        </Reveal>

        <Reveal>
          <Panel title="Pathway" icon="🧭">
            <ol className="grid gap-3 md:grid-cols-5">
              {c.career_path.map((s, i) => (
                <li key={s.stage} className="relative rounded-2xl bg-brand-50/60 p-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>
                  <p className="mt-2 font-bold text-ink">{s.stage}</p>
                  <p className="mt-1 text-xs text-ink/65">{s.detail}</p>
                </li>
              ))}
            </ol>
            <h3 className="mt-6 font-bold text-ink">Other routes in</h3>
            <div className="mt-2">
              <List items={c.alternate_routes} />
            </div>
          </Panel>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-3">
          <Panel title="Courses" icon="🎓" className="lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/45">Undergraduate</p>
                <div className="mt-2"><List items={c.ug_courses} /></div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/45">Postgraduate</p>
                <div className="mt-2"><List items={c.pg_courses} /></div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/45">Certifications</p>
                <div className="mt-2"><List items={c.certifications} /></div>
              </div>
            </div>
            <p className="mt-5 rounded-2xl bg-cream p-3 text-xs">{c.eligibility}</p>
          </Panel>
          <Panel title="Entrance exams" icon="📝">
            <div className="flex flex-wrap gap-2">
              {c.entrance_exams.map((x) => (
                <span key={x} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">{x}</span>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink/45">Subjects that matter</p>
            <ul className="mt-2 space-y-1">
              {Object.entries(c.subject_importance).map(([k, v]) => (
                <li key={k} className="flex justify-between"><span>{k}</span><span className="font-semibold text-ink">{v}</span></li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-2">
          <Panel title="Counselling notes" icon="💬">
            <p className="font-bold text-emerald-700">This may suit you if…</p>
            <div className="mt-2"><List items={c.who_should_choose} /></div>
            <p className="mt-5 font-bold text-accent-700">Think carefully if…</p>
            <div className="mt-2"><List items={c.who_should_think_carefully} /></div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink/45">Mentors worth talking to</p>
            <div className="mt-2"><List items={c.mentor_types} /></div>
          </Panel>
          <Panel title="Check your fit with Career Garage assessments" icon="🧩">
            <ul className="space-y-2">
              {c.assessment_match_dimensions.map((d) => {
                const a = getAssessment(matchToAssessment[d] ?? "");
                return (
                  <li key={d}>
                    {a ? (
                      <Link href={`/tests/${a.slug}/take`} className="flex items-center gap-3 rounded-2xl p-2 hover:bg-brand-50">
                        <span className={`rounded-xl p-2 ${a.tint}`}><Icon name={a.icon} className="h-4 w-4" /></span>
                        <span className="flex-1"><span className="block font-semibold text-ink">{d}</span><span className="text-xs text-ink/50">{a.name} demo</span></span>
                        <span className="text-xs font-bold text-brand-600">Try →</span>
                      </Link>
                    ) : (
                      <span className="block p-2">{d}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-ink/50">RIASEC tendency: {c.riasec}</p>
          </Panel>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-3">
          <Panel title="Skills" icon="⚡">
            <p className="text-xs font-bold uppercase tracking-wider text-ink/45">Technical</p>
            <div className="mt-2"><List items={c.technical_skills} /></div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink/45">Soft skills</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{c.soft_skills.map((s) => <span key={s} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs">{s}</span>)}</div>
          </Panel>
          <Panel title="Pay & cost (India)" icon="₹">
            <dl className="space-y-2">
              {[
                ["Early career", c.salary_india.early_career],
                ["Mid career", c.salary_india.mid_career],
                ["Senior", c.salary_india.senior],
                ["Education (India)", c.education_cost_india],
                ["Education (abroad)", c.education_cost_abroad],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3"><dt className="text-ink/55">{k}</dt><dd className="text-right font-semibold text-ink">{v}</dd></div>
              ))}
            </dl>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink/45">Scholarship routes</p>
            <div className="mt-2"><List items={c.scholarship_routes} /></div>
          </Panel>
          <Panel title="Pros & cons" icon="⚖️">
            <List items={c.pros.map((p) => `✓ ${p}`)} />
            <div className="mt-3"><List items={c.cons.map((p) => `✕ ${p}`)} /></div>
          </Panel>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-2">
          <Panel title="Where to study" icon="🏛">
            <p className="text-xs font-bold uppercase tracking-wider text-ink/45">India (representative)</p>
            <div className="mt-2"><List items={c.representative_india_institutes} /></div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink/45">Abroad (representative)</p>
            <div className="mt-2"><List items={c.representative_abroad_institutes} /></div>
          </Panel>
          <Panel title={`AI impact · ${c.ai_impact_label}`} icon="🤖">
            <p>{c.ai_impact}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink/45">Get experience</p>
            <div className="mt-2"><List items={[...c.internship_ideas, ...c.training_ideas].slice(0, 6)} /></div>
          </Panel>
        </Reveal>

        <Reveal>
          <Panel title="Frequently asked" icon="❓">
            <div className="space-y-2">
              {c.faqs.map((f) => (
                <details key={f.q} className="rounded-2xl bg-brand-50/50 px-4 py-3">
                  <summary className="cursor-pointer font-semibold text-ink">{f.q}</summary>
                  <p className="mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </Panel>
        </Reveal>

        <Reveal>
          <h2 className="text-lg font-extrabold text-ink">Related careers</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.related_careers.map((r) => {
              const rc = careerByName(r);
              return rc ? (
                <Link key={r} href={`/careers/${slugify(rc.category)}/${rc.slug}`} className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">{r}</Link>
              ) : (
                <span key={r} className="rounded-full bg-ink/5 px-4 py-2 text-sm text-ink/60">{r}</span>
              );
            })}
          </div>
          <p className="mt-8 text-xs text-ink/45">
            {libraryNote()} Last editorial review: {c.last_editorial_review}.
          </p>
        </Reveal>
      </div>
    </>
  );
}
