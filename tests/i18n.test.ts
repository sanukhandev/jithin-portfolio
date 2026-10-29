import { describe, it, expect } from "vitest";
import en from "../messages/en.json";
import itMessages from "../messages/it.json";
import ar from "../messages/ar.json";
import { LOCALES, getDirection, isLocale } from "../src/i18n/config";

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
