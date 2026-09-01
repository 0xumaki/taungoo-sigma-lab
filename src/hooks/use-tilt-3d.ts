"use client";

import * as React from "react";

/**
 * useTilt3D — a hook that gives an element a 3D perspective tilt based on
 * cursor position. The element tilts toward the cursor as if it's a card
 * floating in 3D space. Desktop + non-reduced-motion only.
 *
 * Usage:
 *   const ref = useTilt3D(12); // max 12 degrees
 *   <div ref={ref} style={{ transformStyle: "preserve-3d" }}>...</div>
 *
 * PERF (LOOP-1-LH): layout-thrash fix. Previously called
 * `el.getBoundingClientRect()` on every mousemove (forced reflow 60+/sec).
 * Now caches the rect on `mouseenter`, invalidates on scroll/resize.
 * Important for SigmaMap (11 map nodes each mount a useTilt3D instance →
 * previously 11 forced layouts per mousemove over the whole map).
 */
export function useTilt3D<T extends HTMLElement = HTMLDivElement>(
  maxDeg = 10
): React.RefObject<T | null> {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rmq.matches) return;

    let raf = 0;
    let targetRX = 0;
    let targetRY = 0;
    let currentRX = 0;
    let currentRY = 0;
    // PERF (LOOP-1-LH): cached bounding rect — set on mouseenter, invalidated
    // on scroll/resize. mousemove reads this cache without forcing layout.
    let rect: DOMRect | null = null;
    const refreshRect = () => { rect = el.getBoundingClientRect(); };
    const invalidateRect = () => { rect = null; };

    const onMove = (e: MouseEvent) => {
      // Lazy refresh if cache was invalidated.
      if (!rect) refreshRect();
      const r = rect as DOMRect;
      const x = (e.clientX - r.left) / r.width; // 0..1
      const y = (e.clientY - r.top) / r.height; // 0..1
      // tilt: cursor at top → rotateX positive (tilt forward), cursor at right → rotateY positive
      targetRY = (x - 0.5) * 2 * maxDeg;
      targetRX = -(y - 0.5) * 2 * maxDeg;
    };

    const onLeave = () => {
      targetRX = 0;
      targetRY = 0;
    };

    const loop = () => {
      currentRX += (targetRX - currentRX) * 0.12;
      currentRY += (targetRY - currentRY) * 0.12;
      el.style.transform = `perspective(800px) rotateX(${currentRX.toFixed(2)}deg) rotateY(${currentRY.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    el.addEventListener("mouseenter", refreshRect);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    // PERF (LOOP-1-LH): capture-phase scroll invalidates the rect cache.
    window.addEventListener("scroll", invalidateRect, { capture: true, passive: true });
    window.addEventListener("resize", invalidateRect, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", refreshRect);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", invalidateRect, { capture: true });
      window.removeEventListener("resize", invalidateRect);
      el.style.transform = "";
    };
  }, [maxDeg]);

  return ref;
}
