import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { caseStudies } from "@/content/work";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import { MotionWrapper } from "../ui/MotionWrapper";
import { RadarSchematic } from "../ui/RadarSchematic";
import { CopilotSchematic } from "../ui/CopilotSchematic";
import { AutonomousSchematic } from "../ui/AutonomousSchematic";

interface WorkProps {
  locale: Locale;
  dict: Dictionary;
}

const schematicMap = {
  radar: RadarSchematic,
  copilot: CopilotSchematic,
  autonomous: AutonomousSchematic,
};

export function Work({ locale, dict }: WorkProps) {
  return (
    <section id="work" className="py-14 sm:py-24 lg:py-32 border-b border-border-subtle bg-surface-raised">
      <Container>
        <SectionHeader
          eyebrow={dict.work.eyebrow}
          heading={dict.work.heading}
          subheading={dict.work.subheading}
        />

        <div className="space-y-8 sm:space-y-14 lg:space-y-20">
          {caseStudies.map((study, idx) => {
            const SchematicComponent = schematicMap[study.diagramType];
            const isReversed = idx % 2 === 1;

            return (
              <MotionWrapper key={study.id} delay={0.15}>
                <article
                  className="rounded-2xl glass-card-spatial bg-surface/90 p-6 sm:p-10 lg:p-14 shadow-sm"
                  aria-labelledby={`case-title-${study.id}`}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center ${
                      isReversed ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Schematic Visualization */}
                    <div
                      className={`lg:col-span-6 w-full ${
                        isReversed ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <SchematicComponent />
                    </div>

                    {/* Content Details */}
                    <div
                      className={`lg:col-span-6 flex flex-col items-start ${
                        isReversed ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      {/* Case Index */}
                      <div className="mb-2">
                        <span className="font-mono text-xs text-ink-muted/70 tracking-widest uppercase">
                          CASE 0{idx + 1}
                        </span>
                      </div>

                      {/* Title & Tagline (Moved Up) */}
                      <h3
                        id={`case-title-${study.id}`}
                        className="text-2xl sm:text-3xl lg:text-4xl font-serif text-ink mb-3 leading-snug"
                      >
                        <Link
                          href={`/${locale}/work/${study.slug}`}
                          className="hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                        >
                          {study.title[locale]}
                        </Link>
                      </h3>

                      <p className="text-sm sm:text-base font-mono text-ink-muted mb-6">
                        {study.tagline[locale]}
                      </p>

                      <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">
                        {study.summary[locale]}
                      </p>

                      {/* Capabilities */}
                      <div className="text-xs font-mono text-ink-muted mb-8 tracking-wider">
                        {study.capabilities[locale].join("  ·  ")}
                      </div>

                      {/* Action */}
                      <Button
                        href={`/${locale}/work/${study.slug}`}
                        variant="primary"
                        size="md"
                        icon={<ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />}
                      >
                        {dict.work.viewDetails}
                      </Button>
                    </div>
                  </div>
                </article>
              </MotionWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
