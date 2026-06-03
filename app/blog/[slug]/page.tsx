import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPost, getBlogPosts } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";
import { formatDate, resolveAssetUrl } from "@/lib/utils";
import { BlogPost } from "@/types/api";
import { BlogDetailClient } from "./BlogDetailClient";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    const image = resolveAssetUrl(post.featured_image);

    return {
      title: post.title,
      description: post.excerpt,
      alternates: {
        canonical: absoluteUrl(`/blog/${post.slug}`),
      },
      openGraph: {
        type: "article",
        url: absoluteUrl(`/blog/${post.slug}`),
        title: `${post.title} | DreamEnable`,
        description: post.excerpt,
        publishedTime: post.published_at ?? post.created_at,
        modifiedTime: post.updated_at,
        images: image ? [{ url: image, alt: post.title }] : undefined,
      },
      twitter: {
        card: image ? "summary_large_image" : "summary",
        title: `${post.title} | DreamEnable`,
        description: post.excerpt,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    return { title: "Blog post" };
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts().catch(() => []);

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let post: BlogPost;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.published_at ?? post.created_at,
            dateModified: post.updated_at,
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            image: resolveAssetUrl(post.featured_image) ?? undefined,
            author: {
              "@type": "Organization",
              name: "DreamEnable",
            },
            publisher: {
              "@type": "Organization",
              name: "DreamEnable",
            },
          }),
        }}
      />
      <BlogDetailClient
        post={post}
        imageUrl={resolveAssetUrl(post.featured_image)}
        publishedDate={formatDate(post.published_at ?? post.created_at)}
      />
    </>
  );
}
