import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Locale } from "@/types/content";
import { Dictionary } from "@/i18n/dictionaries";
import { insights } from "@/content/insights";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Badge } from "../ui/Badge";
import { MotionWrapper } from "../ui/MotionWrapper";

interface InsightsProps {
  locale: Locale;
  dict: Dictionary;
}

export function Insights({ locale, dict }: InsightsProps) {
  return (
    <section id="insights" className="py-24 sm:py-32 border-b border-border-subtle bg-surface-raised">
      <Container>
        <SectionHeader
          eyebrow={dict.insights.eyebrow}
          heading={dict.insights.heading}
          subheading={dict.insights.subheading}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((article, idx) => (
            <MotionWrapper key={article.id} delay={0.1 * idx}>
              <article className="h-full flex flex-col p-8 rounded-xl glass-card-spatial bg-surface/90">
                {/* Meta info & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="subtle">{dict.insights.badge}</Badge>
                  <span className="text-xs font-mono text-ink-muted">
                    {article.readTime[locale]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-ink mb-4 leading-snug">
                  <Link
                    href={`/${locale}/insights/${article.slug}`}
                    className="hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                  >
                    {article.title[locale]}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-ink-muted leading-relaxed mb-6 flex-1">
                  {article.excerpt[locale]}
                </p>

                {/* Topics & Read Action */}
                <div className="pt-6 border-t border-border-subtle flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.topics[locale].slice(0, 2).map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono uppercase tracking-wider text-ink-muted/80"
                      >
                        {topic}
                        {tIdx < 1 ? " ·" : ""}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium text-ink hover:opacity-75 transition-opacity"
                    aria-label={`${dict.insights.readArticle}: ${article.title[locale]}`}
                  >
                    <span>{dict.insights.readArticle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </Container>
    </section>
  );
}
