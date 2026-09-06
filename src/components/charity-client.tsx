"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Users, Baby, BookOpen, MessageCircle, Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";

export function CharityClient({ whatsappNumber }: { whatsappNumber: string }) {
  const { t } = useLanguage();

  const values = [
    { icon: Heart, title: t("charity.value1.title"), desc: t("charity.value1.desc"), color: "bg-red-50 text-red-600" },
    { icon: Baby, title: t("charity.value2.title"), desc: t("charity.value2.desc"), color: "bg-amber-50 text-amber-600" },
    { icon: BookOpen, title: t("charity.value3.title"), desc: t("charity.value3.desc"), color: "bg-emerald-50 text-emerald-600" },
  ];

  const charityEvents = [
    { image: "/images/charity-elderly.jpg", title: t("charity.event1.title"), desc: t("charity.event1.desc") },
    { image: "/images/charity-children.jpg", title: t("charity.event2.title"), desc: t("charity.event2.desc") },
    { image: "/images/charity-group.jpg", title: t("charity.event3.title"), desc: t("charity.event3.desc") },
    { image: "/images/charity-mountain-medical.jpg", title: t("charity.event4.title"), desc: t("charity.event4.desc") },
    { image: "/images/charity-mountain-ginseng.jpg", title: t("charity.event5.title"), desc: t("charity.event5.desc") },
    { image: "/images/charity-mountain-nursing.jpg", title: t("charity.event6.title"), desc: t("charity.event6.desc") },
  ];

  return (
    <>
      <Header whatsappNumber={whatsappNumber} />
      <main className="min-h-screen bg-[#F5F0E8]">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-stone-900 via-red-950 to-stone-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-400 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-200 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" /> {t("charity.title")}
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{t("charity.subtitle")}</h1>
            <div className="flex items-center justify-center gap-2 text-amber-200/90 italic text-lg">
              <Quote className="w-5 h-5 shrink-0" />
              <span>{t("charity.promise.quote")}</span>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-6">{t("charity.mission.title")}</h2>
              <p className="text-stone-600 text-lg leading-relaxed">{t("charity.mission.desc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {values.map((v, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${v.color}`}>
                    <v.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{v.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">{t("charity.events.title")}</h2>
              <div className="w-16 h-1 bg-amber-600 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {charityEvents.map((ev, i) => (
                <article key={i} className="bg-[#F5F0E8] rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={ev.image} alt={ev.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-stone-900 mb-3">{ev.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{ev.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-red-900 to-stone-900 rounded-2xl p-8 md:p-12 text-center text-white">
              <Users className="w-12 h-12 text-amber-300 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("charity.promise.title")}</h2>
              <p className="text-stone-300 text-lg leading-relaxed mb-6">{t("charity.promise.desc")}</p>
              <p className="text-amber-200 italic text-lg">{t("charity.promise.quote")}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-amber-700 to-red-800 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-black mb-4">{t("charity.cta.title")}</h2>
            <p className="text-amber-50 text-lg mb-8">{t("charity.cta.desc")}</p>
            <a
              href={`https://wa.me/${(whatsappNumber || "85265131587").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(t("order.message"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-800 rounded-full font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg"
            >
              <MessageCircle className="w-6 h-6" /> {t("charity.cta.button")}
            </a>
          </div>
        </section>
      </main>
      <Footer whatsappNumber={whatsappNumber} />
      <WhatsappFloat whatsappNumber={whatsappNumber} />
    </>
  );
}
