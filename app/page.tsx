import Link from "next/link";

import { BlogCard } from "@/components/cards/blog-card";
import { ProjectCard } from "@/components/cards/project-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Container } from "@/components/ui/container";
import { DreamEnableHero } from "@/components/ui/dream-enable-hero";
import { ExpertiseExpandable } from "@/components/ui/expertise-expandable";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts, getPortfolioProjects, getTestimonials } from "@/lib/api";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI, Web Apps, and Automation for Ambitious Businesses",
  description:
    "DreamEnable builds AI tools, custom web apps, automations, and SEO-aware digital products for growing businesses across New Zealand and Australia.",
  path: "/",
  keywords: [
    "AI automation agency",
    "Auckland web developer",
    "New Zealand web app developer",
    "custom web apps",
    "AI tools for business",
    "business automation",
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
        name: "DreamEnable",
        description:
          "Founder-led software studio building AI tools, custom web apps, automations, and SEO-aware digital products.",
        areaServed: ["New Zealand", "Australia"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Auckland",
          addressCountry: "NZ",
        },
        url: absoluteUrl("/"),
        serviceType: [
          "AI business tools",
          "Custom web applications",
          "Business automation",
          "Website development",
          "Technical SEO foundations",
          "Digital product development",
        ],
      },
      {
        "@type": "WebSite",
        name: "DreamEnable",
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
      <DreamEnableHero />

      

      {/* ── WHY DREAM ENABLE ─────────────────────────────────────────────── */}
      <section className="pb-24 pt-20">
        <Container>
          <SectionHeading
            eyebrow="Why DreamEnable"
            title="A focused partner that cares about outcomes, not just deliverables."
            description="We don't ship pages — we create digital presences that explain your value clearly, earn trust fast, and support the growth you're working toward."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "◈",
                title: "Clear positioning",
                copy: "Messaging and structure that communicates what you do and why it matters within the first ten seconds of a visit.",
              },
              {
                icon: "⬡",
                title: "Clean, lasting code",
                copy: "Modern builds with thoughtful implementation choices that stay maintainable as your business grows and your needs evolve.",
              },
              {
                icon: "◎",
                title: "Direct collaboration",
                copy: "You work with us — not an account manager. Honest conversations, fast decisions, and care that stays close to the work.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl p-7 transition-shadow duration-300 hover:shadow-sm"
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
                <span
                  className="absolute bottom-0 left-7 right-7 h-px scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: "var(--color-accent)", transformOrigin: "left" }}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── LOCAL SIGNAL ─────────────────────────────────────────────────── */}
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
                Auckland · New Zealand &amp; Australia
              </p>
              <h2
                className="mt-4 text-3xl font-semibold tracking-[-0.03em]"
                style={{ color: "var(--color-ink)" }}
              >
                Built for businesses that want a sharper web presence and better search visibility.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-8" style={{ color: "var(--color-muted)" }}>
              <p>
                Based in Auckland and working with businesses across New Zealand and Australia,
                DreamEnable creates AI tools, websites, and custom digital products that are fast,
                accessible, technically clean, and structured for search engines to understand.
              </p>
              <p>
                That means solid information architecture, metadata that improves your snippets,
                structured content, and development decisions that help your site earn credibility
                with both people and crawlers from day one.
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
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(178,213,232,0.14) 0%, transparent 70%),
            var(--color-bg)
          `,
        }}
      >
        <Container>
          <SectionHeading
            eyebrow="Expertise"
            title="A modern stack with practical, proven infrastructure."
            description="We work across well-chosen tools and platforms to build digital products that are fast, scalable, and maintainable long after launch."
          />
          <ExpertiseExpandable />
        </Container>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
      <section className="pb-24 pt-20">
        <Container>
          <SectionHeading
            eyebrow="Featured work"
            title="Selected projects — built to look intentional and perform with purpose."
            description="A preview of recent work, presented with the clarity we bring to every engagement."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div
                className="flex items-center justify-center rounded-2xl p-12 lg:col-span-2"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-line)",
                }}
              >
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Portfolio projects will appear here once the API has live entries.
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
            title="What working with us feels like."
            description="Proof points land best when they're specific, grounded, and honest about the experience."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredTestimonials.length > 0 ? (
              featuredTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            ) : (
              [
                {
                  quote: "The site launched on time and immediately felt like the premium product we wanted. Exactly what we needed.",
                  author: "Client name",
                  role: "Founder, Studio Co.",
                },
                {
                  quote: "Working directly meant fast decisions, no fluff, and a result we're genuinely proud to show anyone.",
                  author: "Client name",
                  role: "Director, Agency Ltd.",
                },
                {
                  quote: "Practical, clear, and beautifully built. The process was as good as the outcome.",
                  author: "Client name",
                  role: "CEO, Startup NZ",
                },
              ].map((t) => (
                <div
                  key={t.author}
                  className="rounded-2xl p-7"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-line)",
                  }}
                >
                  <p className="text-2xl leading-none" style={{ color: "var(--color-accent)" }}>
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
              title="Notes on websites, positioning, and practical digital growth."
              description="New posts publish straight from the backend as soon as they're live."
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
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-line)",
                }}
              >
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Latest posts will appear here once published through the CMS.
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
          background: "linear-gradient(135deg, #1a3d5a 0%, #2e7fb0 60%, #5aadcf 100%)",
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
        <Container className="relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
            Ready to move forward?
          </p>
          <h2 className="display-copy mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Let&apos;s build something you&apos;re proud to show the world.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/70">
            Whether it&apos;s a new website, a web application, or a digital product that needs
            to perform — we&apos;d love to hear what you&apos;re working toward.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#fff", color: "#1a3d5a" }}
            >
              Start the conversation
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.35)" }}
            >
              About DreamEnable
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}