"use client";

import Link from "next/link";
import { useState } from "react";

import { resolveAssetUrl, stripHtml } from "@/lib/utils";
import { PortfolioProject } from "@/types/api";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = resolveAssetUrl(project.featured_image);
  const detailHref = `/work/${project.slug}`;
  const plainDescription = stripHtml(project.short_description);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl"
      style={{
        background: "var(--color-surface)",
        border: `1px solid ${hovered ? "rgba(43,108,176,0.3)" : "var(--color-line)"}`,
        boxShadow: hovered
          ? "0 0 0 1px rgba(43,108,176,0.15), 0 8px 32px rgba(27,61,95,0.1)"
          : "none",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Scan line that sweeps down on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(43,108,176,0.6), transparent)",
          transform: hovered ? "translateY(100%)" : "translateY(0%)",
          opacity: hovered ? 0 : 0,
          transition: "transform 0.6s ease",
          animation: hovered ? "scanDown 0.6s ease forwards" : "none",
        }}
      />
      <style>{`
        @keyframes scanDown {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(3000%); opacity: 0; }
        }
        @keyframes cornerPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* Corner brackets — futuristic HUD feel */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <span
          key={pos}
          className={`pointer-events-none absolute ${pos} z-10 h-3 w-3`}
          style={{
            opacity: hovered ? 1 : 0,
            transition: `opacity 0.3s ease ${i * 50}ms`,
            borderTop: pos.includes("top") ? "1.5px solid rgba(43,108,176,0.7)" : "none",
            borderBottom: pos.includes("bottom") ? "1.5px solid rgba(43,108,176,0.7)" : "none",
            borderLeft: pos.includes("left") ? "1.5px solid rgba(43,108,176,0.7)" : "none",
            borderRight: pos.includes("right") ? "1.5px solid rgba(43,108,176,0.7)" : "none",
          }}
        />
      ))}

      {/* Image — compact thumbnail */}
      <div className="flex gap-5 p-5 pb-0">
        <div
          className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg"

        >
          {imageUrl ? (
            <>
              <img
                alt={project.title}
                className="h-full w-full object-cover"
                src={imageUrl}
                style={{
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                  filter: hovered ? "brightness(1.05)" : "brightness(1)",
                }}
              />
              {/* Shimmer sweep over image */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                  transform: hovered ? "translateX(100%)" : "translateX(-100%)",
                  transition: "transform 0.5s ease",
                }}
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xl opacity-20" style={{ color: "var(--color-accent)" }}>◈</span>
            </div>
          )}
        </div>

        {/* Eyebrow + title inline with thumbnail */}
        <div className="flex flex-col justify-center min-w-0">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{
              color: "var(--color-accent)",
              opacity: hovered ? 1 : 0.7,
              transition: "opacity 0.3s ease",
            }}
          >
            Featured project
          </p>
          <h3
            className="mt-1.5 text-lg font-semibold tracking-[-0.03em] leading-snug"
            style={{
              color: hovered ? "var(--color-accent)" : "var(--color-ink)",
              transition: "color 0.3s ease",
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-1 flex-col px-5 pt-4">
        <p
          className="text-sm leading-7"
          style={{ color: "var(--color-muted)" }}
        >
          {plainDescription}
        </p>
      </div>

      {/* Footer links */}
      <div
        className="mx-5 mt-5 mb-5 flex flex-wrap items-center gap-3 border-t pt-4"
        style={{ borderColor: "var(--color-line)" }}
      >
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white"
          style={{
            background: "var(--color-accent)",
            boxShadow: hovered ? "0 4px 12px rgba(43,108,176,0.3)" : "none",
            transform: hovered ? "translateY(-1px)" : "translateY(0)",
            transition: "box-shadow 0.3s ease, transform 0.3s ease",
          }}
        >
          Case study →
        </Link>
        {project.project_url ? (
          <Link
            href={project.project_url}
            rel="noreferrer"
            target="_blank"
            className="text-xs font-semibold transition-opacity hover:opacity-60"
            style={{ color: "var(--color-ink)" }}
          >
            Live site ↗
          </Link>
        ) : null}
        {project.github_url ? (
          <Link
            href={project.github_url}
            rel="noreferrer"
            target="_blank"
            className="text-xs font-semibold transition-opacity hover:opacity-60"
            style={{ color: "var(--color-ink)" }}
          >
            GitHub ↗
          </Link>
        ) : null}
      </div>
    </div>
  );
}
