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
    container.addEventListener("scroll", onScroll);
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

    // 3. Force-scroll to top — direct scrollTop assignment bypasses CSS smooth-scroll
    const forceScrollTop = () => {
      const el = scrollRef.current;
      if (el) {
        el.style.scrollBehavior = "auto"; // temporarily disable smooth
        el.scrollTop = 0; // direct property set — always instant
        el.scrollLeft = 0;
      }
      // Also scroll window/body/html to 0 as a safety net
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    // Run immediately + on multiple frames to defeat any deferred scroll
    forceScrollTop();
    requestAnimationFrame(forceScrollTop);
    requestAnimationFrame(() => requestAnimationFrame(forceScrollTop));

    const timers = [
      setTimeout(forceScrollTop, 50),
      setTimeout(forceScrollTop, 150),
      setTimeout(forceScrollTop, 300),
      setTimeout(forceScrollTop, 600),  // after Chidori transition (~4s timeline, mode swap at ~2s)
      setTimeout(forceScrollTop, 1200),
      setTimeout(forceScrollTop, 2000),
      setTimeout(forceScrollTop, 3500),
    ];

    // 4. Re-enable smooth-scroll for anchor navigation (after initial scroll is locked in)
    const reenableSmooth = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.style.scrollBehavior = "smooth";
      }
    }, 4000);

    // 5. Hash navigation handler — ONLY for user-initiated hashchange events
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
      className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-background"
      style={{ scrollBehavior: "auto" }}
    >
      <ScrollProgress />
      {/* Slim mini-nav that appears after the hero card scrolls out of view.
          Full nav is integrated INTO the hero card itself (see AlphaHero). */}
      <AlphaMiniNav />
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
      <AlphaFooter />
    </div>
  );
}
