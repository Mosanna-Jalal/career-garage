"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { libraryMarkup } from "./markup";
import { mountCareerLibrary } from "./library-app";
import "./library.css";

/**
 * The Career Garage Career Library (from site Contents/Career Library).
 * The markup is server-rendered; the original script is then mounted inside
 * it. On cleanup the host is swapped for an untouched copy, so a remount
 * (React Strict Mode, fast refresh) never binds listeners twice.
 */
export function CareerLibrary() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const host = ref.current?.querySelector<HTMLElement>(".cg-library-host");
    if (!host) return;
    const pristine = host.cloneNode(true);
    const stop = mountCareerLibrary(host, { onAssessment: () => router.push("/tests") });
    return () => {
      stop();
      host.replaceWith(pristine);
    };
  }, [router]);

  return (
    <div
      ref={ref}
      className="cg-library"
      dangerouslySetInnerHTML={{ __html: `<div class="cg-library-host">${libraryMarkup}</div>` }}
    />
  );
}
