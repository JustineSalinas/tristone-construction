"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";
import type { ShowcaseProject } from "./project-types";

export default function ProjectSlider({
  projects,
  sectionLabel,
}: {
  projects: ShowcaseProject[];
  sectionLabel: string;
}) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalStartAtVideo, setModalStartAtVideo] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(() => projects.map((_, i) => i === 0));
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const n = String(projects.length).padStart(2, "0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.55) return;
          const idx = panelRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx === -1) return;
          setRevealed((prev) => (prev[idx] ? prev : prev.map((v, i) => (i === idx ? true : v))));
        });
      },
      { threshold: [0, 0.55, 1] }
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [projects.length]);

  return (
    <>
      <div className="relative w-full bg-iron">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="sticky top-0 flex h-[100svh] min-h-[560px] w-full flex-col overflow-hidden bg-iron lg:flex-row"
            style={{ zIndex: i + 1 }}
          >
            {/* Text column */}
            <div className="relative flex w-full min-h-0 flex-1 flex-col justify-center gap-4 overflow-y-auto p-5 pb-16 pt-20 sm:gap-6 sm:p-10 sm:pb-20 sm:pt-24 lg:w-1/2 lg:gap-8 lg:p-14 lg:pb-14 lg:pt-[70px]">
              <div
                className={`flex items-center gap-4 transition-all duration-700 ease-out ${
                  revealed[i] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <span className="font-display text-2xl font-medium text-ember-light sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-6 w-px bg-capiz/20 sm:h-8" />
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-capiz-dim/60">
                  <div>of {n} builds</div>
                  {project.status && <div className="mt-0.5 text-ember-light/80">{project.status}</div>}
                </div>
              </div>

              <div className="max-w-xl">
                <h3
                  className={`font-display text-3xl font-medium uppercase leading-[0.95] text-capiz transition-all delay-100 duration-700 ease-out sm:text-6xl lg:text-7xl xl:text-8xl ${
                    revealed[i] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  {project.name}
                </h3>

                {project.stats && (
                  <div
                    className={`mt-3 flex flex-wrap gap-x-5 gap-y-1 transition-all delay-150 duration-700 ease-out sm:mt-5 sm:gap-x-6 ${
                      revealed[i] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                  >
                    {project.stats.slice(0, 3).map((stat) => (
                      <div key={stat.label}>
                        <span className="font-display text-sm font-bold text-capiz sm:text-lg">
                          {stat.value}
                        </span>
                        <span className="ml-1 text-[11px] uppercase tracking-wide text-capiz-dim/50 sm:ml-1.5 sm:text-xs">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`mt-5 flex flex-col gap-3.5 transition-all delay-200 duration-700 ease-out sm:mt-8 ${
                    revealed[i] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  {/* Thumbnail strip */}
                  <div className="no-scrollbar flex max-w-full gap-2.5 overflow-x-auto pb-1">
                    {project.images.slice(0, 4).map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        aria-label={`Open ${project.name} photo ${idx + 1}`}
                        onClick={() => {
                          setModalStartAtVideo(false);
                          setModalIndex(i);
                        }}
                        className="relative h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-sm ring-1 ring-capiz/20 transition hover:ring-ember/70 sm:h-16 sm:w-24"
                      >
                        <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Actions row: Walk around it affordance + See all photos */}
                  <div className="flex flex-wrap items-center gap-4">
                    {project.video && (
                      <button
                        type="button"
                        onClick={() => {
                          setModalStartAtVideo(true);
                          setModalIndex(i);
                        }}
                        className="group inline-flex cursor-pointer items-center gap-2.5 rounded-sm border border-ember/70 bg-iron/50 px-3.5 py-2 text-xs font-semibold tracking-wide text-capiz transition-all hover:border-ember hover:bg-ember/15"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-[2px] bg-ember text-iron transition-transform group-hover:scale-105">
                          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                        <span>Walk around it</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setModalStartAtVideo(false);
                        setModalIndex(i);
                      }}
                      className="cursor-pointer whitespace-nowrap text-xs font-medium text-capiz underline decoration-capiz/40 underline-offset-4 hover:decoration-ember sm:text-sm"
                    >
                      See all photos
                    </button>
                  </div>
                </div>
              </div>

              {projects.length > 1 && (
                <div className="hidden gap-4 text-sm font-semibold text-capiz-dim/40 lg:flex">
                  {projects.map((p, idx) => (
                    <span key={p.slug} className={idx === i ? "text-ember" : undefined}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Image column: the house, capped near its native resolution so it never stretches/blurs */}
            <div className="relative flex w-full min-h-0 flex-1 items-center justify-center overflow-hidden bg-molave-raised p-6 pt-[70px] sm:p-10 lg:w-1/2 lg:p-10">
              <div
                className={`relative h-full max-h-[700px] w-full max-w-[720px] transition-all duration-[900ms] ease-out ${
                  revealed[i] ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              >
                <Image
                  src={project.cover}
                  alt={project.name}
                  fill
                  priority={i === 0}
                  quality={100}
                  sizes="(max-width: 1024px) 90vw, 720px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={modalIndex !== null ? projects[modalIndex] : null}
        sectionLabel={sectionLabel}
        startAtVideo={modalStartAtVideo}
        onClose={() => {
          setModalIndex(null);
          setModalStartAtVideo(false);
        }}
      />
    </>
  );
}
