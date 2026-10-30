import { Locale } from "@/types/content";
import { siteConfig } from "@/content/site";
import { getBaseUrl } from "./seo";

export function getPersonStructuredData(locale: Locale) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: siteConfig.name,
    jobTitle: siteConfig.role[locale],
    description: siteConfig.heroMission[locale],
    url: `${baseUrl}/${locale}`,
    image: `${baseUrl}/opengraph-image`,
    email: siteConfig.verifiedLinks.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palermo & Pagani",
      addressCountry: "IT",
    },
    worksFor: {
      "@type": "Organization",
      "@id": "https://desertwhales.tech/#organization",
      name: siteConfig.company.name,
      url: siteConfig.company.url,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Chief Innovation Officer",
      occupationalCategory: "11-1011.00",
      skills: [
        "Executive AI Strategy",
        "Multi-Agent System Architecture",
        "Enterprise Transformation",
        "Autonomous Operations Layer",
        "EU AI Act Governance",
        "GCC Sovereign AI Strategy",
      ],
    },
    areaServed: [
      {
        "@type": "Country",
        name: "United Arab Emirates",
        identifier: "AE",
      },
      {
        "@type": "Country",
        name: "Saudi Arabia",
        identifier: "SA",
      },
      {
        "@type": "Country",
        name: "Italy",
        identifier: "IT",
      },
      {
        "@type": "Country",
        name: "India",
        identifier: "IN",
      },
    ],
    knowsAbout: [
      "Artificial Intelligence Transformation",
      "Multi-Agent System Orchestration",
      "Enterprise Copilot Blueprint",
      "Autonomous Operations Layer",
      "European Union AI Act Compliance",
      "Sovereign AI Infrastructure GCC",
      "Saudi Vision 2030 AI Modernization",
      "AI Opportunity Qualification Radar",
      "Deterministic Enterprise RAG",
    ],
  };
}

export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://desertwhales.tech/#organization",
    name: siteConfig.company.name,
    url: siteConfig.company.url,
    areaServed: ["AE", "SA", "IT", "IN"],
  };
}

export function getWebSiteStructuredData(locale: Locale) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: `${siteConfig.name} — ${siteConfig.role[locale]}`,
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    description: siteConfig.heroMission[locale],
    publisher: {
      "@type": "Organization",
      name: siteConfig.company.name,
      url: siteConfig.company.url,
    },
  };
}

export function getTechArticleStructuredData({
  locale,
  title,
  description,
  path,
  datePublished,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `${baseUrl}/${locale}${path}`,
    inLanguage: locale,
    ...(datePublished ? { datePublished } : {}),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.role[locale],
      url: `${baseUrl}/${locale}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.company.name,
      url: siteConfig.company.url,
    },
  };
}

export function getBreadcrumbStructuredData({
  locale,
  items,
}: {
  locale: Locale;
  items: { name: string; path: string }[];
}) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}/${locale}${item.path}`,
    })),
  };
}
