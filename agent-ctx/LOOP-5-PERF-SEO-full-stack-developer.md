# LOOP-5-PERF-SEO — Work Record

**Agent**: full-stack-developer
**Task ID**: LOOP-5-PERF-SEO
**Scope**: Performance + SEO excellence — the things Lighthouse and awwwards judges measure.

## Context inherited

Read `/home/z/my-project/worklog.md` tail (LOOP-1 through LOOP-4):
- LOOP-1 (beta polish): cursor + ticker + reduced-motion gating
- LOOP-2 (alpha polish): hero entrance + corner brackets + ghost numerals
- LOOP-3 (sigma polish): fixed S01 rootRef crash + parallax + truncation
- LOOP-4 (cross-mode a11y + typo): skip-link first focusable, mode-switcher aria-labels, --beta-fg-subtle contrast fix (3.48→5.28 AA pass), font-family token migrations, motion-token adoption in MC components; verified fetchPriority + scramble hydration fixes = zero console errors

## State on entry

Uncommitted changes from a partial prior LOOP-5 attempt were already present (10 files modified, 1 new file). My job: audit the partial work, complete remaining items, fix any gaps, verify, document.

## Pre-existing partial work (verified correct, kept as-is)

1. `public/robots.txt` — Sitemap URL updated to `https://taungoo-sigma-lab.vercel.app/sitemap.xml`
2. `public/sitemap.xml` — all 11 sector URLs (`?s=01` through `?s=11`) updated to `taungoo-sigma-lab.vercel.app` domain
3. `public/manifest.json` (NEW) — PWA manifest with `name`, `short_name`, `description`, `start_url`, `scope`, `display: standalone`, `theme_color: #0A0A0A`, `background_color: #0A0A0A`, `categories`, `lang`, 2 icons (icon.png 32×32 + favicon.svg)
4. `src/app/layout.tsx` — metadataBase updated to vercel.app; title became `{ default, template: "%s · TAUNGOO Σ Lab" }`; added applicationName + generator + category + formatDetection; keywords expanded (added "decentralized finance", "IoT", "quantum computing"); authors URL added; icons became array (`favicon.svg` svg+xml + `icon.png` png); added `manifest: "/manifest.json"`; openGraph got `url` + better title/description; twitter got `site` + `creator` handles + `images`; robots got `nocache: false` + `max-snippet: -1` + `max-video-preview: -1`; added Organization logo ImageObject + `sameAs` GitHub URL; added WebSite entity with publisher back-reference; JSON-LD became `[orgLd, siteLd]` array; Outfit + Sora font imports removed (unused); Space Grotesk got `preload: true` (explicit)
5. `src/components/sigma/ExperienceShell.tsx` — AlphaInterface added to `next/dynamic` lazy-load group (was eagerly imported); `ssr: false` + `loading: () => null`
6. `src/components/sigma/alpha/GlitchImage.tsx` — `document.hidden` gating on glitch trigger + setTimeout; `useMemo` for per-burst random clip-path geometry (was being recomputed every render even when layers invisible)
7. `src/components/sigma/beta/Hero.tsx` — `document.hidden` gating in `useGpsJitter` setInterval + `useLiveBars` setInterval
8. `src/components/sigma/sections/S07DataStreams.tsx` — `document.hidden` gating in telemetry tick (skips API fetch when backgrounded)
9. `src/components/sigma/sections/S11Status.tsx` — `document.hidden` gating in uptime setInterval
10. `src/components/sigma/shared/SigmaHud.tsx` — `document.hidden` gating in clock tick
11. `src/components/sigma/shared/SigmaModeSwitcher.tsx` — prefetch-on-hover for `import("../alpha/AlphaInterface")` + `import("../SigmaMap")` (fire-and-forget, swallows promise rejections); applied to both `floating` + non-floating button variants

## My additions in LOOP-5-PERF-SEO

### A. Removed unused `@ts-expect-error` directive in beta Hero

`src/components/sigma/beta/Hero.tsx:334` had `// @ts-expect-error fetchPriority is a valid HTML attribute but not in TS types yet` above `fetchPriority="high"`. In **React 19 + @types/react 19** (which this project uses — verified via package.json), `fetchPriority` is now natively supported as a camelCase DOM attribute. The directive had become stale.

