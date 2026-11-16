"use client";

import { useEffect, useRef, useState } from "react";

export default function FooterWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number | null>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLit(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${py * -8}deg) rotateY(${px * 10}deg)`;
    });
  };

  const resetTilt = () => {
    const el = tiltRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={wrapRef}
      className="group w-full cursor-default select-none text-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <h2
        ref={tiltRef}
        aria-hidden="true"
        className={`w-full font-display font-medium uppercase leading-[0.8] tracking-[-0.03em] transition-[opacity,transform] duration-[1600ms] ease-out will-change-transform ${
          lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        style={{
          fontSize: "clamp(2.25rem, 13vw, 10rem)",
          backgroundImage:
            "linear-gradient(100deg, #fbf8f2 35%, #ffffff 50%, #fbf8f2 65%)",
          backgroundSize: "260% 100%",
          backgroundPosition: "110% 0",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          transition: "background-position 900ms ease, transform 300ms ease-out, opacity 1600ms ease-out",
          maskImage: "linear-gradient(90deg, #000 0%, #000 90%, transparent 99%)",
          WebkitMaskImage: "linear-gradient(90deg, #000 0%, #000 90%, transparent 99%)",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLHeadingElement>) => {
          e.currentTarget.style.backgroundPosition = "-60% 0";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLHeadingElement>) => {
          e.currentTarget.style.backgroundPosition = "110% 0";
        }}
      >
        TRISTONE
      </h2>
      <p
        className={`mt-4 font-display text-lg font-semibold uppercase leading-none tracking-[0.4em] text-capiz/60 transition-all duration-[1600ms] delay-100 ease-out sm:mt-5 sm:text-2xl ${
          lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        Construction
      </p>
      <p
        className={`mt-6 font-display text-sm italic text-capiz/75 transition-all duration-[1600ms] delay-200 ease-out sm:mt-7 sm:text-base ${
          lit ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        Quality beyond promises.
      </p>
    </div>
  );
}
