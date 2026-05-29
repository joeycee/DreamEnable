"use client";

import { useEffect, useState } from "react";

const expertise = [
  {
    label: "Next.js",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg",
  },
  {
    label: "React",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    label: "TypeScript",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    label: "Tailwind CSS",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    label: "Django",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  {
    label: "Python",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    label: "PostgreSQL",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    label: "Docker",
    category: "Infrastructure",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    label: "AWS",
    category: "Infrastructure",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  },
  {
    label: "Flutter",
    category: "Mobile",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    label: "Stripe",
    category: "Payments",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
  },
  {
    label: "Git",
    category: "Tooling",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

const VISIBLE_COUNT = 3;

export function ExpertiseExpandable() {
  const [expanded, setExpanded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [revealCount, setRevealCount] = useState(VISIBLE_COUNT);

  function handleExpand() {
    if (animating) return;
    setAnimating(true);

    // Stagger reveal each hidden item
    expertise.slice(VISIBLE_COUNT).forEach((_, i) => {
      setTimeout(() => {
        setRevealCount(VISIBLE_COUNT + i + 1);
      }, 60 + i * 70);
    });

    setTimeout(() => {
      setExpanded(true);
      setAnimating(false);
    }, 60 + (expertise.length - VISIBLE_COUNT) * 70 + 300);
  }

  function handleCollapse() {
    if (animating) return;
    setAnimating(true);

    // Stagger hide in reverse
    const toHide = expertise.length - VISIBLE_COUNT;
    for (let i = 0; i < toHide; i++) {
      setTimeout(() => {
        setRevealCount(expertise.length - i - 1);
      }, i * 50);
    }

    setTimeout(() => {
      setExpanded(false);
      setRevealCount(VISIBLE_COUNT);
      setAnimating(false);
    }, toHide * 50 + 200);
  }

  return (
    <div className="mt-10">
      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.slice(0, revealCount).map((item, i) => (
          <ExpertiseItem
            key={item.label}
            item={item}
            isNew={i >= VISIBLE_COUNT}
          />
        ))}
      </div>

      {/* Button */}
      <div className="mt-8 flex justify-center">
        {!expanded ? (
          <button
            onClick={handleExpand}
            disabled={animating}
            className="group relative overflow-hidden rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 disabled:opacity-60"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-line)",
              color: "var(--color-ink)",
            }}
          >
            {/* Horizontal scan shimmer */}
            <span
              className="pointer-events-none absolute inset-y-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(43,108,176,0.18)] to-transparent transition-transform duration-700 group-hover:translate-x-[350%]"
            />
            <span className="relative flex items-center gap-2.5">
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: "var(--color-accent)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
              </span>
              See all {expertise.length} technologies
              <span
                className="transition-transform duration-300 group-hover:translate-y-0.5"
                style={{ color: "var(--color-accent)" }}
              >
                ↓
              </span>
            </span>
          </button>
        ) : (
          <button
            onClick={handleCollapse}
            disabled={animating}
            className="rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-60 hover:opacity-70"
            style={{
              background: "transparent",
              border: "1px solid var(--color-line)",
              color: "var(--color-muted)",
            }}
          >
            Show less ↑
          </button>
        )}
      </div>
    </div>
  );
}

function ExpertiseItem({
  item,
  isNew,
}: {
  item: (typeof expertise)[0];
  isNew: boolean;
}) {
  const [mounted, setMounted] = useState(!isNew);

  useEffect(() => {
    if (isNew) {
      const t = setTimeout(() => setMounted(true), 30);
      return () => clearTimeout(t);
    }
  }, [isNew]);
  const glowing = isNew && mounted;

  return (
    <div
      className="group flex items-center gap-4 rounded-xl px-5 py-4"
      style={{
        background: "var(--color-surface)",
        border: `1px solid ${glowing ? "rgba(43,108,176,0.4)" : "var(--color-line)"}`,
        boxShadow: glowing ? "0 0 16px rgba(43,108,176,0.15), 0 0 0 1px rgba(43,108,176,0.2)" : "none",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0) scale(1)" : "translateY(10px) scale(0.96)",
        transition: "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.4s ease, border-color 0.4s ease",
        animation: glowing ? "expertiseGlow 0.6s ease-out 1" : "none",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 0 0 1px rgba(43,108,176,0.2), 0 4px 16px rgba(43,108,176,0.08)";
        el.style.borderColor = "rgba(43,108,176,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "none";
        el.style.borderColor = "var(--color-line)";
      }}
    >
      {/* Logo */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "var(--color-bg)",
          border: "1px solid var(--color-line)",
        }}
      >
        <style>{`
          @keyframes expertiseGlow {
            0% {
              box-shadow: 0 0 0 rgba(43,108,176,0);
            }
            45% {
              box-shadow: 0 0 16px rgba(43,108,176,0.15), 0 0 0 1px rgba(43,108,176,0.2);
            }
            100% {
              box-shadow: none;
            }
          }
        `}</style>
        <img
          src={item.logo}
          alt={item.label}
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
          style={{
            filter: ["Next.js", "Django", "Stripe"].includes(item.label)
              ? "brightness(0) saturate(100%) invert(25%) sepia(15%) saturate(500%) hue-rotate(180deg) opacity(80%)"
              : undefined,
          }}
        />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
          {item.label}
        </p>
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          {item.category}
        </p>
      </div>

      {/* Reveal indicator — fades out after glow */}
      <span
        className="h-4 w-px shrink-0 rounded-full transition-opacity duration-500"
        style={{
          background: "var(--color-accent)",
          opacity: glowing ? 0.8 : 0,
        }}
      />
    </div>
  );
}
