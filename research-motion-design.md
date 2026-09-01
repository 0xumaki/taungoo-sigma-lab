# Motion Design Research — Beta Mode Redesign

**Task ID:** MOTION-DESIGN-RESEARCH
**Researcher:** Senior design-research sub-agent
**Subject:** Taungoo Sigma Lab — Beta Mode redesign (motion, animation, UI library selection)
**Goal:** Catalog every component, animation, effect, and library on the 8 requested sources, then pick the 10 most impressive components and define a Next.js 16 + React 19 integration plan.
**Date:** 2026

---

## Methodology

1. Used `web-search` skill (z-ai-web-dev-sdk CLI) for ~20 targeted searches across YouTube, Awwwards, Webby, Magic UI, React Bits, Kokonut UI, motion.dev, anime.js, FeralUI, motion vs GSAP, anime vs GSAP, etc.
2. Used `page-reader` skill to fetch and parse 16 live pages: motionsites.ai, motion.dev, kokonutui.com (+ /components + /components/background-paths), animejs.com (+ docs + getting-started/React), reactbits.dev (+ /get-started/installation + /components/backgrounds + /components/text-animations/split-text + /components/backgrounds/dot-field), magicui.design (+ /docs + /docs/components/marquee + /docs/components/magic-card + /docs/components/globe + /docs/components/number-ticker + /docs/components/animated-beam + /docs/components/bento-grid), feralui.dev (+ /components).
3. Resolved both YouTube videos via YouTube's **oEmbed** endpoint (`youtube.com/oembed?url=…`) — the page_reader returns the YouTube homepage for any watch URL because YouTube blocks scrapers, so oEmbed was the only reliable metadata source.
4. Cross-referenced Awwwards 2026 jury picks (Hon Tran, awwwards juror) + Webby 2026 "Best Use of Animation/Motion Graphics" + motion.dev's own "GSAP vs Motion" guide.
5. Raw JSON cached at `/home/z/my-project/research-cache/motion/*.json` (38 files, ~5.5 MB).

---

## Part 1 — Per-Site Analysis

### 1. YouTube videos (design intelligence references)

#### Video 1 — `XvboP7sFa4o`
- **Title:** "I Built 6 Websites in 14 Minutes With GPT-5.6 Sol"
- **Author:** Luke Carter (`@lukesbrave`, BraveBrand)
- **Channel tagline:** *"Build digitally sovereign business infrastructure. Plug & play AI systems that make you money."*
- **Design philosophy (extracted from Facebook/Instagram/YouTube channel posts):**
  - **Anti-subscription thesis:** *"Stop paying endless subscription fees to platforms like Framer or Webflow. Using AI, you can now instantly clone your site and migrate it to your own custom [stack]."*
  - **Anti-sameness thesis:** *"AI has democratized website building so much that almost every sales page now looks and sounds exactly the same. We no longer have to settle for static..."*
  - **Tactical takeaway for Beta Mode:** The site must NOT look like every other AI-generated sales page. Motion + art direction (not just AI copy) is what differentiates a real product.
- **Tools referenced across his content:** GPT-5.6 / Claude / Cursor / Lovable / Bolt for prompting; own-infrastructure hosting (no WordPress).

#### Video 2 — `GPpYwjMoLio`
- **Title:** "I Built $10000 Website With Free AI Tools In 10 Minutes | Free Resources"
- **Author:** Viktor Oddy (`@ViktorOddy`, founder of Design Rocket at `designrocket.io`)
- **Channel tagline:** *"Master using AI design tools"* / *"I Built an Award-Winning Website in 19 Minutes using Google AI Studio"*
- **Design philosophy (from his X article + Facebook posts):**
  - *"Claude Fable 5 Just Changed Web Design Forever!"*
  - *"Use GPT Image or Midjourney for hero images. Then use Kling or Seedance [for video]. The tools are available to everyone. **Taste is the differentiator.**"*
  - *"Viktor Oddy is flipping the script. Instead of manual development, he's leveraging AI tools like Cursor, Claude, and Fable to bridge the gap [between design and code]."*
