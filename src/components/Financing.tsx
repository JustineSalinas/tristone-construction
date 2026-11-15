import { financingHighlights } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import Reveal from "./Reveal";

function LedgerRow({ label, index }: { label: string; index: number }) {
  return (
    <div className="group relative flex items-baseline gap-4 border-b border-iron/10 py-3.5 pl-0 transition-[padding,background-color] duration-300 ease-out last:border-b-0 hover:bg-ember/10 hover:pl-3">
      <span className="absolute left-0 top-0 h-full w-0.5 scale-y-0 bg-ember transition-transform duration-300 ease-out group-hover:scale-y-100" />
      <span className="font-display text-xs text-iron/35 transition-colors duration-300 group-hover:text-ember">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-iron/85 transition-colors duration-300 group-hover:text-iron">
        {label}
      </span>
    </div>
  );
}

export default function Financing() {
  return (
    <section id="financing" className="bg-molave-deep py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-capiz sm:text-4xl">
            We Offer Build Now, Pay Later
          </h2>
          <p className="mt-3 max-w-xl text-capiz-dim/80">
            Freebies worth almost{" "}
            <span className="font-display font-bold text-ember-light">
              {financingHighlights.freebiesValue}
            </span>{" "}
            on every qualifying project.
          </p>

          <div className="mt-10 border-[8px] border-molave-raised bg-capiz sm:border-[12px]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-7 sm:p-10">
                <h3 className="font-display text-lg font-bold text-iron">
                  Freebies Included
                </h3>
                <div className="mt-2">
                  {financingHighlights.freebies.map((item, i) => (
                    <LedgerRow key={item} label={item} index={i} />
                  ))}
                </div>
              </div>

              <div className="border-t border-iron/10 p-7 sm:border-l sm:border-t-0 sm:p-10">
                <h3 className="font-display text-lg font-bold text-iron">
                  What&apos;s With Us
                </h3>
                <div className="mt-2">
                  {financingHighlights.benefits.map((item, i) => (
                    <LedgerRow key={item} label={item} index={i} />
                  ))}
                </div>
              </div>
            </div>

            <p className="border-t border-iron/10 px-7 py-5 text-sm text-iron/60 sm:px-10">
              {financingHighlights.services}
            </p>
          </div>
        </Reveal>

        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}
