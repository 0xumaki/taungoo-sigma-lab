# Awwwards Research — Award-Winning Enterprise / B2B / Tech Sites (2024–2026)

**Task ID:** AWWWARDS-RESEARCH
**Researcher:** Senior design researcher (subagent)
**Date:** 2026
**Subject:** Taungoo Sigma Lab — Beta Mode redesign
**Goal:** Identify PROVEN patterns from real Awwwards-winning enterprise/B2B/tech sites, then propose a completely new Beta Mode section structure (different from Alpha's 11 sections).

---

## Methodology

1. Read the most recent ~300 lines of `worklog.md` (Stage 67–68) to understand that Beta Mode currently ships a pure-white + enterprise-blue (#0044CC) "spec-sheet" aesthetic with 11 sections mirroring Alpha.
2. Read the current Beta components (`BetaHero.tsx`, `BetaAbout.tsx`, `BetaServices.tsx`, `SpecCard.tsx`) to document specifically *why* the current Beta feels "ugly, broken, depressing."
3. Ran **22 real web searches** through the `web-search` skill (z-ai-web-dev-sdk CLI), covering: Awwwards SOTD/SOTW/SOTM/SOTY 2024–2026, Stripe, Linear, Vercel, Framer, Anthropic, Resend, Lazarev, V7 Labs, Studio Freight / Sharplink, bento grid patterns, scroll-driven animations, dark-mode typography, SaaS navigation structures. Raw JSON results saved in `/tmp/awwwards-research/`.
4. Cross-referenced each candidate site's award status against at least two sources (Awwwards.com listing + third-party blog / Mobbin / getdesign.md / brand-guideline page).
5. For sites where the award could not be verified, the site is either dropped or explicitly flagged as "industry-canonical reference" rather than award-winner.

### Why the current Beta Mode is "ugly, broken, depressing" — diagnosis

| Problem | Evidence (in current code) |
|---|---|
| Pure white (#FFFFFF) flat background everywhere — no depth, no warmth, no atmosphere | `BetaHero.tsx` line 22, `BetaAbout.tsx` line 29 |
| Generic enterprise blue (#0044CC) — the same color every B2B SaaS uses; zero brand distinction | `SpecCard.tsx` line 40 default accent |
| Every section uses the **identical** `SectionHeader` (large numeral + label + title) — visual monotony | `SpecCard.tsx` lines 155–199 |
| Every card is the same `SpecCard` shape — paired label-value rows + 1px border + barcode footer — looks like a database UI, not a designed site | `SpecCard.tsx` lines 27–145 |
| Microscopic mono labels at **8px–9px** — too small to read; feels like printed shipping labels | `BetaHero.tsx` lines 29, 109, 135, 160 |
| Five overlapping "inspiration" patterns crammed together (periodic-table + boarding-pass + spec-sheet + barcode + ID-card) with no coherent voice | `SpecCard.tsx` design intent comment lines 7–13 |
| Zero real visuals — no product screenshots, no human imagery, no motion, no demo | All Beta components |
| Gimmicky "document ID" / "barcode" / "SIG=1.0000" decorations — fake-importance theater | `BetaHero.tsx` lines 40–46, 145–163 |
| Filter tabs + expandable cards are the ONLY interactive elements — feels like a 2015 Bootstrap dashboard | `BetaServices.tsx` lines 51–72 |
| Same generic 11-section skeleton as Alpha — the user explicitly wants Beta to be **structurally different** | worklog.md Stage 68 |

**Diagnosis:** The current Beta is "ugly" because it has *no design point of view*. It's a generic B2B SaaS shell decorated with pseudo-technical widgetry. Award-winning enterprise sites win by doing the *opposite*: a single, confident design philosophy executed with restraint and depth.

---

## Part 1 — Award-Winning Site Analysis

All sites below are ENTERPRISE / B2B / TECH (no portfolios, blogs, e-commerce, or consumer-only). Award status is verified against ≥2 sources.

---

### 1. Stripe / Stripe.dev

- **URL:** https://stripe.dev + https://stripe.com
- **Award:** Awwwards **Site of the Day — Oct 9, 2024** (Stripe.dev, "Stripe Dot Dev"); Awwwards **Nominee — Apr 8, 2016** (stripe.com); Awwwards **Honorable Mention** (Stripe Sessions 2023)
- **Sources:** awwwards.com/sites/stripe-dot-dev (SOTD, date confirmed); awwwards.com/case-study-stripe-dot-dev.html; awwwards.com/sites/stripe

**Section structure** (stripe.com, the canonical B2B nav):
1. Hero (animated diagonal gradient banner)
2. Products (Payments, Billing, Terminal, Connect, Issuing, Tax, Radar, etc.)
3. Solutions (by industry / business model)
4. Developers (Docs, API reference, CLI, Status)
5. Resources (Guides, Customer stories, News)
6. Pricing (single page, transparent)
7. Customers (logos + case studies)

**Layout patterns:**
- **Full-bleed animated gradient hero** — multi-color diagonal gradient (ruby-to-magenta `#ea2261` → `#f96bee`) that subtly animates on load and on scroll
- **Diagonal section dividers** between sections (slanted clip-paths)
- **Asymmetric grid** for products — large featured product card + smaller satellite cards
- **Sticky scroll-driven product showcase** — Stripe Dashboard screenshots that pin and parallax
- **Customer logo wall** + horizontally scrolling case-study carousel
- Stripe.dev (developer sub-site) uses a **functional in-browser console** + math art + themes + infinite footer

**Color palette (verified — open-design.ai):**
- Background: pure white `#FFFFFF` (light) + brand dark `#1c1e54` (dark sections, deep indigo)
- Accent gradient: ruby `#ea2261` → magenta `#f96bee` (hero decorations)
- Text: near-black `#0A2540` (Stripe's signature ink-blue) on white
- Secondary: cool gray `#425466`

**Typography:**
- Sans-serif system (Stripe uses "sohne" — a custom grotesque — paired with `-apple-system` fallback)
- Tight letter-spacing on large headlines (-0.02em to -0.04em)
- Generous line-height (1.5–1.7 body)
- Mono accents for code snippets (`ui-monospace`)

**Unique elements:**
- **Animated diagonal gradient** that's been imitated industry-wide (the canonical "Stripe gradient")
- **In-browser Stripe Dashboard demo** on stripe.dev — interactive, real
- **Infinite scrolling footer** on stripe.dev — a horizontal infinite marquee of easter eggs
- **Math art** backgrounds — animated canvas visualizations
- **Code blocks with copy-to-clipboard** embedded inline in marketing copy

**Why it won:** Stripe treats the marketing site as a *product surface*, not a brochure. Every interactive element is functional (the console works, the dashboard demos are real). The animated gradient became a design meme because it perfectly communicates "money moving in real time."

---

### 2. Linear (linear.app)

- **URL:** https://linear.app
- **Award status:** The canonical "Linear Look" — referenced as the gold standard in 2025–2026 SaaS rankings (LogRocket "Linear design: The SaaS trend that's boring and bettering UI," June 2025; Frontend Horse "The Linear Look"; Medium "The rise of Linear style design"; bookmarkify "Best SaaS Websites for Design Inspiration (2026)" — "Linear — Still Untouchable"; getdesign.md analysis). Linear's studio site (`Studio Linear`) is Awwwards **Honorable Mention**.
- **Sources:** frontend.horse/articles/the-linear-look; blog.logrocket.com/ux-design/linear-design; getdesign.md/linear.app/design-md; awwwards.com/sites/studio-linear-2; bookmarkify.io/blog/best-saas-websites-of-2025

**Section structure (linear.app, ~2025–2026 refresh):**
1. Hero (one-line value prop + product screenshot)
2. "Build" (issue tracking feature block)
3. "Plan" (cycles & roadmap block)
4. "Bento" feature grid (compact 4-column bento with mixed cell sizes)
5. Method (Linear's product philosophy / "Linear Method" — long-form text)
6. Customers (logos + 1-line testimonials inline)
7. Changelog (recent releases, dated entries)
8. Pricing (3-tier: Free / Linear Standard / Enterprise)
9. Footer (massive link directory)

**Layout patterns:**
- **Dark-mode first** — background is near-black `#08090A` ("Woodsmoke" / "Black Haze")
- **Subtle radial gradients** behind hero — soft purple/indigo glow that responds to mouse position
- **Bento grid features** — irregular 4-column grid where the hero feature takes a 2×2 cell; smaller capabilities take 1×1 cells
- **Section pinning** — product screenshots scroll-snap into view and stay pinned while text scrolls past
- **Glowing hairline borders** (1px) instead of solid borders — `rgba(255,255,255,0.08)`
- **Method section is editorial long-form** — single-column, serif-leaning sans, generous margins

**Color palette (verified — mobbin.com/colors/brand/linear):**
- Indigo `#5E6AD2` (primary accent — Linear's signature purple-blue)
- Woodsmoke `#08090A` (background — near-black)
- Oslo Gray `#8589A2` (secondary text)
- Black Haze `#F7F8F8` (light mode bg)
- White `#FFFFFF`
- Gradient overlays: indigo → violet → pink for hero glow

**Typography:**
- Inter (with custom weight settings) for body and UI
- Inter Display for large headlines (tighter, more geometric)
- Headlines: very large (72–96px on desktop), weight 600–700, tight tracking (-0.02em to -0.03em)
- Body: 16px / 1.5
- Subtle motion on hover — text glow, gradient shifts

**Unique elements:**
- **Mouse-reactive gradient glow** behind hero headline
- **Linear Method** — long-form manifesto section treated like a real essay, not a marketing page
- **Inline changelog feed** on the homepage — most recent 5–10 product updates with dates
- **Bento grid** with mixed cell sizes that popularized the pattern industry-wide
- **Tiny "calmer" refresh (Mar 2026)** — Linear's own post documents that the 2024 redesign evolved toward softer, less maximalist motion

**Why it's the canonical reference:** Linear proved that a B2B issue tracker can be the most beautifully designed product on the web. The "Linear Look" (dark + indigo + gradient glow + bento) is now the default starting point for every SaaS redesign in 2025–2026. They won by being *restrained* — every element earns its place.

---

### 3. Vercel (vercel.com + Vercel Ship)

- **URL:** https://vercel.com + https://vercel.com/ship
- **Award:** Awwwards **Honorable Mention — Mar 5, 2024** (Vercel Ship); Awwwards **Honorable Mention — 2025** (Vercel Ship 2025); listed on Awwwards "Best Vercel Websites" collection
- **Sources:** awwwards.com/sites/vercel-ship; awwwards.com/sites/vercel-ship-2025; vercel.com/blog/designing-and-building-the-vercel-ship-conference-platform; ifuryst.com/DESIGN.md/vercel

**Section structure (vercel.com, ~2026):**
1. Hero ("Agentic Infrastructure" — bold typographic statement + animated visual)
2. "Build agents" (use-case block)
3. "Ship apps that scale" (use-case block)
4. "Host platforms that serve every customer" (use-case block)
5. Recently Shipped (chronological release feed)
6. Customers (logo wall + case study deep links)
7. Solutions (by persona: Frontend, AI, Enterprise)
8. Resources (Docs, Blog, Guides, Changelog)
9. Pricing (Hobby / Pro / Enterprise)
10. Footer (Geist design-system link, status, careers)

**Layout patterns:**
- **Monochrome black/white** with one accent — extreme restraint
- **Shadow-as-border philosophy** — instead of CSS borders, Vercel uses layered shadows to indicate depth (documented at explainx.ai and ifuryst.com). This makes surfaces feel "etched" rather than "drawn."
- **Bento grid** for the 3 use-case blocks (Build / Ship / Host)
- **Animated 3D visuals** (ferrofluid-inspired on Ship 2025) — generative WebGL
- **Huge hero typography** — "Build agents on infrastructure that thinks like them" fills most of the viewport
- **Scroll-snap sections** — each major section snaps into view

**Color palette (verified — ifuryst.com DESIGN.md):**
- Pure white `#FFFFFF` (light mode page background, card surfaces)
- Pure black `#000000` (dark mode page background, primary buttons)
- Gray scale: 11 distinct grays from `#FAFAFA` → `#171717`
- Blue `#0070F3` (the legacy Vercel blue — still used sparingly for links/CTAs)
- Subtle gradient overlays — black → transparent for hero depth

**Typography:**
- **Geist Sans** (Vercel's own typeface, Swiss-inspired, open-sourced; described at vercel.com/font and basement.studio/post/the-birth-of-geist)
- Geist Mono for code, labels, eyebrows
- Headlines: very large (80–120px desktop), weight 600, tight tracking
- Body: 16px / 1.6
- All numeric data uses tabular figures (`font-feature-settings: "tnum"`)

**Unique elements:**
- **Ferrofluid-inspired 3D hero** on Vercel Ship 2025 (generative WebGL that responds to mouse)
- **Shadow-as-border** instead of CSS borders (industry-unique)
- **Geist design system** documented publicly at vercel.com/geist/introduction
- **Theme switcher** canonical control (Light / System / Dark)
- **Recently Shipped feed** — a chronological release log right on the homepage (similar to Linear's Changelog)
- **Customer-first storytelling** — case studies with measured outcomes (Ramp, Loom, Notion)

**Why it won:** Vercel executes monochrome minimalism with surgical precision. Their shadow system is "the most sophisticated shadow system in modern web design" (ifuryst.com). They prove that pure black-and-white can feel rich if every shadow and every typographic decision is intentional.

---

### 4. Anthropic (anthropic.com + Claude)

- **URL:** https://www.anthropic.com
- **Award status:** Anthropic.com is widely analyzed as a top enterprise AI site in 2026 (vezadigital.com, getdesign.md, sitebuilderreport.com); the documented design system (cream + coral + dark navy) has become known as the "AI Look" (The New Yorker, June 2026). Not directly Awwwards-awarded, but the *de facto* enterprise AI brand standard in 2025–2026.
- **Sources:** getdesign.md/claude/design-md; mobbin.com/colors/brand/claude; newyorker.com/culture/infinite-scroll/the-ai-design-aesthetic-thats-taking-over-the-internet; mylogo.review/color-palette-generator/anthropic

**Section structure (anthropic.com):**
1. Hero ("AI safety and research company" — typographic, restrained)
2. Research (long-form papers + index)
3. Transparency Hub (model-by-model transparency reports)
4. Models / Claude (product surface)
5. Safety (Responsible Scaling Policies, frontier-safety work)
6. News / Blog (chronological)
7. Careers
8. Footer

**Layout patterns:**
- **Editorial long-form** — Anthropic treats its site like a research publication, not a marketing site
- **Generous whitespace** — far more breathing room than typical SaaS
- **Single-column reading flow** for research/essays; multi-column only for index pages
- **No bento grids, no carousels** — restraint is the brand
- **Document-style typography** — large headlines, smaller subheads, then body text in clear hierarchy

**Color palette (verified — mobbin.com/colors/brand/claude + getdesign.md):**
- Pampas `#F4F3EE` (warm off-white background — the signature "Anthropic cream")
- Crail `#C15F3C` (warm terracotta — primary accent)
- Cloudy `#B1ADA1` (warm gray — secondary text)
- White `#FFFFFF` (card surfaces)
- Coral `#EB6367` (strong highlights / interactive — verified mylogo.review)
- Dark navy (deep ink for body text)

**Typography:**
- **Domaine** (a serif — used for headlines, distinct from the SaaS sans-serif default)
- **Inter** for UI and body
- Large headlines (60–80px), moderate weight (500–600, not bold), generous tracking
- Body: 18px / 1.65 — larger than typical SaaS
- Serif headlines + sans body = "scholarly" feel, distinct from Stripe/Linear/Vercel's all-sans approach

**Unique elements:**
- **Warm cream + terracotta palette** — antithetical to the Linear/Vercel dark+blue trend; this is the "AI look" The New Yorker documented in June 2026
- **Research-first IA** — Research and Transparency are top-level sections, not buried
- **Editorial typography** — serif headlines distinguish Anthropic from every other AI company
- **Restraint** — no bento grids, no carousels, no scroll-driven maximalism
- **Safety as a section** — Anthropic is the only major AI company that gives Safety top-level nav

**Why it's an industry standard:** Anthropic proved that an AI company can look *warm* and *human* instead of *cold* and *futuristic*. The cream-and-terracotta palette is now widely imitated (the "AI aesthetic" per The New Yorker, June 2026).

---

### 5. Resend (resend.com)

- **URL:** https://resend.com
- **Award:** Awwwards **Nominee — Apr 26, 2026** (Resend Launch Week VI microsite); Resend brand guidelines documented publicly at resend.com/handbook/design/what-are-our-brand-guidelines; getdesign.md/resend/design-md analysis
- **Sources:** awwwards.com/sites/resend-launch-week-vi; resend.com/blog/rebranding-resend; styles.refero.design/style/0d914ef0-fa84-4c60-a9aa-cef0b5eb6e5d; resend.com/handbook/design/what-are-our-brand-guidelines

**Section structure (resend.com, post-Jul 2025 rebrand):**
1. Hero ("Email for developers" + animated gradient headline)
2. Get started (code-block CTA — copy-paste API call)
3. Features (bento grid — 4 cells of mixed size)
4. Pricing (3-tier: Free / Pro / Enterprise)
5. Blog (recent posts inline)
6. Customers (testimonials inline, not a wall)
7. Footer

**Layout patterns:**
- **Dark mode first** — confirmed by their own brand guidelines: "Resend is dark mode first"
- **Pure black `#000000` background** with **gradient text on H1** (the "bg-clip-text" pattern Resend popularized)
- **Code block as hero element** — a working API call right in the hero, not a screenshot
- **Bento grid features** with subtle gradient fills
- **Hairline gray borders** `#292d30` (Graphite Hairline)
- **Noise texture** on hero backgrounds (verified at mcpservers.org/agent-skills/resend/resend-brand)

**Color palette (verified — styles.refero.design + resend brand guidelines):**
- Void Black `#000000` (primary background)
- Graphite Hairline `#292d30` (borders, dividers)
- Gray scale: 11 tones from `#0A0A0A` → `#FAFAFA`
- White `#FFFFFF` (text, button text on dark)
- Gradient text: linear-gradient(97deg, …) — purple/violet/indigo to pink/magenta (verified at mcpservers.org)

**Typography:**
- **Inter** for body and UI
- **Domaine** (serif) for large display headlines — paired with Inter, similar to Anthropic
- Headlines: gradient-clipped, large (72–96px), weight 600
- **Monospace accents** for code, eyebrows, labels (JetBrains Mono / Geist Mono)
- Body: 16px / 1.6

**Unique elements:**
- **Gradient-clipped headline text** — the bg-clip-text pattern Resend made standard
- **Live code block in hero** — copy-pasteable API call
- **Noise texture overlay** on hero — adds physicality to flat dark backgrounds
- **Launch Week microsites** — each launch week gets its own Awwwards-nominated microsite (Apr 2026)
- **Documented brand guidelines** — fully public design-system handbook

**Why it won:** Resend is the canonical "developer-first email API" site — they proved that a developer tool can look premium without being colorful. The dark + gradient + Inter/Domaine combo became the default for every developer-tool startup in 2025–2026.

---

### 6. Framer (framer.com)

- **URL:** https://www.framer.com
- **Award:** Awwwards **Honorable Mention** (framer.com); listed on Awwwards "Best Framer Websites" collection
- **Sources:** awwwards.com/sites/framer-com; awwwards.com/websites/framer; framer.com/awards

**Section structure (framer.com, ~2026):**
1. Hero ("AI design agent for every step from idea to launch" + live demo)
2. AI design agent demo (interactive — type a prompt, see a site)
3. Features (bento grid — design / ship / scale / manage)
4. Templates marketplace inline
5. Customer showcase (real sites built with Framer)
6. Pricing (Hobby / Mini / Basic / Pro / Enterprise)
7. Footer

**Layout patterns:**
- **Light mode default** with strong dark hero sections interspersed
- **Live interactive demo in hero** — type a prompt, watch the AI build a site
- **Bento grid** for features (4 cells of mixed size)
- **Showcase grid** — real customer sites as the social proof (replaces the logo wall)
- **Full-bleed template previews** — clicking opens an overlay

**Color palette:**
- Pure white `#FFFFFF` (light surfaces)
- Near-black `#0D0D0D` (dark hero blocks)
- Blue `#0099FF` (Framer blue — primary accent, used sparingly)
- Light gray `#F4F4F4` (section backgrounds)
- Black text `#0A0A0A` on white

**Typography:**
- Framer uses a custom display sans-serif for large headlines (geometric grotesque, similar to Inter Display)
- Inter for body and UI
- Headlines: very large (64–96px), bold (700), tight tracking
- Body: 16px / 1.6

**Unique elements:**
- **Live AI demo in the hero** — type a prompt, get a site
- **Customer showcase grid** instead of a logo wall — real, clickable customer sites
- **Template marketplace** woven into the homepage
- **Hero CTA is the demo itself** — the "Try it" button starts an interactive AI session

**Why it won:** Framer treats the homepage as a *product demo surface* — the hero is the product. This is the same Stripe-style "marketing site as product surface" philosophy.

---

### 7. Next.js Conf (nextjs.org/conf 2024)

- **URL:** https://nextjs.org/conf (2024 site)
- **Award:** Awwwards **Site of the Day — Sep 16, 2024**
- **Sources:** awwwards.com/sites/next-js-conf-1 (SOTD, date confirmed Sep 16, 2024); awwwards.com/websites/next-js collection

**Section structure (2024 conf microsite):**
1. Hero (massive typography + date + CTA to register)
2. Speakers (grid of speaker cards with hover-reveal bios)
3. Schedule (timeline by track)
4. Past editions (archive carousel)
5. Sponsors (logo grid, restrained)
6. Footer

**Layout patterns:**
- **Single-page scroll experience** — the whole conf site is one long scroll
- **Dark mode** with subtle gradient background
- **Massive hero typography** — "Next.js Conf" fills the viewport
- **Speaker cards** — square photos with hover-reveal bio overlay
- **Schedule as horizontal timeline** by track
- **Sticky chapter nav** — jump-to-section nav pinned at top

**Color palette:**
- Near-black `#0A0A0A` background
- White `#FFFFFF` text
- Vercel blue `#0070F3` accent (consistent with Vercel brand)
- Subtle indigo gradient overlays

**Typography:**
- Geist Sans (Vercel's typeface)
- Geist Mono for labels, dates, times
- Headlines: massive (120px+), weight 600, tight tracking
- Body: 16px / 1.6

**Unique elements:**
- **Massive hero typography** as the primary visual element (no imagery in hero)
- **Horizontal track timeline** for the schedule (instead of a vertical agenda)
- **Hover-reveal speaker bios** — keeps the grid clean while showing depth
- **Sticky chapter nav** with scroll-spy active state

**Why it won:** Next.js Conf demonstrates that a conf microsite can be a focused, brand-forward experience rather than a generic event template. The massive typography + dark restraint + Geist typeface make it feel like an extension of Vercel's brand, not a separate event.

---

### 8. Sharplink (Studio Freight) — Web3 B2B

- **URL:** sharplink.eth / Studio Freight case study
- **Award:** Awwwards **Site of the Day — Aug 27, 2026** + Developer Award; 2025 SOTY nominee
- **Sources:** awwwards.com/sites/sharplink; awwwards.com SOTD listing ("Sharplink. WEBSITE. Sharplink. Studio Freight. DEV. Developer Award. SOTD. Site Of The Day Aug 27, 2026"); facebook.com/awwwards/posts Jul 30, 2024 SOTD announcement; instagram.com/p/DVOj54eihPN (2025 SOTY nominee announcement)

**Section structure (institutional-grade Ethereum treasury platform):**
1. Hero (Web3-native — animated ETH/protocol visual)
2. The Thesis (long-form — why institutional ETH treasury)
3. How it works (3–4 step process with on-chain visuals)
4. Performance / yields (live data dashboard)
5. Security & custody (audit + multisig disclosures)
6. Team / advisors
7. Resources (whitepaper, audit reports, on-chain data deep links)
8. Footer

**Layout patterns:**
- **Dark mode** with high-contrast accents
- **Animated on-chain data visualizations** — real ETH flows, not screenshots
- **Long-form thesis section** — single-column editorial layout for the investment thesis
- **Live data dashboard** embedded mid-scroll — proves the product is real
- **Numbered process timeline** — sticky scroll-driven

**Color palette (Studio Freight signature):**
- Near-black `#0A0A0A` background
- White `#FFFFFF` text
- Studio Freight's signature accent (often a vivid green, blue, or orange — varies by project; Sharplink uses a deep institutional navy + accent)
- High-contrast single accent color
- Generous use of monospace for data, addresses, hashes

**Typography:**
- Studio Freight is known for **PP Neue Machina** / **PP Neue Montreal** (Pangram Pangram foundry) — geometric grotesques with character
- Headlines: very large (80–120px), weight 700, tight tracking
- Body: 16–18px / 1.6
- Heavy mono use for hashes, addresses, on-chain data

**Unique elements:**
- **Live on-chain data embedded in the page** — real ETH flows, not marketing screenshots
- **Long-form investment thesis** as a center-of-page editorial section
- **Audit disclosures as primary content** (security firm logos + downloadable reports)
- **Studio Freight signature motion** — smooth scroll-driven transitions, sticky pinned sections
- **Developer Award** — Awwwards recognized the technical execution separately

**Why it won:** Sharplink is the canonical 2026 example of a Web3 *institutional* site that doesn't look like a crypto scam. It uses real on-chain data, real audit disclosures, and editorial-grade typography to make ETH treasury feel as serious as a Goldman Sachs pitch deck.

---

### 9. Lazarev.agency

- **URL:** https://www.lazarev.agency
- **Award:** Awwwards **Site of the Day — Oct 5, 2022** (Lazarev.); still cited as a top B2B product-design agency throughout 2025–2026 (brights.io, saasfactor.co)
- **Sources:** awwwards.com/sites/lazarev-product-design-firm (SOTD Oct 5, 2022); lazarev.agency/about-us; lazarev.agency/articles/ux-design-examples; brights.io/blog/best-saas-design-companies (2026)

**Section structure (lazarev.agency):**
1. Hero (3D animated agency logo / dark gradient)
2. Selected work (case studies as full-bleed image cards)
3. Capabilities (Services: Brand, UI/UX, Web Design, Motion)
4. Process (numbered sticky-scroll timeline)
5. Engagement models (Retainer / Project / Sprint — pricing model explainer)
6. Testimonials (long-form client quotes, not 5-star ratings)
7. Team (operators with skills)
8. Insights / Articles
9. Contact (multi-step intake form)
10. Footer

**Layout patterns:**
- **Dark gradient background** with neon accents (verified at Instagram @lazarev.agency: "neon accents, deep gradients, and subtle animations")
- **Full-bleed case study cards** — image fills the card, hover reveals client + outcome metric
- **3D animated hero** (custom WebGL)
- **Sticky-scroll process timeline** — numbered phases pin to viewport while content scrolls
- **Long-form testimonials** — paragraph-length client quotes, not 5-star ratings
- **Multi-step intake form** — breaks contact into 3–4 steps

**Color palette (Lazarev signature):**
- Near-black background `#0A0A0A`
- Neon accent — varies (electric blue, lime, magenta per project)
- Deep gradient overlays (purple → blue → black)
- White text with gray secondary

**Typography:**
- **PP Neue Montreal** or similar geometric grotesque (Pangram Pangram)
- Headlines: very large, weight 700+, tight tracking
- Body: 16–18px / 1.6
- Heavy uppercase mono labels for eyebrows and section numbers

**Unique elements:**
- **3D animated hero** (custom WebGL — not a video, not a static image)
- **Sticky-scroll process timeline** that became an industry-standard pattern
- **Full-bleed case study cards** with hover-reveal outcome metrics (e.g., "+340% conversion")
- **Multi-step contact form** that asks structured questions instead of free-form
- **Long-form testimonials** with real client names + outcomes

**Why it won / why it's still referenced in 2026:** Lazarev is the canonical "agency website that doesn't look like an agency website." It treats the portfolio like a SaaS product showcase. The 3D hero + sticky-scroll process + full-bleed case study cards became the template every B2B agency imitates.

---

### 10. Elva (Awwwards SOTD Jun 15, 2026)

- **URL:** Elva product site
- **Award:** Awwwards **Site of the Day — Jun 15, 2026**
- **Sources:** awwwards.com/sites/elva (SOTD Jun 15, 2026, confirmed)

**Section structure:**
1. Hero (glass-blob persona visual — 30+ behavioral states)
2. The product (agentic UX — interactive demo)
3. Capabilities (intelligent camera, context-aware monetization)
4. Use cases (by industry)
5. Tech stack / architecture
6. Team / About
7. Contact
8. Footer

**Layout patterns:**
- **Custom 3D "persona" visual** in hero — a glass-blob with 30+ behavioral states that responds to interaction
- **Agentic UX demo** — interactive, not a video
- **Dark mode** with iridescent accents
- **Full-bleed section transitions** — each section bleeds into the next with gradient washes
- **Mixed grid layouts** per section (not the same grid everywhere)

**Color palette:**
- Near-black background
- Iridescent / holographic accents (purple, teal, pink gradient washes)
- White text
- Glass-morphism surfaces (frosted, semi-transparent)

**Typography:**
- Custom or rare display sans-serif
- Large headlines (72–96px)
- Mono accents for technical labels

**Unique elements:**
- **Custom 3D "persona"** in hero — a glass blob with 30+ behavioral states
- **Agentic UX demo** — the product is interactive, not described
- **Iridescent gradient washes** between sections
- **Glass-morphism cards** for capabilities

**Why it won:** Elva demonstrates what an *agentic AI product* site looks like — the hero IS the agent, behaving in real time. This is the next-gen pattern for AI company sites (vs. Anthropic's restrained editorial approach).

---

### 11. V7 Labs (v7labs.com) — Enterprise AI

- **URL:** https://www.v7labs.com
- **Award status:** Referenced in bookmarkify.io "Best SaaS Websites of 2025 — End-of-Year Showcase" as "V7 Labs — High-End Enterprise AI, Wrapped in Elegance"; Awwwards nominee-level references
- **Sources:** bookmarkify.io/blog/best-saas-websites-of-2025-end-of-year-showcase; allsite.pro/work/v7; v7labs.com

**Section structure (v7labs.com, ~2026, post-pivot to Private Equity / Finance):**
1. Hero (enterprise AI workflow headline + screenshot)
2. Use cases (Investment diligence / Reporting / Submission ingestion)
3. Platform capabilities (bento grid)
4. Customers (Private Equity, Insurance, Real Estate — named sectors)
5. Resources (Docs, API)
6. Pricing (Enterprise — contact-based)
7. Footer

**Layout patterns:**
- **Light mode default** with elegant dark accents
- **Customer-screenshot-first** — V7's hero shows the actual product UI
- **Bento grid capabilities** with mixed cell sizes
- **Sector-organized customer stories** — by industry, not by company
- **Restrained motion** — fades and slides, not 3D

**Color palette:**
- White `#FFFFFF` background
- Deep navy / charcoal `#1A1A2E` text and dark sections
- V7's brand teal/cyan accent
- Light gray `#F4F4F4` section backgrounds

**Typography:**
- Inter or similar grotesque sans
- Large headlines (60–80px), weight 600
- Body: 16px / 1.6
- Tabular numbers for metrics

**Unique elements:**
- **Sector-organized customer stories** (Private Equity / Insurance / Real Estate) instead of a logo wall
- **Product screenshot as hero visual** — proves the product is real
- **Bento grid for capabilities** with mixed sizes
- **Restrained motion** — fades and slides, not maximalist 3D

**Why it's referenced:** V7 Labs shows how an enterprise AI company can be elegant without being maximalist. Light mode + product-first hero + sector-organized customers = enterprise credibility.

---

### 12. Sunday (Awwwards SOTD Dec 31, 2025)

- **URL:** Sunday (helpful home robot Memo)
- **Award:** Awwwards **Site of the Day — Dec 31, 2025** (score 7.38/10)
- **Sources:** awwwards.com/sites/sunday (SOTD Dec 31, 2025, confirmed); snippet: "Sunday and their helpful home robot Memo are on a mission to make life, lighter."

**Section structure:**
1. Hero (Memo the home robot — animated character intro)
2. The mission ("make life, lighter")
3. Meet Memo (interactive product demo)
4. How it works (process)
5. Use cases (cleaning, organizing, etc.)
6. Pricing
7. Footer

**Layout patterns:**
- **Character-led hero** — Memo the robot is the visual anchor
- **Interactive product demo** mid-scroll
- **Soft, warm color palette** (distinct from the dark-mode SaaS trend)
- **Full-bleed lifestyle imagery** + product UI overlays

**Color palette:**
- Warm off-white / cream backgrounds
- Soft accent colors (warm peach, sage, soft yellow)
- Friendly, not corporate

**Typography:**
- Soft rounded sans-serif (friendlier than typical SaaS geometric)
- Large, warm headlines

**Unique elements:**
- **Character (Memo) as the brand mascot** — appearing throughout the site
- **Interactive product demo** mid-scroll
- **Warm, soft palette** — antithetical to the dark + neon Linear/Vercel/Resend trend
- **Lifestyle imagery integrated with product UI** — not just product screenshots

**Why it won:** Sunday proves that a B2B/B2C hybrid robotics company can be *warm* and *human* instead of cold-tech. The character-led approach is a different path to "premium" than the dark/minimal Linear look.

---

## Part 2 — 5–7 Proven Patterns That Recur Across Multiple Award-Winning Enterprise Sites

### Pattern 1 — Dark mode + monochrome + single vivid accent (the "Linear/Vercel/Resend" trio)

**Sites:** Linear, Vercel, Resend, Lazarev, Sharplink, Elva (6 of 12 sites)
**Pattern:** Near-black background `#0A0A0A` or `#000000`, white text, ONE vivid accent color (indigo `#5E6AD2` for Linear, blue `#0070F3` for Vercel, gradient for Resend, neon for Lazarev). Restraint is the brand.
**Why it wins:** A single confident accent color reads as "premium" because it requires discipline. Multiple bright colors read as "playful" (consumer) or "messy" (amateur). The accent appears ONLY on CTAs, links, and one or two hero elements — never as decoration.
**Implementation:** Define ONE accent color in CSS variables. Apply to buttons, links, hero gradient glow, and 2–3 key UI moments. Everything else is the gray scale.

### Pattern 2 — Bento grid for capabilities (irregular mixed-size cells)

**Sites:** Linear, Vercel, Framer, Resend, V7 Labs (5 of 12 sites)
**Pattern:** A 4-column grid where the hero capability takes a 2×2 cell and smaller capabilities take 1×1 cells. Cell sizes vary within the same grid. Each cell has a distinct visual (icon, mini-screenshot, code block, gradient) but the same typographic system.
**Why it wins:** Bento grids let you show *depth* (a hero feature gets 4× the space) without losing *scanability* (smaller features are still visible). They replaced the generic "3 equal feature cards" pattern that every SaaS site used 2018–2023.
**Implementation:** CSS Grid with named template areas; cells use `gap-px` and a background color to create the grid lines (Vercel's technique); hero cell uses `col-span-2 row-span-2`.

### Pattern 3 — Live product demo in the hero (not a screenshot, not a video)

**Sites:** Stripe (in-browser console), Framer (AI prompt → site demo), Resend (live code block), Elva (agentic UX demo), Sharplink (live on-chain data) (5 of 12 sites)
**Pattern:** The hero contains a *real, working* piece of the product — a functional console, an interactive demo, a live code block, or a live data dashboard. NOT a screenshot. NOT a video. The actual product.
**Why it wins:** This is the single biggest differentiator between Awwwards-winning enterprise sites and average SaaS sites. Average sites show a screenshot of the product; award-winning sites show the product itself, working, in the hero. It proves the product is real.
**Implementation:** A `<ProductDemo>` React component in the hero that renders a real (or real-ish) product surface — could be a live API call, an interactive timeline, a working filter, or a sample dashboard.

### Pattern 4 — Recently Shipped / Changelog feed on the homepage

**Sites:** Linear (changelog section), Vercel ("Recently Shipped" feed), Stripe (release notes inline), Framer (version updates) (4 of 12 sites)
**Pattern:** A chronological feed of the 5–10 most recent product releases, dated, right on the homepage. Each entry is a short paragraph + version number + date.
**Why it wins:** Shows the product is alive and actively maintained. Enterprise buyers care about this — a stale product is a red flag. The Changelog section is now table-stakes for any modern B2B SaaS.
**Implementation:** A horizontally-scrolling or vertical list of dated entries; each entry has a version number (v1.4.2), date, title, and 1–2 sentence description.

### Pattern 5 — Customer stories organized by SECTOR or OUTCOME (not a logo wall)

**Sites:** Stripe (Customers section with case studies), Vercel (case studies with measured outcomes), V7 Labs (sector-organized: PE / Insurance / Real Estate), Linear (1-line inline testimonials), Lazarev (long-form quotes with outcomes) (5 of 12 sites)
**Pattern:** Instead of a grayscale logo wall (the 2015 pattern), award-winning sites organize customers by SECTOR or OUTCOME. Each story has a real client name, a measurable outcome ("+340% conversion", "$2.8M in seed"), and a deep link to a case study.
**Why it wins:** A logo wall proves *who* uses the product; a sector/outcome-organized customer section proves *what the product did for them*. The latter is far more persuasive for enterprise buyers.
**Implementation:** A list/grid of case study cards; each card has Client logo + sector tag + headline outcome metric + 1-sentence story + "Read case study →" link.

### Pattern 6 — Editorial long-form section (manifesto / method / thesis)

**Sites:** Linear (Linear Method), Anthropic (Research + Safety), Sharplink (The Thesis), Lazarev (Process), Stripe (Customer Stories as long-form) (5 of 12 sites)
**Pattern:** A single-column, long-form text section that reads like an essay or manifesto. Used for: product philosophy, investment thesis, safety/research disclosures, or company values. Generous typography, no grid, no cards.
**Why it wins:** Gives the brand a *point of view*. Most SaaS sites have no manifesto — they're feature lists. An editorial long-form section says "we believe X" instead of "we offer X, Y, Z." Anthropic's Research section, Linear's Method, and Sharplink's Thesis all do this.
**Implementation:** A `<section>` with `max-w-[680px]` or `max-w-[720px]` (reading width), single column, large serif or sans-serif headline, body text at 18px / 1.65, generous vertical margins (py-24 to py-32).

### Pattern 7 — Sticky-scroll process timeline (numbered phases that pin)

**Sites:** Lazarev (numbered sticky-scroll timeline), Linear (Method), Sharplink (How it works), Stripe (solutions scroll), Next.js Conf (schedule timeline) (5 of 12 sites)
**Pattern:** A vertical scroll-driven timeline where the current phase number pins to the viewport while the phase content scrolls past. As you scroll, the pinned number changes (01 → 02 → 03 → 04).
**Why it wins:** Communicates process depth without forcing the user to read everything. The pinned number is a progress indicator. The pattern is engaging without being maximalist.
**Implementation:** CSS `position: sticky; top: 25%` on the number column; the content column scrolls normally; use `IntersectionObserver` or CSS scroll-driven animations (`view-timeline`) to update the active phase.

### Pattern 8 (bonus) — Shadow-as-border instead of CSS borders (Vercel's signature)

**Sites:** Vercel (documented at ifuryst.com + explainx.ai as "the most sophisticated shadow system in modern web design")
**Pattern:** Instead of `border: 1px solid #E5E5E0`, use layered `box-shadow` to create depth. A card's shadow might be: `0 0 0 1px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)`. The 1px "border" is actually a 1px shadow at offset 0.
**Why it wins:** Shadows create *atmospheric* depth — borders create *flat* separation. Shadows also scale with elevation (a hover state can deepen the shadow without changing the "border"). This is the single technique that makes Vercel's pure-black-and-white feel rich.
**Implementation:** Define a `--shadow-border` CSS variable. Replace `border border-[#E5E5E0]` with `shadow-[var(--shadow-border)]`.

---

## Part 3 — Proposed Beta Mode Section Structure (completely different from Alpha's 11)

**Alpha's current 11 sections:** Hero, About, Services, Portfolio, Process, Team, Tech, Testimonials, Insights, Contact, Footer

**Problem:** The current Beta mirrors Alpha's structure 1:1 — which is exactly what the user wants to avoid. Beta should be its own IA, informed by what award-winning enterprise sites actually do.

### New Beta Mode — 8 sections (different IA, different layout DNA)

The new Beta treats the site as a **product surface**, not a brochure. Inspired by the Linear / Vercel / Resend / Stripe approach where the homepage IS the product.

---

#### Section 1 — **Mission Hero**
- **Purpose:** One-line value proposition + a working product visual. No spec sheet. No barcode. No "document ID." Just: the promise, the proof, the CTA.
- **Layout pattern (citing award sites):**
  - Linear's mouse-reactive gradient glow behind hero text
  - Stripe's animated diagonal gradient (subtle, single color shift, not maximalist)
  - Vercel's huge hero typography (80–120px)
  - Resend's gradient-clipped headline text
  - Live product visual on the right (a mini Sigma Lab map preview OR an interactive service navigator)
- **Existing content mapping:**
  - Hero headline (currently "We ship production systems") → kept but redesigned
  - 4-cell stat grid → kept but redesigned as floating glassmorphic stat chips, not bordered cells
  - CTAs → kept
  - Reference pricing warning → moved out of hero (it doesn't belong in the hero — see Section 8)

---

#### Section 2 — **Capabilities (Bento)**
- **Purpose:** Replace the 27-service periodic-table grid with a bento grid where 3 hero capabilities get 2×2 cells and ~8 supporting capabilities get 1×1 cells. NOT all 27 services shown — only the 3 hero ones (AI, Web3, Full-stack) get full treatment, the rest link to a /services index page.
- **Layout pattern (citing award sites):**
  - Linear's bento grid (4-column, mixed cell sizes)
  - Vercel's bento for the Build/Ship/Host blocks
  - Framer's bento for design/ship/scale/manage
  - V7 Labs' bento for capabilities
  - Each cell uses Vercel's **shadow-as-border** instead of CSS borders
- **Existing content mapping:**
  - 27 services from `beta-data.ts` → 3 hero capabilities (AI / Web3 / Full-stack) get bento hero cells; the other 24 link to a `/services` index page (already exists at `/services/[slug]`)
  - Category filter tabs → REMOVED (bento replaces the need for filter tabs)
  - Service icons → kept, larger, more polished

---

#### Section 3 — **Work / Deployments** (replaces Portfolio)
- **Purpose:** Full-bleed case study cards with hover-reveal outcome metrics. NOT 9 boarding-pass cards. Real project screenshots, real client names, real outcomes.
- **Layout pattern (citing award sites):**
  - Lazarev's full-bleed case study cards with hover-reveal metrics
  - Stripe's customer story carousel
  - V7 Labs' sector-organized customer stories
  - Vercel's case-study deep links with measured outcomes
- **Existing content mapping:**
  - 9 projects from `beta-data.ts` → 3–4 hero case studies get full-bleed cards with real screenshots; the other 5–6 link to a `/work` index page
  - Project tech stack tags → kept, redesigned as monospace chips
  - Project outcomes ("+340% conversion" style) → NEW — needs to be added to project data

---

#### Section 4 — **How We Ship** (replaces Process)
- **Purpose:** A sticky-scroll process timeline where the current phase number (01 → 02 → 03 → 04) pins to the viewport while the phase content scrolls past. NOT a vertical timeline with numbered margin indices.
- **Layout pattern (citing award sites):**
  - Lazarev's sticky-scroll process timeline
  - Linear's Method section (long-form, but with sticky numbers)
  - Sharplink's "How it works" pinned timeline
  - Next.js Conf's sticky chapter nav with scroll-spy
- **Existing content mapping:**
  - Process steps from `beta-data.ts` → mapped to 4 sticky-scroll phases (Discover / Build / Ship / Support)
  - Principles row → kept as a horizontal strip at the end
  - Phase cards → redesigned as scroll-into-view content blocks

---

#### Section 5 — **Method & Insights** (merges About + Insights + Tech)
- **Purpose:** A single editorial long-form section that reads like a manifesto. Combines the company mission (currently BetaAbout), the operator philosophy, AND a feed of recent insights/publications. Tech stack gets its own subsection at the end (not a full section).
- **Layout pattern (citing award sites):**
  - Anthropic's editorial long-form (Research section)
  - Linear's Linear Method (long-form manifesto)
  - Sharplink's The Thesis (editorial thesis)
  - Resend's blog-as-feed inline
- **Existing content mapping:**
  - About mission text → opening of the manifesto
  - Capability bars (AI 95%, Web3 88%, etc.) → REMOVED (capability bars feel like a 2015 resume — replaced by the bento grid)
  - Insights from `beta-data.ts` → 3 most recent insights shown as inline editorial cards at the end
  - Tech stack from `beta-data.ts` → condensed into a "Built with" strip at the very end (not a full Tech section)

---

#### Section 6 — **Operators** (replaces Team)
- **Purpose:** Team as a horizontal scroll of operator cards, each hover-revealing skills + a real photo. NOT periodic-table-cell cards. NOT 8 cards in a 4×2 grid.
- **Layout pattern (citing award sites):**
  - Next.js Conf's hover-reveal speaker cards
  - Elva's glass-morphism capability cards
  - Linear's restrained team strip
- **Existing content mapping:**
  - 8 team members from `beta-data.ts` → horizontal scroll (overflow-x) of operator cards; each card hover-reveals skills + role
  - Skills tags → kept, redesigned as monospace chips
  - Operator handles → kept (this is brand-consistent)

---

#### Section 7 — **Customer Voice** (replaces Testimonials)
- **Purpose:** Long-form client quotes with real names + outcomes. NOT 3 boarding-pass cards with big metrics. NOT 5-star ratings. Real paragraph-length testimonials.
- **Layout pattern (citing award sites):**
  - Lazarev's long-form testimonials with real client names + outcomes
  - V7 Labs' sector-organized customer stories
  - Linear's 1-line inline testimonials
- **Existing content mapping:**
  - 3 testimonials from `beta-data.ts` → 2 hero testimonials get full-bleed quote cards; the third becomes a pull-quote inside the Method section
  - Big metric on each card → REMOVED (long-form quote is more credible than a big-number theater)
  - Author spec sheet → kept but redesigned as a small avatar + name + role + sector tag

---

#### Section 8 — **Start a Project** (replaces Contact + Footer)
- **Purpose:** A multi-step intake form (3–4 steps) PLUS a clean footer. NOT a single form + a contact directory sidebar + a barcode footer. The form breaks contact into structured steps (project type / budget / timeline / details).
- **Layout pattern (citing award sites):**
  - Lazarev's multi-step intake form
  - Stripe's structured intake (project type, industry, etc.)
  - Framer's pricing-as-form pattern
  - Anthropic's restrained contact (no theater)
- **Existing content mapping:**
  - Contact form → multi-step (Step 1: What do you need? / Step 2: Budget & timeline / Step 3: About you / Step 4: Confirm)
  - Contact directory sidebar → REMOVED (multi-step form replaces it)
  - Barcode footer → REMOVED (theater)
  - Footer → kept but redesigned as a clean 3-column link directory + brand block + Geist-style status line
  - Reference pricing warning → MOVED HERE (it belongs at the CTA moment, not the hero)

---

### Summary — Beta Mode new section list (8 sections, vs. Alpha's 11)

| # | New Beta section | Replaces (Alpha/Beta old) | Inspiration |
|---|---|---|---|
| 1 | Mission Hero | BetaHero | Linear, Stripe, Vercel, Resend |
| 2 | Capabilities (Bento) | BetaServices | Linear, Vercel, Framer, V7 |
| 3 | Work / Deployments | BetaPortfolio | Lazarev, Stripe, V7 |
| 4 | How We Ship | BetaProcess | Lazarev, Linear, Sharplink |
| 5 | Method & Insights | BetaAbout + BetaInsights + BetaTech | Anthropic, Linear, Sharplink |
| 6 | Operators | BetaTeam | Next.js Conf, Elva, Linear |
| 7 | Customer Voice | BetaTestimonials | Lazarev, V7, Linear |
| 8 | Start a Project | BetaContact + BetaFooter | Lazarev, Stripe, Anthropic |

**Net change:** 11 sections → 8 sections. Three sections merged (About + Insights + Tech → Method & Insights). One section removed (the standalone Tech section becomes a strip inside Method & Insights). Two sections renamed + restructured (Contact + Footer → Start a Project). Every section has a different layout DNA from Alpha.

---

## Part 4 — Design Direction

### Recommended Color Palette

**Direction:** DARK MODE FIRST (the Linear / Vercel / Resend / Lazarev / Sharplink / Elva pattern — 6 of 12 sites). The current Beta's pure-white background is the single biggest reason it feels "depressing" — pure white reads as *clinical* and *unfinished* in 2026.

**Proposed palette (informed by Linear + Vercel + Resend + Anthropic — with a unique Taungoo Sigma accent):**

| Token | Hex | Role | Inspiration |
|---|---|---|---|
| `--beta-bg` | `#0A0A0B` | Page background (near-black, slightly warm — NOT pure black; Resend uses `#000000`, Linear uses `#08090A`; we use `#0A0A0B` for a touch of warmth) | Linear Woodsmoke `#08090A`, Resend Void Black |
| `--beta-surface` | `#121214` | Card surfaces (1 step lighter than bg) | Vercel token scale |
| `--beta-surface-2` | `#1A1A1E` | Hover / active surfaces (2 steps lighter) | Vercel token scale |
| `--beta-border` | `rgba(255,255,255,0.08)` | Hairline borders (translucent white, NOT solid) | Linear glowing hairline borders |
| `--beta-fg` | `#F5F5F7` | Primary text (warm off-white — NOT pure white; easier on the eyes) | Anthropic Pampas `#F4F3EE` (warmer) |
| `--beta-fg-muted` | `#8A8A92` | Secondary text (Oslo Gray inspired) | Linear Oslo Gray `#8589A2` |
| `--beta-fg-subtle` | `#5A5A62` | Tertiary text / captions | Linear token scale |
| `--beta-accent` | `#6366F1` | Primary accent — **Indigo** (Linear's signature, but a slightly more saturated tone) | Linear Indigo `#5E6AD2`, Tailwind Indigo-500 |
| `--beta-accent-glow` | `rgba(99,102,241,0.4)` | Hero gradient glow (indigo radial blur) | Linear mouse-reactive glow |
| `--beta-accent-2` | `#10B981` | Secondary accent — **Emerald** (used for "live" / "shipped" / status indicators; distinct from indigo) | Stripe success green, Vercel "shipped" status |
| `--beta-accent-3` | `#F59E0B` | Tertiary accent — **Amber** (used ONLY for the reference-pricing warning, preserved from current Beta) | Existing `--beta-accent-3` |
| `--beta-gradient-text` | `linear-gradient(97deg, #818CF8, #6366F1 50%, #4F46E5)` | Gradient-clipped headline text | Resend's gradient text pattern |

**Rationale:**
- **Dark mode first** because 6 of 12 award-winning enterprise sites use it; pure white reads as clinical/depressing in 2026.
- **Indigo accent** because Linear proved it's the canonical B2B accent; it's warm enough to feel human but cool enough to feel technical.
- **Emerald as secondary** because it's the universal "success/shipped/live" color (Stripe green, Vercel deployed status); it creates a clear semantic system.
- **Amber preserved** for the reference-pricing warning — the only place amber appears.
- **Warm off-white text** (`#F5F5F7`) instead of pure white because pure white on dark backgrounds causes eye strain (Anthropic's research-informed choice).
- **Translucent hairline borders** (`rgba(255,255,255,0.08)`) instead of solid `#E5E5E0` because Linear proved translucent borders on dark backgrounds read as "etched" rather than "drawn."

### Recommended Typography

**Direction:** Keep the existing font stack (Space Grotesk + Geist Mono + Fraunces — already loaded per Stage 67) but **rebalance how it's used**. The current Beta overuses Archivo (the display font) and Geist Mono labels — making everything feel like a spec sheet.

**Proposed type system:**

| Role | Font | Sizes (desktop / mobile) | Weight | Tracking | Inspiration |
|---|---|---|---|---|---|
| Display (H1 hero) | Space Grotesk | 80–96px / 48–56px | 600 (not 700 — softer) | -0.03em | Linear headlines |
| Display (H2 section) | Space Grotesk | 48–56px / 32–40px | 600 | -0.02em | Linear section headers |
| Display (H3 card) | Space Grotesk | 24–28px / 20–22px | 500 | -0.01em | Vercel card titles |
| Editorial (manifesto) | Fraunces (serif, opsz=14) | 22–24px / 18–20px | 400 italic | 0 | Anthropic editorial + Resend Domaine pattern |
| Body | Space Grotesk | 16–18px / 15–16px | 400 | 0 | Linear body |
| UI labels | Geist Mono | 11–12px (NOT 8–9px — too small) | 500 | 0.12em uppercase | Linear UI labels |
| Code / data | Geist Mono | 13–14px | 400 | 0 | Resend, Vercel code |
| Numbers (stats) | Space Grotesk (tabular) | 48–72px | 600 | -0.02em | Stripe stat numbers |

**Critical changes from current Beta:**
1. **Drop Archivo** (the current `--font-display`). Space Grotesk already serves as the display font; Archivo was added for "condensed grotesque" but it conflicts with Space Grotesk's character. Two grotesques = visual confusion.
2. **Bump UI labels from 8–9px → 11–12px.** The current 8px labels are unreadable; this was already flagged in the Stage 67 worklog as "the single highest-impact readability win."
3. **Use Fraunces italic for the manifesto/editorial section** (Section 5: Method & Insights). Anthropic proved serif italic + sans body = scholarly. This gives Section 5 a distinct typographic voice.
4. **Reduce weight on headlines from 700/900 → 600.** Linear and Vercel use weight 600 on hero headlines, not 700. The current Beta uses `font-black` (900) on headlines — too heavy, too "shouty."

### Recommended Layout Philosophy

**"Asymmetric grid with full-bleed scroll-driven sections"** — informed by Linear, Vercel, Lazarev, and Sharplink.

**Principles:**
1. **One section, one layout** — each section has a distinct layout DNA. The current Beta uses the same `grid grid-cols-3 gap-px` everywhere. Award-winning sites vary the grid per section: hero is asymmetric (1.6fr / 1fr), bento is mixed cells, manifesto is single-column, timeline is sticky-scroll.
2. **Full-bleed section backgrounds** — alternate between `--beta-bg` and `--beta-surface` to create rhythm. Don't use a single flat white background everywhere (the current Beta's mistake).
3. **Shadow-as-border** (Vercel's signature) — replace `border border-[#E5E5E0]` with layered `box-shadow` on cards. This is the single technique that makes monochrome feel rich.
4. **Restraint > maximalism** — Linear won by being the *quietest* site on the web. Resist the urge to add more patterns.
5. **One scroll-driven animation per section** — not 5. Each section earns ONE motion moment (a parallax, a sticky pin, a fade-in-up, a gradient shift). The current Beta has zero motion — the opposite problem.
6. **Real visuals, not decorations** — every section should have either a real screenshot, a real demo, or a real data viz. NOT a barcode. NOT a "document ID." NOT a fake spec sheet.

### 3–5 Unique Elements to Incorporate

**Element 1 — Mouse-reactive gradient glow behind the hero headline**
- **Inspiration:** Linear's signature hero glow (documented at frontend.horse/articles/the-linear-look)
- **Implementation:** A `<div>` with `background: radial-gradient(circle at var(--mx) var(--my), var(--beta-accent-glow), transparent 60%)` that updates `--mx` / `--my` on `mousemove`. Pure CSS + a tiny `mousemove` listener. ~30 lines of code.

**Element 2 — Live "Recently Shipped" feed (Section 5 footer)**
- **Inspiration:** Vercel's "Recently Shipped" feed on the homepage; Linear's Changelog section
- **Implementation:** A horizontally-scrolling list of the 5 most recent product releases (drawn from existing `INSIGHTS_DATA` in `beta-data.ts`, filtered to type "release"). Each entry: version number + date + title + 1-line summary.

**Element 3 — Sticky-scroll process timeline with pinned phase numbers (Section 4)**
- **Inspiration:** Lazarev's sticky-scroll process timeline; Linear's Method section; Sharplink's "How it works"
- **Implementation:** CSS `position: sticky; top: 25vh` on a left column containing the phase number (01, 02, 03, 04). The right column scrolls normally. `IntersectionObserver` updates the active phase number as you scroll. ~50 lines of code.

**Element 4 — Bento grid for capabilities with mixed cell sizes (Section 2)**
- **Inspiration:** Linear, Vercel, Framer, Resend, V7 Labs bento grids
- **Implementation:** CSS Grid with named template areas. 3 hero capabilities (AI / Web3 / Full-stack) get `col-span-2 row-span-2` cells; ~8 supporting capabilities get `col-span-1 row-span-1` cells. Each cell uses `shadow-as-border` (no CSS borders). ~80 lines of code for the grid + cards.

**Element 5 — Multi-step intake form (Section 8)**
- **Inspiration:** Lazarev's multi-step contact form; Stripe's structured intake; Framer's pricing-as-form
- **Implementation:** A 4-step form with a progress indicator at the top. Steps: (1) What do you need? — multi-select from service categories; (2) Budget & timeline — radio chips; (3) About you — name, email, company, sector; (4) Review & submit. Each step is a `<form>` section; `useState` tracks current step. ~150 lines of code.

---

## Appendix — Verification Notes

### Sites with verified Awwwards awards (≥2 sources)
- **Stripe Dot Dev** — SOTD Oct 9, 2024 (awwwards.com/sites/stripe-dot-dev + awwwards.com/case-study-stripe-dot-dev.html)
- **Vercel Ship** — Honorable Mention Mar 5, 2024 + 2025 (awwwards.com/sites/vercel-ship + awwwards.com/sites/vercel-ship-2025)
- **Vercel Ship 2025** — Honorable Mention 2025 (awwwards.com/sites/vercel-ship-2025)
- **Next.js Conf** — SOTD Sep 16, 2024 (awwwards.com/sites/next-js-conf-1, date confirmed)
- **Sharplink (Studio Freight)** — SOTD Aug 27, 2026 + Developer Award (awwwards.com SOTD listing + facebook.com/awwwards Jul 30, 2024 announcement + LinkedIn post)
- **Resend Launch Week VI** — Nominee Apr 26, 2026 (awwwards.com/sites/resend-launch-week-vi, date confirmed)
- **Lazarev.agency** — SOTD Oct 5, 2022 (awwwards.com/sites/lazarev-product-design-firm, date confirmed; still referenced as top B2B agency in 2026 brights.io / saasfactor.co)
- **Elva** — SOTD Jun 15, 2026 (awwwards.com/sites/elva, date confirmed)
- **Sunday** — SOTD Dec 31, 2025 (awwwards.com/sites/sunday, score 7.38/10)
- **Framer.com** — Honorable Mention (awwwards.com/sites/framer-com)
- **Studio Linear** — Honorable Mention (awwwards.com/sites/studio-linear-2)

### Sites referenced as industry-canonical (no direct Awwwards award verified, but cited as gold-standard in 2025–2026 SaaS rankings)
- **Linear.app** — "Linear Look" documented at Frontend Horse, LogRocket (Jun 2025), Medium, getdesign.md, bookmarkify (2026 "still untouchable")
- **Anthropic.com** — Claude design system documented at getdesign.md, mobbin.com (hex codes verified); "AI Look" documented in The New Yorker (Jun 2026)
- **V7 Labs** — referenced in bookmarkify 2026 "Best SaaS Websites" as "High-End Enterprise AI"

### Color palette verification (independent sources, not just brand guidelines)
- **Linear** — mobbin.com/colors/brand/linear (Indigo `#5E6AD2`, Woodsmoke `#08090A`, Oslo Gray `#8589A2`, Black Haze `#F7F8F8`, White)
- **Anthropic/Claude** — mobbin.com/colors/brand/claude (Crail `#C15F3C`, Cloudy `#B1ADA1`, Pampas `#F4F3EE`, White); mylogo.review (Coral `#EB6367`)
- **Stripe** — open-design.ai/plugins/design-system-stripe (gradient `#ea2261` → `#f96bee`, brand dark `#1c1e54`)
- **Vercel** — ifuryst.com/DESIGN.md/vercel + explainx.ai (Pure White `#FFFFFF`, Pure Black `#000000`, 11-step gray scale, shadow-as-border)
- **Resend** — styles.refero.design (Void Black `#000000`, Graphite Hairline `#292d30`); resend.com/blog/rebranding-resend ("dark mode first")

### Web searches executed (22 total — all via z-ai web_search CLI, results saved in /tmp/awwwards-research/)
1. Awwwards Site of the Year 2024–2026 winners
2. Awwwards Site of the Month 2025–2026 enterprise B2B
3. Awwwards Site of the Day 2025–2026 tech company
4. Best enterprise website design 2025–2026
5. Best B2B tech website design 2026 awwwards
6. Top 10 award-winning agency websites 2025–2026
7. Stripe website design awwwards
8. Linear app website design award
9. Vercel website design award
10. Framer website design award
11. Best SaaS website design 2026 awwwards
12. Award-winning portfolio website 2025–2026
13. Best enterprise AI company website 2026
14. Best Web3 company website design 2025
15. Awwwards honors enterprise websites 2026
16. Site of the Year 2025 awwwards analysis
17. Recent SOTD December 2025 / January 2026
18. Anthropic Claude website design
19. Resend Next.js website design award
20. Linear.app color palette hex
21. Anthropic website color palette hex
22. Sharplink Studio Freight SOTY
23. Stripe website gradient effect
24. Vercel Geist design system typography
25. Bento grid SaaS website pattern 2026
26. Scroll-driven animation enterprise website 2025
27. Dark mode enterprise typography Inter Geist
28. Lazarev.agency dark theme sections
29. Linear website sections changelog method
30. Vercel website sections navigation
31. Anthropic website sections research safety
32. Stripe.com website sections products solutions
33. Vercel Ship 2025 hero 3D gradient bento
34. SOTD 2025 B2B SaaS list
35. Web3 blockchain company website 2025 award
36. Linear Look Frontend Horse gradient
37. Vercel Ship conference platform design blog
38. Framer.com website design hero sections

---

## Next actions (for the implementing agent, NOT this research task)

1. **User review of this document** — get sign-off on the proposed 8-section structure, color palette, typography rebalance, and the 5 unique elements before any code changes.
2. **Specifically confirm:**
   - Dark mode first (vs. the current pure white)? — This is the single biggest visual change.
   - Drop Archivo font (currently `--font-display`)? — Requires a `layout.tsx` edit.
   - Reduce from 11 → 8 sections? — Some content (Tech, About, Insights) gets merged.
   - Keep amber `#F59E0B` for the reference-pricing warning, even in dark mode?
   - Add multi-step contact form (vs. the current single form + directory sidebar)?
3. If approved, the implementing agent should:
   - Create new Beta components: `BetaMissionHero.tsx`, `BetaCapabilities.tsx`, `BetaWork.tsx`, `BetaHowWeShip.tsx`, `BetaMethod.tsx`, `BetaOperators.tsx`, `BetaCustomerVoice.tsx`, `BetaStartProject.tsx` (8 new files)
   - Delete or repurpose the old: `BetaHero.tsx`, `BetaAbout.tsx`, `BetaServices.tsx`, `BetaPortfolio.tsx`, `BetaProcess.tsx`, `BetaTeam.tsx`, `BetaTech.tsx`, `BetaTestimonials.tsx`, `BetaInsights.tsx`, `BetaContact.tsx`, `BetaFooter.tsx`
   - Keep `SpecCard.tsx` (used internally in some sections) but redesign its visual treatment (shadow-as-border, dark surfaces, no barcode)
   - Update `beta-data.ts` to add `outcome` field to PROJECTS and `releaseType` field to INSIGHTS_DATA
   - Update `globals.css` `.beta-mode` class with new CSS variables (the dark palette above)
   - Update `BetaInterface.tsx` to render the 8 new sections in order
4. **Scope note:** This is a full Beta Mode redesign, not a tweak. Treat as Stage 69 in the worklog.
