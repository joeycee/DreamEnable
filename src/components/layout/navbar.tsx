"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

import { Logo } from "@/components/ui/logo";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/offerings", label: "Expertise" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const handleNavLinkClick = () => setIsOpen(false);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl backdrop-saturate-150"
      style={{
        background:
          "linear-gradient(180deg, rgba(42,52,57,0.94) 0%, rgba(31,38,42,0.92) 100%)",
        borderColor: "rgba(74, 86, 94, 0.65)",
      }}
    >
      <Container className="min-w-0">
        <div className="flex h-16 min-w-0 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Carden Studio home"
            className="flex min-w-0 flex-1 items-center md:flex-none"
            onClick={handleNavLinkClick}
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={handleNavLinkClick}
                  className={[
                    "relative rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
                    active
                      ? "font-semibold text-[var(--color-text-primary)]"
                      : "font-normal text-[var(--color-text-secondary)] hover:bg-[rgba(107,138,153,0.14)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                >
                  {label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-[1.5px] rounded-full bg-[var(--color-accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            onClick={handleNavLinkClick}
            className="hidden shrink-0 items-center rounded-full border border-[var(--color-accent-warm)] bg-[var(--color-accent-warm)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] transition-all duration-150 hover:bg-[var(--color-accent-warm-hover)] md:inline-flex"
          >
            Book a project
          </Link>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[var(--color-text-primary)] transition-colors duration-150 hover:bg-[rgba(107,138,153,0.14)] md:hidden"
            type="button"
            onClick={() => setIsOpen((current) => !current)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("transition-transform duration-200", isOpen && "rotate-180")}
            >
              <polyline points="4 7 9 12 14 7" />
            </svg>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "overflow-hidden transition-[max-height,opacity,padding] duration-200 md:hidden",
            isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0",
          )}
        >
          <nav
            className="rounded-2xl border border-[rgba(74,86,94,0.65)] bg-[rgba(31,38,42,0.92)] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
            style={{ backdropFilter: "blur(18px) saturate(150%)" }}
          >
            {navigation.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={handleNavLinkClick}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm transition-colors duration-150",
                    active
                      ? "bg-[rgba(107,138,153,0.14)] font-semibold text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[rgba(107,138,153,0.14)] hover:text-[var(--color-text-primary)]",
                  )}
                >
                  {label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={handleNavLinkClick}
              className="mt-2 flex items-center justify-center rounded-xl border border-[var(--color-accent-warm)] bg-[var(--color-accent-warm)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] transition-all duration-150 hover:bg-[var(--color-accent-warm-hover)]"
            >
              Book a project
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
