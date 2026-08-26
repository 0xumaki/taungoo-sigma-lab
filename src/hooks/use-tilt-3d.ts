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
 */
export function useTilt3D<T extends HTMLElement = HTMLDivElement>(
  maxDeg = 10
): React.RefObject<T> {
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

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
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

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, [maxDeg]);

  return ref;
}
