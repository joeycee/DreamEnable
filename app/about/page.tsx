import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About DreamEnable",
  description:
    "Learn about DreamEnable, a founder-led Auckland digital studio focused on AI tools, custom web apps, SEO-ready websites, and clear commercial thinking.",
  path: "/about",
  keywords: ["about DreamEnable", "Auckland digital studio", "founder-led development partner"],
});

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-28 pt-24 sm:pt-32">
        {/* Glassy ocean gradient backdrop */}
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
        {/* Thin top accent line */}
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
            <p
              className="text-xs font-semibold uppercase tracking-[0.32em]"
              style={{ color: "var(--color-accent)" }}
            >
              About DreamEnable
            </p>
          </div>

          <h1
            className="display-copy mt-7 max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.06]"
            style={{ color: "var(--color-ink)" }}
          >
            A studio shaped by development thinking{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(135deg, #2B6CB0 0%, #4A8DB5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              and business reality.
            </em>
          </h1>

          <p
            className="mt-8 max-w-xl text-lg leading-8"
            style={{ color: "var(--color-muted)" }}
          >
            Designed for businesses that want a sharper digital presence — without a bloated
            process or generic agency output.
          </p>
        </Container>
      </section>

      {/* ── STORY ────────────────────────────────────────────────────────── */}
      <section className="pb-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">

            {/* Left — prose */}
            <div className="space-y-6">
              {[
                {
                  text: "The studio approach is deliberately personal. You work close to the person shaping the strategy, writing the code, and making the product decisions.",
                  emphasis: true,
                },
                {
                  text: "That usually leads to clearer communication, faster iteration, and better judgment around what actually matters — rather than decisions made three layers away from the work.",
                  emphasis: false,
                },
                {
                  text: "There is a strong bias toward useful outcomes: clearer offers, smoother user journeys, maintainable builds, and a web presence that supports credibility from the first click.",
                  emphasis: false,
                },
                {
                  text: "The result is a practical, polished collaboration for founders and small teams who care about quality and want a capable partner close to the work.",
                  emphasis: false,
                },
              ].map(({ text, emphasis }, i) => (
                <p
                  key={i}
                  className="text-base leading-[1.85]"
                  style={{
                    color: emphasis ? "var(--color-ink)" : "var(--color-muted)",
                    fontSize: emphasis ? "1.0625rem" : undefined,
                  }}
                >
                  {text}
                </p>
              ))}

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "var(--color-accent)" }}
                >
                  Start the conversation →
                </Link>
              </div>
            </div>

            {/* Right — principles stack */}
            <div className="space-y-px rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-line)" }}>
              {[
                {
                  icon: "◈",
                  title: "Founder-led by design",
                  body: "Direct communication and decisions made close to the work — not routed through account management.",
                },
                {
                  icon: "⬡",
                  title: "Development + business lens",
                  body: "Technical delivery shaped by messaging, trust, and conversion goals from the start.",
                },
                {
                  icon: "◎",
                  title: "Practical over theatrical",
                  body: "Careful scope, steady execution, and no unnecessary complexity added for the sake of it.",
                },
              ].map(({ icon, title, body }, i) => (
                <div
                  key={title}
                  className="group flex gap-5 p-7 transition-colors duration-200 hover:bg-[rgba(43,108,176,0.04)]"
                  style={{
                    background: i % 2 === 0 ? "var(--color-surface)" : "var(--color-bg)",
                    borderBottom: i < 2 ? "1px solid var(--color-line)" : undefined,
                  }}
                >
                  <span
                    className="mt-0.5 shrink-0 text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {icon}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: "var(--color-ink)" }}>
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-7" style={{ color: "var(--color-muted)" }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>

      {/* ── FOUNDER ─────────────────────────────────────────────────────── */}
      <section className="pb-28">
        <Container>
          <div
            className="relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-12"
            style={{
              background: `
                radial-gradient(ellipse 90% 90% at 0% 0%, rgba(214,236,248,0.78) 0%, transparent 58%),
                radial-gradient(ellipse 70% 70% at 100% 20%, rgba(74,141,181,0.1) 0%, transparent 65%),
                rgba(255,255,255,0.78)
              `,
              border: "1px solid rgba(46,127,176,0.14)",
              boxShadow: "0 24px 70px rgba(26,61,90,0.08)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(46,127,176,0.26) 40%, rgba(46,127,176,0.26) 60%, transparent 100%)",
              }}
            />

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-px w-8"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.32em]"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Founder-led
                  </p>
                </div>

                <h2
                  className="display-copy mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
                  style={{ color: "var(--color-ink)" }}
                >
                  Founder-led, not agency-layered.
                </h2>

                <div
                  className="mt-6 max-w-2xl space-y-5 text-base leading-[1.95]"
                  style={{ color: "var(--color-muted)" }}
                >
                  <p>
                    DreamEnable is built by Joe Carden, a developer and founder who
                    understands what it feels like to turn a rough idea into something real.
                  </p>
                  <p>
                    With experience building a wide range of web applications, from polished
                    business platforms to more bespoke digital products, Joe brings a practical,
                    steady hand to both the technical build and the thinking around it.
                  </p>
                  <p>
                    You work directly with the person thinking through the build, writing the
                    code, shaping the user experience, and making sure the final product
                    actually supports the business behind it. If you have a strong idea and want
                    an experienced partner to help shape it into something credible, useful, and
                    ready for the real world, that is exactly the kind of work DreamEnable is
                    built for.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div
                  className="rounded-[1.75rem] p-3 sm:p-4"
                  style={{
                    background: "rgba(255,255,255,0.74)",
                    border: "1px solid rgba(46,127,176,0.16)",
                    boxShadow: "0 22px 54px rgba(26,61,90,0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="overflow-hidden rounded-[1.35rem]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(214,236,248,0.42) 0%, rgba(255,255,255,0.95) 100%)",
                    }}
                  >
                    <Image
                      src="/joe.png"
                      alt="Joe Carden, founder of DreamEnable"
                      width={900}
                      height={1100}
                      className="h-auto w-full object-cover"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section
        className="pb-28 pt-20"
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-line)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <Container>
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-block h-px w-8" style={{ background: "var(--color-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--color-accent)" }}>
              The approach
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Clarity first",
                copy: "Good websites explain the business before they try to impress. Messaging and structure matter as much as the visuals — often more.",
              },
              {
                number: "02",
                title: "Built for growth",
                copy: "The work stays mindful of future content, backend integrations, and the practical needs of a scaling business from day one.",
              },
              {
                number: "03",
                title: "Polished, not overstated",
                copy: "The aim is premium confidence: calm layouts, strong typography, measured detail, and intent that reads clearly without shouting.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl p-7 transition-shadow duration-300 hover:shadow-sm"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-line)",
                }}
              >
                <span
                  className="block font-mono text-xs font-medium tracking-widest"
                  style={{ color: "var(--color-accent)", opacity: 0.5 }}
                >
                  {item.number}
                </span>
                <h3
                  className="mt-3 text-xl font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "var(--color-muted)" }}
                >
                  {item.copy}
                </p>
                <span
                  className="absolute bottom-0 left-7 right-7 h-px scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "var(--color-accent)", transformOrigin: "left" }}
                />
              </div>
            ))}
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
        {/* Dot grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glassy highlight top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />

        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
              Ready when you are
            </p>
            <h2
              className="display-copy mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl"
            >
              A modern web presence should feel considered from strategy through delivery.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65">
              If you want a site that reflects a high standard without becoming overbuilt,
              there&apos;s room to shape the right scope together.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#fff", color: "#1B3D5F" }}
              >
                Start the conversation
              </Link>
              <Link
                href="/offerings"
                className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                View offerings
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
