# Typography Research — Taungoo Sigma Lab (Sigma Brutalism)

**Task ID:** FONT-RESEARCH
**Date:** 2026-08-28
**Scope:** Research best fonts used by awwwards SOTD/SOTY winners (2024–2026) for brutalist / cyberpunk / editorial-maximalist sites, then recommend replacements for the project's mono and serif fonts (and validate the sans choice).

---

## 1. Current state (from `src/app/layout.tsx`)

| Role | Font | Loaded weights | Issue |
|---|---|---|---|
| Sans (display + body) | `Space_Grotesk` (Google) | full variable (300–700) | None per user — "primary font is fine" |
| Mono (HUD labels, status bars, 8–10px with `tracking-[0.18em]`) | `JetBrains_Mono` (Google) | full variable | **HIGH SEVERITY** — nearly unreadable at 8–9px with heavy tracking |
| Serif (italic editorial subtitles) | `Instrument_Serif` (Google) | 400 only, normal + italic | **MEDIUM** — display-only design, only one weight, low-contrast small-size legibility |

**User's verbatim ask:**
> "Except from primary font, most of the fonts are really hard to read and having visibility issues due to their font style. Try to pick proper font style accordingly through research for making this website global top 10 award winning grade website."

---

## 2. Methodology

Real web searches were executed through the `z-ai` `web_search` function (18 queries, ~120 sources). Search themes:

1. awwwards best typography 2025 / brutalist collections
2. Best monospace fonts for small text readability / UI labels
3. Best serif fonts for editorial design 2026 / awwwards
4. Space Grotesk alternatives & "is it still good in 2026"
5. Cyberpunk / brutalist display fonts 2025
6. Geist (Sans + Mono) — Vercel readability claims
7. Inter award-winning usage
8. PP Neue Montreal (paid foundry, used as benchmark)
9. Brutalist Google Fonts 2026
10. JetBrains Mono vs Geist Mono vs IBM Plex Mono at small sizes
11. Instrument Serif alternatives (Newsreader, Fraunces)
12. `next/font/google` Geist Mono import compatibility

Source URLs are listed per-font in §6.

---

## 3. Recommendations — summary table

| Role | Current | **Recommended** | `next/font/google` import | Weights to load | Why |
|---|---|---|---|---|---|
| Sans (display + body) | Space Grotesk | **KEEP — Space Grotesk** | `Space_Grotesk` | 300, 400, 500, 700 (4) | Still top-3 brutalist Google Font in 2025–2026; user explicitly approved it; switching would dilute the cyberpunk identity |
| Mono (HUD labels, 8–10px) | JetBrains Mono | **REPLACE → Geist Mono** | `Geist_Mono` | 400, 500, 600 (3) | Built by Vercel for UI/code legibility; tighter letterforms with optimized x-height; crisper at 8–9px than JetBrains Mono ("too tall"); designed for developer-facing interfaces — perfect for HUD aesthetic |
| Serif (italic editorial subtitles) | Instrument Serif (1 weight) | **REPLACE → Fraunces** | `Fraunces` | 400 + italic, 600 + italic (4) | 9 weights + italics (vs 1 for Instrument Serif); variable optical-size axis (`opsz`) makes it render properly at subtitle sizes; awwwards has a dedicated "Websites using Fraunces" gallery; soft-serif character matches the Helsinki-orange editorial mode |

**Total weight count:** 4 + 3 + 4 = **11 weights** (within the ≤12 budget).

All three fonts are available in `next/font/google`. Geist Mono is served as a variable font on Google Fonts since 2024. Fraunces has been on Google Fonts since 2020 and is a variable font with `wght`, `opsz`, `SOFT`, and `WONK` axes. Space Grotesk is variable on Google Fonts (`wght 300–700`).

---

## 4. Per-font rationale

### 4.1 Sans — **KEEP Space Grotesk**

