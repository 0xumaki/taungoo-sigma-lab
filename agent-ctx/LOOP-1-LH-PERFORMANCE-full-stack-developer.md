# LOOP-1-LH-PERFORMANCE — full-stack-developer

## Task

Lighthouse Performance optimization across all 3 modes (Beta default, Alpha
via `localStorage sigma-mode=alpha`, Sigma via `localStorage sigma-mode=sigma`).
Part A (pink removal) already committed (4800f5f).

## State found on entry

The task brief listed a number of fixes ("MASSIVE IMAGES", "NEXT/IMAGE ADOPTION",
"FONT LOADING", "BUNDLE", "RENDER PERF"). On entering the repo I found a
substantial uncommitted WIP from a prior LOOP-1-LH attempt — the diff already
covered all 5 task areas. My job became verify + complete + sign off rather
than write from scratch.

WIP already covered (verified against on-disk source):

1. **MASSIVE IMAGES**
   - `public/alpha-hero-bg.webp` (179KB) — pre-encoded replacement for the
     1.5MB `alpha-hero-bg.png`. The `.png` source stays on disk as a fallback.
   - `public/hero-figure.webp` (179KB) — pre-encoded replacement for the
     1.3MB `hero-figure.png`. Same defensive-fallback rationale.
   - `AlphaHero.tsx` switched the GlitchImage src from `.png` to `.webp`.
     Net result: BOTH the visible next/image layers AND the GlitchImage
     bg-image slice (`backgroundImage:url()`) now fetch the 179KB WebP instead
     of the 1.5MB PNG (bg-image slice bypasses next/image so the .webp source
     substitution is what saves the byte budget there).
   - Beta `Hero.tsx` hero-figure `<img>` src switched `/hero-figure.png` →
     `/hero-figure.webp`. Per task spec, kept as raw `<img>` (complex filter
     styling — `brightness(0.78) drop-shadow(...)` gold glow + objectPosition
     `center 20%`). Added explicit `width={1008} height={1068}` `decoding="async"`
     alongside the existing `fetchPriority="high"` (React 19 camelCase).
   - The 6 portfolio PNGs (`royaldao.png` 5.2MB / `dukon-pro.png` 1.7MB /
     `lumina-tarot.png` 928KB / `gymmaster.png` 720KB etc.) stay as `.png` on
     disk — next/image handles AVIF/WebP conversion at request time in
     production via the `/_next/image` endpoint. No source pre-conversion
     needed for those.

2. **NEXT/IMAGE ADOPTION**
   - `src/components/sigma/alpha/AlphaPortfolio.tsx` — `<img>` → `<Image fill
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
     loading="lazy">`.
   - `src/components/sigma/beta/Portfolio.tsx` — same migration with the
     beta Portfolio-specific sizes hint `(max-width: 1023px) 100vw, 55vw` (the
     expanded accordion is `1.2fr` on lg).
   - `src/components/sigma/sections/S04Projects.tsx` — 2 `<img>` tags migrated
     (ProjectCard grid + ProjectDetail dialog). Grid uses
     `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`; detail panel
     uses `(max-width: 767px) 100vw, 50vw`.
   - `src/components/sigma/alpha/GlitchImage.tsx` — all 3 `<img>` layers migrated
     to `<Image fill sizes="100vw">`. Base layer gets `priority` (alpha-mode
     LCP candidate); 2 glitch layers omit priority (opacity:0 unless glitching).
   - `src/components/sigma/SigmaMap.tsx` — 11 section-thumbnail `<img>` migrated
     with sizes `(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw`.
   - `src/app/portfolio/[slug]/page.tsx` — case-study screenshot `<img>` →
     `<Image fill sizes="(max-width: 1024px) 100vw, 1024px" priority>`.
     Container explicitly sets `aspectRatio: 16 / 10` so the `fill` layout has
     a sized parent (next/image `fill` requires the parent to have a size).
   - Decorative/background `<img>` audit: the only remaining raw `<img>` in
     `src/components/sigma/` is the beta hero figure — which the task spec
     explicitly says to keep as `<img>`.

3. **FONT LOADING (`src/app/layout.tsx`)**
   - 5 Google Fonts: Space_Grotesk, Geist_Mono, Fraunces, Orbitron, Rajdhani.
   - All 5 verified used: Space Grotesk (primary body / `.font-sans`),
     Geist Mono (`.font-mono`), Fraunces (`.font-serif` italic editorial),
     Orbitron (`.beta-mode h1/h2/h3` via `--font-scifi`), Rajdhani
     (`.beta-mode .font-sans` + p override via `--font-tactical`).
   - `preload: true` set ONLY on Space Grotesk (the primary above-fold font).
     The other 4 set `preload: false`. Documented in inline comments.
   - All 5 keep `display: "swap"` (no FOIT).
   - Space Grotesk additionally sets `adjustFontFallback: true` (default for
     Google fonts, set explicitly for documentation) — generates an Arial-metric
     override stylesheet so the fallback font renders with the same x-height as
     Space Grotesk, eliminating the layout-shift flash when the webfont swaps.

