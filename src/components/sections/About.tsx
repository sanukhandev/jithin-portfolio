import React from "react";
import { Dictionary } from "@/i18n/dictionaries";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { MotionWrapper } from "../ui/MotionWrapper";

interface AboutProps {
  dict: Dictionary;
}

export function About({ dict }: AboutProps) {
  return (
    <section id="about" className="py-24 sm:py-32 border-b border-border-subtle bg-surface">
      <Container>
        <SectionHeader
          eyebrow={dict.about.eyebrow}
          heading={dict.about.heading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Executive Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <MotionWrapper delay={0.1}>
              <p className="text-xl sm:text-2xl font-serif text-ink leading-relaxed font-normal">
                {dict.about.lead}
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
                {dict.about.p1}
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
                {dict.about.p2}
              </p>
            </MotionWrapper>
          </div>

          {/* Core Leadership Principles */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <MotionWrapper delay={0.25}>
              <div className="p-8 sm:p-10 rounded-2xl border border-border-subtle bg-surface-raised">
                <span className="block text-xs font-mono uppercase tracking-widest text-ink-muted mb-6">
                  {dict.about.principlesHeading}
                </span>

                <div className="space-y-6">
                  {dict.about.principles.map((principle, idx) => (
                    <div key={idx} className="pb-5 border-b border-border-subtle last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs text-ink-muted/70">
                          0{idx + 1}
                        </span>
                        <h4 className="text-base font-serif text-ink font-medium">
                          {principle.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-ink-muted leading-normal ps-6">
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </Container>
    </section>
  );
}
