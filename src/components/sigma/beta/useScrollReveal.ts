"use client";

import * as React from "react";

/**
 * useScrollReveal — adds `is-visible` class to all [data-reveal] and
 * [data-reveal-stagger] elements when they scroll into view.
 *
 * Usage:
 *   useScrollReveal(); // call once at the top of BetaInterface
 *
 * Then add `data-reveal` or `data-reveal-stagger` attributes to any
 * element you want to fade-up on scroll.
 *
 * Respects prefers-reduced-motion (CSS handles disabling).
 */
export function useScrollReveal() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
}
