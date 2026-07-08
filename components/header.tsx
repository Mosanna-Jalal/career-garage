"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  CloseIcon,
  Icon,
  LogoMark,
  MenuIcon,
} from "@/components/icons";
import { tests } from "@/lib/tests";

const typeLinks = [
  { href: "/personality-types", label: "The 16 Personality Types" },
  { href: "/personality-types#enneagram", label: "The 9 Enneagram Types" },
  { href: "/tests/personality-type", label: "Which Type Are You?" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8 text-brand-600" />
          <span className="text-lg font-bold tracking-tight text-ink">
            Career<span className="text-brand-600">Garage</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50 hover:text-brand-700">
              Personality Tests
              <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full w-80 translate-y-1 rounded-2xl border border-brand-100 bg-white p-2 opacity-0 shadow-xl shadow-brand-900/5 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {tests.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tests/${t.slug}`}
                  className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-50"
                >
                  <span className={`mt-0.5 rounded-lg p-1.5 ${t.tint}`}>
                    <Icon name={t.icon} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-xs text-ink/60">
                      {t.minutes} min · Free
                    </span>
                  </span>
                </Link>
              ))}
              <Link
                href="/tests"
                className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50"
              >
                View all tests →
              </Link>
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50 hover:text-brand-700">
              Personality Types
              <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full w-72 translate-y-1 rounded-2xl border border-brand-100 bg-white p-2 opacity-0 shadow-xl shadow-brand-900/5 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {typeLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-brand-50 hover:text-brand-700"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/articles"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50 hover:text-brand-700"
          >
            Articles
          </Link>
          <Link
            href="/teams"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50 hover:text-brand-700"
          >
            For Teams
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50 hover:text-brand-700"
          >
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/tests/personality-type"
            className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
          >
            Take the Test
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-ink hover:bg-brand-50 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-brand-100 bg-white px-4 pb-6 pt-3 lg:hidden">
          <p className="px-2 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-ink/40">
            Personality Tests
          </p>
          {tests.map((t) => (
            <Link
              key={t.slug}
              href={`/tests/${t.slug}`}
              className="block rounded-lg px-2 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50"
            >
              {t.name}
            </Link>
          ))}
          <p className="px-2 pb-1 pt-4 text-xs font-bold uppercase tracking-wider text-ink/40">
            Explore
          </p>
          {[
            { href: "/personality-types", label: "Personality Types" },
            { href: "/articles", label: "Articles" },
            { href: "/teams", label: "For Teams" },
            { href: "/about", label: "About" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-lg px-2 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/tests/personality-type"
            className="mt-4 block rounded-full bg-accent-500 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Take the Test
          </Link>
        </nav>
      )}
    </header>
  );
}
