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

/**
 * AlphaInterface — the traditional scrolling website interface.
 * Uses scroll-behavior: smooth for anchor navigation.
 */
export function AlphaInterface() {
  React.useEffect(() => {
    // Enable smooth scroll for the Alpha interface
    const container = document.querySelector("[data-alpha-scroll]");
    if (container) {
      container.scrollTo({ top: 0, behavior: "auto" });
    }
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
