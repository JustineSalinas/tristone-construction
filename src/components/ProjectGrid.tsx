"use client";

import { useEffect, useRef, useState } from "react";
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
  const [visibleIndex, setVisibleIndex] = useState(0);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const i = cardRefs.current.indexOf(visible.target as HTMLButtonElement);
          if (i !== -1) setVisibleIndex(i);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [projects.length]);

  return (
    <>
      <div className="mt-10 flex gap-6">
        <div className="hidden shrink-0 flex-col gap-3 pt-1 text-xs font-semibold text-iron/30 sm:flex">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Jump to project ${i + 1}`}
              onClick={() =>
                cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className={`cursor-pointer text-left transition-colors hover:text-ember ${
                i === visibleIndex ? "text-ember" : undefined
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <StaggerReveal className="grid flex-1 grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
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
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-iron">{project.name}</h3>
                {project.flag && <span aria-hidden="true">{project.flag}</span>}
              </div>
              {project.location && (
                <p className="text-sm text-iron/50">{project.location}</p>
              )}
            </button>
          ))}
        </StaggerReveal>
      </div>

      <ProjectModal
        project={activeIndex !== null ? projects[activeIndex] : null}
        sectionLabel={sectionLabel}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
