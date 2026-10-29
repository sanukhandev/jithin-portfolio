import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "@/styles/globals.css";
import { Locale } from "@/types/content";
import { LOCALES, isLocale, getDirection } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { getPersonStructuredData, getWebSiteStructuredData } from "@/lib/structured-data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

const sfDisplay = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sf-display",
  display: "swap",
});

const sfArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-sf-arabic",
  display: "swap",
});

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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sfDisplay.variable} ${sfArabic.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${sfDisplay.variable} ${sfArabic.variable} bg-surface text-ink antialiased flex flex-col min-h-screen`}>
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
