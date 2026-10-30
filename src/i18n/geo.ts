import { Locale } from "@/types/content";
import { DEFAULT_LOCALE, isLocale } from "./config";

/**
 * ISO 3166-1 alpha-2 country codes mapped to Italian locale ('it')
 */
export const ITALIAN_COUNTRY_CODES: readonly string[] = [
  "IT", // Italy
  "SM", // San Marino
  "VA", // Vatican City
] as const;

/**
 * ISO 3166-1 alpha-2 country codes mapped to Arabic locale ('ar')
 * Covering GCC (Gulf Cooperation Council), Levant, and North Africa
 */
export const ARABIC_COUNTRY_CODES: readonly string[] = [
  "SA", // Saudi Arabia
  "AE", // United Arab Emirates
  "QA", // Qatar
  "KW", // Kuwait
  "OM", // Oman
  "BH", // Bahrain
  "EG", // Egypt
  "JO", // Jordan
  "LB", // Lebanon
  "IQ", // Iraq
  "YE", // Yemen
  "SY", // Syria
  "PS", // Palestine
  "MA", // Morocco
  "DZ", // Algeria
  "TN", // Tunisia
  "LY", // Libya
  "SD", // Sudan
] as const;

/**
 * Map ISO country code directly to supported Locale, or null if no regional match
 */
export function getLocaleFromCountry(countryCode?: string | null): Locale | null {
  if (!countryCode) return null;
  const normalized = countryCode.trim().toUpperCase();

  if (ITALIAN_COUNTRY_CODES.includes(normalized)) {
    return "it";
  }

  if (ARABIC_COUNTRY_CODES.includes(normalized)) {
    return "ar";
  }

  return null;
}

interface ParsedLanguage {
  lang: string;
  prefix: string;
  q: number;
}

/**
 * Parse standard HTTP Accept-Language header (e.g. "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7")
 * and find the highest-weighted supported locale.
 */
export function getLocaleFromAcceptLanguage(acceptLanguageHeader?: string | null): Locale | null {
  if (!acceptLanguageHeader) return null;

  try {
    const preferences: ParsedLanguage[] = acceptLanguageHeader
      .split(",")
      .map((item) => {
        const [langPart, qPart] = item.trim().split(";");
        const lang = langPart.trim().toLowerCase();
        const prefix = lang.split("-")[0]; // "it-it" -> "it"
        let q = 1.0;
        if (qPart) {
          const match = qPart.match(/q=([0-9.]+)/);
          if (match && match[1]) {
            const parsedQ = parseFloat(match[1]);
            if (!isNaN(parsedQ)) q = parsedQ;
          }
        }
        return { lang, prefix, q };
      })
      .filter((p) => p.lang.length > 0)
      .sort((a, b) => b.q - a.q);

    for (const pref of preferences) {
      if (isLocale(pref.prefix)) {
        return pref.prefix;
      }
    }
  } catch {
    // If malformed, fail gracefully
  }

  return null;
}

export interface RegionDetectionOptions {
  country?: string | null;
  acceptLanguage?: string | null;
  cookieLocale?: string | null;
}

/**
 * Identify the visitor's region and determine the default locale.
 *
 * Precedence Order:
 * 1. Explicit user cookie preference (NEXT_LOCALE)
 * 2. Geo-located Country (edge proxy headers: Vercel, Cloudflare, AWS CloudFront, etc.)
 * 3. Browser Accept-Language header
 * 4. System default fallback ('en')
 */
export function detectRegionLocale({
  country,
  acceptLanguage,
  cookieLocale,
}: RegionDetectionOptions): Locale {
  // 1. Explicit user preference stored in cookie
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Geo-located country code
  const countryLocale = getLocaleFromCountry(country);
  if (countryLocale) {
    return countryLocale;
  }

  // 3. Browser language/region preference
  const acceptLocale = getLocaleFromAcceptLanguage(acceptLanguage);
  if (acceptLocale) {
    return acceptLocale;
  }

  // 4. Default fallback
  return DEFAULT_LOCALE;
}
