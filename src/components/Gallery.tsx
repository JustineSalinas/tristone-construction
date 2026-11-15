import { galleryProjects } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import Reveal from "./Reveal";
import ProjectGrid from "./ProjectGrid";
import type { ShowcaseProject } from "./project-types";

function statusFor(description: string) {
  const d = description.toLowerCase();
  if (d.includes("turnover") || d.includes("finished") || d.includes("key")) return "Turnover";
  if (d.includes("groundbreaking") || d.includes("soil")) return "Groundbreaking";
  if (d.includes("rising") || d.includes("begin")) return "Ongoing";
  if (d.includes("inspection") || d.includes("meeting")) return "Pre-Construction";
  return "Build";
}

const projects: ShowcaseProject[] = galleryProjects.map((p, i) => {
  const status = statusFor(p.description || "");
  return {
    slug: `gallery-${i}`,
    name: p.name,
    location: p.location || undefined,
    cover: p.images[0],
    images: p.images,
    description: p.description || undefined,
    status,
    type: "Residential",
    badge: status === "Turnover" ? "Completed" : status === "Ongoing" ? "Under Construction" : undefined,
  };
});

export default function Gallery() {
  return (
    <section id="projects" className="bg-molave-deep py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-iron sm:text-4xl">
            Completed &amp; Ongoing Builds
          </h2>
          <p className="mt-3 max-w-2xl text-iron/80">
            A selection of homes we&apos;ve designed, built, and turned over
            across Bacolod, Negros Occidental, and Iloilo. Click a build for
            the full photo set.
          </p>
        </Reveal>

        <ProjectGrid projects={projects} sectionLabel="OUR BUILDS" />

        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}
