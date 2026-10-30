import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { Locale } from "@/types/content";
import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { insights } from "@/content/insights";
import { constructMetadata } from "@/lib/seo";
import { getTechArticleStructuredData, getBreadcrumbStructuredData } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

interface InsightDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const article of insights) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: InsightDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return {};

  return constructMetadata({
    locale,
    title: article.title[locale],
    description: article.excerpt[locale],
    path: `/${locale}/insights/${slug}`,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const article = insights.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const dict = await getDictionary(locale);

  const articleSchema = getTechArticleStructuredData({
    locale,
    title: article.title[locale],
    description: article.excerpt[locale],
    path: `/insights/${article.slug}`,
    datePublished: article.date,
  });

  const breadcrumbSchema = getBreadcrumbStructuredData({
    locale,
    items: [
      { name: dict.nav.insights, path: "" },
      { name: article.title[locale], path: `/insights/${article.slug}` },
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
            href={`/${locale}#insights`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>{dict.insights.backToInsights}</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
            <Badge variant="subtle">{dict.insights.badge}</Badge>
            <div className="flex items-center gap-1.5 text-xs font-mono text-ink-muted">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
              <span>{article.readTime[locale]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-ink-muted">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
              <time dateTime={article.date}>{article.date}</time>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ink tracking-tight font-normal leading-[1.12] mb-6">
            {article.title[locale]}
          </h1>

          <p className="text-lg sm:text-xl text-ink-muted font-sans font-light leading-relaxed">
            {article.excerpt[locale]}
          </p>
        </header>

        {/* Article Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content Paragraphs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-4 rounded-lg bg-surface-raised border border-border-subtle/80 text-xs font-mono text-ink-muted mb-8">
              {dict.insights.draftNotice}
            </div>

            {article.paragraphs[locale].map((p, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg text-ink font-sans leading-relaxed"
              >
                {p}
              </p>
            ))}

            {/* Key Takeaways Card */}
            <div className="mt-12 p-8 rounded-xl glass-card-spatial bg-surface-raised/90">
              <h2 className="text-sm font-mono uppercase tracking-widest text-ink font-semibold mb-4">
                {dict.insights.keyTakeaways}
              </h2>
              <div className="space-y-3">
                {article.keyTakeaways[locale].map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-ink mt-1 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="text-sm sm:text-base text-ink-muted font-sans">
                      {takeaway}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-xl glass-card-spatial bg-surface-raised/90">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-4">
                Topics &amp; Themes
              </span>
              <div className="text-xs font-mono text-ink-muted leading-relaxed tracking-wide">
                {article.topics[locale].join("  ·  ")}
              </div>
            </div>

            <div className="p-6 rounded-xl glass-card-spatial bg-surface/90 text-xs font-mono text-ink-muted space-y-2">
              <span className="text-ink font-semibold block uppercase tracking-wider">
                Peer Review Notice
              </span>
              <p className="leading-relaxed font-sans">
                {dict.insights.draftNotice}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
