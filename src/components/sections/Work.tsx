import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { caseStudies } from "@/content/work";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Badge } from "../ui/Badge";
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
    <section id="work" className="py-24 sm:py-32 border-b border-border-subtle bg-surface-raised">
      <Container>
        <SectionHeader
          eyebrow={dict.work.eyebrow}
          heading={dict.work.heading}
          subheading={dict.work.subheading}
        />

        <div className="space-y-16 lg:space-y-24">
          {caseStudies.map((study, idx) => {
            const SchematicComponent = schematicMap[study.diagramType];
            const isReversed = idx % 2 === 1;

            return (
              <MotionWrapper key={study.id} delay={0.15}>
                <article
                  className="rounded-2xl glass-card-spatial bg-surface/90 p-8 sm:p-12 lg:p-14 shadow-sm"
                  aria-labelledby={`case-title-${study.id}`}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
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
                      {/* Badge & Index */}
                      <div className="flex items-center justify-between w-full mb-6">
                        <Badge variant="outline">{dict.work.badge}</Badge>
                        <span className="font-mono text-xs text-ink-muted/60 tracking-widest">
                          CASE 0{idx + 1}
                        </span>
                      </div>

                      {/* Title & Tagline */}
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

                      {/* Capabilities pills */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {study.capabilities[locale].map((cap, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2.5 py-1 text-xs font-mono rounded bg-surface-panel text-ink border border-border-subtle"
                          >
                            {cap}
                          </span>
                        ))}
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
