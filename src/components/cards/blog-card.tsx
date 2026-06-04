import Link from "next/link";

import { Card } from "@/components/ui/card";
import { formatDate, resolveAssetUrl } from "@/lib/utils";
import { BlogPost } from "@/types/api";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = resolveAssetUrl(post.featured_image);
  const publishedDate = formatDate(post.published_at ?? post.created_at);

  return (
    <Card
      className="h-full overflow-hidden p-0"
      style={{
        borderColor: "rgba(46,127,176,0.1)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(242,247,250,0.94) 100%)",
        boxShadow: "0 20px 60px rgba(33,74,97,0.08)",
      }}
    >
      {imageUrl ? (
        <div className="aspect-[16/10] overflow-hidden border-b border-[rgba(46,127,176,0.08)] bg-[var(--color-surface)]">
          <img
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
            src={imageUrl}
          />
        </div>
      ) : null}
      <div className="p-7">
        {publishedDate ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {publishedDate}
          </p>
        ) : null}
        <h3
          className="mt-4 text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-4 text-[0.96rem] leading-8 text-[var(--color-muted)]">{post.excerpt}</p>
        <Link
          className="mt-6 inline-flex text-sm font-semibold text-[var(--color-accent)] transition hover:opacity-70"
          href={`/blog/${post.slug}`}
        >
          Read article
        </Link>
      </div>
    </Card>
  );
}
