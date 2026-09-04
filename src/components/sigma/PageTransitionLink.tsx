"use client";

import * as React from "react";
import { usePageTransition, KIND_ACCENT, type TransitionKind } from "@/lib/sigma/page-transition";
import { captureAlphaReturn } from "@/lib/sigma/scroll-return";

interface PageTransitionLinkProps {
  href: string;
  label: string;
  kind: TransitionKind;
  accent?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onBeforeNavigate?: () => void;
}

/**
 * PageTransitionLink — replaces <Link> for detail page navigations.
 * On click: plays GSAP cover transition with the destination name (Service/Project/Blog title),
 * then navigates via router.push() once the cover is complete.
 *
 * If user has reduced motion preference, navigates immediately.
 */
export function PageTransitionLink({
  href,
  label,
  kind,
  accent,
  className,
  style,
  children,
  onBeforeNavigate,
}: PageTransitionLinkProps) {
  const startCover = usePageTransition((s) => s.startCover);

  const finalAccent = accent ?? KIND_ACCENT[kind];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow modifier-clicks (cmd+click, ctrl+click, middle-click) to open in new tab
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button === 1 ||
      e.button === 2
    ) {
      return; // let the browser handle natively
    }

    // If already on this URL, skip
    if (typeof window !== "undefined" && window.location.pathname === href) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    // Remember where we were so the trip back lands on the same section.
    // Records BOTH the pixel offset and the id of the section that owned the
    // viewport — see src/lib/sigma/scroll-return.ts for why pixels alone were
    // never enough. (AlphaInterface also runs a capture-phase listener that
    // catches plain <Link>s; doing it here too keeps this component correct
    // wherever it is used.)
    if (typeof window !== "undefined") {
      captureAlphaReturn(
        document.querySelector<HTMLElement>("[data-alpha-scroll]"),
      );
    }
    onBeforeNavigate?.();
    startCover(href, label, kind, finalAccent);
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}
