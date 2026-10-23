"use client";

import { useState } from "react";

/** Initials avatar with a verified tick for checked professionals. */
export function Avatar({
  name,
  color,
  verified,
  size = "h-10 w-10 text-sm",
}: {
  name: string;
  color: string;
  verified?: boolean;
  size?: string;
}) {
  const initials = name
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span className="relative inline-flex shrink-0">
      <span className={`flex items-center justify-center rounded-full font-bold text-white ${size}`} style={{ background: color }}>
        {initials}
      </span>
      {verified && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[8px] text-white" title="Verified">
          ✓
        </span>
      )}
    </span>
  );
}

/** Multi-select chips; collapses long lists behind "show all". */
export function ChipPicker({
  options,
  value,
  onChange,
  max,
  limit = 14,
}: {
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  max?: number;
  limit?: number;
}) {
  const [all, setAll] = useState(false);
  const shown = all ? options : options.slice(0, limit);
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(on ? value.filter((x) => x !== o) : max && value.length >= max ? value : [...value, o])}
            className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize transition ${
              on ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-ink/70 hover:border-brand-300"
            }`}
          >
            {o}
          </button>
        );
      })}
      {options.length > limit && (
        <button type="button" onClick={() => setAll(!all)} className="px-2 text-xs font-semibold text-brand-600">
          {all ? "Show fewer" : `+${options.length - limit} more`}
        </button>
      )}
    </div>
  );
}

export const roleNames: Record<string, string> = {
  student: "Student",
  parent: "Parent",
  teacher: "Teacher",
  professor: "Professor",
  counsellor: "Counsellor",
  professional: "Professional",
};

export async function postJson<T = Record<string, unknown>>(url: string, body: unknown, method = "POST"): Promise<T> {
  const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Something went wrong");
  return data as T;
}