- **Tools stack (Viktor's standard workflow):**
  | Stage | Tool |
  |---|---|
  | Ideation / chat | Claude (Fable 5 model), Google AI Studio |
  | Code editor | Cursor |
  | Hero / product images | GPT Image (OpenAI), Midjourney |
  | Motion / video | Kling AI, Seedance |
  | Design system learning | Design Rocket (his own school) |
- **Tactical takeaway for Beta Mode:** Use AI for **assets** (hero imagery, video b-roll), but build the **motion system** by hand with real libraries (motion.dev, magicui, reactbits) — taste in choreography is what wins.

---

### 2. motionsites.ai — premium AI website prompts

- **URL:** https://motionsites.ai
- **What it actually is:** A marketplace of **AI website prompts** ("copy, paste, launch") that you paste into Lovable, Bolt, Cursor, Claude, or Gemini. Not a component library — it's a **prompt registry** for AI-generated sites.
- **Tagline:** *"Beautiful Website Prompts for Lovable, Bolt, Cursor, and Claude. Build Stunning 3D Websites With AI."*
- **Sections:** MCP · New · Animated Backgrounds · Academy · Contact · Sign up
- **Categories of prompts:** Hero · Landing Page · SaaS · Agency · AI · Portfolio · 3D Website · Travel · Wellness · Ecommerce · Fintech · Technology · Carousel · Creative · Fashion · Pricing
- **Featured "fresh drops" (named prompts/sites):**
  - **Fastshot AI**
  - **OYLA** (Ecommerce)
  - **Urban Jungle** (Landing Page)
  - **Golden Portal** (Landing Page)
  - **Velorah Agency**
  - **Interactive Discovery** (Hero)
  - **Book Hero** (Hero)
  - **Crypto Vault** (Fintech)
  - **Future-State Landing Page**
  - **AI Runtime**
  - **AI Mostar Guide** (Travel)
  - **3D Story Landing Page** (Sky Cookie Food Obsidian Interactive)
  - **Agent Wave AI Dreamcore** (Landing Page)
  - **AI Future Studio** (Creative)
  - **Liquid Glass Agency Landing Page**
  - **Sentinel Cybersecurity Innovation Landing Page**
- **Other features:**
  - "Copy design from any website in one click" — a browser extension that copies any site into Lovable/Claude/Cursor/Gemini.
  - **Academy** section — "Learn to design beautiful Websites using AI tools."
- **Pricing:** Freemium. "Go Unlimited" plan promoted on the homepage (paid tier). Most prompts appear to be in a paid tier.
- **Install method:** No npm package. Copy-paste prompts only.
- **Standout for Beta Mode:** The **3D Story Landing Page**, **Liquid Glass Agency**, **Sentinel Cybersecurity**, and **Future-State Landing Page** prompts are the closest match to a sci-fi/tech-lab aesthetic. Use them as **prompt seeds**, not as components.
- **Dependencies:** None (you take the prompt into your own stack).

---

### 3. motion.dev — animation library (formerly Framer Motion)

- **URL:** https://motion.dev
- **Version:** `v13.1.0` (current at time of research)
- **License:** MIT, fully open-source, independent
- **What it is:** The **production-grade animation library for the web** — formerly known as Framer Motion. Available for **React, JavaScript, and Vue**. Built by Matt Perry (same author as Framer Motion). The `motion/react` import path replaced `framer-motion`.
- **Trust signals:** "Trusted by Framer and Figma" · 30M+ downloads/month on npm · used across hundreds of thousands of sites · sponsored by Framer, Figma, Sanity, Tailwind CSS, LottieFiles.
- **Install (React):**
  ```bash
  npm install motion
  # then:
  import { motion, AnimatePresence, useScroll } from "motion/react"
  ```
- **Core architecture:**
  - **Hybrid engine** — Web Animations API + ScrollTimeline for hardware-accelerated 120fps animation, with seamless JS fallback for spring physics, interruptible keyframes, gesture tracking.
  - **Tiny footprint** — APIs up to **90% smaller than GSAP** equivalent.
- **Headline features (8 pillars from the homepage):**
  1. **Independent transforms** — animate `x`, `y`, `rotate`, `scale` on the same element, no wrappers: `{ rotate: 15, x: "50%" }`
  2. **Scroll animation** — hardware-accelerated scroll-linked motion via `ScrollTimeline`. `scroll()`
  3. **Native gestures** — `hover`, `press`, `drag` feel native, not bolted on. `drag={true}`
  4. **Layout animation** — animate between any two layouts with a single `layout` prop. `layout={true}`
  5. **Spring physics** — real spring math. `type="spring"`
  6. **Exit animation** — `AnimatePresence` keeps elements alive so they can animate out as they leave the DOM. `exit={{...}}`
  7. **Timeline sequences** — `variants`, `stagger`, and `timelines` orchestrate complex motion. `stagger(0.04)`
  8. **Motion values** — `useMotionValue` drives animations and derived state in real time. `useTransform(() => x.get() * 10)`
- **React components:**
  - `motion` — the core wrapper component
  - `AnimatePresence` — exit animations
  - `AnimateView` — View Transition API wrapper
  - `AnimateActivity` — activity transitions
  - `LayoutGroup` — shared layout transitions
  - `LazyMotion` — code-split the bundle
  - `MotionConfig` — config boundary
  - `Reorder` — drag-to-reorder (multi-dimensional, RTL aware in v13.1)
- **React hooks:**
  - `useScroll`, `useInView`, `usePageInView` (scroll position)
  - `useMotionValue`, `useMotionTemplate`, `useMotionValueEvent`
  - `useSpring`, `useVelocity`, `useTime`, `useTransform`
  - `useAnimate` (imperative scope)
  - `useAnimationFrame`
  - `useDragControls`, `useReducedMotion`
  - `useCurtains` (Motion+)
- **Motion+ (paid premium tier):**
  - Premium React components: `AnimateNumber`, `Carousel`, `Cursor`, `ScrambleText`, `Ticker`, `Typewriter`
  - Premium effects: `attrEffect`, `propEffect`, `styleEffect`, `svgEffect`
  - Premium utils: `arc`, `mix`, `scrambleText`, `splitText`, `spring`, `transform`, `wrap`
- **Adjacent products:**
  - **AI Kit** — "Give your agent specialist Motion judgement. Send the latest docs, 430+ example sources, performance audits and production-ready CSS springs directly to your agent." → Crucial for Cursor/Claude-driven workflows.
  - **Motion UI** — production-ready animated sections, drop-in to your design system, MotionScore-rated.
  - **MotionScore** — free animation performance audit tool. Grades sites S through F in 60 seconds. CI-guarded. **Use this to grade the Beta Mode site after launch.**
- **430+ examples** in the docs (Typewriter, iOS App Folder, iOS pointer animation, Pokopia Modal, Floating Action Button, iOS App Store, etc.)
- **Pricing:** Core library **free** (MIT). Motion+ is a paid subscription (one-time lifetime updates also mentioned). Motion UI is bundled into Motion+.
- **Diff from Framer Motion:** Motion **IS** the new name for Framer Motion. Same author (Matt Perry), same API surface, same npm lineage. The `motion/react` import path replaced `framer-motion`. If you previously used `framer-motion`, you can migrate via the official upgrade guide.
- **Diff from GSAP (per motion.dev's own comparison):**
  - **Licensing** — Motion is MIT & independent; GSAP is closed-source, owned by Webflow, license prohibits use in tools that compete with Webflow and is revocable at Webflow's discretion.
  - **Adoption** — Motion just passed 16M downloads/month, growing exponentially; the most-used animation library in the React ecosystem.
  - **Performance** — Motion's hybrid engine matches/beats GSAP on most benchmarks; MotionScore audited.
  - **Bundle size** — Motion APIs up to 90% smaller than GSAP equivalents.
- **Dependencies for Next.js 16 + React 19:** Just `motion` (single package). Motion v13 explicitly supports React 19 strict mode (changelog: *"AnimatePresence: Improved compat with React 19 strict mode"* — Aug 2026).
- **Standout components for Beta Mode:**
  - `useScroll` + `useTransform` for parallax and scroll-driven scenes
  - `AnimatePresence` for page/route transitions and modal exits
  - `layout` prop for shared-layout transitions between Beta section transitions
  - `Reorder` for any drag-to-reorder interactions (e.g. service basket)
  - `LazyMotion` for code-splitting the animation bundle on the marketing site

---

### 4. kokonutui.com — UI component library

- **URL:** https://www.kokonutui.com
- **What it is:** Collection of **100+ stunning UI components** — free and open-source. Built with **Next.js, React, Tailwind CSS v4, Motion, shadcn/ui**.
- **Author:** Dorian Baffier
- **Stats:** 2.1k GitHub stars · 7+ templates · 100% Free & Open Source · Vercel OSS 2025
- **Categories:** Backgrounds · Cards · Navigation · Inputs · AI · Texts · Buttons
- **Install method (shadcn CLI):**
  ```bash
  # Step 1: init shadcn (if not already)
  bunx --bun shadcn@latest init

  # Step 2: add KokonutUI namespace to components.json
  # { "registries": { "@kokonutui": "https://kokonutui.com/r/{name}.json" } }

  # Step 3: install the cn utility
  bunx --bun shadcn@latest add https://kokonutui.com/r/utils.json

  # Step 4: install any component by name
  bunx --bun shadcn@latest add @kokonutui/particle-button
  ```
  Or use the copy-paste button on each component page (manual install).
- **AI agent support:** Works with the **shadcn MCP server** — Claude Code, Cursor, VS Code, and Codex can browse and install components through natural language. Also has **"Open in v0"** button.
- **Notable standout components (referenced on the homepage):**
  - `particle-button` — button that emits particles on interaction
  - `liquid-glass-card` — Apple Liquid Glass effect using **SVG displacement filters** (frosted-glass morphism)
  - `shimmer-text` — shimmering text effect
  - `ai-prompt` — an AI chat input UI
  - `background-paths` — animated background of flowing SVG line paths drawn across the hero section (Motion path animations)
- **Pro version (Kokonut UI Pro):** Premium components, advanced templates, complete package. "100+ components to build websites faster, works with Claude Code, Cursor and more."
- **Dependencies:** React 19-friendly (built on Next.js + Tailwind v4 + Motion + shadcn/ui — same stack as the Beta Mode project).
- **Pricing:** 100% Free & Open Source (MIT-style). Pro tier paid.
- **Best for Beta Mode:** `background-paths` (hero), `liquid-glass-card` (capability cards), `particle-button` (CTA), `shimmer-text` (section labels).

---

### 5. animejs.com — JavaScript animation engine

- **URL:** https://animejs.com
- **Version:** `v4.5.0` (latest v4 line — there's also a legacy v3.2.2 and v2.1.0 line still documented)
- **License:** MIT, free, open-source
- **What it is:** "A fast and flexible JavaScript library to animate the web" — framework-agnostic, vanilla JS animation engine.
- **Install:**
  ```bash
  npm i animejs
  # then in v4:
  import { animate, stagger, createTimeline, createDraggable, createSpring, createDrawable, createScope, onScroll, morphTo, createMotionPath } from 'animejs';
  ```
- **Modular API (v4 is tree-shakeable):**
  | API | Purpose |
  |---|---|
  | `animate(targets, props)` | Core tween |
  | `createTimer()` | Pure timer (no target) |
  | `createTimeline()` | Orchestrate sequences |
  | `createDraggable()` | Drag, snap, flick, throw with release physics |
  | `createScope()` | Media-query-aware scopes |
  | `createSpring()` | Spring physics |
  | `createDrawable()` | SVG line drawing (`draw: '0 1'`) |
  | `morphTo()` | SVG shape morphing |
  | `createMotionPath()` | Animate along an SVG path |
  | `onScroll()` | Scroll observer (sync modes, thresholds, callbacks) |
  | `stagger()` | Time/value/position staggering |
- **Headline capabilities (from homepage):**
  - **Individual CSS transforms** with `composition: 'blend'` (smoothly blend per-property transforms)
  - **Function-based values** — animate each target differently in one call
  - **Flexible keyframes** — duration-based, percentage-based, with playback settings per keyframe
  - **Built-in easings** — extensive easing library
  - **Enhanced transforms** — versatile composition API
  - **Scroll Observer** — multiple sync modes, advanced thresholds, full callback set
  - **Advanced staggering** — time, values, and timeline positions
  - **SVG toolset** — shape morphing, line drawing, motion paths
  - **Springs and draggable** — fully-featured Draggable API with release physics (stiffness, damping, mass)
  - **Timeline** — orchestrate sequences, sync WAAPI animations and timelines
  - **Scope** — responsive animations via media queries, scoped methods
  - **WAAPI engine** — uses the Web Animations API where possible for native performance
  - **Lightweight & modular** — only import what you need
- **React integration:** No dedicated React adapter in v4 (the v3-style hooks are gone). The documented pattern is:
  ```tsx
  import { animate } from 'animejs';
  import { useEffect, useRef } from 'react';

  export function useAnime() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!ref.current) return;
      animate(ref.current, { rotate: 360, duration: 2000, loop: true });
    }, []);
    return ref;
  }
  ```
  Community package `react-animejs` exists but is unofficial.
- **What can it do that GSAP can't?**
  - **Free forever & MIT** — GSAP is now closed-source, owned by Webflow, license prohibits competing with Webflow.
  - **Per-property composition blending** (`composition: 'blend'`) is unique — lets you animate `x`, `y`, `rotate`, `scale` on the same element from different tweens simultaneously, blending smoothly. GSAP requires overwrite-management for this.
  - **Lighter** — anime.js core is smaller than GSAP core + ScrollTrigger + SplitText + MotionPath.
  - **Built-in SVG morphing** without a paid plugin (GSAP's MorphSVG is in the paid Club GSAP).
  - **Built-in Draggable** without a paid plugin (GSAP's Draggable is also in the paid Club).
  - **More intuitive API** for new developers (object-based vs GSAP's method-chaining).
- **What GSAP does better:**
  - **ScrollTrigger** is more mature than anime's `onScroll()` for complex pin/scrub workflows.
  - **SplitText** plugin is unmatched for text-animation control (but anime has its own `stagger` for letters/words).
  - **Industry adoption** — most Awwwards SOTD 2026 winners (e.g. By-Kin: Next.js + GSAP + Strapi) use GSAP.
- **Pricing:** 100% free, MIT, sponsor-supported.
- **Best use for Beta Mode:** SVG path animations (background-paths style), shape morphing for the Σ logo, draggable claw/pull interactions, scroll-driven section reveals where Motion's `useScroll` feels too React-tied.

---

### 6. reactbits.dev — React component library

- **URL:** https://www.reactbits.dev
- **GitHub:** `DavidHDev/react-bits` — **46.4k stars** (huge community)
- **What it is:** "An open source collection of high quality, animated, interactive & fully customizable React components for building stunning, memorable user interfaces."
- **Stats:** **170+ components** (recent update lists 134 + 238 blocks + 300 app UI blocks + 11 templates + 20 agent skills) · "Free forever" · **Pro** version available.
- **Installation method:** Copy-paste by hand OR pull with CLI.
  - **Manual (recommended path on the install page):**
    1. Pick a component from reactbits.dev
    2. Set your stack: **JS / TS** and **CSS / TW (Tailwind)**
    3. Copy the code from the "Code" tab into your project
    4. Install any external deps it lists (e.g. `npm install gsap` for SplitText)
  - There is **no `npx reactbits add` CLI** — the install page explicitly says "Manual CLI Steps" → "Copy a component's source straight into your project."
  - So **installation = pure copy-paste**, with the option to choose your TS+Tailwind stack.
- **Categories (4 main + 1):**
  1. **Backgrounds** (~60 components)
  2. **Text Animations** (~40 components)
  3. **Animations / Cursor effects** (~30 components)
  4. **Components / UI** (~50 components)
  5. **Blocks / App UI Templates** (Pro)
- **Theme presets:** Nebula, Aurora, Ember, Ice — *"Every value is editable"* (you can tweak color, speed, frequency, noise, intensity, etc.)
- **Free visual editors:** Background Studio, Shape Magic, Texture Lab — three free tools to generate component configs visually.
- **Standout Backgrounds (best for tech lab):**
  - **ColorBends** (their headline new background — color band shader)
  - **DotField**
  - **Line Waves**
  - **Blob Cursor** (cursor-reactive blob)
  - **Soft Aurora** (3D Perlin noise + cosine gradient palettes — aurora borealis shader)
  - **Magnet Lines** / **Antigravity** / **Ballpit** / **Pixel Trail**
  - **Magic Rings** / **Radar** / **Shape Grid**
  - **Ribbons** / **Grainient** / **Orbit Images**
  - **Metallic Paint** / **Balatro** / **Aurora Splash** / **Cursor Beams**
  - **Threads** / **Hyperspeed** / **Iridescence** / **Waves** / **Grid Distortion**
  - **Orb** / **Letter Glitch** / **Grid Motion** / **Shape Grid** / **Liquid Chrome**
  - **Ghost Fibers** (new) / **CRT Warp** (new) / **Molten Metal** (new) / **Gradient Waves** (new) / **Web Threads** (new) / **Topography** / **Light Tunnel** / **Sliced Waves** / **Acid Squares** / **Scanner** / **Ferrofluid** / **Lightfall** / **Liquid Ether** / **Prism**
  - **Dark Veil** / **Light Pillar** / **Silk** / **Floating Lines** / **Side Rays** / **Light Rays** / **Pixel Blast** / **Evil Eye** / **Plasma** / **Plasma Wave** / **Particles** / **Gradient Blinds** / **Grainient Grid** / **Scan Beams** / **Pixel Snow** / **Lightning** / **Prismatic Burst** / **Galaxy Dither** / **Faulty Terminal** / **Ripple Grid** / **Dot Grid**
- **Standout Text Animations:**
  - **Split Text** (powered by GSAP — `npm install gsap`)
  - **Decrypted Text** / **Scrambled Text** / **Glitch Text**
  - **Scroll Velocity** (text scrolls at scroll speed) / **Variable Proximity** / **Count Up**
  - **Text Loop** / **Masked Heading** / **Particle Text**
  - **Split Flap Text** (new) / **Warp Text** / **Stroke Text** / **Depth Text** (new) / **Fold Text** (new) / **Echo Text**
  - **Blur Text** / **Circular Text** / **Text Type** / **Shuffle** / **Shiny Text** / **Text Pressure** / **Curved Loop** / **Fuzzy Text** / **Gradient Text** / **Falling Text** / **Text Cursor** / **True Focus** / **Scroll Float** / **Scroll Reveal** / **ASCII Text** / **Rotating Text**
- **Standout Cursor/Animation effects:**
  - **Glow Cursor** / **Scroll Expand** / **Ripple Distortion** / **Elastic Mesh** / **Swarm Cursor** / **Halftone Reveal** / **Pixel Swap** / **Cursor Grid** / **Animated Content** / **Fade Content** / **Electric Border** / **Orbit Images** / **Pixel Transition** / **Glare Hover** / **Antigravity Logo Loop** / **Target Cursor** / **Magic Rings** / **Laser Flow** / **Magnet Lines** / **Ghost Cursor** / **Gradual Blur** / **Click Spark** / **Magnet Strands** / **Sticker Peel** / **Pixel Trail** / **Cubes** / **Metallic Paint** / **Noise Shape Blur** / **Crosshair** / **Image Trail** / **Ribbons** / **Splash Cursor** / **Meta Balls** / **Blob Cursor** / **Star Border**
- **Standout UI Components:**
  - **Magic Bento** (interactive bento grid tiles that expand + animate)
  - **Infinite Spiral** / **Depth Carousel** / **Morph Slider** / **Drift Wall** / **Accordion Gallery**
  - **Specular Button** / **Option Wheel** / **Curved Input** / **Line Sidebar**
  - **Animated List** / **Scroll Stack** / **Bubble Menu** / **Circular Gallery** / **Reflective Card** / **Card Nav Stack** / **Fluid Glass** / **Pill Nav** / **Tilted Card** / **Masonry Glass Surface** / **Dome Gallery** / **Chroma Grid** / **Folder** / **Staggered Menu** / **Model Viewer** / **Lanyard** / **Profile Card** / **Dock** / **Gooey Nav** / **Pixel Card Carousel** / **Spotlight Card** / **Border Glow** / **Flying Posters** / **Card Swap** / **Glass Icons** / **Decay Card** / **Flowing Menu** / **Elastic Slider** / **Counter** / **Infinite Menu** / **Stepper** / **Bounce Cards**
- **Pricing:** Free forever (open-source). Pro tier unlocks 238 blocks + 300 app UI blocks + 11 templates + 20 agent skills.
- **Dependencies:** Each component lists its own deps. Most are CSS/Tailwind only. Some require `gsap` (SplitText), three.js-style shaders (ColorBends, Ferrofluid), or motion (animate utilities).
- **Best for Beta Mode:** **ColorBends** (hero background), **Decrypted Text** (section header), **Scroll Velocity** (manifesto section), **Magic Bento** (capabilities), **Glow Cursor** (global cursor), **Spotlight Card** (project cards), **Infinite Spiral** (insights carousel), **Pill Nav** (Beta nav).

---

### 7. magicui.design — UI library

- **URL:** https://magicui.design
- **GitHub stars:** 22.1k
- **What it is:** "Beautiful UI components and templates to make your landing page look stunning." **150+ free, open-source animated React components and effects built with React, TypeScript, Tailwind CSS, and Motion.** *"Perfect companion for shadcn/ui."*
- **Philosophy (from the docs):**
  - *"Good design contributes significant value to software. It's one of the main methods of establishing trust between you and an internet stranger. Trust is important for internet businesses because it is the first thing a visitor evaluates before pulling out their credit card..."*
  - Cites **Linear.app** as the canonical example: *"I didn't even need to try the product but I already knew that it must be good."*
  - Heavily inspired by **shadcn/ui** — uses the shadcn CLI for installation.
- **Install (shadcn CLI):**
  ```bash
  pnpm dlx shadcn@latest add @magicui/number-ticker
  # or with npm/yarn/bun:
  npx shadcn@latest add @magicui/magic-card
  ```
  Then import:
  ```tsx
  import { NumberTicker } from "@/components/ui/number-ticker"
  ```
- **MCP** server available — works with Claude Code, Cursor, Codex.
- **Magic UI Pro:** "50+ blocks and templates to build beautiful landing pages in minutes" — 8 production-ready templates, Next.js 15 + TypeScript ready, premium components.
- **Full component catalog (extracted from the docs nav — every component on the site):**

  | Category | Components |
  |---|---|
  | **Components (15)** | Marquee, Terminal, Hero Video Dialog, Bento Grid, Animated List, Dock, Globe, Tweet Card, Orbiting Circles, Avatar Circles, Icon Cloud, Lens, Pointer, Smooth Cursor, Progressive Blur, Dotted Map |
  | **Special Effects (10)** | Animated Beam, Border Beam, Shine Border, Magic Card, Glare Hover, Meteors, Confetti, Particles, Animated Theme Toggler |
  | **Animations (1)** | Blur Fade |
  | **Text Animations (15)** | Text Animate, Typing Animation, Line Shadow Text, Aurora Text, Video Text, Number Ticker, Animated Shiny Text, Animated Gradient Text, Text Reveal Dia, Text Reveal, Hyper Text, Word Rotate, Velocity (Scroll Based), Sparkles, Text Morphing Text, Spinning Text, Text Highlighter, Text 3D Flip |
  | **Device Mocks (3)** | Safari, iPhone, Android |
  | **Buttons (3)** | Rainbow Button, Shimmer Button, Ripple Button |
  | **Backgrounds (10)** | Flickering Grid, Animated Grid Pattern, Retro Grid, Ripple Dot Pattern, Grid Pattern, Hexagon Pattern, Striped Pattern, Interactive Grid Pattern, Light Rays, Noise Texture |
  | **Community (15)** | Shiny Button, File Tree, Code Comparison, Scroll Progress, Neon Gradient Card, Comic Text, Kinetic Text, Cool Mode, Pixel Image, Pulsating Button, Warp Background, Interactive Hover Button, Animated Circular Progress Bar, Backlight, Glyph Matrix |

- **Pricing:** Free (MIT-style, open-source). Magic UI Pro is paid (one-time + subscription tiers).
- **Dependencies:** React 19-compatible (Next.js 15+ TypeScript ready per Pro tier docs). Tailwind CSS + Motion + shadcn/ui — same stack as the Beta Mode project.
- **Best for Beta Mode:** **Animated Beam** (integration map showing data flow between services), **Globe** (deployments map), **Bento Grid** (capabilities section), **Border Beam** (active card highlight), **Magic Card** (cursor-tracking spotlight on cards), **Number Ticker** (metrics/stats), **Marquee** (logo wall + testimonials), **Dock** (sticky bottom nav), **Meteors** (hero decoration), **Orbiting Circles** (tech stack orbit), **Text Reveal** (section reveals), **Shine Border** (call-to-action borders), **Flickering Grid** (background).

---

### 8. feralui.dev — UI library

- **URL:** https://feralui.dev
- **Version:** `v0.1.1` (very early — only 12 components)
- **Author:** Sarthak Navalekar (designs under "mortspace")
- **What it is:** *"A small library of playful, physics-driven React elements"* — *"Components that move like real things."* Built in React + TypeScript.
- **Tagline:** *"Real components you can drop in, that happen to swing, grab, crumple, and catch the light."*
- **Component list (12 + more coming):**
  | Component | Description |
  |---|---|
  | **PullCord** | A cloth cord that really hangs (real Verlet rope). Pull it to switch the lights. |
  | **ClawCaptcha** | Prove you are human by winning the claw machine. |
  | **Gradient Builder** | Soft gradients blended from traditional Japanese colours. |
  | **MotionView** | (not detailed — likely a motion-driven view wrapper) |
  | **Screenery** | A shelf of finished app screens, each with a signature move. |
  | **DeskFolio** | A little book that blooms open and turns pages on a spring. |
  | **Blob** | A squishy jelly mascot that reacts inside a log-out modal. |
  | **AniMaps** | Animated route maps you can export and share. |
  | **Fur** | A pettable coat of fur, painted strand by strand. |
  | **Vacuum** | Select a few tiles and a vacuum sucks them up the hose. |
  | **Crumple** | Notes crumple into paper balls and drop in the basket. |
  | **Hologram** | A foil Pokémon-style card that catches the light as you tilt it. |
  | **Matchday** | Letterboxd-for-football — rate matches in half-stars (a demo app, not a component). |
- **Install method:** **None documented.** The site has no npm install instructions, no CLI, no copy-paste button visible on the homepage or /components page. Each component lives at its own URL as a self-contained demo. It is effectively a **showcase portfolio** of experiments, not yet a production-installable library.
- **Sponsor pitch:** "Be the only sponsor on FeralUI · 47,000+ views a month · 122 countries · from $25" — confirms it's a personal showcase, not a productized library.
- **Unique features:** Every component uses **real physics** (Verlet integration, spring math, particle systems) rather than scripted animations. They feel like real objects, not UI mockups.
- **Pricing:** Free to view the demos. No paid tier. To actually use a component in your project you'd have to **read the source code** (view-source on the demo pages) and rebuild it yourself, OR wait for the author to publish an npm package.
- **Best for Beta Mode:** **PullCord** (Beta Mode toggle — pull the cord to enter Beta), **ClawCaptcha** (anti-bot on contact form — extremely memorable), **Blob** (mascot in the loading state or logout modal), **Hologram** (project card tilt effect), **Crumple** (dismiss-note animation). **Caveat:** All of these require reimplementing from scratch since no installable package exists.

---

## Part 2 — Top 10 Most Impressive Components Across ALL Libraries

Selected for a **tech-lab / sci-fi / tactical aesthetic**, prioritizing: visual impact, performance, installability in Next.js 16 + React 19, and uniqueness (avoiding duplicates across libraries).

| # | Component | Library | Install command | Why it's in the top 10 |
|---|---|---|---|---|
| 1 | **Animated Beam** | Magic UI | `npx shadcn@latest add @magicui/animated-beam` | Animated beams of light travelling along SVG paths between nodes. THE definitive "integration diagram" visual — perfect for showing how Taungoo Sigma Lab connects AI agents, services, and clients. Industry-trusted (used by cognosys.ai, langfuse.com, infisical.com). |
| 2 | **Globe** (Cobe-based) | Magic UI | `npx shadcn@latest add @magicui/globe` | Auto-rotating, interactive WebGL globe. Visualizes global deployment / client reach. Hardware-accelerated, tiny bundle. Pairs perfectly with a "deployments" or "operators worldwide" section. |
| 3 | **Border Beam** + **Magic Card** | Magic UI | `npx shadcn@latest add @magicui/border-beam` `npx shadcn@latest add @magicui/magic-card` | Border Beam = travelling light along card borders. Magic Card = cursor-tracking spotlight. Combined: cards that look like they're "online" and respond to the operator's cursor — pure sci-fi HUD energy. |
| 4 | **ColorBends** | React Bits | copy-paste (TS + Tailwind) | Their newest headline background — a flowing color-band shader. Beats flat gradients by a mile for a "creative tech lab" hero. Full per-value editor (color, speed, frequency, noise, intensity). |
| 5 | **Decrypted Text** | React Bits | copy-paste (TS + Tailwind) | Text that decrypts character-by-character before your eyes. Best "system booting up" / "encrypted transmission decoded" effect — pure tactical-lab energy. Better than Magic UI's Text Animate for the sci-fi use case. |
| 6 | **Bento Grid** | Magic UI | `npx shadcn@latest add @magicui/bento-grid` | The asymmetric feature-card grid popularized by Apple. Pairs naturally with Border Beam + Magic Card to make a "control panel" capabilities section. Production-ready out of the box. |
| 7 | **Number Ticker** | Magic UI | `npx shadcn@latest add @magicui/number-ticker` | Counts up to a target number when scrolled into view. Perfect for "47 deployments · 12 active operators · 99.97% uptime" stats bar. Has decimal places, start value, direction props. |
| 8 | **PullCord** (Verlet rope) | FeralUI | rebuild from source | A cloth cord that physically hangs. Pull it to toggle "Beta Mode." This is **the** most memorable "enter Beta" interaction on the entire web right now. Caveat: no npm package — you'd need to read the source. |
| 9 | **Background Paths** (SVG path drawing) | KokonutUI | `bunx --bun shadcn@latest add @kokonutui/background-paths` | Animated SVG line paths drawn across the hero section using Motion path animations. Builds the "tactical grid being plotted" hero vibe. Cleanest install of all the SVG-path effects. |
| 10 | **Marquee** + **Orbiting Circles** | Magic UI | `npx shadcn@latest add @magicui/marquee` `npx shadcn@latest add @magicui/orbiting-circles` | Marquee = infinite scrolling logos/testimonials. Orbiting Circles = tech-stack icons orbiting a center. Combined: a "trusted by" logo wall + an orbiting "tech stack" diagram. Both are industry-canonical and install in seconds. |

### Honorable mentions (worth adding if scope allows)

- **Dock** (Magic UI) — macOS-style magnifying dock for the Beta sticky bottom nav.
- **Meteors** (Magic UI) — meteor-shower background particles for the hero.
- **Spotlight Card** (React Bits) — card with a cursor-following spotlight.
- **Liquid Glass Card** (KokonutUI) — Apple Liquid Glass effect via SVG displacement filters.
- **Scroll Velocity** text (React Bits) — manifesto text that scrolls based on user scroll velocity.
- **Glow Cursor** (React Bits) — global cursor with a glowing trail.
- **Particles** (Magic UI / React Bits) — particle field background.
- **Ferrofluid** (React Bits) — magnetic-fluid shader (Lava-lamp-on-acid vibe).
- **Hologram** (FeralUI) — foil Pokémon-style card tilt effect.
- **Shine Border** (Magic UI) — animated gradient border for CTAs.

---

## Part 3 — Recommended Integration Approach for Next.js 16 + React 19

### Stack alignment (already verified)

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Already in use at `/home/z/my-project/next.config.ts` |
| **React** | React 19 (strict mode) | Motion v13.1 explicitly improves React 19 strict-mode compat |
| **Styling** | Tailwind CSS v4 | Required by KokonutUI & Magic UI & React Bits |
| **Animation core** | `motion` (motion.dev v13) | The animation engine that Magic UI, KokonutUI, and React Bits all build on. Replace `framer-motion` with `motion/react` everywhere. |
| **Component CLI** | `shadcn` CLI | Single CLI to install components from Magic UI, KokonutUI, and shadcn/ui itself. |
| **Cursor / agent context** | Motion AI Kit + shadcn MCP server | Feeds docs + example sources to Cursor/Claude so the AI agent can write Motion code that passes MotionScore. |
| **Specialty engine** | `animejs` (v4) | Only for SVG path morphing, the Σ logo shape morph, and Verlet-rope physics. Keep it tree-shaken. |
| **Specialty GLSL** | Custom shaders from React Bits (ColorBends, Ferrofluid) | Copy-paste with TS+Tailwind stack — no extra runtime. |

### Install order (do this in sequence)

```bash
# 1. Animation core
bun add motion

# 2. (If migrating from framer-motion) swap imports
# replace: from "framer-motion"
# with:    from "motion/react"

# 3. Initialize shadcn registry namespaces (one-time)
# In components.json, add:
# {
#   "registries": {
#     "@magicui":   "https://magicui.design/r/{name}.json",
#     "@kokonutui": "https://kokonutui.com/r/{name}.json"
#   }
# }

# 4. Install the cn utility (idempotent — already in the project)
bunx --bun shadcn@latest add https://kokonutui.com/r/utils.json

# 5. Install Magic UI components
bunx --bun shadcn@latest add @magicui/animated-beam @magicui/globe @magicui/bento-grid @magicui/magic-card @magicui/border-beam @magicui/number-ticker @magicui/marquee @magicui/orbiting-circles @magicui/dock @magicui/meteors @magicui/shine-border

# 6. Install KokonutUI components
bunx --bun shadcn@latest add @kokonutui/background-paths @kokonutui/particle-button @kokonutui/liquid-glass-card @kokonutui/shimmer-text

# 7. Specialty engine (only if you need SVG morph / Verlet)
bun add animejs

# 8. React Bits — copy-paste only (no CLI)
# For each component: browse to reactbits.dev/component/<name>,
# set stack = TS + Tailwind, copy code into /src/components/reactbits/
# Install any per-component deps (e.g. `bun add gsap` for SplitText)
```

### Folder structure recommendation

```
src/components/
├── ui/                  # shadcn/ui base (already exists)
├── magicui/             # components installed via @magicui/* registry
├── kokonutui/           # components installed via @kokonutui/* registry
├── reactbits/           # copy-pasted from reactbits.dev (TS + Tailwind stack)
├── sigma/
│   ├── beta/            # Beta Mode sections (existing)
│   │   ├── MissionHero.tsx        → uses AnimatedBeam + ColorBends
│   │   ├── CapabilitiesBento.tsx  → uses Bento Grid + Border Beam + Magic Card
│   │   ├── WorkDeployments.tsx    → uses Globe + Number Ticker
│   │   ├── Operators.tsx          → uses Marquee + Orbiting Circles
│   │   ├── BetaInterface.tsx     → uses Dock + Shine Border
│   │   ├── BetaInsights.tsx      → uses Decrypted Text + Scroll Velocity
│   │   ├── MethodInsights.tsx    → uses Background Paths + Meteors
│   │   ├── StartProject.tsx      → uses ClawCaptcha (if reimplemented) or Magic Card
│   │   └── BetaNav.tsx           → uses PullCord-style toggle (if reimplemented)
│   └── ...
└── lib/
    └── motion/          # Motion AI Kit context for Cursor/Claude
```

### Performance guardrails (from Hon Tran's 2026 Awwwards jury notes)

Awwwards 2026 winners all hit three criteria. Apply them to Beta Mode:

1. **Art direction** — A single point of view. Every type choice, color, layout grid serves the "tactical lab" idea. Static frames should still look intentional. **Audit:** Take a screenshot of every section. Does it still look like Taungoo Sigma Lab if you remove all the animation?
2. **Directed motion** — Choreography, not animation-for-its-own-sake. Use `useScroll` to pace the story. Use `AnimatePresence` for section transitions. Use `stagger(0.04)` to reveal list items in sequence. **Rule:** No component animates just because it can. Every motion carries narrative meaning.
3. **Performance at 60fps** — Run MotionScore (`motion.dev/score`) on every page. Target S or A grade. Test on a mid-range Android (Chrome). Lazy-load shader-heavy backgrounds (ColorBends, Ferrofluid) with `LazyMotion`. Use `useReducedMotion` everywhere — already implemented at `src/hooks/use-reduced-motion.ts`.

### MCP / AI agent setup (for Cursor / Claude Code workflows)

1. **Install the shadcn MCP server** in Cursor → enables "add @magicui/globe" via natural language.
2. **Activate Motion AI Kit** (Motion+ subscription) → sends 430+ Motion example sources + performance audits to your agent so it writes Motion code that passes MotionScore.
3. **Add KokonutUI's llms.txt** (referenced on their homepage) → your agent gets a machine-readable registry of all 100+ components.

This trio gives you Luke Carter's "AI builds it, taste directs it" workflow at studio quality.

---

## Part 4 — Placeholders the User Needs to Provide

These components need user-supplied assets before they'll render correctly in Beta Mode:

| Asset type | Used by | Required specs | Prompt to give the user |
|---|---|---|---|
| **Hero background video / image sequence** | Hero section (MissionHero) backing ColorBends or Meteors | 1920×1080 WebM (VP9) or MP4 (H.264), ≤ 4 MB, 8-12s loop, alpha channel optional | *"Record a 10-second loop of: a dark tactical lab with subtle scanning light passing over a desk of monitors, or generate with Kling/Seedance using the prompt: 'cinematic tactical operations center, dark, slow dolly-in, volumetric light, 4K, moody'. Color grade to match #0a0a0a background with #00ff9c accent."* |
| **Project / case-study images** | WorkDeployments bento grid + Spotlight Cards | 1200×800 WebP, dark mode, branded | *"For each of the 6 featured projects (Crystal Wallets, Futurist Dash, Neural Forge Genesis, AI DeFi Navigator, Aura Forge, Lumina Tarot), supply a 1200×800 hero shot. Use GPT Image or Midjourney with: 'product screenshot, dark UI, neon green accents, holographic data overlays, sci-fi UI'. If real screenshots exist, use those."* |
| **Globe location pins / deployment coordinates** | Magic UI `Globe` component | Array of `{lat, lng, label}` objects | *"Give me a JSON array of 8-12 lat/long coordinates for our deployment locations (Singapore, Tokyo, Bangkok, Yangon, Dubai, SF, London, Berlin). Include a short label for each (city + 2-letter country code). I'll feed this to the Globe config."* |
| **Operator / team headshots** | Operators section Marquee + Orbiting Circles | 400×400 PNG with transparent background | *"For each of the 6-8 operators/team members, supply a 400×400 PNG headshot on transparent background. Style: high-contrast B&W, single light source, slight desaturation. If you can't shoot, use GPT Image: 'professional headshot, dark background, dramatic side lighting, monochrome, sci-fi operator portrait'."* |
| **Tech-stack logos (SVG)** | Orbiting Circles component | 128×128 SVG, single-color (white or accent) | *"Give me SVG logos for our tech stack: Next.js, React, TypeScript, Tailwind, Motion, Prisma, PostgreSQL, Vercel. Each as a monochrome 128×128 SVG (white on transparent). I'll orbit them around the Beta brand mark."* |
| **Client / partner logos (SVG)** | Marquee logo wall | 240×80 SVG, grayscale | *"Give me grayscale SVG logos for 8-12 client/partner brands. If you don't have 12 real ones, generate placeholder SVGs with the brand name in a neutral mono font."* |
| **PullCord asset** (if reimplementing from FeralUI) | Beta Mode toggle | 60×600px PNG cord texture OR generate via SVG | *"I need a vertical 'tactical pull-cord' graphic, 60px wide × 600px tall, that looks like a paracord or military pull-switch cord. Dark with subtle highlight. If you can't supply, I'll generate procedurally with SVG + Verlet physics."* |
| **Audio cues** (optional, for sound design) | Boot/transition SFX | MP3, ≤ 100 KB, 0.5-2s | *"Give me 3 short sci-fi SFX: (1) a 'system boot' hum (1.5s), (2) a 'data transmission' beep (0.5s), (3) a 'section enter' whoosh (0.8s). Already have insert-coin.mp3, smash-bonus.mp3, next-faiz-henshin.mp3, chidori.mp3, burning-steel.mp3 in /public/sounds — repurpose those if no new assets."* |
| **Σ brand mark (SVG)** | Orbiting Circles center, magic-card spotlight target | 256×256 SVG, single-color | *"Confirm the final Σ logo SVG. Should be a single-color (white or #00ff9c) vector, 256×256, on transparent background. This sits at the center of the orbit and is the cursor-spotlight target on the hero card."* |
| **WebGL/Shader preview assets** | ColorBends, Ferrofluid, Liquid Ether | None (code-only) | *"No asset needed — these are pure GLSL shaders. Just confirm the color palette: primary accent #00ff9c (cyber-green), secondary #ff0050 (alarm-red), tertiary #00bfff (info-cyan). I'll feed these as uniforms."* |

---

## Part 5 — Concise Summary

### What was researched
- **2 YouTube videos** resolved via YouTube oEmbed (page_reader is blocked by YouTube).
- **7 live component-library sites** fully fetched + parsed: motionsites.ai, motion.dev, kokonutui.com, animejs.com, reactbits.dev, magicui.design, feralui.dev.
- **Supplementary searches**: Awwwards 2025/2026 + Webby 2026 motion winners + motion.dev vs GSAP + anime vs GSAP.

### The two YouTube videos are about

1. **Luke Carter (BraveBrand) — "I Built 6 Websites in 14 Minutes With GPT-5.6 Sol"** — *"AI has democratized website building so much that almost every sales page now looks and sounds exactly the same."* Thesis: build unique sites with AI, not generic AI pages. Stop paying Framer/Webflow subscriptions.
2. **Viktor Oddy (Design Rocket) — "I Built $10000 Website With Free AI Tools In 10 Minutes"** — Uses Cursor + Claude (Fable 5) + GPT Image / Midjourney (hero images) + Kling / Seedance (video). Thesis: *"Taste is the differentiator."* AI does the work, taste directs it.

### The libraries (one-line summary)

- **motion.dev** — *the* React animation library (formerly Framer Motion), MIT, v13.1.0, 30M+ downloads/mo, hybrid JS+WAAPI engine. Use `motion/react`. Replaces `framer-motion`.
- **kokonutui.com** — 100+ React+Tailwind+Motion components by Dorian Baffier. Install via `bunx --bun shadcn@latest add @kokonutui/<name>`. Works with shadcn MCP server + Cursor + Claude Code.
- **animejs.com** — v4.5.0, framework-agnostic vanilla JS animation engine. MIT. Better than GSAP for SVG morph + Draggable + blend-composition (all free, no paid plugins like GSAP). No native React adapter — use via useRef/useEffect.
- **reactbits.dev** — 170+ animated React components, 46.4k GitHub stars. Copy-paste install (no CLI). Choose TS+Tailwind stack. 4 categories: Backgrounds / Text Animations / Animations / Components. Themes: Nebula, Aurora, Ember, Ice.
- **magicui.design** — 150+ React+TS+Tailwind+Motion components, 22.1k stars. Install via `npx shadcn@latest add @magicui/<name>`. Inspired by Linear.app and shadcn/ui. MCP server + Magic UI Pro (paid).
- **feralui.dev** — v0.1.1, 12 playful physics-driven components (PullCord, ClawCaptcha, Hologram, Fur, Crumple). By Sarthak Navalekar. **No install method yet** — it's a showcase portfolio, not a production library. Must rebuild from source.
- **motionsites.ai** — NOT a component library. It's a marketplace of **AI website prompts** to paste into Lovable/Bolt/Cursor/Claude. Use it for prompt seeds, not components.

### The 10 most impressive components (recap)

1. **Animated Beam** (Magic UI) — integration diagram
2. **Globe** (Magic UI) — WebGL deployment map
3. **Border Beam + Magic Card** (Magic UI) — sci-fi HUD cards
4. **ColorBends** (React Bits) — flowing color-band shader hero
5. **Decrypted Text** (React Bits) — encrypted-text reveal
6. **Bento Grid** (Magic UI) — asymmetric feature grid
7. **Number Ticker** (Magic UI) — count-up stats
8. **PullCord** (FeralUI) — pull-the-cord-to-enter-Beta interaction
9. **Background Paths** (KokonutUI) — SVG path-drawing hero
10. **Marquee + Orbiting Circles** (Magic UI) — logo wall + tech-stack orbit

### Next actions for the user

1. **Approve the install plan** in Part 3 (one-time setup: `motion` + shadcn registries for `@magicui` and `@kokonutui`).
2. **Provide the 9 placeholder assets** listed in Part 4 (especially globe coordinates, project images, and the Σ logo SVG).
3. **Decide on FeralUI components** — PullCord and ClawCaptcha are *the* most distinctive interactions but require rebuilding from source since no npm package exists. Choose: (a) skip them, (b) rebuild manually with motion + animejs Verlet, or (c) wait for the author to publish.
4. **Run MotionScore on the current site** at `motion.dev/score` to baseline before redesign.
5. **Migrate `framer-motion` imports → `motion/react`** across the existing Beta components if any remain.
