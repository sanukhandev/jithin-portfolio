import { Metadata } from "next";
import { Locale } from "@/types/content";
import { siteConfig } from "@/content/site";
import { LOCALES } from "@/i18n/config";

export function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://desertwhales.tech";
  return url.replace(/\/$/, "");
}

export interface MetadataOptions {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

export function constructMetadata({
  locale,
  title,
  description,
  path = "",
  type = "website",
  publishedTime,
}: MetadataOptions): Metadata {
  const baseUrl = getBaseUrl();
  // Strip any existing locale prefix from path
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  for (const loc of LOCALES) {
    if (cleanPath === `/${loc}`) {
      cleanPath = "/";
      break;
    } else if (cleanPath.startsWith(`/${loc}/`)) {
      cleanPath = cleanPath.slice(loc.length + 1);
      break;
    }
  }

  const localizedPath = `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
  const canonicalUrl = `${baseUrl}${localizedPath}`;

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${baseUrl}/${loc}${cleanPath === "/" ? "" : cleanPath}`;
  }
  // GEO regional alternates (IN, IT, AE, SA)
  languages["en-AE"] = `${baseUrl}/en${cleanPath === "/" ? "" : cleanPath}`;
  languages["en-SA"] = `${baseUrl}/en${cleanPath === "/" ? "" : cleanPath}`;
  languages["en-IN"] = `${baseUrl}/en${cleanPath === "/" ? "" : cleanPath}`;
  languages["it-IT"] = `${baseUrl}/it${cleanPath === "/" ? "" : cleanPath}`;
  languages["ar-SA"] = `${baseUrl}/ar${cleanPath === "/" ? "" : cleanPath}`;
  languages["ar-AE"] = `${baseUrl}/ar${cleanPath === "/" ? "" : cleanPath}`;
  languages["x-default"] = `${baseUrl}/en${cleanPath === "/" ? "" : cleanPath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      siteName: `${siteConfig.name} — ${siteConfig.role[locale]}`,
      locale: locale === "ar" ? "ar_AR" : locale === "it" ? "it_IT" : "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.role[locale]}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [`${baseUrl}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": locale === "it" ? "IT" : locale === "ar" ? "AE; SA" : "AE; SA; IT; IN",
      "geo.placename": "Palermo, Pagani, Dubai, Riyadh",
    },
  };
}
