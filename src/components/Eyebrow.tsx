export function Eyebrow({
  index,
  children,
  align = "center",
}: {
  index: string;
  children: string;
  align?: "center" | "left";
}) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-xs tracking-wide text-text-tertiary ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <span className="text-accent">{"//"}</span>
      <span className="text-text-tertiary">{index}</span>
      <span className="text-text-secondary">{children}</span>
    </p>
  );
}