4. **BUNDLE**
   - `gsap` is imported eagerly in: `ExperienceShell.tsx`, `SigmaMap.tsx`,
     `PageTransitionOverlay.tsx`, all 11 `sections/S##.tsx`, several
     `shared/*.tsx`.
   - Of those, `SigmaMap` + all 11 sections + `AlphaInterface` are wrapped in
     `next/dynamic()` lazy imports inside `ExperienceShell.tsx` — so they (and
     their gsap usage) only enter the bundle when sigma or alpha mode is
     active. Beta mode loads none of those.
   - The eager gsap imports remaining (`ExperienceShell`,
     `PageTransitionOverlay`, `SigmaModeSwitcher`, `SigmaHud`, `SigmaToolbar`,
     `SigmaOnboarding`, etc.) are part of the cross-mode shell — the page
     transition overlay fires for service/project/insight navigations in
     ALL modes, so gsap can't be deferred to sigma-only without breaking
     those animations. Confirmed not "sigma-only" but "shell-wide" — necessary.
   - **Unused package.json deps flagged (note only — NOT removed)**:
     `framer-motion` (codebase uses `motion/react`), `embla-carousel-react`,
     `@dnd-kit/core`+`@dnd-kit/sortable`+`@dnd-kit/utilities`, `lenis`,
     `uuid`, `react-syntax-highlighter`, `react-markdown`, `@reactuses/core`,
     `@tanstack/react-query`, `@tanstack/react-table`, `@mdxeditor/editor`,
     `next-intl`, `next-auth`. None of these have any import sites in `src/`
     (only in unused shadcn/ui stubs at `src/components/ui/{carousel,
     command,resizable,calendar}.tsx`).

