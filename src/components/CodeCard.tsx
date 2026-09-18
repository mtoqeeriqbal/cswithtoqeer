export function CodeCard() {
  return (
    <div className="animate-float-slow rounded-2xl border border-border bg-ink p-5 font-mono text-sm shadow-2xl shadow-accent/10">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-xs text-white/40">topic: binary_search.pseudo</span>
      </div>
      <pre className="mt-4 whitespace-pre-wrap leading-relaxed text-white/80">
        <span className="text-accent-2">FUNCTION</span>{" "}
        <span className="text-white">Search</span>(list, target)
        {"\n  "}
        <span className="text-accent-2">low</span> ← 0
        {"\n  "}
        <span className="text-accent-2">high</span> ← LENGTH(list) - 1
        {"\n\n  "}
        <span className="text-accent-2">WHILE</span> low ≤ high
        {"\n    "}mid ← (low + high) DIV 2
        {"\n    "}
        <span className="text-accent-2">IF</span> list[mid] = target
        {"\n      "}
        <span className="text-accent-2">RETURN</span> mid
        {"\n    "}
        <span className="text-accent-2">ELSE</span>
        {"\n      "}...
        <span className="animate-cursor text-accent-2">▍</span>
      </pre>
      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
        <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">
          OUTPUT
        </span>
        <span className="text-xs text-white/50">Understood, not memorized.</span>
      </div>
    </div>
  );
}
