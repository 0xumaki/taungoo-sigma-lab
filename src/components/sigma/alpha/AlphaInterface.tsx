"use client";

import * as React from "react";
import { AlphaNav } from "./AlphaNav";
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
 * Uses scroll-behavior: smooth for anchor navigation.
 */
export function AlphaInterface() {
  React.useEffect(() => {
    // When switching to Alpha mode, scroll to top (hero)
    const container = document.querySelector("[data-alpha-scroll]");
    if (container) {
      container.scrollTo({ top: 0, behavior: "auto" });
    }
    // Also scroll the window to top
    window.scrollTo({ top: 0, behavior: "auto" });
    // Handle hash navigation
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div
      data-alpha-scroll
      className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-background"
      style={{ scrollBehavior: "smooth" }}
    >
      <ScrollProgress />
      <AlphaNav />
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
