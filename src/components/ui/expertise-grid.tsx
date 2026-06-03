import Image from "next/image";

import { expertiseItems } from "@/content/expertise";

export function ExpertiseGrid() {
  return (
    <div className="mt-12">
      <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
        From polished frontends to reliable backend infrastructure, the stack is chosen to
        support performance, maintainability, and growth.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {expertiseItems.map((item) => (
          <article
            key={item.title}
            className="group rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_8px_24px_rgba(26,61,90,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_16px_40px_rgba(26,61,90,0.12)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-2xl border border-[rgba(46,127,176,0.12)] bg-[rgba(46,127,176,0.04)] p-4">
                <Image
                  alt={`${item.title} logo`}
                  className="h-10 w-auto object-contain opacity-85 group-hover:opacity-100 transition"
                  height={40}
                  src={item.imagePath}
                  width={132}
                />
              </div>
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] opacity-45 transition group-hover:opacity-70" />
            </div>

            <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
