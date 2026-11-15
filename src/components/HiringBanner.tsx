import { hiring, siteInfo } from "@/lib/content";
import { DiamondBullet } from "./Fretwork";
import Reveal from "./Reveal";

export default function HiringBanner() {
  return (
    <section id="careers" className="bg-molave py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="border-[8px] border-molave-raised bg-capiz p-7 sm:border-[12px] sm:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-dim">
                We&apos;re Hiring
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-iron sm:text-3xl">
                {hiring.role}
              </h2>
              <p className="mt-3 text-sm text-iron/75">{hiring.intro}</p>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold text-iron">
                Qualifications
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {hiring.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm text-iron/80">
                    <DiamondBullet className="mt-1.5 shrink-0 text-ember" />
                    {q}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-iron/10 pt-5 text-sm text-iron/70">
                {hiring.cta}
              </p>
              <a
                href={`mailto:${siteInfo.email}?subject=${encodeURIComponent(
                  "Application: " + hiring.role
                )}`}
                className="mt-4 inline-flex items-center gap-2 border border-ember bg-ember px-6 py-3 font-display text-sm font-bold text-molave-deep transition-colors hover:bg-ember-light"
              >
                Apply Now
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
