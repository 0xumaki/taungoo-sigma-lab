import * as React from "react";

/**
 * Global loading state for Next.js App Router route transitions.
 *
 * NOTE: In Sigma mode, route transitions are handled by the slam-cover
 * PageTransitionOverlay (GSAP panels). Showing a full loading screen here
 * would COLLIDE with that overlay — two transitions fighting. So we render
 * nothing. The slam-cover transition is the only visible transition effect.
 *
 * For non-sigma routes (detail pages), the route swap is instant enough
 * that a loading screen isn't needed — the page transition overlay handles
 * the cover/reveal. Keeping this as null avoids the "loading screen between
 * every transition" bug.
 */
export default function Loading() {
  return null;
}
