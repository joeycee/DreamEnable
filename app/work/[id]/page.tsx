import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedBlock } from "./animated-block";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getPortfolioProjectById, getPortfolioProjects } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";
import { resolveAssetUrl, splitParagraphs } from "@/lib/utils";

/* ─── types ─── */
type WorkDetailPageProps = {
  params: Promise<{ id: string }>;
};

/* ─── metadata (server) ─── */
export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const project = await getPortfolioProjectById(id);
    if (!project) return { title: "Work" };
    const image = resolveAssetUrl(project.featured_image);

    return {
      title: project.title,
      description: project.short_description,
      alternates: {
        canonical: absoluteUrl(`/work/${project.slug}`),
      },
      openGraph: {
        type: "article",
        url: absoluteUrl(`/work/${project.slug}`),
        title: `${project.title} | DreamEnable`,
        description: project.short_description,
        modifiedTime: project.updated_at,
        images: image ? [{ url: image, alt: project.title }] : undefined,
      },
      twitter: {
        card: image ? "summary_large_image" : "summary",
        title: `${project.title} | DreamEnable`,
        description: project.short_description,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    return { title: "Work" };
  }
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects().catch(() => []);

  return projects.map((project) => ({ id: project.slug }));
}

/* ─── page ─── */
export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const project = await getPortfolioProjectById(id);
  if (!project) notFound();

  const imageUrl = resolveAssetUrl(project.featured_image);
  const paragraphs = splitParagraphs(project.full_description);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.short_description,
            url: absoluteUrl(`/work/${project.slug}`),
            image: imageUrl ?? undefined,
            creator: {
              "@type": "Organization",
              name: "DreamEnable",
            },
            dateModified: project.updated_at,
          }),
        }}
      />
      {/* inject styles once */}
      <style>{css}</style>

      <article className="wdp-root">
        <Container className="wdp-container">

          {/* ── back link ── */}
          <AnimatedBlock delay={0} className="wdp-back-wrap">
            <Link className="wdp-back" href="/work">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to work
            </Link>
          </AnimatedBlock>

          {/* ── eyebrow + title ── */}
          <AnimatedBlock delay={80} className="wdp-header">
            <p className="wdp-eyebrow">
              {project.featured ? "Featured project" : "Project"}
            </p>
            <h1 className="wdp-title">{project.title}</h1>
            <p className="wdp-subtitle">{project.short_description}</p>
          </AnimatedBlock>

          {/* ── cta buttons ── */}
          <AnimatedBlock delay={160} className="wdp-actions">
            {project.project_url && (
              <Button href={project.project_url} className="wdp-btn wdp-btn--primary">
                Visit project
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                  <path d="M2 11L11 2M11 2H5M11 2V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            )}
            {project.github_url && (
              <Button href={project.github_url} variant="secondary" className="wdp-btn wdp-btn--secondary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View GitHub
              </Button>
            )}
          </AnimatedBlock>

          {/* ── hero image ── */}
          {imageUrl && (
            <AnimatedBlock delay={240} className="wdp-image-wrap">
              <div className="wdp-image-inner">
                <img alt={project.title} className="wdp-image" src={imageUrl} />
                <div className="wdp-image-overlay" aria-hidden />
              </div>
              {project.featured && (
                <span className="wdp-featured-badge">Featured</span>
              )}
            </AnimatedBlock>
          )}

          {/* ── body ── */}
          <div className="wdp-body">
            <AnimatedBlock delay={320} className="wdp-prose">
              {paragraphs.map((p, i) => (
                <p key={i} className="wdp-paragraph">{p}</p>
              ))}
            </AnimatedBlock>
          </div>
        </Container>
      </article>
    </>
  );
}

/* ─── scoped CSS ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .wdp-root {
    padding: 5rem 0 6rem;
    font-family: 'DM Sans', sans-serif;
    background: var(--color-background, #fafaf8);
    min-height: 100vh;
  }

  .wdp-container {
    max-width: 68rem !important;
  }

  /* back */
  .wdp-back-wrap { margin-bottom: 3rem; }
  .wdp-back {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--color-muted, #888);
    text-decoration: none;
    transition: color 0.2s, gap 0.2s;
  }
  .wdp-back:hover { color: var(--color-ink, #111); gap: 0.25rem; }
  .wdp-back svg { flex-shrink: 0; }

  /* header */
  .wdp-header { margin-bottom: 2.5rem; }
  .wdp-eyebrow {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-accent, #4f6ef7);
    margin: 0 0 1.1rem;
  }
  .wdp-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: var(--color-ink, #111);
    margin: 0 0 1.25rem;
    max-width: 38rem;
  }
  .wdp-subtitle {
    font-size: 1.0625rem;
    font-weight: 300;
    line-height: 1.75;
    color: var(--color-muted, #666);
    margin: 0;
    max-width: 36rem;
  }

  /* actions */
  .wdp-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 3rem;
  }
  .wdp-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.45rem !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    border-radius: 0.5rem !important;
    padding: 0.65rem 1.2rem !important;
    transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s !important;
  }
  .wdp-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
  .wdp-btn:active { transform: translateY(0); }

  /* image */
  .wdp-image-wrap {
    position: relative;
    margin-bottom: 4rem;
    max-width: 56rem;
    margin-inline: auto;
  }
  .wdp-image-inner {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.25rem;
    border: 1px solid var(--color-line, #e8e8e4);
    background: var(--color-surface, #f3f3f0);
    min-height: 20rem;
    max-height: min(70vh, 40rem);
    padding: clamp(0.75rem, 2vw, 1.25rem);
  }
  .wdp-image {
    width: 100%;
    height: auto;
    max-height: calc(min(70vh, 40rem) - clamp(1.5rem, 4vw, 2.5rem));
    object-fit: contain;
    display: block;
    transition: transform 0.6s ease;
  }
  .wdp-image-inner:hover .wdp-image { transform: scale(1.025); }
  .wdp-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.12));
    pointer-events: none;
  }
  .wdp-featured-badge {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(8px);
    color: var(--color-ink, #111);
    padding: 0.35rem 0.85rem;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.6);
  }

  @media (max-width: 640px) {
    .wdp-image-wrap {
      max-width: 100%;
    }
    .wdp-image-inner {
      min-height: 14rem;
      max-height: 24rem;
    }
    .wdp-image {
      max-height: calc(24rem - 1.5rem);
    }
  }

  /* body grid */
  .wdp-body {
    max-width: 46rem;
  }

  /* prose */
  .wdp-prose {}
  .wdp-paragraph {
    font-size: 1.0625rem;
    font-weight: 300;
    line-height: 1.85;
    color: var(--color-ink, #222);
    margin: 0 0 1.5rem;
  }
  .wdp-paragraph:last-child { margin-bottom: 0; }
`;
