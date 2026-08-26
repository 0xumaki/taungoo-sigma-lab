"use client";

import * as React from "react";

/**
 * useReducedMotion — detects if the user prefers reduced motion.
 * Returns true if `prefers-reduced-motion: reduce` is active.
 * Used to disable/soften GSAP animations for accessibility (WCAG 2.3.3).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
