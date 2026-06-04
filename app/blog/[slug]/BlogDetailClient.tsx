"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { BlogPost } from "@/types/api";

type Props = {
  post: BlogPost;
  imageUrl: string | null;
  publishedDate: string | null;
};

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;

    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);

    return () => clearTimeout(t);
  }, [delay]);

  return ref;
}

function Block({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const ref = useFadeIn(delay);
  return <div ref={ref} className={className}>{children}</div>;
}

export function BlogDetailClient({ post, imageUrl, publishedDate }: Props) {
  return (
    <>
      <style>{css}</style>

      <article className="bdp-root">
        <div className="bdp-bg-grid" aria-hidden />

        <div className="bdp-wrap">
          <Block delay={0} className="bdp-back-wrap">
            <Link href="/blog" className="bdp-back">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M9 2L4 7L9 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to journal
            </Link>
          </Block>

          <Block delay={80} className="bdp-meta-row">
            <span className="bdp-eyebrow">Dream Journal</span>
          </Block>

          <Block delay={140}>
            <h1 className="bdp-title">{post.title}</h1>
          </Block>

          <Block delay={200} className="bdp-sub-row">
            {publishedDate ? (
              <div className="bdp-datestamp">
                <span className="bdp-datestamp-label">Published</span>
                <span className="bdp-datestamp-value">{publishedDate}</span>
              </div>
            ) : null}
            {post.excerpt ? <p className="bdp-excerpt">{post.excerpt}</p> : null}
          </Block>

          <Block delay={260} className="bdp-divider-wrap">
            <div className="bdp-divider">
              <div className="bdp-divider-glow" aria-hidden />
            </div>
          </Block>

          {imageUrl ? (
            <Block delay={300} className="bdp-image-wrap">
              <div className="bdp-image-inner">
                <img alt={post.title} src={imageUrl} className="bdp-image" />
                <div className="bdp-image-overlay" aria-hidden />
              </div>
            </Block>
          ) : null}

          <Block delay={360} className="bdp-content-wrap">
            <div className="bdp-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </Block>

          <Block delay={400} className="bdp-footer">
            <div className="bdp-footer-line" aria-hidden />
            <div className="bdp-footer-inner">
              <span className="bdp-footer-label">Thanks for reading</span>
              <Link href="/blog" className="bdp-footer-back">
                Back to journal
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M2 6h8M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </Block>
        </div>
      </article>
    </>
  );
}

const css = `
  .bdp-root {
    position: relative;
    min-height: 100vh;
    padding: 5rem 0 8rem;
    background:
      radial-gradient(circle at 14% 10%, rgba(46, 127, 176, 0.14), transparent 24%),
      radial-gradient(circle at 88% 14%, rgba(209, 121, 66, 0.12), transparent 18%),
      linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(247,250,251,0.96) 22%, #f7fafb 100%);
    color: var(--color-ink, #1a2e3b);
    overflow: hidden;
  }
  .bdp-bg-grid {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 15% 18%, rgba(255,255,255,0.78), transparent 11%),
      radial-gradient(circle at 78% 10%, rgba(255,255,255,0.58), transparent 9%);
    opacity: 0.75;
    pointer-events: none;
  }
  .bdp-wrap {
    position: relative;
    max-width: 48rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .bdp-back-wrap { margin-bottom: 3rem; }
  .bdp-back {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: var(--font-sans);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: rgba(74,96,112,0.76);
    text-decoration: none;
    transition: color 0.2s, gap 0.2s;
  }
  .bdp-back:hover { color: var(--color-accent); gap: 0.25rem; }
  .bdp-back svg { flex-shrink: 0; }

  .bdp-meta-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }
  .bdp-eyebrow {
    font-family: var(--font-sans);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-accent);
    padding: 0.4rem 0.8rem;
    border: 1px solid rgba(46,127,176,0.16);
    border-radius: 999px;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 12px 30px rgba(46,127,176,0.08);
  }

  .bdp-title {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5vw, 4.2rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--color-ink);
    margin: 0 0 2rem;
    text-wrap: balance;
  }

  .bdp-sub-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2.5rem;
    align-items: start;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 560px) { .bdp-sub-row { grid-template-columns: 1fr; gap: 1rem; } }

  .bdp-datestamp {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-top: 0.2rem;
    min-width: 7rem;
  }
  .bdp-datestamp-label {
    font-family: var(--font-sans);
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-accent);
    line-height: 1;
  }
  .bdp-datestamp-value {
    font-family: var(--font-sans);
    font-size: 0.84rem;
    color: rgba(74,96,112,0.72);
    line-height: 1.4;
  }

  .bdp-excerpt {
    font-family: var(--font-sans);
    font-size: 1.05rem;
    line-height: 1.9;
    color: rgba(74,96,112,0.88);
    margin: 0;
    border-left: 2px solid rgba(46,127,176,0.18);
    padding-left: 1.35rem;
  }

  .bdp-divider-wrap { margin-bottom: 2.5rem; }
  .bdp-divider {
    position: relative;
    height: 1px;
    background: rgba(122,154,173,0.22);
    overflow: hidden;
  }
  .bdp-divider-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), rgba(46,127,176,0.7), rgba(255,255,255,0.2), transparent);
    animation: bdp-sweep 4.5s ease-in-out infinite;
  }
  @keyframes bdp-sweep {
    0% { transform: translateX(-100%); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 0.6; }
    100% { transform: translateX(100%); opacity: 0; }
  }

  .bdp-image-wrap { margin-bottom: 3.5rem; }
  .bdp-image-inner {
    position: relative;
    overflow: hidden;
    border-radius: 2rem;
    border: 1px solid rgba(46,127,176,0.1);
    aspect-ratio: 16/9;
    background: rgba(255,255,255,0.72);
    box-shadow: 0 26px 70px rgba(33, 74, 97, 0.12);
  }
  .bdp-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }
  .bdp-image-inner:hover .bdp-image { transform: scale(1.02); }
  .bdp-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(247,250,251,0.18));
    pointer-events: none;
  }

  .bdp-content-wrap { margin-bottom: 5rem; }
  .bdp-content {
    font-family: var(--font-display);
    font-size: 1.2rem;
    line-height: 1.95;
    color: rgba(26,46,59,0.9);
  }
  .bdp-content p { margin: 0 0 1.75rem; }
  .bdp-content p:last-child { margin-bottom: 0; }
  .bdp-content h2 {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--color-ink);
    margin: 3rem 0 1.25rem;
  }
  .bdp-content h3 {
    font-family: var(--font-display);
    font-size: 1.45rem;
    font-weight: 600;
    color: var(--color-ink);
    margin: 2.25rem 0 1rem;
  }
  .bdp-content a {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgba(46,127,176,0.35);
    transition: text-decoration-color 0.2s;
  }
  .bdp-content a:hover { text-decoration-color: var(--color-accent); }
  .bdp-content strong { color: var(--color-ink); font-weight: 600; }
  .bdp-content em { font-style: italic; color: rgba(74,96,112,0.72); }
  .bdp-content blockquote {
    border-left: 2px solid rgba(46,127,176,0.3);
    padding: 0.4rem 0 0.4rem 1.5rem;
    margin: 2rem 0;
    color: rgba(74,96,112,0.78);
    font-style: italic;
    background: linear-gradient(90deg, rgba(46,127,176,0.06), transparent 70%);
  }
  .bdp-content code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.85em;
    color: #245f84;
    background: rgba(46,127,176,0.08);
    padding: 0.15em 0.4em;
    border-radius: 999px;
    border: 1px solid rgba(46,127,176,0.12);
  }
  .bdp-content pre {
    background: rgba(255,255,255,0.8);
    border: 1px solid rgba(46,127,176,0.08);
    border-radius: 1.25rem;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
    box-shadow: 0 16px 40px rgba(33, 74, 97, 0.08);
  }
  .bdp-content pre code {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.8125rem;
    color: rgba(26,46,59,0.78);
    border-radius: 0;
  }
  .bdp-content ul, .bdp-content ol {
    padding-left: 1.5rem;
    margin: 0 0 1.75rem;
  }
  .bdp-content li { margin-bottom: 0.5rem; }
  .bdp-content hr {
    border: none;
    border-top: 1px solid rgba(122,154,173,0.22);
    margin: 3rem 0;
  }
  .bdp-content img {
    width: 100%;
    border-radius: 1.25rem;
    border: 1px solid rgba(46,127,176,0.08);
    margin: 2rem 0;
    box-shadow: 0 16px 40px rgba(33, 74, 97, 0.08);
  }

  .bdp-footer-line {
    height: 1px;
    background: rgba(122,154,173,0.22);
    margin-bottom: 1.75rem;
  }
  .bdp-footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bdp-footer-label {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(74,96,112,0.5);
  }
  .bdp-footer-back {
    font-family: var(--font-sans);
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--color-accent);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    letter-spacing: 0.04em;
    transition: gap 0.2s, opacity 0.2s;
  }
  .bdp-footer-back:hover { gap: 0.65rem; opacity: 0.8; }

  @media (max-width: 640px) {
    .bdp-footer-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
`;
