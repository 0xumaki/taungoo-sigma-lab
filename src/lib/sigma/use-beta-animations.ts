"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useBetaAnimations — GSAP-powered scroll animations for Beta Mode.
 *
 * Registers ScrollTrigger and sets up:
 * 1. Hero parallax: Σ watermark + ambient glow move slower than content on scroll
 * 2. Section headers: animate in with y-offset + opacity on scroll-trigger
 * 3. Card stagger: cards within a grid stagger their reveal
 *
 * Must be called AFTER all section DOM is mounted.
 */
export function useBetaAnimations() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const container = document.querySelector("[data-beta-scroll]") as HTMLElement;
    if (!container) return;

    // 1. Hero parallax — Σ watermark + ambient glow move slower
    const heroWatermark = container.querySelector("[style*='48vh']") as HTMLElement;
    const heroGlow = container.querySelector("[style*='radial-gradient']") as HTMLElement;

    if (heroWatermark) {
      gsap.to(heroWatermark, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.querySelector("#top") as HTMLElement,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          scroller: container,
        },
      });
    }

    // 2. Section headers — y-offset + opacity on scroll
    const headers = container.querySelectorAll("h2");
    headers.forEach((header) => {
      const section = header.closest("section");
      if (!section || section.id === "top") return; // skip hero

      gsap.from(header, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          scroller: container,
        },
      });
    });

    // 3. Card grids — stagger reveal
    const cardGrids = container.querySelectorAll(".bs-scan-reveal");
    cardGrids.forEach((card, i) => {
      // Skip if already handled by data-reveal
      if (card.hasAttribute("data-reveal")) return;

      gsap.from(card, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          scroller: container,
        },
      });
    });

    // 4. Stat numbers — count up when visible (re-trigger on scroll)
    const statNumbers = container.querySelectorAll("[class*='tabular-nums']");
    statNumbers.forEach((stat) => {
      const el = stat as HTMLElement;
      const text = el.textContent || "";
      // Only animate if it's a number
      if (!/\d/.test(text)) return;

      const finalText = text;
      const numMatch = text.match(/[\d,.]+/);
      if (!numMatch) return;

      const finalNum = parseFloat(numMatch[0].replace(/,/g, ""));
      const suffix = text.slice(numMatch.index! + numMatch[0].length);

      // Set up the scroll trigger
      let animated = false;
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        scroller: container,
        onEnter: () => {
          if (animated) return;
          animated = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: finalNum,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              const display = Math.floor(obj.val).toLocaleString("en-US");
              el.textContent = display + suffix;
            },
            onComplete: () => {
              el.textContent = finalText; // restore exact final text
            },
          });
        },
      });
    });

    // Refresh after setup
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}
