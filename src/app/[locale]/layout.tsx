import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { Locale } from "@/types/content";
import { LOCALES, isLocale, getDirection } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { constructMetadata, getBaseUrl } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import {
  getPersonStructuredData,
  getWebSiteStructuredData,
  getOrganizationStructuredData,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(getBaseUrl()),
    ...constructMetadata({
      locale,
      title: `${siteConfig.name} — ${siteConfig.role[locale]}`,
      description: dict.hero.body,
      path: `/${locale}`,
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dir = getDirection(locale);
  const dict = await getDictionary(locale);
  const personSchema = getPersonStructuredData(locale);
  const websiteSchema = getWebSiteStructuredData(locale);
  const orgSchema = getOrganizationStructuredData();

  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={orgSchema} />
      </head>
      <body className="bg-surface text-ink antialiased flex flex-col min-h-screen">
        <SkipLink label={dict.nav.skipLink} />
        <Header locale={locale} dict={dict} />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