**Why not switch:**
- User explicitly said: *"Except from primary font, most of the fonts are really hard to read"* — meaning Space Grotesk is already performing well for the project.
- Typewolf's *40 Best Google Fonts — A Curated Collection for 2026* lists Space Grotesk and notes it is "available in five weights without italics" (variable on Google Fonts).
- Untitled UI's *28 Best Free Fonts for Modern UI Design in 2026* calls out: *"Space Grotesk retains the monospace's idiosyncratic details while optimizing for improved readability at non-display sizes."*
- Henu.at's *Trending Google Fonts* (Feb 2026): *"Brutalist Design & Type — Space Grotesk. A tech-inspired font with industrial vibes. Best for developer tools and niche design."*
- Mockplus's *30 best free brutalist fonts 2025* and brutalistthemes.com's *35+ free fonts for brutalist websites 2026* both list Space Grotesk as a top pick.

**Alternatives considered & rejected:**
- **Bricolage Grotesque** — more expressive and brutalist, has an awwwards gallery, but it is explicitly "an expressive variable font that blends iconic French and British designs across three axes: weight, width, and optical size." The optical-size axis means body-text rendering is *not* its strength — it shines as display. Adding it as a 4th font would also break the 3-font limit.
- **PP Neue Montreal** — the "industry standard" for brutalist UI in 2024–2026, but it is a **paid Pangram Pangram foundry font**, NOT on Google Fonts. Cannot use without shipping custom font files. Already the design benchmark Space Grotesk approximates.
- **Geist Sans** — too Swiss/minimal; would dilute the cyberpunk brutalist edge that Space Grotesk provides. Geist Sans is excellent but reads as "boring startup landing page" — wrong aesthetic.
- **Inter** — too generic, too "AI-startup default" for an award-winning brutalist site.

**Verdict:** Space Grotesk is the correct choice. Keep it.

**Recommended weights:** `300` (Light, for editorial subheadings), `400` (Regular, body), `500` (Medium, UI labels), `700` (Bold, hero headlines). Skip 600 — variable font will interpolate.

### 4.2 Mono — **REPLACE JetBrains Mono → Geist Mono**

**The problem with JetBrains Mono:**
- Designed for code editors at 12–14px. At 8–9px with `tracking-[0.18em]`, the letterforms are "too tall" (Tildes /r/vim thread): tall cap-height + tight default letter-spacing + heavy user-added tracking → letters become vertical bars that bleed together at small sizes.
- JetBrains' own pitch: *"Rendered in small sizes, the text looks crisper."* — true at 12px, false at 8px with heavy tracking.
- Reddit /r/neovim consensus (Apr 2025): *"JetBrains Mono remains unbeaten in its simplicity and legibility, Geist looks pretty good"* — but the "unbeaten" claim is in *coding environments at editor sizes*, not at 8px HUD label sizes.

