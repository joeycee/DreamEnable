import Link from "next/link";

import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            DreamEnable
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-muted)]">
            Founder-led digital product development for businesses that want stronger positioning,
            sharper SEO foundations, and practical automation that supports growth.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-[var(--color-muted)]">
          <Link href="/about">About</Link>
          <Link href="/offerings">Offerings</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </Container>
    </footer>
  );
}
