"use client";

/**
 * scroll-return — "where was I before I left for a detail page?" memory.
 *
 * WHY THIS EXISTS
 * ---------------
 * Leaving an Alpha service card for `/services/[slug]` and coming back used to
 * land on the hero instead of the services grid. Three independent things could
 * each destroy the restore, which is why the old single sessionStorage key was
 * never reliable:
 *
 *   1. CONSUME-ON-READ. `AlphaInterface` read `alpha_scroll_position` and then
 *      immediately `removeItem`'d it. AlphaInterface is a `next/dynamic` chunk
 *      that mounts a frame *after* `ExperienceShell` flips `mode` from its
 *      `"beta"` default to the saved value — so any remount (mode flicker,
 *      chunk re-entry, React re-parenting) read an already-deleted key, got
 *      `null`, and happily scrolled to 0. The hero.
 *   2. PIXEL-ONLY MEMORY. A raw `scrollTop` is meaningless until every image,
 *      webfont and lazily-mounted card has settled. Set it too early and the
 *      browser clamps it to the current (short) `scrollHeight`; nothing ever
 *      comes back to correct it.
 *   3. DESTROYED HASH. Detail pages link back with `/#services`, but the mount
 *      effect called `history.replaceState` to strip the hash *before* anything
 *      could read it — so the one signal that is always correct was thrown away.
 *
 * THE FIX
 * -------
 *   • Remember BOTH a pixel offset AND the id of the section that owned the
 *     viewport. The section id is recomputed against the live DOM on every
 *     restore attempt, so it self-corrects against late layout.
 *   • Cache the value at MODULE scope after the first read. sessionStorage is
 *     cleared exactly once, on hydration — every later remount reads the cache,
 *     so (1) can't happen.
 *   • Callers decide when the memory is stale (`clearAlphaReturn`), not the
 *     reader.
 */

const SCROLL_KEY = "alpha_scroll_position";
const SECTION_KEY = "alpha_return_section";

export interface AlphaReturnState {
  /** Container-relative pixel offset at the moment we navigated away. */
  scroll: number;
  /** id of the section that owned the viewport (e.g. "services"). */
  section: string | null;
}

/** Module-scope cache — survives remounts within a navigation. */
let pending: AlphaReturnState | null = null;
/**
 * False until `pending` is known to reflect the sessionStorage truth. After
 * that, sessionStorage is dead to us and the module cache is authoritative.
 */
let hydrated = false;

function safeSession(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.sessionStorage : null;
  } catch {
    // Private mode / storage disabled — the module cache still works.
    return null;
  }
}

/**
 * Read (and consume) the pending return state.
 *
 * Safe to call any number of times: only the first call touches
 * sessionStorage, and every later call returns the same cached value. That is
 * what makes remounts harmless.
 */
export function readAlphaReturn(): AlphaReturnState | null {
  if (hydrated) return pending;

  hydrated = true;
  const store = safeSession();
  if (!store) {
    pending = null;
    return pending;
  }

  let scroll = 0;
  let section: string | null = null;
  try {
    const rawScroll = store.getItem(SCROLL_KEY);
    section = store.getItem(SECTION_KEY);
    if (rawScroll !== null) {
      const parsed = Number.parseInt(rawScroll, 10);
      scroll = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
    // Consume now — the module cache carries it from here.
    store.removeItem(SCROLL_KEY);
    store.removeItem(SECTION_KEY);
  } catch {
    scroll = 0;
    section = null;
  }

  pending = scroll > 0 || section ? { scroll, section } : null;
  return pending;
}

/**
 * Stage the return state. Call this on the way OUT (link click), never on the
 * way in. Also mirrors to sessionStorage so a hard reload mid-detail-page still
 * has a chance of restoring.
 */
export function rememberAlphaReturn(scroll: number, section: string | null) {
  const next: AlphaReturnState = {
    scroll: Number.isFinite(scroll) ? Math.max(0, Math.round(scroll)) : 0,
    section: section || null,
  };

  pending = next;
  hydrated = true;

  const store = safeSession();
  if (!store) return;
  try {
    store.setItem(SCROLL_KEY, String(next.scroll));
    if (next.section) store.setItem(SECTION_KEY, next.section);
    else store.removeItem(SECTION_KEY);
  } catch {
    /* storage full or blocked — module cache is enough */
  }
}

/**
 * Mark the memory as spent. Called once the restore has landed (or been
 * abandoned), so a later mode switch back into Alpha starts at the top instead
 * of teleporting to a stale section.
 */
export function clearAlphaReturn() {
  pending = null;
  hydrated = true;
  const store = safeSession();
  if (!store) return;
  try {
    store.removeItem(SCROLL_KEY);
    store.removeItem(SECTION_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Which section currently owns the viewport?
 *
 * Walks `section[id]` children in document order and keeps the last one whose
 * top edge has crossed the upper quarter of the scroll container — i.e. the
 * section the user actually perceives themselves to be in.
 */
export function currentSectionId(container: HTMLElement | null): string | null {
  if (!container) return null;
  const sections = container.querySelectorAll<HTMLElement>("section[id]");
  if (sections.length === 0) return null;

  const originTop = container.getBoundingClientRect().top;
  const probe = originTop + Math.min(140, Math.max(24, container.clientHeight * 0.25));

  let current: string | null = null;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= probe) current = section.id;
  });
  return current;
}

/**
 * Snapshot "where am I" for the given Alpha scroll container. Used by both the
 * capture-phase click listener and `PageTransitionLink`.
 */
export function captureAlphaReturn(container: HTMLElement | null) {
  if (!container) return;
  rememberAlphaReturn(container.scrollTop, currentSectionId(container));
}
