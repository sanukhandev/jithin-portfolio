import { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";
import { caseStudies } from "@/content/work";
import { insights } from "@/content/insights";
import { getBaseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const routes: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  // Root localized homepages
  for (const locale of LOCALES) {
    const alternateLanguages: Record<string, string> = {};
    for (const loc of LOCALES) {
      alternateLanguages[loc] = `${baseUrl}/${loc}`;
    }
    alternateLanguages["x-default"] = `${baseUrl}/en`;

    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: alternateLanguages,
      },
    });

    // Case studies
    for (const study of caseStudies) {
      const caseAlternates: Record<string, string> = {};
      for (const loc of LOCALES) {
        caseAlternates[loc] = `${baseUrl}/${loc}/work/${study.slug}`;
      }
      caseAlternates["x-default"] = `${baseUrl}/en/work/${study.slug}`;

      routes.push({
        url: `${baseUrl}/${locale}/work/${study.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: caseAlternates,
        },
      });
    }

    // Insights
    for (const article of insights) {
      const insightAlternates: Record<string, string> = {};
      for (const loc of LOCALES) {
        insightAlternates[loc] = `${baseUrl}/${loc}/insights/${article.slug}`;
      }
      insightAlternates["x-default"] = `${baseUrl}/en/insights/${article.slug}`;

      routes.push({
        url: `${baseUrl}/${locale}/insights/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: insightAlternates,
        },
      });
    }
  }

  return routes;
}
