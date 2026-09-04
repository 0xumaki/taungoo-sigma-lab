"use client";

import * as React from "react";
import { AlphaMiniNav } from "./AlphaNav";
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
import {
  captureAlphaReturn,
  clearAlphaReturn,
  readAlphaReturn,
} from "@/lib/sigma/scroll-return";

// Scroll progress bar component
function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const container = document.querySelector("[data-alpha-scroll]");
    if (!container) return;
    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[86] h-0.5 w-full bg-transparent">
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${progress}%`, background: "#FF4500" }}
      />
    </div>
  );
}

// How long the restore is allowed to keep nudging the container before it
// gives up and hands control back to the user.
const RESTORE_DEADLINE_MS = 2500;
// Frames the layout must hold still before we trust the restored offset.
const STABLE_FRAMES_TO_SETTLE = 3;
// Frames of a stable layout after which we accept "as close as we can get".
const STABLE_FRAMES_TO_GIVE_UP = 30;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * AlphaInterface — the traditional scrolling website interface.
 *
 * SCROLL RESTORATION (rewritten)
 * ------------------------------
 * Returning from `/services/[slug]` used to land on the hero instead of the
 * services grid. The old code trusted a single sessionStorage pixel value,
 * consumed it on read, and threw away the `/#services` hash before reading it.
 * See `src/lib/sigma/scroll-return.ts` for the full post-mortem.
 *
 * The restore now:
 *   1. Reads the incoming hash FIRST (detail pages link back with `/#services`).
 *   2. Hydrates a module-level return cache, so remounts can't see a spent key.
 *   3. Resolves the target from the LIVE DOM every frame — a section id is
 *      immune to images/webfonts/lazy cards landing after the first paint,
 *      whereas a stale pixel value is permanently clamped by a short
 *      `scrollHeight`.
 *   4. Re-applies until the offset is reached AND the layout stops growing.
 *   5. Bails the instant the user touches the wheel / screen / keyboard, and
 *      re-enables smooth scrolling as soon as it is done (not on a fixed
 *      2500ms timer, which used to fight the user for two whole seconds).
 *
 * Earlier fix still in force: the container's `scroll-behavior: smooth` is
 * disabled during restore, because it used to animate the scroll-to-top from a
 * non-zero position and read as "the page scrolled DOWN to section 3".
 */
