"use client";

import Link from "next/link";
import {
  BookOpen,
  Home as HomeIcon,
  Leaf,
  Award,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";

export function HeritageClient({ whatsappNumber }: { whatsappNumber: string }) {
  const { t } = useLanguage();

  const items = [
    { key: "mencius", icon: BookOpen },
    { key: "mengmu", icon: HomeIcon },
    { key: "mengfu", icon: Leaf },
    { key: "luochuan", icon: Award },
    { key: "ruifuxiang", icon: HeartHandshake },
    { key: "successor", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header whatsappNumber={whatsappNumber} />

      <section className="bg-gradient-to-br from-red-950 via-red-900 to-stone-900 text-amber-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            {t("heritage.title")}
          </h1>
          <p className="text-stone-300 text-lg">{t("heritage.subtitle")}</p>
        </div>
      </section>

      {/* 时间线 */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-red-200 md:-translate-x-1/2" />
          <div className="space-y-12">
            {items.map((item, idx) => {
              const Icon = item.icon;
              const left = idx % 2 === 0;
              return (
                <div
                  key={item.key}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-red-800 border-4 border-amber-50 flex items-center justify-center md:-translate-x-1/2 z-10 shrink-0">
                    <Icon className="w-5 h-5 text-amber-100" />
                  </div>

                  <div className={`pl-24 md:pl-0 md:w-1/2 ${left ? "md:pr-14 md:text-right" : "md:pl-14"}`}>
                    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold text-red-900 mb-2">
                        {t(`heritage.${item.key}.title`)}
                      </h3>
                      <p className="text-stone-600 leading-relaxed text-sm">
                        {t(`heritage.${item.key}.desc`)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-stone-100 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">
            {t("brand.short")}
          </h2>
          <p className="text-stone-600 leading-loose mb-8">{t("about.desc")}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-800 hover:bg-red-900 text-amber-50 font-bold rounded-lg shadow transition-colors"
          >
            {t("hero.cta")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer whatsappNumber={whatsappNumber} />
      <WhatsappFloat whatsappNumber={whatsappNumber} />
    </div>
  );
}
