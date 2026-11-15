"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { siteInfo } from "@/lib/content";
import { getGsap } from "@/lib/gsapClient";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(wordmarkRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        yPercent: 20,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-molave-deep"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/projects/673759551_122164078016708590_8331368798484395051_n.jpg"
          alt="A Tristone Construction home at dusk, interior lights glowing"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-molave-deep via-molave-deep/25 to-molave-deep/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-molave-deep/55 via-transparent to-transparent" />

      {/* Oversized overlapping wordmark */}
      <h1
        ref={wordmarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[8%] w-[110%] -translate-x-1/2 select-none text-center font-display text-[17vw] font-extrabold italic leading-none tracking-tight text-capiz/85 mix-blend-plus-lighter sm:text-[13vw]"
      >
        TRISTONE
      </h1>

      {/* Foreground content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 pb-16 text-center sm:px-8 sm:pb-24"
      >
        <p className="max-w-md text-sm font-semibold uppercase tracking-[0.2em] text-ember-light sm:text-base">
          Bacolod City &middot; Negros Occidental &middot; Iloilo City
        </p>
        <p className="max-w-lg text-lg text-capiz/90 sm:text-xl">
          {siteInfo.description}. PAG-IBIG Financing and bank loan
          assistance available on every build.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${siteInfo.phone.replace(/-/g, "")}`}
            className="flex items-center gap-2 border border-ember bg-ember px-7 py-3.5 font-display text-base font-bold text-molave-deep transition-colors hover:bg-ember-light"
          >
            Call {siteInfo.phone}
          </a>
          <a
            href="#projects"
            className="flex items-center gap-2 border border-capiz/40 px-7 py-3.5 font-display text-base font-semibold text-capiz transition-colors hover:border-ember-light hover:text-ember-light"
          >
            See Our Builds &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
