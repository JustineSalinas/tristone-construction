import Image from "next/image";
import Reveal from "./Reveal";

const protocols = [
  {
    num: "01",
    phase: "Discovery & Lot Assessment",
    title: "Site Survey & Spatial Brief",
    description:
      "Every project begins on the terrain. We evaluate topography elevations, sun and wind vectors, and soil bearing capacity, aligning your family's living rituals with a disciplined budget and financing path.",
    deliverable: "Soil analysis & spatial brief",
  },
  {
    num: "02",
    phase: "Architectural Prototyping",
    title: "3D BIM & Virtual Walkthroughs",
    description:
      "Before breaking ground, the complete residence is modeled in 3D BIM. Homeowners explore open-to-below sightlines, cross-ventilation, kitchen workflows, and bespoke material palettes including timber slats, travertine, and quartzite.",
    deliverable: "Complete 3D model & engineering blueprints",
  },
  {
    num: "03",
    phase: "Regulatory Compliance",
    title: "Statutory Permitting & Clearances",
    description:
      "We manage the entire municipal approvals gauntlet. Tristone prepares, signs, and seals all structural, electrical, and sanitary engineering documents, securing building permits, barangay clearances, and fire safety compliance.",
    deliverable: "City hall permits & utility approvals",
  },
  {
    num: "04",
    phase: "Precision Construction",
    title: "On-Site Civil Engineering & Milestones",
    description:
      "Direct daily supervision by licensed civil engineers. We enforce strict rebar spacing, certified concrete compression testing, anti-termite soil barriers, and tropical moisture-proofing, backed by regular HD video logs for local and overseas families.",
    deliverable: "Weekly engineer logs & milestone accounting",
  },
  {
    num: "05",
    phase: "Handover & Stewardship",
    title: "Turnkey Turnover & Structural Warranty",
    description:
      "A thorough punch-list inspection precedes our ceremonial ribbon handover. We process your Certificate of Occupancy, certify full pest control treatment, and support your home with our long-term structural warranty.",
    deliverable: "Occupancy certificate & structural warranty",
  },
];

const hallmarks = [
  {
    title: "Licensed Civil Engineering",
    detail:
      "Direct personal oversight by Engr. Judy Ann Parreñas Ardeña. No proxy supervisors or compromised structural calculations.",
  },
  {
    title: "Diaspora & OFW Transparency",
    detail:
      "Tailored for families in Canada, the US, and abroad with scheduled video inspections, WhatsApp engineer lines, and milestone billing.",
  },
  {
    title: "Institutional Loan Packaging",
    detail:
      "Full documentation assistance for accredited PAG-IBIG Fund home loans and major commercial bank mortgages.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-molave py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Monograph Header */}
        <Reveal>
          <div className="border-t border-iron/15 pt-8 sm:pt-10">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.25em] text-iron/50">
              <span>About Tristone</span>
              <span>Bacolod &bull; Iloilo</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.1] text-iron tracking-tight">
                  Built on discipline. <br />
                  <span className="italic text-ember font-normal">Engineered</span> for generations.
                </h2>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-ember-dim">
                  Quality Beyond Promises
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed text-iron/75 font-normal">
                <p className="text-base sm:text-lg font-display text-iron leading-relaxed">
                  Tristone Construction is a full-service residential and commercial
                  design-build firm headquartered in Bacolod City, serving Negros
                  Occidental and Iloilo City.
                </p>
                <p>
                  Led on the ground by licensed Civil Engineer Judy Ann Parreñas Ardeña
                  alongside Cathyza Amolar Villaruz, Donna May Yatco, and Ryan, we unite
                  custom architectural planning, civil engineering, and transparent project
                  management under one roof. We do not outsource supervision or cut
                  corners on structural integrity.
                </p>
                <p className="text-xs sm:text-sm text-iron/60 border-l border-ember/30 pl-3 italic">
                  &ldquo;Every home is engineered with the exact care, prayer, and structural
                  precision as if it were for our own family.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Archival Photography Duo: Groundbreaking to Turnover */}
        <Reveal className="mt-14 sm:mt-20">
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
              <p className="mt-3 text-[11px] text-iron/55 tracking-wide">
                <span className="font-semibold text-iron/80">01 / Groundbreaking</span> &mdash; Engr. Judy Ann Ardeña &amp; on-site engineering team &bull; Project Raphael
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
              <p className="mt-3 text-[11px] text-iron/55 tracking-wide">
                <span className="font-semibold text-iron/80">02 / Turnover</span> &mdash; Completed residence &amp; ceremonial ribbon cutting &bull; Project Cleo
              </p>
            </div>
          </div>
        </Reveal>

        {/* The Methodology Ledger */}
        <div className="mt-24 sm:mt-32">
          <Reveal>
            <div className="border-t border-iron/20 pt-8 sm:pt-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-iron/50">
                  Methodology
                </p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-normal text-iron">
                  The Five-Stage Build Protocol
                </h3>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-iron/50">
                Soil Survey &rarr; Turnkey Handover
              </p>
            </div>
          </Reveal>

          <div className="mt-6 divide-y divide-iron/10 border-b border-iron/10">
            {protocols.map((p) => (
              <Reveal key={p.num}>
                <div className="group py-6 sm:py-8 transition-colors duration-200 hover:bg-iron/[0.015]">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-baseline">
                    {/* Index */}
                    <div className="lg:col-span-3 flex items-baseline gap-3">
                      <span className="font-display text-xs text-ember font-semibold">
                        /{p.num}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-iron/50">
                        {p.phase}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-6">
                      <h4 className="font-display text-base sm:text-lg font-bold text-iron group-hover:text-ember transition-colors duration-200">
                        {p.title}
                      </h4>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-iron/70">
                        {p.description}
                      </p>
                    </div>

                    {/* Deliverable */}
                    <div className="lg:col-span-3 lg:text-right">
                      <span className="inline-block text-[11px] text-iron/50 font-mono">
                        {p.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Hallmarks & Consultation Link */}
        <div className="mt-16 sm:mt-24 border-t border-iron/15 pt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {hallmarks.map((h, i) => (
              <Reveal key={h.title}>
                <div>
                  <span className="text-[10px] font-mono text-iron/40 block">
                    0{i + 1}
                  </span>
                  <h4 className="mt-2 font-display text-base font-bold text-iron">
                    {h.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-iron/65">
                    {h.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 pt-8 border-t border-iron/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-iron/60">
              Ready to explore your lot or review financing eligibility?
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
