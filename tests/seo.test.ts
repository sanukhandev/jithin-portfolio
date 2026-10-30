import { describe, it, expect } from "vitest";
import { constructMetadata, getBaseUrl } from "../src/lib/seo";
import {
  getPersonStructuredData,
  getWebSiteStructuredData,
  getOrganizationStructuredData,
  getTechArticleStructuredData,
  getBreadcrumbStructuredData,
} from "../src/lib/structured-data";

describe("SEO, AEO & GEO Structured Data Specifications", () => {
  it("should construct valid metadata with canonical, hreflang, and regional GEO signals for all locales", () => {
    const meta = constructMetadata({
      locale: "en",
      title: "Designing what comes after.",
      description: "Executive AI Innovation portfolio.",
      path: "/en",
    });

    const baseUrl = getBaseUrl();
    expect(meta.alternates?.canonical).toBe(`${baseUrl}/en`);
    expect(meta.alternates?.languages?.["en"]).toBe(`${baseUrl}/en`);
    expect(meta.alternates?.languages?.["it"]).toBe(`${baseUrl}/it`);
    expect(meta.alternates?.languages?.["ar"]).toBe(`${baseUrl}/ar`);
    expect(meta.alternates?.languages?.["x-default"]).toBe(`${baseUrl}/en`);

    // Regional GEO hreflang signals
    expect(meta.alternates?.languages?.["en-AE"]).toBe(`${baseUrl}/en`);
    expect(meta.alternates?.languages?.["en-SA"]).toBe(`${baseUrl}/en`);
    expect(meta.alternates?.languages?.["en-IN"]).toBe(`${baseUrl}/en`);
    expect(meta.alternates?.languages?.["it-IT"]).toBe(`${baseUrl}/it`);
    expect(meta.alternates?.languages?.["ar-SA"]).toBe(`${baseUrl}/ar`);
    expect(meta.alternates?.languages?.["ar-AE"]).toBe(`${baseUrl}/ar`);

    // Geo meta tags
    expect(meta.other?.["geo.placename"]).toBe("Palermo, Pagani, Dubai, Riyadh");
  });

  it("should construct valid Person structured data with organization and regional scope", () => {
    const person = getPersonStructuredData("en");
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Jithin K");
    expect(person.jobTitle).toBe("Chief Innovation Officer");
    expect(person.worksFor.name).toBe("desertwhales.tech");
    expect(person.areaServed).toHaveLength(4);
    expect(person.areaServed.map((a: any) => a.identifier)).toEqual(["AE", "SA", "IT", "IN"]);
    expect((person as any).alumniOf).toBeUndefined();
    expect((person as any).award).toBeUndefined();
  });

  it("should construct valid Organization structured data", () => {
    const org = getOrganizationStructuredData();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("desertwhales.tech");
    expect(org.areaServed).toContain("AE");
    expect(org.areaServed).toContain("SA");
    expect(org.areaServed).toContain("IT");
    expect(org.areaServed).toContain("IN");
  });

  it("should construct valid WebSite structured data", () => {
    const website = getWebSiteStructuredData("it");
    expect(website["@type"]).toBe("WebSite");
    expect(website.inLanguage).toBe("it");
    expect(website.name).toContain("Jithin K");
  });

  it("should construct valid TechArticle and Breadcrumb structured data for deep routes", () => {
    const article = getTechArticleStructuredData({
      locale: "en",
      title: "Enterprise Copilot Blueprint",
      description: "Architecture for grounded enterprise assistance.",
      path: "/work/enterprise-copilot-blueprint",
    });
    expect(article["@type"]).toBe("TechArticle");
    expect(article.headline).toBe("Enterprise Copilot Blueprint");

    const breadcrumbs = getBreadcrumbStructuredData({
      locale: "en",
      items: [
        { name: "Work", path: "#work" },
        { name: "Enterprise Copilot Blueprint", path: "/work/enterprise-copilot-blueprint" },
      ],
    });
    expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbs.itemListElement).toHaveLength(2);
  });
});
