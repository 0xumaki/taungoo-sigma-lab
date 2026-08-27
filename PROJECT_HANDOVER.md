# TAUNGOO SIGMA LAB — COMPLETE PROJECT HANDOVER

## Repository
- **GitHub:** https://github.com/0xumaki/taungoo-sigma-lab
- **Local:** /home/z/my-project

## Quick Start
```bash
bun install
bun run db:push
bun run dev
# Open http://localhost:3000
```

## If Dev Server Crashes (OOM)
```bash
cd /home/z/my-project
pkill -f "next dev" 2>/dev/null
rm -rf .next/cache
NODE_OPTIONS="--max-old-space-size=768" bun run dev > dev.log 2>&1 &
```

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- GSAP 3.15 (animations)
- Recharts (data visualizations)
- Zustand (state management)
- Prisma ORM (SQLite)
- Web Audio API (sound engine)

## Project Architecture

### Dual Mode System
- **Sigma Mode (Σ):** Map-based 11-sector navigation, no scrolling, GSAP slam-cover transitions
- **Alpha Mode (Α):** Traditional scrolling website with all sections

### Key Files
| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Entry point → ExperienceShell |
| `src/components/sigma/ExperienceShell.tsx` | Main orchestrator (both modes) |
| `src/components/sigma/SigmaMap.tsx` | Sigma mode nexus map (11 sectors) |
| `src/components/sigma/alpha/AlphaInterface.tsx` | Alpha mode scrolling container |
| `src/lib/sigma/store.ts` | Zustand store (view, phase, navigation) |
| `src/lib/sigma/sections.ts` | 11 sector definitions + metadata |
| `src/lib/sigma/sound.ts` | Web Audio API sound engine + SFX auto-enable |
| `src/lib/sigma/basket.ts` | Basket store + discount tiers (0/7/10/20%) |
| `src/lib/sigma/addons-data.ts` | 189 add-ons across 27 services |
| `src/lib/sigma/manifesto.ts` | 1800-word manifesto text |
| `src/lib/sigma/projects-data.json` | 10 portfolio projects |
| `src/lib/sigma/use-card-reveal.ts` | Scroll-triggered card animation hook |
| `src/lib/sigma/page-transition.ts` | Page transition Zustand store |
| `src/lib/sigma/use-page-reveal.ts` | Hook for detail page reveal |

### Sigma Mode Sections (lazy-loaded)
| File | Section |
|------|---------|
| S01Initializing.tsx | Boot kernel + live boot log |
| S02Manifesto.tsx | Mission + manifesto background text |
| S03CoreSystems.tsx | 6 market verticals (AI, Web3, Full-Stack, Design, Multimedia, Infra) |
| S04Projects.tsx | 10 project vault cards + popup dialog |
| S05Collective.tsx | 8 team members with real names + dossiers |
| S06Research.tsx | 17 research log entries + popup |
| S07DataStreams.tsx | Live charts (area, bar, radar, pie, radial) + system load |
| S08Capabilities.tsx | 6 hardware cards with 3D flip animation |
| S09Alliances.tsx | Partner network |
| S10Access.tsx | Contact form with key-binding disabled when typing |
| S11Status.tsx | 11 sector status + maximalist branding panel |

### Alpha Mode Sections
| File | Section |
|------|---------|
| AlphaHero.tsx | Full-screen hero card with integrated nav |
| AlphaAbout.tsx | Mission card + stats + capability bars |
| AlphaServices.tsx | 27 service cards with category filters |
| AlphaPortfolio.tsx | 10 portfolio cards (award-winning design) |
| AlphaProcess.tsx | 4-phase process + stats sidebar |
| AlphaTeam.tsx | 8 team members with real names |
| AlphaTech.tsx | 6 tech categories (Zai, Kimi, GPT-5.6, etc.) |
| AlphaTestimonials.tsx | Testimonial cards |
| AlphaInsights.tsx | Research blog popup modal |
| AlphaContact.tsx | Sci-fi terminal contact form |
| AlphaFooter.tsx | Footer with API endpoints |

### Shared Components
| File | Purpose |
|------|---------|
| SigmaBrand.tsx | TAUNGOO Σ LAB wordmark (gradient sweep + Σ pulse) |
| SigmaModeSwitcher.tsx | Σ/Α toggle with Chidori soundtrack |
| SigmaCursor.tsx | Cursor reticle + X/Y readout (follows ring) |
| SigmaHud.tsx | Top/bottom/side HUD bars |
| SigmaBoot.tsx | Boot screen animation (2.6s) |
| SigmaKonami.tsx | Konami code → Faiz Henshin transformation |
| SigmaCelebration.tsx | 11/11 sectors achievement animation |
| SigmaCompletion.tsx | Progress tracker (bottom-left) |
| PageTransitionOverlay.tsx | GSAP slam-cover transition for detail pages |
| PageTransitionLink.tsx | Link wrapper that triggers transitions |
| ServiceBasket.tsx | Basket UI + add-ons + RFQ |
| components.tsx | Panel, BrutalButton, Tag, StatReadout, Crosshair |

