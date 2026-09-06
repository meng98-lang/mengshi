"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Award,
  Leaf,
  BookOpen,
  Home as HomeIcon,
  HeartHandshake,
  Star,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/shared";

export function HomeClient({
  products,
  whatsappNumber,
}: {
  products: Product[];
  whatsappNumber: string;
}) {
  const { t } = useLanguage();
  const featured = products.slice(0, 6);

  const heritage = [
    { key: "mencius", icon: BookOpen },
    { key: "mengmu", icon: HomeIcon },
    { key: "mengfu", icon: Leaf },
    { key: "luochuan", icon: Award },
    { key: "ruifuxiang", icon: HeartHandshake },
    { key: "successor", icon: ShieldCheck },
  ];

  const why = [
    { key: "1", icon: Leaf },
    { key: "2", icon: BookOpen },
    { key: "3", icon: Truck },
    { key: "4", icon: ShieldCheck },
  ];

  const stats = [
    { num: t("hero.stat1"), label: t("hero.stat1sub") },
    { num: t("hero.stat2"), label: t("hero.stat2sub") },
    { num: t("hero.stat3"), label: t("hero.stat3sub") },
    { num: t("hero.stat4"), label: t("hero.stat4sub") },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header whatsappNumber={whatsappNumber} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-stone-900 text-amber-50">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #f59e0b 0%, transparent 40%), radial-gradient(circle at 80% 70%, #f59e0b 0%, transparent 40%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-sm mb-6">
              {t("hero.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-wide">
              {t("hero.title1")}
              <br />
              <span className="text-amber-400">{t("hero.title2")}</span>
            </h1>
            <p className="mt-6 text-stone-300 leading-relaxed text-base md:text-lg max-w-xl">
              {t("hero.desc")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-red-950 font-bold rounded-lg shadow-lg transition-colors"
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/heritage"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-amber-400/40 hover:bg-white/10 text-amber-100 font-semibold rounded-lg transition-colors"
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((p, i) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className={`rounded-2xl overflow-hidden border border-amber-400/20 shadow-2xl bg-stone-800 ${i % 2 === 1 ? "mt-8" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full aspect-square object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-amber-400/20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-amber-400">
                  {s.num}
                </div>
                <div className="text-xs md:text-sm text-stone-300 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-900 mb-3">
          {t("why.title")}
        </h2>
        <div className="w-16 h-1 bg-red-800 mx-auto mb-12 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {why.map((w) => {
            const Icon = w.icon;
            return (
              <div
                key={w.key}
                className="bg-white rounded-2xl border border-stone-200 p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-red-800" />
                </div>
                <h3 className="font-bold text-lg text-stone-900 mb-2">
                  {t(`why.${w.key}.title`)}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {t(`why.${w.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                {t("products.title")}
              </h2>
              <p className="text-stone-500 mt-2">{t("products.subtitle")}</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-red-800 font-semibold hover:gap-2 transition-all"
            >
              {t("products.viewAll")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsappNumber} />
            ))}
          </div>
          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-red-800 font-semibold"
            >
              {t("products.viewAll")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
            {t("heritage.title")}
          </h2>
          <p className="text-stone-500 mt-3 max-w-2xl mx-auto">
            {t("heritage.subtitle")}
          </p>
          <div className="w-16 h-1 bg-red-800 mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heritage.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.key}
                className="bg-gradient-to-br from-white to-amber-50/40 rounded-2xl border border-stone-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-red-800 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-amber-100" />
                  </div>
                  <h3 className="font-bold text-lg text-stone-900">
                    {t(`heritage.${h.key}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t(`heritage.${h.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/heritage"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-amber-50 font-bold rounded-lg transition-colors"
          >
            {t("heritage.cta")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Reviews / trust */}
      <section className="bg-red-950 text-amber-50 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-3">
            {t("hero.stat4")} · {t("why.4.title")}
          </p>
          <p className="text-stone-300">
            {t("why.4.desc")}
          </p>
        </div>
      </section>

      <Footer whatsappNumber={whatsappNumber} />
      <WhatsappFloat whatsappNumber={whatsappNumber} />
    </div>
  );
}
