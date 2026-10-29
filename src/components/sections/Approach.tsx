import React from "react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { approachStages } from "@/content/approach";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { MotionWrapper } from "../ui/MotionWrapper";

interface ApproachProps {
  locale: Locale;
  dict: Dictionary;
}

export function Approach({ locale, dict }: ApproachProps) {
  return (
    <section id="approach" className="py-24 sm:py-32 border-b border-border-subtle bg-surface">
      <Container>
        <SectionHeader
          eyebrow={dict.approach.eyebrow}
          heading={dict.approach.heading}
          subheading={dict.approach.subheading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approachStages.map((stage, idx) => (
            <MotionWrapper key={stage.step} delay={0.1 * idx}>
              <div className="h-full flex flex-col p-6 sm:p-8 rounded-xl glass-card-spatial bg-surface-raised/90">
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-light text-ink tracking-tight">
                    {stage.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-ink/30" aria-hidden="true" />
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-xl font-serif text-ink mb-1">
                  {stage.title[locale]}
                </h3>
                <p className="text-xs font-mono text-ink-muted mb-4 uppercase tracking-wider">
                  {stage.subtitle[locale]}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6 flex-1">
                  {stage.description[locale]}
                </p>

                {/* Inputs & Outputs & Decision Gate */}
                <div className="space-y-3 pt-6 border-t border-border-subtle/80 text-xs font-mono">
                  <div>
                    <span className="text-ink font-semibold block mb-0.5">
                      {dict.approach.inputs}:
                    </span>
                    <span className="text-ink-muted leading-normal block font-sans">
                      {stage.inputs[locale]}
                    </span>
                  </div>
                  <div>
                    <span className="text-ink font-semibold block mb-0.5">
                      {dict.approach.outputs}:
                    </span>
                    <span className="text-ink-muted leading-normal block font-sans">
                      {stage.outputs[locale]}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border-subtle/50">
                    <span className="text-ink font-semibold block mb-0.5">
                      {dict.approach.decisionGate}:
                    </span>
                    <span className="text-ink-muted leading-normal block font-sans">
                      {stage.decisionGate[locale]}
                    </span>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
