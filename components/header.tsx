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
import {
  aboutLinks,
  assessmentLinks,
  audienceLinks,
  legalLinks,
  programmeLinks,
  registerRoles,
  roadMapLinks,
  type NavLink,
} from "@/lib/site";

type MenuLink = NavLink & { available?: boolean };

type Menu = {
  label: string;
  width: string;
  cols?: number;
  /** menus near the right edge open leftward so they stay in the viewport */
  align?: "left" | "right";
  groups: { heading?: string; links: MenuLink[] }[];
};

/** Order and labels follow the client's navigation note. */
const menus: Menu[] = [
  {
    label: "Students & Parents",
    width: "w-[22rem]",
    groups: [{ links: audienceLinks }],
  },
  {
    label: "Organisation / Institutions",
    width: "w-[24rem]",
    groups: [{ links: programmeLinks }],
  },
  {
    label: "Career Road Map",
    width: "w-[24rem]",
    groups: [{ links: roadMapLinks }],
  },
  {
    label: "Psychometric Assessment",
    width: "w-[34rem]",
    cols: 2,
    align: "right",
    groups: [{ links: assessmentLinks }],
  },
  {
    label: "About",
    width: "w-[30rem]",
    cols: 2,
    align: "right",
    groups: [
      { heading: "Company", links: aboutLinks },
      { heading: "Policies", links: legalLinks },
    ],
  },
  {
    label: "Login / Sign Up",
    width: "w-[24rem]",
    align: "right",
    groups: [{ links: registerRoles }],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark className="h-8 w-8 text-brand-600" />
          <span className="text-lg font-bold tracking-tight text-ink">
            Career<span className="text-brand-600">Garage</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {menus.map((menu) => (
            <div key={menu.label} className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50 hover:text-brand-700">
                {menu.label}
                <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div
                className={`invisible absolute top-full ${
                  menu.align === "right" ? "right-0" : "left-0"
                } ${menu.width} max-w-[calc(100vw-2rem)] translate-y-1 rounded-2xl border border-brand-100 bg-white p-2 opacity-0 shadow-xl shadow-brand-900/5 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}
              >
                <div
                  className={
                    menu.groups.length > 1 ? "grid grid-cols-2 gap-1" : ""
                  }
                >
                  {menu.groups.map((group, gi) => (
                    <div key={group.heading ?? gi}>
                      {group.heading && (
                        <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-ink/40">
                          {group.heading}
                        </p>
                      )}
                      <div
                        className={
                          menu.cols === 2 && menu.groups.length === 1
                            ? "grid grid-cols-2 gap-x-1"
                            : ""
                        }
                      >
                        {group.links.map((l) =>
                          l.available === false ? (
                            <span
                              key={l.href}
                              className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/35"
                              title="Not yet available"
                            >
                              {l.label}
                              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink/40">
                                Soon
                              </span>
                            </span>
                          ) : (
                            <Link
                              key={l.href}
                              href={l.href}
                              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-50"
                            >
                              {l.icon && (
                                <span className="mt-0.5 rounded-lg bg-brand-50 p-1.5 text-brand-600">
                                  <Icon name={l.icon} className="h-4 w-4" />
                                </span>
                              )}
                              <span>
                                <span className="block text-sm font-semibold text-ink">
                                  {l.label}
                                </span>
                                {l.blurb && (
                                  <span className="block text-xs text-ink/60">
                                    {l.blurb}
                                  </span>
                                )}
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link
            href="/register"
            className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
          >
            Sign up free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-ink hover:bg-brand-50 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-brand-100 bg-white px-4 pb-8 pt-3 xl:hidden">
          {menus.map((menu) => (
            <div key={menu.label}>
              <p className="px-2 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-ink/40">
                {menu.label}
              </p>
              {menu.groups
                .flatMap((g) => g.links)
                .map((l) =>
                  l.available === false ? (
                    <span
                      key={l.href}
                      className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-ink/35"
                    >
                      {l.label}
                      <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-bold uppercase text-ink/40">
                        Soon
                      </span>
                    </span>
                  ) : (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-ink/80 hover:bg-brand-50"
                    >
                      {l.label}
                    </Link>
                  )
                )}
            </div>
          ))}
          <Link
            href="/register"
            className="mt-5 block rounded-full bg-accent-500 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Sign up free
          </Link>
        </nav>
      )}
    </header>
  );
}
