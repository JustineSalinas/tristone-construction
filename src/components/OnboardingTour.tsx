"use client";

import { useEffect, useRef, useState } from "react";

const USER_NAME_KEY = "tristone-user-name";
// Relaxed 12-second pace so visitors can comfortably read and inspect each highlighted section
const AUTO_ADVANCE_MS = 12000;

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
  const highlightedRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPaused = isHoverPaused || isUserPaused;

  // Trigger prompt by default on every page load or refresh
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(USER_NAME_KEY);
      if (savedName) setName(savedName);
    } catch {
      // ignore
    }

    // Short delay so layout and hero settle before presenting prompt
    const id = setTimeout(() => {
      setStage("ask");
    }, 1100);

    return () => clearTimeout(id);
  }, []);

  // Listen for manual trigger from Tour button beside chatbot
  useEffect(() => {
    const handleStartEvent = () => {
      clearHighlight();
      setIsUserPaused(false);
      setStage("ask");
    };
    window.addEventListener("start-tristone-tour", handleStartEvent);
    return () => window.removeEventListener("start-tristone-tour", handleStartEvent);
  }, []);

  const clearHighlight = () => {
    if (highlightedRef.current) {
      highlightedRef.current.classList.remove("tour-highlight");
      highlightedRef.current = null;
    }
  };

  const goToStep = (idx: number) => {
    clearHighlight();
    const step = steps[idx];
    const el = document.getElementById(step.id);
    if (el) {
      el.classList.add("tour-highlight");
      highlightedRef.current = el;
      if (step.id !== "concierge-fab") {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    setStepIndex(idx);
    setProgress(0);
  };

  const endTour = () => {
    clearHighlight();
    setIsUserPaused(false);
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

  useEffect(() => clearHighlight, []);

  if (stage === "hidden") return null;

  // Initial prompt modal asking name + clear skip button
  if (stage === "ask") {
    return (
      <div className="fixed inset-x-4 bottom-5 z-[200] sm:bottom-6 sm:right-6 sm:left-auto sm:w-full sm:max-w-sm">
        <div className="rounded-2xl border border-iron/15 bg-white/95 p-5 text-iron shadow-[0_20px_45px_-12px_rgba(26,20,16,0.22),0_4px_12px_rgba(0,0,0,0.06)] backdrop-blur-md">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-ember">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
              </svg>
              Interactive Site Tour
            </span>
            <button
              type="button"
              onClick={endTour}
              className="text-iron/40 hover:text-iron text-lg leading-none p-1 -mr-1"
              aria-label="Skip and close tour"
            >
              &times;
            </button>
          </div>

          <h3 className="mt-2.5 font-display text-base font-bold text-iron">
            Take a 1-minute site tour?
          </h3>
          <p className="mt-1 text-xs text-iron/70 leading-relaxed">
            Walk through our active builds, 3D floor plans, financing options, and on-site videos at a comfortable pace.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              startTour();
            }}
            className="mt-3.5 flex flex-col gap-2.5"
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
                className="w-full rounded-xl border border-iron/20 bg-capiz/60 px-3.5 py-2 text-xs text-iron placeholder-iron/45 outline-none transition focus:border-ember focus:bg-white focus:ring-2 focus:ring-ember/20"
              />
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-ember py-2.5 text-center font-display text-xs font-bold text-white shadow-sm transition hover:bg-ember-light active:scale-[0.98]"
              >
                Take the Tour &rarr;
              </button>
              <button
                type="button"
                onClick={endTour}
                className="rounded-xl border border-iron/20 bg-white px-3.5 py-2.5 text-xs font-semibold text-iron/70 transition hover:bg-iron/5 hover:text-iron active:scale-[0.98]"
              >
                Skip Tour
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Active step card: streamlined, compact, non-flooding for mobile viewports
  const step = steps[stepIndex];
  const greeting = name.trim() ? `${name.trim()}, ` : "";

  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-5 z-[200] flex justify-center sm:bottom-6 sm:inset-x-auto sm:right-6 sm:w-full sm:max-w-md"
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
      onTouchStart={() => setIsHoverPaused(true)}
      onTouchEnd={() => setIsHoverPaused(false)}
    >
      <div className="pointer-events-auto w-full rounded-2xl border border-iron/15 bg-white/98 text-iron shadow-[0_24px_50px_-12px_rgba(26,20,16,0.25),0_4px_12px_rgba(0,0,0,0.06)] backdrop-blur-md overflow-hidden">
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
            <span className="truncate max-w-[180px] sm:max-w-[210px]">{step.tag}</span>
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
              onClick={() => {
                goToStep(Math.max(0, stepIndex - 1));
              }}
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

      <style>{`
        .tour-highlight {
          outline: 2px solid #d9531f !important;
          outline-offset: -2px !important;
          box-shadow: 0 0 0 4px rgba(217, 83, 31, 0.22) !important;
          transition: outline 0.3s ease, box-shadow 0.3s ease !important;
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
    </div>
  );
}
