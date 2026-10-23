"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/connect/ui";

type Me = { name: string; role: string; color: string } | null;

/** Header account control: avatar menu when signed in, otherwise sign-in links. */
export function AccountMenu({ mobile = false }: { mobile?: boolean }) {
  const [me, setMe] = useState<Me | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    let live = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => live && setMe(d.member ?? null))
      .catch(() => live && setMe(null));
    return () => {
      live = false;
    };
  }, [pathname]);

  const signOut = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    window.location.href = "/";
  };

  const links = [
    { href: "/dashboard", label: "My dashboard" },
    { href: "/connect", label: "Career Garage Connect" },
    { href: "/points", label: "Career Points" },
  ];

  if (mobile) {
    return me ? (
      <div className="mt-5 space-y-1 border-t border-brand-100 pt-4">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="block rounded-lg px-2 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            {l.label}
          </Link>
        ))}
        <button onClick={signOut} className="block px-2 py-2 text-sm text-ink/60">
          Sign out ({me.name})
        </button>
      </div>
    ) : (
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link href="/login" className="rounded-full border-2 border-brand-200 py-3 text-center text-sm font-semibold text-brand-700">
          Log in
        </Link>
        <Link href="/signup" className="rounded-full bg-accent-500 py-3 text-center text-sm font-semibold text-white">
          Sign up free
        </Link>
      </div>
    );
  }

  if (me === undefined) return <span className="h-10 w-32" />;
  if (!me) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="rounded-full px-4 py-2.5 text-sm font-semibold text-ink/75 hover:bg-brand-50 hover:text-brand-700">
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
        >
          Sign up free
        </Link>
      </div>
    );
  }
  return (
    <div className="group relative">
      <button className="flex items-center gap-2 rounded-full border border-brand-100 bg-white py-1 pl-1 pr-4 text-sm font-semibold text-ink hover:border-brand-300">
        <Avatar name={me.name} color={me.color} size="h-8 w-8 text-xs" />
        {me.name.split(" ").slice(0, 2).join(" ")}
      </button>
      <div className="invisible absolute right-0 top-full w-56 translate-y-1 rounded-2xl border border-brand-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/80 hover:bg-brand-50">
            {l.label}
          </Link>
        ))}
        <button onClick={signOut} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm text-ink/55 hover:bg-brand-50">
          Sign out
        </button>
      </div>
    </div>
  );
}
