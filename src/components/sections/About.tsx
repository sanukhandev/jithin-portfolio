import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { MotionWrapper } from "../ui/MotionWrapper";
import { Button } from "../ui/Button";

interface AboutProps {
  locale: Locale;
  dict: Dictionary;
}

export function About({ locale, dict }: AboutProps) {
  return (
    <section id="about" className="py-24 sm:py-32 border-b border-border-subtle bg-surface">
      <Container>
        <SectionHeader
          eyebrow={dict.about.eyebrow}
          heading={dict.about.heading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Executive Narrative & Contact Card */}
          <div className="lg:col-span-7 space-y-6">
            <MotionWrapper delay={0.1}>
              <p className="text-xl sm:text-2xl font-sans text-ink leading-relaxed font-normal">
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

            {/* Executive Contact Card to fill the section gap */}
            <MotionWrapper delay={0.35}>
              <div className="mt-8 p-8 sm:p-10 rounded-2xl glass-card-spatial bg-surface-raised/90">
                <h3 className="text-xl sm:text-2xl font-serif text-ink mb-3 leading-snug">
                  {dict.about.contactCard.heading}
                </h3>

                <p className="text-sm sm:text-base text-ink-muted font-sans leading-relaxed mb-6 max-w-xl">
                  {dict.about.contactCard.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border-subtle/80">
                  <div className="flex flex-wrap gap-2">
                    {dict.about.contactCard.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 text-xs font-mono rounded-md glass-pill-spatial bg-surface-panel/85 text-ink border border-border-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    href={`/${locale}#contact`}
                    variant="primary"
                    size="md"
                    icon={<ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />}
                  >
                    {dict.about.contactCard.cta}
                  </Button>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Core Leadership Principles */}
          <div className="lg:col-span-5">
            <MotionWrapper delay={0.25}>
              <div className="p-8 sm:p-10 rounded-2xl glass-card-spatial bg-surface-raised/90">
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
                        <h4 className="text-base font-sans text-ink font-semibold">
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
