import { internationalClients } from "@/lib/content";
import Reveal from "./Reveal";

export default function InternationalClients() {
  return (
    <section className="bg-molave py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-iron sm:text-4xl">
            Trusted From Abroad
          </h2>
          <p className="mt-3 max-w-2xl text-iron/80">
            Families overseas trusting Tristone to build their dream home back
            home.
          </p>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-1 divide-y divide-ember-dim/15 border-y border-ember-dim/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {internationalClients.map((c) => (
            <div
              key={c.name}
              className="group relative flex flex-col gap-1 px-1 py-6 transition-colors duration-300 hover:bg-ember/[0.04] sm:px-6"
            >
              <span
                className="w-fit text-2xl transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-rotate-3"
                aria-hidden="true"
              >
                {c.flag}
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-iron transition-colors duration-300 group-hover:text-ember">
                {c.name}
              </h3>
              <p className="text-xs uppercase tracking-wide text-ember-light">
                {c.type}
              </p>
              <p className="mt-2 text-sm text-iron/70">{c.location}</p>
              <dl className="mt-1 space-y-1 text-xs text-iron/60">
                <div className="flex justify-between gap-2">
                  <dt>Lot Area</dt>
                  <dd className="font-semibold text-iron transition-colors duration-300 group-hover:text-ember">
                    {c.lotArea}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Interior Area</dt>
                  <dd className="font-semibold text-iron transition-colors duration-300 group-hover:text-ember">
                    {c.interiorArea}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Exterior Area</dt>
                  <dd className="font-semibold text-iron transition-colors duration-300 group-hover:text-ember">
                    {c.exteriorArea}
                  </dd>
                </div>
              </dl>
              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
