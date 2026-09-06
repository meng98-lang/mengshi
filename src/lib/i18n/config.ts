// 支持的语言：简体中文、繁体中文、英文
export const locales = ["zh-CN", "zh-TW", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-CN";

export const localeNames: Record<Locale, string> = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  en: "English",
};

export const localeShort: Record<Locale, string> = {
  "zh-CN": "简",
  "zh-TW": "繁",
  en: "EN",
};

// 根据浏览器语言检测最合适的站点语言
export function detectBrowserLocale(acceptLanguage?: string): Locale {
  const lang =
    (typeof navigator !== "undefined" ? navigator.language : acceptLanguage) ||
    "";
  const lower = lang.toLowerCase();

  // 英文
  if (lower.startsWith("en")) return "en";

  // 繁体地区：台湾、香港、澳门，以及 zh-hant
  if (
    lower.startsWith("zh-tw") ||
    lower.startsWith("zh-hk") ||
    lower.startsWith("zh-mo") ||
    lower.includes("hant")
  ) {
    return "zh-TW";
  }

  // 其余中文一律简体
  if (lower.startsWith("zh")) return "zh-CN";

  // 默认简体
  return defaultLocale;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
