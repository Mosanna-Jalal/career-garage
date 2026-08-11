import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckIcon, ShieldIcon, SparkIcon } from "@/components/icons";
import { getRoleForm, roleForms, type Field } from "@/lib/registration";
import { registerRoles } from "@/lib/site";

export function generateStaticParams() {
  return roleForms.map((r) => ({ role: r.slug }));
}

export async function generateMetadata(
  props: PageProps<"/register/[role]">
): Promise<Metadata> {
  const { role } = await props.params;
  const form = getRoleForm(role);
  if (!form) return {};
  return { title: `${form.label} registration`, description: form.intro };
}

function norm(field: Field) {
  return typeof field === "string" ? { label: field } : field;
}

function FieldRow({ field }: { field: Field }) {
  const f = norm(field);
  const base =
    "w-full rounded-xl border border-brand-100 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200";

  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink/80">
        {f.label}
        {f.required && <span className="text-accent-500">*</span>}
        {f.sensitive && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
            <ShieldIcon className="h-3 w-3" />
            Sensitive
          </span>
        )}
      </span>

      {f.type === "textarea" ? (
        <textarea rows={4} className={base} disabled />
      ) : f.type === "select" ? (
        <select className={base} disabled defaultValue="">
          <option value="">Select…</option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : f.type === "file" ? (
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-brand-200 bg-cream/50 px-3.5 py-3 text-sm text-ink/50">
          Upload a file
        </div>
      ) : (
        <input type={f.type ?? "text"} className={base} disabled />
      )}
    </label>
  );
}

/** Long option lists read better as selectable chips than as inputs. */
function ChipGroup({ fields }: { fields: Field[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {fields.map((field) => {
        const f = norm(field);
        return (
          <span
            key={f.label}
            className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-2 text-sm text-ink/75 shadow-sm"
          >
            <span className="h-3.5 w-3.5 rounded border border-brand-300" />
            {f.label}
          </span>
        );
      })}
    </div>
  );
}

export default async function RoleRegisterPage(
  props: PageProps<"/register/[role]">
) {
  const { role } = await props.params;
  const form = getRoleForm(role);
  if (!form) notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-brand-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            <SparkIcon className="h-3.5 w-3.5 text-accent-500" />
            {form.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {form.label}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
            {form.intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {registerRoles.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  r.href === `/register/${form.slug}`
                    ? "bg-brand-600 text-white"
                    : "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
                }`}
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Honest status banner — these forms are structure only. */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <p className="text-sm leading-relaxed text-amber-900">
            <strong>Preview only — nothing is submitted or stored.</strong> This
            page shows the field structure from the specification so it can be
            reviewed. Fields marked <em>Sensitive</em> (government ID, banking
            details) and any information about minors must not be collected
            until the backend, consent handling and verification workflow are
            built.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {form.flows.map((flow) => (
          <section key={flow.name} className="mb-16">
            {form.flows.length > 1 && (
              <h2 className="mb-8 border-b border-brand-100 pb-3 text-2xl font-extrabold tracking-tight text-brand-700">
                {flow.name}
              </h2>
            )}

            <div className="space-y-10">
              {flow.groups.map((group) => {
                // Groups that are really multi-select checklists
                const isChecklist =
                  group.fields.length > 8 &&
                  group.fields.every((f) => typeof f === "string");

                return (
                  <div
                    key={group.heading}
                    className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <h3 className="text-lg font-bold text-ink">
                      {group.heading}
                    </h3>
                    {group.note && (
                      <p className="mt-1.5 text-sm text-ink/55">{group.note}</p>
                    )}

                    <div className="mt-6">
                      {isChecklist ? (
                        <ChipGroup fields={group.fields} />
                      ) : (
                        <div className="grid gap-5 sm:grid-cols-2">
                          {group.fields.map((field) => (
                            <FieldRow key={norm(field).label} field={field} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Consents */}
        <section className="rounded-3xl border border-brand-100 bg-cream/60 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-ink">Consent & Agreements</h3>
          <ul className="mt-5 space-y-3">
            {form.consents.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border border-brand-300 bg-white">
                  <CheckIcon className="h-3 w-3 text-brand-300" />
                </span>
                <span className="text-sm leading-relaxed text-ink/75">{c}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-ink/50">
            See the{" "}
            <Link
              href="/legal/privacy"
              className="font-semibold text-brand-600 hover:underline"
            >
              Privacy Policy
            </Link>
            ,{" "}
            <Link
              href="/legal/terms"
              className="font-semibold text-brand-600 hover:underline"
            >
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/code-of-conduct"
              className="font-semibold text-brand-600 hover:underline"
            >
              Code of Conduct
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
