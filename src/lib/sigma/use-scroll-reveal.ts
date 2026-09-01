"use client";

import * as React from "react";

/**
 * useScrollReveal — IntersectionObserver-based section reveal.
 *
 * Attaches to any element with a `data-reveal` attribute and adds
 * the `revealed` class when it enters the viewport. The CSS handles
 * the transition (opacity + translateY).
 *
 * Usage: just add `data-reveal` to any element that should animate in.
 * The hook automatically sets up the observer on mount.
 */
export function useScrollReveal() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = document.querySelectorAll("[data-reveal]");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Once revealed, stop observing (one-shot animation)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: document.querySelector("[data-beta-scroll]"),
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
