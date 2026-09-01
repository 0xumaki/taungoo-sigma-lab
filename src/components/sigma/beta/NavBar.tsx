"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * NavBar — vertical left-edge navigation (unusual, award-winning pattern).
 *
 * Design: A thin vertical bar on the LEFT edge of the screen with:
 * - Logo at top
 * - Vertical section links (rotated 90° or as small dots with labels)
 * - Theme toggle + mode switcher at bottom
 *
 * Inspired by: Awwwards unusual navigation winners + editorial magazine sidebars.
 * This is NOT a standard top nav — it's a persistent left rail.
 */

const LINKS = [
  { id: "top", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" },
  { id: "services", label: "Services", icon: "M4 6h16M4 12h16M4 18h7" },
  { id: "work", label: "Work", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { id: "method", label: "Method", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { id: "insights", label: "Insights", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { id: "team", label: "Team", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { id: "voices", label: "Voices", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { id: "contact", label: "Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export function NavBar() {
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const container = document.querySelector("[data-beta-scroll]");
    if (!container) return;
    const onScroll = () => {
      const scrollPos = container.scrollTop + window.innerHeight / 3;
      let current = 0;
      LINKS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollPos) current = i;
      });
      setActive(current);
    };
    // LOOP-2-LH-BEST-PRACTICES: passive scroll listener (handler only reads
    // active section index, never calls preventDefault). Required for the
    // Lighthouse "uses-passive-event-listeners" audit on Best Practices.
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Left vertical rail — mask-image fades the very top + bottom edges so the
          rail visually dissolves into the page rather than ending abruptly.
          LOOP-3-AGENTIC-SEO: <nav> landmark (was a <div>) with aria-label so
          AI crawlers + screen readers identify the site navigation landmark. */}
      <nav
        aria-label="Site sections"
        className="fixed left-0 top-0 z-[85] hidden h-full w-16 flex-col items-center justify-between py-6 lg:flex"
        style={{
          background: "var(--beta-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRight: "1px solid var(--beta-border)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 5%, #000 95%, transparent)",
          maskImage: "linear-gradient(to bottom, transparent, #000 5%, #000 95%, transparent)",
        }}
      >
        {/* Logo at top */}
        <a href="#top" className="flex items-center justify-center" aria-label="Home">
          <div className="h-8 w-8 flex items-center justify-center" style={{ background: "var(--beta-accent)", borderRadius: "2px" }}>
            <span className="font-sans text-sm font-bold text-black">Σ</span>
          </div>
        </a>

        {/* Vertical section icons */}
        <div className="flex flex-col items-center gap-3">
          {LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex items-center justify-center transition-all bs-nav-active-glow-target"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "4px",
                background: active === i ? "rgba(212, 175, 55, 0.12)" : "transparent",
                border: active === i ? "1px solid rgba(212, 175, 55, 0.4)" : "1px solid transparent",
                boxShadow: active === i ? "0 0 14px rgba(212, 175, 55, 0.25), inset 0 0 8px rgba(212, 175, 55, 0.08)" : "none",
              }}
              aria-label={link.label}
              aria-current={active === i ? "page" : undefined}
            >
              {/* Sliding gold dot — animates between nav icons via Framer Motion layoutId.
                  Renders ONLY on the active button; Framer Motion smoothly slides the dot
                  from the previously-active button to the newly-active one. */}
              {active === i && (
                <motion.span
                  layoutId="bs-nav-active-dot"
                  className="absolute -top-0.5 -right-0.5 h-1 w-1 rounded-full pointer-events-none"
                  style={{ background: "var(--beta-accent)", boxShadow: "0 0 6px var(--beta-accent), 0 0 12px rgba(212, 175, 55, 0.5)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  aria-hidden="true"
                />
              )}

              {/* Label — appears on hover, positioned to the right */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1"
                    style={{
                      color: active === i ? "var(--beta-accent)" : "var(--beta-fg)",
                      background: "var(--beta-bg)",
                      borderRadius: "2px",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* SVG icon — decorative; button has aria-label so the icon
                  is hidden from the a11y tree to avoid double-announce. */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
                style={{
                  color: active === i ? "var(--beta-accent)" : "var(--beta-fg-subtle)",
                  transition: `color var(--dur-fast) var(--ease-out-expo)`,
                }}
              >
                <path d={link.icon} />
              </svg>
            </button>
          ))}
        </div>

        {/* Bottom: mode indicator */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>β</span>
        </div>
      </nav>

      {/* Mobile: top bar with hamburger menu.
          LOOP-3-AGENTIC-SEO: <nav> landmark (was a <div>) with aria-label so
          the mobile top nav is identified as site navigation. */}
      <nav
        aria-label="Site sections"
        className="fixed left-0 right-0 top-0 z-[85] flex h-14 items-center justify-between px-[4%] lg:hidden"
        style={{
          background: "var(--beta-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--beta-border)",
        }}
      >
        <a href="#top" className="flex items-center gap-2" aria-label="Home">
          <div className="h-6 w-6 flex items-center justify-center" style={{ background: "var(--beta-accent)", borderRadius: "2px" }}>
            <span className="font-sans text-[10px] font-bold text-black">Σ</span>
          </div>
          <span className="font-mono text-[11px] font-bold tracking-[0.15em]" style={{ color: "var(--beta-fg-strong)" }}>TAUNGOO</span>
        </a>

        {/* Hamburger button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center"
          style={{
            border: `1px solid ${mobileOpen ? "rgba(212, 175, 55, 0.5)" : "var(--beta-border)"}`,
            borderRadius: "2px",
            background: mobileOpen ? "rgba(212, 175, 55, 0.08)" : "transparent",
          }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="flex flex-col gap-[3px]">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-4"
              style={{ background: mobileOpen ? "var(--beta-accent)" : "var(--beta-fg)" }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-px w-4"
              style={{ background: "var(--beta-fg)" }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-4"
              style={{ background: mobileOpen ? "var(--beta-accent)" : "var(--beta-fg)" }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile: slide-down drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-0 right-0 top-14 z-[84] lg:hidden"
            style={{
              background: "var(--beta-bg)",
              borderBottom: "1px solid var(--beta-border)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex flex-col py-2">
              {LINKS.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollTo(link.id);
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 px-[6%] py-3 text-left transition-colors"
                  style={{
                    background: active === i ? "rgba(212, 175, 55, 0.08)" : "transparent",
                    borderLeft: active === i ? "2px solid var(--beta-accent)" : "2px solid transparent",
                  }}
                  aria-current={active === i ? "page" : undefined}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                    style={{
                      color: active === i ? "var(--beta-accent)" : "var(--beta-fg-subtle)",
                    }}
                  >
                    <path d={link.icon} />
                  </svg>
                  <span
                    className="font-mono text-[12px] uppercase tracking-[0.15em]"
                    style={{ color: active === i ? "var(--beta-accent)" : "var(--beta-fg)" }}
                  >
                    {link.label}
                  </span>
                  <span className="ml-auto font-mono text-[9px] tracking-[0.2em] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
