import { describe, it, expect } from "vitest";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { caseStudies } from "../src/content/work";
import { insights } from "../src/content/insights";
import { LOCALES, getDirection } from "../src/i18n/config";
import { getDictionarySync } from "../src/i18n/dictionaries";

describe("Routing, Sitemap & Internationalized Endpoints", () => {
  it("sitemap should contain all localized pages, work items, and insights", () => {
    const siteRoutes = sitemap();
    expect(siteRoutes.length).toBe(
      LOCALES.length * (1 + caseStudies.length + insights.length)
    );

    for (const locale of LOCALES) {
      // Check homepage
      expect(siteRoutes.some((r) => r.url.endsWith(`/${locale}`))).toBe(true);

      // Check case studies
      for (const study of caseStudies) {
        expect(
          siteRoutes.some((r) => r.url.endsWith(`/${locale}/work/${study.slug}`))
        ).toBe(true);
      }

      // Check insights
      for (const article of insights) {
        expect(
          siteRoutes.some((r) =>
            r.url.endsWith(`/${locale}/insights/${article.slug}`)
          )
        ).toBe(true);
      }
    }
  });

  it("robots.txt should allow crawling and point to sitemap.xml", () => {
    const rob = robots();
    expect(rob.sitemap).toContain("/sitemap.xml");
  });

  it("dictionary loader should return correct text for all locales", () => {
    for (const locale of LOCALES) {
      const dict = getDictionarySync(locale);
      expect(dict.hero.role).toBeDefined();
      expect(dict.work.badge).toBeDefined();
      expect(dict.contact.statusMessage).toBeDefined();
    }
  });

  it("Arabic locale should enforce RTL direction", () => {
    expect(getDirection("ar")).toBe("rtl");
    expect(getDirection("en")).toBe("ltr");
    expect(getDirection("it")).toBe("ltr");
  });
});