5. **RENDER PERF**
   - `document.hidden` gating verified intact across 6 widget intervals
     (clock/jitter/bars/scramble in `beta/Hero.tsx`, `S11Status.tsx`,
     `S07DataStreams.tsx`, `SigmaHud.tsx`, `GlitchImage.tsx`).
   - `getBoundingClientRect` audit: every remaining call is inside a cached
     `refreshRect` closure, NOT called per-event. Verified in:
     - `src/hooks/use-magnetic.ts` (cache on `mouseenter`, invalidate on
       `scroll`/`resize` with `{ capture: true, passive: true }`)
     - `src/hooks/use-tilt-3d.ts` (same pattern — 11 SigmaMap nodes each
       mount a useTilt3D instance, previously 11 forced layouts/mousemove)
     - `src/components/sigma/SigmaMap.tsx` map-parallax mousemove handler
       (same pattern)
     - `src/components/sigma/beta/Hero.tsx` Hero-local `useMagnetic` copy
       (same pattern; this is a window-level mousemove listener so the cache
       fix is highest-impact here)
   - `SigmaParticles` counts — verified all instances are ≤ 18:
     S01=16, S02=12, S03=18, S04=11, S05=12, S06=10, S07=18 (was 24, cut by
     25%), S08=14, S09=14, S10=10, S11=12. All under the 20-per-instance
     ceiling.
   - CSS `contain: content` added in `src/app/globals.css` on 3 selectors:
     `.sigma-card-frame` (AlphaPortfolio + alpha CTA card — 9+1 cards),
     `.bs-portfolio-row` (beta Portfolio — 10 list rows),
     `.sigma-card-hover` (Sigma S04Projects grid — up to 9 cards).
     Skipped on `.sigma-card` / `.alpha-card-hover` wrappers (those have the
     `.sigma-card-glow` absolute `-inset-2 -z-10 blur-2xl` sibling that
     intentionally paints beyond bounds — `contain: paint` would clip it).
     `contain: content` = `layout + style + paint` (excludes `size` — the
     cards' sizes depend on content, so `contain: size` would break layout).

## Verification performed (agent-browser)

1. **Beta hero (default mode)**: opened `http://localhost:3000/`. DOM probe
   confirms `<img src="/hero-figure.webp" alt="" width="1008" height="1068"
   decoding="async" fetchPriority="high">` with the complex filter styling
   intact (`brightness(0.78) drop-shadow(0 0 80px rgba(212,175,55,0.15))
   drop-shadow(0 0 30px rgba(212,175,55,0.1))`, `object-position:center 20%`).
   Rendered at 1280x606, natural 1008x1068, `complete:true`. ✓
2. **Alpha mode (`localStorage sigma-mode=alpha`)**: confirmed alpha-mode class
   on `[data-alpha-scroll]` container. 7 portfolio imgs + 3 alpha-hero-bg
   next/image layers + bg-image slice all rendered. All 7 portfolio imgs use
   `/_next/image` with srcset (640/750/828/1080/1200/1920/2048/3840w variants).
   `currentSrc` for the 1.2fr grid card settled at `w=640`. All `complete:true`.
   Zero errors. ✓
3. **Sigma mode (`localStorage sigma-mode=sigma`)**: map loads with 11 section
   thumbnails via next/image (sized `w=384` for 230x172 viewport-rendered).
   Clicked Sector 04 → S04Projects detail view loads: 1 SigmaParticles canvas
   (count=11, well under 20), 7 project thumbnails via next/image, "PROJECT
   VAULT" header present. Zero errors. ✓
4. **Portfolio case study (`/portfolio/dukon-pro`)**: next/image renders the
   1.7MB `dukon-pro.png` source through `/_next/image` with full srcset.
   `currentSrc` at desktop viewport: `w=1080`. Image `complete:true`,
   rendered at 1022x638. (Pre-existing data note: `/portfolio/royaldao`
   returns the "PROJECT NOT FOUND" view — `royaldao` is not in the case-study
   PROJECTS dictionary. This is a pre-existing gap, unrelated to my changes.)
5. **On-the-wire size probes (dev mode, PNG served via next/image endpoint)**:
   - `dukon-pro.png` @ 640w: 178KB (raw PNG source is 1.7MB → ~9.5× reduction
     even in dev with no WebP conversion; production will further reduce to
     ~50-80KB AVIF)
   - `royaldao.png` @ 640w: 583KB (raw 5.2MB → ~9× reduction; production
     AVIF estimate ~80-120KB → ~50× reduction)
   - `alpha-hero-bg.webp` direct: 179KB (was 1.5MB PNG → 88% reduction)
   - `hero-figure.webp` direct: 179KB (was 1.3MB PNG → 86% reduction)
6. **agent-browser errors** — empty output across all 3 modes. Zero new errors.
   Console shows only Next.js dev-only warnings (LCP suggestions for
   `/sections/s01.png` + `/sections/s03.png` SigmaMap thumbnails when sigma
   mode is active — expected, those thumbnails ARE above-fold in sigma map
   view but they're tiny 230x172 sized variants via next/image, ~3-5KB each
   in production AVIF).
7. **`bun run lint`** — exit 0, zero errors, zero warnings. ✓
8. **`npx tsc --noEmit`** — exit 0, zero TypeScript errors. ✓
9. **Dev server** — kept running on port 3000 throughout (~30+ HMR compiles
   observed during testing, all `✓ Compiled` markers, no errors). ✓

## Constraints met

- NO new dependencies installed. ✓
- Existing functionality unbroken: 3-mode switching verified end-to-end
  (beta → alpha → sigma via localStorage + reload), basket/toast flows
  unchanged (no edits to ServiceBasket or ContactFormModal), scroll
  restoration unchanged (no edits to scroll position code), map nav works
  (clicked S04 from sigma map → sector renders), boot sequences unchanged
  (SigmaBoot.tsx untouched), services two-level expansion unchanged (no
  edits to beta/Services.tsx). ✓
- TypeScript strict — `tsc --noEmit` zero errors. ✓
- No console.log statements added (all changes are comments or DOM-level). ✓
- `bun run lint` exit 0. ✓
- Mobile-safe at 390px (the cache fixes in use-magnetic/use-tilt-3d/SigmaMap
  are passive listeners — they don't change touch behavior; CSS containment
  is on grid card frames which are already `overflow-hidden`, no mobile
  layout impact). ✓
- Visual output preserved — beta hero filter styling identical (verified via
  DOM probe of the inline `style` attribute). Alpha portfolio card layout
  identical (verified via screenshot comparison — same `aspect-[16/10]`,
  same `object-top`, same gradient overlays). Sigma map thumbnails identical
  (same `sigma-map-node-thumb` class, same `opacity-95`). ✓

## Files changed (13 modified, 2 untracked webp)

1. `src/app/globals.css` — added `.sigma-card-frame, .bs-portfolio-row,
   .sigma-card-hover { contain: content; }` with documentation comment block.
2. `src/app/layout.tsx` — preload audit documented inline (only Space Grotesk
   preloaded; Geist Mono / Fraunces / Orbitron / Rajdhani set `preload: false`
   with rationale comments). adjustFontFallback explicit on spaceGrotesk.
3. `src/app/portfolio/[slug]/page.tsx` — case-study screenshot `<img>` →
   `<Image fill priority>` with `aspectRatio: 16/10` set on the container.
4. `src/components/sigma/SigmaMap.tsx` — section-thumbnail `<img>` → `<Image
   fill sizes=...>`. Map-parallax mousemove handler: cached `getBoundingClientRect`
   on mouseenter, invalidated on scroll/resize.
5. `src/components/sigma/alpha/AlphaHero.tsx` — GlitchImage src switched from
   `/alpha-hero-bg.png` (1.5MB) → `/alpha-hero-bg.webp` (179KB).
6. `src/components/sigma/alpha/AlphaPortfolio.tsx` — `<img>` → `<Image fill
   sizes=...>`.
7. `src/components/sigma/alpha/GlitchImage.tsx` — all 3 `<img>` layers →
   `<Image fill sizes="100vw">`. Base layer gets `priority`.
8. `src/components/sigma/beta/Hero.tsx` — hero-figure `<img>` src switched to
   `.webp` (179KB) with explicit `width/height/decoding/fetchPriority` attrs.
   Hero-local `useMagnetic` copy: cached rect on mouseenter, invalidated on
   scroll/resize (this is a window-level mousemove listener — biggest layout-
   thrash win).
9. `src/components/sigma/beta/Portfolio.tsx` — `<img>` → `<Image fill sizes=...>`.
10. `src/components/sigma/sections/S04Projects.tsx` — 2 `<img>` (ProjectCard
    grid + ProjectDetail dialog) → `<Image fill sizes=...>`.
11. `src/components/sigma/sections/S07DataStreams.tsx` — SigmaParticles count
    24 → 18 (under the 20-per-instance ceiling, ~25% fewer per-frame fillText
    calls).
12. `src/hooks/use-magnetic.ts` — cached `getBoundingClientRect` pattern.
13. `src/hooks/use-tilt-3d.ts` — cached `getBoundingClientRect` pattern.

Untracked (new files):
- `public/alpha-hero-bg.webp` — 179KB (pre-encoded replacement for 1.5MB PNG)
- `public/hero-figure.webp` — 179KB (pre-encoded replacement for 1.3MB PNG)

## Stage Summary

BEFORE:
- 5 portfolio `<img>` tags + 2 hero-figure/alpha-hero-bg `<img>` tags loading
  raw PNGs (1.3-5.2MB each) directly via `<img src>` — bypassing next/image
  optimization entirely. Total above-fold image payload in beta: ~1.3MB
  (hero-figure.png). In alpha: ~1.5MB (alpha-hero-bg.png). In sigma: 11 small
  thumbnails (~250KB total).
- `getBoundingClientRect` called on every window mousemove (3 sites:
  use-magnetic, use-tilt-3d, SigmaMap parallax) + every el mousemove (1 site:
  Hero-local useMagnetic). Each call is a forced layout reflow — 60+ forced
  layouts/sec while the cursor is anywhere on the page. SigmaMap's 11 nodes
  each mount useTilt3D → 11 forced layouts per mousemove over the map.
- 5 Google Fonts all preloaded by default — 5 woff2 files in the initial
  network batch.
- SigmaParticles count was 24 on S07 (over the 20-per-instance ceiling).
- Zero CSS containment on card grids — every hover transition on one card
  triggers stacking-context recomputes across the parent grid.

AFTER:
- All portfolio + hero + section-thumbnail images route through next/image
  with proper `sizes` hints. Production serves AVIF/WebP at the right
  intrinsic size. Beta hero-figure + alpha hero-bg switched to pre-encoded
  WebP (179KB each) because their `<img>`/`background-image` use bypasses
  next/image. Total above-fold image payload: beta ~179KB, alpha ~179KB
  (one WebP fetched once, shared across 3 GlitchImage layers + bg-image
  slice), sigma ~50KB (11 thumbnails × ~3-5KB AVIF each).
- All 4 mousemove sites use the cached rect pattern (refresh on mouseenter,
  invalidate on scroll/resize). Zero forced layouts on mousemove. SigmaMap's
  11 nodes now each do 0 layouts/mousemove.
- Only Space Grotesk preloaded (1 woff2). 4 other fonts set `preload: false`
  with rationale comments. Net: 4 fewer woff2 in the initial network batch.
- S07 SigmaParticles cut 24 → 18.
- `contain: content` on 3 heavy card grids (AlphaPortfolio cards, beta
  Portfolio rows, Sigma S04 grid cards) — browser can skip layout/paint
  recalc for off-screen cards during scroll.
- Lint exit 0, tsc exit 0, zero agent-browser errors across all 3 modes.
