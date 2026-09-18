"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Badge } from "./Badge";
import { IconChevronDown } from "./Icons";

const courses = [
  {
    name: "O Level Computer Science",
    note: "0478 / IGCSE",
    href: "/0478",
    status: "live" as const,
  },
  { name: "AS Level Computer Science", status: "soon" as const },
  { name: "A2 Level Computer Science", status: "soon" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const pathname = usePathname();
  const coursesRef = useRef<HTMLLIElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  function openCourses() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setCoursesOpen(true);
  }

  function scheduleCoursesClose() {
    closeTimeoutRef.current = setTimeout(() => setCoursesOpen(false), 150);
  }

  useEffect(() => {
    if (!coursesOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (coursesRef.current && !coursesRef.current.contains(e.target as Node)) {
        setCoursesOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setCoursesOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [coursesOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-border bg-bg/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-text-primary"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-white">
            &lt;/&gt;
          </span>
          CSwithToqeer
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          <li>
            <Link
              href="/"
              className={`transition-colors hover:text-text-primary ${
                pathname === "/" ? "text-text-primary" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`transition-colors hover:text-text-primary ${
                pathname === "/about" ? "text-text-primary" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li
            className="relative"
            ref={coursesRef}
            onMouseEnter={openCourses}
            onMouseLeave={scheduleCoursesClose}
          >
            <button
              type="button"
              onClick={() => setCoursesOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={coursesOpen}
              className={`flex items-center gap-1 transition-colors hover:text-text-primary ${
                pathname === "/0478" ? "text-text-primary" : ""
              }`}
            >
              Courses
              <IconChevronDown
                width={14}
                height={14}
                strokeWidth={2}
                className={`transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {coursesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 rounded-xl border border-border bg-bg p-2 shadow-xl">
                {courses.map((course) =>
                  course.status === "live" ? (
                    <Link
                      key={course.name}
                      href={course.href}
                      onClick={() => setCoursesOpen(false)}
                      className="flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-bg-subtle"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-text-primary">
                          {course.name}
                        </span>
                        <span className="mt-0.5 block font-mono text-xs text-text-tertiary">
                          {course.note}
                        </span>
                      </span>
                      <Badge tone="success">✓ Live</Badge>
                    </Link>
                  ) : (
                    <div
                      key={course.name}
                      className="flex items-center gap-4 rounded-lg px-3 py-3 opacity-60"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
                        {course.name}
                      </span>
                      <Badge>Coming Soon</Badge>
                    </div>
                  ),
                )}
              </div>
            )}
          </li>
          <li>
            <Link
              href="/0478/past-papers"
              className={`transition-colors hover:text-text-primary ${
                pathname === "/0478/past-papers" ? "text-text-primary" : ""
              }`}
            >
              Past Papers
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`transition-colors hover:text-text-primary ${
                pathname === "/contact" ? "text-text-primary" : ""
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Book a 1:1 Class
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-border bg-bg px-6 py-4 text-sm font-medium text-text-secondary md:hidden">
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block py-2 hover:text-text-primary"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="block py-2 hover:text-text-primary"
            >
              About
            </Link>
          </li>
          <li className="py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
              Courses
            </p>
            <ul className="mt-2 space-y-1">
              {courses.map((course) =>
                course.status === "live" ? (
                  <li key={course.name}>
                    <Link
                      href={course.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 py-1.5 text-text-primary"
                    >
                      <span className="min-w-0 flex-1 truncate">{course.name}</span>
                      <Badge tone="success">✓ Live</Badge>
                    </Link>
                  </li>
                ) : (
                  <li
                    key={course.name}
                    className="flex items-center gap-3 py-1.5 opacity-60"
                  >
                    <span className="min-w-0 flex-1 truncate">{course.name}</span>
                    <Badge>Coming Soon</Badge>
                  </li>
                ),
              )}
            </ul>
          </li>
          <li>
            <Link
              href="/0478/past-papers"
              onClick={() => setOpen(false)}
              className="block py-2 hover:text-text-primary"
            >
              Past Papers
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block py-2 hover:text-text-primary"
            >
              Contact
            </Link>
          </li>
          <li className="pt-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-accent px-4 py-2.5 text-center font-semibold text-white"
            >
              Book a 1:1 Class
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
