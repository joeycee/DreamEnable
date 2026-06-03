import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ExpertiseGrid } from "@/components/ui/expertise-grid";
import { createPageMetadata } from "@/lib/seo";

const capabilities = [
  {
    icon: "◈",
    title: "Frontend experiences",
    description:
      "Elegant, fast interfaces that make your product feel clear, considered, and effortless to use.",
    points: [
      "Premium Next.js and React builds",
      "Typed UI architecture with TypeScript",
      "Design systems and component-led delivery",
    ],
  },
  {
    icon: "⬡",
    title: "Backend intelligence",
    description:
      "Dependable application foundations for workflows, APIs, admin tools, automation, and business logic.",
    points: [
      "Django and Python application development",
      "PostgreSQL-backed data modelling",
      "Structured integrations and operational clarity",
    ],
  },
  {
    icon: "◎",
    title: "Automation & growth",
    description:
      "AI-aware systems and platform choices that reduce manual work and support the business as it scales.",
    points: [
      "AI tools and workflow automation",
      "AWS and DigitalOcean environments",
      "Stripe payments and subscription systems",
    ],
  },
];

const approach = [
  "Clarity before code",
  "Sharp frontend delivery",
  "Reliable backend architecture",
  "AI-aware workflows",
  "Scalable deployment foundations",
  "Clean handover and maintainable code",
];

const signals = [
  "Next.js",
  "React",
  "TypeScript",
  "Django",
  "Python",
  "PostgreSQL",
  "Stripe",
  "AWS",
  "DigitalOcean",
  "Automation",
  "AI tools",
  "Technical SEO",
];

