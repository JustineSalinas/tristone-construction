"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";
import StaggerReveal from "./StaggerReveal";
import type { ShowcaseProject } from "./project-types";

export default function ProjectGrid({
  projects,
  sectionLabel,
}: {
  projects: ShowcaseProject[];
  sectionLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <StaggerReveal className="mt-10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group cursor-pointer text-left"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-molave-raised">
              {project.badge && (
                <span className="absolute left-3 top-3 z-10 rounded-sm bg-capiz px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-iron">
                  {project.badge}
                </span>
              )}
              <Image
                src={project.cover}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl font-bold text-iron">{project.name}</h3>
              {project.flag && (
                <span className="rounded-sm border border-iron/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-iron/50">
                  {project.flag}
                </span>
              )}
            </div>
            {project.location && (
              <p className="mt-1 text-base text-iron/50">{project.location}</p>
            )}
          </button>
        ))}
      </StaggerReveal>

      <ProjectModal
        project={activeIndex !== null ? projects[activeIndex] : null}
        sectionLabel={sectionLabel}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
