import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BrainCircuit,
  Bot,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Locale } from "@/types/content";
import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pillars } from "@/content/pillars";
import { constructMetadata } from "@/lib/seo";
import {
  getTechArticleStructuredData,
  getBreadcrumbStructuredData,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface PillarDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const iconMap = {
  BrainCircuit,
  Bot,
  Cpu,
  ShieldCheck,
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const pillar of pillars) {
      params.push({ locale, slug: pillar.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PillarDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const pillar = pillars.find((p) => p.slug === slug);
  if (!pillar) return {};

  return constructMetadata({
    locale,
    title: `${pillar.title[locale]} — Strategic Architecture`,
    description: pillar.description ? pillar.description[locale] : pillar.summary[locale],
    path: `/${locale}/pillars/${slug}`,
  });
}

export default async function PillarDetailPage({
  params,
}: PillarDetailPageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const pillar = pillars.find((p) => p.slug === slug);

  if (!pillar) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const Icon = iconMap[pillar.iconName];
  const pillarIdx = pillars.findIndex((p) => p.slug === slug) + 1;

  const articleSchema = getTechArticleStructuredData({
    locale,
    title: pillar.title[locale],
    description: pillar.description ? pillar.description[locale] : pillar.summary[locale],
    path: `/pillars/${pillar.slug}`,
  });

  const breadcrumbSchema = getBreadcrumbStructuredData({
    locale,
    items: [
      { name: dict.nav.pillars, path: "" },
      { name: pillar.title[locale], path: `/pillars/${pillar.slug}` },
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
            href={`/${locale}#pillars`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>{dict.pillars.backToPillars}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center text-ink shrink-0">
              <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <span className="font-mono text-xs text-ink-muted tracking-widest uppercase">
              PILLAR 0{pillarIdx} · {dict.pillars.eyebrow}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-ink tracking-tight font-normal leading-[1.1] mb-6">
            {pillar.title[locale]}
          </h1>

          <p className="text-lg sm:text-xl text-ink-muted font-sans font-light leading-relaxed max-w-3xl">
            {pillar.summary[locale]}
          </p>
        </div>

        {/* Pillar Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Narrative & Deliverables */}
          <div className="lg:col-span-8 space-y-12">
            {/* Architectural Overview */}
            {pillar.description && (
              <section aria-labelledby="overview-heading">
                <h2
                  id="overview-heading"
                  className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
                >
                  Executive Specification
                </h2>
                <div className="p-6 sm:p-8 rounded-2xl bg-surface-raised border border-border-subtle">
                  <p className="text-base sm:text-lg text-ink leading-relaxed font-sans">
                    {pillar.description[locale]}
                  </p>
                </div>
              </section>
            )}

            {/* Strategic Framework */}
            {pillar.framework && (
              <section aria-labelledby="framework-heading">
                <h2
                  id="framework-heading"
                  className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
                >
                  {dict.pillars.frameworkHeading}
                </h2>
                <div className="p-6 rounded-xl glass-card-spatial bg-surface-raised/90">
                  <span className="text-sm sm:text-base font-serif text-ink leading-snug">
                    {pillar.framework[locale]}
                  </span>
                </div>
              </section>
            )}

            {/* Key Deliverables */}
            {pillar.deliverables && (
              <section aria-labelledby="deliverables-heading">
                <h2
                  id="deliverables-heading"
                  className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
                >
                  {dict.pillars.deliverablesHeading}
                </h2>
                <div className="space-y-3">
                  {pillar.deliverables[locale].map((deliverable, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-3 p-4 rounded-lg bg-surface-raised border border-border-subtle/80"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-ink mt-0.5 shrink-0"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm text-ink font-sans">
                        {deliverable}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Capabilities & CTA */}
          <div className="lg:col-span-4 space-y-8">
            {/* Capabilities Box */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card-spatial bg-surface-raised/90">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-4">
                {dict.pillars.capabilitiesHeading}
              </span>
              <ul className="space-y-3">
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

            {/* Direct Executive Inquiry */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card-spatial bg-surface/90">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-2">
                Executive Advisory
              </span>
              <p className="text-xs text-ink-muted leading-relaxed font-sans mb-6">
                Connect directly regarding organizational adoption, technical specifications, and enterprise readiness for this strategic pillar.
              </p>
              <Button
                href={`/${locale}#contact`}
                variant="primary"
                size="sm"
                icon={<ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />}
              >
                Initiate Inquiry
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
