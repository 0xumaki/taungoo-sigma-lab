// LOOP-3-AGENTIC-SEO: server component that wraps the client ServiceDetailView
// and exports `generateMetadata` so each /services/[slug] route gets unique
// title + description + OG/Twitter overrides + a per-route Service JSON-LD
// blob (provider, offers with priceRange from the service's starter package).
// The actual page rendering (basket, currency toggle, add-ons, comparison
// table) lives in ./view.tsx as a "use client" component — it uses useParams()
// + useState + usePageReveal, none of which can run server-side.

import type { Metadata } from "next";
import { SERVICES, type ServiceDetail } from "./services-data";
import { ServiceDetailView } from "./view";

const SITE_URL = "https://taungoo-sigma-lab.vercel.app";

type Params = Promise<{ slug: string }>;

/** Per-slug metadata: title template applies "%s · TAUNGOO Σ Lab" from layout. */
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service does not exist.",
      robots: { index: false, follow: false },
    };
  }
  const description = service.tagline || service.description;
  // Use the international USD starter price as the visible priceRange (more
  // useful to a global audience than MMK; aligns with the priceRange schema.org
  // spec which expects a free-form string).
  const starter = service.packages.find((p) => p.name === "STARTER");
  const priceRange = starter
    ? starter.intlPrice && starter.intlPrice !== "custom"
      ? `${starter.intlPrice}+`
      : "Custom"
    : "Custom";

  return {
    title: service.name,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — Taungoo Sigma Lab`,
      description,
      type: "website",
      url: `${SITE_URL}/services/${service.slug}`,
      siteName: "Taungoo Sigma Lab",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} — Taungoo Sigma Lab`,
      description,
    },
    other: {
      "product:price": priceRange,
      "product:price:currency": "USD",
    },
  };
}

/** Build the schema.org Service JSON-LD blob for a given service. */
function buildServiceJsonLd(service: ServiceDetail) {
  const starter = service.packages.find((p) => p.name === "STARTER");
  const priceRange = starter
    ? starter.intlPrice && starter.intlPrice !== "custom"
      ? `${starter.intlPrice}+`
      : "Custom pricing"
    : "Custom pricing";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.name,
    description: service.tagline || service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    image: `${SITE_URL}/sections/s03.png`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: service.name,
    areaServed: "Global",
    offers: service.packages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      price: pkg.intlPrice === "custom" ? undefined : (pkg.intlPrice?.replace(/[$,]/g, "") ?? pkg.price),
      priceCurrency: pkg.intlPrice && pkg.intlPrice !== "custom" ? "USD" : undefined,
      description: pkg.features.join(". "),
      priceSpecification:
        pkg.intlPrice && pkg.intlPrice !== "custom"
          ? {
              "@type": "PriceSpecification",
              price: pkg.intlPrice.replace(/[$,]/g, ""),
              priceCurrency: "USD",
            }
          : undefined,
    })),
    priceRange,
  };
}

export default async function ServiceDetailRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  return (
    <>
      {/* LOOP-3-AGENTIC-SEO: per-route JSON-LD Service blob — server-rendered
          so AI crawlers see it in the initial HTML payload. Provider references
          the Organization entity declared in src/app/layout.tsx via @id. */}
      {service && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceJsonLd(service)) }}
        />
      )}
      <ServiceDetailView />
    </>
  );
}
