import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { PastPapersFilter } from "@/components/PastPapersFilter";
import { pastPapers0478 } from "@/data/pastPapers0478";

export const metadata: Metadata = {
  title: "Past Papers — Cambridge IGCSE / O Level Computer Science (0478) — CSwithToqeer",
  description:
    "Filter and download Cambridge IGCSE / O Level Computer Science (0478) past papers by year, session, paper, and document type.",
};

export default function PastPapers0478() {
  return (
    <>
      <div className="bg-hero-glow bg-grid">
        <Section className="text-center">
          <Reveal>
            <Badge>0478</Badge>
            <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              Past Papers
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
              Cambridge IGCSE / O Level Computer Science (0478) question
              papers and mark schemes, filterable by year, session, paper,
              and type — every variant included, so you can practice all of
              them.
            </p>
          </Reveal>
        </Section>
      </div>

      <Section subtle>
        <Reveal>
          <Eyebrow index="01" align="left">
            papers.filter()
          </Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            Browse the Archive
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Narrow down by any combination of filters, or leave them all on
            &ldquo;all&rdquo; to see everything available.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10">
            <PastPapersFilter papers={pastPapers0478} />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
