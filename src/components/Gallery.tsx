import Image from "next/image";
import { galleryProjects } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import Reveal from "./Reveal";
import StaggerReveal from "./StaggerReveal";

export default function Gallery() {
  return (
    <section id="projects" className="bg-molave-deep py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-capiz sm:text-4xl">
            Completed &amp; Ongoing Builds
          </h2>
          <p className="mt-3 max-w-2xl text-capiz-dim/80">
            A selection of homes we&apos;ve designed, built, and turned over
            across Bacolod, Negros Occidental, and Iloilo.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16">
          {galleryProjects.map((project) => (
            <Reveal key={project.name}>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-ember-dim/30 pb-3">
                <h3 className="font-display text-xl font-bold text-capiz">
                  {project.name}
                </h3>
                {project.location && (
                  <span className="text-sm text-capiz-dim/70">
                    {project.location}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="mb-5 text-sm text-capiz-dim/80">
                  {project.description}
                </p>
              )}
              <StaggerReveal className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {project.images.map((src) => (
                  <div
                    key={src}
                    className="group relative aspect-[4/3] overflow-hidden bg-molave-raised"
                  >
                    <Image
                      src={src}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </StaggerReveal>
            </Reveal>
          ))}
        </div>

        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}
