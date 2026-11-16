import Image from "next/image";
import { siteInfo } from "@/lib/content";
import Reveal from "./Reveal";
import { FretworkDivider } from "./Fretwork";

const methodologies = [
  {
    step: "01",
    title: "Consultation & Lot Assessment",
    duration: "Week 1 – 2",
    summary:
      "We begin on your soil. Our team conducts an on-site lot survey, analyzes elevation and sun orientation, discusses your family's lifestyle flow, and evaluates financing options — whether cash, bank loan, or accredited PAG-IBIG Fund financing.",
    deliverables: [
      "On-site lot & contour inspection",
      "Lifestyle brief & space planning",
      "Preliminary budget & financing evaluation",
    ],
  },
  {
    step: "02",
    title: "3D Visualization & Architectural Blueprint",
    duration: "Week 3 – 5",
    summary:
      "Before a single shovel touches the ground, your home is completely modeled in 3D. Walk through your living spaces, examine natural light angles, inspect kitchen workflows, and select custom finishes — from timber slats and travertine walls to quartzite counters.",
    deliverables: [
      "Full 3D exterior & interior architectural walkthroughs",
      "Complete structural, electrical, and plumbing engineering plans",
      "Detailed bill of materials and transparent milestone schedule",
    ],
  },
  {
    step: "03",
    title: "Permits, Bureaucracy & Regulatory Sign-Off",
    duration: "Week 6 – 8",
    summary:
      "Zero stress with city hall. Tristone handles the entire regulatory gauntlet on your behalf: barangay clearances, municipal building permits, structural/sanitary engineering sign-offs, fire safety approvals, and utility connections.",
    deliverables: [
      "City hall building permit processing",
      "Barangay & zoning clearances",
      "Fire safety & municipal compliance sign-offs",
    ],
  },
  {
    step: "04",
    title: "Precision Engineering & Milestone Construction",
    duration: "Groundbreaking to Finishes",
    summary:
      "Supervised directly by on-site licensed civil engineers. We enforce strict rebar spacing, concrete strength testing, anti-termite soil barriers, and tropical moisture-proofing. Clients — especially OFWs and overseas families — receive regular HD photo/video walkthroughs at every milestone.",
    deliverables: [
      "Daily supervision by licensed civil engineers",
      "Strict compliance with the National Building Code of the Philippines",
      "Regular HD photo & video updates for remote homeowners",
    ],
  },
  {
    step: "05",
    title: "Turnkey Turnover, Occupancy & Warranty",
    duration: "Completion & Beyond",
    summary:
      "A formal handover ceremony marks the completion of your home. We complete thorough punch-list inspections, assist with complimentary occupancy permit processing, supply certified pest control, and back every build with our structural warranty.",
    deliverables: [
      "Official turnover ceremony & key handover",
      "Complimentary occupancy permit processing assistance",
      "Pest control treatment certification & structural warranty",
    ],
  },
];

