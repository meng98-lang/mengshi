"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type Locale,
  defaultLocale,
  detectBrowserLocale,
  isLocale,
} from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n/translations";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (k) => k,
});

const STORAGE_KEY = "mengshi-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // 1. 优先读取已保存的选择 2. 其次浏览器语言
    let initial: Locale = defaultLocale;
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && isLocale(saved)) {
        initial = saved;
      } else {
        initial = detectBrowserLocale();
      }
    }
    setLocaleState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  };

  const dict = getTranslations(locale);
  const t = (key: string) => dict[key] ?? key;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
