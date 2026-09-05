// Canonical site origin — ONE source of truth for every absolute URL the app
// emits (metadataBase, openGraph/twitter image URLs, JSON-LD @id + url fields,
// sitemap.xml entries).
//
// WHY THIS FILE EXISTS
// --------------------
// The origin used to be hardcoded as `https://taungoo-sigma-lab.vercel.app`
// in 10 separate files. That hostname was never actually bound to the Vercel
// project — the project's real URLs are per-deployment
// `temporary-*-<hash>.vercel.app` aliases — so every canonical URL, every
// OG/Twitter image URL and every JSON-LD @id pointed at a dead host that does
// not resolve. Duplicating a literal in 10 places also guarantees drift the
// moment the project is renamed or a custom domain is attached.
//
// RESOLUTION ORDER (first non-empty wins)
// ---------------------------------------
//   1. NEXT_PUBLIC_SITE_URL  — explicit override, e.g. "https://example.com".
//                              Set this in Vercel → Project → Settings →
//                              Environment Variables to pin a custom domain.
//                              NEXT_PUBLIC_ so it is also inlined into the
//                              client bundle (keeps SSR + hydration equal).
//   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production domain for
//                              the project (no protocol). Preferred when
//                              VERCEL_ENV === "production".
//   3. VERCEL_URL            — Vercel's per-deployment URL (no protocol).
//                              Used for preview deployments, where the
//                              deployment URL IS the canonical origin.
//   4. http://localhost:3000 — local dev fallback.
//
// NOTE: only NEXT_PUBLIC_* vars reach the browser. Non-public vars are replaced
// with `undefined` in client bundles by Next.js, so `getSiteUrl()` degrades to
// the localhost fallback if imported from a client component. Client code that
// needs the real runtime origin should use `window.location.origin` (or emit
// relative URLs, which is almost always the better choice).

/** Used when nothing else is configured. Local dev only. */
const LOCAL_SITE_URL = "http://localhost:3000";

/**
 * Trim whitespace and trailing slashes so `${SITE_URL}/x` can never produce a
 * double slash (`https://host//x`), which breaks canonical + @id matching.
 * Returns null for empty/non-string input so `??` chaining stays clean.
 */
function normalize(raw: string | undefined | null): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

/**
 * Vercel exposes deployment domains WITHOUT a protocol. Bare hosts like
 * `foo.vercel.app` must become `https://foo.vercel.app`, while loopback hosts
 * must stay `http://` (no TLS on localhost).
 */
function withProtocol(raw: string): string {
  if (/^https?:\/\//i.test(raw)) return raw;
  const host = raw.split(":")[0] ?? "";
  const isLoopback = /^localhost$/i.test(host) || host === "127.0.0.1" || host === "0.0.0.0" || host === "[::1]";
  return `${isLoopback ? "http" : "https"}://${raw}`;
}

/**
 * Resolve the canonical site origin for the CURRENT environment.
 * Deterministic for a given env, so the server render and the client hydration
 * produce identical markup (no hydration mismatch).
 */
export function getSiteUrl(): string {
  // 1. Explicit override (also the only var available on the client).
  const explicit = normalize(process.env.NEXT_PUBLIC_SITE_URL) ?? normalize(process.env.SITE_URL);
  if (explicit) return withProtocol(explicit);

  // 2/3. Vercel-provided domains.
  const vercelProduction = normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  const vercelDeployment = normalize(process.env.VERCEL_URL);
  const isProduction = process.env.VERCEL_ENV === "production";

  const vercel = isProduction
    ? (vercelProduction ?? vercelDeployment)
    : (vercelDeployment ?? vercelProduction);

  if (vercel) return withProtocol(vercel);

  // 4. Local dev.
  return LOCAL_SITE_URL;
}

/**
 * Resolved once at module load. Kept as a `const` export so existing call sites
 * (`const SITE_URL = "https://..."`) drop in with a one-line change and keep
 * reading `SITE_URL` exactly as before.
 */
export const SITE_URL = getSiteUrl();

/** Build an absolute URL from a root-relative path (e.g. `/services/foo`). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
