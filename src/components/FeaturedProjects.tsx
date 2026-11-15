import { featuredProjects, canadaProject } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import Reveal from "./Reveal";
import ProjectSlider from "./ProjectSlider";
import type { ShowcaseProject } from "./project-types";

const projects: ShowcaseProject[] = [
  ...featuredProjects.map((p) => ({
    slug: p.slug,
    name: p.name,
    flag: p.flag,
    location: p.location,
    cover: p.image,
    images: [p.image],
    verse: p.note ? `${p.note} ${p.verse}` : p.verse,
    status: "Rising",
    type: "Residential",
    stats: p.stats,
    interior: p.interior,
    outdoor: p.outdoor,
    upgrades: p.upgrades,
    freebies: p.freebies,
    video: "video" in p ? p.video : undefined,
  })),
  {
    slug: "bria-faith",
    name: canadaProject.name,
    location: canadaProject.headline,
    cover: canadaProject.image,
    images: [canadaProject.image],
    description: canadaProject.text,
    status: "Rising",
    type: "Residential",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-molave py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-iron sm:text-4xl">
            Homes Rising Right Now
          </h2>
          <p className="mt-3 max-w-2xl text-iron/80">
            Click a build to see the full layout, finishes, and freebies.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 w-full">
        <ProjectSlider projects={projects} sectionLabel="RISING BUILDS" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}
