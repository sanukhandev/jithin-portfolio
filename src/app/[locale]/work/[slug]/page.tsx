import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Locale } from "@/types/content";
import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { caseStudies } from "@/content/work";
import { constructMetadata } from "@/lib/seo";
import { getTechArticleStructuredData, getBreadcrumbStructuredData } from "@/lib/structured-data";
import { Container } from "@/components/ui/Container";
import { SCHEMATIC_COMPONENTS } from "@/components/ui/schematics";
import { JsonLd } from "@/components/seo/JsonLd";


interface WorkDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}







export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const study of caseStudies) {
      params.push({ locale, slug: study.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  return constructMetadata({
    locale,
    title: study.title[locale],
    description: study.summary[locale],
    path: `/${locale}/work/${slug}`,
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const SchematicComponent = SCHEMATIC_COMPONENTS[study.diagramType];

  const articleSchema = getTechArticleStructuredData({
    locale,
    title: study.title[locale],
    description: study.summary[locale],
    path: `/work/${study.slug}`,
  });

  const breadcrumbSchema = getBreadcrumbStructuredData({
    locale,
    items: [
      { name: dict.nav.work, path: "" },
      { name: study.title[locale], path: `/work/${study.slug}` },
    ],
  });

  return (
    <article className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-surface">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/${locale}#work`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>{dict.work.backToWork}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="mb-3">
            <span className="font-mono text-xs text-ink-muted/70 tracking-widest uppercase">
              CONCEPT ARCHITECTURE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-ink tracking-tight font-normal leading-[1.1] mb-6">
            {study.title[locale]}
          </h1>

          <p className="text-lg sm:text-xl text-ink-muted font-sans font-light leading-relaxed max-w-3xl">
            {study.tagline[locale]}
          </p>
        </div>

        {/* Schematic Visualization */}
        <div className="mb-16 sm:mb-20">
          <SchematicComponent />
        </div>

        {/* Architectural Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Narrative Breakdown */}
          <div className="lg:col-span-8 space-y-12">
            {/* Executive Summary */}
            <section aria-labelledby="summary-heading">
              <h2
                id="summary-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
              >
                Executive Overview
              </h2>
              <p className="text-base sm:text-lg text-ink leading-relaxed">
                {study.summary[locale]}
              </p>
            </section>

            {/* Strategic Challenge */}
            <section aria-labelledby="challenge-heading">
              <h2
                id="challenge-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
              >
                {dict.work.challenge}
              </h2>
              <div className="p-6 rounded-xl bg-surface-raised border border-border-subtle">
                <p className="text-sm sm:text-base text-ink leading-relaxed">
                  {study.challenge[locale]}
                </p>
              </div>
            </section>

            {/* Architectural Approach */}
            <section aria-labelledby="approach-heading">
              <h2
                id="approach-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
              >
                {dict.work.approach}
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {study.approach[locale]}
              </p>
            </section>

            {/* Systems Architecture */}
            <section aria-labelledby="arch-heading">
              <h2
                id="arch-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
              >
                {dict.work.architecture}
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {study.architecture[locale]}
              </p>
            </section>

            {/* Targeted Outcomes */}
            <section aria-labelledby="outcomes-heading">
              <h2
                id="outcomes-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
              >
                {dict.work.targetOutcomes}
              </h2>
              <div className="space-y-3">
                {study.targetOutcomes[locale].map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg bg-surface-raised border border-border-subtle/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-ink mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-ink font-sans">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Metadata & Capabilities */}
          <div className="lg:col-span-4 space-y-8">
            {/* Capabilities Box */}
            <div className="p-6 rounded-xl glass-card-spatial bg-surface-raised/90">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-4">
                Core Domains &amp; Capabilities
              </span>
              <div className="text-xs font-mono text-ink-muted leading-relaxed tracking-wide">
                {study.capabilities[locale].join("  ·  ")}
              </div>
            </div>

            {/* Concept Disclaimer Box */}
            <div className="p-6 rounded-xl glass-card-spatial bg-surface/90">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-2">
                {dict.work.badge}
              </span>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                {dict.work.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
