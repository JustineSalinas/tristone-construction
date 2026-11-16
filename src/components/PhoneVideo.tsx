"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "./icons";

export default function PhoneVideo({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    loadObserver.observe(video);

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    playObserver.observe(video);

    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label={`Play ${caption} larger`}
        className="video-item relative aspect-[9/16] w-[150px] max-w-full cursor-pointer overflow-hidden rounded-xl border border-iron/10 bg-molave-raised shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)] transition-transform sm:w-[190px] lg:w-[220px]"
      >
        <video
          ref={videoRef}
          src={shouldLoad ? src : undefined}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />

        <span
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
          }}
          role="button"
          tabIndex={0}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-capiz/40 bg-iron/70 text-capiz backdrop-blur-sm"
        >
          {muted ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5 6 9H3v6h3l5 4z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5 6 9H3v6h3l5 4z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18 6a9 9 0 0 1 0 12" />
            </svg>
          )}
        </span>
      </button>

      <p className="line-clamp-2 max-w-[220px] text-center text-xs leading-relaxed text-iron/80">
        {caption}
      </p>

      {expanded && mounted && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-iron/90 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Close video"
            className="no-focus-ring absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-capiz text-iron shadow-lg transition-transform hover:scale-105 sm:right-8 sm:top-8"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
          <div
            className="relative flex max-h-[92vh] max-w-[92vw] flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={src}
              controls
              autoPlay
              playsInline
              loop
              className="aspect-[9/16] max-h-[82vh] w-auto max-w-full rounded-xl bg-black shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)]"
            />
            {caption && (
              <p className="mt-3 max-w-sm text-center text-xs font-medium text-capiz/85 sm:text-sm">
                {caption}
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
