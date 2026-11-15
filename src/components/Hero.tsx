"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteInfo } from "@/lib/content";
import { getGsap } from "@/lib/gsapClient";

// A premium, muted burnt-orange, distinct from both the old neon-orange
// brand accent and Tier One's warm timber/gold palette.
const BURNT = "#D9531F";
const BURNT_LIGHT = "#F08A52";
const DUR = 7000;

const slides = [
  { bg: "/images/herosection.jpg", cutout: "/images/hero-cutout.png", title: "Modern Residence" },
  { bg: "/images/projects/2025-cleo-a.jpg", cutout: "/images/hero-cutout-cleo.png", title: "Project Cleo" },
  { bg: "/images/projects/2025-raphael-a.jpg", cutout: "/images/hero-cutout-raphael.png", title: "Project Raphael" },
  { bg: "/images/projects/2025-amarra-faith-a.jpg", cutout: "/images/hero-cutout-amarra.png", title: "Project Amarra Faith" },
  { bg: "/images/projects/557485326_122145444122708590_8878783379772115357_n.jpg", cutout: "/images/hero-cutout-557.png", title: "Two-Storey Residence" },
  { bg: "/images/projects/2025-preview-a.jpg", cutout: "/images/hero-cutout-pool.png", title: "Luxury Pool Villa" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % slides.length), DUR);
    return () => clearTimeout(id);
  }, [active, paused]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      gsap.to(wordmarkRef.current, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(section.querySelectorAll("[data-hero-reveal]"), {
        autoAlpha: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.15,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const n = String(slides.length).padStart(2, "0");

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative grid min-h-[100svh] w-full grid-rows-[auto_1fr_auto] overflow-hidden bg-capiz"
    >
      {/* Top bar: eyebrow + motto on the light ivory ground, clear of the wordmark below it */}
      <div
        data-hero-reveal
        className="relative z-[3] mx-auto flex w-full max-w-6xl flex-wrap items-baseline justify-between gap-2 px-5 pb-3 pt-6 sm:px-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-dim">
          Residential &amp; Commercial &middot; Since 2016
        </p>
        <p className="font-display text-sm italic text-iron/70 sm:text-base">
          <em className="not-italic font-semibold">Built by Tristone.</em> Quality beyond promises.
        </p>
      </div>

      {/* Photo stage: sits between the ivory bar above and the foot below */}
      <div className="relative z-0 w-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.bg}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {/* Background photo, faded to transparent at its own top edge */}
            <div
              className="absolute inset-0"
              style={{
                maskImage:
                  "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 16%, rgba(0,0,0,0.65) 38%, #000 58%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 16%, rgba(0,0,0,0.65) 38%, #000 58%)",
              }}
            >
              <Image src={slide.bg} alt="" fill priority={i === 0} className="object-cover" />
            </div>
          </div>
        ))}

        {/* Giant wordmark, sandwiched under the foreground cutouts */}
        <p
          ref={wordmarkRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-[1rem] select-none text-center font-display font-medium uppercase leading-[0.8] tracking-[-0.03em] text-iron sm:top-[0.5rem]"
          style={{ fontSize: "clamp(3rem, 13vw, 9rem)" }}
        >
          Tristone
        </p>

        {slides.map((slide, i) => (
          <div
            key={slide.cutout}
            className="pointer-events-none absolute inset-0 overflow-visible transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image src={slide.cutout} alt="" fill className="object-contain object-bottom" />
          </div>
        ))}

        {/* Dark shade for legibility of the bottom copy */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 64% 62% at 0% 100%, rgba(20,15,10,0.72), rgba(20,15,10,0) 74%), linear-gradient(0deg, rgba(20,15,10,0.82) 0%, rgba(20,15,10,0.5) 22%, rgba(20,15,10,0) 46%)",
          }}
        />
      </div>

      {/* Foot: copy left, slide controls right */}
      <div className="relative z-[3] mx-auto flex w-full max-w-6xl flex-col items-start justify-end gap-8 px-5 pb-8 sm:px-8 sm:pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div data-hero-reveal className="max-w-xl">
          <h1 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl">
            Your <em className="italic" style={{ color: BURNT }}>dream home</em> starts here.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
            {siteInfo.description}. PAG-IBIG Financing and bank loan
            assistance available on every build.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-7">
            <a
              href={`tel:${siteInfo.phone.replace(/-/g, "")}`}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-iron transition-transform hover:scale-[1.03]"
            >
              Call {siteInfo.phone}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
            <a
              href="#projects"
              className="text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              View projects
            </a>
          </div>
        </div>

        {/* Slide controls: counter, clickable title, progress bars, pause */}
        <div data-hero-reveal className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BURNT_LIGHT }}>
            {String(active + 1).padStart(2, "0")} / {n}
          </span>

          <a
            href="#projects"
            className="group flex items-center gap-2 font-display text-xl text-white transition-colors hover:text-white/80 sm:text-2xl"
          >
            {slides[active].title}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
            </svg>
          </a>

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {slides.map((slide, i) => (
                <button
                  key={slide.bg}
                  type="button"
                  aria-label={`Show ${slide.title}`}
                  onClick={() => setActive(i)}
                  className="h-0.5 w-10 overflow-hidden bg-white/25"
                >
                  <span
                    className="block h-full origin-left bg-white"
                    style={
                      i === active
                        ? {
                            animation: `hero-bar-fill ${DUR}ms linear forwards ${paused ? "paused" : "running"}`,
                          }
                        : { transform: `scaleX(${i < active ? 1 : 0})` }
                    }
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label={paused ? "Play the slideshow" : "Pause the slideshow"}
              onClick={() => setPaused((p) => !p)}
              className="flex h-6 w-6 items-center justify-center text-white/70 hover:text-white"
            >
              {paused ? (
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                  <path d="M6 4l15 8-15 8z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-bar-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
