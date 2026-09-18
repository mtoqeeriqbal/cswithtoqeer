"use client";

import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  SESSION_ORDER,
  SUBJECT_CODE,
  SUBJECT_LEVEL,
  SUBJECT_NAME,
  type PastPaper,
  type PaperNumber,
  type Session,
} from "@/data/pastPapers0478";
import {
  IconCheck,
  IconChevronDown,
  IconDownload,
  IconFileText,
  IconSearch,
  IconStar,
  IconX,
} from "./Icons";

const STORAGE_KEY = "0478-past-papers-state";

type StoredState = Partial<Record<"marked" | "starred", string[]>>;

// Notified whenever this tab writes to STORAGE_KEY, since the native
// `storage` event only fires in *other* tabs/windows.
let storeListeners: Array<() => void> = [];

function subscribeStore(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  storeListeners.push(callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    storeListeners = storeListeners.filter((l) => l !== callback);
  };
}

function getStoreSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerStoreSnapshot(): string {
  return "";
}

function parseStoredState(raw: string): StoredState {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as StoredState;
  } catch {
    return {};
  }
}

function writeStoredField(field: "marked" | "starred", keys: Set<string>) {
  try {
    const current = parseStoredState(window.localStorage.getItem(STORAGE_KEY) ?? "");
    current[field] = [...keys];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // localStorage unavailable (private browsing, etc.) — marks just won't persist.
  }
  for (const listener of storeListeners) listener();
}

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

function FilterPill({ children, onRemove }: { children: ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-bg-subtle px-3 py-1 text-sm font-medium text-text-primary">
      {children}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove filter"
        className="rounded-full text-text-tertiary transition-colors hover:text-text-primary"
      >
        <IconX width={13} height={13} />
      </button>
    </span>
  );
}

