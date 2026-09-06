"use client";

import Link from "next/link";
import { Target, Leaf, BookOpen, Truck, ShieldCheck, Award } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";

export function AboutClient({ whatsappNumber }: { whatsappNumber: string }) {
  const { t } = useLanguage();

  const values = [
    { icon: Leaf, title: t("why.1.title"), desc: t("why.1.desc") },
    { icon: BookOpen, title: t("why.2.title"), desc: t("why.2.desc") },
    { icon: Truck, title: t("why.3.title"), desc: t("why.3.desc") },
    { icon: ShieldCheck, title: t("why.4.title"), desc: t("why.4.desc") },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header whatsappNumber={whatsappNumber} />

      <section className="bg-gradient-to-br from-red-950 to-stone-900 text-amber-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">{t("about.title")}</h1>
          <p className="text-stone-300 text-lg">{t("brand.tagline")}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-10 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-red-800" />
            <h2 className="text-2xl font-bold text-stone-900">{t("brand.short")}</h2>
          </div>
          <p className="text-stone-700 leading-loose text-base">{t("about.desc")}</p>
        </div>

        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-red-800" />
            <h2 className="text-2xl font-bold text-stone-900">{t("about.mission")}</h2>
          </div>
          <p className="text-stone-700 leading-loose text-base">
            {t("about.missionDesc")}
          </p>
        </div>
      </section>

      <section className="bg-stone-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-10">
            {t("why.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white rounded-2xl border border-stone-200 p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-red-800" />
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
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
            </Link>
          </div>
        </div>
      </section>

      <Footer whatsappNumber={whatsappNumber} />
      <WhatsappFloat whatsappNumber={whatsappNumber} />
    </div>
  );
}
