// LOOP-3-AGENTIC-SEO: server component that wraps the client
// PortfolioCaseStudyView and exports `generateMetadata` so each
// /portfolio/[slug] route gets unique title + description + OG/Twitter
// overrides + a per-route CreativeWork JSON-LD blob (author, datePublished,
// keywords from the tech stack). The actual page rendering (image, sci-fi
// cards, contact modal) lives in ./view.tsx as a "use client" component —
// it uses useParams + usePageReveal + useState, none of which run server-side.

import type { Metadata } from "next";
import { PROJECTS, type ProjectDetail } from "./projects-data";
import { PortfolioCaseStudyView } from "./view";

const SITE_URL = "https://taungoo-sigma-lab.vercel.app";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested case study does not exist.",
      robots: { index: false, follow: false },
    };
  }
  const description = project.tagline || project.desc;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: `${project.name} — Taungoo Sigma Lab`,
      description,
      type: "article",
      url: `${SITE_URL}/portfolio/${slug}`,
      siteName: "Taungoo Sigma Lab",
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 750,
              alt: `${project.name} — production screenshot`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Taungoo Sigma Lab`,
      description,
      images: project.image ? [project.image] : undefined,
    },
    keywords: project.tech,
  };
}

function buildCreativeWorkJsonLd(slug: string, project: ProjectDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/portfolio/${slug}#creativework`,
    name: project.name,
    alternateName: project.tagline,
    description: project.desc,
    url: `${SITE_URL}/portfolio/${slug}`,
    image: project.image ? `${SITE_URL}${project.image}` : undefined,
    datePublished: project.created,
    dateModified: project.created,
    keywords: project.tech.join(", "),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: project.category,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en",
  };
}

export default async function PortfolioCaseStudyRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const project = PROJECTS[slug];
  return (
    <>
      {project && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCreativeWorkJsonLd(slug, project)) }}
        />
      )}
      <PortfolioCaseStudyView />
    </>
  );
}