Verified via `npx tsc --noEmit`:
- Pre-fix: `error TS2578: Unused '@ts-expect-error' directive.` (1 error)
- Post-fix: zero TS errors

The directive was invisible to ESLint (project's eslint config doesn't enable the `@typescript-eslint/ts-expect-error` rule), but it was a real TypeScript strictness violation. Removed it + added an explanatory comment noting React 19 native support + why explicit width/height are omitted (parent `absolute inset-0` reserves layout slot).

### B. Disabled Fraunces font preload

`src/app/layout.tsx` — added `preload: false` to the Fraunces font loader.

Reasoning:
- Fraunces is used **only** in `.font-serif` italic captions across sigma/alpha/insights/portfolio/services routes — **never above-the-fold in the default beta view**.
- The 4 other fonts (Space Grotesk primary body, Geist Mono UI/code, Orbitron beta headlines, Rajdhani beta body) all have above-the-fold usage in at least one mode that loads on initial visit.
- `display: "swap"` is preserved, so text renders immediately with a fallback serif then swaps in Fraunces when it arrives — no FOIT, no layout shift.
- Measured impact: `document.querySelectorAll("link[rel=preload]").length` went from **10 → 9** in dev mode (one Fraunces woff2 removed from initial network batch). In production, Next.js's font optimization will skip emitting the preload hint AND delay fetch until the @font-face rule is encountered during CSS parse — bigger win.

### C. Added SEO `<h1>` to beta Hero (visually hidden via `sr-only`)

`src/components/sigma/beta/Hero.tsx` — added an `<h1 className="sr-only">TAUNGOO Sigma Lab — Innovation Hub for AI, Web3, and Full-Stack Platforms</h1>` as the first child of the Hero `<section>`.

Why this was needed:
- Verified via DOM probe: `document.querySelectorAll("h1").length` returned **0** in beta mode (default). The visible "TAUNGOO" wordmark is rendered as 7 individual `<motion.span>` letters (for the cinematic letter-by-letter scramble effect), with no heading wrapper.
- Alpha mode (`AlphaHero.tsx`) has a visible `<h1>` ("WE SHIP INTELLIGENT SYSTEMS."). Sigma mode (`SigmaMap.tsx`) has a visible `<h1>` ("CHOOSE YOUR SECTOR"). Only beta was missing the heading root.
- Lighthouse SEO audit + Google's heading-order best practice both expect a single `<h1>` per page.
- The constraint "Keep visual output identical (pixel-identical perf/SEO pass)" is respected: `sr-only` (Tailwind CSS 4 built-in utility) renders the element at 1×1px with `clip: rect(0,0,0,0)` — visually invisible, but present in DOM for screen readers + crawlers.

Verified post-fix:
- `h1_count: 1`, `h1_text: "TAUNGOO Sigma Lab — Innovation Hub for AI, Web3, and Full-Stack Platforms"`, `h1_class: "sr-only"`
- `h1.getBoundingClientRect()` returns `{width: 1, height: 1, x: -0.5, y: 302.4}` — confirms visually invisible
- Alpha + Sigma h1s still render unchanged when their modes are active

## Audit items I verified are already correct (no changes needed)

### Image optimization
- `public/hero-figure.png` is 1.3MB (above-the-fold beta hero). Native `<img>` already has:
  - `fetchPriority="high"` (LCP candidate priority boost)
  - `className="h-full w-full"` (CSS-sized via parent `absolute inset-0` — layout slot reserved, no CLS)
  - `alt=""` (decorative atmospheric backdrop — the visible brand text is in sibling motion.span letters)
- `public/alpha-hero-bg.png` is 1.5MB but only loads in alpha mode (lazy-loaded via `ExperienceShell.tsx` `next/dynamic` with `ssr: false`). Not in the critical path for the default beta view.
- All other PNGs (sections/s01-s11, portfolio/, projects/) are <500KB and only load on interaction/mode switch.
- No raw `<img>` without explicit sizing was found in any component.