export function PastPapersFilter({ papers }: { papers: PastPaper[] }) {
  const [years, setYears] = useState<Set<number>>(new Set());
  const [sessions, setSessions] = useState<Set<Session>>(new Set());
  const [paper, setPaper] = useState<"all" | PaperNumber>("all");
  const [collapsedYears, setCollapsedYears] = useState<Set<number>>(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const rawStored = useSyncExternalStore(subscribeStore, getStoreSnapshot, getServerStoreSnapshot);
  const storedState = useMemo(() => parseStoredState(rawStored), [rawStored]);
  const marked = useMemo(() => new Set(storedState.marked ?? []), [storedState]);
  const starred = useMemo(() => new Set(storedState.starred ?? []), [storedState]);

  function toggleMarked(code: string) {
    writeStoredField("marked", toggle(marked, code));
  }

  function toggleStarred(code: string) {
    writeStoredField("starred", toggle(starred, code));
  }

  const allYears = useMemo(
    () => [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a),
    [papers],
  );

  const hasActiveFilters = years.size > 0 || sessions.size > 0 || paper !== "all";

  function clearFilters() {
    setYears(new Set());
    setSessions(new Set());
    setPaper("all");
  }

  const results = useMemo(() => {
    return papers
      .filter((p) => years.size === 0 || years.has(p.year))
      .filter((p) => sessions.size === 0 || sessions.has(p.session))
      .filter((p) => paper === "all" || p.paper === paper)
      .sort((a, b) => {
        const sessionDiff = SESSION_ORDER.indexOf(a.session) - SESSION_ORDER.indexOf(b.session);
        if (sessionDiff !== 0) return sessionDiff;
        return a.variant - b.variant;
      });
  }, [papers, years, sessions, paper]);

  const grouped = useMemo(() => {
    const byYear = new Map<number, PastPaper[]>();
    for (const p of results) {
      if (!byYear.has(p.year)) byYear.set(p.year, []);
      byYear.get(p.year)!.push(p);
    }
    return [...byYear.entries()].sort((a, b) => b[0] - a[0]);
  }, [results]);

  const allCollapsed = grouped.length > 0 && grouped.every(([year]) => collapsedYears.has(year));

  function toggleYearCollapsed(year: number) {
    setCollapsedYears((prev) => toggle(prev, year));
  }

  function toggleAllCollapsed() {
    setCollapsedYears(allCollapsed ? new Set() : new Set(grouped.map(([year]) => year)));
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
        {hasActiveFilters && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {[...years]
              .sort((a, b) => b - a)
              .map((y) => (
                <FilterPill key={`year-${y}`} onRemove={() => setYears((s) => toggle(s, y))}>
                  {y}
                </FilterPill>
              ))}
            {[...sessions].map((s) => (
              <FilterPill key={`session-${s}`} onRemove={() => setSessions((set) => toggle(set, s))}>
                {s}
              </FilterPill>
            ))}
            {paper !== "all" && (
              <FilterPill onRemove={() => setPaper("all")}>Paper {paper}</FilterPill>
            )}
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-accent hover:text-accent-hover"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-text-tertiary">
            {results.length} {results.length === 1 ? "paper" : "papers"} found
          </p>
          {grouped.length > 0 && (
            <button
              type="button"
              onClick={toggleAllCollapsed}
              className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {allCollapsed ? "Expand all" : "Collapse all"}
              <IconChevronDown
                width={14}
                height={14}
                className={`transition-transform ${allCollapsed ? "" : "rotate-180"}`}
              />
            </button>
          )}
        </div>

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
                        {yearPapers.length} {yearPapers.length === 1 ? "paper" : "papers"}
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
                      {yearPapers.map((p) => {
                        const isMarked = marked.has(p.code);
                        const isStarred = starred.has(p.code);
                        const variantDigit = p.variant % 10;
                        return (
                          <div
                            key={p.code}
                            className="flex flex-col gap-3 border-b border-border px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                              <IconFileText width={16} height={16} />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-2">
                                <span className="truncate text-sm font-medium text-text-primary">
                                  {SUBJECT_NAME} &ndash; {SUBJECT_LEVEL} &ndash; {p.session} {p.year}
                                </span>
                                <span className="shrink-0 rounded-full bg-badge-bg px-2 py-0.5 font-mono text-[11px] font-medium text-badge-text">
                                  P{p.paper}&middot;V{variantDigit}
                                </span>
                              </span>
                              <span className="mt-0.5 block truncate font-mono text-xs text-text-tertiary">
                                {SUBJECT_CODE} &middot; Cambridge &middot; {p.session} {p.year} &middot;{" "}
                                {p.marks} marks
                              </span>
                            </span>

                            <span className="flex shrink-0 items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleMarked(p.code)}
                                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                  isMarked
                                    ? "border-success bg-success-soft text-success"
                                    : "border-border text-text-secondary hover:border-border-strong hover:text-text-primary"
                                }`}
                              >
                                <span
                                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                                    isMarked ? "border-success bg-success text-white" : "border-border-strong"
                                  }`}
                                >
                                  {isMarked && <IconCheck width={9} height={9} strokeWidth={3} />}
                                </span>
                                Mark
                              </button>

                              <button
                                type="button"
                                onClick={() => toggleStarred(p.code)}
                                aria-label={isStarred ? "Remove from favorites" : "Add to favorites"}
                                aria-pressed={isStarred}
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                  isStarred
                                    ? "border-amber-300 bg-amber-50 text-amber-500"
                                    : "border-border text-text-tertiary hover:border-border-strong hover:text-text-primary"
                                }`}
                              >
                                <IconStar
                                  width={14}
                                  height={14}
                                  fill={isStarred ? "currentColor" : "none"}
                                />
                              </button>

                              <a
                                href={p.paperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
                              >
                                <IconDownload width={13} height={13} />
                                Paper
                              </a>

                              {p.markSchemeUrl ? (
                                <a
                                  href={p.markSchemeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:border-border-strong hover:bg-bg-subtle"
                                >
                                  Mark Scheme
                                </a>
                              ) : (
                                <span
                                  title="Mark scheme not published yet"
                                  className="flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-tertiary opacity-60"
                                >
                                  Mark Scheme
                                </span>
                              )}
                            </span>
                          </div>
                        );
                      })}
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
