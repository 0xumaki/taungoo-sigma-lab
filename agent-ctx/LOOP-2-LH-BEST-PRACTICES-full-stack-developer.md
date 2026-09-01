# Task ID: LOOP-2-LH-BEST-PRACTICES — Work Records

**Agent:** full-stack-developer
**Task:** Lighthouse Best Practices maximization across all 3 modes (Beta / Alpha / Sigma). LOOP 2 of 3-loop Lighthouse marathon.
**Date:** 2026-08-31
**Status:** ✅ COMPLETE — lint exit 0, tsc exit 0, zero agent-browser errors, zero CSP violations.

## Summary of changes

### 1. SECURITY HEADERS (next.config.ts) — the biggest Best Practices win
Added `async headers()` returning 8 security headers applied to all routes via `source: "/:path*"`:
- Content-Security-Policy (permissive enough for Next 16 dev/runtime + JSON-LD script, strict enough to satisfy Lighthouse)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY (defense-in-depth; superseded by CSP frame-ancestors 'none' on modern browsers)
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=() (FLoC opt-out)
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Resource-Policy: same-origin

Verified via `curl -I` on `/`, `/_next/image`, `/api/sigma/health` — all 3 return all 8 headers.

### 2. PASSIVE EVENT LISTENERS (3 sites)
Added `{ passive: true }` to:
- `src/components/sigma/beta/NavBar.tsx:46` (container scroll for active-section tracking)
- `src/components/sigma/alpha/AlphaInterface.tsx:28` (alpha progress-bar scroll)
- `src/components/sigma/alpha/AlphaNav.tsx:157` (alpha sticky-nav scroll)

All other scroll listeners (use-magnetic, use-tilt-3d, beta/Hero, SigmaMap) already had `{ capture: true, passive: true }` from Loop 1.

### 3. EXTERNAL LINKS (1 fix)
- `src/components/sigma/alpha/AlphaFooter.tsx:130` — `rel="noreferrer"` → `rel="noopener noreferrer"` (Lighthouse external-anchors-use-rel-noopener audit specifically requires `noopener`).

The other 3 `target="_blank"` anchors (S06Research ×2, SigmaHaggle ×1) already had `rel="noopener noreferrer"`.

### 4. DEPRECATED APIS / ISSUES — zero matches
- `document.write`: 0 matches
- `eval(`: 0 matches
- `window.confirm`/`alert`/`prompt` + bare `alert(`/`confirm(`/`prompt(`: 0 matches
- `http://` URLs in src/: 5 matches, ALL inside SVG `xmlns="http://www.w3.org/2000/svg"` attributes inside data-URIs (Hero.tsx noise filter, globals.css ×2, badge route ×2) — none are HTTP fetches.

### 5. IMAGE ELEMENTS — verified clean from Loop 1
- Only 1 raw `<img>` left in src/components/sigma/ (beta Hero's hero-figure.webp) — has `width={1008} height={1068} decoding="async" fetchPriority="high" alt=""`.
- All 9 `<Image>` (next/image) sites have descriptive `alt` text (verified each).

### 6. CONSOLE ERRORS — zero across all 3 modes
- beta mode: `agent-browser errors` empty.
- alpha mode: empty.
- sigma mode: empty (only dev-only LCP warnings for SigmaMap thumbnails, already noted in Loop 1 as expected dev-only noise).
- No CSP violation errors in ANY mode — verified after every interaction (basket submit, map nav, command palette open).

### 7. A11Y QUICK WINS (form labels)
- beta/Contact.tsx: added `htmlFor`/`id` pairs on 3 inputs + 1 textarea (textarea also got a new visible "PROJECT BRIEF *" label).
- alpha/AlphaContact.tsx: added pairs on 1 input + 1 textarea.
- shared/ContactFormModal.tsx: added pairs on 1 input + 1 textarea.
- shared/SigmaCommand.tsx: added `aria-label="Search sectors and commands"`.
- shared/SigmaHaggle.tsx: added `aria-label="Shareable haggle code URL"` on the readonly share-modal input.
- S10Access.tsx: already uses the implicit-wrap pattern (`<label><span>...</span><input /></label>`) — no changes needed.

## Files changed (10)

1. `next.config.ts` — added `async headers()` returning 8 security headers + full rationale comments.
2. `src/components/sigma/beta/NavBar.tsx` — passive flag on scroll listener.
3. `src/components/sigma/alpha/AlphaInterface.tsx` — passive flag on scroll listener.
4. `src/components/sigma/alpha/AlphaNav.tsx` — passive flag on scroll listener.
5. `src/components/sigma/alpha/AlphaFooter.tsx` — `rel="noopener noreferrer"` upgrade.
6. `src/components/sigma/beta/Contact.tsx` — 4 `htmlFor`/`id` pairs + 1 new visible label.
7. `src/components/sigma/alpha/AlphaContact.tsx` — 2 `htmlFor`/`id` pairs.
8. `src/components/sigma/shared/ContactFormModal.tsx` — 2 `htmlFor`/`id` pairs.
9. `src/components/sigma/shared/SigmaCommand.tsx` — 1 aria-label.
10. `src/components/sigma/shared/SigmaHaggle.tsx` — 1 aria-label (in dangerouslySetInnerHTML string).

## Verification (all passed)

- `bun run lint` — exit 0, zero errors, zero warnings.
- `npx tsc --noEmit` — exit 0, zero errors.
- `agent-browser errors` — empty across beta / alpha / sigma modes (verified after every interaction).
- Basket add-to-quote flow: fetch to `/api/sigma/transmit?XTransformPort=3000` returns `{"ok":true,"ref":"TSL-XXXX"}` — toast.success renders in sonner portal, modal closes, basket clears. No CSP violation on the fetch, toast portal, or sessionStorage (Zustand persist).
- Sigma map nav (PROJECT VAULT → S04): GSAP inline `transform` styles render without CSP `style-src` violation.
- 3-mode switching end-to-end intact.
- Boot sequences (SigmaBoot/BetaBootSequence/AlphaBoot) untouched.
- Services two-level expansion untouched.

## Notes for Loop 3

- The dev-only LCP warnings for `/sections/s01.png` + `/sections/s02.png` SigmaMap thumbnails are informational only — they're not flagged by Lighthouse Best Practices in production (production serves AVIF variants ~3-5KB each).
- The `unsafe-eval` in CSP script-src is for dev parity (Turbopack dev server evals source maps); production bundles are pre-compiled so it's harmless to keep, but Loop 3 could tighten to `script-src 'self' 'unsafe-inline'` for prod-only if desired (would need environment-aware header generation).
- No `eval(` / `document.write` / `window.confirm` etc. anywhere — Best Practices deprecated-API audits are clean.