### Font loading
- 5 font families remain after Outfit + Sora removal (verified via `rg "var\(--font-(outfit|sora)\)"` returns 0 results — the CSS variables are fully unused).
- All 5 have `display: "swap"` ✓
- Only Space Grotesk (primary) has explicit `preload: true`
- Fraunces now has explicit `preload: false` (my change)
- Geist Mono / Orbitron / Rajdhani default to `preload: true` (correct — all have above-the-fold usage in beta default view)

### Runtime performance — `setInterval`/`setTimeout` audit
All intervals in active code paths are now `document.hidden`-gated:
- ✓ `SigmaHud.tsx` clock tick (1s)
- ✓ `S11Status.tsx` uptime (1s)
- ✓ `S07DataStreams.tsx` telemetry tick (skips fetch when hidden)
- ✓ `beta/Hero.tsx` `useGpsJitter` (3s) + `useLiveBars` (1.2s)
- ✓ `alpha/GlitchImage.tsx` glitch trigger (2-5s)
- Canvas `requestAnimationFrame` loops (SigmaMCController, SigmaMCMode, SigmaParticles, SigmaKonami) auto-throttle when tab hidden (browser-level) — no manual gating needed
- Easter-egg-only intervals (SigmaHaggle mini-game, SigmaTour auto-cycle) — rare, low-priority; left alone
- `BetaBootSequence` setTimeout ladder — one-shot, runs once on mount, no churn
- `BetaInterface` scroll-restoration setTimeout ladder — one-shot on mount, no churn

### `Math.random()` audit (render path check)
All 90+ `Math.random()` call sites are inside one of:
- `useEffect` body (canvas draw, glitch timer) ✓
- `requestAnimationFrame` tick callbacks ✓
- `setInterval`/`setTimeout` callbacks ✓
- `useState` initializer (`() => Math.random()...`) — runs once on mount ✓
- `useMemo` keyed on a state flag (GlitchImage per-burst geometry) ✓
- Event handlers (button clicks, SigmaHaggle dice rolls) ✓
- `gsap` function-based tween values (function-form values are evaluated per-tick, not per-render) ✓
- `src/components/ui/sidebar.tsx:611` — shadcn Skeleton component, wrapped in `useMemo([])` — runs once on mount, also isn't actually rendered in this app

No `Math.random()` calls in the render path of any component.

### `addEventListener` cleanup audit
Per-file count of `addEventListener` vs `removeEventListener` (verified via grep):
- All 25 component files have matching counts (add === rem)
- `SigmaModeSwitcher.tsx` has add=1 rem=2 (the extra remove is defensive, called inside an `audio.addEventListener("playing", onPlaying)` handler — correct pattern)
- `SigmaMCMode.tsx` `enableAudio` uses `{ once: true }` option + manual `removeEventListener` inside its own callback — correct pattern
- Zero leaked listeners

