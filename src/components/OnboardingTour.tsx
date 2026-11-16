"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const USER_NAME_KEY = "tristone-user-name";
// Relaxed 12-second pace so visitors can comfortably read and inspect each highlighted section
const AUTO_ADVANCE_MS = 12000;

interface SpotlightBox {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}

const steps = [
  {
    id: "top",
    tag: "Hero Showcase",
    title: "Flagship Residential Builds",
    text: "Swipe through our signature projects, view locations, or call our engineering team directly.",
  },
  {
    id: "about",
    tag: "The Firm & Process",
    title: "About Tristone & 5-Step Build",
    text: "Meet our licensed civil engineers and review our 5-step build process from blueprints to turnover.",
  },
  {
    id: "clients",
    tag: "Diaspora Living",
    title: "Homes for Filipinos Overseas",
    text: "Custom floorplans designed for families abroad with real-time remote construction updates.",
  },
  {
    id: "rising",
    tag: "Active Commission",
    title: "Interactive Project Showcase",
    text: "Inspect room dimensions, exterior architecture, modular cabinets, and premium finishes.",
  },
  {
    id: "projects",
    tag: "Works Portfolio",
    title: "Filterable Project Gallery",
    text: "Filter between Ongoing builds, Completed turnovers, and groundbreakings across Negros and Iloilo.",
  },
  {
    id: "y2025",
    tag: "Pipeline",
    title: "2025 Lineup",
    text: "Preview upcoming residential builds breaking ground this year across Western Visayas.",
  },
  {
    id: "videos",
    tag: "On-Site Motion",
    title: "Site Walkthrough Videos",
    text: "Watch on-site progress clips, structural concrete pours, and ceremonial key turnovers.",
  },
  {
    id: "financing",
    tag: "Budget & Loans",
    title: "Financing & Freebies",
    text: "PAG-IBIG and commercial bank loan processing with complimentary permits and pest control.",
  },
  {
    id: "testimonials",
    tag: "Client Trust",
    title: "Homeowner Reviews",
    text: "Read authentic turnover feedback from verified clients and families.",
  },
  {
    id: "careers",
    tag: "Join Our Team",
    title: "Careers at Tristone",
    text: "Explore openings for licensed civil engineers, project architects, and site supervisors.",
  },
  {
    id: "contact",
    tag: "Direct Line",
    title: "Schedule a Consultation",
    text: "Book a site inspection, message on WhatsApp, or visit our Bacolod office.",
  },
  {
    id: "concierge-fab",
    tag: "24/7 Concierge",
    title: "Instant AI Assistant & Tour",
    text: "Tap here anytime to ask about pricing, permits, or restart this interactive tour.",
  },
];

