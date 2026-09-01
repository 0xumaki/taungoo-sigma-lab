# Research: CIA / US Army / Military Game UI for Beta Mode

**Task ID:** MILITARY-UI-RESEARCH
**Date:** 2025
**Goal:** Make Beta Mode feel like "CIA or Game style US Army" — a grand, tactical, mission-briefing command center.
**Status:** ✅ Research complete. Specs below are implementation-ready.

---

## 1. Executive Summary

The "CIA / US Army game" aesthetic is built on **five pillars** distilled from 16 targeted searches:

1. **Black-site darkness** — CIA.gov's 2021 redesign ("black site aesthetics", per LA Times) set against a stark near-black background, offset by dots/lines forming topographical contours (NYT, ThePrint). Pure black is the canvas; light is the data.
2. **HUD-as-decoration** — Splinter Cell: Blacklist treats panels with "semi-transparent gradients creating a light glassy look"; MGS's codec uses angular, pixelated frames; CoD's HUD is minimalist — only essentials (gameUIDatabase, hudsandguis).
3. **Monospace + stencil typography** — Tactical UIs universally use monospaced type for data, codes, coordinates, timestamps (JetBrains Mono, IBM Plex Mono). Display type is condensed/extended.
4. **Olive/charcoal/amber palette** — Filmora's "Stealth UI Overlay" canonical palette: charcoal + deep olive + muted sage + pale stone; tactical HUDs add a single high-saturation accent (amber #FFB300, signal-green #C6FF00, or cyan #00E5FF).
5. **Mission-briefing structure** — Sections read as classified dossiers: classification banners, mission codes, status indicators, redaction bars, coordinate readouts, target reticles.

For an award-winning agency feel, layer in patterns from **Lazarev** (bold bento grids, oversized typography), **Active Theory** (cinematic transitions, WebGL-grade polish), and Awwwards-winning **footers** (fat footers with sitemap + contact + brand moment) and **multi-step forms** (progress indicators, conversational flows, conversion-optimized).

---

## 2. Exact Color Palette — "BLACKSITE" System

Distilled from CIA.gov, Splinter Cell: Blacklist, MGS codec, Filmora's Stealth UI Overlay, and tactical HUD libraries (Adobe Stock, Shutterstock, Vecteezy).

### 2.1 Core Surfaces (the "command center room")

