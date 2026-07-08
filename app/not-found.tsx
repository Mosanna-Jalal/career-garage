import Link from "next/link";
import { ArrowRightIcon, CompassIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-gradient-to-b from-brand-50 to-white px-4 py-24">
      <div className="text-center">
        <span className="inline-flex animate-float rounded-3xl bg-brand-100 p-6 text-brand-700">
          <CompassIcon className="h-14 w-14" />
        </span>
        <p className="mt-6 font-mono text-sm font-bold uppercase tracking-widest text-brand-600">
          404 — Page not found
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Well, this page failed its assessment
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink/60">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white transition hover:bg-brand-700"
          >
            Back home <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Browse tests
          </Link>
        </div>
      </div>
    </section>
  );
}
