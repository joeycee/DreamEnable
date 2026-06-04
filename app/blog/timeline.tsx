"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { stripHtml } from "@/lib/utils";
import { BlogPost } from "@/types/api";

type Props = { posts: BlogPost[] };

function formatTimestamp(dateStr?: string | null) {
  if (!dateStr) return { full: "—", year: "——", month: "———", day: "——" };
  const d = new Date(dateStr);
  return {
    full: d.toLocaleDateString("en-NZ", { year: "numeric", month: "long", day: "numeric" }),
    year: d.getFullYear().toString(),
    month: d.toLocaleDateString("en-NZ", { month: "short" }).toUpperCase(),
    day: d.getDate().toString().padStart(2, "0"),
  };
}

function getIndex(i: number) {
  return (i + 1).toString().padStart(3, "0");
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function TimelineEntry({ post, index }: { post: BlogPost; index: number }) {
  const { ref, visible } = useReveal();
  const ts = formatTimestamp(post.published_at ?? post.created_at);
  const excerpt = stripHtml(post.excerpt ?? "");

  return (
    <div
      ref={ref}
      className="tml-entry"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
      }}
    >
      <div className="tml-node-wrap">
        <div className="tml-node-ring" />
        <div className="tml-node-dot" />
      </div>

      <div className="tml-date">
        <span className="tml-date-day">{ts.day}</span>
        <span className="tml-date-month">{ts.month}</span>
        <span className="tml-date-year">{ts.year}</span>
      </div>

      <Link href={`/blog/${post.slug}`} className="tml-card">
        <div className="tml-card-inner">
          <div className="tml-card-top">
            <span className="tml-index">#{getIndex(index)}</span>
            <span className="tml-tag">Article</span>
          </div>

          <h2 className="tml-title">{post.title}</h2>

          {excerpt ? <p className="tml-excerpt">{excerpt}</p> : null}

          <div className="tml-footer">
            <span className="tml-cta">
              Read article
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6h8M6.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="tml-full-date">{ts.full}</span>
          </div>
        </div>

        <div className="tml-scan" aria-hidden />
      </Link>
    </div>
  );
}

