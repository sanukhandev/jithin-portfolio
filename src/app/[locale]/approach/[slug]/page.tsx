import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Compass,
  ShieldCheck,
  Layers,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Locale } from "@/types/content";
import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { approachStages } from "@/content/approach";
import { constructMetadata } from "@/lib/seo";
import {
  getTechArticleStructuredData,
  getBreadcrumbStructuredData,
} from "@/lib/structured-data";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface ApproachDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const STAGE_ICONS: Record<string, typeof Compass> = {
  "01": Compass,
  "02": ShieldCheck,
  "03": Layers,
  "04": TrendingUp,
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const stage of approachStages) {
      params.push({ locale, slug: stage.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: ApproachDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const stage = approachStages.find((s) => s.slug === slug);
  if (!stage) return {};

  return constructMetadata({
    locale,
    title: `${stage.title[locale]} (${stage.subtitle[locale]}) — Operating Methodology`,
    description: stage.description[locale],
    path: `/${locale}/approach/${slug}`,
  });
}

export default async function ApproachDetailPage({
  params,
}: ApproachDetailPageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const stage = approachStages.find((s) => s.slug === slug);

  if (!stage) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const Icon = STAGE_ICONS[stage.step] || Compass;

  const articleSchema = getTechArticleStructuredData({
    locale,
    title: `${stage.title[locale]} — ${stage.subtitle[locale]}`,
    description: stage.description[locale],
    path: `/approach/${stage.slug}`,
  });

  const breadcrumbSchema = getBreadcrumbStructuredData({
    locale,
    items: [
      { name: dict.nav.approach, path: "#approach" },
      { name: stage.title[locale], path: `/approach/${stage.slug}` },
    ],
  });

  return (
    <article className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/${locale}#approach`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>{dict.approach.backToApproach}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center text-ink shrink-0">
              <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <span className="font-mono text-xs text-ink-muted tracking-widest uppercase">
              STAGE {stage.step} · {dict.approach.eyebrow}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-ink tracking-tight font-normal leading-[1.1] mb-4">
            {stage.title[locale]}
          </h1>

          <p className="text-base sm:text-lg font-mono text-ink-muted uppercase tracking-wider mb-6">
            {stage.subtitle[locale]}
          </p>

          <p className="text-lg sm:text-xl text-ink font-sans font-light leading-relaxed max-w-3xl">
            {stage.description[locale]}
          </p>
        </div>

        {/* Diagnostic Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Specifications */}
          <div className="lg:col-span-8 space-y-12">
            {/* Inputs & Outputs (Bento Cards) */}
            <section aria-labelledby="io-heading">
              <h2
                id="io-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
              >
                Diagnostic Parameters
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl glass-card-spatial bg-surface-raised/90 border border-border-subtle">
                  <span className="text-xs font-mono uppercase tracking-wider text-ink font-semibold block mb-2">
                    {dict.approach.inputs}
                  </span>
                  <p className="text-sm text-ink-muted leading-relaxed font-sans">
                    {stage.inputs[locale]}
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass-card-spatial bg-surface-raised/90 border border-border-subtle">
                  <span className="text-xs font-mono uppercase tracking-wider text-ink font-semibold block mb-2">
                    {dict.approach.outputs}
                  </span>
                  <p className="text-sm text-ink-muted leading-relaxed font-sans">
                    {stage.outputs[locale]}
                  </p>
                </div>
              </div>
            </section>

            {/* Decision Gate */}
            <section aria-labelledby="decision-gate-heading">
              <h2
                id="decision-gate-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
              >
                {dict.approach.decisionGate}
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-surface-raised border border-border-subtle">
                <p className="text-base sm:text-lg text-ink font-sans leading-relaxed">
                  {stage.decisionGate[locale]}
                </p>
              </div>
            </section>

            {/* Governance Review */}
            {stage.governanceReview && (
              <section aria-labelledby="governance-heading">
                <h2
                  id="governance-heading"
                  className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
                >
                  {dict.approach.governanceHeading}
                </h2>
                <div className="p-6 rounded-xl glass-card-spatial bg-surface-raised/90 border border-border-subtle">
                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
                    {stage.governanceReview[locale]}
                  </p>
                </div>
              </section>
            )}

            {/* Stage Deliverables */}
            {stage.deliverables && (
              <section aria-labelledby="deliverables-heading">
                <h2
                  id="deliverables-heading"
                  className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-4 font-semibold"
                >
                  {dict.approach.deliverablesHeading}
                </h2>
                <div className="space-y-3">
                  {stage.deliverables[locale].map((deliverable, dIdx) => (
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

          {/* Sidebar Advisory Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl glass-card-spatial bg-surface-raised/90">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-3">
                Lifecycle Position
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-mono text-3xl font-light text-ink">
                  {stage.step}
                </span>
                <span className="font-mono text-sm text-ink-muted">
                  / 04
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Stage {stage.step} of 4 in the executive operational compounding model designed to de-risk investments while scaling organizational velocity.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl glass-card-spatial bg-surface/90">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-2">
                Executive Implementation
              </span>
              <p className="text-xs text-ink-muted leading-relaxed font-sans mb-6">
                Consult on deploying this disciplined stage-gate methodology within your enterprise AI transformation portfolio.
              </p>
              <Button
                href={`/${locale}#contact`}
                variant="primary"
                size="sm"
                icon={<ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />}
              >
                Engage on Methodology
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
