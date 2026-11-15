import Image from "next/image";
import { featuredProjects, canadaProject } from "@/lib/content";
import { DiamondBullet, FretworkDivider } from "./Fretwork";
import Reveal from "./Reveal";

function FeatureChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 border border-iron/15 bg-molave/5 px-2.5 py-1 text-xs text-iron/80"
        >
          <DiamondBullet className="text-ember" />
          {item}
        </span>
      ))}
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="bg-molave py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-capiz sm:text-4xl">
            Homes Rising Right Now
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-20">
          {featuredProjects.map((project, idx) => (
            <Reveal
              key={project.slug}
              className={`grid grid-cols-1 gap-0 lg:grid-cols-2 ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="border-[8px] border-molave-raised bg-molave-raised p-2 sm:border-[12px]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                {"video" in project && project.video && (
                  <div className="border-[8px] border-molave-raised bg-molave-raised p-2 sm:border-[12px]">
                    <video
                      src={project.video}
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-video w-full bg-iron"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center bg-capiz p-7 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-dim">
                  {project.headline}
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-iron">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-iron/70">{project.location}</p>
                <p className="mt-3 border-l-[3px] border-ember pl-3 font-display text-sm italic text-ember-dim">
                  {project.note ? `${project.note} ` : ""}
                  {project.verse}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-y border-iron/15 py-3">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-[11px] uppercase tracking-wide text-iron/50">
                        {stat.label}
                      </div>
                      <div className="font-display text-base font-bold text-iron">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-4">
                  <FeatureChips
                    items={[...project.interior, ...project.outdoor].slice(0, 7)}
                  />
                  <p className="text-xs text-iron/60">
                    <span className="font-semibold text-iron/80">Upgrades:</span>{" "}
                    {project.upgrades.join(", ")}
                  </p>
                  <p className="text-xs text-iron/60">
                    <span className="font-semibold text-iron/80">Freebies:</span>{" "}
                    {project.freebies.join(", ")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-[8px] border-molave-raised bg-molave-raised p-2 sm:border-[12px]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={canadaProject.image}
                  alt={canadaProject.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center bg-capiz p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-dim">
                {canadaProject.headline}
              </p>
              <h3 className="mt-1 font-display text-2xl font-extrabold text-iron">
                {canadaProject.name}
              </h3>
              <p className="mt-4 text-iron/80">{canadaProject.text}</p>
            </div>
          </Reveal>
        </div>

        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}
