"use client";

import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function Footer({ whatsappNumber }: { whatsappNumber: string }) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-800 flex items-center justify-center text-amber-50 font-bold text-xl">
                孟
              </div>
              <div className="leading-tight">
                <div className="font-bold text-amber-50">
                  {t("brand.short")}
                </div>
                <div className="text-[11px] text-stone-400 tracking-widest">
                  JISHANTANG
                </div>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {t("brand.tagline")}
            </p>
            <div className="flex items-start gap-2 mt-4 text-sm text-stone-400">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span className="whitespace-pre-line">{t("footer.address")}</span>
            </div>
            <div className="mt-3 text-sm text-stone-400 space-y-1">
              <div>{t("footer.manager")}</div>
              <div>{t("footer.phone")}</div>
              <div>{t("footer.email")}</div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-amber-50 font-semibold mb-4 text-sm tracking-wider">
              {t("footer.products")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products" className="hover:text-amber-200 transition-colors">东阿阿胶 · Ejiao</Link></li>
              <li><Link href="/products" className="hover:text-amber-200 transition-colors">冬虫夏草 · Cordyceps</Link></li>
              <li><Link href="/products" className="hover:text-amber-200 transition-colors">藏红花 · Saffron</Link></li>
              <li><Link href="/products" className="hover:text-amber-200 transition-colors">野山参 · Ginseng</Link></li>
              <li><Link href="/products" className="hover:text-amber-200 transition-colors">灵芝 · Reishi</Link></li>
              <li><Link href="/products" className="hover:text-amber-200 transition-colors">鹿茸 · 雪莲</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-amber-50 font-semibold mb-4 text-sm tracking-wider">
              {t("footer.company")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/charity" className="hover:text-amber-200 transition-colors">{t("footer.charity")}</Link></li>
              <li><Link href="/heritage" className="hover:text-amber-200 transition-colors">{t("footer.heritage")}</Link></li>
              <li><Link href="/about" className="hover:text-amber-200 transition-colors">{t("footer.about")}</Link></li>
              <li><Link href="/products" className="hover:text-amber-200 transition-colors">{t("nav.products")}</Link></li>
              <li><Link href="/contact" className="hover:text-amber-200 transition-colors">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-amber-50 font-semibold mb-4 text-sm tracking-wider">
              {t("footer.contact")}
            </h3>
            <a
              href={`https://wa.me/${(whatsappNumber || "85265131587").replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <p className="text-xs text-stone-400 mt-4">{t("contact.hours")}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-700">
          <p className="text-base font-medium text-stone-300 text-center">
            © {year} {t("brand.name")} {t("footer.rights")}
          </p>
          <p className="text-xs text-stone-500 mt-3 text-center leading-relaxed max-w-3xl mx-auto">
            {t("footer.disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
