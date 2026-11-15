"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ShowcaseProject } from "./project-types";

function Tags({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <h4 className="font-display text-sm font-bold text-iron">{title}</h4>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="cursor-default rounded-full border border-iron/15 px-2.5 py-1 text-xs text-iron/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-ember/60 hover:text-iron hover:shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectModal({
  project,
  sectionLabel,
  onClose,
}: {
  project: ShowcaseProject | null;
  sectionLabel: string;
  onClose: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setImgIndex(0);
  }, [project]);

  useEffect(() => {
    thumbRefs.current[imgIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [imgIndex]);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setImgIndex((i) => (i + 1) % project.images.length);
      }
      if (e.key === "ArrowLeft") {
        setImgIndex((i) => (i - 1 + project.images.length) % project.images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-iron/80 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-sm bg-capiz shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-dim">
              {sectionLabel}
              {project.status ? ` · ${project.status.toUpperCase()}` : ""}
            </p>
            <h3 className="mt-1 flex items-center gap-2 font-display text-2xl font-extrabold text-iron sm:text-3xl">
              {project.name}
              {project.flag && <span aria-hidden="true">{project.flag}</span>}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="no-focus-ring shrink-0 cursor-pointer rounded-sm border border-iron/25 px-4 py-2 text-sm font-medium text-iron transition-colors hover:border-ember hover:text-ember"
          >
            Close
          </button>
        </div>

        <div className="relative mt-5 aspect-[4/3] w-full bg-molave-raised sm:aspect-video">
          <span className="absolute left-3 top-3 z-10 rounded-sm bg-capiz px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-iron">
            Photo
          </span>
          <Image
            src={project.images[imgIndex]}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          {project.images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() =>
                  setImgIndex((i) => (i - 1 + project.images.length) % project.images.length)
                }
                className="no-focus-ring absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-iron/60 text-white backdrop-blur-sm transition-colors hover:bg-iron"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M15 18 9 12l6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setImgIndex((i) => (i + 1) % project.images.length)}
                className="no-focus-ring absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-iron/60 text-white backdrop-blur-sm transition-colors hover:bg-iron"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {project.images.length > 1 && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-6 py-4 sm:px-8">
            {project.images.map((src, i) => (
              <button
                key={src}
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                onClick={() => setImgIndex(i)}
                className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-sm ring-2 transition ${
                  i === imgIndex ? "ring-ember" : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 border-y border-iron/15 px-6 py-5 sm:px-8">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-iron/50">Type</div>
            <div className="mt-0.5 font-display text-sm font-bold text-iron">
              {project.type ?? "Residential"}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wide text-iron/50">Location</div>
            <div className="mt-0.5 font-display text-sm font-bold text-iron">
              {project.location ?? "Not posted"}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wide text-iron/50">Status</div>
            <div className="mt-0.5 font-display text-sm font-bold text-iron">
              {project.status ?? "Completed"}
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8">
          {project.verse && (
            <p className="font-display text-base italic text-ember-dim">&ldquo;{project.verse}&rdquo;</p>
          )}
          {project.description && (
            <p className="mt-3 text-sm leading-relaxed text-iron/80">{project.description}</p>
          )}

          {project.stats && (
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[11px] uppercase tracking-wide text-iron/50">
                    {stat.label}
                  </div>
                  <div className="font-display text-sm font-bold text-iron">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          {project.interior && <Tags title="Interior" items={project.interior} />}
          {project.outdoor && <Tags title="Outdoor" items={project.outdoor} />}
          {project.upgrades && <Tags title="Upgrades" items={project.upgrades} />}
          {project.freebies && <Tags title="Freebies" items={project.freebies} />}

          {project.video && (
            <video
              src={project.video}
              controls
              playsInline
              preload="metadata"
              className="mt-5 aspect-video w-full rounded-sm bg-iron"
            />
          )}
        </div>
      </div>
    </div>
  );
}
