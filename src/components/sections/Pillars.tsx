import React from "react";
import { BrainCircuit, Bot, Cpu, ShieldCheck } from "lucide-react";
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
    <section id="pillars" className="py-24 sm:py-32 border-b border-border-subtle bg-surface">
      <Container>
        <SectionHeader
          eyebrow={dict.pillars.eyebrow}
          heading={dict.pillars.heading}
          subheading={dict.pillars.subheading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = iconMap[pillar.iconName];
            return (
              <MotionWrapper key={pillar.id} delay={0.1 * idx}>
                <div className="group h-full flex flex-col p-8 sm:p-10 rounded-xl border border-border-subtle bg-surface-raised hover:border-border-strong hover:bg-surface transition-all duration-300">
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-lg bg-surface border border-border-subtle flex items-center justify-center text-ink group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-ink-muted/60 tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-xl sm:text-2xl font-serif text-ink mb-4 group-hover:translate-x-0.5 transition-transform">
                    {pillar.title[locale]}
                  </h3>
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
                </div>
              </MotionWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
