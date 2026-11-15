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
  const [active, setActive] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const n = String(projects.length).padStart(2, "0");

  return (
    <>
      <div className="relative h-[85svh] min-h-[560px] w-full overflow-hidden bg-iron sm:h-[88svh]">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
          >
            <Image
              src={project.cover}
              alt={project.name}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/35 to-iron/5" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
                <span className="text-ember-light">
                  {String(i + 1).padStart(2, "0")} / {n}
                </span>
                {project.flag && <span aria-hidden="true">{project.flag}</span>}
                {project.status && <span className="text-white/60">&middot; {project.status}</span>}
              </div>

              <div className="max-w-3xl">
                <div className="flex items-end gap-4">
                  <span className="font-display text-base text-ember-light sm:text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-5xl font-medium uppercase leading-[0.95] text-white sm:text-7xl lg:text-8xl">
                    {project.name}
                  </h3>
                </div>
                {project.verse && (
                  <p className="mt-4 max-w-lg font-display text-base italic text-white/80 sm:text-lg">
                    &ldquo;{project.verse.replace(/^.*?(?=[“"])/, "")}&rdquo;
                  </p>
                )}

                <div className="mt-5 flex items-end gap-4">
                  <div className="flex gap-2">
                    {project.images.slice(0, 4).map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        aria-label={`Open ${project.name} photo ${idx + 1}`}
                        onClick={() => setModalIndex(i)}
                        className="relative h-12 w-16 cursor-pointer overflow-hidden rounded-sm ring-1 ring-white/25 transition hover:ring-white/70 sm:h-14 sm:w-20"
                      >
                        <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalIndex(i)}
                    className="cursor-pointer whitespace-nowrap text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                  >
                    See all photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {projects.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => setActive((a) => (a - 1 + projects.length) % projects.length)}
              className="no-focus-ring absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M15 18 9 12l6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => setActive((a) => (a + 1) % projects.length)}
              className="no-focus-ring absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {projects.length > 1 && (
        <div className="mt-3 flex gap-1.5">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              aria-label={`Show ${project.name}`}
              onClick={() => setActive(i)}
              className={`h-0.5 flex-1 cursor-pointer transition-colors ${
                i === active ? "bg-ember" : "bg-iron/15 hover:bg-iron/30"
              }`}
            />
          ))}
        </div>
      )}

      <ProjectModal
        project={modalIndex !== null ? projects[modalIndex] : null}
        sectionLabel={sectionLabel}
        onClose={() => setModalIndex(null)}
      />
    </>
  );
}
