import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import {
  IconCap,
  IconBrain,
  IconRepeat,
  IconBinary,
  IconSignal,
  IconCpu,
  IconLayers,
  IconGlobe,
  IconRobot,
  IconFlow,
  IconCode,
  IconDatabase,
  IconLogicGate,
  IconTable,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Cambridge IGCSE / O Level Computer Science (0478) — CSwithToqeer",
  description:
    "What Cambridge IGCSE / O Level Computer Science (0478) actually covers, how the exam is structured, and what you'll eventually find on CSwithToqeer.",
};

const specs = [
  { label: "2 Papers", note: "Both compulsory" },
  { label: "10 Topics", note: "Across both papers" },
  { label: "150 Marks", note: "Total, both papers" },
  { label: "A*–G", note: "Grades available" },
];

const audience = [
  {
    icon: IconCap,
    title: "Studying at School",
    body: "Your school teaches 0478 — this fills the gaps and makes the parts that didn't click actually click.",
  },
  {
    icon: IconBrain,
    title: "Self-Teaching",
    body: "No school covering it, or studying independently? Everything here starts from zero, no assumptions.",
  },
  {
    icon: IconRepeat,
    title: "Retaking or Reviewing",
    body: "Already sat the exam once? Focus on exactly what went wrong last time, not the whole syllabus again.",
  },
];

const papers = [
  {
    code: "Paper 1",
    icon: IconCpu,
    title: "Computer Systems",
    marks: "75 marks",
    time: "1h 45m",
    weight: "50%",
    range: "Topics 1–6",
    note: "Short-answer and structured questions. All compulsory. No calculators.",
  },
  {
    code: "Paper 2",
    icon: IconCode,
    title: "Algorithms, Programming and Logic",
    marks: "75 marks",
    time: "1h 45m",
    weight: "50%",
    range: "Topics 7–10",
    note: "Includes a 15-mark scenario question in pseudocode, Python, Visual Basic, or Java.",
  },
];

const topics = [
  {
    paper: "Paper 1",
    items: [
      {
        n: "01",
        icon: IconBinary,
        title: "Data Representation",
        body: "Binary, hexadecimal, and how text, sound, and images all end up as 1s and 0s.",
      },
      {
        n: "02",
        icon: IconSignal,
        title: "Data Transmission",
        body: "Packets, error detection, and how data actually gets from one device to another.",
      },
      {
        n: "03",
        icon: IconCpu,
        title: "Hardware",
        body: "The CPU, the fetch–decode–execute cycle, storage — the parts that make a computer a computer.",
      },
      {
        n: "04",
        icon: IconLayers,
        title: "Software",
        body: "Operating systems, compilers vs interpreters, and what's actually running your code.",
      },
      {
        n: "05",
        icon: IconGlobe,
        title: "The Internet and its Uses",
        body: "URLs, HTTP, cookies, and the cyber security threats aimed at all of it.",
      },
      {
        n: "06",
        icon: IconRobot,
        title: "Automated & Emerging Technologies",
        body: "Robotics, AI, and automated systems — where the syllabus meets the future.",
      },
    ],
  },
  {
    paper: "Paper 2",
    items: [
      {
        n: "07",
        icon: IconFlow,
        title: "Algorithm Design & Problem-Solving",
        body: "Flowcharts, pseudocode, trace tables — breaking a problem down properly before coding it.",
      },
      {
        n: "08",
        icon: IconCode,
        title: "Programming",
        body: "Variables, loops, arrays, functions — the building blocks, in Cambridge's own pseudocode style.",
      },
      {
        n: "09",
        icon: IconDatabase,
        title: "Databases",
        body: "Single-table databases, primary keys, and enough SQL to actually query them.",
      },
      {
        n: "10",
        icon: IconLogicGate,
        title: "Boolean Logic",
        body: "AND, OR, NOT and friends — truth tables and logic circuits, built from scratch.",
      },
    ],
  },
];

const examSkills = [
  {
    icon: IconCode,
    text: "Cambridge's own pseudocode style (IF/ENDIF, FOR/NEXT, ← for assignment)",
  },
  {
    icon: IconFlow,
    text: "Standard flowchart symbols for algorithm design",
  },
  {
    icon: IconLogicGate,
    text: "Logic gate symbols and truth tables for Boolean logic",
  },
  {
    icon: IconTable,
    text: "Trace tables for dry-running an algorithm by hand",
  },
  {
    icon: IconDatabase,
    text: "Reading and completing SQL scripts for a single database table",
  },
];

