import { projects2025, projects2025Previews } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import Reveal from "./Reveal";
import ProjectGrid from "./ProjectGrid";
import type { ShowcaseProject } from "./project-types";

const locationByName = Object.fromEntries(projects2025.map((p) => [p.name, p.location]));

const previewNames = Array.from(new Set(projects2025Previews.map((img) => img.project)));

const projects: ShowcaseProject[] = previewNames.map((name, i) => {
  const images = projects2025Previews.filter((img) => img.project === name).map((img) => img.src);
  return {
    slug: `2025-${i}`,
    name,
    location: locationByName[name],
    cover: images[0],
    images,
    status: "In Progress",
    type: "Residential",
    badge: "2025 Lineup",
  };
});

// Projects on this year's roster that don't have renders or photos yet.
const unphotographed = projects2025.filter((p) => !previewNames.includes(p.name));

export default function Projects2025() {
  return (
    <section className="bg-molave-deep py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-iron sm:text-4xl">
            2025 Projects Are Rolling
          </h2>
          <p className="mt-3 max-w-2xl text-iron/80">
            A look at the homes and renovations Tristone is building this
            year, from Bacolod to Iloilo.
          </p>
        </Reveal>

        <ProjectGrid projects={projects} sectionLabel="2025 LINEUP" />

        {unphotographed.length > 0 && (
          <Reveal className="mt-10 border-t border-ember-dim/20 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-dim">
              Also Breaking Ground This Year
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {unphotographed.map((p) => (
                <span
                  key={p.name}
                  className="cursor-default rounded-full border border-iron/15 bg-capiz px-4 py-2 text-sm text-iron/85 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-ember/50 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-display font-bold text-iron">{p.name}</span>
                  <span className="text-iron/60"> &mdash; {p.location}</span>
                </span>
              ))}
            </div>
          </Reveal>
        )}

        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}
