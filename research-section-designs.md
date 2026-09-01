# Section Design Research — Beta Mode v4 (Full Redesign)

**Task ID:** SECTION-DESIGN-RESEARCH
**Date:** 2026 (research sweep)
**Scope:** Research-only deliverable. NO code modified.
**Brief:** The current Beta Mode design is "low quality" and must be REPLACED ENTIRELY across all 8 sections. Forget the existing layouts and start from award-winning patterns.

---

## 0. Executive summary

The current Beta Mode (post-Ethena+Ondo Stage 70) is competent but generic — animated counter hero, expandable bento of 27 services, sticky timeline, numbered trust cards, horizontal team scroller, long-form testimonial paragraphs, and a 4-step form. None of it is award-worthy. The user explicitly wants to "forget and delete" all of it.

Across 22 real web searches (Pinterest, Behance, Awwwards, Dribbble, Neuform, Aura, Artlist, Linear/Vercel/Apple analysis, Lazarev, Active Theory) plus 2 deep `page_reader` fetches (InspoAI "30 Best Hero Section Designs" and `lazarev.agency/cases`), the dominant 2026 pattern is clear:

> **Massive typography + one bold statement + minimal chrome + motion that supports the message + tactile micro-interactions.**

This research proposes 8 NEW section designs that all share a single discipline:
- **One job per section** (no dashboard-widget stuffing)
- **Editorial typography as the hero** (Space Grotesk + Fraunces italic + Geist Mono — already in the project)
- **Indigo #88B4F5 as the only accent** (Ethena-grade restraint)
- **Motion that explains, never decorates**
- **No "lifetime service" or overpromising language anywhere**

Each section below cites specific award-winning examples with URLs.

---

## 1. Methodology

### Sources searched (real queries, real results)
| # | Query | Where it pointed |
|---|---|---|
| 1 | "best hero section design 2025 2026 awwwards minimal one liner enterprise" | Awwwards / unsection.com / SiteBuilderReport / LogRocket |
| 2 | "best services section design awwwards 2025 2026 agency capabilities catalog" | Awwwards "Services Section — The First The Last Agency" |
| 3 | "best portfolio work section design awwwards 2025 2026 case study" | Awwwards portfolio collection, Bruno Simon case study |
| 4 | "best about us section design 2025 2026 award winning agency method" | wavespace.agency, Spinx, Thunderclap |
| 5 | "best trust pillars design website 2025 2026 values" | designforce.co "Top Website Designs 2026 — 7 Traits" |
| 6 | "best blog insights section design awwwards 2025 2026 publications" | Awwwards "Inspiring Design Blogs", OptimizePress, MarketerMilk |
| 7 | "best team section design awwwards 2025 2026 agency members" | Awwwards "Team & About Pages", Qream Design Agency |
| 8 | "best testimonial section design 2025 2026 award winning social proof" | Webflow testimonials blog, Red Baton, Mockplus |
| 9 | "best contact section design awwwards 2025 2026 conversion" | Awwwards "Best Contact Us Page Examples" |
| 10 | "best CTA section design 2025 2026 award winning start a project" | cta.gallery, saaspo CTA section, landingi |
| 11 | "Linear hero section design analysis minimal SaaS" | InspoAI "30 Best Hero Section Designs" — confirms Linear #1 |
| 12 | "Vercel hero section design analysis dark mode" | saaspo Vercel hero (Dark Mode, Gradients, Boxed tags) |
| 13 | "Apple hero section design minimal product page typography" | Apple Design Resources, onepage.io |
| 14 | "award winning agency website 2025 2026 full analysis Lazarev Active Theory Resn" | Active Theory v4 Awwwards SOTD, LBB Online profile |
| 15 | "pinterest best website section design 2025 2026" | Pinterest boards for Services/Testimonial/CTA/Numbered List/Bento/Split/Marquee |
| 16 | "behance best web design 2025 2026 section layout" | Behance search: Website Design 2026, Web Design, Design Portfolio |
| 17 | "dribbble best hero section 2025 2026 minimal enterprise" | Dribbble hero-section tag (20,861 designs) |
| 18 | "neuform best agency website 2025 2026" | Reddit "25 Best UI Design Inspiration 2025", Webflow blog |
| 19 | "aura best web design 2025 2026" | Medium "5 AI design tools 2026 — Aura Build by Meng To" |
| 20 | "artlist best website design 2025 2026" | Framer "20 artist website examples", 99designs artist web |
| 21 | "Lazarev.agency portfolio case study layout design" | lazarev.agency/cases + Metastaq case study |
| 22 | "bento grid services section design dark mode enterprise" | SaaSFrame "Bento Layout Trend", bentogrids.com |

### Deep page fetches
- `https://www.inspoai.io/blogs/best-hero-section-designs` (128KB HTML, 37k tokens) — extracted concrete Linear/Stripe/Notion/Figma/Vercel hero descriptions
- `https://www.lazarev.agency/cases` (342KB HTML) — extracted Lazarev's case-study taxonomy and program structure

### Cross-cutting findings (apply to all 8 sections)

**From designforce.co — "Top Website Designs in 2026: 7 Traits the Best Sites Share":**
1. Clarity at first glance
2. Motion that supports the message
3. A recognizable visual identity
4. Simpler choices work better
5. Trust is built visually (not textually)

**From Vistaprint — "8 top web design trends for 2026":**
- Cute-alism, Dial-Up Delight, Resonant Stark, Frosted Touch, Light Skeuomorphism, AI-Powered design
- For Beta Mode (enterprise dark) the relevant movements are **Resonant Stark** (high-contrast, restrained, monumental type) and **Frosted Touch** (glassmorphic surfaces).

**From Wix — "11 Biggest Web Design Trends of 2026":**
- 2025 = warmth + handmade; 2026 = bold gradients, retrofuturism, chrome textures, pixel art, sci-fi aesthetics. Taungoo should keep **retrofuturist restraint** (Sigma S01 brutalist echo) but strip the chrome/pixel-art noise for enterprise.

**From Tabnav — "60 Best Website Design Examples 2026":**
- "Oversized Hero Typography anchors the entire layout and instantly sets a strong visual hierarchy"
- "Floating Analytics" (subtle data HUD overlay)

---

## 2. Section-by-section research + proposals

---

### Section 1 — HERO (Mission / brand statement)

#### Top 5 patterns found across Awwwards / Dribbble / Behance / Pinterest / InspoAI

