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
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  strength = 0.25
): React.RefObject<T> {
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

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
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

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, [strength]);

  return ref;
}
