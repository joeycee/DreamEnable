import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Container } from "@/components/ui/container";
import { getTestimonials } from "@/lib/api";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Testimonials",
  description:
    "See what clients say about working with Carden Studio on premium websites, service business sites, and custom web application projects.",
  path: "/testimonials",
  keywords: ["web design testimonials", "client feedback", "website project reviews"],
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="pb-12 pt-16 sm:pt-20">
        <Container>
          <div className="flex items-center gap-3">
            <span className="inline-block h-px w-8" style={{ background: "var(--color-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--color-accent)" }}>
              Testimonials
            </p>
          </div>
          <h1
            className="display-copy mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "var(--color-ink)" }}
          >
            A polished project is only part of the story.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-8" style={{ color: "var(--color-muted)" }}>
            The working relationship matters too — clear communication, sensible decisions, and a
            process that keeps momentum high from first conversation to launch.
          </p>
        </Container>
      </section>

      {/* ── TESTIMONIALS GRID ────────────────────────────────────────────── */}
      <section
        className="pb-28 pt-20"
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-line)",
        }}
      >
        <Container>
          {testimonials.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-2xl p-12 text-center"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-line)",
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                No testimonials published yet
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                This page now renders live testimonial entries from the API and will populate as
                soon as records are available.
              </p>
            </div>
          )}
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
              Ready to get started?
            </p>
            <h2 className="display-copy mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Add your own story to the list.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65">
              If you want a studio site, service business website, or custom web app that feels
              polished and commercially clear, this is a good place to start.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#fff", color: "#1B3D5F" }}
              >
                Book an introduction
              </a>
              <a
                href="/about"
                className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                About the studio
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
