"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "tristone-tour-done";
const AUTO_ADVANCE_MS = 7000;

const steps = [
  {
    id: "top",
    title: "Welcome home",
    text: "This is Tristone Construction — real homes, built across Bacolod and Iloilo, not stock photos.",
  },
  {
    id: "clients",
    title: "Trusted from abroad",
    text: "Families overseas trust us to build their dream home back home, even from thousands of miles away.",
  },
  {
    id: "rising",
    title: "Homes rising right now",
    text: "These builds are in progress today. Scroll through them, or click any one for the full layout, finishes, and freebies.",
  },
  {
    id: "projects",
    title: "Completed & ongoing builds",
    text: "A look at homes we've already turned over, and the ones still underway.",
  },
  {
    id: "y2025",
    title: "2025 lineup",
    text: "Here's what we're breaking ground on this year.",
  },
  {
    id: "videos",
    title: "See it in motion",
    text: "Site updates and turnovers, straight from the build. Every clip plays on its own as you scroll.",
  },
  {
    id: "financing",
    title: "Build now, pay later",
    text: "We offer financing and freebies worth thousands on every qualifying project.",
  },
  {
    id: "testimonials",
    title: "Families we've built for",
    text: "Real words from the people who trusted us with their dream home.",
  },
  {
    id: "careers",
    title: "We're hiring",
    text: "Looking to join a growing construction team? We'd love to hear from you.",
  },
  {
    id: "contact",
    title: "Let's get started",
    text: "Ready to build? This is where you reach us — call, message, or visit.",
  },
];

export default function OnboardingTour() {
  const [stage, setStage] = useState<"hidden" | "ask" | "touring">("hidden");
  const [name, setName] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const highlightedRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const id = setTimeout(() => setStage("ask"), 1200);
        return () => clearTimeout(id);
      }
    } catch {
      // localStorage unavailable; skip the tour silently
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

  // Auto-advance with a visible progress bar, pausable by interacting.
  useEffect(() => {
    if (stage !== "touring") return;
    setProgress(0);
    const start = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / AUTO_ADVANCE_MS) * 100);
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
  }, [stage, stepIndex]);

  useEffect(() => clearHighlight, []);

  if (stage === "hidden") return null;

  if (stage === "ask") {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-iron/80 p-4 backdrop-blur-sm">
        <div className="w-full max-w-sm bg-capiz p-8 text-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-dim">
            New here?
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-iron">
            Let us show you around
          </h2>
          <p className="mt-2 text-sm text-iron/70">
            Tell us your name and we&apos;ll walk you through the site.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startTour();
            }}
            className="mt-5 flex flex-col gap-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name"
              className="w-full border border-iron/20 bg-white px-4 py-2.5 text-sm text-iron outline-none focus:border-ember"
              autoFocus
            />
            <button
              type="submit"
              className="cursor-pointer bg-ember px-4 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-ember-light"
            >
              Take the tour
            </button>
            <button
              type="button"
              onClick={endTour}
              className="cursor-pointer text-xs font-medium text-iron/50 hover:text-iron"
            >
              No thanks, I&apos;ll explore on my own
            </button>
          </form>
        </div>
      </div>
    );
  }

  const step = steps[stepIndex];
  const greeting = name.trim() ? `${name.trim()}, ` : "";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[200] flex justify-center p-4 sm:p-6">
      <div className="pointer-events-auto w-full max-w-md bg-iron text-capiz shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="h-[3px] w-full bg-capiz/10">
          <div
            className="h-full bg-ember transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-ember-light">
            <span>
              Step {stepIndex + 1} / {steps.length}
            </span>
            <button
              type="button"
              onClick={endTour}
              className="cursor-pointer text-capiz-dim/50 hover:text-capiz"
              aria-label="Skip tour"
            >
              Skip tour
            </button>
          </div>
          <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-capiz-dim/80">
            {greeting}
            {step.text}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => goToStep(Math.max(0, stepIndex - 1))}
              disabled={stepIndex === 0}
              className="cursor-pointer text-sm font-medium text-capiz-dim/70 hover:text-capiz disabled:cursor-not-allowed disabled:opacity-30"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() =>
                stepIndex < steps.length - 1 ? goToStep(stepIndex + 1) : endTour()
              }
              className="cursor-pointer bg-ember px-5 py-2 font-display text-sm font-bold text-white transition-colors hover:bg-ember-light"
            >
              {stepIndex < steps.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .tour-highlight {
          position: relative;
          z-index: 150;
          outline: 3px solid var(--ember);
          outline-offset: -3px;
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
