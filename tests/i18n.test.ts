import { describe, it, expect } from "vitest";
import en from "../messages/en.json";
import itMessages from "../messages/it.json";
import ar from "../messages/ar.json";
import { LOCALES, getDirection, isLocale } from "../src/i18n/config";
import {
  getLocaleFromCountry,
  getLocaleFromAcceptLanguage,
  detectRegionLocale,
  ITALIAN_COUNTRY_CODES,
  ARABIC_COUNTRY_CODES,
} from "../src/i18n/geo";

// Recursive key flattener to ensure 100% parity across dictionaries
function getKeys(obj: Record<string, any>, prefix = ""): string[] {
  return Object.keys(obj).reduce((res: string[], el: string) => {
    if (Array.isArray(obj[el])) {
      return [...res, prefix + el];
    } else if (typeof obj[el] === "object" && obj[el] !== null) {
      return [...res, ...getKeys(obj[el], prefix + el + ".")];
    }
    return [...res, prefix + el];
  }, []);
}

describe("i18n and localization completeness", () => {
  it("should define all three supported locales: en, it, ar", () => {
    expect(LOCALES).toEqual(["en", "it", "ar"]);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("it")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("should assign correct direction for Arabic (RTL) and Latin (LTR)", () => {
    expect(getDirection("ar")).toBe("rtl");
    expect(getDirection("en")).toBe("ltr");
    expect(getDirection("it")).toBe("ltr");
  });

  it("should have identical translation key parity across English, Italian, and Arabic", () => {
    const enKeys = getKeys(en).sort();
    const itKeys = getKeys(itMessages).sort();
    const arKeys = getKeys(ar).sort();

    expect(itKeys).toEqual(enKeys);
    expect(arKeys).toEqual(enKeys);
  });

  it("should not contain empty translation values", () => {
    const checkNoEmptyValues = (obj: Record<string, any>, path = "") => {
      for (const [key, val] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof val === "string") {
          expect(val.trim().length, `Empty string at ${currentPath}`).toBeGreaterThan(0);
        } else if (Array.isArray(val)) {
          expect(val.length, `Empty array at ${currentPath}`).toBeGreaterThan(0);
        } else if (typeof val === "object" && val !== null) {
          checkNoEmptyValues(val, currentPath);
        }
      }
    };

    checkNoEmptyValues(en);
    checkNoEmptyValues(itMessages);
    checkNoEmptyValues(ar);
  });
});

describe("Region & Geo-Locale Automatic Detection", () => {
  it("should map Italian countries (IT, SM, VA) to 'it' locale", () => {
    expect(getLocaleFromCountry("IT")).toBe("it");
    expect(getLocaleFromCountry("it")).toBe("it");
    expect(getLocaleFromCountry("SM")).toBe("it");
    expect(getLocaleFromCountry("VA")).toBe("it");
    for (const code of ITALIAN_COUNTRY_CODES) {
      expect(getLocaleFromCountry(code)).toBe("it");
    }
  });

  it("should map Middle East & North Africa countries (SA, AE, QA, etc.) to 'ar' locale", () => {
    expect(getLocaleFromCountry("SA")).toBe("ar");
    expect(getLocaleFromCountry("AE")).toBe("ar");
    expect(getLocaleFromCountry("QA")).toBe("ar");
    expect(getLocaleFromCountry("EG")).toBe("ar");
    for (const code of ARABIC_COUNTRY_CODES) {
      expect(getLocaleFromCountry(code)).toBe("ar");
    }
  });

  it("should return null for non-regional countries like US, IN, GB", () => {
    expect(getLocaleFromCountry("US")).toBeNull();
    expect(getLocaleFromCountry("IN")).toBeNull();
    expect(getLocaleFromCountry("GB")).toBeNull();
    expect(getLocaleFromCountry("")).toBeNull();
    expect(getLocaleFromCountry(null)).toBeNull();
  });

  it("should parse Accept-Language header and find preferred locale", () => {
    expect(getLocaleFromAcceptLanguage("it-IT,it;q=0.9,en-US;q=0.8")).toBe("it");
    expect(getLocaleFromAcceptLanguage("ar-SA,ar-AE;q=0.9,en-US;q=0.8")).toBe("ar");
    expect(getLocaleFromAcceptLanguage("en-US,en;q=0.9")).toBe("en");
    expect(getLocaleFromAcceptLanguage("fr-FR,fr;q=0.9,de;q=0.8")).toBeNull();
    expect(getLocaleFromAcceptLanguage("")).toBeNull();
  });

  it("detectRegionLocale should follow strict precedence order", () => {
    // 1. Explicit cookie preference overrides country and accept-language
    expect(
      detectRegionLocale({
        cookieLocale: "it",
        country: "AE",
        acceptLanguage: "ar-AE",
      })
    ).toBe("it");

    expect(
      detectRegionLocale({
        cookieLocale: "en",
        country: "IT",
        acceptLanguage: "it-IT",
      })
    ).toBe("en");

    // 2. Country detection when no cookie is set
    expect(detectRegionLocale({ country: "IT" })).toBe("it");
    expect(detectRegionLocale({ country: "SA" })).toBe("ar");
    expect(detectRegionLocale({ country: "AE" })).toBe("ar");

    // 3. Accept-Language header when country is unmapped (e.g. IN or US)
    expect(
      detectRegionLocale({
        country: "US",
        acceptLanguage: "it-IT,it;q=0.9,en;q=0.8",
      })
    ).toBe("it");

    // 4. Fallback to 'en' when neither country nor accept-language match
    expect(detectRegionLocale({ country: "IN" })).toBe("en");
    expect(detectRegionLocale({})).toBe("en");
  });
});
