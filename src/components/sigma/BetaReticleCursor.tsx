"use client";

import * as React from "react";

/**
 * BetaReticleCursor — sci-fi red dot scope cursor.
 *
 * - 4px red center dot (instant follow, no lag)
 * - 24px outer scope ring with crosshair ticks
 * - On hover over interactive elements: ring expands to 40px
 * - On mousedown: ring contracts to 16px (scope "focus" effect)
 * - STABLE — zero React state updates during mousemove
 *
 * Robust mounting: checks pointer support on mount AND on resize.
 * If the browser doesn't support `pointer: fine` (headless, touch),
 * the cursor won't render. This is correct behavior — on real desktop
 * browsers with a mouse, it will render.
 */
export function BetaReticleCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAndInit = () => {
      // Check for fine pointer — but ALSO allow if the user has interacted (some browsers don't report pointer: fine initially)
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const wideEnough = window.innerWidth >= 768;
      if (finePointer && wideEnough) {
        setIsMounted(true);
      }
    };

    checkAndInit();

    // Re-check on resize (e.g., user docks/undocks, or initial load timing issue)
    const onResize = () => checkAndInit();
    window.addEventListener("resize", onResize);

    // Instant position update — no state, no RAF, no lag
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
      }
    };

    // Hover detection — toggle body class (CSS handles size change)
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, input, textarea, select, [data-cursor="hover"], [role="button"]');
      document.body.classList.toggle("cursor-hovering", isInteractive);
    };

    const onDown = () => document.body.classList.add("cursor-pressed");
    const onUp = () => document.body.classList.remove("cursor-pressed");
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    // Set initial center position
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    if (dotRef.current) { dotRef.current.style.left = `${cx}px`; dotRef.current.style.top = `${cy}px`; dotRef.current.style.opacity = "1"; }
    if (ringRef.current) { ringRef.current.style.left = `${cx}px`; ringRef.current.style.top = `${cy}px`; ringRef.current.style.opacity = "1"; }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("cursor-hovering", "cursor-pressed");
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Red center dot — 4px, instant follow */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed beta-scope-dot"
        style={{
          left: "-2px",
          top: "-2px",
          zIndex: 99999,
          opacity: 0,
          transition: `opacity var(--dur-fast) var(--ease-out-expo)`,
          willChange: "left, top",
        }}
      />
      {/* Outer scope ring + crosshair ticks — 24px, instant follow */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed beta-scope-ring"
        style={{
          left: "-12px",
          top: "-12px",
          zIndex: 99998,
          opacity: 0,
          transition: `opacity var(--dur-fast) var(--ease-out-expo), width var(--dur-fast) var(--ease-out-expo), height var(--dur-fast) var(--ease-out-expo), margin var(--dur-fast) var(--ease-out-expo)`,
          willChange: "left, top, width, height",
        }}
      />
    </>
  );
}