export default function OnboardingTour() {
  const [stage, setStage] = useState<"hidden" | "ask" | "touring">("hidden");
  const [name, setName] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [spotlight, setSpotlight] = useState<SpotlightBox | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackingRafRef = useRef<number | null>(null);

  const isPaused = isHoverPaused || isUserPaused;

  // Calculates bounding box with 100% pixel-perfect alignment between cutout and focus frame
  const updateSpotlight = useCallback(() => {
    if (stage !== "touring") {
      setSpotlight(null);
      return;
    }
    const currentStep = steps[stepIndex];
    if (!currentStep) return;
    const el = document.getElementById(currentStep.id);
    if (!el) return;

    const r = el.getBoundingClientRect();
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const isMobile = vw < 768;
    const isFab = currentStep.id === "concierge-fab";
    const isTop = currentStep.id === "top";

    if (isFab) {
      setSpotlight({
        x: Math.round(r.left - 6),
        y: Math.round(r.top - 6),
        width: Math.round(r.width + 12),
        height: Math.round(r.height + 12),
        radius: 9999,
      });
      return;
    }

    if (isTop) {
      // Hero section: starts cleanly below navbar (72px)
      const navbarHeight = 72;
      const top = navbarHeight;
      // Leave room for mobile tour card (bottom-4) or desktop bottom margin
      const maxBottom = isMobile ? vh - 145 : vh - 20;
      const height = Math.max(100, Math.min(maxBottom, Math.round(r.bottom)) - top);
      const padX = isMobile ? 8 : 16;
      const x = padX;
      const width = vw - padX * 2;

      setSpotlight({
        x,
        y: top,
        width,
        height,
        radius: isMobile ? 16 : 20,
      });
      return;
    }

    // Standard sections: clamp top below navbar (74px) and bottom above the tour card on mobile
    const navbarHeight = 74;
    const top = Math.max(navbarHeight, Math.round(r.top));
    const maxBottom = isMobile ? vh - 145 : vh - 20;
    const bottom = Math.min(maxBottom, Math.round(r.bottom));
    const height = Math.max(90, bottom - top);

    const padX = isMobile ? 8 : 16;
    const x = padX;
    const width = vw - padX * 2;

    setSpotlight({
      x,
      y: top,
      width,
      height,
      radius: isMobile ? 16 : 20,
    });
  }, [stage, stepIndex]);

  // Track scrolling and resizing passively so spotlight stays locked 1:1
  useEffect(() => {
    if (stage !== "touring") return;

    updateSpotlight();

    const onScrollOrResize = () => {
      updateSpotlight();
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [stage, stepIndex, updateSpotlight]);

  // Trigger prompt by default on every page load or refresh after 1 second
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(USER_NAME_KEY);
      if (savedName) setName(savedName);
    } catch {
      // ignore
    }

    const id = setTimeout(() => {
      setStage("ask");
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  // Listen for manual trigger from Tour button beside chatbot
  useEffect(() => {
    const handleStartEvent = () => {
      setIsUserPaused(false);
      setStage("ask");
    };
    window.addEventListener("start-tristone-tour", handleStartEvent);
    return () => window.removeEventListener("start-tristone-tour", handleStartEvent);
  }, []);

  const goToStep = (idx: number) => {
    if (trackingRafRef.current) cancelAnimationFrame(trackingRafRef.current);

    const nextStep = steps[idx];
    const el = document.getElementById(nextStep.id);

    setStepIndex(idx);
    setProgress(0);

    if (el && nextStep.id !== "concierge-fab") {
      // Scroll accurately to the section, accounting for 74px sticky navbar
      const targetY = Math.max(0, el.offsetTop - 74);
      window.scrollTo({ top: targetY, behavior: "smooth" });

      // Live 60fps tracking loop during smooth scroll: zero latency, zero late popping
      const start = performance.now();
      const trackLoop = (now: number) => {
        updateSpotlight();
        if (now - start < 550) {
          trackingRafRef.current = requestAnimationFrame(trackLoop);
        } else {
          // Settle final position accurately
          updateSpotlight();
        }
      };
      trackingRafRef.current = requestAnimationFrame(trackLoop);
    } else {
      updateSpotlight();
    }
  };

  const endTour = () => {
    if (trackingRafRef.current) cancelAnimationFrame(trackingRafRef.current);
    setIsUserPaused(false);
    setSpotlight(null);
    setStage("hidden");
  };

  const startTour = () => {
    if (name.trim()) {
      try {
        localStorage.setItem(USER_NAME_KEY, name.trim());
      } catch {
        // ignore
      }
    }
    setIsUserPaused(false);
    setStage("touring");
    goToStep(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (stage !== "touring") return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (stepIndex < steps.length - 1) goToStep(stepIndex + 1);
        else endTour();
      } else if (e.key === "ArrowLeft") {
        if (stepIndex > 0) goToStep(stepIndex - 1);
      } else if (e.key === "Escape") {
        endTour();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsUserPaused((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [stage, stepIndex]);

  // Relaxed auto-advance with progress bar (resumes smoothly from current progress)
  useEffect(() => {
    if (stage !== "touring" || isPaused) return;

    const start = Date.now() - (progress / 100) * AUTO_ADVANCE_MS;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / AUTO_ADVANCE_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        if (stepIndex < steps.length - 1) {
          goToStep(stepIndex + 1);
        } else {
          endTour();
        }
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, stepIndex, isPaused]);

  if (stage === "hidden") return null;

  // Prominent Center Modal Prompt asking name with frosted backdrop
  if (stage === "ask") {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-md animate-tour-fade"
        onClick={endTour}
      >
        <div
          className="relative w-full max-w-md rounded-3xl border border-iron/15 bg-white/98 p-6 sm:p-8 text-iron shadow-[0_30px_75px_-15px_rgba(26,20,16,0.4),0_0_0_1px_rgba(255,255,255,0.85)] backdrop-blur-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.22em] text-ember">
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-ember shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
              </svg>
              Interactive Site Tour
            </span>
            <button
              type="button"
              onClick={endTour}
              className="text-iron/40 hover:text-iron text-2xl leading-none p-1 -mr-2 transition-colors"
              aria-label="Skip and close tour"
            >
              &times;
            </button>
          </div>

          <h3 className="mt-3.5 font-display text-xl sm:text-2xl font-bold text-iron tracking-tight">
            Take a 1-minute site tour?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-iron/75 leading-relaxed">
            Walk through our active builds, 3D floor plans, financing options, and on-site video progress at a comfortable pace.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              startTour();
            }}
            className="mt-5 flex flex-col gap-3"
          >
            <div>
              <label htmlFor="tour-user-name" className="sr-only">
                What is your name?
              </label>
              <input
                id="tour-user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What is your name? (optional)"
                autoFocus
                className="w-full rounded-xl border border-iron/20 bg-capiz/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-iron placeholder-iron/45 outline-none transition focus:border-ember focus:bg-white focus:ring-2 focus:ring-ember/20"
              />
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-ember py-3 sm:py-3.5 text-center font-display text-xs sm:text-sm font-bold text-white shadow-md transition hover:bg-ember-light active:scale-[0.98]"
              >
                Take the Tour &rarr;
              </button>
              <button
                type="button"
                onClick={endTour}
                className="rounded-xl border border-iron/20 bg-white px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-iron/70 transition hover:bg-iron/5 hover:text-iron active:scale-[0.98]"
              >
                Skip Tour
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Active step card & Spotlight Elements
  const step = steps[stepIndex];
  const greeting = name.trim() ? `${name.trim()}, ` : "";
  const isFabStep = step.id === "concierge-fab";

  return (
    <>
      {/* SVG Mask Definition: 100% Matching Clear Cutout */}
      {spotlight && (
        <svg
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[138] h-full w-full"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <mask id="tristone-spotlight-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              {/* White fills everything: masked in (blurred & dimmed) */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Black cutout: transparent (100% crystal clear & unblurred) */}
              <rect
                x={spotlight.x}
                y={spotlight.y}
                width={spotlight.width}
                height={spotlight.height}
                rx={spotlight.radius}
                ry={spotlight.radius}
                fill="black"
              />
            </mask>
          </defs>
        </svg>
      )}

      {/* Dimmed & Blurred Backdrop: Applies blur to everything outside the spotlight cutout */}
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[139]"
          style={{
            backgroundColor: "rgba(22, 17, 13, 0.48)",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            mask: "url(#tristone-spotlight-mask)",
            WebkitMask: "url(#tristone-spotlight-mask)",
          }}
        />
      )}

      {/* Glowing Focus Frame & Live Badge: Exactly matching the cutout bounds */}
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[145]"
          style={{
            top: `${spotlight.y}px`,
            left: `${spotlight.x}px`,
            width: `${spotlight.width}px`,
            height: `${spotlight.height}px`,
            borderRadius: `${spotlight.radius}px`,
            border: "2px solid #d9531f",
            boxShadow:
              "0 0 0 1px rgba(255, 255, 255, 0.4), 0 0 32px rgba(217, 83, 31, 0.35), inset 0 0 18px rgba(217, 83, 31, 0.08)",
          }}
        >
          {/* Architectural Live Focus Badge (always visible in viewport) */}
          <div className="absolute -top-3.5 left-4 flex items-center gap-1.5 rounded-full bg-ember px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>{step.tag}</span>
          </div>
        </div>
      )}

      {/* Tour Step Card: positioned cleanly, shifted away from floating dock on step 12 */}
      <div
        className={`pointer-events-none fixed z-[200] flex justify-center transition-all duration-300 ${
          isFabStep
            ? "inset-x-4 bottom-24 sm:inset-x-auto sm:right-6 sm:bottom-28 sm:w-full sm:max-w-md"
            : "inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-full sm:max-w-md"
        }`}
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onTouchStart={() => setIsHoverPaused(true)}
        onTouchEnd={() => setIsHoverPaused(false)}
      >
        <div className="pointer-events-auto w-full rounded-2xl border border-iron/15 bg-white/98 text-iron shadow-[0_24px_50px_-12px_rgba(26,20,16,0.32),0_4px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.8)] backdrop-blur-xl overflow-hidden">
          {/* Progress bar with pause state */}
          <div className="h-[3px] w-full bg-iron/10">
            <div
              className={`h-full transition-[width] duration-100 ease-linear ${
                isPaused ? "bg-ember/60" : "bg-ember"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-4 sm:p-5">
            {/* Header row: feature tag + step count + pause/play + close */}
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-ember">
              <span className="truncate max-w-[170px] sm:max-w-[210px]">{step.tag}</span>
              <div className="flex items-center gap-2 shrink-0">
                {/* Manual Pause / Play button */}
                <button
                  type="button"
                  onClick={() => setIsUserPaused((prev) => !prev)}
                  className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-iron/60 hover:bg-iron/5 hover:text-iron transition-colors"
                  title={isUserPaused ? "Resume auto-advance" : "Pause auto-advance"}
                  aria-label={isUserPaused ? "Resume tour" : "Pause tour"}
                >
                  {isUserPaused ? (
                    <>
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current text-ember">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span className="text-ember font-mono">Resume</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current text-iron/60">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      <span className="font-mono text-iron/50">Pause</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-iron/60">
                  {stepIndex + 1} / {steps.length}
                </span>

                <button
                  type="button"
                  onClick={endTour}
                  className="text-iron/40 hover:text-iron text-base leading-none p-0.5"
                  aria-label="Exit tour"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Title & Concise text with smooth fade transition */}
            <div key={stepIndex} className="animate-tour-step">
              <h4 className="mt-1.5 font-display text-sm sm:text-base font-bold text-iron">
                {step.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-iron/75">
                {greeting}
                {step.text}
              </p>
            </div>

            {/* Controls */}
            <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-iron/10">
              <button
                type="button"
                onClick={() => goToStep(Math.max(0, stepIndex - 1))}
                disabled={stepIndex === 0}
                className="text-xs font-semibold text-iron/60 hover:text-iron disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              >
                &larr; Back
              </button>

              <button
                type="button"
                onClick={() => {
                  if (stepIndex < steps.length - 1) {
                    goToStep(stepIndex + 1);
                  } else {
                    endTour();
                  }
                }}
                className="rounded-lg bg-ember px-4 py-1.5 font-display text-xs font-bold text-white transition-colors hover:bg-ember-light active:scale-[0.98]"
              >
                {stepIndex < steps.length - 1 ? "Next \u2192" : "Finish \u2713"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tour-fade-in {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-tour-fade {
          animation: tour-fade-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes tour-step-fade {
          from {
            opacity: 0;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-tour-step {
          animation: tour-step-fade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
