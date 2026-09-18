import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "About — CSwithToqeer",
  description:
    "Why I started CSwithToqeer, and what I'm doing today as a Software Engineer.",
};

export default function About() {
  return (
    <>
      <div className="bg-hero-glow bg-grid">
        <Section className="text-center">
          <Reveal>
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-2xl font-bold text-white">
              T
            </span>
            <Eyebrow index="~" align="center">
              whoami
            </Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              My Story
            </h1>
          </Reveal>
        </Section>
      </div>

      <Section subtle>
        <Reveal>
          <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-text-primary">
            <p>
              I didn&apos;t start out wanting to teach. I started out trying to
              understand Computer Science well enough for it to make sense —
              and somewhere in that process, I realized I liked helping other
              people get there too.
            </p>
            <p>
              Like a lot of students, I spent a fair amount of time memorizing
              answers before I actually understood the concepts behind them.
              It worked, in the sense that it got results on paper — but it
              didn&apos;t feel like knowing something. It felt like borrowing
              it until the exam was over.
            </p>
            <p>
              Later, working as a Software Engineer, I kept noticing the same
              pattern from the other side: the students and beginners who
              struggled weren&apos;t the ones who lacked ability. They were
              the ones who&apos;d never had a concept explained plainly
              enough to actually stick.
            </p>
            <p>
              CSwithToqeer started as an attempt to fix that — for Cambridge O
              Level Computer Science (0478) specifically, because it&apos;s the
              syllabus I know best and the one I wish had been taught
              differently when I was the one sitting the exam.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow index="01" align="left">
            today.status
          </Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            What I Do Today
          </h2>
          <span className="mt-6 inline-block rounded-full border border-border bg-bg-subtle px-4 py-2 text-sm font-medium text-text-secondary">
            Software Engineer
          </span>
          <p className="mt-4 max-w-xl text-text-secondary">
            Along the way, I&apos;ve also worked with tools like Webflow.
          </p>
        </Reveal>
      </Section>

      <Section subtle>
        <Reveal>
          <Eyebrow index="02" align="left">
            why.md
          </Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            Why I&apos;m Building This
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            I&apos;m not trying to replace teachers or turn this into a course
            marketplace. I want CSwithToqeer to be the place I would have
            pointed myself to as a student — clear explanations, built around
            what the exam actually asks, without anything extra in the way.
            It&apos;s early, and it&apos;s going to stay small and honest about
            what&apos;s actually ready.
          </p>
        </Reveal>
      </Section>

      <Section className="text-center">
        <Reveal>
          <ButtonLink href="/0478">
            See What&apos;s Ahead for 0478
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
