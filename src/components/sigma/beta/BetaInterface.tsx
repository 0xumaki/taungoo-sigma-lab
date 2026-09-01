"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Hero } from "./Hero";
import { NavBar } from "./NavBar";
import { Services } from "./Services";
import { Portfolio } from "./Portfolio";
import { Method } from "./Method";
import { Insights } from "./Insights";
import { Team } from "./Team";
import { Testimonials } from "./Testimonials";
import { Contact } from "./Contact";
import { SectionDivider } from "./SectionDivider";
import { BetaReticleCursor } from "./BetaReticleCursor";
import { useScrollReveal } from "./useScrollReveal";
import { BetaBootSequence } from "./BetaBootSequence";
import { ServiceBasket } from "../alpha/ServiceBasket";

const BETA_THEME_KEY = "beta-theme";

export function BetaInterface() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  useScrollReveal();

  React.useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    const savedScroll = sessionStorage.getItem("beta_scroll_position");
    const targetScroll = savedScroll ? parseInt(savedScroll, 10) : 0;
    if (savedScroll) sessionStorage.removeItem("beta_scroll_position");
    const restoreScroll = () => { if (scrollRef.current) scrollRef.current.scrollTop = targetScroll; };
    const timers = [setTimeout(restoreScroll, 50), setTimeout(restoreScroll, 300)];
    const reenableSmooth = setTimeout(() => { if (scrollRef.current) scrollRef.current.style.scrollBehavior = "smooth"; }, 1500);
    const handleHash = () => {
      const hash = window.location.hash; if (!hash) return;
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    };
    window.addEventListener("hashchange", handleHash);
    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]");
      if (link) { const href = link.getAttribute("href"); if (href && href.startsWith("/") && !href.startsWith("#")) { if (scrollRef.current) sessionStorage.setItem("beta_scroll_position", scrollRef.current.scrollTop.toString()); } }
    };
    document.addEventListener("click", onClickCapture, true);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      document.removeEventListener("click", onClickCapture, true);
      timers.forEach(clearTimeout); clearTimeout(reenableSmooth);
    };
  }, []);

  return (
    <>
    {/* Custom cursor — OUTSIDE scroll container for proper fixed positioning */}
    <BetaReticleCursor />
    <div
      ref={scrollRef}
      data-beta-scroll
      data-mode="beta"
      className="beta-mode absolute inset-0 overflow-y-auto overflow-x-hidden"
      style={{ scrollBehavior: "auto" }}
    >
      {/* Skip-to-content link lives in ExperienceShell (above the mode
          switcher in DOM order) so it's the first focusable element.
          Visually hidden until focused (keyboard-only). See globals.css
          `.bs-skip-link` for the slide-in-on-focus styling. */}
      {/* Inner flex column wrapper — ensures the footer (inside <Contact>)
          sticks to the bottom of the viewport on short pages. min-h-full
          = 100% of the scroll container (= viewport height when content is
          short, grows with content when it's tall). The Contact section uses
          `mt-auto` to push itself + footer to the bottom of this wrapper. */}
      <div className="flex min-h-full flex-col">
        <ScrollProgress />
        <NavBar />
        {/* System heartbeat — signature ambient element */}
        <div className="bs-heartbeat" />
        <BetaBootSequence />
        {/* LOOP-3-AGENTIC-SEO: <main> wraps the page's primary content (Hero
            through Contact + footer) — provides the single per-page main
            landmark that Lighthouse SEO + AI crawlers + screen readers expect.
            NavBar + ServiceBasket stay outside <main> as site chrome. The
            inner footer (inside Contact) carries role="contentinfo" so it's
            still recognized as the page-level footer landmark despite being
            nested inside <main> (HTML5 allows this pattern). */}
        <main id="main-content" data-section="main" className="contents">
          <Hero />
          <SectionDivider from="01" to="02" label="SERVICES" />
          <Services />
          <SectionDivider from="02" to="03" label="WORK" />
          <Portfolio />
          <SectionDivider from="03" to="04" label="METHOD" />
          <Method />
          <SectionDivider from="04" to="06" label="INSIGHTS" />
          <Insights />
          <SectionDivider from="06" to="07" label="TEAM" />
          <Team />
          <SectionDivider from="07" to="08" label="VOICES" />
          <Testimonials />
          <SectionDivider from="08" to="09" label="CONTACT" />
          <Contact />
        </main>
        {/* Service quote basket — gold-accented for beta mode. Mounting it here gives
            the ADD TO QUOTE buttons in the Services section a visible effect: floating
            basket button + RFQ modal + badge count. */}
        <ServiceBasket accent="#D4AF37" />
      </div>
    </div>
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div className="fixed left-0 top-0 z-[86] h-[2px] w-full" style={{ scaleX, background: "var(--beta-accent)", transformOrigin: "0%" }} />
  );
}
