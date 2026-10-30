import { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";
import { caseStudies } from "@/content/work";
import { insights } from "@/content/insights";
import { pillars } from "@/content/pillars";
import { approachStages } from "@/content/approach";
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
    alternateLanguages["en-AE"] = `${baseUrl}/en`;
    alternateLanguages["en-SA"] = `${baseUrl}/en`;
    alternateLanguages["en-IN"] = `${baseUrl}/en`;
    alternateLanguages["it-IT"] = `${baseUrl}/it`;
    alternateLanguages["ar-SA"] = `${baseUrl}/ar`;
    alternateLanguages["ar-AE"] = `${baseUrl}/ar`;
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

    // Executive About Page
    const aboutAlternates: Record<string, string> = {};
    for (const loc of LOCALES) {
      aboutAlternates[loc] = `${baseUrl}/${loc}/about`;
    }
    aboutAlternates["en-AE"] = `${baseUrl}/en/about`;
    aboutAlternates["en-SA"] = `${baseUrl}/en/about`;
    aboutAlternates["en-IN"] = `${baseUrl}/en/about`;
    aboutAlternates["it-IT"] = `${baseUrl}/it/about`;
    aboutAlternates["ar-SA"] = `${baseUrl}/ar/about`;
    aboutAlternates["ar-AE"] = `${baseUrl}/ar/about`;
    aboutAlternates["x-default"] = `${baseUrl}/en/about`;

    routes.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: aboutAlternates,
      },
    });

    // Strategic Innovation Pillars
    for (const pillar of pillars) {
      const pillarAlternates: Record<string, string> = {};
      for (const loc of LOCALES) {
        pillarAlternates[loc] = `${baseUrl}/${loc}/pillars/${pillar.slug}`;
      }
      pillarAlternates["en-AE"] = `${baseUrl}/en/pillars/${pillar.slug}`;
      pillarAlternates["en-SA"] = `${baseUrl}/en/pillars/${pillar.slug}`;
      pillarAlternates["en-IN"] = `${baseUrl}/en/pillars/${pillar.slug}`;
      pillarAlternates["it-IT"] = `${baseUrl}/it/pillars/${pillar.slug}`;
      pillarAlternates["ar-SA"] = `${baseUrl}/ar/pillars/${pillar.slug}`;
      pillarAlternates["ar-AE"] = `${baseUrl}/ar/pillars/${pillar.slug}`;
      pillarAlternates["x-default"] = `${baseUrl}/en/pillars/${pillar.slug}`;

      routes.push({
        url: `${baseUrl}/${locale}/pillars/${pillar.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: {
          languages: pillarAlternates,
        },
      });
    }

    // Operating Philosophy Approach Stages
    for (const stage of approachStages) {
      const stageAlternates: Record<string, string> = {};
      for (const loc of LOCALES) {
        stageAlternates[loc] = `${baseUrl}/${loc}/approach/${stage.slug}`;
      }
      stageAlternates["en-AE"] = `${baseUrl}/en/approach/${stage.slug}`;
      stageAlternates["en-SA"] = `${baseUrl}/en/approach/${stage.slug}`;
      stageAlternates["en-IN"] = `${baseUrl}/en/approach/${stage.slug}`;
      stageAlternates["it-IT"] = `${baseUrl}/it/approach/${stage.slug}`;
      stageAlternates["ar-SA"] = `${baseUrl}/ar/approach/${stage.slug}`;
      stageAlternates["ar-AE"] = `${baseUrl}/ar/approach/${stage.slug}`;
      stageAlternates["x-default"] = `${baseUrl}/en/approach/${stage.slug}`;

      routes.push({
        url: `${baseUrl}/${locale}/approach/${stage.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: {
          languages: stageAlternates,
        },
      });
    }

    // Case studies
    for (const study of caseStudies) {
      const caseAlternates: Record<string, string> = {};
      for (const loc of LOCALES) {
        caseAlternates[loc] = `${baseUrl}/${loc}/work/${study.slug}`;
      }
      caseAlternates["en-AE"] = `${baseUrl}/en/work/${study.slug}`;
      caseAlternates["en-SA"] = `${baseUrl}/en/work/${study.slug}`;
      caseAlternates["en-IN"] = `${baseUrl}/en/work/${study.slug}`;
      caseAlternates["it-IT"] = `${baseUrl}/it/work/${study.slug}`;
      caseAlternates["ar-SA"] = `${baseUrl}/ar/work/${study.slug}`;
      caseAlternates["ar-AE"] = `${baseUrl}/ar/work/${study.slug}`;
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
      insightAlternates["en-AE"] = `${baseUrl}/en/insights/${article.slug}`;
      insightAlternates["en-SA"] = `${baseUrl}/en/insights/${article.slug}`;
      insightAlternates["en-IN"] = `${baseUrl}/en/insights/${article.slug}`;
      insightAlternates["it-IT"] = `${baseUrl}/it/insights/${article.slug}`;
      insightAlternates["ar-SA"] = `${baseUrl}/ar/insights/${article.slug}`;
      insightAlternates["ar-AE"] = `${baseUrl}/ar/insights/${article.slug}`;
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

  // LLM Discovery Files
  routes.push({
    url: `${baseUrl}/llms.txt`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  routes.push({
    url: `${baseUrl}/llms-full.txt`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.6,
  });

  return routes;
}
