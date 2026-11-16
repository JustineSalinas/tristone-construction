import { featuredProjects, canadaProject } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import ProjectSlider from "./ProjectSlider";
import Reveal from "./Reveal";
import type { ShowcaseProject } from "./project-types";

const croppedPhotos: Record<string, string> = {
  gamboa: "/images/projects/gamboa-photo.jpg",
  blessed: "/images/projects/blessed-photo.jpg",
};

// Extra real photos we have on hand for a project, beyond its single cover shot.
const extraPhotos: Record<string, string[]> = {
  gamboa: [
    "/images/projects/gamboa-groundbreaking-group-a.jpg",
    "/images/projects/gamboa-groundbreaking-group-b.jpg",
    "/images/projects/gamboa-groundbreaking-details.jpg",
  ],
};

const projects: ShowcaseProject[] = [
  ...featuredProjects.map((p) => ({
    slug: p.slug,
    name: p.name,
    flag: p.flag,
    location: p.location,
    cover: croppedPhotos[p.slug] ?? p.image,
    images: [croppedPhotos[p.slug] ?? p.image, ...(extraPhotos[p.slug] ?? [])],
    note: p.note,
    verse: p.verse,
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
    <section id="rising" className="bg-molave py-20">
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
