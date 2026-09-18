"use client";

import { useMemo, useState } from "react";
import {
  SESSION_ORDER,
  TYPE_ORDER,
  type DocType,
  type PastPaper,
  type PaperNumber,
  type Session,
} from "@/data/pastPapers0478";
import { IconDownload, IconFileText, IconSearch } from "./Icons";

type FilterValue<T> = T | "all";

function selectClass() {
  return "w-full appearance-none rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary transition-colors hover:border-border-strong focus:border-accent focus:outline-none";
}

export function PastPapersFilter({ papers }: { papers: PastPaper[] }) {
  const [year, setYear] = useState<FilterValue<number>>("all");
  const [session, setSession] = useState<FilterValue<Session>>("all");
  const [paper, setPaper] = useState<FilterValue<PaperNumber>>("all");
  const [type, setType] = useState<FilterValue<DocType>>("all");

  const years = useMemo(
    () => [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a),
    [papers],
  );
  const paperNumbers = useMemo(
    () => [...new Set(papers.map((p) => p.paper))].sort((a, b) => a - b),
    [papers],
  );

  const results = useMemo(() => {
    return papers
      .filter((p) => year === "all" || p.year === year)
      .filter((p) => session === "all" || p.session === session)
      .filter((p) => paper === "all" || p.paper === paper)
      .filter((p) => type === "all" || p.type === type)
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        const sessionDiff = SESSION_ORDER.indexOf(a.session) - SESSION_ORDER.indexOf(b.session);
        if (sessionDiff !== 0) return sessionDiff;
        if (a.paper !== b.paper) return a.paper - b.paper;
        return TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
      });
  }, [papers, year, session, paper, type]);

  const hasActiveFilters = year !== "all" || session !== "all" || paper !== "all" || type !== "all";

  function clearFilters() {
    setYear("all");
    setSession("all");
    setPaper("all");
    setType("all");
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-text-tertiary">Year</span>
          <select
            className={selectClass()}
            value={year}
            onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
          >
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-text-tertiary">Session</span>
          <select
            className={selectClass()}
            value={session}
            onChange={(e) => setSession(e.target.value === "all" ? "all" : (e.target.value as Session))}
          >
            <option value="all">All sessions</option>
            {SESSION_ORDER.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-text-tertiary">Paper</span>
          <select
            className={selectClass()}
            value={paper}
            onChange={(e) => setPaper(e.target.value === "all" ? "all" : (Number(e.target.value) as PaperNumber))}
          >
            <option value="all">Both papers</option>
            {paperNumbers.map((p) => (
              <option key={p} value={p}>
                Paper {p}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-text-tertiary">Type</span>
          <select
            className={selectClass()}
            value={type}
            onChange={(e) => setType(e.target.value === "all" ? "all" : (e.target.value as DocType))}
          >
            <option value="all">All types</option>
            {TYPE_ORDER.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-secondary"
          >
            Clear filters
          </button>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-text-tertiary">
        {results.length} {results.length === 1 ? "paper" : "papers"} found
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <a
              key={p.fileUrl}
              href={p.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-bg p-4 transition-colors hover:border-accent/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <IconFileText width={18} height={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-text-primary">
                  {p.year} · {p.session}
                </span>
                <span className="mt-0.5 block truncate font-mono text-xs text-text-tertiary">
                  Paper {p.paper} · {p.type}
                </span>
              </span>
              <IconDownload
                width={16}
                height={16}
                className="shrink-0 text-text-tertiary transition-colors group-hover:text-accent"
              />
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-14 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <IconSearch width={18} height={18} />
          </span>
          <p className="text-sm text-text-secondary">
            No papers match these filters yet.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
