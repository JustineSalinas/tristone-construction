"use client";

import { useState } from "react";
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
  const n = String(projects.length).padStart(2, "0");

  return (
    <>
      <div className="relative w-full bg-iron">

        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="sticky top-0 flex h-[100svh] min-h-[560px] w-full flex-col overflow-hidden bg-iron lg:flex-row"
            style={{ zIndex: i + 1 }}
          >
            {/* Text column */}
            <div className="relative flex w-full flex-1 flex-col justify-center gap-8 p-6 pt-[90px] sm:p-10 sm:pt-[96px] lg:w-1/2 lg:p-14 lg:pt-[70px]">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em]">
                <span className="text-ember-light">
                  {String(i + 1).padStart(2, "0")} / {n}
                </span>
                {project.status && (
                  <>
                    <span className="text-capiz-dim/40">&middot;</span>
                    <span className="text-capiz-dim/70">{project.status}</span>
                  </>
                )}
              </div>

              <div className="max-w-xl">
                <h3 className="font-display text-5xl font-medium uppercase leading-[0.95] text-capiz sm:text-7xl lg:text-8xl">
                  {project.name}
                </h3>

                <div className="mt-8 flex items-end gap-5">
                  <div className="flex gap-2.5">
                    {project.images.slice(0, 4).map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        aria-label={`Open ${project.name} photo ${idx + 1}`}
                        onClick={() => setModalIndex(i)}
                        className="relative h-14 w-20 cursor-pointer overflow-hidden rounded-sm ring-1 ring-capiz/20 transition hover:ring-ember/70 sm:h-16 sm:w-24"
                      >
                        <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalIndex(i)}
                    className="cursor-pointer whitespace-nowrap text-base font-medium text-capiz underline decoration-capiz/40 underline-offset-4 hover:decoration-ember"
                  >
                    See all photos
                  </button>
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
            <div className="relative flex w-full flex-1 items-center justify-center bg-molave-raised p-6 pt-[70px] sm:p-10 lg:w-1/2 lg:p-10">
              <div className="relative h-full max-h-[700px] w-full max-w-[720px]">
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
        onClose={() => setModalIndex(null)}
      />
    </>
  );
}
