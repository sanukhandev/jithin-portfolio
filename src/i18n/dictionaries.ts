import { Locale } from "@/types/content";
import enMessages from "../../messages/en.json";
import itMessages from "../../messages/it.json";
import arMessages from "../../messages/ar.json";

export type Dictionary = typeof enMessages;

const dictionaries: Record<Locale, Dictionary> = {
  en: enMessages,
  it: itMessages,
  ar: arMessages,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] || dictionaries.en;
}

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
