import { hiring, siteInfo } from "@/lib/content";
import Reveal from "./Reveal";

export default function HiringBanner() {
  return (
    <section id="careers" className="bg-iron py-16 sm:py-20">
      <Reveal className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-light">
              We&apos;re Hiring
            </p>
            <h2 className="mt-3 font-display text-5xl font-medium uppercase leading-[0.95] tracking-[-0.02em] text-capiz sm:text-6xl">
              {hiring.role}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-capiz-dim/80 sm:text-base">
              {hiring.intro}
            </p>
          </div>

          <a
            href={`mailto:${siteInfo.email}?subject=${encodeURIComponent(
              "Application: " + hiring.role
            )}`}
            className="inline-flex w-fit shrink-0 items-center gap-2 bg-ember px-8 py-4 font-display text-sm font-bold text-white shadow-[0_15px_35px_-10px_rgba(217,83,31,0.5)] transition-colors hover:bg-ember-light"
          >
            Apply Now
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-3 gap-y-2.5 border-t border-capiz/10 pt-8">
          {hiring.qualifications.map((q) => (
            <span
              key={q}
              className="cursor-default rounded-full border border-capiz/15 px-4 py-2 text-sm text-capiz-dim/85 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-ember/60 hover:text-capiz hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.4)]"
            >
              {q}
            </span>
          ))}
        </div>

        <p className="mt-6 text-sm text-capiz-dim/60">{hiring.cta}</p>
      </Reveal>
    </section>
  );
}