| Token | Hex | Usage |
|---|---|---|
| `--bs-void` | `#050608` | App background — near-pure black with a 2% blue tint (CIA.gov's "stark black background") |
| `--bs-bunker` | `#0A0C10` | Section background, slightly lifted |
| `--bs-panel` | `#101318` | Card/panel surface (Splinter Cell "glassy" base) |
| `--bs-panel-2` | `#161A20` | Elevated panel / hover |
| `--bs-panel-3` | `#1E242C` | Active / selected state |
| `--bs-line` | `rgba(200,210,220,0.08)` | Hairline borders (CIA dots-and-lines motif) |
| `--bs-line-strong` | `rgba(200,210,220,0.16)` | Emphasized borders |
| `--bs-grid` | `rgba(120,140,160,0.04)` | Topographical grid overlay |

### 2.2 Foreground / Typography

| Token | Hex | Usage |
|---|---|---|
| `--bs-text` | `#D4DCE4` | Primary text — cold white, not warm |
| `--bs-text-bright` | `#FFFFFF` | Headlines, classified stamps |
| `--bs-text-dim` | `#7A8694` | Metadata, captions |
| `--bs-text-faint` | `#3A4452` | Disabled, redacted-bar text |

### 2.3 Tactical Accent System (single-signal rule)

Pick ONE primary signal color per mission context; the rest stay muted.

| Token | Hex | Meaning | Source |
|---|---|---|---|
| `--bs-signal-amber` | `#FFB300` | WARNING / active mission / live deploy | CoD HUD, MGS alert |
| `--bs-signal-green` | `#00FF94` | GO / success / online | CIA seal green, tactical HUD |
| `--bs-signal-cyan` | `#00E5FF` | DATA / scan / targeting reticle | Splinter Cell, fighter-jet HUD |
| `--bs-signal-lime` | `#C6FF00` | BUILD / progress | tactical drone UI |
| `--bs-signal-red` | `#FF3D3D` | DANGER / breach / error | universal |
| `--bs-signal-magenta` | `#FF2D7E` | CLASSIFIED / encrypted | rare accent |
| `--bs-signal-olive` | `#5A6B4A` | Olive drab — the "US Army" grounding tone | Filmora Stealth UI |
| `--bs-signal-sage` | `#8A9B7A` | Muted olive secondary | Filmora Stealth UI |

**Recommended primary signal for Beta Mode:** `--bs-signal-amber` (#FFB300) as the default mission accent, with `--bs-signal-cyan` (#00E5FF) as the secondary "data" accent. This matches the existing `beta-data.ts` palette (#FFB300 and #00E5FF already present) — meaning **zero migration cost**.

### 2.4 Glass / HUD Overlays

```css
--bs-glass: rgba(16, 19, 24, 0.72);          /* Splinter Cell glassy panel */
--bs-glass-border: rgba(0, 229, 255, 0.18); /* cyan-tinted edge */
--bs-glass-blur: 8px;
--bs-hud-line: rgba(0, 229, 255, 0.4);       /* targeting reticle line */
--bs-scanline: rgba(255, 255, 255, 0.02);    /* CRT scanline overlay */
```

---

## 3. Typography — Tactical HUD Stack

### 3.1 Recommended Font System

| Role | Font | Weight | Usage |
|---|---|---|---|
| **Display / Headlines** | **Space Grotesk** (or Geist) | 500–700 | Section titles, mission names — condensed tactical feel |
| **Mono / Data** | **JetBrains Mono** | 400–600 | Coordinates, codes, timestamps, status readouts, data tables |
| **Body** | **Inter** (or IBM Plex Sans) | 400–500 | Paragraph text, descriptions |
| **Stencil / Stamp** | **Special Elite** or **Stardos Stencil** | 700 | "CLASSIFIED", "TOP SECRET", "MISSION BRIEF" stamps only |

### 3.2 Type Scale (tactical command center)

```
CLASSIFIED STAMP:    11px, JetBrains Mono, 600, letter-spacing 0.18em, uppercase
EYEBROW / LABEL:     12px, JetBrains Mono, 500, letter-spacing 0.15em, uppercase, --bs-text-dim
COORDINATE READOUT:  13px, JetBrains Mono, 400, --bs-signal-cyan
SECTION TITLE:       clamp(2.5rem, 6vw, 5rem), Space Grotesk, 700, --bs-text-bright
SECTION SUBTITLE:    clamp(1rem, 1.4vw, 1.25rem), Inter, 400, --bs-text-dim
DATA VALUE:           clamp(2rem, 4vw, 3.5rem), JetBrains Mono, 600, --bs-signal-amber
BODY:                 15–17px, Inter, 400, line-height 1.6, --bs-text
MICRO:                11px, JetBrains Mono, 400, --bs-text-faint
```

### 3.3 Tactical Type Treatments

- **Bracketed labels**: `[ MISSION ID: TAU-2025-001 ]` — monospace, dim, bracket-wrapped
- **Coordinate format**: `LAT 16.8409° N · LON 96.1735° E` — cyan mono
- **Timestamps**: `21:47:03 UTC · 2025.11.18` — always UTC, always mono
- **Status prefixes**: `STATUS://`, `REQ://`, `ACK://`, `ERR://` — terminal-style
- **Redaction**: black bars `████████` over sensitive text, `--bs-text-faint` underneath

---

## 4. Section-by-Section Design Patterns

### 4.1 HERO / MISSION BRIEFING

**3 key patterns:**

1. **Classification banner frame** — Thin top bar `[ CLASSIFIED // CLEARANCE: SIGMA-7 ]` in mono amber, plus corner reticle marks `⌜ ⌝ ⌞ ⌟` at viewport corners (MGS codec aesthetic).
2. **Monumental wordmark + dossier subtitle** — Giant `TAUNGOO` or `MISSION CONTROL` in Space Grotesk 700, with a typewriter mono subtitle line below (`CIA.gov` stark structure + existing typewriter in `MissionHero.tsx`).
3. **Live status rail** — Vertical right-edge rail with blinking `● LIVE`, timestamp ticking, and a scrolling coordinate ticker (Splinter Cell Blacklist HUD). Already partially exists as "vertical status rail" — upgrade it to live-ticking.

**Layout:**
```
┌─[ CLASSIFIED // CLEARANCE: SIGMA-7 ]──────────────────────┐
│ ⌜                                            ● LIVE 21:47  │
│                                                            │
│              T  A  U  N  G  O  O                            │
│              ━━━━━━━━━━━━━━━━━                              │
│   > MISSION CONTROL // AI · WEB3 · FULL-STACK SYSTEMS      │
│   > Typewriter one-liner...                                 │
│                                                            │
│              [ INITIATE BRIEFING → ]                        │
│                                            ⌝                │
│ LAT 16.84°N · LON 96.17°E · ALT 23m · SIG STRONG          │
└─[ EOF // 2025.11.18 ]──────────────────────────────────────┘
```

---

### 4.2 TEAM / OPERATORS SECTION

**3 key patterns (from Lazarev, Active Theory, Awwwards team collections):**

1. **Operator dossier cards** — Each team member is a "dossier": portrait in monochrome with a duotone amber/cyan overlay, call-sign (`THE ARCHITECT`), real name, role, and a "skills" tag cloud rendered as clearance badges. Lazarev's about page uses bold bento grids for this.
2. **Bento grid layout** — Asymmetric grid where one operator gets a large feature tile (2×2), others fill in around it. Hover reveals a "scanning" sweep line (Active Theory's cinematic polish). Corner reticle marks on each card.
3. **Clearance-level filtering** — A top filter bar `[ ALL ] [ AI DIVISION ] [ WEB3 UNIT ] [ FULL-STACK CORPS ]` styled as tabbed mission segments. Selected tab gets amber underline + `[ ACTIVE ]` mono tag.

**Layout:**
```
┌─[ OPERATORS // ACTIVE ROSTER: 06 ]────────────────────────┐
│                                                            │
│  [ALL] [AI DIV] [WEB3 UNIT] [FULL-STACK CORPS]   06 / 06  │
│  ━━━━━━━                                                    │
│  ┌─────────────┐ ┌──────┐ ┌──────┐                         │
│  │             │ │  Σ   │ │  ◴   │                         │
│  │  THE        │ │ AR-  │ │ NEU- │                         │
│  │  ARCHITECT  │ │ CHI- │ │ RAL  │                         │
│  │  Aung Min   │ │ TECT │ │ HAND │                         │
│  │  Lab Dir    │ │      │ │      │                         │
│  │  [CLEAR α]  │ │      │ │      │                         │
│  └─────────────┘ └──────┘ └──────┘                         │
│   ⌜              ⌜         ⌜                                │
└─[ ROSTER SYNCED · 21:47:03 UTC ]──────────────────────────┘
```

---

### 4.3 WORK / DEPLOYMENTS PORTFOLIO

**3 key patterns (from case-study.club, Awwwards portfolio, CoD mission select):**

1. **Mission-select grid** — Like CoD's mission select screen: each project is a "deployment" card with a tactical map thumbnail, mission code (`OP-001 · OMNIBRIDGE`), status (`● DEPLOYED`, `● ARCHIVED`, `● ACTIVE`), tech stack as "loadout" badges. Clicking opens a full mission dossier (case study page).
2. **Filter by theater** — `[ ALL THEATERS ] [ AI ] [ WEB3 ] [ FULL-STACK ]` styled as theater-of-operations tabs. Active theater glows amber.
3. **Detail expansion** — Hover or click expands card to reveal: objective, solution, outcome metrics (`TARGET ACQUIRED`, `UPTIME 99.9%`, `TX 2.4M`). Use a "scan reveal" animation — a horizontal sweep line unlocks the detail (Splinter Cell glassy + Active Theory cinematic).

**Layout:**
```
┌─[ DEPLOYMENT LOG // 09 OPERATIONS ]───────────────────────┐
│  [ALL] [AI] [WEB3] [FULL-STACK]              SORT: RECENT ▾│
│  ━━━━━━━                                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ OP-001   │ │ OP-002   │ │ OP-003   │                    │
│  │ ┌────┐   │ │ ┌────┐   │ │ ┌────┐   │                    │
│  │ │MAP │   │ │ │MAP │   │ │ │MAP │   │                    │
│  │ └────┘   │ │ └────┘   │ │ └────┘   │                    │
│  │ OMNI-    │ │ DUKON    │ │ VORTEX   │                    │
│  │ BRIDGE   │ │ PRO      │ │ SALES OS │                    │
│  │ ● ACTIVE │ │ ● ACTIVE │ │ ● LIVE   │                    │
│  │ [WEB3]   │ │ [FS]     │ │ [AI]     │                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
└─[ LOG UPDATED · 09/09 SYNCED ]─────────────────────────────┘
```

---

### 4.4 FOOTER / COMMAND DECK

**3 key patterns (from Awwwards footer collection, digitale silk, neue world):**

1. **Fat footer as command deck** — Awwwards best practice: footers are prime real estate for sitemap + contact + brand moment. Structure as a "command deck" with 4 columns: NAVIGATION, DIVISIONS, INTEL (blog/insights), COMMS (contact). Plus a monumental brand wordmark and a classification footer bar.
2. **Oversized brand wordmark + scanline** — Giant `TAUNGOO` or `Σ` watermark at footer bottom, with a thin scanline animation sweeping across (CRT/tactical monitor feel). Neue World 2026 trend: "fat footer for SEO + brand statement."
3. **Status bar + coordinate readout** — Bottom strip with live UTC clock, system status (`ALL SYSTEMS NOMINAL`), version/build hash, and a `BACK TO TOP ↑` styled as `ASCEND ↑`. Include subtle legal links as `[ TERMS ] [ PRIVACY ] [ CLASSIFIED ]`.

**Layout:**
```
┌─[ COMMAND DECK ]──────────────────────────────────────────┐
│                                                            │
│  NAVIGATION     DIVISIONS      INTEL          COMMS        │
│  Home          AI Systems     Insights        Contact      │
│  Operators     Web3 Unit       Case Studies   Locations    │
│  Deployments   Full-Stack      Manifesto      Telegram     │
│  Process       Design Corps    Changelog       Signal       │
│                                                            │
│  ═══════════════════════════════════════════════════════   │
│                                                            │
│                    T  A  U  N  G  O  O                      │
│                    Σ  I  G  M  A   L  A  B                   │
│                                                            │
│  ● ALL SYSTEMS NOMINAL   21:47:03 UTC   v3.14.0   ASCEND ↑  │
│  [TERMS] [PRIVACY] [CLASSIFIED] © 2025 TAUNGOO SIGMA LAB   │
└─[ END OF TRANSMISSION ]────────────────────────────────────┘
```

---

### 4.5 CONTACT / DEPLOYMENT REQUEST FORM

**3 key patterns (from weweb, ventureharbour, formester 2026 trends):**

1. **Multi-step mission briefing** — VentureHarbour 2026: multi-step forms outperform single-step. Reframe contact as a 4-step deployment request: `01 INTEL` (project type, budget) → `02 OBJECTIVE` (scope, timeline) → `03 COMMS` (contact details) → `04 DEPLOY` (review + submit). Progress shown as `[ 01 ─ 02 ─ 03 ─ 04 ]` mission segments.
2. **Terminal-style inputs** — Inputs styled as terminal fields: `REQ://PROJECT_TYPE ▾`, blinking cursor, mono labels, amber focus ring. Validation errors shown as `ERR://FIELD_REQUIRED` in red mono. Formester 2026 trend: conversational flows + neo-brutalism.
3. **Confirmation as mission-acceptance** — On submit, show a full-screen `MISSION ACCEPTED` confirmation with a generated mission ID (`MISSION-ID: TAU-2025-0947`), encrypted transmission animation, and an ETA readout. This is the Active Theory "cinematic moment" + weweb conversion-optimized completion.

**Layout:**
```
┌─[ DEPLOYMENT REQUEST // FORM ACTIVE ]─────────────────────┐
│                                                            │
│  [ 01 INTEL ] ── [ 02 OBJECTIVE ] ── [ 03 COMMS ] ─ [ 04 ] │
│  ━━━━━━━                                                    │
│                                                            │
│  REQ://PROJECT_TYPE                                        │
│  [ AI Chatbot                          ▾ ]                  │
│                                                            │
│  REQ://BUDGET_RANGE                                       │
│  [ ◯ 2M–5M MMK  ◯ 5M–10M  ◉ 10M+ ]                      │
│                                                            │
│  REQ://TIMELINE                                           │
│  [ ──────────●──────  4–8 WEEKS ]                         │
│                                                            │
│                            [ ABORT ]    [ TRANSMIT → ]     │
└─[ AWAITING INPUT · 21:47:03 UTC ]──────────────────────────┘
```

---

### 4.6 SCROLL SNAP / SECTION TRANSITIONS

**3 key patterns (from Awwwards scroll-snap collection, GSAP, Spring I/O 2025):**

1. **CSS scroll-snap mandatory sections** — `scroll-snap-type: y mandatory` on the container, `scroll-snap-align: start` on each section. Each section is `min-height: 100vh` so it locks into place like a mission briefing slide (Poison Studio, Joseph Santamaria '26 Awwwards inspiration).
2. **Section-progress HUD** — A fixed vertical progress rail (left or right edge) showing `[ 01 ● 02 ○ 03 ○ 04 ○ ]` — current section glows amber. Clicking a node snaps to that section. Combined with the existing `SigmaProgress` component.
3. **Cross-section transition wipes** — On section change, a brief horizontal "scan wipe" sweeps across (Splinter Cell glassy + Active Theory cinematic). Section labels fade in with a mono typewriter effect. GSAP ScrollTrigger drives color shifts in the ambient gradient per section.

**Implementation note:**
```css
.beta-snap-container {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
.beta-snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 100vh;
}
```

---

## 5. Reusable Tactical Components (build these)

| Component | Purpose | Key visual |
|---|---|---|
| `<ClassifiedBanner>` | Top/bottom classification strip | Mono amber text, bracket-wrapped |
| `<CornerReticle>` | ⌜⌝⌞⌟ corner marks on cards/sections | Cyan hairlines, 12px |
| `<StatusPill status="live\|active\|archived\|error">` | Status indicator | Blinking dot + mono label |
| `<CoordinateReadout lat lon alt />` | Geo coordinate ticker | Cyan mono, ticking |
| `<MissionCode id="OP-001" />` | Mission identifier | Mono, amber prefix |
| `<RedactedBar>` | Redaction effect | Black bar over faint text |
| `<ScanReveal>` | Hover/click reveal with sweep | Horizontal cyan sweep line |
| `<TerminalInput>` | Form input as terminal field | `REQ://` prefix, blinking cursor, amber focus |
| `<HudFrame>` | Glassy bordered panel | `--bs-glass` + cyan border + blur |
| `<SectionHeader code="02" title="OPERATORS" status="ACTIVE">` | Standardized section opener | Mission code + title + status |
| `<LiveClock utc />` | Ticking UTC timestamp | Mono, updates every second |
| `<ScanlineOverlay>` | CRT scanline effect over sections | Subtle horizontal lines, 2% opacity |

---

## 6. Animation & Interaction Patterns

| Pattern | Trigger | Effect | Source |
|---|---|---|---|
| **Typewriter reveal** | Section enters viewport | Mono text types out char-by-char | MGS codec, existing `MissionHero` |
| **Scan sweep** | Card hover / section change | Horizontal cyan line sweeps, revealing content | Splinter Cell glassy |
| **Glitch flicker** | Random / on mode-switch | Brief RGB-split glitch on titles | Active Theory cinematic |
| **Status blink** | Continuous | `● LIVE` dot pulses every 1.5s | CoD HUD |
| **Boot sequence** | Initial load | `INITIALIZING... DECRYPTING... CLEARANCE GRANTED` | MGS, CIA black-site feel |
| **Redaction reveal** | Hover | `████████` bar slides away to reveal text | Classified dossier |
| **Targeting reticle** | Cursor over interactive | Reticle brackets snap to element corners | Fighter-jet HUD |
| **Coordinate drift** | Continuous | Coordinates subtly shift (0.0001°) every few seconds | Live tactical feed |

---

## 7. Migration Path (from current Beta Mode)

Current Beta Mode uses Ethena/Ondo palette (`--beta-bg: #09090B`, `--beta-accent: #88B4F5`). Migration is **low-risk** because:

1. **Keep** `--beta-bg: #09090B` → remap to `--bs-void` (near-identical).
2. **Swap** primary accent from blue `#88B4F5` → amber `#FFB300` (already in `beta-data.ts` STEPS/PRINCIPLES).
3. **Add** cyan `#00E5FF` as secondary data accent (already in `beta-data.ts`).
4. **Add** olive/sage tones `#5A6B4A` / `#8A9B7A` for grounding.
5. **Introduce** JetBrains Mono alongside existing Geist Mono for "tactical data" contexts.
6. **Layer** HUD overlay components (`<ClassifiedBanner>`, `<CornerReticle>`, `<ScanReveal>`) on top of existing section structure — no rewrite needed.

**Estimated effort:** Add ~12 tactical components + a new CSS variable block `--bs-*`. Existing sections (`MissionHero`, `Operators`, `WorkDeployments`, `StartProject`, `BetaFooter`) gain tactical framing without restructuring.

---

## 8. Sources & References

### Military / Tactical UI
- **CIA.gov redesign** (2021) — "black site aesthetics", stark black bg, topographical dots/lines — [cia.gov/stories](https://www.cia.gov/stories/story/behind-the-design/), [NYT](https://www.nytimes.com/2021/01/08/style/cia-rebrand.html), [LA Times](https://www.latimes.com/entertainment-arts/story/2021-01-08/the-cia-redesigns-its-logo)
- **Splinter Cell: Blacklist** — semi-transparent glassy gradients, HUD panels — [hudsandguis.com](https://www.hudsandguis.com/home/2013/09/04/splinter-cell-blacklist-interface-design), [Behance](https://www.behance.net/gallery/10567575/Splinter-Cell-Blacklist-Graphic-Design)
- **Splinter Cell: Conviction** — spatial projected UI, black-and-white aesthetic — [GameDeveloper](https://www.gamedeveloper.com/design/user-interface-design-in-video-games)
- **Metal Gear Solid codec** — angular pixelated frames, monospace data, character portraits — [ArtStation](https://www.artstation.com/artwork/8l2w0x), [LinkedIn review](https://www.linkedin.com/pulse/metal-gear-solid-1-ui-review-nial-aksyanov-rtshc)
- **Call of Duty HUD/menu** — minimalist, mission-select, accessibility-first — [gameuidatabase.com](https://www.gameuidatabase.com/gameData.php?id=279), [topographiccreative.com](https://topographiccreative.com/our-work/call-of-duty-ui-concepts)
- **Tactical color palette** — "Stealth UI Overlay": charcoal + deep olive + muted sage + pale stone — [filmora.wondershare.com](https://filmora.wondershare.com/video-creative-tips/army-color-palette.html)

### Award-Winning Agency Patterns
- **Lazarev Agency** — bold bento grids, oversized typography, AI-fueled product design — [lazarev.agency/about-us](https://www.lazarev.agency/about-us), [Awwwards Agency of the Year nominee](https://dribbble.com/shots/20493976)
- **Active Theory** — cinematic transitions, WebGL-grade polish, story+art+tech blend — [activetheory.net](https://activetheory.net), [Webby Awards](https://www.webbyawards.com/crafted-with-code/active-theory), [LBB Online 2025](https://lbbonline.com/news/The-Art-of-Thoughtful-Digital-How-Active-Theory-Is-Redefining-What-Great-Experience-Feels-Like)
- **Awwwards team sections** — [Team & About Pages collection](https://www.awwwards.com/awwwards/collections/about-page), [Qream team](https://www.awwwards.com/inspiration/team-section-qream-design-agency-1), [ISRA team presentation](https://www.awwwards.com/inspiration/team-presentation-isra-design)

### Footers
- **Awwwards footer collection** — [footer-design](https://www.awwwards.com/websites/footer-design), [25 Creative Footers](https://www.awwwards.com/15-excellent-creative-website-footers.html), [Footer Best Practices](https://www.awwwards.com/awwwards/collections/website-footer-design-best-practices)
- **Digital Silk 2026** — 10 best footers, prime real estate — [digitalsilk.com](https://www.digitalsilk.com/web-design/web-trends/website-footer-design-examples)
- **Neue World 2026** — fat footer for SEO + brand — [neue.world](https://www.neue.world/insights/best-website-footer-design-examples)
- **Halo Lab, Blacksmith Agency** — footer examples and best practices

### Portfolios / Case Studies
- **Case Study Club** — [top 20 UX portfolios 2026](https://www.casestudy.club/journal/ux-designer-portfolio)
- **UXPilot 2026** — scannable site with clear case study navigation, consistent layouts — [uxpilot.ai](https://uxpilot.ai/blogs/product-design-portfolio-case-studies)
- **UXFol.io template** — [Ultimate UX case study structure 2026](https://blog.uxfol.io/ux-case-study-template)

### Scroll Snap
- **Awwwards scroll sites** — [Best Scroll Websites](https://www.awwwards.com/websites/scrolling)
- **Poison Studio scroll snap** — [Awwwards inspiration](http://www.awwwards.com:8080/inspiration/scroll-snap-poison-studio-2)
- **Joseph Santamaria '26** — works snap scroll — [Awwwards inspiration](https://www.awwwards.com/inspiration/works-snap-scroll-joseph-santamaria-1)
- **GSAP animation** — [Best GSAP websites](https://www.awwwards.com/websites/gsap)

### Contact Forms
- **WeWeb 2026** — [multi-step form best practices](https://www.weweb.io/blog/multi-step-form-design)
- **VentureHarbour 2026** — multi-step outperforms single-step — [15 landing page form examples](https://ventureharbour.com/15-landing-page-form-best-practices-examples)
- **Formester 2026** — [12 form design trends: conversational + neo-brutalism](https://formester.com/blog/website-and-form-design-trends)
- **Designmodo** — [creative contact & web form designs](https://designmodo.com/contact-web-form-designs)

### Typography
- **JetBrains Mono** — free, open source, 9° angle, optimal contrast — [jetbrains.com/lp/mono](https://www.jetbrains.com/lp/mono)
- **IBM Plex Mono** — business upright, party italic — [fonts.google.com](https://fonts.google.com/specimen/IBM+Plex+Mono)
- **Tactical games UX** — HUD conveys aesthetic, puts player in commander role — [Medium games-r-ux](https://medium.com/games-r-ux/ui-and-ux-in-tactical-games-three-considerations-82c546e9e48)

---

## 9. Next Actions

1. ✅ Research complete (this document).
2. **Next:** Implement the `--bs-*` CSS variable block in `globals.css` (additive to existing `--beta-*`).
3. **Next:** Build the 12 reusable tactical components listed in §5.
4. **Next:** Wrap existing Beta sections (`MissionHero`, `Operators`, `WorkDeployments`, `StartProject`, `BetaFooter`) with tactical framing — `<ClassifiedBanner>`, `<CornerReticle>`, `<SectionHeader>`.
5. **Next:** Add JetBrains Mono to font stack + apply to data/coordinate/code contexts.
6. **Next:** Implement scroll-snap on the Beta experience shell (`scroll-snap-type: y mandatory`).
7. **Optional:** Add WebGL/Canvas scanline + reticle-cursor overlay for full Active Theory polish.

---

*End of research dossier. Classification: UNCLASSIFIED // APPROVED FOR RELEASE.*
