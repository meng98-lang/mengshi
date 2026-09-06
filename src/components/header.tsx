"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { LanguageSwitcher } from "./language-switcher";

export function Header({ whatsappNumber }: { whatsappNumber: string }) {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.products") },
    { href: "/heritage", label: t("nav.heritage") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#faf6ef]/95 backdrop-blur border-b border-stone-200">
      {/* 顶部信息条 */}
      <div className="bg-red-900 text-amber-50 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-2 text-center">
          <span className="tracking-wide">{t("brand.tagline")}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-800 flex items-center justify-center text-amber-50 font-bold text-xl shadow-md shrink-0">
              孟
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg text-red-900 tracking-wide">
                {t("brand.short")}
              </div>
              <div className="text-[11px] text-stone-500 tracking-widest">
                JISHANTANG · EST. 1896
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-stone-700 hover:text-red-800 transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-red-800 hover:bg-red-900 text-amber-50 rounded-lg text-sm font-semibold transition-colors shadow"
            >
              <Phone className="w-4 h-4" />
              {t("nav.order")}
            </a>
            <button
              className="lg:hidden p-2 text-stone-700"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="菜单"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#faf6ef]">
          <nav className="px-4 py-3 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-stone-700 font-medium border-b border-stone-200/60 last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-red-800 text-amber-50 rounded-lg font-semibold"
            >
              <Phone className="w-4 h-4" />
              {t("nav.order")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
