"use client";

import { create } from "zustand";

// Page transition types — what kind of destination we're navigating to
export type TransitionKind = "service" | "project" | "insight";

export interface PageTransitionState {
  // Whether the cover animation is currently active (panels down + label visible)
  isCovering: boolean;
  // Whether the reveal animation is in progress (panels retracting on new page mount)
  isRevealing: boolean;
  // The destination label (Service name / Project name / Blog title) shown mid-transition
  label: string;
  // The category prefix shown above the label ("SERVICE" / "PROJECT" / "INSIGHT")
  kind: TransitionKind;
  // Accent color for the cover panels + flash + label
  accent: string;
  // The href to navigate to once the cover is complete
  pendingHref: string | null;
  // Start the cover animation (called by PageTransitionLink on click)
  startCover: (href: string, label: string, kind: TransitionKind, accent?: string) => void;
  // Called by the overlay once the cover animation finishes — caller navigates after this
  // (the overlay itself triggers navigation; this is just a state flag)
  // Mark cover done — overlay uses this internally
  markCoverDone: () => void;
  // Start the reveal animation (called by detail page on mount)
  startReveal: () => void;
  // Reset everything (called after reveal completes)
  reset: () => void;
  // Whether a cover has been requested but not yet completed (used to coordinate navigation timing)
  coverReady: boolean;
}

const DEFAULT_ACCENT = "#FF4500";

export const usePageTransition = create<PageTransitionState>((set) => ({
  isCovering: false,
  isRevealing: false,
  label: "",
  kind: "service",
  accent: DEFAULT_ACCENT,
  pendingHref: null,
  coverReady: false,
  startCover: (href, label, kind, accent = DEFAULT_ACCENT) =>
    set({
      isCovering: true,
      isRevealing: false,
      pendingHref: href,
      label,
      kind,
      accent,
      coverReady: false,
    }),
  markCoverDone: () => set({ coverReady: true }),
  startReveal: () =>
    set({
      isCovering: false,
      isRevealing: true,
      coverReady: false,
    }),
  reset: () =>
    set({
      isCovering: false,
      isRevealing: false,
      pendingHref: null,
      coverReady: false,
      label: "",
    }),
}));

// Accent color palette for different transition kinds
export const KIND_ACCENT: Record<TransitionKind, string> = {
  service: "#FF4500",  // orange (Sigma brand)
  project: "#00FF94",  // lime (success/portfolio)
  insight: "#C6FF00",   // yellow (research/insights)
};

// Category prefix labels
export const KIND_PREFIX: Record<TransitionKind, string> = {
  service: "SERVICE",
  project: "PROJECT",
  insight: "INSIGHT",
};
