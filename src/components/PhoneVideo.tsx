"use client";

import { useEffect, useRef, useState } from "react";

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

  return (
    <div className="video-item flex w-full flex-col items-center gap-4">
      {/* iPhone frame */}
      <div className="relative aspect-[9/19.5] w-full rounded-[2.5rem] border-[6px] border-iron bg-iron p-1.5 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-molave-deep">
          <video
            ref={videoRef}
            src={shouldLoad ? src : undefined}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-iron" />

          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-capiz/40 bg-molave-deep/70 text-capiz backdrop-blur-sm"
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
          </button>
        </div>
      </div>
      <p className="text-center text-xs leading-relaxed text-iron/80">
        {caption}
      </p>
    </div>
  );
}
