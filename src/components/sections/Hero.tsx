import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, MessageSquare } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/content/site";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { DotAiMatrix } from "../ui/DotAiMatrix";
import { MotionWrapper } from "../ui/MotionWrapper";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 overflow-hidden border-b border-border-subtle"
      aria-labelledby="hero-title"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <MotionWrapper delay={0.1}>
              <h1
                id="hero-title"
                className="text-4xl sm:text-6xl lg:text-7xl font-serif text-ink font-normal tracking-tight leading-[1.08] mb-6 sm:mb-8"
              >
                {dict.hero.title}
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <p className="text-lg sm:text-xl lg:text-2xl text-ink-muted font-sans font-normal leading-relaxed max-w-2xl mb-10">
                {dict.hero.body}
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href={`/${locale}#work`}
                  variant="secondary"
                  size="lg"
                  icon={<ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />}
                >
                  {dict.hero.ctaPrimary}
                </Button>
                <Link
                  href={`/${locale}#contact`}
                  className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-ink underline underline-offset-8 decoration-border-strong hover:decoration-ink hover:opacity-85 transition-all duration-200 px-2 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                >
                  <span>{dict.hero.ctaSecondary}</span>
                  <MessageSquare className="w-4 h-4 text-ink shrink-0 transition-transform duration-200 group-hover:scale-110" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            </MotionWrapper>
          </div>

          {/* Dot-Based AI Featured Animation (Framer Motion) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <MotionWrapper delay={0.25} direction="none" className="w-full">
              <DotAiMatrix />
            </MotionWrapper>
          </div>
        </div>

        {/* Scroll indicator prompt */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-border-subtle/50 flex items-center justify-between text-xs font-mono text-ink-muted">
          <div className="flex items-center gap-2">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" strokeWidth={1.5} aria-hidden="true" />
            <span>{dict.hero.scrollPrompt}</span>
          </div>
          <span className="hidden sm:inline-block uppercase tracking-widest text-ink-muted/80">
            {siteConfig.company.presence}
          </span>
        </div>
      </Container>
    </section>
  );
}
