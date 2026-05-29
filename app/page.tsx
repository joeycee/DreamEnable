import Link from "next/link";

import { BlogCard } from "@/components/cards/blog-card";
import { ProjectCard } from "@/components/cards/project-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { CtaSection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ExpertiseExpandable } from "@/components/ui/expertise-expandable";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts, getPortfolioProjects, getTestimonials } from "@/lib/api";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Founder-Led Web Development Studio",
  description:
    "Carden Studio builds premium websites, custom web apps, and SEO-aware digital products for growing businesses across Auckland, New Zealand, and Australia.",
  path: "/",
  keywords: [
    "premium websites",
    "Auckland web developer",
    "New Zealand web design",
    "custom web apps",
    "SEO-friendly web development",
  ],
});

export default async function HomePage() {
  const [testimonials, posts, projects] = await Promise.all([
    getTestimonials().catch(() => []),
    getBlogPosts().catch(() => []),
    getPortfolioProjects().catch(() => []),
  ]);

  const featuredTestimonials = testimonials.filter((item) => item.featured).slice(0, 3);
  const featuredPosts = posts.slice(0, 3);
  const featuredProjects = [...projects]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order)
    .slice(0, 2);
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "Carden Studio",
        description:
          "Founder-led web development studio building premium websites and custom digital products.",
        areaServed: ["New Zealand", "Australia"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Auckland",
          addressCountry: "NZ",
        },
        url: absoluteUrl("/"),
        serviceType: [
          "Website development",
          "Custom web applications",
          "Technical SEO foundations",
          "Digital product development",
        ],
      },
      {
        "@type": "WebSite",
        name: "Carden Studio",
        url: absoluteUrl("/"),
        inLanguage: "en-NZ",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-24 pt-20 sm:pb-32 sm:pt-28">
        {/* Decorative background orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 65% 0%, rgba(43,108,176,0.09) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 10% 80%, rgba(43,108,176,0.06) 0%, transparent 60%)
            `,
          }}
        />
        {/* Thin horizontal rule accent */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(43,108,176,0.25) 40%, rgba(43,108,176,0.25) 60%, transparent)" }}
        />

        <Container className="relative">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-px w-8"
              style={{ background: "var(--color-accent)" }}
            />
            <p
              className="text-xs font-semibold uppercase tracking-[0.32em]"
              style={{ color: "var(--color-accent)" }}
            >
              Founder-led web studio · NZ &amp; AU
            </p>
          </div>

          {/* Headline */}
          <h1
            className="display-copy mt-6 max-w-4xl text-5xl tracking-[-0.04em] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.04]"
            style={{ color: "var(--color-ink)", fontWeight: 600 }}
          >
            Websites &amp; digital products that feel{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(135deg, #2B6CB0 0%, #4A8DB5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              sharp, credible,
            </em>{" "}
            and ready to sell.
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg leading-8 sm:text-xl"
            style={{ color: "var(--color-muted)" }}
          >
            Carden Studio helps growing businesses launch premium websites, custom web
            applications, and SEO-aware digital experiences with the clarity, polish, and
            practical thinking you&apos;d expect from a founder-led partner.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact">Start your project</Button>
            <Button href="/offerings" variant="secondary">
              Our Stack
            </Button>
          </div>

          
        </Container>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section
        className="border-y py-5"
        style={{
          borderColor: "var(--color-line)",
          background: "var(--color-surface)",
        }}
      >
        
      </section>

      {/* ── WHY CARDEN ───────────────────────────────────────────────────── */}
      <section className="pb-24 pt-20">
        <Container>
          <SectionHeading
            eyebrow="Why Carden Studio"
            title="A business-minded development partner for teams that need more than nice visuals."
            description="The goal is not to ship more pages. It's to create a web presence that explains your value clearly, builds trust quickly, and supports real commercial outcomes."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "◈",
                title: "Thoughtful positioning",
                copy: "Clear messaging and premium structure so visitors understand what you do and why it matters in the first ten seconds.",
              },
              {
                icon: "⬡",
                title: "Practical development",
                copy: "Modern builds with clean implementation choices that stay maintainable as the business grows and requirements shift.",
              },
              {
                icon: "◎",
                title: "Founder-level care",
                copy: "Direct communication, sensible tradeoffs, and a build process that stays close to the work — not hidden behind account management.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl p-7 transition-shadow duration-300 hover:shadow-md"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-line)",
                }}
              >
                <span
                  className="mb-4 block text-2xl"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.icon}
                </span>
                <h3 className="text-lg font-semibold" style={{ color: "var(--color-ink)" }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--color-muted)" }}>
                  {item.copy}
                </p>
                {/* Bottom accent line on hover */}
                <span
                  className="absolute bottom-0 left-7 right-7 h-px scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: "var(--color-accent)", transformOrigin: "left" }}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div
            className="grid gap-8 rounded-3xl p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-line)",
            }}
          >
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: "var(--color-accent)" }}
              >
                Auckland web development
              </p>
              <h2
                className="mt-4 text-3xl font-semibold tracking-[-0.03em]"
                style={{ color: "var(--color-ink)" }}
              >
                Built for businesses that need a sharper website and stronger search visibility.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-8" style={{ color: "var(--color-muted)" }}>
              <p>
                Based in Auckland and working across New Zealand and Australia, Carden Studio
                creates business websites and custom digital products that are fast, accessible,
                technically clean, and easy for search engines to understand.
              </p>
              <p>
                That means clear information architecture, metadata that supports better snippets,
                structured content, and development choices that help your site earn trust from
                both people and crawlers.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── EXPERTISE ────────────────────────────────────────────────────── */}
      <section
        className="pb-24 pt-20"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(107,138,153,0.12) 0%, transparent 70%),
            var(--color-bg)
          `,
        }}
      >
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Expertise"
              title="Built with a modern stack and practical infrastructure."
              description="Carden Studio works across proven tools and platforms to build fast, scalable, and maintainable digital products."
            />
          </div>
          <ExpertiseExpandable />
        </Container>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
      <section className="pb-24 pt-20">
        <Container>
          <SectionHeading
            eyebrow="Featured work"
            title="Selected projects built to look polished and perform with purpose."
            description="A homepage preview of portfolio projects — presented with enough breathing room to feel premium."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div
                className="flex items-center justify-center rounded-2xl p-12 lg:col-span-2"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
              >
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Portfolio projects will appear here once the Django API has live entries.
                </p>
              </div>
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-70"
              style={{ color: "var(--color-accent)" }}
            >
              View all work →
            </Link>
          </div>
        </Container>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section
        className="pb-24 pt-20"
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-line)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Testimonials"
            title="What working together feels like."
            description="Proof points matter most when they feel specific, grounded, and aligned with the quality of the final product."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredTestimonials.length > 0 ? (
              featuredTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            ) : (
              [
                { quote: "The site launched on time and immediately felt like the premium product we wanted. Exactly what we needed.", author: "Client name", role: "Founder, Studio Co." },
                { quote: "Working directly with the founder meant fast decisions, no fluff, and a result we're genuinely proud to show.", author: "Client name", role: "Director, Agency Ltd." },
                { quote: "Practical, clear, and beautifully built. The process was as good as the outcome.", author: "Client name", role: "CEO, Startup NZ" },
              ].map((t) => (
                <div
                  key={t.author}
                  className="rounded-2xl p-7"
                  style={{ background: "var(--color-bg)", border: "1px solid var(--color-line)" }}
                >
                  <p
                    className="text-2xl leading-none"
                    style={{ color: "var(--color-accent)" }}
                  >
                    &ldquo;
                  </p>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--color-ink)" }}>
                    {t.quote}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-full"
                      style={{ background: "var(--color-accent-light)" }}
                    />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                        {t.author}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Container>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────────────────── */}
      <section className="pb-24 pt-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Latest writing"
              title="Thoughtful notes on websites, positioning, and practical digital growth."
              description="New published posts flow straight through from the backend as soon as they're live."
            />
            <Link
              className="hidden shrink-0 text-sm font-semibold transition hover:opacity-70 md:block"
              href="/blog"
              style={{ color: "var(--color-accent)" }}
            >
              All posts →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredPosts.length > 0 ? (
              featuredPosts.map((post) => <BlogCard key={post.id} post={post} />)
            ) : (
              <div
                className="flex items-center justify-center rounded-2xl p-12 lg:col-span-3"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
              >
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Latest blog posts will appear here once published through Django.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          background: "linear-gradient(135deg, #1B3D5F 0%, #2B6CB0 60%, #4A8DB5 100%)",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <Container className="relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
            Ready to get started?
          </p>
          <h2
            className="display-copy mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl"
          >
            Build something that makes the right first impression.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/70">
            If you want a studio site, service business website, or custom web app that feels
            polished and commercially clear, this is a good place to start.
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
              style={{ borderColor: "rgba(255,255,255,0.35)" }}
            >
              Learn about the studio
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
