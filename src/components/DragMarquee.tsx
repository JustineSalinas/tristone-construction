"use client";

import { useEffect, useRef } from "react";

export default function DragMarquee({
  children,
  direction = 1,
  speed = 40,
}: {
  children: React.ReactNode;
  direction?: 1 | -1;
  speed?: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    offset: 0,
    halfWidth: 0,
    paused: false,
    dragging: false,
    startX: 0,
    startOffset: 0,
    resumeTimer: null as ReturnType<typeof setTimeout> | null,
    lastT: 0,
  });

  const applyOffset = () => {
    const track = trackRef.current;
    const state = stateRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${-state.offset}px, 0, 0)`;
  };

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const state = stateRef.current;

    const measure = () => {
      state.halfWidth = track.scrollWidth / 2;
      if (state.halfWidth > 0) {
        state.offset = state.halfWidth / 2;
        applyOffset();
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let raf = 0;
    let onScreen = false;

    const step = (t: number) => {
      if (!state.lastT) state.lastT = t;
      const dt = t - state.lastT;
      state.lastT = t;

      if (!state.paused && !state.dragging && state.halfWidth > 0) {
        state.offset += (direction * speed * dt) / 1000;
        if (state.offset >= state.halfWidth) state.offset -= state.halfWidth;
        if (state.offset < 0) state.offset += state.halfWidth;
        applyOffset();
      }
      raf = requestAnimationFrame(step);
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !raf) {
          state.lastT = 0;
          raf = requestAnimationFrame(step);
        } else if (!onScreen && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    visibility.observe(viewport);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      visibility.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, speed]);

  const clearResumeTimer = () => {
    const state = stateRef.current;
    if (state.resumeTimer) clearTimeout(state.resumeTimer);
  };

  const scheduleResume = () => {
    const state = stateRef.current;
    clearResumeTimer();
    state.resumeTimer = setTimeout(() => {
      state.paused = false;
    }, 1200);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const state = stateRef.current;
    state.dragging = true;
    state.paused = true;
    clearResumeTimer();
    state.startX = e.clientX;
    state.startOffset = state.offset;
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const state = stateRef.current;
    if (!state.dragging || state.halfWidth <= 0) return;
    const dx = e.clientX - state.startX;
    let next = state.startOffset - dx;
    next = ((next % state.halfWidth) + state.halfWidth) % state.halfWidth;
    state.offset = next;
    applyOffset();
  };

  const endDrag = () => {
    const state = stateRef.current;
    state.dragging = false;
    scheduleResume();
  };

  return (
    <div
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={() => {
        if (stateRef.current.dragging) endDrag();
        stateRef.current.paused = false;
      }}
      onPointerEnter={() => {
        if (!stateRef.current.dragging) stateRef.current.paused = true;
      }}
      className="no-scrollbar cursor-grab overflow-hidden active:cursor-grabbing"
    >
      <div ref={trackRef} className="flex w-max gap-5 will-change-transform">
        {children}
      </div>
    </div>
  );
}
