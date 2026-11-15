"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsapClient";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement> & React.Ref<HTMLLIElement>}
      className={className}
    >
      {children}
    </Tag>
  );
}