### Detail Pages
| File | Purpose |
|------|---------|
| `src/app/services/[slug]/page.tsx` | 27 service detail pages with packages |
| `src/app/portfolio/[slug]/page.tsx` | 10 portfolio case studies |
| `src/app/insights/[slug]/page.tsx` | Research blog detail pages |

### API Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/api/sigma/telemetry` | Live data for S07 charts |
| `/api/sigma/transmit` | Contact form + basket RFQ |
| `/api/sigma/health` | Health check |
| `/api/sigma/version` | Version info |
| `/api/sigma/badge` | Status badge |
| `/api/sigma/metrics` | Metrics |
| `/api/sigma/changelog` | Changelog |
| `/api/sigma/sse` | Server-Sent Events stream |

### Service Package Logic
- **AI/ML (7 services):** Quality tiers (single-model → multi-model → full RAG/ASOP)
- **Full-Stack (6 services):** Quality tiers (MVP → Production → Enterprise)
- **Design/Content (5 services):** Quantity (20/30/custom) + Quality (3D/UI-UX)
- **Web3 (6 services):** Quality via chain support (single → multi → omnichain)
- **Security (3 services):** Quantity + Quality equally (1/3/custom)
- **NFT Systems:** 3,000 images starter, quality tiers, more = add-on
- **NO "unlimited" anywhere** — Enterprise = "negotiate with us"

### Basket System
- Floating basket button (service detail pages only)
- Add main services (STARTER/PRO/ENTERPRISE packages individually)
- Add compatible services (other main services)
- Add add-ons (189 researched add-ons)
- Bulk discount: 1=0%, 2=7%, 3+=10%, 5+=20%
- RFQ submission (not purchase — payment happens off-platform)

### Key Features
1. Boot screen on every reload
2. SFX auto-enabled on first interaction
3. Chidori soundtrack on Σ→Α mode switch
4. Konami code → Faiz Henshin (11-phase animation + soundtrack)
5. GSAP slam-cover page transitions with service/project names
6. 3D flip cards in S08 Capabilities
7. Live data charts in S07 (6 chart types)
8. Infinite manifesto text in S02 (now static, loop removed)
9. Cursor reticle with X/Y coordinates
10. 11-sector achievement celebration
11. Keyboard navigation (M, arrows, 0-9, ⌘K, T, C, H, L, Konami)
12. Tour mode, MC mode (matrix rain)
13. Dark/light theme toggle
14. Page transition overlay with names (not numbers)

### Design System
- **Colors:** #FF4500 (orange/primary), #00FF94 (lime), #00E5FF (cyan), #C6FF00 (yellow), #FF2D7E (pink), #FFB300 (amber)
- **Fonts:** Space Grotesk (sans), JetBrains Mono (mono), Instrument Serif (serif)
- **CSS Classes:** sigma-glitch, sigma-pulse, sigma-spin-slow, sigma-scanlines, sigma-grid, sigma-hazard-orange, sigma-brand__text
- **Clip-paths:** Cut-corner brutalist design throughout
- **Performance:** will-change hints, content-visibility: auto, contain: layout, GPU layers

### Performance Optimizations Applied
1. Lazy-loaded all 11 Sigma sections (dynamic imports)
2. content-visibility: auto on Alpha sections
3. will-change on animated elements
4. React.memo on SigmaBrand
5. Reduced barcode DOM nodes (48→24)
6. Tour interval 500ms→1000ms
7. NODE_OPTIONS memory limit (768MB)
8. .keepalive.sh for auto-restart
9. .next/cache clearing on restart

### Important Notes
- Founded: 2016, Yangon, MM (not 2024, not Bago)
- Taungoo = medieval empire reference, not current town
- All GitHub links are [REDACTED] covers (repo not published)
- All Enterprise packages say "negotiate with us" (no "unlimited")
- S04 popup: sm:max-w-6xl + maxHeight 90vh
- S06 popup: sm:max-w-4xl + maxHeight 90vh
- Close buttons repositioned with [&_[data-slot=dialog-close]] Tailwind selectors
- Key bindings disabled when typing in inputs
- Boot screen shows on every reload (sessionStorage check removed)
- Manifesto loop removed (static text now)
- S03 title restored to "CORE SYSTEMS" (not "MARKETS")
- S02 copy: "A research lab in Taungoo" (original restored)
- Faiz Henshin song: /public/next-faiz-henshin.mp3
- Chidori song: /public/chidori.mp3

### Cron Job
- Job #338235 runs every 15 minutes (webDevReview)
- Performs QA via agent-browser + continues development

### Files NOT in Git (excluded)
- node_modules/ (1.2GB — run `bun install`)
- .next/ (build cache — regenerated on run)
- .git/ (version history)

### For New Chat Continuation
To continue development in a new Z.ai chat:
1. The repo is at: https://github.com/0xumaki/taungoo-sigma-lab
2. Clone it: `git clone https://github.com/0xumaki/taungoo-sigma-lab.git`
3. Run: `bun install && bun run dev`
4. Read `worklog.md` for full development history (3000+ lines)
5. Read `PROJECT_HANDOVER.md` (this file) for architecture overview
6. Read `research-findings.md` for Awwwards design research
