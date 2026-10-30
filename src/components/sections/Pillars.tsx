import React from "react";
import Link from "next/link";
import { BrainCircuit, Bot, Cpu, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { pillars } from "@/content/pillars";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { MotionWrapper } from "../ui/MotionWrapper";

interface PillarsProps {
  locale: Locale;
  dict: Dictionary;
}

const iconMap = {
  BrainCircuit,
  Bot,
  Cpu,
  ShieldCheck,
};

export function Pillars({ locale, dict }: PillarsProps) {
  return (
    <section id="pillars" className="pt-6 sm:pt-10 lg:pt-14 pb-16 sm:pb-24 lg:py-32 border-b border-border-subtle bg-surface">
      <Container>
        <SectionHeader
          eyebrow={dict.pillars.eyebrow}
          heading={dict.pillars.heading}
          subheading={dict.pillars.subheading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = iconMap[pillar.iconName];
            return (
              <MotionWrapper key={pillar.id} delay={0.1 * idx}>
                <div className="group h-full flex flex-col p-6 sm:p-8 lg:p-10 rounded-xl glass-card-spatial bg-surface-raised/90">
                  {/* Icon, Heading in between, & Index */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-surface border border-border-subtle flex items-center justify-center text-ink shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                    </div>

                    <h3 className="flex-1 text-xl sm:text-2xl font-serif text-ink leading-snug group-hover:translate-x-0.5 transition-transform">
                      {pillar.title[locale]}
                    </h3>

                    <span className="font-mono text-xs text-ink-muted/60 tracking-widest shrink-0">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8 flex-1">
                    {pillar.summary[locale]}
                  </p>

                  {/* Capabilities List */}
                  <div className="pt-6 border-t border-border-subtle/80">
                    <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-3">
                      {dict.nav.pillars}
                    </span>
                    <ul className="space-y-2">
                      {pillar.capabilities[locale].map((cap, cIdx) => (
                        <li
                          key={cIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-muted"
                        >
                          <span className="w-1 h-1 rounded-full bg-ink mt-2 shrink-0" aria-hidden="true" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Read More / Explore Specification */}
                  <div className="mt-6 pt-4 border-t border-border-subtle/40 flex items-center justify-between">
                    <Link
                      href={`/${locale}/pillars/${pillar.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink hover:text-ink-muted transition-colors group/btn"
                    >
                      <span>{dict.pillars.readMore}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
