import { projects2025, projects2025Previews } from "@/lib/content";
import { DiamondBullet, FretworkDivider } from "./Fretwork";
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
          <Reveal className="mt-10 grid grid-cols-1 gap-x-10 gap-y-2 border-t border-ember-dim/20 pt-6 sm:grid-cols-2">
            {unphotographed.map((p) => (
              <div key={p.name} className="flex items-start gap-2.5 py-1.5 text-sm">
                <DiamondBullet className="mt-1.5 text-ember-light" />
                <div>
                  <span className="font-display font-bold text-iron">{p.name}</span>
                  <span className="text-iron/70"> &mdash; {p.location}</span>
                </div>
              </div>
            ))}
          </Reveal>
        )}

        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}
