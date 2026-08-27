"use client";

import * as React from "react";

/**
 * useCardReveal — Awwwards SOTD scroll-triggered card reveal animation.
 *
 * Battle-tested parameters (from research findings / GSAP forum consensus):
 *   - y: 60px lift up on entry (40-80px is the SOTD sweet spot)
 *   - opacity: 0 → 1
 *   - duration: 0.8s
 *   - ease: cubic-bezier(0.22, 1, 0.36, 1) (= power3.out, THE SOTD reveal ease)
 *   - trigger: when card is ~15% visible (top 85%)
 *   - once: true (one-shot, doesn't reverse on scroll-up — re-triggering is amateur)
 *   - stagger: 0.08s per card (applied via CSS transition-delay)
 *
 * Implementation uses IntersectionObserver (not GSAP ScrollTrigger) to keep
 * the bundle light and avoid plugin registration. The CSS classes
 * (.sigma-card-reveal → .sigma-card-revealed) in globals.css handle the actual
 * transition with the exact SOTD easing + duration values.
 *
 * Usage:
 *   const ref = useCardReveal<HTMLDivElement>();
 *   return <div ref={ref} className="sigma-card-reveal sigma-hover-card">...</div>;
 *
 * Or for a grid of cards with stagger:
 *   const ref = useCardReveal<HTMLDivElement>({ stagger: true });
 *   return <div ref={ref}>
 *     {items.map((item, i) => (
 *       <div key={i} className="sigma-card-reveal sigma-hover-card" style={{ transitionDelay: `${i * 0.08}s` }}>
 *         ...
 *       </div>
 *     ))}
 *   </div>;
 */
export function useCardReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  /** Stagger child cards by 0.08s each (default: false — animate the element itself) */
  stagger?: boolean;
  /** Stagger delay in seconds (default: 0.08) */
  staggerDelay?: number;
  /** Threshold — fraction of element visible before firing (default: 0.15 = ~15%) */
  threshold?: number;
  /** Root margin — adjust trigger position (default: "0px 0px -15% 0px" = fire at top 85%) */
  rootMargin?: string;
}) {
  const {
    stagger = false,
    staggerDelay = 0.08,
    threshold = 0.15,
    rootMargin = "0px 0px -15% 0px",
  } = options || {};

  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Respect reduced motion — reveal everything immediately
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (stagger) {
        root.querySelectorAll<HTMLElement>(".sigma-card-reveal").forEach((el) => {
          el.classList.add("sigma-card-revealed");
        });
      } else {
        root.classList.add("sigma-card-revealed");
      }
      return;
    }

    const targets = stagger
      ? Array.from(root.querySelectorAll<HTMLElement>(".sigma-card-reveal"))
      : [root];

    if (targets.length === 0) return;

    // Apply stagger delay via CSS transition-delay
    if (stagger) {
      targets.forEach((el, i) => {
        el.style.transitionDelay = `${i * staggerDelay}s`;
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sigma-card-revealed");
            observer.unobserve(entry.target); // once: true — fire and forget
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((t) => observer.observe(t));

    return () => {
      observer.disconnect();
    };
  }, [stagger, staggerDelay, threshold, rootMargin]);

  return ref;
}