export const metadata = createPageMetadata({
  title: "Services & Expertise",
  description:
    "DreamEnable builds AI tools, custom web apps, automations, and SEO-aware digital products for ambitious businesses across New Zealand and Australia.",
  path: "/offerings",
  keywords: [
    "AI automation agency",
    "Next.js development",
    "React developer New Zealand",
    "Django development",
    "custom web apps",
    "Stripe integrations",
  ],
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
              radial-gradient(ellipse 70% 45% at 50% 0%, rgba(214,236,248,0.95) 0%, rgba(238,246,251,0.72) 45%, transparent 75%),
              radial-gradient(circle at 18% 28%, rgba(46,127,176,0.12) 0%, transparent 24%),
              radial-gradient(circle at 82% 18%, rgba(209,121,66,0.07) 0%, transparent 24%),
              linear-gradient(180deg, #f7fafb 0%, #eef6fb 56%, #f7fafb 100%)
            `,
          }}
        />

        <div
          aria-hidden
          className="absolute left-[-6rem] top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(178,213,232,0.28)" }}
        />
        <div
          aria-hidden
          className="absolute right-[-5rem] top-20 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(46,127,176,0.12)" }}
        />

        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(46,127,176,0.25) 40%, rgba(46,127,176,0.25) 60%, transparent 100%)",
          }}
        />

        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="inline-block h-px w-10" style={{ background: "var(--color-accent)" }} />
              <p
                className="text-xs font-semibold uppercase tracking-[0.32em]"
                style={{ color: "var(--color-accent)" }}
              >
                Services &amp; Expertise
              </p>
              <span className="inline-block h-px w-10" style={{ background: "var(--color-accent)" }} />
            </div>

            <h1
              className="display-copy mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-[4.8rem] lg:leading-[1.04]"
              style={{ color: "var(--color-text-primary)" }}
            >
              The practical stack behind{" "}
              <em
                className="not-italic"
                style={{
                  background: "linear-gradient(135deg, #2E7FB0 0%, #5AADCF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                dreamy digital products.
              </em>
            </h1>

            <p
              className="mx-auto mt-8 max-w-2xl text-lg leading-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              DreamEnable brings together polished interfaces, dependable backend systems,
              automation, and AI-aware workflows to turn promising ideas into products people can
              actually use, trust, and grow with.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #102636 0%, #1a3d5a 100%)",
                  color: "#ffffff",
                  boxShadow: "0 14px 34px rgba(26,61,90,0.22)",
                }}
              >
                Start your project
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-12 items-center justify-center rounded-full border px-7 text-xs font-semibold uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  color: "#18384f",
                  borderColor: "rgba(46,127,176,0.28)",
                  background: "rgba(255,255,255,0.58)",
                  boxShadow: "0 10px 26px rgba(26,61,90,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                View selected work
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SIGNAL STRIP ─────────────────────────────────────────────────── */}
      <section className="pb-20">
        <Container>
          <div
            className="rounded-3xl px-6 py-5"
            style={{
              background: "rgba(255,255,255,0.62)",
              border: "1px solid rgba(46,127,176,0.16)",
              boxShadow: "0 20px 60px rgba(26,61,90,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {signals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full px-3.5 py-2 text-xs font-medium"
                  style={{
                    background: "rgba(46,127,176,0.075)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(46,127,176,0.14)",
                  }}
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── EXPERTISE GRID ───────────────────────────────────────────────── */}
      <section className="pb-28">
        <Container>
          <div className="mb-12 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="inline-block h-px w-8" style={{ background: "var(--color-accent)" }} />
              <p
                className="text-xs font-semibold uppercase tracking-[0.32em]"
                style={{ color: "var(--color-accent)" }}
              >
                Technical craft
              </p>
            </div>
            <h2
              className="display-copy mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              Tools chosen for momentum, polish, and staying power.
            </h2>
          </div>
          <ExpertiseGrid />
        </Container>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pb-28 pt-20"
        style={{
          background: `
            radial-gradient(ellipse 90% 45% at 50% 0%, rgba(214,236,248,0.45) 0%, transparent 70%),
            var(--color-surface)
          `,
          borderTop: "1px solid var(--color-line)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(46,127,176,0.35), transparent)",
          }}
        />
        <Container>
          <div className="mb-12 flex items-center gap-3">
            <span className="inline-block h-px w-8" style={{ background: "var(--color-accent)" }} />
            <p
              className="text-xs font-semibold uppercase tracking-[0.32em]"
              style={{ color: "var(--color-accent)" }}
            >
              Capabilities
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="group relative overflow-hidden rounded-3xl p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(247,250,251,0.92) 100%)",
                  border: "1px solid rgba(46,127,176,0.16)",
                  boxShadow: "0 18px 52px rgba(26,61,90,0.06)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute right-[-4rem] top-[-4rem] h-36 w-36 rounded-full blur-2xl transition duration-500 group-hover:scale-125"
                  style={{ background: "rgba(178,213,232,0.36)" }}
                />
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
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm"
                      style={{
                        background: "rgba(255,255,255,0.78)",
                        border: "1px solid rgba(46,127,176,0.13)",
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
                <span
                  className="absolute bottom-0 left-8 right-8 h-px scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "var(--color-accent)", transformOrigin: "left" }}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── DREAMY CALL TO ACTION ─────────────────────────────────────────── */}
      <section className="pb-28">
        <Container>
          <div
            className="rounded-[2rem] border border-[rgba(46,127,176,0.16)] bg-[rgba(255,255,255,0.8)] p-10 shadow-[0_28px_70px_rgba(26,61,90,0.08)] backdrop-blur-xl"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 20%, rgba(214,236,248,0.38) 0%, transparent 38%), radial-gradient(circle at 82% 12%, rgba(46,127,176,0.14) 0%, transparent 32%)",
            }}
          >
            <div className="max-w-3xl">
              <p
                className="text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: "var(--color-accent)" }}
              >
                YOUR IDEA IS CLOSER THAN IT FEELS
              </p>
              <h2
                className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
                style={{ color: "var(--color-text-primary)" }}
              >
                Been thinking about building your own website, app, or AI tool?
              </h2>
              <p className="mt-6 text-base leading-8" style={{ color: "var(--color-text-secondary)" }}>
                Don’t let the fear of the unknown keep the idea sitting in your head. You don’t
                need to have every detail figured out before you start — you just need the right
                technical partner to help shape the path, make the unknowns clear, and turn the
                dream into something real.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-7 text-xs text-white font-semibold uppercase tracking-[0.14em] transition hover:-translate-y-0.5 hover:shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #102636 0%, #1a3d5a 100%)",
                    color: "#ffffff",
                    boxShadow: "0 14px 34px rgba(26,61,90,0.18)",
                  }}
                >
                  Start the conversation
                </Link>
                <Link
                  href="/work"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border px-7 text-xs font-semibold uppercase tracking-[0.14em] transition hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    color: "#18384f",
                    borderColor: "rgba(46,127,176,0.24)",
                    background: "rgba(255,255,255,0.72)",
                    boxShadow: "0 10px 26px rgba(26,61,90,0.06)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  See what we build
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── WORKING APPROACH ─────────────────────────────────────────────── */}
      <section className="pb-28 pt-20">
        <Container>
          <div
            className="overflow-hidden rounded-[2rem]"
            style={{
              border: "1px solid rgba(46,127,176,0.16)",
              boxShadow: "0 24px 80px rgba(26,61,90,0.08)",
            }}
          >
            <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
              <div
                className="relative flex flex-col justify-between overflow-hidden p-10"
                style={{
                  background:
                    "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.58) 0%, transparent 32%), linear-gradient(160deg, #d6ecf8 0%, #eef6fb 100%)",
                  borderRight: "1px solid rgba(46,127,176,0.15)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute bottom-[-5rem] right-[-5rem] h-48 w-48 rounded-full blur-3xl"
                  style={{ background: "rgba(46,127,176,0.13)" }}
                />
                <div className="relative">
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.28em]"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Working approach
                  </p>
                  <h3
                    className="display-copy mt-5 text-3xl font-semibold tracking-[-0.03em] leading-[1.2]"
                    style={{ color: "#1a2e3b" }}
                  >
                    We start with the shape of the idea, then choose the stack that brings it into
                    focus.
                  </h3>
                </div>
                <div className="relative mt-10 lg:mt-0">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "#102636", color: "#ffffff" }}
                  >
                    Discuss your project
                  </Link>
                </div>
              </div>

              <div className="p-10" style={{ background: "var(--color-surface)" }}>
                <p className="text-base leading-8" style={{ color: "var(--color-text-secondary)" }}>
                  The best digital products feel almost inevitable once they exist. That takes a
                  clear concept, a calm build process, and technical choices that support the
                  business instead of weighing it down. We keep the stack practical, the interface
                  refined, and the handover clean.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {approach.map((item) => (
                    <div
                      key={item}
                      className="rounded-full px-4 py-2 text-sm font-medium"
                      style={{
                        background: "rgba(46,127,176,0.08)",
                        color: "var(--color-accent)",
                        border: "1px solid rgba(46,127,176,0.2)",
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
          background:
            "radial-gradient(ellipse 120% 80% at 50% 10%, #d6ecf8 0%, #eef6fb 42%, #f7fafb 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(46,127,176,0.25) 40%, rgba(46,127,176,0.25) 60%, transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(178,213,232,0.28)" }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.32em]"
              style={{ color: "var(--color-accent)" }}
            >
              Ready to build
            </p>
            <h2
              className="display-copy mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              Bring the right tools together for a product that feels effortless.
            </h2>
            <p className="mt-6 text-base leading-8" style={{ color: "var(--color-text-secondary)" }}>
              Whether you need a new web app, an AI-assisted workflow, or a sharper digital
              presence, we can map the build and make the next step feel clear.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #102636 0%, #1a3d5a 100%)",
                  color: "#ffffff",
                  boxShadow: "0 14px 34px rgba(26,61,90,0.22)",
                }}
              >
                Book an introduction
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center rounded-full border px-7 text-xs font-semibold uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  color: "#18384f",
                  borderColor: "rgba(46,127,176,0.28)",
                  background: "rgba(255,255,255,0.58)",
                  boxShadow: "0 10px 26px rgba(26,61,90,0.08)",
                  backdropFilter: "blur(10px)",
                }}
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