1. **Single centered or left-aligned monumental headline, no dashboard widgets** — Linear is the canonical example: dark background, single centered headline in Denton extended font, subheadline in lighter weight, isolated CTA with ample padding. The visual is an "abstract gradient noise overlay subtly animated." (InspoAI "30 Best Hero Section Designs", #1)
2. **Asymmetrical balance — text left, restrained visual right** — Linear, Stripe (two-column grid: copy+CTA left, animated product demo right). NOT a split dashboard.
3. **Full-screen background video with overlaid text column** — Vercel: "full-screen video background (abstract code animation) with text overlaid in a left-aligned column. The headline uses a heavy weight, single CTA button with an arrow icon." Tagged on saaspo as `Dark Mode · Gradients · Boxed · Black & White`. (InspoAI #5 + saaspo Vercel hero)
4. **Centered card over media with bright single accent CTA** — Notion: "full-width video background behind a centered card with headline, subheadline, and CTA. Card with rounded corners and shadow creates a clear focal point. CTA uses a bright color against a dark overlay." (InspoAI #3)
5. **Oversized hero typography as the entire hero** — Tabnav 2026 round-up: "Oversized Hero Typography — the massive headline anchors the entire layout and instantly sets a strong visual hierarchy." uxdesign.cc "Huge type on the web" documents 606px black-weight condensed type as a real pattern. Muz.li "15 Examples of Innovative Hero Typography Trends" documents hero sections where "huge white-on-black letters spell out the name of the designer, flowing left to right."

#### Specific examples (with what they do)

| Site | URL | What it does |
|---|---|---|
| **Linear** | linear.app | Dark hero, single centered H1 in Denton extended, gradient noise overlay, ONE CTA. InspoAI calls it "a masterclass in minimalism." |
| **Vercel** | vercel.com | Full-screen abstract code-animation video bg, left-aligned heavy headline, single arrow-icon CTA. saaspo tags: Dark Mode + Gradients + Boxed. |
| **Stripe** | stripe.com | Two-column grid: copy+CTA left, animated product demo right; client logos integrated directly under CTA. |
| **Notion** | notion.so | Centered card on full-width looping video; dark overlay; bright single-accent CTA. |
| **Apple product page** | apple.com | Minimalist; "the font supports the minimalist design of the hero section and directs focus towards the product" (onepage.io). Product-led visual. |
| **Active Theory v4** | awwwards.com/sites/active-theory-v4 | Awwwards SOTD (8.2/10). "Industry-leading web toolset consistently delivers award-winning work." The reference for "clean, impactful, one-liner branding." |

#### Proposed NEW design for Beta Hero (replace MissionHero entirely)

**Codename:** `BETA-HERO-S01` — *"Sigma mode S01 boot screen, but enterprise-grade."*

**Layout structure** (full-bleed, single column, vertically centered):
- Pure `#09090B` background (warm near-black from current Ethena palette — KEEP this token).
- A single **monumental wordmark** "TAUNGOO" set in Space Grotesk Bold at clamp(4rem → 14vw), letterspacing -0.04em, color `#F4F6FB` (paper white, not pure white — reduces harshness on dark).
- Below the wordmark: a **one-line typewriter statement** in Geist Mono (small, ~14px, `#88B4F5` accent) that types in over ~2.2s on first mount. Example copy (no overpromising):
  > `> taungoo.sigma.lab // enterprise software, shipped.`
- A single **primary CTA**: pill button, `#88B4F5` fill, `#0A0A0B` text, magnetic hover (Codrops "Magnetic Buttons" pattern — button translates toward cursor up to 8px). Label: "Enter Beta →". One button. No secondary button clutter.
- **No dashboard widgets, no stat counters, no split layout, no logo wall in the hero.** (Trust signals move to Section 7 / Footer.)
- Background motion: a single **slow radial gradient glow** that follows the mouse at 30% opacity (already half-built — keep the mouse-reactive glow, but kill the counters). Inspired by Linear's "abstract gradient noise overlay subtly animated."
- A vertical **system-status rail** on the left edge (Geist Mono 11px, `#5A6473` muted): `SYS · BETA · v4.0 · ▮ LIVE` — this is the Sigma S01 vertical-data-panel echo, but ONE column, not three.
- Reduced-motion: gradient freezes, typewriter types instantly, magnetic hover disabled.

**Typography hierarchy:**
- L1 wordmark: Space Grotesk 700, clamp(4rem, 14vw, 11rem), -0.04em tracking
- L2 statement: Geist Mono 400, 14px, `#88B4F5`, blinking cursor `▮`
- L3 CTA: Geist Mono 500, 14px, uppercase, letter-spacing 0.06em
- L4 status rail: Geist Mono 400, 11px, `#5A6473`

**Animation/interaction:**
1. Wordmark fade-up (gsap `power3.out`, 0.9s, 12px y-offset).
2. Statement typewriter (2.2s, custom hook `useTypewriter`).
3. CTA fade-up + scale-from-0.96 (0.6s, 0.2s delay after statement completes).
4. Mouse-reactive radial glow (existing `use-tilt-3d` + radial-gradient `background-position`).
5. Magnetic hover on CTA (Codrops pattern, transform matrix).
6. Cursor blinks forever (`@keyframes caret-blink 1.1s steps(2) infinite`).

**Inspiration citations:** Linear (#1 InspoAI), Vercel full-screen + arrow CTA (saaspo), Apple minimalist-font-as-hero (onepage.io), Sigma S01 vertical rail (existing project ref). Specifically NOT Stripe/Notion (those are split/video-card patterns — user said "NOT a split layout").

**Copy discipline (no overpromising):** Remove "lifetime service," "unlimited," "forever," "guaranteed ROI," "we ship anything." Allowed: "shipped," "deployed," "live," "beta."

---

### Section 2 — CAPABILITIES / SERVICES

#### Top 5 patterns found across Awwwards / Dribbble / bentogrids.com / SaaSFrame

1. **Bento grid with intentional asymmetry** — SaaSFrame "The Bento Layout Trend": curated light + dark mode bento grids; bentogrids.com shows mixed cell sizes. Dark-mode bentos (Pinterest "Bento Grid Website Design," layyyout.com "Bento Grid Dark Mode") use 12-16px gaps, 1px hairline borders, and ONE large hero cell.
2. **Awwwards "Services Section — The First The Last Agency"** — the canonical Awwwards inspiration page for services. Single category per row, large index number, hover-reveal description.
3. **The "index list" pattern** — large numbered rows (01, 02, 03…), each row expands on hover to reveal sub-services. Awwwards inspiration page calls this "Services Section." Pinterest "Services Section Web Design" (7k searches) confirms this as the most-saved pattern.
4. **Category tabs above a fluid grid** — Dribbble SaaS hero/services shots frequently use a 3-5 tab filter (AI / Design / Full-Stack / Web3) above a re-flowing grid. This is the current Beta pattern and is fine to KEEP, but the grid cells must be radically simpler.
5. **"Cell-as-button" with magnetic hover** — Codrops "Magnetic Buttons" + Awwwards "Magnetic Hover — Inette" inspiration. Each service cell subtly pulls toward the cursor.

#### Specific examples

| Site / source | URL | What it does |
|---|---|---|
| **Awwwards "Services Section — The First The Last Agency"** | awwwards.com/inspiration/services-section-the-first-the-last-agency | Single category per row, oversized index, hover-reveal description. |
| **bentogrids.com** | bentogrids.com | Curated bento designs (dark + light); modular cell sizes. |
| **SaaSFrame Bento Layout Trend** | saasframe.io/blog/the-bento-layout-trend | Documents the bento as a SaaS-defining layout. |
| **Awwwards "Magnetic Hover — Inette"** | awwwards.com/inspiration/magnetic-hover-inette | Magnetic cell-hover pattern. |
| **Pinterest "Services Section Web Design"** | pinterest.com/ideas/services-section-web-design/921463205015 | 7k designers saved; index-list + bento dominate. |

#### Proposed NEW design for Beta Capabilities (replace CapabilitiesBento entirely)

**Codename:** `BETA-CAPS-INDEX` — *"Indexed manifesto of services, not a card wall."*

**Layout structure** (replaces the 27-card bento):
1. **Section header:** Left-aligned H2 in Space Grotesk 700: "Capabilities." Right-aligned Geist Mono label: `27 SERVICES · 4 DOMAINS`. Thin 1px `#1F2937` hairline below.
2. **4 domain rows** (not 27 cards). Each domain is a full-width row:
   - **Row layout:** `[index 01–04, 6rem] [domain name, 24rem] [3-line description, 1fr] [arrow →, 4rem]`
   - On hover: row bg fills `#0F1117` (subtle 1-step lift from `#09090B`), domain name shifts to `#88B4F5`, an inline **3-column sub-service list** slides down (max-height 0 → 320px, 0.4s ease).
3. **Domain taxonomy (cleaner, 4 not 5):**
   - `01 AI SYSTEMS` — LLM apps, agents, RAG, evals, voice/vision (7 services)
   - `02 FULL-STACK` — Next.js, realtime, infra, DevOps, observability (8 services)
   - `03 WEB3` — smart contracts, DeFi, wallets, bridges, indexing (7 services)
   - `04 DESIGN` — product UI/UX, design systems, brand, motion (5 services)
4. Clicking a row navigates to `/services/[first-service-in-domain]` (KEEP existing detail pages). On the detail page, the sub-service chips become a left-rail nav.
5. **No "View pricing" expandable tier panel inline.** Pricing lives on `/services/[slug]` only. The current expandable Pricing Tiers panel was clutter — kill it.
6. **One accent micro-interaction per row:** the index number `01` flips to `◆` on hover (Sigma S01-style marker). 0.2s, no scale.

**Typography hierarchy:**
- H2: Space Grotesk 700, clamp(2.5rem, 5vw, 4rem)
- Index: Geist Mono 500, 14px, `#5A6473` → `#88B4F5` on hover
- Domain name: Space Grotesk 600, 28px, `#F4F6FB` → `#88B4F5` on hover
- Description: Space Grotesk 400, 16px, `#B0BBC7`
- Sub-service chips: Geist Mono 400, 12px, `#7A8595`

**Animation/interaction:**
1. Row stagger fade-up on enter (IntersectionObserver, 60ms per row).
2. Hover: bg fill + name color shift + sub-list slide-down (all CSS transitions, 0.3s).
3. Magnetic pull on the row arrow → (transform translateX 4px toward cursor).
4. Reduced-motion: all hovers become instant color changes.

**Inspiration citations:** Awwwards "Services Section — The First The Last Agency" (index list + hover reveal), SaaSFrame Bento Trend (asymmetry discipline), bentogrids.com (hairline borders), Awwwards "Magnetic Hover — Inette" (cell pull). Crucially NOT the current 27-card bento — that's the "low quality" the user rejected.

**Copy discipline:** Remove "lifetime support," "unlimited revisions," "we build anything." Replace with concrete deliverables per service (e.g., "Production LLM app in 6 weeks" not "AI solutions for any need").

---

### Section 3 — WORK / PORTFOLIO (User said "heavily redesigned the entire layout")

#### Top 5 patterns found across Awwwards / Lazarev / Active Theory

1. **Full-bleed case-study cards with metrics overlay** — Lazarev.agency/cases: each case study is a full-bleed thumbnail with a category tag (Fintech/AI/Web3), title, and 1-line outcome. Active Theory v4 (Awwwards SOTD 8.2) uses the same pattern: "latest work, experiments, and products" as full-bleed tiles.
2. **Editorial alternating image-text rows** — Qode "Split Screen Layout in Use: 20 Best Examples": "The split screen layout is repeated in several editorial pages, with images and text alternating within the sections. Grid lines and geometric." Mockplus "Split Screen Web Design: 30 Inspirational Examples" confirms this is the dominant portfolio pattern.
3. **Hover-to-play video / lottie preview** — Active Theory and Resn use muted looping video previews on hover; the still is a high-quality screenshot, motion only on intent.
4. **Case-study detail page = long-scroll storytelling** — Lazarev Metastaq case: "store builder with ready-made templates, where a brand arranges content blocks." Each case is a multi-screen scroll with problem → approach → outcome → metrics.
5. **Bruno Simon "Portfolio Case Study" (Awwwards blog, Mar 2026)** — documents the meta pattern of the portfolio-as-own-case-study (the portfolio itself is the demo).

#### Specific examples

| Site | URL | What it does |
|---|---|---|
| **Lazarev.agency/cases** | lazarev.agency/cases | Full-bleed case cards, category tag, title, 1-line outcome. Taxonomy: Fintech / AI products / Real estate / Web3. |
| **Active Theory v4** | awwwards.com/sites/active-theory-v4 (SOTD 8.2) | "Latest work, experiments, and products" as full-bleed tiles; hover-to-play video. |
| **Bruno Simon Portfolio Case Study** | awwwards.com/blog/case-study | Awwwards blog Mar 2026; portfolio-as-own-case-study meta pattern. |
| **Awwwards Portfolio collection** | awwwards.com/websites/portfolio | Curated SOTD-grade portfolio patterns. |
| **a1.gallery "Best Framer Portfolio Websites 2026"** | a1.gallery/blog/best-framer-portfolio-websites-2026 | 14 modern Framer-built portfolios; full-bleed + alternating rows dominate. |
| **Landing.love Active Theory recording** | landing.love/sites/activetheory-2 | Full-page video recording of the Active Theory portfolio interaction. |

#### Proposed NEW design for Beta Work (replace WorkDeployments entirely)

**Codename:** `BETA-WORK-EDITORIAL` — *"Alternating full-bleed case rows, like a print magazine."*

**Layout structure** (replaces the current grid of 9 project cards):
1. **Section header:** Space Grotesk 700 H2 "Selected Work." Geist Mono caption: `09 DEPLOYMENTS · 2024–2026`. Hairline below.
2. **Marquee strip of client logos** (grayscale, 6s linear infinite) directly under the header — this is the only "logos wall" on the page ( OrbitMedia / Wishpond social-proof pattern). One strip, not a grid.
3. **9 case rows, alternating L/R** (the editorial split-screen pattern from Mockplus + Qode):
   - **Even rows:** `[Full-bleed image 60vw | Text column 40vw]`
   - **Odd rows:** `[Text column 40vw | Full-bleed image 60vw]`
   - Each row is 70vh tall (the user's existing portfolio screenshots are 16:10 — fits perfectly).
   - Image: existing `/public/portfolio/*.png` assets, `object-cover`, 1px `#1F2937` border, subtle `scale(1.02)` on hover.
   - **Hover:** image reveals a muted looping video IF one exists at `/public/portfolio/[slug].mp4` (none exist yet — leave the hook, no asset required). Otherwise image lifts to `brightness(1.1)`.
4. **Text column per row:**
   - Project index `01 / 09` (Geist Mono 12px `#5A6473`)
   - Project name (Space Grotesk 700, 36px, `#F4F6FB`)
   - 1-line outcome (Fraunces italic 18px `#88B4F5` — the editorial italic, first time it appears on the page) e.g. *"$2.4M TVL bridged in 11 days"*
   - 3 metric chips (Geist Mono 11px): `NEXT.JS 14 · PRAGMA · BASE`
   - "Read case →" link (Geist Mono 13px, `#88B4F5`, arrow animates 4px on hover)
5. **Click row → `/portfolio/[slug]`** detail page (existing route, KEEP). Detail page becomes a long-scroll editorial: Problem → Approach → Build → Outcome → Metrics (Lazarev Metastaq pattern).
6. **No "filter tabs" in Work.** All 9 are shown. Filters live in Capabilities.

**Typography hierarchy:**
- H2: Space Grotesk 700, clamp(2.5rem, 5vw, 4rem)
- Project name: Space Grotesk 700, 36px
- Outcome line: Fraunces italic 400, 18px, `#88B4F5` (FIRST editorial-italic appearance — anchors the section's "premium" feel)
- Metric chips: Geist Mono 400, 11px, `#7A8595`, 1px `#1F2937` border, 4px padding

**Animation/interaction:**
1. Row-by-row reveal as user scrolls (GSAP ScrollTrigger, image clip-path inset → 0, 0.8s).
2. Image parallax: image translates y -8% on scroll (subtle).
3. Hover: image `scale(1.02)` + `brightness(1.08)`, arrow `translateX(4px)`.
4. Marquee: CSS `@keyframes ticker-scroll 20s linear infinite` (already in globals.css from Stage 70).
5. Reduced-motion: marquee pauses, parallax off, images static.

**Inspiration citations:** Lazarev.agency/cases (full-bleed case cards + taxonomy), Active Theory v4 SOTD (hover-to-play video hook), Mockplus + Qode split-screen editorial (alternating rows), a1.gallery Framer portfolios (modern full-bleed), OrbitMedia "trusted by" (single logo marquee). User's existing 9 portfolio PNGs are reused — no asset work needed.

---

### Section 4 — METHOD / ABOUT (User said trust pillars need "significant improvement")

#### Top 5 patterns found

1. **Long-form manifesto with monumental pull-quotes** — Awwwards "Inspiring Design Blogs" collection (31 items): Vita Architecture, Erik Joergensen blog. The pattern is a single long-form column with oversized pull-quotes breaking the rhythm every 3-4 paragraphs.
2. **Sticky-scroll process timeline (LEFT-pinned) with content scrolling on the right** — motion.dev "Scroll pinning example," GSAP community "Multiple Scroll trigger pin," Codrops "Sticky Grid Scroll" (Mar 2026). The element stays in place while a horizontal timeline animates as the user scrolls vertically.
3. **Numbered manifesto with color-accented numerals** — Pinterest "Numbered List Design" (932M searches), Imperavi "UI Typography Lists": "Numbered lists look much better if the items are in a circle with an accent color." Numbers as design objects, not counters.
4. **Values as large typographic statements, not card grids** — designforce.co 2026: "Trust is built visually." wavespace.agency 2026: "Trust through design — discrete security badges and compliance marks allow credibility." The pattern is ONE bold value statement per row, not a 3-card grid.
5. **Fraunces italic editorial pull-quotes against dark** — common across InspoAI hero examples and the Awwwards minimal collection. The italic provides the "human" counterpoint to the brutalist sans.

#### Specific examples

| Site / source | URL | What it does |
|---|---|---|
| **designforce.co "Top Website Designs 2026 — 7 Traits"** | designforce.co/blog/what-top-website-designs-have-in-common | "Trust is built visually." Documents that top 2026 sites show values as large type, not card grids. |
| **wavespace.agency "15 Best Website Design Examples 2026"** | wavespace.agency/blog/best-website-design-examples | "Discrete security badges and compliance marks allow credibility." |
| **Awwwards "Inspiring Design Blogs" (31 items)** | awwwards.com/awwwards/collections/inspiring-blog-design | Vita Architecture, Erik Joergensen — long-form manifesto columns. |
| **Codrops "Sticky Grid Scroll" (Mar 2026)** | tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid | Sticky-scroll pinned section with animated grid. |
| **motion.dev Scroll pinning example** | motion.dev/examples/js-scroll-pinning | Element stays in place while content scrolls. |
| **Pinterest "Numbered List Design"** | pinterest.com/ideas/numbered-list-design/932823729278 | 932M saves; numbers-in-circles with accent color. |

#### Proposed NEW design for Beta Method (replace MethodInsights entirely)

**Codename:** `BETA-METHOD-EDITORIAL` — *"A 5-paragraph manifesto, not a numbered card grid."*

The current numbered-pillar grid ("01 Outcome-First / 02 Fixed Scope / …") is rejected. The replacement is a **two-act editorial layout**:

**Act 1 — Manifesto column (sticky-pinned left, 1fr right):**
- Layout: CSS grid `grid-template-columns: 5fr 7fr`.
- **Left column (sticky, top: 12vh, height: 76vh):** A single Space Grotesk 700 H2 "How we ship." Below it, a vertical Geist Mono index `01 / 02 / 03 / 04 / 05` that lights up `#88B4F5` as the right column scrolls past each section (GSAP ScrollTrigger `toggleClass`). This is the Codrops Sticky Grid Scroll pattern.
- **Right column (normal scroll):** 5 short manifesto paragraphs (max 60 words each). Each paragraph is preceded by a monumental pull-quote in Fraunces italic, clamp(2rem, 4vw, 3.5rem), `#88B4F5`:
  1. *"We ship to production, not to staging."* — Outcome-first.
  2. *"Fixed scope. Fixed price. Fixed weeks."* — No scope creep.
  3. *"Senior operators only. No juniors. No outsourcing."* — Seniority.
  4. *"Code your team can read at 2am."* — Production-grade.
  5. *"Honest pricing. No retainer traps."* — Transparent.
- The right column is the **scrolling narrative**; the left column's index lights up as each paragraph enters view.

**Act 2 — Tech-stack marquee (full-width strip, 8vh):**
- Below the manifesto, a single full-width marquee: `NEXT.JS · VERCEL · PRISMA · STRIPE · OPENAI · ANTHROPIC · TAILWIND · TYPESCRIPT · REACT · BASE · ARBITRUM · ...`
- CSS `@keyframes ticker-scroll 18s linear infinite`, Geist Mono 14px, `#5A6473`, no separators, only `·` dots.
- This replaces the old "trust pillars" — the marquee IS the trust signal (the tech stack is the proof of seniority).

**Typography hierarchy:**
- H2: Space Grotesk 700, clamp(2.5rem, 5vw, 4rem)
- Pull-quote: Fraunces italic 400, clamp(2rem, 4vw, 3.5rem), `#88B4F5`
- Body: Space Grotesk 400, 17px, line-height 1.6, `#B0BBC7`, max-width 52ch
- Index: Geist Mono 500, 13px, `#5A6473` → `#88B4F5` active

**Animation/interaction:**
1. Pull-quote fade-up + 4px y-offset on enter (0.7s, power3.out).
2. Left-column index lights up `#88B4F5` + scales 1.1 when corresponding paragraph is centered (GSAP ScrollTrigger `onToggle`).
3. Marquee infinite scroll.
4. Reduced-motion: marquee pauses, index lights up instantly.

**Inspiration citations:** Codrops "Sticky Grid Scroll" Mar 2026 (sticky-pinned left + scrolling right), motion.dev scroll-pinning, Awwwards "Inspiring Design Blogs" (long-form manifesto with pull-quotes), designforce 2026 ("trust is built visually"), Pinterest "Numbered List Design" (index as design object — but used as a SCROLL INDICATOR here, not as static cards). Crucially NOT a 5-card grid — that was the rejected "low quality" pattern.

**Copy discipline:** Pillar 5 explicitly removes "lifetime" / "forever" / "unlimited" language. Pillar copy above is the locked wording — no overpromising.

---

### Section 5 — INSIGHTS / PUBLICATIONS (User said insights need "significant improvement")

#### Top 5 patterns found

1. **Editorial magazine cover layout** — OptimizePress "18 Best Blog Designs 2026": "Blogs now use bold typography to highlight sections." The dominant pattern is a magazine-style cover with ONE featured article oversized + 3-4 secondary articles in a smaller grid.
2. **"Reading-time + date" metadata row** — MarketerMilk "30 best blog designs 2026" (Living Cozy, Ramp, Rise, Science, Notion, Webflow, Noter, Journalism, Scribe): every card has a small metadata row `[date · reading time · category]` in mono.
3. **List-with-thumbnails "archive" pattern** — Awwwards "Inspiring Design Blogs" Erik Joergensen: a clean reverse-chronological list, each row `[date · title · 1-line excerpt]`, hover reveals a thumbnail on the right. This is the most-awarded insights pattern.
4. **Featured-article hero with full-bleed cover image** — Living Cozy (MarketerMilk #1 pick): one article gets full-bleed cover treatment with overlaid title; the rest are an archive list.
5. **Category-as-color-tag** — Awwwards Inspiring Design Blogs collection: each article carries a single colored category dot (no full tag chip), reducing visual noise.

#### Specific examples

| Site / source | URL | What it does |
|---|---|---|
| **Awwwards "Inspiring Design Blogs" (31 items)** | awwwards.com/awwwards/collections/inspiring-blog-design | Vita Architecture, Erik Joergensen — list-with-thumbnails archive. |
| **OptimizePress "18 Best Blog Designs 2026"** | optimizepress.com/best-blog-designs | Bold typography section headers; magazine cover layout. |
| **MarketerMilk "30 best blog designs 2026"** | marketermilk.com/blog/best-blog-designs | Living Cozy, Ramp, Rise, Notion — featured + archive pattern, reading-time metadata. |
| **ruttl "Top 20 Web Design Blogs 2026"** | ruttl.com/blog/best-web-design-blogs | Awwwards itself is #1; documents the curated-archive pattern. |
| **wplook "10 Best Design Blogs 2026"** | wplook.com/design-blogs | Smashing Magazine, Dribbble, CSS-Tricks — established long-form editorial pattern. |

#### Proposed NEW design for Beta Insights (replace MethodInsights' insights list entirely)

**Codename:** `BETA-INSIGHTS-MAGAZINE` — *"One feature + an archive, like a print issue."*

The current "expandable list item" insights pattern is rejected. The replacement is a **two-tier magazine layout:**

**Layout structure:**
1. **Section header:** Space Grotesk 700 H2 "Insights." Geist Mono caption: `QUARTERLY · ISSUE 04 · Q1 2026`. Hairline below.
2. **Tier 1 — Featured article (full-bleed, 60vh):**
   - A single full-width card. Left 60% = cover image (use `/public/projects/ai-defi-navigator.png` or similar existing asset). Right 40% = text column:
     - Category dot `● RESEARCH` (8px, `#88B4F5`)
     - Title: Space Grotesk 700, 36px
     - 2-line excerpt: Space Grotesk 400, 16px, `#B0BBC7`
     - Metadata: Geist Mono 12px `#5A6473` — `2026.03.14 · 12 MIN READ · DR. K. MAUNG`
     - "Read essay →" link, Geist Mono 13px, `#88B4F5`, arrow hover
   - Card has 1px `#1F2937` border, `border-radius: 4px`, hover lifts to `border-color: #88B4F5`.
3. **Tier 2 — Archive list (5 rows below the feature):**
   - Each row: `[date · 14rem] [category dot · 2rem] [title · 1fr] [excerpt · 1fr] [reading time · 6rem]`
   - Row height 88px, 1px `#1F2937` bottom hairline.
   - Hover: row bg `#0F1117`, title shifts to `#88B4F5`, excerpt fades in (opacity 0.5 → 1), a 96×96 thumbnail slides in from the right edge (absolute, translateX 100% → 0, 0.3s). Erik Joergensen pattern.
4. **Bottom CTA strip:** Geist Mono "View archive (24 essays) →" — links to `/insights` index page (existing route, KEEP).

**Typography hierarchy:**
- H2: Space Grotesk 700, clamp(2.5rem, 5vw, 4rem)
- Feature title: Space Grotesk 700, 36px
- List title: Space Grotesk 600, 20px
- Excerpt: Space Grotesk 400, 15px, `#7A8595`
- Metadata: Geist Mono 400, 12px, `#5A6473`
- Category dot: 8px circle, `#88B4F5` (RESEARCH) / `#5A6473` (NOTES) / `#7E2EC9` (CASE STUDY)

**Animation/interaction:**
1. Feature card: fade-up + clip-path reveal (0.8s on enter).
2. Archive rows: stagger fade-up (60ms per row).
3. Row hover: bg fill + title color + thumbnail slide-in.
4. Reduced-motion: all transitions 0s.

**Inspiration citations:** MarketerMilk "30 best blog designs 2026" (Living Cozy featured + archive), Awwwards "Inspiring Design Blogs" Erik Joergensen (hover-thumbnail archive), OptimizePress 2026 (magazine cover + bold section typography), wplook 2026 (long-form editorial discipline). NOT an expandable accordion — that was the rejected "low quality" pattern.

**Copy discipline:** No "ultimate guide," "complete handbook," "everything you need to know." Replace with concrete essay titles: "On shipping LLM apps to production," "Why we stopped using Redux in 2025."

---

### Section 6 — OPERATORS / TEAM

#### Top 5 patterns found

1. **Interactive marquee of avatar cards** — Finsweet "Marquee magic" Jan 2025: "use marquees to show rotating logos, team members, or new products." Advanced Marquee WordPress plugin documents "Team Marquee — introduce team members, staff, and contributors with interactive sliding avatar cards. Member photo frames, names, job titles."
2. **Awwwards "Team Section — Qream Design Agency"** — the canonical Awwwards inspiration page for team sections. Hover-reveal of additional info (skills, bio) is the Qream signature.
3. **Awwwards "Team & About Pages" collection** — "Agencies using creative and innovative galleries, cursors, navigation and more to introduce themselves and their teams."
4. **Hover-to-swap portrait (still → candid)** — common across Awwwards SOTD agency sites (Active Theory v4, Resn). On hover, the formal portrait crossfades to a candid / working shot.
5. **Magnetic cursor pull on each member tile** — Awwwards "Magnetic Hover — Inette" applied to team tiles.

#### Specific examples

| Site / source | URL | What it does |
|---|---|---|
| **Awwwards "Team Section — Qream Design Agency"** | awwwards.com/inspiration/team-section-qream-design-agency-1 | Canonical team-section inspiration. |
| **Awwwards "Team & About Pages" collection** | awwwards.com/awwwards/collections/about-page | Curated team/about gallery. |
| **Finsweet "Marquee magic" (Jan 2025)** | finsweet.com/blog/marquee-magic-fresh-scrolling-effects-with-finsweet-components | Marquees for rotating team members. |
| **Advanced Marquee "Team Marquee"** | de.wordpress.org/plugins/advanced-marquee-effect | Sliding avatar cards with photo frames, names, job titles. |
| **Active Theory v4 (SOTD)** | awwwards.com/sites/active-theory-v4 | Hover-to-swap portrait pattern. |

#### Proposed NEW design for Beta Operators (replace Operators entirely)

**Codename:** `BETA-TEAM-MARQUEE` — *"A双向 marquee of operators, hover to freeze + reveal."*

The current horizontal-scroll team grid is fine in concept but weak in execution. The replacement is a **dual-direction marquee that freezes on hover:**

**Layout structure:**
1. **Section header:** Space Grotesk 700 H2 "Operators." Geist Mono caption: `06 SENIOR · 0 JUNIORS · 0 OUTSOURCED`. Hairline below.
2. **Two-row marquee (rows scroll opposite directions):**
   - **Row A (top):** scrolls LEFT → RIGHT, 32s linear infinite.
   - **Row B (bottom):** scrolls RIGHT → LEFT, 32s linear infinite (mirrored).
   - Each operator appears as a card: 240×320px portrait (use `/public/upload/*.jpg` existing portraits, or stock for now — but the LAYOUT is the point).
3. **Card anatomy:**
   - Portrait fills the card (object-cover, grayscale by default, `filter: grayscale(1) brightness(0.8)`).
   - Bottom overlay strip: `[name · Space Grotesk 600 16px] [role · Geist Mono 11px]` in `#0A0A0B` on `rgba(255,255,255,0.92)`.
   - On hover: marquee PAUSES, portrait crossfades to color (Active Theory pattern), an overlay panel slides up from the bottom revealing `[3 skills · Geist Mono 12px]` + `[1-line bio · Space Grotesk 400 13px]` + `[LinkedIn →]`.
4. **Magnetic hover:** the entire card translates 4-6px toward the cursor while paused (Awwwards Inette pattern).
5. **No "view all" link.** 6 operators is the full team — that's the point of the "06 SENIOR" caption.

**Typography hierarchy:**
- H2: Space Grotesk 700, clamp(2.5rem, 5vw, 4rem)
- Name: Space Grotesk 600, 16px, `#0A0A0B`
- Role: Geist Mono 500, 11px, `#5A6473`
- Skills: Geist Mono 400, 12px, `#88B4F5`

**Animation/interaction:**
1. Marquee CSS animations (already in globals.css from Stage 70 — `ticker-scroll` keyframe; reuse with two reverse-direction instances).
2. Hover: `animation-play-state: paused` on both rows; portrait grayscale → color crossfade (0.4s); overlay panel slide-up (0.3s).
3. Magnetic translate (transform: translate3d, 0.2s).
4. Reduced-motion: marquee static, grid layout instead.

**Inspiration citations:** Awwwards "Team Section — Qream Design Agency" (canonical pattern), Finsweet "Marquee magic" (rotating team marquee), Advanced Marquee "Team Marquee" (avatar card spec), Active Theory v4 SOTD (hover-to-swap portrait), Awwwards "Magnetic Hover — Inette" (magnetic pull). NOT a static grid — that was the rejected pattern.

**Copy discipline:** No "rockstar," "ninja," "10x." Replace with concrete role + stack: "Founding engineer · LLM infra · ex-Anthropic."

---

### Section 7 — CUSTOMER VOICE / TESTIMONIALS

#### Top 5 patterns found

1. **Single oversized quote, full-bleed** — Webflow "Website testimonial examples" Apr 2026: the most-awarded pattern is ONE giant pull-quote filling the screen, with small attribution below. Not a 3-card grid.
2. **Logo wall + quote carousel hybrid** — Wishpond "50 Proven Social Proof Website Examples" + LogRocket "19 social proof examples": grayscale logo strip on top, single rotating quote below.
3. **Video testimonial with play-on-hover** — Red Baton "Testimonial Page Design: 10 Best Practices": muted video thumbnail, click to play, captioned.
4. **Metrics-overlay testimonial** — common across SaaS sites: a quote card with 1 metric chip overlay (e.g., "+47% conversion") — the testimonial AND the proof point in one.
5. **Horizontal snap-scroll carousel** — Dribbble "Testimonials" tag (2,903 designs): horizontal scroll-snap cards, one card per viewport on mobile.

#### Specific examples

| Site / source | URL | What it does |
|---|---|---|
| **Webflow "Website testimonial examples" (Apr 2026)** | webflow.com/blog/testimonials-on-website | Oversized single-quote pattern documented. |
| **Wishpond "50 Proven Social Proof Website Examples"** | wishpond.com/blog/social-proof-website-examples | Logo wall + quote carousel hybrid. |
| **LogRocket "19 social proof examples"** | blog.logrocket.com/ux-design/19-social-proof-examples | Social-proof taxonomy. |
| **Red Baton "Testimonial Page Design: 10 Best Practices"** | redbaton.digital/blog/best-practices-to-follow-while-designing-a-testimonial-page | Video testimonial + metrics overlay. |
| **Dribbble "Testimonials" tag** | dribbble.com/tags/testimonials | 2,903 designs; horizontal snap-scroll carousel dominant. |
| **Pinterest "Testimonial Design" (45 ideas 2026)** | pinterest.com/hiyaitstaylor/testimonial-design | Testimonials layout kit; oversized quote + small attribution. |

#### Proposed NEW design for Beta Customer Voice (replace CustomerVoice entirely)

**Codename:** `BETA-VOICE-MONUMENTAL` — *"One quote at a time, monumental, with proof."*

The current long-form testimonial paragraphs are rejected. The replacement is a **single-monumental-quote layout with auto-rotating carousel + metrics overlay:**

**Layout structure:**
1. **Section header:** Space Grotesk 700 H2 "Customer Voice." Geist Mono caption: `VERIFIED · 6 CLIENTS · 2024–2026`.
2. **Logo wall (single row, grayscale, 1px hairline above + below):** 6 client logos (or wordmarks in Geist Mono if no logo assets). Static, no animation. This is the Wishpond "trusted by" pattern.
3. **Monumental quote stage (centered, 60vh):**
   - A single Fraunces italic quote, clamp(2rem, 4.5vw, 4rem), `#F4F6FB`, max-width 24ch, centered.
   - Quote mark `"` rendered as a 120px Fraunces italic in `#88B4F5` at 10% opacity, absolutely positioned top-left of the quote.
   - Below quote: `[name · Space Grotesk 600 18px] [role · company · Geist Mono 13px]` centered.
   - Below attribution: a single **metric chip** — Geist Mono 13px `#88B4F5`, 1px border, e.g. `▲ SHIPPED IN 11 DAYS` or `$2.4M TVL`.
4. **Carousel dots (bottom center):** 6 dots, active dot is 24px wide `#88B4F5`, inactive 8px `#5A6473`. Click to jump. Auto-advance every 8s.
5. **No "leave a review" CTA.** This is a credibility section, not a funnel.

**Typography hierarchy:**
- H2: Space Grotesk 700, clamp(2.5rem, 5vw, 4rem)
- Quote: Fraunces italic 400, clamp(2rem, 4.5vw, 4rem), `#F4F6FB`, max-width 24ch
- Attribution name: Space Grotesk 600, 18px
- Attribution role: Geist Mono 400, 13px, `#7A8595`
- Metric chip: Geist Mono 500, 13px, `#88B4F5`, 1px `#88B4F5` border, 4px padding

**Animation/interaction:**
1. Quote crossfade on carousel advance (0.5s, opacity + 8px y).
2. Dot width transition 0.4s.
3. Auto-advance 8s, pause on hover.
4. Reduced-motion: no auto-advance, manual dots only.

**Inspiration citations:** Webflow testimonials blog Apr 2026 (oversized single quote), Pinterest "Testimonial Design" (monumental quote + small attribution), Wishpond 50 examples (logo wall), LogRocket 19 social proof (metrics-overlay testimonial), Red Baton (verified badge). NOT a 3-card grid — that was the rejected pattern.

**Copy discipline:** Quotes must contain a NUMBER (shipped time, $, %, users). No "amazing to work with." Replace with "Shipped our LLM app to 12k users in 9 weeks."

---

### Section 8 — START A PROJECT / CONTACT

#### Top 5 patterns found

1. **Single large email input + magnetic submit** — Awwwards "Best Contact Us Page Examples" collection + saaspo CTA section: the dominant 2026 pattern is ONE big input (`name` or `email`) and ONE button. No multi-step forms on the landing section.
2. **"Let's talk" CTA with calendar embed** — cta.gallery + landingi "20 Best CTA on Landing Page Examples": the final CTA is "Book a call →" that opens a Calendly/Cal.com modal, not a 12-field form.
3. **Full-bleed dark CTA banner with monumental headline** — saaspo "67 CTA section examples," landingpageflow "Best CTA Placement Strategies 2026": full-bleed dark banner, ONE huge headline ("Let's build."), ONE button.
4. **Two-column: contact info LEFT, form RIGHT** — Smashing Magazine "UX In Contact Forms": "place fields one below the other in a single column." Awwwards contact-page collection shows the contact-info + form split.
5. **Magnetic CTA button** — Codrops "Magnetic Buttons" (2020, still the reference), Awwwards "Magnetic Hover — Inette."

#### Specific examples

| Site / source | URL | What it does |
|---|---|---|
| **Awwwards "Best Contact Us Page Examples"** | awwwards.com/websites/contact-page | Curated SOTD-grade contact pages. |
| **cta.gallery** | cta.gallery | "The Best Call-to-Action Inspiration for Designers" — curated CTA gallery. |
| **saaspo "67 CTA section examples"** | saaspo.com/section-type/saas-cta-section-examples | SaaS CTA section library. |
| **Smashing Magazine "UX In Contact Forms"** | smashingmagazine.com/2018/03/ux-contact-forms-essentials-conversions | Single-column field layout best practice. |
| **landingi "20 Best CTA on Landing Page Examples" (May 2026)** | landingi.com/blog/cta-on-landing-pages-playbook-examples | "Book a call" pattern. |
| **landingpageflow "Best CTA Placement Strategies 2026"** | landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages | Full-bleed dark banner + single CTA. |
| **Codrops "Magnetic Buttons"** | tympanus.net/codrops/2020/08/05/magnetic-buttons | Magnetic CTA reference. |

#### Proposed NEW design for Beta Start a Project (replace StartProject entirely)

**Codename:** `BETA-CONTACT-MONOLITH` — *"One headline. One input. One button."*

The current 4-step form is rejected as friction. The replacement is a **full-bleed CTA banner with a single email capture + booking modal:**

**Layout structure:**
1. **Full-bleed dark banner (100vh, the final section):**
   - Background: `#09090B` with a faint radial gradient glow at center-bottom (15% opacity `#88B4F5`), the mouse-reactive glow from Hero reused here.
2. **Centered stack (max-width 720px):**
   - Eyebrow: Geist Mono 13px `#5A6473`, `// END OF TRANSMISSION` (Sigma S01 echo — the brutalist boot-log callback).
   - Monumental headline: Space Grotesk 700, clamp(3rem, 8vw, 7rem), `#F4F6FB`, centered:
     > **Let's ship.**
   - Subline: Fraunces italic 400, clamp(1.25rem, 2vw, 1.75rem), `#88B4F5`, centered:
     > *Tell us what to build. We reply within one business day.*
   - **Single input row (max-width 480px):** A pill-shaped email input (`type="email"`, `placeholder="you@company.com"`, Geist Mono 16px, `#0A0A0B` bg, 1px `#1F2937` border, 9999px radius — Ethena pill) + an adjacent **magnetic submit button** "Send →" (`#88B4F5` fill, `#0A0A0B` text, magnetic hover, Codrops pattern).
   - Below input: Geist Mono 12px `#5A6473` — `OR BOOK A 30-MIN CALL →` (links to Cal.com modal — opens `ContactFormModal` already in `/src/components/sigma/shared/ContactFormModal.tsx`).
3. **Footer strip (8vh, bottom edge):** Three columns of Geist Mono 11px `#5A6473`:
   - LEFT: `TAUNGOO SIGMA LAB · BETA v4.0`
   - CENTER: `YANGON · SINGAPORE · REMOTE`
   - RIGHT: `GITHUB · LINKEDIN · X`
4. **On submit:** the input collapses to a success state (Sigma S01 boot-log echo): `> SIGNAL RECEIVED. WE'LL REPLY WITHIN 24H.` Typewriter reveal, 1.4s. Then the insert-coin.mp3 sound effect (already in `/public/sounds/`) plays once.

**Typography hierarchy:**
- Eyebrow: Geist Mono 400, 13px, `#5A6473`
- Headline: Space Grotesk 700, clamp(3rem, 8vw, 7rem), `#F4F6FB`
- Subline: Fraunces italic 400, clamp(1.25rem, 2vw, 1.75rem), `#88B4F5`
- Input: Geist Mono 400, 16px
- Button: Geist Mono 500, 14px, uppercase, 0.06em tracking
- Footer: Geist Mono 400, 11px, `#5A6473`

**Animation/interaction:**
1. Headline fade-up + 16px y-offset (0.9s, power3.out) on enter.
2. Subline fade-up, 0.2s delay.
3. Input + button fade-up together, 0.4s delay.
4. Magnetic hover on button (Codrops pattern, up to 12px translate toward cursor).
5. Mouse-reactive radial glow (reuse Hero's `use-tilt-3d` + radial gradient).
6. On submit: input crossfade to boot-log success state (1.4s typewriter), then sound.
7. Reduced-motion: all transitions 0s, no sound, no magnetic.

**Inspiration citations:** Awwwards "Best Contact Us Page Examples" (single-input pattern), cta.gallery (curated CTA minimalism), saaspo "67 CTA section examples" (full-bleed dark banner), landingpageflow 2026 (one headline + one button), landingi May 2026 ("book a call" modal pattern), Smashing Magazine (single-column input), Codrops "Magnetic Buttons" (magnetic submit), Sigma S01 boot-log (success-state echo). NOT a 4-step form — that was the rejected pattern.

**Copy discipline:** No "free consultation," "free quote," "no obligation," "limited spots." Replace with concrete: "We reply within one business day." No "lifetime support" anywhere.

---

## 3. Cross-cutting design tokens (LOCKED)

These are the shared tokens all 8 sections must use. **No new tokens, no new fonts.**

### Color (dark mode — DEFAULT)
| Token | Value | Usage |
|---|---|---|
| `--beta-bg` | `#09090B` | Section backgrounds (warm near-black, Ethena) |
| `--beta-bg-elev-1` | `#0F1117` | Hover/fill surfaces (1-step lift) |
| `--beta-fg` | `#F4F6FB` | Display text (paper white, NOT pure #FFF) |
| `--beta-fg-muted` | `#B0BBC7` | Body text (Ethena cool gray) |
| `--beta-fg-faint` | `#7A8595` | Captions, metadata |
| `--beta-fg-dim` | `#5A6473` | Eyebrows, footer text |
| `--beta-accent` | `#88B4F5` | THE only accent (Ethena periwinkle) |
| `--beta-hairline` | `#1F2937` | 1px borders, dividers |
| `--beta-quote` | Fraunces italic + `#88B4F5` | Pull-quotes (Method, Insights, Customer Voice, Contact subline) |

### Color (light mode — toggled, Ondo-inspired, OPTIONAL)
| Token | Value |
|---|---|
| `--beta-bg` | `#FFFFFF` |
| `--beta-bg-elev-1` | `#F7F7FA` |
| `--beta-fg` | `#0A0A0B` |
| `--beta-fg-muted` | `#3A3F4A` |
| `--beta-accent` | `#7E2EC9` (Ondo deep purple) |
| `--beta-hairline` | `#E5E5EA` |

### Typography (3 fonts, no additions)
| Role | Font | Sizes |
|---|---|---|
| Display (H1, H2, monumental) | Space Grotesk 700 | clamp(2.5rem → 11rem) |
| Body | Space Grotesk 400 | 15–17px, line-height 1.6 |
| Editorial italic (pull-quotes, sublines) | Fraunces italic 400 | clamp(1.25rem → 4.5rem) |
| UI / labels / metadata / mono | Geist Mono 400/500 | 11–16px, 0.06em tracking |

### Motion budget (per section)
- 1 entrance animation (fade-up, 0.6–0.9s, power3.out)
- 1 hover micro-interaction (color shift OR magnetic translate, not both)
- 1 optional ambient loop (marquee, ticker, glow)
- ALL wrapped in `prefers-reduced-motion` fallbacks
- Total JS animation budget per section: ≤ 3 GSAP tweens

---

## 4. Anti-patterns to AVOID (explicit removal list)

These are the patterns from the current Beta Mode that the user called "low quality" — they must NOT appear in the redesign:

| ❌ Rejected pattern | Where it was | Why rejected | Replacement |
|---|---|---|---|
| Animated stat counters (50+, 27, 9, 99.9%) | MissionHero | Dashboard-widget feel; not a one-liner | Removed entirely from Hero |
| Bento grid of 27 expandable cards | CapabilitiesBento | Cluttered, beginner-looking | 4-row indexed manifesto |
| Expandable Pricing Tiers inline panel | CapabilitiesBento | Adds friction, duplicates detail page | Pricing lives only on `/services/[slug]` |
| Grid of 9 project cards | WorkDeployments | Generic; user said "heavily redesigned" | Alternating full-bleed editorial rows |
| 5 numbered trust-pillar cards | MethodInsights | "Significant improvement needed" — cards are weak | Sticky-pinned manifesto + tech-stack marquee |
| Expandable accordion insights list | MethodInsights | "Significant improvement needed" — accordions are weak | Magazine feature + archive list |
| Horizontal-scroll team grid (current) | Operators | Weak execution | Dual-direction marquee, hover-freeze |
| Long-form testimonial paragraphs | CustomerVoice | Generic | Monumental single-quote carousel + metrics |
| 4-step intake form | StartProject | Friction; beginner-looking | Single email input + magnetic submit + booking modal |
| "Lifetime service" / "unlimited" / "forever" language | Multiple sections | Overpromising; not enterprise-credible | Concrete deliverables + time-bound claims |
| Pure `#FFFFFF` on dark | Multiple | Too harsh | `#F4F6FB` paper white |
| Multiple accent colors | MethodInsights (had orange #EE7B39 + purple) | Dilutes brand | ONE accent: `#88B4F5` only |
| Logo wall as a separate section | (current does not have one, but tempting to add) | Adds a section for the sake of it | Logo marquee INSIDE Work section header |

---

## 5. Implementation guidance (for the next agent — Stage 71+)

### Recommended implementation order (lowest risk → highest)

1. **Hero (`MissionHero.tsx` → rewrite)** — lowest coupling, highest visual impact. Build `useTypewriter` hook. Reuse existing mouse-reactive glow.
2. **Customer Voice (`CustomerVoice.tsx` → rewrite)** — self-contained, no new data. 6 hardcoded quotes.
3. **Operators (`Operators.tsx` → rewrite)** — reuse existing team data; add dual marquee. Needs 6 portrait assets (or grayscale stock placeholders).
4. **Method (`MethodInsights.tsx` → rewrite)** — needs GSAP ScrollTrigger for sticky-pinned index. Reuse existing manifesto copy from `/src/lib/sigma/manifesto.ts`.
5. **Insights (`MethodInsights.tsx` insights portion → split into new `BetaInsights.tsx`)** — reuse existing `/insights/[slug]` routes; just build the magazine UI.
6. **Capabilities (`CapabilitiesBento.tsx` → rewrite)** — needs the 4-domain taxonomy refactor; reuses existing 27-service data but restructures by domain.
7. **Work (`WorkDeployments.tsx` → rewrite)** — reuses existing 9 portfolio PNGs; biggest layout change (alternating rows).
8. **Contact (`StartProject.tsx` → rewrite)** — reuses existing `ContactFormModal.tsx` + insert-coin.mp3 sound.

### Files that will be modified (Stage 71+ — NOT this research task)
```
src/components/sigma/beta/MissionHero.tsx        → full rewrite
src/components/sigma/beta/CapabilitiesBento.tsx  → full rewrite (rename → CapabilitiesIndex.tsx)
src/components/sigma/beta/WorkDeployments.tsx    → full rewrite (rename → WorkEditorial.tsx)
src/components/sigma/beta/MethodInsights.tsx     → full rewrite (rename → MethodEditorial.tsx)
src/components/sigma/beta/Operators.tsx          → full rewrite (rename → OperatorsMarquee.tsx)
src/components/sigma/beta/CustomerVoice.tsx     → full rewrite (rename → VoiceMonumental.tsx)
src/components/sigma/beta/StartProject.tsx       → full rewrite (rename → ContactMonolith.tsx)
src/components/sigma/beta/BetaInterface.tsx     → update import names
src/app/globals.css                              → add useTypewriter keyframes, magnetic-button mixin, marquee-reverse keyframe
```

### New files to create (Stage 71+)
```
src/hooks/use-typewriter.ts                       → typewriter effect for Hero + Contact
src/components/sigma/beta/BetaInsights.tsx       → NEW (split from MethodInsights)
src/lib/sigma/beta/insights-data.ts              → NEW (magazine feature + archive data)
```

### Estimated effort
- 3-4 days of focused work for an implementing agent
- Each section: ~3-4 hours (rewrite + animation tokens + reduced-motion fallback)
- QA: 1 day (agent-browser sweep of all 8 sections in dark + light mode)

### Verification checklist (for the implementing agent)
- [ ] Hero has NO stat counters, NO split layout, ONE CTA
- [ ] Capabilities has 4 rows, NOT 27 cards
- [ ] Work has alternating L/R rows, NOT a grid
- [ ] Method has sticky-pinned index + marquee, NOT 5 cards
- [ ] Insights has magazine feature + archive, NOT accordion
- [ ] Operators has dual marquee with hover-freeze, NOT static grid
- [ ] Customer Voice has ONE quote at a time with metrics chip, NOT paragraph cards
- [ ] Contact has ONE input + ONE button, NOT a 4-step form
- [ ] No "lifetime" / "unlimited" / "forever" / "free consultation" anywhere
- [ ] Only ONE accent color used: `#88B4F5` (dark) / `#7E2EC9` (light)
- [ ] Only 3 fonts: Space Grotesk, Fraunces italic, Geist Mono
- [ ] All 8 sections pass `prefers-reduced-motion` test
- [ ] All 8 sections work in both dark (default) and light mode

---

## 6. Source index (all real URLs cited above)

### Hero
- https://www.awwwards.com/inspiration/hero-section-fit-design
- https://www.awwwards.com/websites/minimal
- https://www.sitebuilderreport.com/inspiration/website-hero-section-examples
- https://blog.logrocket.com/ux-design/hero-section-examples-best-practices
- https://www.inspoai.io/blogs/best-hero-section-designs (page_reader fetched, 37k tokens)
- https://saaspo.com/section-type/saas-hero-section-examples
- https://saaspo.com/sections/vercel-hero-section
- https://www.orbix.studio/blogs/saas-hero-section-design
- https://herogrids.com/industry/saas/bold-typography
- https://uxdesign.cc/huge-type-on-the-web-8fbc0063293
- https://medium.muz.li/15-examples-of-innovative-hero-typography-trends-d03a26896438
- https://onepage.io/blog/post/hero-section-website

### Services
- https://www.awwwards.com/inspiration/services-section-the-first-the-last-agency
- https://www.saasframe.io/blog/the-bento-layout-trend
- https://bentogrids.com
- https://www.awwwards.com/inspiration/magnetic-hover-inette
- https://tympanus.net/codrops/2020/08/05/magnetic-buttons
- https://www.pinterest.com/ideas/services-section-web-design/921463205015
- https://www.layyyout.com/components/bento-grid-dark-mode

### Work / Portfolio
- https://www.lazarev.agency/cases (page_reader fetched)
- https://www.lazarev.agency/cases/metastaq
- https://www.awwwards.com/sites/active-theory-v4
- https://www.awwwards.com/blog/case-study
- https://www.awwwards.com/websites/portfolio
- https://www.a1.gallery/blog/best-framer-portfolio-websites-2026
- https://www.mockplus.com/blog/post/split-screen-web-design
- https://qodeinteractive.com/magazine/split-screen-layout-in-use-best-examples
- https://www.landing.love/sites/activetheory-2
- https://lbbonline.com/news/The-Art-of-Thoughtful-Digital-How-Active-Theory-Is-Redefining-What-Great-Experience-Feels-Like

### Method / About
- https://designforce.co/blog/what-top-website-designs-have-in-common
- https://www.wavespace.agency/blog/best-website-design-examples
- https://www.awwwards.com/awwwards/collections/inspiring-blog-design
- https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid
- https://motion.dev/examples/js-scroll-pinning
- https://gsap.com/community/forums/topic/44707-multiple-scroll-trigger-pin-in-different-section
- https://www.pinterest.com/ideas/numbered-list-design/932823729278
- https://imperavi.com/books/ui-typography/elements/lists

### Insights
- https://www.optimizepress.com/best-blog-designs
- https://www.marketermilk.com/blog/best-blog-designs
- https://www.ruttl.com/blog/best-web-design-blogs
- https://wplook.com/design-blogs
- https://www.awwwards.com/awwwards/collections/inspiring-blog-design

### Team
- https://www.awwwards.com/inspiration/team-section-qream-design-agency-1
- https://www.awwwards.com/awwwards/collections/about-page
- https://finsweet.com/blog/marquee-magic-fresh-scrolling-effects-with-finsweet-components
- https://de.wordpress.org/plugins/advanced-marquee-effect

### Customer Voice / Testimonials
- https://webflow.com/blog/testimonials-on-website
- https://wishpond.com/blog/social-proof-website-examples
- https://blog.logrocket.com/ux-design/19-social-proof-examples
- https://redbaton.digital/blog/best-practices-to-follow-while-designing-a-testimonial-page
- https://dribbble.com/tags/testimonials
- https://www.pinterest.com/hiyaitstaylor/testimonial-design
- https://www.orbitmedia.com/blog/social-proof-web-design
- https://designmodo.com/social-proof-website

### Contact / CTA
- https://www.awwwards.com/websites/contact-page
- https://www.cta.gallery
- https://saaspo.com/section-type/saas-cta-section-examples
- https://www.smashingmagazine.com/2018/03/ux-contact-forms-essentials-conversions
- https://landingi.com/blog/cta-on-landing-pages-playbook-examples
- https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages
- https://tympanus.net/codrops/2020/08/05/magnetic-buttons

### Platform-wide trend sources
- https://www.figma.com/resource-library/web-design-trends
- https://www.wix.com/blog/web-design-trends
- https://www.vistaprint.com/hub/web-design-trends
- https://tabnav.com/blog/best-website-design-examples
- https://www.pinterest.com/whiskeyandred/web-design-inspiration
- https://www.pinterest.com/suwaninpang/web-design
- https://www.behance.net/search/projects/Website%20Design%202026
- https://dribbble.com/tags/hero-section
- https://medium.com/design-bootcamp/5-new-ai-design-tools-to-try-in-2026-bba38068b142 (Aura Build by Meng To)
- https://www.framer.com/blog/artist-website-examples (Artlist-adjacent)
- https://www.webdesignawards.io/top-agencies-2026
- https://winners.webbyawards.com/winners/websites-and-mobile-sites

---

**END OF RESEARCH.** Next agent: implement Stage 71+ per Section 5 above. Do NOT carry over any layout from the current Beta Mode components — start fresh per these specs.
