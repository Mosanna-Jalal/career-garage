import Link from "next/link";
import { LogoMark } from "@/components/icons";
import {
  audienceLinks,
  legalLinks,
  programmeLinks,
  roadMapLinks,
} from "@/lib/site";

const columns = [
  {
    heading: "Students & Parents",
    links: audienceLinks.map((l) => ({ href: l.href, label: l.label })),
  },
  {
    heading: "Programmes",
    links: programmeLinks.map((l) => ({ href: l.href, label: l.label })),
  },
  {
    heading: "Career Road Map",
    links: roadMapLinks.slice(0, 4).map((l) => ({
      href: l.href,
      label: l.label,
    })),
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/tests", label: "Assessments" },
      { href: "/articles", label: "Articles" },
      { href: "/register", label: "Sign Up" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 text-brand-400" />
              <span className="text-lg font-bold tracking-tight text-white">
                Career<span className="text-brand-400">Garage</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200/80">
              An AI-powered career intelligence platform — assessments,
              mentorship, internships, scholarships and contests in one
              ecosystem.
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
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-brand-800 pt-6">
          {legalLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-brand-200/70 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs text-brand-200/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Career Garage. All rights reserved.</p>
          <p>
            Assessments are for personal insight and education — not clinical
            diagnosis.
          </p>
          <p>
            Designed &amp; developed by{" "}
            <a
              href="https://me-mj.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-300 transition hover:text-white"
            >
              MJ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