export function AlphaInterface() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 1. Snapshot the hash BEFORE clearing it — it is the most reliable
    //    "where was I" signal, and it is gone the moment we replaceState.
    const incomingHash = window.location.hash.replace(/^#/, "");

    // 2. Hydrate the return cache (remount-safe — see scroll-return.ts).
    const pendingReturn = readAlphaReturn();

    if (incomingHash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    // 3. Resolve what we're aiming at. The saved section wins (it's where the
    //    user actually was); the hash is the fallback for deep links straight
    //    into a detail page; the pixel offset is the final fallback.
    const targetSection = pendingReturn?.section ?? (incomingHash || null);
    const targetScroll = pendingReturn?.scroll ?? 0;
    const wantsRestore = Boolean(targetSection) || targetScroll > 0;

    let cancelled = false;
    let raf = 0;
    let lastHeight = -1;
    let stableFrames = 0;
    const startedAt = performance.now();

    const stop = () => {
      if (cancelled) return;
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      const container = scrollRef.current;
      if (container) {
        container.style.scrollBehavior = "smooth";
        container.removeEventListener("wheel", stop);
        container.removeEventListener("touchstart", stop);
        container.removeEventListener("pointerdown", stop);
      }
      window.removeEventListener("keydown", onKey);
      // Memory spent — a later mode switch back into Alpha starts at the top.
      clearAlphaReturn();
    };

    function onKey(e: KeyboardEvent) {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "PageUp" ||
        e.key === "PageDown" ||
        e.key === "Home" ||
        e.key === "End" ||
        e.key === " " ||
        e.key === "Spacebar"
      ) {
        stop();
      }
    }

    /**
     * Recomputed every frame, so late layout can't leave us stranded.
     *
     * Returns `null` while a section id is set but that section is not in the
     * DOM yet. That distinction matters: collapsing to the (possibly 0) pixel
     * fallback would let the loop "succeed" at scrollTop 0 and strand the user
     * on the hero — the exact bug this rewrite exists to kill.
     */
    const resolveTarget = (container: HTMLElement): number | null => {
      if (targetSection) {
        let node: HTMLElement | null = null;
        try {
          node = container.querySelector<HTMLElement>(
            `#${CSS.escape(targetSection)}`,
          );
        } catch {
          node = null;
        }
        if (!node) node = document.getElementById(targetSection);
        if (!node) return null; // section hasn't mounted yet — keep waiting
        const delta =
          node.getBoundingClientRect().top -
          container.getBoundingClientRect().top;
        return Math.max(0, Math.round(container.scrollTop + delta));
      }
      return targetScroll;
    };

    const tick = () => {
      if (cancelled) return;
      const container = scrollRef.current;
      if (!container) {
        stop();
        return;
      }

      const maxScroll = Math.max(
        0,
        container.scrollHeight - container.clientHeight,
      );
      const target = resolveTarget(container);

      if (target !== null) {
        container.style.scrollBehavior = "auto";
        container.scrollTop = target;
        container.scrollLeft = 0;
      }

      const heightStable = container.scrollHeight === lastHeight;
      lastHeight = container.scrollHeight;
      stableFrames = heightStable ? stableFrames + 1 : 0;

      // `scrollTop` is clamped by the browser, so compare against what was
      // actually achievable this frame rather than what we asked for.
      const reached =
        target !== null &&
        Math.abs(container.scrollTop - Math.min(target, maxScroll)) <= 1;

      if (reached && stableFrames >= STABLE_FRAMES_TO_SETTLE) {
        stop();
        return;
      }
      // Layout has settled but the target is still out of reach — the section
      // never mounted, or the content is shorter than when we left. Accept the
      // best offset we managed and hand control back.
      if (stableFrames >= STABLE_FRAMES_TO_GIVE_UP && maxScroll > 0) {
        stop();
        return;
      }
      if (performance.now() - startedAt > RESTORE_DEADLINE_MS) {
        stop();
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    if (wantsRestore) {
      // Hand control back the moment the user takes it.
      scrollRef.current?.addEventListener("wheel", stop, { passive: true });
      scrollRef.current?.addEventListener("touchstart", stop, { passive: true });
      scrollRef.current?.addEventListener("pointerdown", stop, { passive: true });
      window.addEventListener("keydown", onKey);
      tick();
    } else {
      // Fresh load — pin to the top, no restore dance required.
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      const container = scrollRef.current;
      if (container) {
        container.style.scrollBehavior = "auto";
        container.scrollTop = 0;
        container.scrollLeft = 0;
      }
      clearAlphaReturn();
    }

    // 4. Hash navigation handler — ONLY for user-initiated hashchange events
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    };
    window.addEventListener("hashchange", handleHash);

    // 5. Capture "where am I" for EVERY outbound link, whatever component
    //    rendered it — PageTransitionLink cards, plain <Link>s in the footer,
    //    the basket's deep links. A capture-phase document listener sees them
    //    all, so the back-link on a detail page doesn't have to carry state.
    const onOutboundClick = (e: MouseEvent) => {
      const container = scrollRef.current;
      if (!container) return;
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const node = e.target as HTMLElement | null;
      const link = node?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      if (link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;
      const href = link.getAttribute("href");
      if (!href) return;
      // In-page anchors and non-http schemes never unmount this interface.
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      captureAlphaReturn(container);
    };
    document.addEventListener("click", onOutboundClick, true);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      cancelled = true;
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onOutboundClick, true);
      const container = scrollRef.current;
      container?.removeEventListener("wheel", stop);
      container?.removeEventListener("touchstart", stop);
      container?.removeEventListener("pointerdown", stop);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      data-alpha-scroll
      data-mode="alpha"
      className="alpha-mode absolute inset-0 overflow-y-auto overflow-x-hidden bg-background"
      style={{ scrollBehavior: "auto" }}
    >
      <ScrollProgress />
      {/* Slim mini-nav that appears after the hero card scrolls out of view.
          Full nav is integrated INTO the hero card itself (see AlphaHero). */}
      <AlphaMiniNav />
      {/* LOOP-3-AGENTIC-SEO: <main> wraps the page's primary content (AlphaHero
          through AlphaContact) — provides the single per-page main landmark
          that Lighthouse SEO + AI crawlers + screen readers expect. AlphaMiniNav
          (sticky chrome) + AlphaFooter (page-level contentinfo footer) stay
          OUTSIDE <main> as site chrome. */}
      <main id="main-content" data-section="main" className="contents">
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
      </main>
      <AlphaFooter />
    </div>
  );
}
