"use client";

import * as React from "react";
import { AlphaMiniNav } from "./AlphaNav";
import { AlphaHero } from "./AlphaHero";
import { AlphaAbout } from "./AlphaAbout";
import { AlphaServices } from "./AlphaServices";
import { AlphaPortfolio } from "./AlphaPortfolio";
import { AlphaProcess } from "./AlphaProcess";
import { AlphaTeam } from "./AlphaTeam";
import { AlphaTech } from "./AlphaTech";
import { AlphaTestimonials } from "./AlphaTestimonials";
import { AlphaInsights } from "./AlphaInsights";
import { AlphaContact } from "./AlphaContact";
import { AlphaFooter } from "./AlphaFooter";

// Scroll progress bar component
function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const container = document.querySelector("[data-alpha-scroll]");
    if (!container) return;
    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[86] h-0.5 w-full bg-transparent">
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${progress}%`, background: "#FF4500" }}
      />
    </div>
  );
}

/**
 * AlphaInterface — the traditional scrolling website interface.
 *
 * CRITICAL FIX for "lands on section 3" bug:
 * The root cause was `scroll-behavior: smooth` on the container CSS —
 * it was animating the scroll-to-top from a non-zero position (browser
 * scroll restoration), making it look like the page was scrolling DOWN
 * to section 3. Fix: disable smooth-scroll on mount, force scrollTop=0
 * with direct property assignment (bypasses CSS smooth-scroll), then
 * re-enable smooth-scroll for anchor navigation.
 */
export function AlphaInterface() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // 1. Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 2. Clear any pre-existing hash (Sigma mode may have set one)
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // 3. Check if we're returning from a detail page (has saved scroll position)
    const savedScroll = sessionStorage.getItem("alpha_scroll_position");
    const targetScroll = savedScroll ? parseInt(savedScroll, 10) : 0;

    // Clear the saved position so it doesn't persist on next mount
    if (savedScroll) {
      sessionStorage.removeItem("alpha_scroll_position");
    }

    // 4. Restore scroll position (to top for fresh loads, to saved position for returns)
    const restoreScroll = () => {
      const el = scrollRef.current;
      if (el) {
        el.style.scrollBehavior = "auto"; // temporarily disable smooth
        el.scrollTop = targetScroll;
        el.scrollLeft = 0;
      }
      // Also set window scroll as safety net
      if (targetScroll === 0) {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }
    };

    // Run immediately + on multiple frames to defeat any deferred scroll
    restoreScroll();
    requestAnimationFrame(restoreScroll);
    requestAnimationFrame(() => requestAnimationFrame(restoreScroll));

    const timers = [
      setTimeout(restoreScroll, 50),
      setTimeout(restoreScroll, 150),
      setTimeout(restoreScroll, 300),
      setTimeout(restoreScroll, 600),
      setTimeout(restoreScroll, 1200),
      setTimeout(restoreScroll, 2000),
    ];

    // 5. Re-enable smooth-scroll for anchor navigation (after initial scroll is locked in)
    const reenableSmooth = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.style.scrollBehavior = "smooth";
      }
    }, 2500);

    // 6. Hash navigation handler — ONLY for user-initiated hashchange events
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    };
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      timers.forEach(clearTimeout);
      clearTimeout(reenableSmooth);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      data-alpha-scroll
      data-mode="alpha"
      className="alpha-mode absolute inset-0 overflow-y-auto overflow-x-hidden bg-background"
      style={{ scrollBehavior: "auto" }}
    >
      <ScrollProgress />
      {/* Slim mini-nav that appears after the hero card scrolls out of view.
          Full nav is integrated INTO the hero card itself (see AlphaHero). */}
      <AlphaMiniNav />
      {/* LOOP-3-AGENTIC-SEO: <main> wraps the page's primary content (AlphaHero
          through AlphaContact) — provides the single per-page main landmark
          that Lighthouse SEO + AI crawlers + screen readers expect. AlphaMiniNav
          (sticky chrome) + AlphaFooter (page-level contentinfo footer) stay
          OUTSIDE <main> as site chrome. */}
      <main id="main-content" data-section="main" className="contents">
        <AlphaHero />
        <AlphaAbout />
        <AlphaServices />
        <AlphaPortfolio />
        <AlphaProcess />
        <AlphaTeam />
        <AlphaTech />
        <AlphaTestimonials />
        <AlphaInsights />
        <AlphaContact />
      </main>
      <AlphaFooter />
    </div>
  );
}
