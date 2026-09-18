import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Contact — CSwithToqeer",
  description: "Get in touch with CSwithToqeer.",
};

export default function Contact() {
  return (
    <div className="bg-hero-glow bg-grid">
      <Section className="text-center">
        <Reveal>
          <Eyebrow index="~" align="center">
            contact.send()
          </Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-md text-text-secondary">
            Want to start 1:1 sessions, have a question, or just want to say
            hi? I read everything myself.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 flex max-w-sm flex-col divide-y divide-border rounded-2xl border border-border bg-bg text-left shadow-sm">
            <a
              href="mailto:toqeer.94@gmail.com"
              className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-bg-subtle"
            >
              <span className="font-medium text-text-primary">Email</span>
              <span className="text-sm text-text-secondary">
                toqeer.94@gmail.com
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/toqeeri1/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-bg-subtle"
            >
              <span className="font-medium text-text-primary">LinkedIn</span>
              <span className="text-sm text-text-secondary">Connect →</span>
            </a>
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-medium text-text-primary">YouTube</span>
              <Badge>Coming Soon</Badge>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
