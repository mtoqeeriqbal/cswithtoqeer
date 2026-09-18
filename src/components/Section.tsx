import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  subtle = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  subtle?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={subtle ? "bg-bg-subtle" : undefined}>
      <div className={`mx-auto max-w-7xl px-6 py-20 sm:py-24 ${className}`}>
        {children}
      </div>
    </section>
  );
}
