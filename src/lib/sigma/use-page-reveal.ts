"use client";

import * as React from "react";
import { usePageTransition } from "@/lib/sigma/page-transition";

/**
 * usePageReveal — call this on detail page mount to trigger the reveal animation.
 *
 * When a detail page mounts after a PageTransitionLink click, the overlay is
 * still covering the screen (cover animation complete, panels down). This hook
 * triggers startReveal() which plays the retract animation, revealing the new page.
 *
 * If there's no pending cover (e.g. user landed directly via URL), this is a no-op.
 */
export function usePageReveal() {
  const isCovering = usePageTransition((s) => s.isCovering);
  const isRevealing = usePageTransition((s) => s.isRevealing);
  const startReveal = usePageTransition((s) => s.startReveal);
  const reset = usePageTransition((s) => s.reset);

  React.useEffect(() => {
    // Only trigger reveal if we were covering (i.e. came from a PageTransitionLink click)
    if (isCovering) {
      // Small delay to ensure the new page's DOM is fully painted before retract
      const t = setTimeout(() => {
        startReveal();
      }, 60);
      return () => clearTimeout(t);
    }
    // If overlay is in a weird state (revealing without cover), reset it
    if (isRevealing) {
      const t = setTimeout(() => {
        reset();
      }, 200);
      return () => clearTimeout(t);
    }
  }, []);
}
