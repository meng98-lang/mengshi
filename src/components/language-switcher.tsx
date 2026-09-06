"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300/70 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
        aria-label="切换语言"
      >
        <Globe className="w-4 h-4" />
        <span>{localeNames[locale]}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 overflow-hidden">
          {locales.map((l: Locale) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-stone-700 hover:bg-red-50 transition-colors"
            >
              <span>{localeNames[l]}</span>
              {locale === l && <Check className="w-4 h-4 text-red-700" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
