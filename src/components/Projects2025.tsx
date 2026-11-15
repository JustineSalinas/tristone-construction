import Image from "next/image";
import { projects2025, projects2025Previews } from "@/lib/content";
import { DiamondBullet, FretworkDivider } from "./Fretwork";
import Reveal from "./Reveal";
import StaggerReveal from "./StaggerReveal";

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

        <Reveal className="mt-10 grid grid-cols-1 gap-x-10 gap-y-2 border-y border-ember-dim/20 py-6 sm:grid-cols-2">
          {projects2025.map((p) => (
            <div key={p.name} className="flex items-start gap-2.5 py-1.5 text-sm">
              <DiamondBullet className="mt-1.5 text-ember-light" />
              <div>
                <span className="font-display font-bold text-iron">{p.name}</span>
                <span className="text-iron/70"> &mdash; {p.location}</span>
              </div>
            </div>
          ))}
        </Reveal>

        <StaggerReveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {projects2025Previews.map((img) => (
            <div
              key={img.src}
              className="group relative aspect-[4/3] overflow-hidden bg-molave-raised"
            >
              <Image
                src={img.src}
                alt={img.project}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </StaggerReveal>

        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}
