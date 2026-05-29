import { BlogTimeline } from "./timeline";
import { getBlogPosts } from "@/lib/api";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Read Carden Studio articles on web development, SEO-aware websites, positioning, digital product strategy, and building a stronger online presence.",
  path: "/blog",
  keywords: ["web development blog", "SEO website advice", "digital product strategy"],
});

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return <BlogTimeline posts={posts} />;
}
