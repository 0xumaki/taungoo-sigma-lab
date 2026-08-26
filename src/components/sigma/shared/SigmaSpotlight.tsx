"use client";

import * as React from "react";

/**
 * SigmaSpotlight — a radial gradient spotlight that follows the cursor
 * across the entire viewport. Adds a subtle "targeted area" glow effect.
 * Desktop-only (disabled on touch devices).
 */
export function SigmaSpotlight() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (ref.current) {
        ref.current.style.background = `radial-gradient(280px circle at ${cx}px ${cy}px, rgba(255,255,255,0.05), transparent 70%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[65] transition-opacity duration-300"
      aria-hidden
    />
  );
}
