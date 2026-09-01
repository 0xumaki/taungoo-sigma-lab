# Research Report: Hero HUD Cards, Clean Service Cards & Footer Wordmark Glow

**Task ID:** RESEARCH-DESIGN-1
**Date:** 2026-08-29
**Project context:** Taungoo Σ Lab — a tactical/militaristic "BLACKSITE/CIA" aesthetic website with gold `#D4AF37` accent, Orbitron/Rajdhani/Geist Mono on void-black. (Note: the actual codebase repo uses Space Grotesk + JetBrains Mono + Instrument Serif and orange `#FF4500` as the primary accent — see `worklog.md`. The "alpha" interface layer in `src/components/sigma/alpha/` is the relevant target: `AlphaHero.tsx`, `SciFiCard.tsx`, `AlphaServices.tsx`, `AlphaFooter.tsx`. The footer's big "TAUNGOO" wordmark glow should use the GOLD accent per task spec.)

**Method:** 16 web searches via `z-ai function --name web_search` (CLI located at `/home/z/my-project/node_modules/.bin/z-ai`). Raw JSON saved to `/tmp/design-research/q01–q16*.json`. The current codebase (`AlphaHero.tsx`, `SciFiCard.tsx`, `AlphaServices.tsx`, `AlphaFooter.tsx`, `globals.css` lines 1263–1354) was also read to ground recommendations in what already exists.

---

## 1. Hero HUD Card Design References

### Reference 1 — Awwwards "Interactive Hero Card" (Design Threads)
- **URL:** https://www.awwwards.com/inspiration/interactive-hero-section-design-threads-1
- **What makes it cool:** Full-bleed hero card with mouse/gesture-driven real-time interaction, horizontal layout, and a single dominant framed panel rather than a stack of small cards. The hero card *is* the viewport, not an element inside it.
- **Techniques to borrow:** (a) hero-as-full-card (not a card floating in a section); (b) pointer-reactive internal panels (sub-regions of the card re-light on mousemove); (c) horizontal data-strip layout inside the card frame; (d) cut-corner / chamfered clip-path on the outer frame.

### Reference 2 — Vecteezy "Futuristic Gaming Player Card" (golden HUD + circuit board)
- **URL:** https://www.vecteezy.com/vector-art/77445734-futuristic-gaming-player-card-template-front-and-back-design-dark-sci-fi-background-with-glowing-golden-hud-circuit-board-and-hero-silhouette
- **What makes it cool:** Dark sci-fi bg with a *glowing golden HUD circuit board* behind a hero silhouette. Front-and-back card faces. The circuit pattern is the visual texture — not a flat fill.
- **Techniques to borrow:** (a) golden circuit-board / PCB trace overlay as a card background texture (thin gold lines on void-black at ~6–8% opacity); (b) dual-face card concept (a "FRONT/REVERSE" toggle that flips the same card); (c) silhouette + HUD frame combination; (d) gold `#D4AF37` used for traces and brackets, white for primary type.

### Reference 3 — Death Stranding / Metal Gear Solid V "diegetic HUD" analysis
- **URLs:**
  - https://www.reddit.com/r/NeverBeGameOver/comments/1jmly4r/metal_gear_solid_v_and_death_strandings_hud
  - https://www.lifeshectic.com/examples-of-ui-design-in-video-games
  - https://www.gamedeveloper.com/design/a-design-discussion-on-death-stranding
- **What makes it cool:** Both games project HUD elements as *holographic projections from a physical device* (iDroid / cufflinks). The HUD feels diegetic — it lives inside the fiction. The visual signature: thin cyan/white wireframe lines, scanning sweep animations, "data flicker" that briefly corrupts then resolves, and physicality cues (slight skew, motion parallax).
- **Techniques to borrow:** (a) holographic projection metaphor — frames look "emitted" not "drawn" (use `mix-blend-mode: screen` + low-opacity additive glow); (b) occasional scan-flicker (1-frame `opacity` + `translateX` glitch every ~6–10s); (c) wireframe-corner ticks that extend/retract; (d) data that *types in* and updates live (signal strength, frequency, etc.).

### Reference 4 — Wendy Zhou "Cyberpunk UI Dashboard Aesthetics" analysis
- **URL:** https://www.wendyzhou.se/blog/cyberpunk-ui-dashboard-aesthetics-inspiration-and-ai
- **What makes it cool:** Dark bg + bright neon accents; neon used to highlight text and data only (never decorative fill). Cards have glowing borders, scanlines, and a deliberately *unbalanced* info density — corners carry ticks/IDs, the center carries one hero metric.
- **Techniques to borrow:** (a) **accent color used ONLY for: borders, tick marks, labels, and the single primary number** — never for body text or large fills; (b) glowing border via `box-shadow: 0 0 0 1px accent, 0 0 20px accent33, inset 0 0 40px accent11`; (c) per-card scanlines at ~6–8% opacity; (d) corner-anchored metadata blocks (top-left = ID + status, top-right = timestamp, bottom-left = sparkline, bottom-right = signature).

### Reference 5 — Pluralsight "Designing a HUD That Works" + Sunstrike Studios HUD guide
- **URLs:**
  - https://www.pluralsight.com/resources/blog/software-development/designing-a-hud-that-works-for-your-game
  - https://sunstrikestudios.com/en/blog/HUD_design_in_games
- **What makes it cool:** Best practice synthesis — *minimize HUD presence*, cluster related info, use a minimap-corner + status bar pattern. The takeaway: even maximalist HUDs obey a strict "corner + bar" grammar.
- **Techniques to borrow:** (a) **4-zone corner grammar** — each corner owns ONE info class (TL=identity, TR=status, BL=telemetry, BR=action); (b) thin connector lines between corners implying a "scan area"; (c) a single bottom strip = the action bar / CTA.

### Reference 6 — Visual Logic "Military & Defense UX" (SIGINT/EW signal-intel tools)
- **URL:** https://visuallogic.com/military-ux
- **What makes it cool:** Real-world tactical UX. Clear information architecture, signal-intel visualizations, spectrum/waterfall charts, "armed/disarmed" state coloring. The real BLACKSITE feel — not a game's idea of military.
- **Techniques to borrow:** (a) **spectrum sparkline** (a 40px-tall mini line that looks like RF signal) as the signature "this is alive" indicator; (b) status pills with a leading 1px pulse dot (`.sigma-pulse` already exists in `globals.css`); (c) mono-spaced coordinate readouts (`LAT 19.7°N · LON 96.4°E`) as filler texture; (d) **classification banner** top edge ("// CLASSIFIED // TAUNGOO/Σ //") printed in tiny mono caps.

### Reference 7 — Figma "Animated Glowing Line Card" (glassmorphism + neon border)
- **URL:** https://www.figma.com/community/file/1651532324353490357/an-animated-glowing-line-card-is-a-modern-ui-card-with
- **What makes it cool:** Modern UI card with animated *conic-gradient rotating border* — the glow travels around the perimeter of the card. Glassmorphism body underneath.
- **Techniques to borrow:** (a) **rotating conic-gradient border** via `@property --angle { syntax: '<angle>'; }` + `background: conic-gradient(from var(--angle), transparent 0deg, accent 90deg, transparent 180deg)` masked to a 1px ring; (b) the glow "orbits" the card every ~6s; (c) glass body `backdrop-filter: blur(8px)` over a dark void.

### Reference 8 — Shutterstock "Tactical monitoring dashboard with drone status + HUD overlay + target reticle + glitch"
- **URL:** https://stock.adobe.com/search?k=military+ui (rank 3 result snippet)
- **What makes it cool:** Glowing target reticle in the center, glitch effects on transitions, digital frame brackets that scan inward when "acquiring."
- **Techniques to borrow:** (a) **acquiring-reticle animation** — corner brackets slide inward to a target point on hover (the existing `.sigma-bracket-hover` in `globals.css` is the inverse — it expands; add an `acquiring` variant that contracts); (b) glitch transition between card states (already have `.sigma-rgb-split` and `sigma-glitch`).

### Synthesis — 8 Concrete Design Techniques for Hero HUD Panels

Apply these to `AlphaHero.tsx` and the `SciFiCard.tsx` primitive:

1. **Hero-as-full-card** (keep, sharpen): the current `AlphaHero` already does this — keep the cut-corner clip-path full-card approach, but push the *circuit-board texture* (Reference 2) as the bg overlay, replacing the generic `.sigma-grid`.
2. **Gold PCB trace background texture**: replace `.sigma-grid` overlay on the hero card with a custom SVG of thin gold `#D4AF37` circuit traces at ~6% opacity. SVG pattern (384×384 tile) with horizontal/vertical traces + node dots.
3. **Rotating conic-gradient border glow** (Reference 7): add a 1px perimeter ring using `@property --angle` + `conic-gradient(from var(--angle), transparent, #D4AF37, transparent)` masked via `mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)` + `mask-composite: exclude`. Orbit period 6s.
4. **4-zone corner grammar** (Reference 5): codify TL=`// TAUNGOO/Σ //`, TR=`T-{{timestamp}} BLIVE`, BL=sparkline+`LAT/LON`, BR=`SIG:█████ 4/5`. Currently the hero has 4 outer corner brackets but no per-corner content — populate them.
5. **Mini spectrum sparkline** (Reference 6): 40px tall, 120px wide, drawn as inline SVG polyline that re-shapes every 2s with GSAP (already installed). Put it in the BL corner. This is the single most "alive" indicator.
6. **Acquiring-reticle hover** (Reference 8): on hover, the 4 corner brackets contract inward ~6px over 0.4s, pause, expand back. Mirrors a targeting acquisition. New `.sigma-bracket-acquire` class.
7. **Holographic projection metaphor** (Reference 3): set the card's outer glow to `mix-blend-mode: screen` so the gold accent adds additively over the void-black bg. Combined with `box-shadow: 0 0 60px #D4AF3722`.
8. **Scan-flicker micro-event** (Reference 3): every ~7s, a 1-frame `opacity: 0.7 → 1` + `translateX: 2px → 0` jitter on the whole card, 80ms total. Adds the "this is a real terminal" liveness. GSAP random repeat.

---

## 2. Clean Service Card References (current cards are "too messy")

### Reference 1 — Linear.app "How we redesigned the Linear UI"
- **URL:** https://linear.app/now/how-we-redesigned-the-linear-ui
- **Hierarchy technique:** Reduce visual noise, maintain visual alignment, increase hierarchy and density. Linear's cards have ONE primary line (the issue title), ONE secondary line (meta: project · status · assignee), and a single trailing affordance (the status icon). Everything else is removed. Purple accent is used ONLY on the status icon, never on the body.
- **Principle:** **One title + one meta line + one trailing affordance. Period.**

### Reference 2 — Linear design-system analysis (getdesign.md)
- **URL:** https://getdesign.md/linear.app/design-md
- **Hierarchy technique:** "Ultra-minimal, precise, purple accent." Linear sharpens PM by removing chrome. The card border is `1px oklch(0.22 0 0)` — barely visible at rest, becomes `1px oklch(0.4 0 0)` on hover. No icons in the card body. No scanlines. No corner brackets. The "card" is mostly whitespace with 2 lines of text.

### Reference 3 — Vercel pricing page (saasframe analysis)
- **URL:** https://www.saasframe.io/examples/vercel-pricing-page
- **Hierarchy technique:** Clean, modern minimalism. Geometric sans-serif, clear hierarchy: **plan name (bold, 1.5rem) → price (mono, 2.5rem, the visual anchor) → one-line description (muted) → CTA button (full-width, primary)**. Features listed BELOW the CTA as a minimal checkmark list — the price is the hero, not the features.
- **Principle:** **Price/anchor first, CTA second, details collapsible.**

### Reference 4 — "Designing a Clean and Functional Pricing Card" (Medium)
- **URL:** https://medium.com/@iremyace.turan/designing-a-clean-and-functional-pricing-card-a-journey-through-ui-ux-principles-00120904b0f9
- **Hierarchy technique:** Clean = easy to understand + functional. The card has a strict vertical stack: header (eyebrow label) → name → price → divider → description → CTA. The divider is the only "decoration" — it separates the *identity block* (name/price) from the *action block* (desc/CTA).
- **Principle:** **A single horizontal divider splits identity from action.**

### Reference 5 — Awwwards "Clean & Minimal" + "Services Cards (Studio by Miyagami)"
- **URLs:**
  - https://www.awwwards.com/websites/clean
  - https://www.awwwards.com/inspiration/services-cards-studio-by-miyagami-1
- **Hierarchy technique:** Minimal = "bare essentials, careful and precise positioning." The Miyagami services cards use a **single-line list pattern** — each service is a row: index number → service name (large) → one-line description (muted, right-aligned or below) → arrow. No icons, no badges, no prices on the card. The card IS the row. Hover reveals the price/CTA.
- **Principle:** **A service card can be a single row. Collapse to expand.**

### Reference 6 — "UI Card Design: Grid Layouts, Spacing & UX Tips" (ALF Design Group)
- **URL:** https://www.alfdesigngroup.com/post/best-practices-to-design-ui-cards-for-your-website
- **Hierarchy technique:** "The page has a single, focused message. Decide from visual cues like an image OR price." A card should NOT compete — it should surrender visual weight to its single anchor (either an image OR a price, never both).
- **Principle:** **Pick one anchor per card. Either the icon OR the price — not both at equal weight.**

### Reference 7 — Stripe product card pattern (LinkedIn + Hermes Agent synthesis)
- **URLs:**
  - https://www.linkedin.com/posts/plabanjr_31-design-systems-stripe-vercel-notion-activity-7450785146158415873-QkqF
  - https://hermes-agent.nousresearch.com/docs/user-guide/skills/bundled/creative/creative-popular-web-designs
- **Hierarchy technique:** Stripe cards: clean layout, consistent spacing, decent typography, **proper visual hierarchy, intentional typography**. The Stripe product card is a flat panel with: product name (sans, bold) → one-line value prop (sans, regular, muted) → "Learn more →" link (no button, just an arrow link). No border, no shadow, no scanlines. Differentiation comes from typography weight + a 2px accent strip on hover.
- **Principle:** **No border at rest. Accent strip on hover only. CTA = arrow link, not a button.**

### Reference 8 — "17 Card UI Design Examples and Best Practices" (Eleken)
- **URL:** https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners
- **Hierarchy technique:** Best-practice checklist: (1) clear visual hierarchy with 1 primary element; (2) consistent spacing scale (8px base); (3) adequate whitespace (padding ≥ content height); (4) limited color (1 accent + 2 neutrals max); (5) purposeful imagery (or none).
- **Principle:** **8px spacing grid, 1 accent + 2 neutrals, padding ≥ content.**

### Synthesis — 8 Concrete Principles for a Clean, Focused Service Card

Current `AlphaServices.tsx` packs **6 competing elements per card** (header bar, icon zone w/ hazard stripes + crosshair + scanlines, title, desc, footer bar w/ price + CTA, side strip, hover glow). That is the mess. Fix:

1. **Collapse to a single-row card (default state):** `[index] [service name] ........................ [price →]`. All on ONE row. Icon, hazard stripes, crosshairs, scanlines, category dot, side strip — **remove from default state**. Hover expands.
2. **Single anchor = the service name.** Make it the largest type on the card (14–16px bold). Everything else is smaller and muted. Price is secondary, right-aligned, mono.
3. **No border at rest (Stripe principle).** Replace `border border-border` with a transparent 1px line that only appears on hover (`hover:border-foreground/30`). Removes visual noise.
4. **Accent strip on hover only (Stripe/Vercel).** A 2px-tall accent-colored bar slides in along the bottom edge on hover — this is the ONLY accent reveal in default card state.
5. **Expandable detail on hover/click (Miyagami).** On hover, the row expands vertically (60→140px) revealing: one-line description + CTA arrow + "VIEW DETAILS →". Default state stays minimal.
6. **8px spacing grid (Eleken).** All internal padding/margins in multiples of 8px (px-4 py-3 → 16/12; gap-2 → 8). No more `px-2 py-1` mixed with `p-2.5`.
7. **One accent + two neutrals (Eleken).** Per card: category color (the single accent) + foreground + muted-foreground. Drop the per-element color variations (currently icon, price, CTA, side strip, hazard dot ALL get `catColor` — that's the mess).
8. **CTA = arrow link, not a button (Stripe).** Replace the boxy "▸ DETAILS" mono label with a right-aligned `→` arrow that translates 4px on hover. The whole row is clickable; the arrow is the affordance.

**Recommended new structure for `AlphaServices.tsx` default state:**
```
[01]  AI Chatbot                                    from 2.2M MMK  →
       ─────────────────────────────────────────────────────────
```
On hover: row grows to ~120px, reveals description + category tag + "View details →", accent strip animates in along the bottom edge.

---

## 3. Footer Wordmark Glow Animation References

### Reference 1 — Spell.sh "How to Create a Shimmer Text Effect with CSS"
- **URL:** https://spell.sh/blog/shimmer-text-effect-css
- **CSS/animation technique:** Step-by-step: `background: linear-gradient(110deg, #404040 0%, #404040 40%, #fff 50%, #404040 60%, #404040 100%)` + `background-size: 200% 100%` + `background-clip: text` + `-webkit-text-fill-color: transparent` + `@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`. The bright `#fff` band at 50% is the "sweep highlight."
- **Takeaway:** A narrow bright band (10% of gradient width) sweeping across a darker base is the canonical shimmer. Animate `background-position` only — GPU-cheap.

### Reference 2 — HeyGen HyperFrames "Shimmer Sweep"
- **URL:** https://hyperframes.heygen.com/catalog/components/shimmer-sweep
- **CSS/animation technique:** "Animated light sweep across text or elements using a CSS gradient mask — ideal for AI accents and premium reveals." Uses a **gradient mask** (not background-clip), so the sweep is an overlaid pseudo-element moving L→R. This means the base text can keep its solid color and the sweep is purely additive.
- **Takeaway:** Use a `::before` overlay with `linear-gradient(105deg, transparent 40%, #fff 50%, transparent 60%)` masked to the text shape, animated `translateX(-100% → 200%)`. The base wordmark stays solid gold; the sweep is a brighter highlight passing over it.

### Reference 3 — CodePen "Animated Gradient Text" (shshaw)
- **URL:** https://codepen.io/shshaw/pen/YpERQQ
- **CSS/animation technique:** `background: linear-gradient(to right, #FFF 20%, #FF0 40%, #FF0 60%, #FFF 80%)` + `background-clip: text` + `text-fill-color: transparent`. The bright yellow `#FF0` band occupies 20% of the gradient (40%–60%), creating a wider sweep highlight than Reference 1.
- **Takeaway:** For a "molten gold" feel, widen the highlight band to ~25–30% of the gradient (not 10%). Use `#FFEB99` (light gold) as the highlight, `#D4AF37` as the base, `#8B6914` as the dark edge — a 3-tone gold gradient.

### Reference 4 — freefrontend.com "10+ CSS Shimmer Effects" (golden glow border)
- **URL:** https://freefrontend.com/css-shimmer
- **CSS/animation technique:** "A creative CSS border shimmer animation built with linear gradients and keyframe transitions. This snippet produces a dynamic golden glow behind [the element]." Uses a *behind-the-text* radial glow (`filter: drop-shadow(0 0 8px #D4AF3788)`) that pulses in sync with the sweep.
- **Takeaway:** Combine the foreground sweep (References 1–3) with a background glow that pulses — the `drop-shadow` filter blurs the text outline, creating a "halo" that brightens as the sweep passes.

### Reference 5 — texteffects.dev "Gold Text Effect with CSS"
- **URL:** https://texteffects.dev/posts/gold-text-effect
- **CSS/animation technique:** Gold text via CSS gradients + text shadows. Multi-stop gold gradient: `#BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C` (dark gold → bright cream → mid gold → bright cream → dark gold). Multiple `text-shadow` layers for the metallic bevel: `0 1px 0 #8B6914, 0 2px 0 #6B4F0F, 0 3px 6px #00000088`.
- **Takeaway:** A true gold effect needs **5 gradient stops** (dark→cream→mid→cream→dark), not 3. The `text-shadow` stack creates the metallic bevel — essential for the "glazing" look.

### Reference 6 — Medium "Shimmering Text Animation with Just HTML & CSS" (Raghav Velan)
- **URL:** https://raghavvelan.medium.com/shimmering-text-animation-with-just-html-css-edc9bb035ec1
- **CSS/animation technique:** Pure CSS, no JS. Uses `background-clip: text` + animated `background-position` with `ease-in-out` (not linear) timing — the sweep slows at the center (where the highlight is brightest) and accelerates at the edges, mimicking a real light sweep.
- **Takeaway:** Use `ease-in-out`, not `linear`. The sweep should "pause" briefly at center for max impact. Period ~4–5s.

### Reference 7 — Awwwards "Shining Text Animation Effects" + "Footer with huge logo (No graphism®)"
- **URLs:**
  - https://www.awwwards.com/inspiration/shining-text-animation-effects
  - https://www.awwwards.com/inspiration/footer-with-huge-logo-no-graphism-animated-on-scroll-no-graphism-r
  - https://www.awwwards.com/inspiration/footer-reveal-animation-wkndhrs
- **CSS/animation technique:** Footer wordmarks that are HUGE (filling 80%+ of viewport width), scroll-triggered reveal, and "shining" = a moving specular highlight. The reveal uses `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` over 1.2s.
- **Takeaway:** The footer TAUNGOO wordmark should be HUGE (clamp(3rem, 12vw, 9rem)), reveal on scroll-into-view, then continuously shimmer. Two separate animations: (1) one-shot reveal (clip-path inset), (2) infinite shimmer sweep.

### Reference 8 — dev.to "Dynamic text effects with css mix-blend-mode" + MDN mix-blend-mode
- **URLs:**
  - https://dev.to/kaos/dynamic-text-effects-with-css-mix-blend-mode-242a
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode
  - https://fdossena.com/?p=html5cool/blend/i.frag
- **CSS/animation technique:** `mix-blend-mode: screen` = additive RGB (perfect for glows on dark bg). A moving white radial gradient with `mix-blend-mode: screen` over gold text creates a "light passing through" effect — the gold brightens to near-white where the light hits, then returns to gold.
- **Takeaway:** Layer 3 elements: (1) base gold text (solid `#D4AF37`), (2) `::before` overlay = gold-gradient text via `background-clip: text` sweeping L→R, (3) `::after` overlay = white radial spot with `mix-blend-mode: screen` that follows the sweep. The 3rd layer is the "glazing light."

### Synthesis — 5 Concrete CSS Techniques for the TAUNGOO Radiant Glazing Sweep

The current `.sigma-brand__text` (globals.css lines 1306–1336) uses a basic 3-color sweep (fg→`#FF4500`→fg, 5s ease-in-out). To upgrade to "radiant glazing light movement" in GOLD `#D4AF37`:

1. **5-stop molten-gold gradient (Reference 5):**
   ```css
   background: linear-gradient(100deg,
     #8B6914 0%,        /* dark gold edge */
     #D4AF37 30%,       /* base gold */
     #FFEB99 50%,       /* bright cream highlight (THE SWEEP) */
     #D4AF37 70%,       /* base gold */
     #8B6914 100%);     /* dark gold edge */
   background-size: 250% 100%;
   background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: taungoo-gold-sweep 5s ease-in-out infinite;
   @keyframes taungoo-gold-sweep {
     0%, 100% { background-position: 150% 0; }
     50%      { background-position: 0% 0; }
   }
   ```
   The wide `#FFEB99` highlight band (30%–70% = 40% of gradient width) creates the "glazing" rather than a thin "shimmer."

2. **Metallic bevel via text-shadow stack (Reference 5):**
   ```css
   .taungoo-wordmark {
     text-shadow:
       0 1px 0 #B38728,
       0 2px 0 #8B6914,
       0 3px 6px rgba(0,0,0,0.6);
   }
   ```
   NOTE: `text-shadow` is ignored when `-webkit-text-fill-color: transparent` is set — so this bevel must be on a **duplicate text layer** underneath (use `::before` with the solid gold text + shadow, and the gradient sweep on top via the main element).

3. **Additive glazing light via `mix-blend-mode: screen` (Reference 8):**
   ```css
   .taungoo-wordmark::after {
     content: attr(data-text);
     position: absolute; inset: 0;
     background: radial-gradient(circle at var(--sweep-x, 50%) 50%,
       rgba(255, 235, 153, 0.9) 0%,
       rgba(255, 235, 153, 0) 40%);
     mix-blend-mode: screen;
     background-clip: text;
     -webkit-text-fill-color: transparent;
     animation: taungoo-glaze 5s ease-in-out infinite;
   }
   @keyframes taungoo-glaze {
     0%, 100% { --sweep-x: -20%; }   /* off-screen left */
     50%      { --sweep-x: 120%; }    /* off-screen right */
   }
   ```
   Requires `@property --sweep-x { syntax: '<percentage>'; inherits: false; initial-value: 50%; }` for animatable custom property. This `::after` is the "light bulb passing over the gold letters."

4. **Pulsing drop-shadow halo synced to sweep (Reference 4):**
   ```css
   .taungoo-wordmark {
     filter: drop-shadow(0 0 var(--halo, 4px) rgba(212, 175, 55, 0.4));
     animation: taungoo-halo 5s ease-in-out infinite;
   }
   @keyframes taungoo-halo {
     0%, 100% { --halo: 4px; }
     50%      { --halo: 12px; }   /* halo swells as sweep passes center */
   }
   ```
   Requires `@property --halo { syntax: '<length>'; ... }`. The halo peaks exactly when the `#FFEB99` highlight is centered — synchronized "glazing."

5. **Huge wordmark + scroll-reveal (Reference 7):**
   - Size: `font-size: clamp(3rem, 12vw, 9rem); font-weight: 900; letter-spacing: 0.05em;`
   - Reveal on scroll-into-view: `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` over 1.2s `cubic-bezier(0.7, 0, 0.3, 1)`, then the infinite shimmer kicks in. Use the existing `.sigma-card-reveal` pattern (already in globals.css lines 1364+) as the trigger.
   - Place as a dedicated row in `AlphaFooter.tsx` ABOVE the link columns, full-bleed, center-aligned. Currently the footer's "TAUNGOO Σ Lab" is a tiny 14px label in the top-left logo block — the huge wordmark is missing entirely.

---

## 4. Final Recommended Implementation Plan

### A) Redesign the Hero HUD Cards (AlphaHero.tsx + SciFiCard.tsx)

Keep the existing cut-corner clip-path full-card structure (it's already awwwards-tier), but upgrade the *internal HUD layer*: (1) replace the generic `.sigma-grid` overlay with a custom SVG **gold PCB-circuit-trace pattern** (384×384 tile, 1px gold lines at 6% opacity); (2) add a **rotating conic-gradient border glow** using `@property --angle` + `conic-gradient(from var(--angle), transparent, #D4AF37, transparent)` masked to a 1px ring, orbiting every 6s; (3) populate the **4 corner zones** with real per-corner content (TL = `// TAUNGOO/Σ //`, TR = live `T-{timestamp}`, BL = 40px-tall **mini spectrum sparkline SVG** + `LAT 19.7°N · LON 96.4°E`, BR = `SIG:█████ 4/5`); (4) switch the card's outer glow to `mix-blend-mode: screen` for additive gold-over-void; (5) add the **acquiring-reticle hover** — on hover, the 4 corner brackets contract inward ~6px over 0.4s (new `.sigma-bracket-acquire` class); (6) add a **scan-flicker micro-event** every ~7s (GSAP random repeat, 80ms `opacity 0.7→1 + translateX 2px→0`). Upgrade `SciFiCard` to accept a `circuitPattern` prop and a `cornerContent={[TL,TR,BL,BR]}` prop so any panel can use the new system.

### B) Restructure the Service Cards (AlphaServices.tsx)

Replace the current 5-column 6-element maximalist grid with a **single-column expandable list** (or 2-column on xl screens). Each card's DEFAULT state is a single row: `[01]  AI Chatbot  ······················  from 2.2M MMK  →` — index (mono, muted), service name (sans, bold, 16px — the single anchor), dotted leader, price (mono, 12px, muted, right-aligned), arrow affordance. **Remove** the icon zone, hazard stripes, crosshairs, scanlines, category dot, side strip, and hover glow from the default state — they're the noise. On **hover** (desktop) or **tap** (mobile), the row expands from ~48px → ~140px revealing: one-line description, category tag (small pill in catColor), and "View details →" — animated via GSAP `height` + `opacity` over 0.35s `power3.out`. Add a **2px accent-colored bottom strip** that slides in L→R on hover (Stripe/Vercel principle). Use a strict **8px spacing grid** (px-4 py-3, gap-2 only). No border at rest (`border-transparent`), `hover:border-foreground/20` on hover. The whole row is a `<PageTransitionLink>`. This collapses 27 noisy cards into a calm, scannable, premium list — each card surrenders weight to its single anchor (the name) while still delivering price + CTA + category on demand.

### C) Implement the Footer TAUNGOO Shimmer Animation (AlphaFooter.tsx + globals.css)

Add a **dedicated huge wordmark row** at the top of `AlphaFooter.tsx` (above the link grid): `<h2 class="taungoo-wordmark" data-text="TAUNGOO">TAUNGOO</h2>` at `clamp(3rem, 12vw, 9rem)`, font-weight 900, letter-spacing 0.05em, centered, full-bleed. Implement the shimmer in `globals.css` as a **3-layer stack**: (1) base `::before` = solid `#D4AF37` text + `text-shadow` metallic bevel stack (`0 1px 0 #B38728, 0 2px 0 #8B6914, 0 3px 6px #00000088`); (2) main element = 5-stop molten-gold gradient (`#8B6914 → #D4AF37 → #FFEB99 → #D4AF37 → #8B6914`) via `background-clip: text` + `-webkit-text-fill-color: transparent`, animated `background-position` over 5s `ease-in-out` (the wide `#FFEB99` highlight band = the "glazing"); (3) `::after` overlay = white radial spot (`radial-gradient(circle at var(--sweep-x) 50%, rgba(255,235,153,0.9), transparent 40%)`) with `mix-blend-mode: screen`, also `background-clip: text`, `--sweep-x` animated `-20% → 120%` over 5s — this is the "light bulb passing over the gold." Register both custom properties via `@property --sweep-x` and `@property --halo` so they animate smoothly. Add a pulsing `filter: drop-shadow(0 0 var(--halo) rgba(212,175,55,0.4))` where `--halo` swells 4px → 12px synced to the sweep midpoint (the halo peaks when the highlight is centered). On scroll-into-view, reveal the wordmark via `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` over 1.2s `cubic-bezier(0.7,0,0.3,1)` using the existing `.sigma-card-reveal` trigger, THEN start the infinite shimmer. Respect `prefers-reduced-motion` (already handled globally at globals.css line 888 — add `.taungoo-wordmark` to the disable list).

---

## Appendix: Search queries executed (16 total)

| # | File | Query |
|---|------|-------|
| 1 | q1_sci_hero.json | "awwwards sci-fi hero card design tactical HUD panel" |
| 2 | q2_linear_card.json | "Linear app card design clean minimal product UI hierarchy" |
| 3 | q3_shimmer.json | "CSS gold shimmer text animation light sweep gradient tutorial" |
| 4 | q4_cyberpunk.json | "cyberpunk dashboard card UI web design awwwards corner brackets" |
| 5 | q5_game_hud.json | "Death Stranding Splinter Cell Metal Gear Solid HUD UI design analysis" |
| 6 | q6_stripe_vercel.json | "Stripe Vercel product card design clean layout visual hierarchy" |
| 7 | q7_minimal_card.json | "minimal expandable card design awwwards clean service list" |
| 8 | q8_holographic.json | "holographic card UI web design glassmorphism glow border animation" |
| 9 | q9_footer_wordmark.json | "awwwards footer wordmark animation text glow effect" |
| 10 | q10_shimmer_code.json | "background-clip text gradient shimmer animation keyframes CSS codepen" |
| 11 | q11_tactical_ui.json | "tactical military UI design web dashboard signal indicator sparkline" |
| 12 | q12_halo_hud.json | "Halo video game HUD design elements corner brackets scanline analysis" |
| 13 | q13_blend_glow.json | "mix-blend-mode screen text glow sweep animation CSS radiant" |
| 14 | q14_corner_bracket.json | "corner bracket framing UI card design cyberpunk SVG bracket corner" |
| 15 | q15_pricing_card.json | "Linear method pricing card design clean focused single CTA" |
| 16 | q16_gold_molten.json | "molten gold text effect CSS gradient #D4AF37 metallic shine animation" |

**Total results analyzed:** ~120 individual search results across the 16 queries.
**Raw JSON:** `/tmp/design-research/q1_sci_hero.json` through `q16_gold_molten.json`.
