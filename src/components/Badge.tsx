import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success";
}) {
  const styles =
    tone === "success"
      ? "bg-success/10 text-success"
      : "bg-badge-bg text-badge-text";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 font-mono text-xs font-medium ${styles}`}
    >
      {children}
    </span>
  );
}
