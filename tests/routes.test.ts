import { describe, it, expect } from "vitest";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { GET as getLlmsTxt } from "../src/app/llms.txt/route";
import { GET as getLlmsFullTxt } from "../src/app/llms-full.txt/route";
import { caseStudies } from "../src/content/work";
import { insights } from "../src/content/insights";
import { LOCALES, getDirection } from "../src/i18n/config";
import { getDictionarySync } from "../src/i18n/dictionaries";

describe("Routing, Sitemap & Internationalized Endpoints", () => {
  it("sitemap should contain all localized pages, work items, insights, and LLM text files", () => {
    const siteRoutes = sitemap();
    expect(siteRoutes.length).toBe(
      LOCALES.length * (1 + caseStudies.length + insights.length) + 2
    );

    // Check LLM files
    expect(siteRoutes.some((r) => r.url.endsWith("/llms.txt"))).toBe(true);
    expect(siteRoutes.some((r) => r.url.endsWith("/llms-full.txt"))).toBe(true);

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

  it("robots.txt should allow crawling for all AI bots and point to sitemap.xml", () => {
    const rob = robots();
    expect(rob.sitemap).toContain("/sitemap.xml");

    const rules = Array.isArray(rob.rules) ? rob.rules : [rob.rules];
    expect(rules.length).toBeGreaterThanOrEqual(2);

    const aiRule = rules.find((r) => Array.isArray(r.userAgent) && r.userAgent.includes("GPTBot"));
    expect(aiRule).toBeDefined();
    expect((aiRule?.userAgent as string[])).toContain("ClaudeBot");
    expect((aiRule?.userAgent as string[])).toContain("PerplexityBot");
    expect((aiRule?.userAgent as string[])).toContain("Google-Extended");
    expect(aiRule?.allow).toBe("/");
  });

  it("llms.txt and llms-full.txt route handlers should return structured markdown context", async () => {
    const res = await getLlmsTxt();
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("Jithin K — Chief Innovation Officer");
    expect(text).toContain("desertwhales.tech");
    expect(text).toContain("UAE · KSA · ITA · IND");

    const resFull = await getLlmsFullTxt();
    expect(resFull.status).toBe(200);
    const textFull = await resFull.text();
    expect(textFull).toContain("Full Knowledge Base");
    expect(textFull).toContain("Strategic Operating Pillars");
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
