"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "tristone-tour-done";
const AUTO_ADVANCE_MS = 6000;

const steps = [
  {
    id: "top",
    tag: "Hero & Flagship Builds",
    title: "Project Slide Showcase",
    text: "Swipe between featured homes or tap to call our engineering team directly.",
  },
  {
    id: "about",
    tag: "The Firm & Process",
    title: "About Tristone & How We Build",
    text: "Meet our licensed civil engineers and review our 5-step build process from soil to keys.",
  },
  {
    id: "clients",
    tag: "Diaspora Living",
    title: "Overseas Family Builds",
    text: "Explore real lot and floor area specifications built for families living abroad.",
  },
  {
    id: "rising",
    tag: "Active Commission",
    title: "Interactive Project Showcase",
    text: "Tap any project card to inspect 3D walkarounds, room dimensions, and upgrades.",
  },
  {
    id: "projects",
    tag: "Works Portfolio",
    title: "Filterable Build Gallery",
    text: "Filter between completed turnovers, ongoing construction, and groundbreakings.",
  },
  {
    id: "y2025",
    tag: "Pipeline",
    title: "2025 Lineup",
    text: "Preview newly scheduled residential builds breaking ground this year across Western Visayas.",
  },
  {
    id: "videos",
    tag: "On-Site Motion",
    title: "Site Walkthrough Videos",
    text: "Watch vertical on-site progress clips, structural concrete pours, and ribbon ceremonies.",
  },
  {
    id: "financing",
    tag: "Budget & Loans",
    title: "Build Now, Pay Later",
    text: "Check PAG-IBIG Fund assistance, commercial bank loan support, and included freebies.",
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
    text: "Explore openings for draftsmen, site engineers, and architectural staff.",
  },
  {
    id: "contact",
    tag: "Direct Line",
    title: "Schedule a Consultation",
    text: "Book a site inspection, message on WhatsApp, or visit our Bacolod office.",
  },
  {
    id: "concierge-fab",
    tag: "24/7 Support",
    title: "Tristone Concierge",
    text: "Tap this button anytime to ask questions about financing, permits, or our building process.",
  },
];

export default function OnboardingTour() {
  const [stage, setStage] = useState<"hidden" | "ask" | "touring">("hidden");
  const [name, setName] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const highlightedRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const id = setTimeout(() => setStage("ask"), 1400);
        return () => clearTimeout(id);
      }
    } catch {
      // localStorage unavailable; skip tour
    }
  }, []);

  const clearHighlight = () => {
    highlightedRef.current?.classList.remove("tour-highlight");
    highlightedRef.current = null;
  };

  const goToStep = (idx: number) => {
    clearHighlight();
    const step = steps[idx];
    const el = document.getElementById(step.id);
    if (el) {
      el.classList.add("tour-highlight");
      highlightedRef.current = el;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setStepIndex(idx);
    setProgress(0);
  };

  const endTour = () => {
    clearHighlight();
    setStage("hidden");
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  const startTour = () => {
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
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [stage, stepIndex]);

  // Auto-advance with progress bar (pauses on hover/touch)
  useEffect(() => {
    if (stage !== "touring" || isPaused) return;
    setProgress(0);
    const start = Date.now();
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

  // Lightweight initial prompt: compact, non-intrusive on mobile
  if (stage === "ask") {
    return (
      <div className="fixed inset-x-4 bottom-4 z-[200] sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-sm">
        <div className="rounded-2xl border border-ember-dim/30 bg-iron p-5 text-capiz shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-ember-light">
            <span>Quick Walkthrough</span>
            <button
              type="button"
              onClick={endTour}
              className="text-capiz-dim/40 hover:text-capiz"
              aria-label="Dismiss tour"
            >
              &times;
            </button>
          </div>

          <h3 className="mt-2 font-display text-base font-bold text-capiz">
            Take a 1-minute site tour?
          </h3>
          <p className="mt-1 text-xs text-capiz-dim/75 leading-relaxed">
            We&apos;ll walk you through our tools, active builds, 3D plans, and financing.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              startTour();
            }}
            className="mt-3.5 flex flex-col gap-2"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name (optional)"
              className="w-full rounded-lg border border-capiz/15 bg-capiz/5 px-3 py-1.5 text-xs text-capiz placeholder-capiz-dim/40 outline-none focus:border-ember"
            />
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-ember py-2 text-center font-display text-xs font-bold text-white transition-colors hover:bg-ember-light"
              >
                Start Tour
              </button>
              <button
                type="button"
                onClick={endTour}
                className="rounded-lg border border-capiz/15 px-3 py-2 text-xs font-medium text-capiz-dim/70 hover:text-capiz"
              >
                Skip
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
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[200] flex justify-center sm:bottom-6 sm:inset-x-auto sm:right-6 sm:w-full sm:max-w-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="pointer-events-auto w-full rounded-2xl border border-ember-dim/30 bg-iron text-capiz shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Progress bar */}
        <div className="h-[2px] w-full bg-capiz/10">
          <div
            className="h-full bg-ember transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-4 sm:p-5">
          {/* Header row: feature tag + step count + close */}
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-ember-light">
            <span className="truncate max-w-[200px]">{step.tag}</span>
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="font-mono text-capiz-dim/60">
                {stepIndex + 1} / {steps.length}
              </span>
              <button
                type="button"
                onClick={endTour}
                className="text-capiz-dim/40 hover:text-capiz text-sm leading-none"
                aria-label="Exit tour"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Title & Concise text */}
          <h4 className="mt-1.5 font-display text-sm sm:text-base font-bold text-capiz">
            {step.title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-capiz-dim/80">
            {greeting}
            {step.text}
          </p>

          {/* Controls */}
          <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-capiz/10">
            <button
              type="button"
              onClick={() => goToStep(Math.max(0, stepIndex - 1))}
              disabled={stepIndex === 0}
              className="text-xs font-medium text-capiz-dim/60 hover:text-capiz disabled:opacity-25 disabled:cursor-not-allowed"
            >
              &larr; Back
            </button>

            <button
              type="button"
              onClick={() =>
                stepIndex < steps.length - 1 ? goToStep(stepIndex + 1) : endTour()
              }
              className="rounded-lg bg-ember px-4 py-1.5 font-display text-xs font-bold text-white transition-colors hover:bg-ember-light"
            >
              {stepIndex < steps.length - 1 ? "Next \u2192" : "Finish"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .tour-highlight {
          position: relative;
          z-index: 150;
          outline: 2px solid var(--ember);
          outline-offset: 4px;
          border-radius: 8px;
          animation: tour-pulse 1.6s ease-in-out infinite;
        }
        @keyframes tour-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217, 83, 31, 0.45); }
          50% { box-shadow: 0 0 0 10px rgba(217, 83, 31, 0); }
        }
      `}</style>
    </div>
  );
}
