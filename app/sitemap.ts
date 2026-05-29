import type { MetadataRoute } from "next";

import { getBlogPosts, getPortfolioProjects } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "/",
    "/about",
    "/offerings",
    "/work",
    "/blog",
    "/testimonials",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));

  const [posts, projects] = await Promise.all([
    getBlogPosts().catch(() => []),
    getPortfolioProjects().catch(() => []),
  ]);

  const blogPages = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated_at || post.published_at || post.created_at),
  }));

  const projectPages = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: new Date(project.updated_at || project.created_at),
  }));

  return [...staticPages, ...blogPages, ...projectPages];
}
