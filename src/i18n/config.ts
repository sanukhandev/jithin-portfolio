import { Direction, Locale } from "@/types/content";

export const LOCALES: readonly Locale[] = ["en", "it", "ar"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  ar: "العربية",
};
