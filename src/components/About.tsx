import Image from "next/image";
import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    phase: "Discovery",
    title: "Site Survey & Planning",
    description:
      "On-site lot evaluation, soil bearing assessment, and financing alignment.",
    deliverable: "Lot Brief",
  },
  {
    num: "02",
    phase: "Design",
    title: "3D BIM & Virtual Walkthroughs",
    description:
      "Complete 3D architectural and structural models before breaking ground.",
    deliverable: "3D Blueprints",
  },
  {
    num: "03",
    phase: "Permitting",
    title: "Clearances & City Approvals",
    description:
      "Turnkey handling of building permits, barangay clearances, and fire safety.",
    deliverable: "Municipal Permits",
  },
  {
    num: "04",
    phase: "Construction",
    title: "Engineered On-Site Execution",
    description:
      "Daily supervision by licensed civil engineers with weekly video logs.",
    deliverable: "Milestone Logs",
  },
  {
    num: "05",
    phase: "Handover",
    title: "Turnover & Warranty",
    description:
      "Ceremonial ribbon turnover, occupancy permit assistance, and structural warranty.",
    deliverable: "Turnkey Keys",
  },
];

const hallmarks = [
  {
    title: "Licensed Civil Engineers",
    detail:
      "Direct on-site supervision led by Engr. Judy Ann Ardeña. No outsourced shortcuts.",
  },
  {
    title: "Remote Video Logs for OFWs",
    detail:
      "Frequent HD video walk-throughs and direct engineer updates for families abroad.",
  },
  {
    title: "Loan Packaging",
    detail:
      "Full documentation assistance for accredited PAG-IBIG and bank housing loans.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-molave py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Monograph Header */}
        <Reveal>
          <div className="border-t border-iron/15 pt-8 sm:pt-10">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.25em] text-iron/50">
              <span>About Tristone</span>
              <span>Bacolod &bull; Iloilo</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.1] text-iron tracking-tight">
                  Built on discipline. <br />
                  <span className="italic text-ember font-normal">Engineered</span> for generations.
                </h2>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ember-dim">
                  Quality Beyond Promises
                </p>
              </div>

              <div className="lg:col-span-7 space-y-3 text-sm sm:text-base leading-relaxed text-iron/75 font-normal">
                <p className="text-base sm:text-lg font-display text-iron leading-relaxed">
                  Full-service residential and commercial design-build firm headquartered
                  in Bacolod City, serving Negros Occidental and Iloilo City.
                </p>
                <p>
                  Led on the ground by licensed Civil Engineer Judy Ann Parreñas Ardeña
                  alongside Cathyza Amolar Villaruz, Donna May Yatco, and Ryan, we unite
                  custom architectural design, civil engineering, and permitting under
                  one roof.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Photography Duo: Groundbreaking & Turnover */}
        <Reveal className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-iron/5">
                <Image
                  src="/images/projects/raphael-groundbreaking-team.jpg"
                  alt="Tristone on-site engineering team at groundbreaking"
                  fill
                  quality={92}
                  sizes="(max-width: 640px) 100vw, 560px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
              <p className="mt-2.5 text-[11px] text-iron/55 tracking-wide">
                <span className="font-semibold text-iron/80">01 / Groundbreaking</span> &mdash; Engr. Judy Ann Ardeña &amp; team &bull; Project Raphael
              </p>
            </div>

            <div>
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-iron/5">
                <Image
                  src="/images/projects/cleo-turnover-ribbon.jpg"
                  alt="Ceremonial turnover and ribbon cutting of Project Cleo"
                  fill
                  quality={92}
                  sizes="(max-width: 640px) 100vw, 560px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
              <p className="mt-2.5 text-[11px] text-iron/55 tracking-wide">
                <span className="font-semibold text-iron/80">02 / Turnover</span> &mdash; Ribbon cutting &bull; Project Cleo
              </p>
            </div>
          </div>
        </Reveal>

        {/* The 5-Step Build Ledger */}
        <div className="mt-20 sm:mt-24">
          <Reveal>
            <div className="border-t border-iron/20 pt-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-iron/50">
                  The Process
                </p>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-iron">
                  How We Build
                </h3>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-iron/50">
                Five steps &bull; Soil to keys
              </p>
            </div>
          </Reveal>

          <div className="mt-4 divide-y divide-iron/10 border-b border-iron/10">
            {steps.map((s) => (
              <Reveal key={s.num}>
                <div className="group py-5 sm:py-6 transition-colors duration-200 hover:bg-iron/[0.015]">
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 lg:items-baseline">
                    <div className="lg:col-span-3 flex items-baseline gap-3">
                      <span className="font-display text-xs text-ember font-semibold">
                        /{s.num}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-iron/50">
                        {s.phase}
                      </span>
                    </div>

                    <div className="lg:col-span-6">
                      <h4 className="font-display text-base font-bold text-iron group-hover:text-ember transition-colors duration-200">
                        {s.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-iron/70 leading-relaxed">
                        {s.description}
                      </p>
                    </div>

                    <div className="lg:col-span-3 lg:text-right">
                      <span className="text-[11px] text-iron/50 font-mono">
                        {s.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Hallmarks */}
        <div className="mt-14 sm:mt-18 border-t border-iron/15 pt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {hallmarks.map((h, i) => (
              <Reveal key={h.title}>
                <div>
                  <span className="text-[10px] font-mono text-iron/40 block">
                    0{i + 1}
                  </span>
                  <h4 className="mt-1.5 font-display text-base font-bold text-iron">
                    {h.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-iron/65 leading-relaxed">
                    {h.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 pt-6 border-t border-iron/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-iron/60">
              Planning a build in Bacolod or Iloilo?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ember hover:text-ember-dim transition-colors"
            >
              Consult With Our Engineers &rarr;
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
