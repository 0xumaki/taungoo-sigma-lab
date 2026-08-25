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
 * All 11 sections on one scrollable page, keeping the brutalist design theme.
 * Replaces the Sigma mode's map-based navigation with a standard website layout.
 */
export function AlphaInterface() {
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-background">
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
