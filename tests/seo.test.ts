import { describe, it, expect } from "vitest";
import { constructMetadata, getBaseUrl } from "../src/lib/seo";
import { getPersonStructuredData, getWebSiteStructuredData } from "../src/lib/structured-data";

describe("SEO & Structured Data Specifications", () => {
  it("should construct valid metadata with canonical and hreflang for all locales", () => {
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
  });

  it("should construct valid Person structured data without fictitious claims", () => {
    const person = getPersonStructuredData("en");
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Jithin K");
    expect(person.jobTitle).toBe("Chief Innovation Officer");
    expect((person as any).alumniOf).toBeUndefined();
    expect((person as any).award).toBeUndefined();
  });

  it("should construct valid WebSite structured data", () => {
    const website = getWebSiteStructuredData("it");
    expect(website["@type"]).toBe("WebSite");
    expect(website.inLanguage).toBe("it");
    expect(website.name).toContain("Jithin K");
  });
});
