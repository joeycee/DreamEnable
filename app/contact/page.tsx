import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact DreamEnable to discuss an AI tool, business automation system, website redesign, or custom web application project in New Zealand or Australia.",
  path: "/contact",
  keywords: ["contact web developer", "AI automation consultation", "custom web app consultation"],
});

export default function ContactPage() {
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
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

            {/* ── Left col ── */}
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-block h-px w-8" style={{ background: "var(--color-accent)" }} />
                <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--color-accent)" }}>
                  Get in touch
                </p>
              </div>

              <h1
                className="display-copy mt-7 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:leading-[1.1]"
                style={{ color: "var(--color-ink)" }}
              >
                Start with a clear conversation about{" "}
                <em
                  className="not-italic"
                  style={{
                    background: "linear-gradient(135deg, #2B6CB0 0%, #4A8DB5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  what you&apos;re building.
                </em>
              </h1>

              <p className="mt-6 text-base leading-8" style={{ color: "var(--color-muted)" }}>
                Share a little about the business, the project, and the outcome you want. The goal
                is to make the next step feel straightforward.
              </p>

              {/* Fit list */}
              <div className="mt-10 space-y-3">
                {[
                  { icon: "◈", text: "Premium but practical website projects" },
                  { icon: "⬡", text: "Founder-led collaboration and direct communication" },
                  { icon: "◎", text: "Brochure sites, business websites, and custom apps" },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-4 rounded-xl px-5 py-3.5 text-sm"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-line)",
                      color: "var(--color-ink)",
                    }}
                  >
                    <span className="shrink-0 text-base" style={{ color: "var(--color-accent)" }}>
                      {icon}
                    </span>
                    {text}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                className="mt-10 pt-10"
                style={{ borderTop: "1px solid var(--color-line)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] mb-5" style={{ color: "var(--color-muted)" }}>
                  Typical response time
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: "#22c55e" }}
                  />
                  <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                    Within one business day
                  </p>
                </div>
                <p className="mt-2 text-sm leading-7" style={{ color: "var(--color-muted)" }}>
                  Based in Auckland, NZ — available across NZ &amp; AU time zones.
                </p>
              </div>
            </div>

            {/* ── Right col — form ── */}
            <div
              className="rounded-2xl p-8 sm:p-10"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-line)",
                boxShadow: "0 4px 32px rgba(27,61,95,0.06)",
              }}
            >
              <p
                className="mb-6 text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: "var(--color-muted)" }}
              >
                Project enquiry
              </p>
              <ContactForm />
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
