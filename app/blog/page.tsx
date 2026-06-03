import { BlogTimeline } from "./timeline";
import { getBlogPosts } from "@/lib/api";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Read DreamEnable articles on AI tools, web development, automation, SEO-ready websites, positioning, and digital product strategy.",
  path: "/blog",
  keywords: ["AI business blog", "SEO website advice", "digital product strategy"],
});

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return <BlogTimeline posts={posts} />;
}
