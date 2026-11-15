import { internationalClients } from "@/lib/content";
import Reveal from "./Reveal";

export default function InternationalClients() {
  return (
    <section className="bg-molave py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-capiz sm:text-4xl">
            Trusted From Abroad
          </h2>
          <p className="mt-3 max-w-2xl text-capiz-dim/80">
            Families overseas trusting Tristone to build their dream home back
            home.
          </p>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-1 divide-y divide-ember-dim/15 border-y border-ember-dim/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {internationalClients.map((c) => (
            <div key={c.name} className="flex flex-col gap-3 px-1 py-6 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">
                  {c.flag}
                </span>
                <h3 className="font-display text-lg font-bold text-capiz">
                  {c.name}
                </h3>
              </div>
              <p className="text-xs uppercase tracking-wide text-ember-light">
                {c.type}
              </p>
              <p className="text-sm text-capiz-dim/70">{c.location}</p>
              <dl className="mt-1 space-y-1 text-xs text-capiz-dim/60">
                <div className="flex justify-between gap-2">
                  <dt>Lot Area</dt>
                  <dd className="font-semibold text-capiz">{c.lotArea}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Interior Area</dt>
                  <dd className="font-semibold text-capiz">{c.interiorArea}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Exterior Area</dt>
                  <dd className="font-semibold text-capiz">{c.exteriorArea}</dd>
                </div>
              </dl>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