export default function Syllabus0478() {
  return (
    <>
      <div className="bg-hero-glow bg-grid">
        <Section className="text-center">
          <Reveal>
            <Badge>0478</Badge>
            <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              Cambridge IGCSE Computer Science
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-text-tertiary">
              Officially, 0478 is the Cambridge IGCSE syllabus — most students
              and schools just call it &ldquo;O Level Computer Science.&rdquo;
              Cambridge treats IGCSE and O Level as sitting at the same
              level, so this page uses both names.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
              It&apos;s one of the most practical subjects on the syllabus —
              but it&apos;s often taught in a way that rewards memorizing
              past-paper answers over actually understanding how computers
              work. CSwithToqeer is built to fix that gap.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-bg/70 px-4 py-3 backdrop-blur"
                >
                  <p className="font-display text-lg font-semibold text-text-primary">
                    {s.label}
                  </p>
                  <p className="mt-0.5 text-xs text-text-tertiary">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>
      </div>

      <Section subtle>
        <Reveal>
          <Eyebrow index="01" align="left">
            who.match()
          </Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            Who It&apos;s For
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Students preparing for the 0478 exam — whether your school calls
            it IGCSE or O Level, studying with a school, self-teaching, or
            somewhere in between. No prior programming or Computer Science
            background is assumed — just a willingness to actually
            understand the material rather than just pass it.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {audience.map((a, index) => (
            <Reveal key={a.title} delay={index * 80}>
              <div className="h-full rounded-xl border border-border bg-bg p-5 transition-colors hover:border-accent/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <a.icon />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-text-primary">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-sm text-text-secondary">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow index="02" align="left">
            exam.config
          </Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            How the Exam Works
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Two written papers, each worth half the final grade. Both are
            externally assessed, and candidates are eligible for grades A*
            to G.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {papers.map((paper, index) => (
            <Reveal key={paper.code} delay={index * 80}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-bg p-6 transition-colors hover:border-accent/40">
                <span
                  className="pointer-events-none absolute -top-4 -right-1 font-display text-7xl font-bold text-bg-subtle transition-colors group-hover:text-accent-soft"
                  aria-hidden
                >
                  P{index + 1}
                </span>
                <div className="relative flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <paper.icon />
                  </div>
                  <Badge>{paper.weight}</Badge>
                </div>
                <p className="relative mt-4 font-mono text-xs text-accent">
                  {paper.code}
                </p>
                <h3 className="relative mt-1 text-lg font-semibold text-text-primary">
                  {paper.title}
                </h3>
                <div className="relative mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-tertiary">
                  <span>{paper.marks}</span>
                  <span>{paper.time}</span>
                  <span>{paper.range}</span>
                </div>
                <p className="relative mt-3 text-sm text-text-secondary">
                  {paper.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section subtle>
        <Reveal>
          <Eyebrow index="03" align="left">
            syllabus.json
          </Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            The Full Syllabus
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            All 10 topics from the 2026–2028 syllabus, grouped by paper.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {topics.map((group, groupIndex) => (
            <div key={group.paper}>
              <Reveal delay={groupIndex * 80}>
                <h3 className="font-mono text-sm font-semibold text-text-tertiary">
                  {group.paper}
                </h3>
              </Reveal>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {group.items.map((topic, index) => (
                  <Reveal key={topic.n} delay={groupIndex * 80 + index * 60}>
                    <div className="h-full rounded-xl border border-border bg-bg p-4 transition-colors hover:border-accent/40">
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                          <topic.icon />
                        </div>
                        <span className="font-mono text-xs text-text-tertiary">
                          {topic.n}
                        </span>
                      </div>
                      <h4 className="mt-3 text-sm font-semibold text-text-primary">
                        {topic.title}
                      </h4>
                      <p className="mt-1 text-sm text-text-secondary">
                        {topic.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow index="04" align="left">
            exam.skills
          </Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            Exam Skills You&apos;ll Actually Practice
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Beyond theory, 0478 has its own exact conventions for how you
            write answers — and examiners mark against them. That&apos;s the
            same pseudocode format, flowchart symbols, and logic gate
            notation you&apos;ll see used throughout this site.
          </p>
        </Reveal>
        <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {examSkills.map((item, index) => (
            <Reveal key={item.text} delay={index * 60}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-bg p-4 transition-colors hover:border-accent/40">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <item.icon />
                </span>
                <span className="text-sm text-text-secondary">
                  {item.text}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section subtle className="text-center">
        <Reveal>
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-hero-glow bg-grid p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-text-primary">
              Ready to start with 0478?
            </h2>
            <p className="mt-3 text-sm text-text-secondary">
              The topic-by-topic content library isn&apos;t built yet, but
              1:1 tutoring across this full syllabus is available right now.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact">Book a 1:1 Class</ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
