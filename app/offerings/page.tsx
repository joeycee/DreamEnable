import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ExpertiseGrid } from "@/components/ui/expertise-grid";
import { createPageMetadata } from "@/lib/seo";

const capabilities = [
  {
    icon: "◈",
    title: "Frontend systems",
    description:
      "Modern interfaces built for clarity, speed, and long-term maintainability across marketing sites and product surfaces.",
    points: [
      "Premium Next.js and React builds",
      "Typed UI architecture with TypeScript",
      "Design systems and component-driven delivery",
    ],
  },
  {
    icon: "⬡",
    title: "Backend foundations",
    description:
      "Practical application architecture for APIs, admin workflows, content, authentication, and business logic.",
    points: [
      "Django and Python application development",
      "PostgreSQL-backed data modelling",
      "Structured integrations and operational clarity",
    ],
  },
  {
    icon: "◎",
    title: "Infrastructure & growth",
    description:
      "Deployment and platform choices made to support reliability today and easier scaling later.",
    points: [
      "AWS and DigitalOcean environments",
      "Docker-based deployment workflows",
      "Stripe-enabled payments and subscriptions",
    ],
  },
];

const approach = [
  "Fast frontend delivery",
  "Reliable backend architecture",
  "Scalable deployment foundations",
  "Clean handover and maintainable code",
];

export const metadata = createPageMetadata({
  title: "Expertise",
  description:
    "Explore Carden Studio's expertise across Next.js, React, TypeScript, Django, PostgreSQL, cloud infrastructure, and Stripe-powered product delivery.",
  path: "/offerings",
  keywords: ["Next.js development", "React agency", "Django development", "Stripe integrations"],
});

export default function ExpertisePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-28 pt-24 sm:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 70% at 50% -10%, rgba(43,108,176,0.11) 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 90% 60%, rgba(74,141,181,0.07) 0%, transparent 60%)
            `,
          }}
        />
        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(43,108,176,0.3) 40%, rgba(74,141,181,0.3) 60%, transparent 100%)",
          }}
        />
        <Container className="relative">
          <div className="flex items-center gap-3">
            <span className="inline-block h-px w-8" style={{ background: "var(--color-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--color-accent)" }}>
              Expertise
            </p>
          </div>
          <h1
            className="display-copy mt-7 max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.06]"
            style={{ color: "var(--color-ink)" }}
          >
            A modern stack chosen for{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(135deg, #2B6CB0 0%, #4A8DB5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              practical delivery.
            </em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8" style={{ color: "var(--color-muted)" }}>
            Carden Studio works across proven frontend, backend, and infrastructure tools to build
            digital products that feel polished, scalable, and straightforward to maintain.
          </p>
        </Container>
      </section>

      {/* ── EXPERTISE GRID ───────────────────────────────────────────────── */}
      <section className="pb-28">
        <Container>
          <ExpertiseGrid />
        </Container>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      <section
        className="pb-28 pt-20"
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-line)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <Container>
          <div className="flex items-center gap-3 mb-12">
            <span className="inline-block h-px w-8" style={{ background: "var(--color-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--color-accent)" }}>
              Capabilities
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="group relative rounded-2xl p-8 transition-shadow duration-300 hover:shadow-md"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-line)",
                }}
              >
                <span
                  className="block font-mono text-xs font-medium tracking-widest mb-5"
                  style={{ color: "var(--color-accent)", opacity: 0.45 }}
                >
                  0{i + 1}
                </span>
                <span
                  className="block text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 origin-left"
                  style={{ color: "var(--color-accent)" }}
                >
                  {cap.icon}
                </span>
                <h2
                  className="text-2xl font-semibold tracking-[-0.03em]"
                  style={{ color: "var(--color-ink)" }}
                >
                  {cap.title}
                </h2>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--color-muted)" }}>
                  {cap.description}
                </p>
                <div className="mt-6 space-y-2.5">
                  {cap.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-line)",
                        color: "var(--color-ink)",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--color-accent)", opacity: 0.6 }}
                      />
                      {point}
                    </div>
                  ))}
                </div>
                {/* Hover bottom line */}
                <span
                  className="absolute bottom-0 left-8 right-8 h-px scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "var(--color-accent)", transformOrigin: "left" }}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── WORKING APPROACH ─────────────────────────────────────────────── */}
      <section className="pb-28 pt-20">
        <Container>
          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--color-line)" }}
          >
            <div
              className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]"
            >
              {/* Left panel */}
              <div
                className="flex flex-col justify-between p-10"
                style={{
                  background: "linear-gradient(160deg, #1B3D5F 0%, #2B6CB0 100%)",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                    Working approach
                  </p>
                  <h3
                    className="display-copy mt-5 text-3xl font-semibold tracking-[-0.03em] text-white leading-[1.2]"
                  >
                    Technology chosen to support performance, maintainability, and growth.
                  </h3>
                </div>
                <div className="mt-10 lg:mt-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "#fff", color: "#1B3D5F" }}
                  >
                    Discuss your project →
                  </Link>
                </div>
              </div>

              {/* Right panel */}
              <div className="p-10" style={{ background: "var(--color-bg)" }}>
                <p className="text-base leading-8" style={{ color: "var(--color-muted)" }}>
                  The stack is selected to fit the project, not to chase novelty. That means modern
                  frontend delivery where polish matters, dependable backend tooling where workflow
                  and scale matter, and infrastructure choices that stay pragmatic as the business
                  grows.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {approach.map((item) => (
                    <div
                      key={item}
                      className="rounded-full px-4 py-2 text-sm font-medium"
                      style={{
                        background: "var(--color-accent-light)",
                        color: "var(--color-accent)",
                        border: "1px solid rgba(43,108,176,0.15)",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28"
        style={{
          background: "linear-gradient(135deg, #1B3D5F 0%, #2B6CB0 60%, #4A8DB5 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
              Ready to build
            </p>
            <h2 className="display-copy mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Bring the right tools together for a product that feels sharp and dependable.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65">
              If you already know the kind of project you&apos;re planning, we can work through the
              right stack, hosting setup, and implementation approach together.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#fff", color: "#1B3D5F" }}
              >
                Book an introduction
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                About the studio
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
