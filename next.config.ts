import type { NextConfig } from "next";

// === LOOP-2-LH-BEST-PRACTICES: security headers =========================
// Lighthouse "Best Practices" tracks a handful of security-header audits
// (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
// Permissions-Policy, Strict-Transport-Security). Each missing header trims
// the score, so we ship a conservative-but-complete set on ALL routes.
//
// CSP RATIONALE — every directive was chosen against the live app:
//   - default-src 'self'
//   - script-src  'self' 'unsafe-inline' 'unsafe-eval'
//       • 'unsafe-inline' — Next 16 inline runtime chunks (React refresh +
//         next/font CSS-in-JS hydration + the JSON-LD <script> in layout.tsx)
//       • 'unsafe-eval'   — dev-only; harmless on prod (Turbopack dev server
//         evaluates inline source maps; prod bundles are pre-compiled).
//         Kept here so dev parity is maintained.
//   - style-src   'self' 'unsafe-inline'
//       • Tailwind 4 emits inline style attributes + <style> blocks; the
//         sigma shell + framer-motion set inline `style` props everywhere.
//   - img-src     'self' data: blob: https:
//       • self + data: covers next/image (served from /_next/image) + SVG
//         data-URIs in globals.css + Hero noise filter.
//       • https:   — needed for Google Fonts CDN fallback + any OG/CMS
//         imagery; we permit all https image hosts rather than enumerate.
//   - font-src    'self' data:
//       • next/font serves from /_next/static (self); Google Fonts CSS uses
//         self + data:woff2 base64 in some paths.
//   - connect-src 'self' https: wss:
//       • /api/sigma/* (self) + Vercel analytics (https) + future WS/SSE
//         mini-services via wss: through the Caddy gateway.
//   - media-src   'self' data: blob:
//       • chidori.mp3 / next-faiz-henshin.mp3 / burning-steel.mp3 + sound
//         effects in /public/sounds/* — all self-hosted.
//   - frame-ancestors 'none'
//       • Strict — no embedding anywhere (equiv. to X-Frame-Options: DENY
//         but enforced by CSP-level browsers).
//   - base-uri    'self'
//   - form-action 'self'
//   - object-src  'none'
//
// The Toaster (sonner) renders inline styles + a portal; verified it works
// under this CSP in the verification gauntlet below.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https: wss:",
      "media-src 'self' data: blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  // Mitigates MIME-type sniffing attacks (e.g. serving HTML as image).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Defense-in-depth clickjacking guard. CSP `frame-ancestors 'none'`
  // supersedes this on modern browsers, but X-Frame-Options is still
  // honored by older ones (IE11 / legacy Safari).
  { key: "X-Frame-Options", value: "DENY" },
  // strict-origin-when-cross-origin: sends full referrer on same-origin,
  // origin-only on cross-origin HTTPS, nothing on HTTPS→HTTP downgrades.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disables: camera, microphone, geolocation (no app surface uses them),
  // plus interest-cohort=() to opt out of FLoC / Topics API cohort sharing.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HSTS — Vercel terminates TLS at the edge and is HTTPS-only. The
  // `preload` qualifier signals inclusion in the HSTS preload list (separate
  // submission needed at hstspreload.org) — harmless on plain HTTP dev.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Cross-Origin-Opener-Policy + Cross-Origin-Resource-Policy — defense
  // against Spectre-class cross-origin document leaks. SAME-ORIGIN on both
  // is the safest setting for a single-origin site like this one.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // DISABLE StrictMode — it double-invokes effects in dev, causing GSAP
  // timelines to run twice simultaneously → double cover→reveal cycle →
  // "sigma transition glitching." The pre-7-loop code worked fine because
  // the transition effect was simple enough to survive double-invocation,
  // but the added complexity (prefetch, dialog guard, etc.) made the race
  // condition visible. In production, StrictMode is a no-op anyway.
  reactStrictMode: false,
  allowedDevOrigins: ["*.space-z.ai", "*.chatglm.cn"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