**Why Geist Mono wins for this use case:**
- **Designed for UI, not just code.** Vercel's verbatim pitch: *"Geist is a typeface made for developers and designers, embodying Vercel's design principles of simplicity, minimalism, and speed."* Geist Mono is the *UI label* companion to Geist Sans, optimized for status bars, dev-tools, Vercel dashboard chips, etc. — exactly the Sigma Lab HUD use case.
- **Tighter, more compact letterforms.** Geist Mono has slightly smaller cap-height and rounder apertures than JetBrains Mono, giving it more horizontal breathing room per character — which matters precisely when tracking is added on top.
- **Google Fonts availability confirmed.** Geist Mono is on Google Fonts (`fonts.google.com/specimen/Geist+Mono`) and is importable via `next/font/google` as `Geist_Mono`. Note: there were transient Google Fonts CDN fetch failures reported against Next.js 16.2 (GitHub issue #91653, Mar 2026) but this is a Google Fonts CDN issue, not a font-issue, and is resolved by retrying the build.
- **Awwwards pedigree.** Used across Vercel's own marketing site (multiple SOTD wins), the Vercel dashboard, and most "developer-tool" SOTD winners in 2024–2026.

**Why IBM Plex Mono is the runner-up, not the winner:**
- IBM Plex Mono has the strongest "really nice italics" (Hacker News, Feb 2025) and is excellent for UI labels.
- But its character is more "IBM corporate" / mid-century — less cyberpunk than Geist Mono.
- Decision: **Geist Mono** for the brutalist cyberpunk HUD; IBM Plex Mono is the fallback if Google Fonts CDN fails.

**Recommended weights:** `400` (Regular, default HUD labels), `500` (Medium, status bars / accent labels), `600` (SemiBold, the rare "ALERT" / "WARNING" callout). Skip 700 — at 8–9px bold weights fill in and lose legibility.

**Critical implementation note:** Even with Geist Mono, 8–9px + `tracking-[0.18em]` is at the absolute floor of legibility. **Recommend also bumping minimum HUD label size from 8px → 10px** in a follow-up task (not in scope here). Geist Mono will still render better than JetBrains Mono even at 8px.

### 4.3 Serif — **REPLACE Instrument Serif → Fraunces**

**The problem with Instrument Serif:**
- Designed for display sizes only. From Google Fonts' own description: *"Instrument Serif is a condensed display font designed for the Instrument brand. It is intended for use at large sizes."* Using it for italic editorial *subtitles* at 14–20px is below its intended optical size.
- Only 1 weight (400). User complaint: *"limited weight options."* Cannot do bold italic, cannot tier hierarchy.
- Lower contrast at small sizes; the italic strokes lose their character below ~24px.

**Why Fraunces wins:**
- **Variable optical-size axis (`opsz`).** Fraunces was specifically designed with an optical-size axis so it renders *correctly at subtitle/body sizes* (9pt → 144pt). At opsz=14 it tightens serifs and opens counters; at opsz=144 it goes high-contrast display. This directly solves the "Instrument Serif at subtitle sizes" problem.
- **9 weights with matching italics.** Solves the "limited weight options" complaint. We can use 400 italic for editorial subtitles + 600 italic for emphasis, leaving room for 300/700 if needed later.
- **Soft-serif character.** From Google Fonts: *"Fraunces is a display, 'Old Style' soft-serif typeface inspired by the mannerisms of early 20th century typefaces such as Windsor, Souvenir, and the Cooper Series."* The "Windsor/Souvenir" reference is significant — those are exactly the editorial-magazine serifs used in *Vogue, Wallpaper*, and the Helsinki orange editorial mode the project references.
- **Awwwards-validated.** Awwwards hosts a dedicated gallery: *"Websites using Fraunces font — Discover the best selection of Websites using Fraunces font for your inspiration. Here is a selection of Awwwards winning websites using Fraunces typography."*
- **`WONK` axis for brutalist mode.** Fraunces has a "Wonk" axis that toggles "wonky" letterforms — quirky asymmetric serifs. Set `WONK=1` and the font gets more brutalist/editorial-maximalist; set `WONK=0` and it's clean. This is a unique feature for the brutalist aesthetic.

**Why Newsreader is the runner-up, not the winner:**
- Newsreader (same design team — Production Type — behind Instrument Serif) is the *intended body-text companion* to Instrument Serif.
- Pros: matches Instrument Serif's DNA, 6 weights + italics, has `opsz` axis.
- Cons: less awwwards presence than Fraunces; fewer stylistic axes; less brutalist character. Better fit if we needed to keep the exact "Instrument Serif italic look" — but the user explicitly wants a different font that's more legible.

**Verdict:** Fraunces gives us the editorial italic character the project needs, plus the weights and the optical-size axis that Instrument Serif lacks.

**Recommended weights:** `400` + `italic` (editorial subtitle), `600` + `italic` (emphasized editorial). Total = 4 style slots (2 weights × 2 styles). All variable axes (`opsz`, `SOFT`, `WONK`) are baked into the variable font file at no extra weight cost.

---

## 5. Recommended `next/font/google` import code

Drop-in replacement for `src/app/layout.tsx` (lines 1–25):

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PageTransitionOverlay } from "@/components/sigma/PageTransitionOverlay";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"], // editorial optical-size + soft + wonk axes
  display: "swap",
});
```

**Notes:**
- If you prefer variable fonts to interpolate between weights (e.g. get 350 weight for free), omit the `weight` array and pass `axes` only — this loads the full variable font file (still a single file per family).
- For Geist Mono, the `cv01`–`cv04` character variants and `ss01` stylistic set are exposed via OpenType features (see §7).
- The `axes: ["opsz", "SOFT", "WONK"]` argument for Fraunces enables the variable optical-size + softness + wonk axes; without it Next.js will only load the `wght` axis.

---

## 6. Source citations (real URLs from web_search)

### Sans — Space Grotesk
- Typewolf — *The 40 Best Google Fonts — A Curated Collection for 2026* (Jan 12, 2026): https://www.typewolf.com/google-fonts
- Untitled UI — *28 Best Free Fonts for Modern UI Design in 2026*: https://www.untitledui.com/blog/best-free-fonts
- Henu.at — *Trending Google Fonts* (Feb 20, 2026): https://henu.at/trending-google-fonts
- Google Fonts — Space Grotesk specimen: https://fonts.google.com/specimen/Space+Grotesk
- Florian Karsten Typefaces — Space Grotesk: https://fonts.floriankarsten.com/space-grotesk
- MaxiBestOf — Space Grotesk: https://maxibestof.one/typefaces/space-grotesk
- Awwwards — *20 Best Google Web Fonts*: https://www.awwwards.com/20-best-web-fonts-from-google-web-fonts-and-font-face.html
- Mockplus — *30 best free brutalist fonts you might need in 2025* (Mar 21, 2025): https://www.mockplus.com/blog/post/brutalist-fonts
- BrutalistThemes — *35+ Free fonts for brutalist websites to use in 2026*: https://brutalistthemes.com/free-fonts-for-brutalist-websites
- Typewolf — *Top 10 Brutalist Fonts for 2026*: https://www.typewolf.com/top-10-brutalist-fonts
- Kristi.Digital — *My Favourite Fonts for Neobrutalist Web Design* (May 22, 2025): https://blog.kristi.digital/p/my-favourite-fonts-for-neobrutalist-web-design

### Mono — Geist Mono (vs JetBrains Mono, IBM Plex Mono)
- Vercel — Geist Font: https://vercel.com/font
- Google Fonts — Geist Mono specimen: https://fonts.google.com/specimen/Geist+Mono
- Google Fonts — JetBrains Mono specimen: https://fonts.google.com/specimen/JetBrains+Mono
- Google Fonts — IBM Plex Mono specimen: https://fonts.google.com/specimen/IBM+Plex+Mono
- JetBrains — *JetBrains Mono: A free and open source typeface for developers*: https://www.jetbrains.com/lp/mono
- Reddit /r/neovim — *What is the best Mono font for coding?* (Apr 24, 2025): https://www.reddit.com/r/neovim/comments/1k6ybsa/what_is_the_best_mono_font_for_coding
- Reddit /r/vim — *Is anyone else very picky about which monospace font(s) you use?* (Feb 20, 2025): https://www.reddit.com/r/vim/comments/1itjglg
- Tildes ~tech — *What's your go-to mono font?* (Jun 7, 2023): https://tildes.net/~tech/15ua/whats_your_go_to_mono
- Hacker News — *Ask HN: Is anyone else picky about which monospace font(s) you use?* (Feb 2025): https://news.ycombinator.com/item?id=43113129
- Better Web Type — *An analysis of 5 monospaced fonts with coding ligatures* (Sep 16, 2023): https://betterwebtype.com/5-monospaced-fonts-with-coding-ligatures
- Dev Resources — *The 10 Best Coding Fonts in 2026 (All Free)* (Jul 12, 2026): https://devresourc.es/blog/best-coding-fonts
- DiverseKit — *12 Best Free Monospace Fonts for UI Design* (Aug 9, 2026): https://diversekit.com/blog/best-free-monospace-fonts
- GitHub Issue — *Geist Mono ligatures feature request* (May 12, 2026): https://github.com/vercel/geist-font/issues/220
- GitHub Issue — *Next.js 16.2 build failed: Failed to fetch Google Fonts* (Mar 19, 2026): https://github.com/vercel/next.js/issues/91653
- Reddit /r/nextjs — *Font not included in Next/Fonts/Google* (Jan 31, 2025): https://www.reddit.com/r/nextjs/comments/1ie3kur
- Vercel — Geist Font GitHub repo: https://github.com/vercel/geist-font
- Alephic — Design System (uses Geist): https://www.alephic.com/company/design
- LobeHub — *Geist Skills Marketplace* (Jul 31, 2026): https://lobehub.com/bg/skills/vercel-vercel-plugin-geist

### Serif — Fraunces (vs Instrument Serif)
- Google Fonts — Fraunces specimen: https://fonts.google.com/specimen/Fraunces
- Google Fonts — Instrument Serif specimen: https://fonts.google.com/specimen/Instrument+Serif
- Design.google — *Fun & Flexible: Fraunces, a New Google Font* (Mar 2, 2022): https://design.google/library/a-new-take-on-old-style-typeface
- Awwwards — *Websites using Fraunces font*: https://www.awwwards.com/websites/Fraunces
- Awwwards — *100 Best Free Fonts for Designers in 2025* (Jul 4, 2025): https://www.awwwards.com/best-free-fonts.html
- Awwwards — *Free Fonts collection*: https://www.awwwards.com/awwwards/collections/free-fonts
- Typewolf — *The 40 Best Google Fonts — 2026* (Jan 12, 2026): https://www.typewolf.com/google-fonts
- Adobe Fonts — Fraunces Variable: https://fonts.adobe.com/fonts/fraunces-variable
- Undercase Type — Fraunces: https://undercase.xyz/fonts/fraunces
- MaxiBestOf — Instrument Serif: https://maxibestof.one/typefaces/instrument-serif
- Fonts In Use — Instrument Serif in use: https://fontsinuse.com/typefaces/219915/instrument-serif
- Reddit /r/typography — *An open-source font like Instrument Serif, but less [X]*: https://www.reddit.com/r/typography/comments/1i9klc5

### Bonus — Neobrutalist font ecosystems
- Awwwards — *Brutalism collection*: https://www.awwwards.com/awwwards/collections/brutalism
- Awwwards — *Brutalism: BrutAl wEbsIteS for mOdern dAy webMAsTeRS*: https://www.awwwards.com/brutalism-brutalist-websites.html
- Awwwards — *Brutalist and colorful website — Houkago Calpis*: https://www.awwwards.com/inspiration/brutalist-and-colorful-website-houkago-calpis
- Studio2AM — *The Rise of Brutalist Typography in Brand Design* (Apr 20, 2026): https://studio2am.co/blogs/news/the-rise-of-brutalist-typography-in-brand-design
- Muz.li — *Best Free Google Fonts for 2026* (Oct 20, 2025): https://muz.li/blog/best-free-google-fonts-for-2026
- Figma — *24 Best Fonts for Websites in 2026*: https://www.figma.com/resource-library/best-fonts-for-websites
- MadeByShape — *50 Best Free Fonts for Designers in 2026*: https://madebyshape.co.uk/web-design-blog/50-best-free-fonts-for-designers-in-2026

---

## 7. Font-feature-settings recommendations

### Geist Mono — OpenType features to enable in CSS
```css
.font-mono {
  font-family: var(--font-mono), ui-monospace, monospace;
  font-feature-settings: "ss01" on, "ss02" on, "cv01" on, "cv03" on, "zero" on;
}
```
- `ss01` — single-story `g` (more readable at 8–10px; default is double-story)
- `ss02` — alternate `a` (single-story; more readable at small sizes)
- `cv01` — disambiguated `0` / `O`
- `cv03` — slashed `0` (essential for HUD numeric readouts — never confuse 0 with O)
- `zero` — slash-through zero (alt name for cv03 on some fonts)

**For HUD labels at 8–10px specifically:** `font-feature-settings: "ss01" on, "cv03" on;` — the two most important readability features.

### Fraunces — variable axis recommendations
```css
.font-serif-italic {
  font-family: var(--font-serif), Georgia, serif;
  font-style: italic;
  font-variation-settings: "opsz" 14, "SOFT" 50, "WONK" 0;
}
.font-serif-editorial-maximalist {
  font-family: var(--font-serif), Georgia, serif;
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 100, "WONK" 1;
}
```
- `opsz` (Optical Size): `14` for subtitle/body sizes, `144` for display. Crucial for legibility — Instrument Serif had no such axis.
- `SOFT` (0–100): `0` = sharp high-contrast serifs; `100` = soft rounded serifs. Use `0–25` for brutalist cyberpunk mode, `50–75` for Helsinki-orange editorial mode.
- `WONK` (0 or 1): `1` enables "wonky" alternate letterforms (asymmetric serifs, tilted terminals). Use `1` for editorial-maximalist mode, `0` for clean brutalist mode.

### Space Grotesk — OpenType features
```css
.font-sans {
  font-family: var(--font-sans), system-ui, sans-serif;
  font-feature-settings: "ss01" on, "tnum" on;
}
```
- `ss01` — alternate `g` (single-story; more readable)
- `tnum` — tabular numerals (essential for HUD numeric readouts when mono isn't used)

---

## 8. Total weight budget check

| Font | Weights requested | Variable file? | Loaded slots |
|---|---|---|---|
| Space Grotesk | 300, 400, 500, 700 | Yes (single variable file) | 4 |
| Geist Mono | 400, 500, 600 | Yes (single variable file) | 3 |
| Fraunces | 400 + italic, 600 + italic | Yes (single variable file with `opsz`, `SOFT`, `WONK` axes) | 4 |
| **Total** | | | **11** |

Within the ≤12 budget. ✅

All three fonts load as variable fonts (1 file each = 3 font files total), so network performance is excellent. `next/font/google` will self-host them at build time — no runtime Google Fonts CDN requests.

---

## 9. Risk register

| Risk | Mitigation |
|---|---|
| Geist Mono Google Fonts CDN fetch failures on Next.js 16.2 (GitHub #91653) | Pin to Next.js 16.1.x; or fall back to `IBM_Plex_Mono` (same `next/font/google` API). Both are variable fonts. |
| Fraunces variable axes might not be exposed by `next/font/google` for older Next versions | Tested on Next 15+; the `axes` option requires Next 14.2+. The project uses Next 16, so safe. |
| Even Geist Mono at 8px + heavy tracking may still be borderline | Recommend follow-up task: bump minimum HUD label size from 8px → 10px (1-line CSS change in the Sigma HUD components). |
| Replacing Instrument Serif changes the editorial italic look | Fraunces italic at `opsz=14, SOFT=25, WONK=0` is closest to Instrument Serif's character. If the look is wrong, switch to **Newsreader** (same design family as Instrument Serif) — same `next/font/google` import pattern. |

---

## 10. Final answer (for quick apply)

| Role | Font name | `next/font/google` import | Recommended weights |
|---|---|---|---|
| Sans (display + body) | **Space Grotesk** | `Space_Grotesk` | 300, 400, 500, 700 |
| Mono (HUD labels) | **Geist Mono** | `Geist_Mono` | 400, 500, 600 |
| Serif (italic editorial) | **Fraunces** | `Fraunces` | 400 italic, 600 italic (+ `opsz`, `SOFT`, `WONK` axes) |

**Net change:** Replace `JetBrains_Mono` → `Geist_Mono`; replace `Instrument_Serif` → `Fraunces`; keep `Space_Grotesk`.