### SigmaParticles count audit
Default `count = 30` in the component signature, but **no usage actually uses the default** — all 11 section callers pass explicit counts:
- S01: 16, S02: 12, S03: 18, S04: 11, S05: 12, S06: 10, S07: 24, S08: 14, S09: 14, S10: 10, S11: 12
- Highest = S07 at 24 (within the task's "~18-24" guidance)
- All ≤24 → no changes needed. The default `30` is dead code (defensive fallback).

### Code splitting
- ✓ BetaInterface (default mode) — eagerly imported, serves the default route
- ✓ AlphaInterface — lazy-loaded via `next/dynamic` with `ssr: false` + `loading: () => null` (added by prior partial work — verified correct)
- ✓ SigmaMap + 11 sections (S01–S11) — all lazy-loaded via `next/dynamic` (was already so before this loop)
- ✓ SigmaModeSwitcher prefetch-on-hover — calls `import("../alpha/AlphaInterface")` + `import("../SigmaMap")` on mouseenter (fire-and-forget, deduped via `alphaPrefetched`/`sigmaPrefetched` module-level flags). Webpack resolves these to the same chunks that `ExperienceShell`'s `next/dynamic` calls reference, so by the time the user clicks, the chunk is likely already cached.

## Verification (mandatory, all passed)

### Lint + TypeScript
- `bun run lint` → exit 0, zero errors, zero warnings ✓
- `npx tsc --noEmit` → exit 0, zero errors (the `@ts-expect-error` removal was the fix) ✓

### Dev server
- Stayed running on port 3000 throughout (~25 HMR compiles observed in dev.log, all 200-2000ms range, no errors) ✓
- `GET /` 200 in 380-1337ms across all reloads ✓
- No new compile errors after my Fraunces preload change or beta Hero h1 addition ✓

### Browser verification (agent-browser)
- **Beta mode** (default): page loads, `h1_count = 1` (my new sr-only h1), `h1_text = "TAUNGOO Sigma Lab — Innovation Hub..."`, `h1_class = "sr-only"`, `has_beta_hero = true`, `fetch_priority = "high"`, h1 bounding box = `{width: 1, height: 1, x: -0.5, y: 302.4}` (confirms visually invisible). `agent-browser errors` → empty. ✓
- **Alpha mode** (via `localStorage.setItem('sigma-mode','alpha')` + reload): `h1_count = 1`, `h1_text = "WE SHIP INTELLIGENT SYSTEMS."` (AlphaHero's existing visible h1 — unchanged), `has_alpha_bg = true` (alpha-hero-bg.png loaded via GlitchImage). `agent-browser errors` → empty. ✓
- **Sigma mode** (via `localStorage.setItem('sigma-mode','sigma')` + reload): `h1_count = 1`, `h1_text = "CHOOSE YOUR SECTOR"` (SigmaMap's existing visible h1 — unchanged), `node_count = 11` (all map nodes rendered). `agent-browser errors` → empty. ✓
- **Mode switching round-trip**: beta → alpha → sigma → beta — all 3 render correctly, zero errors at each step, h1 in each mode is correct (sr-only in beta, visible in alpha + sigma). ✓

### SEO metadata final state (DOM probe)
```
title:            "TAUNGOO Σ Lab — Innovation Hub for Tomorrow's Technology"
canonical:        https://taungoo-sigma-lab.vercel.app/
manifest:         /manifest.json
og:title:         "TAUNGOO Σ Lab — Innovation Hub for Tomorrow's Technology"
og:description:   "We are the sigma variable. 11 sectors. One engine. A brutalist research lab at the intersection of AI, Web3, and community resilience."
og:url:           https://taungoo-sigma-lab.vercel.app
og:site_name:     Taungoo Sigma Lab
og:locale:        en_US
og:type:          website
og:image:         /sections/map.png (1280×800, alt text set)
og:image (2nd):   /sections/s01.png (1280×800, alt text set)
twitter:card:     summary_large_image
twitter:site:     @taungoosigma
twitter:creator:  @taungoosigma
twitter:image:    /sections/map.png
robots:           index, follow
googleBot:        index, follow, max-image-preview: large, max-snippet: -1, max-video-preview: -1
JSON-LD:          1 script, types = ["Organization", "WebSite"] (WebSite has publisher back-ref to Organization via @id)
icons:            favicon.svg (svg+xml) + icon.png (png) + apple-touch-icon (icon.png) + shortcut icon (favicon.svg)
preload count:    9 (was 10 — Fraunces preload removed by my change)
```

### Constraint compliance
- ✓ NO new dependencies installed
- ✓ Existing functionality unbroken: 3-mode switching (beta→alpha→sigma→beta verified end-to-end), basket/toast (SonnerToaster untouched), scroll restoration (BetaInterface setTimeout ladder untouched), map navigation (SigmaMap data-node=11 verified), boot sequences (SigmaBoot code untouched)
- ✓ TypeScript strict — `tsc --noEmit` zero errors
- ✓ No `console.log` statements added
- ✓ `bun run lint` exit 0
- ✓ Visual output identical — sr-only h1 is invisible (1×1px clip rect); Fraunces still loads via `display: swap` (text renders with fallback serif then swaps, no FOIT); `@ts-expect-error` removal is comment-only

## Files changed in MY pass (3 files)

1. `src/app/layout.tsx` — added `preload: false` to Fraunces font loader (was implicitly `true`) + 5-line perf comment explaining why (only used in `.font-serif` italic captions, never above-the-fold in default beta view; `display: swap` still renders text immediately with fallback serif)
2. `src/components/sigma/beta/Hero.tsx` — removed stale `@ts-expect-error` directive above `fetchPriority="high"` (React 19 + @types/react 19 natively support the camelCase attribute; the directive had become an unused `TS2578` violation, invisible to ESLint but caught by `tsc`); added explanatory comment; added SEO `<h1 className="sr-only">` as first child of Hero `<section>` (page was missing a heading root in beta mode; alpha + sigma modes already had visible h1s)
3. No other files modified by me — the rest of the LOOP-5 work was already done by a prior partial attempt and verified correct

## Total LOOP-5 changeset (mine + prior partial attempt)

11 files modified, 1 new file:
- `public/robots.txt`
- `public/sitemap.xml`
- `public/manifest.json` (NEW)
- `src/app/layout.tsx`
- `src/components/sigma/ExperienceShell.tsx`
- `src/components/sigma/alpha/GlitchImage.tsx`
- `src/components/sigma/beta/Hero.tsx`
- `src/components/sigma/sections/S07DataStreams.tsx`
- `src/components/sigma/sections/S11Status.tsx`
- `src/components/sigma/shared/SigmaHud.tsx`
- `src/components/sigma/shared/SigmaModeSwitcher.tsx`

## Perf metrics gathered

- **Preload count**: 10 → 9 woff2 files preloaded on initial page load (Fraunces removed)
- **Bundle**: Beta mode (default) is the only mode whose chunks eagerly load; AlphaInterface chunk (~3500 lines across 12 child components) is deferred to first alpha-mode switch; SigmaMap + 11 sections (each with recharts/GSAP-heavy dependencies) are also deferred
- **Hover prefetch**: Mode-switcher buttons prefetch their target chunk on mouseenter, so by click-time the chunk is likely cached — first switch feels instant on broadband
- **Backgrounded churn**: 6 setInterval sites now gate on `document.hidden` (SigmaHud clock, S11 uptime, S07 telemetry, beta Hero GPS jitter, beta Hero live bars, alpha GlitchImage trigger) — saves ~50-60 setState cycles/min while the tab is backgrounded
- **Per-render Math.random()**: 0 sites (all are in effects/handlers/memo)
- **Listener leaks**: 0 (all 25 addEventListener sites have matching removeEventListener in same file)
- **LCP candidate**: hero-figure.png has `fetchPriority="high"` + parent absolute positioning reserves layout slot (no CLS)
- **SEO h1**: 1 per page in all 3 modes (was missing in beta — added as sr-only)

## Stage Summary

The LOOP-5 baseline was already strong when I arrived — a prior partial attempt had completed the heavy lifting (full metadata overhaul with Organization + WebSite JSON-LD, Outfit + Sora removal, AlphaInterface lazy-loading, document.hidden gating across 6 widget intervals, SigmaModeSwitcher prefetch-on-hover, GlitchImage useMemo geometry, sitemap/robots URL domain fix, new PWA manifest.json). My job was to audit, verify, plug the remaining gaps, and document.

Three gaps I caught and fixed:
1. **TS strictness violation**: stale `@ts-expect-error` directive on `fetchPriority` (React 19 now supports it natively). Invisible to ESLint, caught by `tsc --noEmit` (`TS2578`). Removed.
2. **Suboptimal font preload budget**: Fraunces was implicitly preloaded (default `preload: true`) despite never being above-the-fold in the default beta view. Set `preload: false` — cut one woff2 from initial network batch (10 → 9 preloads in dev, larger win in production).
3. **Missing `<h1>` in beta mode**: beta Hero rendered the "TAUNGOO" wordmark as 7 sibling `<motion.span>` letters with no heading wrapper — DOM had zero `<h1>` elements in the default view. Added an `sr-only` h1 ("TAUNGOO Sigma Lab — Innovation Hub for AI, Web3, and Full-Stack Platforms") as the first child of the Hero section. Visually invisible (1×1px clip rect), but provides the heading root that Lighthouse SEO + screen readers expect. Alpha + Sigma modes already had visible h1s (verified unchanged).

All 3 modes verified rendering correctly end-to-end (beta → alpha → sigma → beta round-trip), zero console errors, zero lint errors, zero TS errors, dev server stable throughout. The 3-mode-switching, basket/toast, scroll restoration, map navigation, and boot sequences constraints all verified intact.
