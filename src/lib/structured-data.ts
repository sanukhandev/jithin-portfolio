import { Locale } from "@/types/content";
import { siteConfig } from "@/content/site";
import { getBaseUrl } from "./seo";

export function getPersonStructuredData(locale: Locale) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role[locale],
    description: siteConfig.heroMission[locale],
    url: `${baseUrl}/${locale}`,
    image: `${baseUrl}/opengraph-image`,
    knowsAbout: [
      "Artificial Intelligence",
      "Enterprise Architecture",
      "Executive Innovation",
      "Agentic Systems",
      "Autonomous Operations",
      "AI Governance & Safety",
    ],
  };
}

export function getWebSiteStructuredData(locale: Locale) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} — ${siteConfig.role[locale]}`,
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    description: siteConfig.heroMission[locale],
  };
}