const pillars = [
  {
    number: "01",
    title: "Licensed Engineering Leadership",
    description:
      "Led on the ground by licensed Civil Engineer Judy Ann Parreñas Ardeña and our dedicated engineering team. We never outsource supervision or compromise structural calculations.",
  },
  {
    number: "02",
    title: "Virtual Walkthroughs Before Building",
    description:
      "Every Tristone home is fully modeled in 3D prior to groundbreaking. You see room heights, kitchen flows, and material finishes in photorealistic detail before construction begins.",
  },
  {
    number: "03",
    title: "PAG-IBIG & Bank Loan Packaging",
    description:
      "We bridge the gap between dream and affordability. Full documentation assistance for PAG-IBIG Fund financing and major commercial bank loans (BDO, BPI, Metrobank).",
  },
  {
    number: "04",
    title: "Diaspora & OFW Remote Transparency",
    description:
      "Over 40% of our clients live and work abroad. Direct WhatsApp engineer lines, transparent milestone billing, and frequent video inspections keep you connected from thousands of miles away.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-molave py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-ember" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-ember">
              Who We Are
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-iron sm:text-4xl lg:text-5xl">
                Built on Integrity. <br className="hidden sm:inline" />
                <span className="italic text-ember font-normal">Engineered</span> for Generations.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-iron/50">
                Bacolod City &bull; Negros Occidental &bull; Iloilo City
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 border-t border-iron/10 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-iron/90 sm:text-xl sm:leading-relaxed">
                Tristone Construction is a full-service residential and commercial
                design-and-build firm headquartered in Bacolod City. Rooted in
                structural excellence and regional craftsmanship, we transform raw
                lots into architecturally striking, durable family homes.
              </p>
              <p className="mt-4 text-base leading-relaxed text-iron/75">
                Our team — led by licensed Civil Engineer Judy Ann Parreñas Ardeña
                alongside Cathyza Amolar Villaruz, Donna May Yatco, and Ryan — unites
                architectural design, precision engineering, and transparent project
                management under one roof. Our guiding promise,{" "}
                <strong className="font-semibold text-iron">
                  &ldquo;Quality Beyond Promises,&rdquo;
                </strong>{" "}
                means every foundation, rebar spacing, and bespoke finish is built
                with the same care and discipline as if it were for our own family.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-2xl border border-ember-dim/20 bg-capiz p-6 sm:p-8 shadow-[0_10px_30px_-15px_rgba(27,22,17,0.06)]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember-dim">
                  Leadership Philosophy
                </p>
                <blockquote className="mt-3 font-display text-base italic leading-relaxed text-iron/90 sm:text-lg">
                  &ldquo;We don&apos;t take shortcuts on foundations or finishes.
                  Every home we build is engineered with the exact care, prayer, and
                  precision as if it were for our own family.&rdquo;
                </blockquote>
              </div>
              <div className="border-t border-iron/10 pt-4">
                <p className="font-display text-sm font-bold text-iron">
                  Engr. Judy Ann Parreñas Ardeña
                </p>
                <p className="text-xs text-iron/60">
                  Lead Civil Engineer &bull; Tristone Construction
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Feature Image Banner: Team on Site */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-iron/10 bg-iron shadow-xl">
            <div className="relative h-64 sm:h-80 md:h-96 w-full">
              <Image
                src="/images/projects/raphael-groundbreaking-team.jpg"
                alt="Tristone Construction Engineering Team on site"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover object-[50%_35%] opacity-90 transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/40 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-ember px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Field Operations
                </span>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-capiz">
                  Groundbreakings, Inspections &amp; Turnovers
                </h3>
                <p className="mt-1 max-w-xl text-xs sm:text-sm text-capiz-dim/80">
                  From initial soil-breaking to ceremonial key handovers, our
                  engineering team remains on-site through every concrete pour.
                </p>
              </div>

              <div className="flex items-center gap-6 text-capiz">
                <div>
                  <p className="font-display text-2xl font-extrabold text-ember-light">
                    100%
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-capiz-dim/70">
                    Licensed Supervision
                  </p>
                </div>
                <div className="h-8 w-px bg-capiz/20" />
                <div>
                  <p className="font-display text-2xl font-extrabold text-ember-light">
                    Bacolod &amp; Iloilo
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-capiz-dim/70">
                    Regional Footprint
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Pillars / Values Grid */}
        <div className="mt-20">
          <Reveal>
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-ember-dim">
                The Tristone Standard
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-iron sm:text-3xl">
                What Sets Our Work Apart
              </h3>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Reveal
                key={p.number}
                className="group relative flex flex-col justify-between rounded-xl border border-iron/10 bg-capiz p-6 transition-all duration-300 hover:border-ember/40 hover:shadow-lg"
              >
                <div>
                  <span className="font-display text-2xl font-bold text-ember-light/60 transition-colors duration-300 group-hover:text-ember">
                    {p.number}
                  </span>
                  <h4 className="mt-3 font-display text-base font-bold text-iron transition-colors duration-300 group-hover:text-ember">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-iron/70">
                    {p.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-iron/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-ember-dim">
                    Tristone Guarantee
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The Methodology Section */}
        <div className="mt-24">
          <Reveal>
            <div className="border-t border-iron/10 pt-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-ember" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-ember">
                      The Process
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-extrabold text-iron sm:text-3xl lg:text-4xl">
                    Our 5-Step Construction Methodology
                  </h3>
                </div>
                <p className="max-w-md text-xs sm:text-sm text-iron/70">
                  Every home follows a strict, predictable roadmap from raw lot
                  assessment to turnkey ribbon turnover.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 space-y-4">
            {methodologies.map((m, index) => (
              <Reveal key={m.step}>
                <div className="group rounded-2xl border border-iron/10 bg-capiz p-6 sm:p-8 transition-all duration-300 hover:border-ember/40 hover:shadow-md">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                    {/* Left: Step number and duration */}
                    <div className="lg:col-span-3 flex items-center lg:flex-col lg:items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-molave-deep font-display text-sm font-bold text-iron group-hover:bg-ember group-hover:text-white transition-colors duration-300">
                          {m.step}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-ember-dim lg:hidden">
                          {m.duration}
                        </span>
                      </div>
                      <span className="hidden lg:inline-block mt-3 text-xs font-semibold uppercase tracking-wider text-ember-dim">
                        {m.duration}
                      </span>
                    </div>

                    {/* Middle: Title & summary */}
                    <div className="lg:col-span-5">
                      <h4 className="font-display text-lg sm:text-xl font-bold text-iron transition-colors duration-300 group-hover:text-ember">
                        {m.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-iron/75">
                        {m.summary}
                      </p>
                    </div>

                    {/* Right: Key Deliverables */}
                    <div className="lg:col-span-4 rounded-xl border border-iron/5 bg-molave-deep/50 p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-iron/50">
                        Milestone Deliverables
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {m.deliverables.map((deliv) => (
                          <li
                            key={deliv}
                            className="flex items-start gap-2 text-xs text-iron/80"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <Reveal className="mt-16 text-center">
          <FretworkDivider className="mx-auto max-w-xs text-ember-dim" />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-8 py-3.5 font-display text-sm font-bold text-white shadow-md transition-all hover:bg-ember-light hover:scale-[1.02]"
            >
              Consult With Our Engineers &rarr;
            </a>
            <a
              href={`tel:${siteInfo.phone.replace(/-/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-iron/20 bg-capiz px-7 py-3.5 text-sm font-semibold text-iron transition-colors hover:border-iron hover:bg-white"
            >
              Call {siteInfo.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
