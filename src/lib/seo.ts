import type { Metadata } from "next";

const SITE_NAME = "DreamEnable";
const DEFAULT_TITLE = "AI Tools, Web Apps, and Automation for Growing Businesses";
const DEFAULT_DESCRIPTION =
  "DreamEnable is a founder-led digital studio in Auckland building AI tools, custom web apps, automation systems, and SEO-ready websites for businesses across New Zealand and Australia.";
const DEFAULT_KEYWORDS = [
  "DreamEnable",
  "AI automation agency",
  "AI tools for business",
  "automation agency",
  "web development studio",
  "Auckland web developer",
  "New Zealand web app developer",
  "Australia web development",
  "Next.js agency",
  "custom web applications",
  "business automation",
  "business website development",
  "SEO-ready websites",
  "technical SEO",
  "founder-led web studio",
];

function normaliseUrl(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("localhost") || value.startsWith("127.0.0.1")) {
    return `http://${value}`;
  }

  return `https://${value}`;
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  return normaliseUrl(configuredUrl || "http://localhost:3000");
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "en_NZ",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

export { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, DEFAULT_TITLE, SITE_NAME };
