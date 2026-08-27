"use client";

import * as React from "react";
import { usePageTransition, KIND_ACCENT, type TransitionKind } from "@/lib/sigma/page-transition";

interface PageTransitionLinkProps {
  href: string;
  label: string;
  kind: TransitionKind;
  accent?: string;
  className?: string;
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
    // Save scroll position so we can restore it when the user comes back
    if (typeof window !== "undefined") {
      const scrollContainer = document.querySelector("[data-alpha-scroll]");
      const scrollTop = scrollContainer?.scrollTop ?? window.scrollY;
      sessionStorage.setItem("alpha_scroll_position", String(scrollTop));
    }
    onBeforeNavigate?.();
    startCover(href, label, kind, finalAccent);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
