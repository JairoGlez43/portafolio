import "server-only";
import { type Locale } from "./config";
import es from "./messages/es.json";

export type Dictionary = typeof es;

const dictionaries = {
  en: () => import("./messages/en.json").then((mod) => mod.default),
  es: () => import("./messages/es.json").then((mod) => mod.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale) {
  const dictionaryLoader = dictionaries[locale];
  if (!dictionaryLoader) {
    throw new Error(`Dictionary for locale "${locale}" not found`);
  }
  return dictionaryLoader();
}
