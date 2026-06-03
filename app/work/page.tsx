import { ProjectCard } from "@/components/cards/project-card";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPortfolioProjects } from "@/lib/api";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Browse selected DreamEnable projects spanning AI tools, premium websites, digital products, and custom business platforms built for clarity, trust, and performance.",
  path: "/work",
  keywords: ["web development portfolio", "AI case studies", "custom app projects"],
});

export default async function WorkPage() {
  const projects = await getPortfolioProjects().catch(() => []);
  const orderedProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
  );

  return (
    <section className="pb-20 pt-20 sm:pt-24">
      <Container>
        <SectionHeading
          eyebrow="Work"
          title="Selected digital products, websites, and platforms built to feel sharp and work hard."
          description="Every project is pulled directly from the Django portfolio API, with featured work surfaced first and the rest ordered intentionally."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {orderedProjects.length > 0 ? (
            orderedProjects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <Card className="lg:col-span-2">
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                No portfolio projects are available yet.
              </p>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}