export function BlogTimeline({ posts }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{css}</style>

      <section className="tml-root">
        <div className="tml-bg-grid" aria-hidden />

        <div className="tml-wrap">
          <div ref={headerRef} className="tml-header">
            <div className="tml-header-meta">
              <span className="tml-header-label">Dream Journal</span>
              <span className="tml-header-count">
                {posts.length.toString().padStart(2, "0")} essays
              </span>
            </div>
            <h1 className="tml-header-title">Blog</h1>
            <p className="tml-header-desc">
              Thoughts on web design, positioning, and building a digital presence with a little
              more clarity and atmosphere.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="tml-track">
              <div className="tml-line" aria-hidden>
                <div className="tml-line-glow" />
              </div>

              {posts.map((post, i) => (
                <TimelineEntry key={post.id} post={post} index={i} />
              ))}

              <div className="tml-end" aria-hidden>
                <div className="tml-end-dot" />
                <span className="tml-end-label">More notes soon</span>
              </div>
            </div>
          ) : (
            <div className="tml-empty">
              <div className="tml-empty-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="26"
                    height="26"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M9 14h10M9 10h6M9 18h4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="tml-empty-text">No journal entries yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const css = `
  .tml-root {
    position: relative;
    min-height: 100vh;
    padding: 5rem 0 8rem;
    background:
      radial-gradient(circle at top left, rgba(46, 127, 176, 0.12), transparent 28%),
      radial-gradient(circle at 85% 12%, rgba(209, 121, 66, 0.12), transparent 22%),
      linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(247,250,251,0.96) 22%, #f7fafb 100%);
    color: var(--color-ink, #1a2e3b);
    overflow: hidden;
  }
  .tml-bg-grid {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7), transparent 12%),
      radial-gradient(circle at 80% 16%, rgba(255,255,255,0.5), transparent 10%),
      linear-gradient(rgba(255,255,255,0.35), rgba(255,255,255,0.35));
    opacity: 0.55;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.3));
    pointer-events: none;
  }
  .tml-wrap {
    position: relative;
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .tml-header {
    margin-bottom: 4.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(122,154,173,0.2);
  }
  .tml-header-meta {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.25rem;
  }
  .tml-header-label {
    font-family: var(--font-sans);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-accent);
    padding: 0.4rem 0.8rem;
    border: 1px solid rgba(46,127,176,0.18);
    border-radius: 999px;
    background: rgba(255,255,255,0.72);
    box-shadow: 0 12px 30px rgba(46,127,176,0.08);
  }
  .tml-header-count {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(74, 96, 112, 0.7);
  }
  .tml-header-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 0.98;
    color: var(--color-ink);
    margin: 0 0 1rem;
    text-wrap: balance;
  }
  .tml-header-desc {
    font-family: var(--font-sans);
    font-size: 1.025rem;
    line-height: 1.8;
    color: rgba(74, 96, 112, 0.9);
    max-width: 38rem;
    margin: 0;
  }

  .tml-track {
    position: relative;
    padding-left: 7rem;
  }
  @media (max-width: 600px) { .tml-track { padding-left: 2.5rem; } }

  .tml-line {
    position: absolute;
    left: 3.6rem;
    top: 0.5rem;
    bottom: 2rem;
    width: 1px;
    background: linear-gradient(to bottom, rgba(46,127,176,0.08), rgba(122,154,173,0.24), rgba(209,121,66,0.12));
  }
  @media (max-width: 600px) { .tml-line { left: 0.7rem; } }
  .tml-line-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0) 75%);
    animation: tml-drip 6s ease-in-out infinite;
  }
  @keyframes tml-drip {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    80% { opacity: 0.6; }
    100% { transform: translateY(200%); opacity: 0; }
  }

  .tml-entry {
    position: relative;
    margin-bottom: 2.5rem;
  }
  .tml-node-wrap {
    position: absolute;
    left: -3.85rem;
    top: 1.4rem;
    width: 10px;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 600px) { .tml-node-wrap { left: -0.95rem; } }
  .tml-node-ring {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(46,127,176,0.18);
    background: rgba(255,255,255,0.72);
    box-shadow: 0 10px 24px rgba(46,127,176,0.08);
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  }
  .tml-node-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d17942 0%, #2e7fb0 100%);
    box-shadow: 0 0 0 5px rgba(255,255,255,0.75);
    flex-shrink: 0;
    transition: box-shadow 0.25s;
  }
  .tml-entry:hover .tml-node-ring {
    border-color: rgba(46,127,176,0.38);
    transform: scale(1.18);
    box-shadow: 0 16px 34px rgba(46,127,176,0.12);
  }
  .tml-entry:hover .tml-node-dot { box-shadow: 0 0 0 7px rgba(255,255,255,0.9); }

  .tml-date {
    display: none;
    position: absolute;
    left: -7rem;
    top: 1rem;
    width: 2.6rem;
    text-align: right;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.05rem;
  }
  @media (min-width: 601px) { .tml-date { display: flex; } }
  .tml-date-day { font-family: var(--font-display); font-size: 1.55rem; font-weight: 600; color: rgba(26,46,59,0.86); line-height: 1; }
  .tml-date-month { font-family: var(--font-sans); font-size: 0.6rem; font-weight: 600; letter-spacing: 0.22em; color: var(--color-accent); line-height: 1.2; }
  .tml-date-year { font-family: var(--font-sans); font-size: 0.62rem; color: rgba(74,96,112,0.62); letter-spacing: 0.08em; line-height: 1.2; }

  .tml-card {
    position: relative;
    display: block;
    text-decoration: none;
    border: 1px solid rgba(46,127,176,0.1);
    border-radius: 1.75rem;
    background: linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(242,247,250,0.92) 100%);
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(33, 74, 97, 0.08);
    transition: border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
  }
  .tml-card:hover {
    border-color: rgba(46,127,176,0.22);
    background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,249,252,0.96) 100%);
    transform: translateX(4px) translateY(-2px);
    box-shadow: 0 28px 70px rgba(33, 74, 97, 0.12);
  }
  .tml-card-inner { padding: 1.5rem 1.75rem; position: relative; z-index: 1; }

  .tml-card-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem; }
  .tml-index {
    font-family: var(--font-sans);
    font-size: 0.65rem;
    font-weight: 500;
    color: rgba(74,96,112,0.52);
    letter-spacing: 0.14em;
  }
  .tml-tag {
    font-family: var(--font-sans);
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-accent);
    padding: 0.28rem 0.65rem;
    border: 1px solid rgba(46,127,176,0.16);
    border-radius: 999px;
    background: rgba(46,127,176,0.08);
  }
  .tml-title {
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--color-ink);
    margin: 0 0 0.65rem;
    line-height: 1.3;
    transition: color 0.2s;
    text-wrap: balance;
  }
  .tml-card:hover .tml-title { color: #183142; }
  .tml-excerpt {
    font-family: var(--font-sans);
    font-size: 0.96rem;
    line-height: 1.8;
    color: rgba(74, 96, 112, 0.88);
    margin: 0 0 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tml-footer { display: flex; align-items: center; justify-content: space-between; }
  .tml-cta {
    font-family: var(--font-sans);
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--color-accent);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    letter-spacing: 0.04em;
    transition: gap 0.2s;
  }
  .tml-card:hover .tml-cta { gap: 0.65rem; }
  .tml-full-date {
    font-family: var(--font-sans);
    font-size: 0.72rem;
    color: rgba(74,96,112,0.6);
    letter-spacing: 0.04em;
  }
  @media (min-width: 601px) { .tml-full-date { display: none; } }

  .tml-scan {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 15%, rgba(255,255,255,0.6) 45%, transparent 72%);
    transform: translateX(-100%);
    pointer-events: none;
  }
  .tml-card:hover .tml-scan {
    transform: translateX(100%);
    transition: transform 0.9s ease;
  }

  .tml-end { display: flex; align-items: center; gap: 1rem; padding-top: 0.5rem; }
  .tml-end-dot {
    position: absolute;
    left: -3.9rem;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(46,127,176,0.16);
  }
  @media (max-width: 600px) { .tml-end-dot { left: -1rem; } }
  .tml-end-label {
    font-family: var(--font-sans);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(74,96,112,0.46);
  }

  .tml-empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 3rem 0;
    color: rgba(74,96,112,0.38);
  }
  .tml-empty-text {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    letter-spacing: 0.08em;
  }
`;
