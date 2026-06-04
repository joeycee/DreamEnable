import type { Metadata } from "next";

const SITE_NAME = "DreamEnable";
const DEFAULT_TITLE = "DreamEnable — Websites, Apps & AI Tools for NZ Businesses";
const DEFAULT_DESCRIPTION =
  "Bring your startup idea, business website, app, AI tool or MVP to life with practical digital product development.";
const DEFAULT_TWITTER_DESCRIPTION =
  "Practical websites, custom apps, automations and MVPs for founders and small businesses.";
const DEFAULT_OG_IMAGE = "/og-image.png";
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

  return normaliseUrl(configuredUrl || "https://dreamenable.io");
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
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);

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
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_NZ",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "DreamEnable digital product studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: DEFAULT_TWITTER_DESCRIPTION,
      images: [imageUrl],
    },
  };
}

export {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  DEFAULT_TWITTER_DESCRIPTION,
  SITE_NAME,
};
