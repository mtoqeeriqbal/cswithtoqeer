import Link from "next/link";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/0478", label: "Courses" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-text-primary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-white">
                &lt;/&gt;
              </span>
              CSwithToqeer
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              Real understanding of Cambridge Computer Science, from O Level
              to A Level — clear explanations, exam-focused, no fluff.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1 font-mono text-xs text-text-tertiary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              building in public
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Pages</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              {pageLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Coming Up</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li>Small-Group Classes</li>
              <li>Student Dashboard</li>
              <li>Practice Questions</li>
              <li>Past Papers</li>
              <li>CS Lab</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li>
                <a
                  href="mailto:toqeer.94@gmail.com"
                  className="transition-colors hover:text-text-primary"
                >
                  toqeer.94@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/toqeeri1/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-text-primary"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-text-tertiary">YouTube (soon)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 text-sm text-text-secondary sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} CSwithToqeer. All rights reserved.</span>
          <span className="text-text-tertiary">Built by Toqeer.</span>
        </div>
      </div>
    </footer>
  );
}
