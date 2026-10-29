import React from "react";
import { Compass, ShieldCheck, Layers, TrendingUp, CheckCircle2 } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { approachStages } from "@/content/approach";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { MotionWrapper } from "../ui/MotionWrapper";
import { Badge } from "../ui/Badge";

interface ApproachProps {
  locale: Locale;
  dict: Dictionary;
}

const STAGE_CONFIG = [
  {
    icon: Compass,
    badge: "PHASE I · DIAGNOSTIC",
    span: "lg:col-span-7",
    offset: "lg:translate-y-0",
    isWide: true,
  },
  {
    icon: ShieldCheck,
    badge: "PHASE II · SANDBOX",
    span: "lg:col-span-5",
    offset: "lg:translate-y-8",
    isWide: false,
  },
  {
    icon: Layers,
    badge: "PHASE III · BLUEPRINT",
    span: "lg:col-span-5",
    offset: "lg:-translate-y-4",
    isWide: false,
  },
  {
    icon: TrendingUp,
    badge: "PHASE IV · PRODUCTION",
    span: "lg:col-span-7",
    offset: "lg:translate-y-4",
    isWide: true,
  },
];

export function Approach({ locale, dict }: ApproachProps) {
  return (
    <section id="approach" className="py-24 sm:py-32 border-b border-border-subtle bg-surface">
      <Container>
        <SectionHeader
          eyebrow={dict.approach.eyebrow}
          heading={dict.approach.heading}
          subheading={dict.approach.subheading}
        />

        {/* Assorted Bento Collage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {approachStages.map((stage, idx) => {
            const config = STAGE_CONFIG[idx] || STAGE_CONFIG[0];
            const Icon = config.icon;
            const isWide = config.isWide;

            return (
              <div key={stage.step} className={`${config.span} ${config.offset} transition-transform`}>
                <MotionWrapper delay={0.12 * idx}>
                  <div className="h-full flex flex-col p-7 sm:p-9 lg:p-10 rounded-2xl glass-card-spatial bg-surface-raised/90">
                    {/* Top Collage Header */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-ink shrink-0">
                          <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <Badge variant="subtle">{config.badge}</Badge>
                      </div>

                      <span className="font-mono text-3xl sm:text-4xl font-light text-ink/75 tracking-tight">
                        {stage.step}
                      </span>
                    </div>

                    {/* Stage Title and Subtitle */}
                    <h3 className={`font-serif text-ink mb-1.5 leading-snug ${isWide ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
                      {stage.title[locale]}
                    </h3>
                    <p className="text-xs font-mono text-ink-muted mb-4 uppercase tracking-wider">
                      {stage.subtitle[locale]}
                    </p>

                    {/* Stage Executive Narrative */}
                    <p className={`text-ink-muted font-sans leading-relaxed mb-6 flex-1 ${isWide ? "text-sm sm:text-base max-w-2xl" : "text-xs sm:text-sm"}`}>
                      {stage.description[locale]}
                    </p>

                    {/* Inputs & Outputs (2-column on wide cards, stacked on compact cards) */}
                    <div
                      className={`pt-6 border-t border-border-subtle/80 text-xs font-mono ${
                        isWide ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : "space-y-4"
                      }`}
                    >
                      <div>
                        <span className="text-ink font-semibold block uppercase tracking-wider mb-1">
                          {dict.approach.inputs}:
                        </span>
                        <span className="text-ink-muted leading-relaxed block font-sans">
                          {stage.inputs[locale]}
                        </span>
                      </div>

                      <div>
                        <span className="text-ink font-semibold block uppercase tracking-wider mb-1">
                          {dict.approach.outputs}:
                        </span>
                        <span className="text-ink-muted leading-relaxed block font-sans">
                          {stage.outputs[locale]}
                        </span>
                      </div>
                    </div>

                    {/* Decision Gate Architectural Milestone Banner */}
                    <div className="mt-6 pt-4 border-t border-border-subtle/70">
                      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-surface/70 border border-border-subtle/70">
                        <CheckCircle2 className="w-4 h-4 text-ink shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
                        <div>
                          <span className="font-mono text-[11px] font-semibold text-ink uppercase tracking-wider block mb-0.5">
                            {dict.approach.decisionGate}
                          </span>
                          <p className="text-xs text-ink-muted font-sans leading-relaxed">
                            {stage.decisionGate[locale]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionWrapper>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
