"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  SESSION_ORDER,
  TYPE_ORDER,
  ZONE_ORDER,
  ZONE_LABEL,
  type DocType,
  type PastPaper,
  type PaperNumber,
  type Session,
  type Zone,
} from "@/data/pastPapers0478";
import { IconChevronDown, IconDownload, IconFileText, IconSearch } from "./Icons";

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function CheckboxRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1.5 text-sm text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 rounded border-border-strong accent-accent"
      />
      {children}
    </label>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-border py-5 first:pt-0 last:border-b-0">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

export function PastPapersFilter({ papers }: { papers: PastPaper[] }) {
  const [years, setYears] = useState<Set<number>>(new Set());
  const [sessions, setSessions] = useState<Set<Session>>(new Set());
  const [paper, setPaper] = useState<"all" | PaperNumber>("all");
  const [zones, setZones] = useState<Set<Zone>>(new Set());
  const [types, setTypes] = useState<Set<DocType>>(new Set());
  const [collapsedYears, setCollapsedYears] = useState<Set<number>>(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allYears = useMemo(
    () => [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a),
    [papers],
  );

  const hasActiveFilters =
    years.size > 0 || sessions.size > 0 || paper !== "all" || zones.size > 0 || types.size > 0;

  function clearFilters() {
    setYears(new Set());
    setSessions(new Set());
    setPaper("all");
    setZones(new Set());
    setTypes(new Set());
  }

  const results = useMemo(() => {
    return papers
      .filter((p) => years.size === 0 || years.has(p.year))
      .filter((p) => sessions.size === 0 || sessions.has(p.session))
      .filter((p) => paper === "all" || p.paper === paper)
      .filter((p) => zones.size === 0 || zones.has(p.zone))
      .filter((p) => types.size === 0 || types.has(p.type))
      .sort((a, b) => {
        const sessionDiff = SESSION_ORDER.indexOf(a.session) - SESSION_ORDER.indexOf(b.session);
        if (sessionDiff !== 0) return sessionDiff;
        if (a.paper !== b.paper) return a.paper - b.paper;
        if (a.zone !== b.zone) return a.zone - b.zone;
        return TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
      });
  }, [papers, years, sessions, paper, zones, types]);

  const grouped = useMemo(() => {
    const byYear = new Map<number, PastPaper[]>();
    for (const p of results) {
      if (!byYear.has(p.year)) byYear.set(p.year, []);
      byYear.get(p.year)!.push(p);
    }
    return [...byYear.entries()].sort((a, b) => b[0] - a[0]);
  }, [results]);

  function toggleYearCollapsed(year: number) {
    setCollapsedYears((prev) => toggle(prev, year));
  }

  const filtersPanel = (
    <div>
      <FilterGroup title="Year">
        {allYears.map((y) => (
          <CheckboxRow key={y} checked={years.has(y)} onChange={() => setYears((s) => toggle(s, y))}>
            {y}
          </CheckboxRow>
        ))}
      </FilterGroup>

      <FilterGroup title="Session">
        {SESSION_ORDER.map((s) => (
          <CheckboxRow
            key={s}
            checked={sessions.has(s)}
            onChange={() => setSessions((set) => toggle(set, s))}
          >
            {s}
          </CheckboxRow>
        ))}
      </FilterGroup>

      <FilterGroup title="Paper">
        <div className="flex gap-2">
          {(["all", 1, 2] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPaper(p)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                paper === p
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-text-secondary hover:border-border-strong hover:text-text-primary"
              }`}
            >
              {p === "all" ? "All" : `Paper ${p}`}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Zone">
        {ZONE_ORDER.map((z) => (
          <CheckboxRow key={z} checked={zones.has(z)} onChange={() => setZones((s) => toggle(s, z))}>
            {ZONE_LABEL[z]}
          </CheckboxRow>
        ))}
      </FilterGroup>

      <FilterGroup title="Type">
        {TYPE_ORDER.map((t) => (
          <CheckboxRow key={t} checked={types.has(t)} onChange={() => setTypes((s) => toggle(s, t))}>
            {t}
          </CheckboxRow>
        ))}
      </FilterGroup>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="mt-4 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-bg px-4 py-3 text-sm font-medium text-text-primary"
        >
          <span>Filters {hasActiveFilters ? "· active" : ""}</span>
          <IconChevronDown
            width={16}
            height={16}
            className={`transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`}
          />
        </button>
        {mobileFiltersOpen && (
          <div className="mt-3 rounded-xl border border-border bg-bg p-4">{filtersPanel}</div>
        )}
      </div>

      <aside className="hidden lg:sticky lg:top-24 lg:block lg:w-64 lg:shrink-0 lg:rounded-xl lg:border lg:border-border lg:bg-bg lg:p-5">
        {filtersPanel}
      </aside>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs text-text-tertiary">
          {results.length} {results.length === 1 ? "paper" : "papers"} found
        </p>

        {grouped.length > 0 ? (
          <div className="mt-4 flex flex-col gap-6">
            {grouped.map(([year, yearPapers]) => {
              const collapsed = collapsedYears.has(year);
              return (
                <div key={year} className="rounded-xl border border-border bg-bg">
                  <button
                    type="button"
                    onClick={() => toggleYearCollapsed(year)}
                    className="flex w-full items-center justify-between px-5 py-4"
                  >
                    <span className="font-display text-lg font-semibold text-text-primary">
                      {year}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-text-tertiary">
                        {yearPapers.length} {yearPapers.length === 1 ? "file" : "files"}
                      </span>
                      <IconChevronDown
                        width={16}
                        height={16}
                        className={`text-text-tertiary transition-transform ${collapsed ? "" : "rotate-180"}`}
                      />
                    </span>
                  </button>

                  {!collapsed && (
                    <div className="border-t border-border">
                      {yearPapers.map((p) => (
                        <a
                          key={p.fileUrl}
                          href={p.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 border-b border-border px-5 py-3 transition-colors last:border-b-0 hover:bg-bg-subtle"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              p.type === "Question Paper"
                                ? "bg-accent-soft text-accent"
                                : "bg-success-soft text-success"
                            }`}
                          >
                            <IconFileText width={16} height={16} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-text-primary">
                              {p.session} · Paper {p.paper} · {p.type}
                            </span>
                            <span className="mt-0.5 block truncate font-mono text-xs text-text-tertiary">
                              {p.code}
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
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-14 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <IconSearch width={18} height={18} />
            </span>
            <p className="text-sm text-text-secondary">No papers match these filters yet.</p>
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
    </div>
  );
}
