import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HeroVisual } from "@/components/HeroVisual";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FlowchartSteps } from "@/components/FlowchartSteps";
import { SyllabusTicker } from "@/components/SyllabusTicker";
import { Eyebrow } from "@/components/Eyebrow";
import {
  IconLightbulb,
  IconBrain,
  IconTarget,
  IconWrench,
  IconCheckCircle,
} from "@/components/Icons";

const whyItems = [
  {
    icon: IconLightbulb,
    title: "Simple Explanations",
    body: "Concepts explained the way I wish someone had explained them to me — plainly, and without assuming prior knowledge.",
  },
  {
    icon: IconBrain,
    title: "Real Understanding, Not Memorization",
    body: "You'll understand why an answer is correct, not just what to write.",
  },
  {
    icon: IconTarget,
    title: "Exam-Focused",
    body: "Built specifically around what your Cambridge syllabus actually asks — currently O Level (0478).",
  },
  {
    icon: IconWrench,
    title: "Interactive Tools (Coming Later)",
    body: "Practice questions, past papers, and hands-on tools — in progress.",
  },
];

const availableCourses = [
  {
    name: "Cambridge O Level Computer Science",
    note: "Also called IGCSE — syllabus 0478",
    href: "/0478",
  },
];

const futureCourses = ["AS Level Computer Science", "A2 Level Computer Science"];

const roadmap = [
  { name: "1:1 Tutoring", status: "live" as const },
  { name: "Website", status: "live" as const },
  { name: "Small-Group Classes", status: "soon" as const },
  { name: "Student Dashboard", status: "soon" as const },
  { name: "Practice Questions", status: "soon" as const },
  { name: "Past Papers", status: "soon" as const },
  { name: "CS Lab", status: "soon" as const },
  { name: "Exploring: AI-Assisted Practice", status: "later" as const },
];

export default function Home() {
  return (
    <>
      <div className="relative bg-hero-glow bg-grid">
        <Section className="pb-16 pt-8 sm:pb-24">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge>Cambridge Computer Science Tutoring</Badge>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                Understand Computer Science.{" "}
                <span className="text-gradient">Don&apos;t just memorize it.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-text-secondary">
                CSwithToqeer helps Cambridge Computer Science students build
                real understanding — starting with O Level / IGCSE (0478),
                with AS &amp; A2 Level courses on the way.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/contact">Book a 1:1 Class</ButtonLink>
                <ButtonLink href="#how-it-works" variant="secondary">
                  See How It Works
                </ButtonLink>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-text-secondary">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Built for Cambridge Computer Science
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  1:1 sessions open now
                </span>
              </div>
            </div>

            <HeroVisual />
          </div>
        </Section>
      </div>

      <SyllabusTicker />

      <Section subtle>
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-bg p-8 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-xl font-bold text-white">
              T
            </div>
            <div>
              <p className="text-lg text-text-primary">
                &ldquo;I&apos;m Toqeer — a Software Engineer who genuinely
                enjoys teaching Computer Science. I&apos;ve worked with tools
                like Webflow along the way. CSwithToqeer is where that
                overlap lives.&rdquo;
              </p>
              <Link
                href="/about"
                className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent-hover"
              >
                Read my story →
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="courses">
        <Reveal>
          <Eyebrow index="01">courses.json</Eyebrow>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight text-text-primary">
            What I Teach
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-text-secondary">
            Cambridge Computer Science, from O Level through A Level.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-bg p-6">
              <Badge tone="success">✓ Currently Available</Badge>
              <ul className="mt-5 space-y-4">
                {availableCourses.map((course) => (
                  <li key={course.name} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-success">
                      <IconCheckCircle />
                    </span>
                    <div>
                      <p className="font-semibold text-text-primary">
                        {course.name}
                      </p>
                      <p className="text-sm text-text-tertiary">
                        {course.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/0478"
                className="mt-6 inline-block text-sm font-semibold text-accent hover:text-accent-hover"
              >
                View Full Syllabus →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-2xl border border-dashed border-border bg-bg-subtle/50 p-6">
              <Badge>Future Courses</Badge>
              <ul className="mt-5 space-y-4">
                {futureCourses.map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-3 text-text-secondary"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-text-tertiary" />
                    {course}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-text-tertiary">
                Not open yet — planned once the O Level track is fully
                built out.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="how-it-works">
        <Reveal>
          <Eyebrow index="02">how-it-works.flow</Eyebrow>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight text-text-primary">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-text-secondary">
            A simple, repeatable method — drawn the way Cambridge Computer
            Science teaches you to think about algorithms.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-16 overflow-x-auto">
          <FlowchartSteps />
        </Reveal>
      </Section>

      <Section subtle>
        <Reveal>
          <Eyebrow index="03">why-cswithtoqeer.md</Eyebrow>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight text-text-primary">
            Why CSwithToqeer
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {whyItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-bg p-6 transition-colors hover:border-accent/40">
                <span
                  className="pointer-events-none absolute -top-3 right-3 font-display text-6xl font-bold text-bg-subtle transition-colors group-hover:text-accent-soft"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <item.icon />
                </div>
                <h3 className="relative mt-4 text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="relative mt-2 max-w-[85%] text-sm text-text-secondary">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow index="04">roadmap.json</Eyebrow>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight text-text-primary">
            What&apos;s Coming
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <ul className="mx-auto mt-12 max-w-xl divide-y divide-border rounded-2xl border border-border">
            {roadmap.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="text-text-primary">{item.name}</span>
                {item.status === "live" ? (
                  <Badge tone="success">✓ Live</Badge>
                ) : item.status === "later" ? (
                  <Badge>Later</Badge>
                ) : (
                  <Badge>Coming Soon</Badge>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section subtle>
        <Reveal>
          <Eyebrow index="05">faq.log</Eyebrow>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold tracking-tight text-text-primary">
            Frequently Asked
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <FaqAccordion />
        </Reveal>
      </Section>

      <Section id="start">
        <Reveal>
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-hero-glow bg-grid p-10 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-text-primary">
              Ready to start?
            </h2>
            <p className="mt-3 text-text-secondary">
              1:1 sessions are open now for Cambridge Computer Science,
              starting with O Level (0478). Reach out and we&apos;ll figure
              out a schedule that fits.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">Book a 1:1 Class</ButtonLink>
              <ButtonLink href="mailto:toqeer.94@gmail.com" variant="secondary">
                Email Directly
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-text-secondary">
              Pricing isn&apos;t public yet — message me and we&apos;ll sort
              out the details together.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
