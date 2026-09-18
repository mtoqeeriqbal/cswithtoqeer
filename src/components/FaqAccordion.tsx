"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is CSwithToqeer free?",
    a: "The website itself is free — explanations, syllabus breakdowns, and everything you can browse here. 1:1 tutoring is a separate paid service; pricing is still being finalized, so get in touch for current rates.",
  },
  {
    q: "What syllabus does this cover?",
    a: "Right now, Cambridge IGCSE Computer Science, syllabus code 0478 — often called \"O Level Computer Science\" too, since they sit at the same level. AS and A2 Level Computer Science are planned next, once the O Level track is fully built out.",
  },
  {
    q: "Do I need prior programming experience?",
    a: "No. The material is written for students starting from zero, with no assumed background in programming or Computer Science.",
  },
  {
    q: "Do you offer group classes?",
    a: "Not yet. 1:1 sessions are open now; small-group classes are planned as a lower-cost option once the curriculum is further along. Get in touch if you'd want to be considered for the first group.",
  },
  {
    q: "When do practice questions and past papers go live?",
    a: "They're actively being built — no set date yet, and nothing is promised before it's actually done. Reach out and I'll let you know personally when they're ready.",
  },
  {
    q: "Who's actually behind this?",
    a: "Just one person — Toqeer, a Software Engineer who also teaches CS. No team, no marketing department, just direct answers to your questions.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-12 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-bg">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-text-primary">{item.q}</span>
              <span
                className={`shrink-0 text-xl leading-none text-accent transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-text-secondary">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
