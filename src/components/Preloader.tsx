"use client";

import { useEffect, useState } from "react";

const MIN_DURATION = 1100;
const FADE_DURATION = 500;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setExiting(true), MIN_DURATION);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflow;
    }, MIN_DURATION + FADE_DURATION);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-capiz transition-opacity ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      aria-hidden="true"
    >
      <p className="font-display text-4xl font-medium uppercase tracking-[-0.02em] text-iron sm:text-5xl">
        Tristone
      </p>
      <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[0.4em] text-iron/50 sm:text-xs">
        Construction
      </p>
      <div className="mt-6 h-[2px] w-28 overflow-hidden bg-iron/10 sm:w-32">
        <div
          className="h-full w-full origin-left bg-ember"
          style={{ animation: `preloader-bar ${MIN_DURATION}ms ease-in-out forwards` }}
        />
      </div>

      <style>{`
        @keyframes preloader-bar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
