import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { tests } from "@/lib/tests";

const columns = [
  {
    heading: "Tests",
    links: tests.slice(0, 5).map((t) => ({
      href: `/tests/${t.slug}`,
      label: t.name,
    })),
  },
  {
    heading: "Explore",
    links: [
      { href: "/personality-types", label: "The 16 Types" },
      { href: "/personality-types#enneagram", label: "Enneagram Types" },
      { href: "/articles", label: "Articles" },
      { href: "/tests", label: "All Tests" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about#science", label: "Our Approach" },
      { href: "/teams", label: "For Teams" },
      { href: "/about#faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 text-brand-400" />
              <span className="text-lg font-bold tracking-tight text-white">
                Career<span className="text-brand-400">Garage</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200/80">
              Free, thoughtful personality and career assessments that help you
              understand yourself — and build a life that fits.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-300">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-brand-100/80 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-800 pt-6 text-xs text-brand-200/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Career Garage. All rights reserved.</p>
          <p>
            Assessments are for personal insight and education — not clinical
            diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
}
