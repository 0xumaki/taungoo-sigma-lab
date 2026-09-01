"use client";

import * as React from "react";

/**
 * useMagnetic — a hook that makes an element subtly attract toward the cursor.
 * Returns a ref to attach to the element and the magnetic strength.
 *
 * Usage:
 *   const ref = useMagnetic(0.3);
 *   <button ref={ref}>...</button>
 *
 * The element will translate up to `strength * cursorDistance` toward the cursor,
 * with a spring-back on mouse leave.
 *
 * PERF (LOOP-1-LH): layout-thrash fix. The previous implementation called
 * `el.getBoundingClientRect()` on every `mousemove` event — a forced layout
 * reflow that can fire 60+ times/second. This version caches the rect on
 * `mouseenter` and invalidates the cache on `scroll`/`resize`. mousemove now
 * only reads the cached rect (no layout work).
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  strength = 0.25
): React.RefObject<T | null> {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // skip on touch devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    // skip if user prefers reduced motion
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rmq.matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    // PERF (LOOP-1-LH): cached bounding rect — set on mouseenter, invalidated
    // on scroll/resize. mousemove reads this cache without forcing layout.
    let rect: DOMRect | null = null;
    const refreshRect = () => { rect = el.getBoundingClientRect(); };
    const invalidateRect = () => { rect = null; };

    const onMove = (e: MouseEvent) => {
      // Lazy refresh if cache was invalidated (scroll/resize happened).
      if (!rect) refreshRect();
      const r = rect as DOMRect;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      targetX = dx * strength;
      targetY = dy * strength;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      el.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    el.addEventListener("mouseenter", refreshRect);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    // PERF (LOOP-1-LH): capture-phase scroll listener — catches scroll bubbling
    // from nested children too. Marks rect stale; the next mousemove will
    // refresh it lazily.
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
  }, [strength]);

  return ref;
}
