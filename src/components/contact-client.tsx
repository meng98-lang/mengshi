"use client";

import { Phone, MessageCircle, Mail, MapPin, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { waLink } from "@/lib/shared";

export function ContactClient({ whatsappNumber }: { whatsappNumber: string }) {
  const { t } = useLanguage();

  const channels = [
    { icon: Phone, label: "WhatsApp", value: `+${whatsappNumber || "1 (555) 018-6688"}`, href: waLink(whatsappNumber, t("hero.waPrefix")), color: "bg-green-100 text-green-700" },
    { icon: MessageCircle, label: t("contact.wechat"), value: "JSTang2024", href: undefined, color: "bg-emerald-100 text-emerald-700" },
    { icon: Mail, label: t("contact.email"), value: "service@mengshijishantang.com", href: "mailto:service@mengshijishantang.com", color: "bg-amber-100 text-amber-700" },
    { icon: Clock, label: t("contact.hours"), value: "24h · Mon-Sat", href: undefined, color: "bg-stone-100 text-stone-700" },
  ];

  const steps = [
    t("order.step1"),
    t("order.step2"),
    t("order.step3"),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header whatsappNumber={whatsappNumber} />

      <section className="bg-gradient-to-br from-red-950 to-stone-900 text-amber-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">{t("contact.title")}</h1>
          <p className="text-stone-300 text-lg">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {channels.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 flex items-start gap-4 h-full hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${c.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-stone-500 mb-1">{c.label}</div>
                  <div className="font-bold text-stone-900 text-lg break-all">{c.value}</div>
                </div>
              </div>
            );
            return c.href ? (
              <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>

        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-7 h-7 text-red-800" />
            <h2 className="text-2xl font-bold text-stone-900">{t("order.howto")}</h2>
          </div>
          <ol className="space-y-4 mb-8">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-red-800 text-amber-50 flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-stone-700 leading-relaxed pt-1">{s}</p>
              </li>
            ))}
          </ol>
          <a
            href={waLink(whatsappNumber, t("hero.waPrefix"))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            {t("hero.whatsappBtn")}
          </a>
        </div>

        <div className="mt-8 flex items-start gap-3 text-stone-500 text-sm">
          <MapPin className="w-5 h-5 flex-shrink-0 text-red-800 mt-0.5" />
          <p>{t("footer.addr")}</p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/products" className="text-red-800 hover:underline font-medium">
            ← {t("nav.products")}
          </Link>
        </div>
      </section>

      <Footer whatsappNumber={whatsappNumber} />
      <WhatsappFloat whatsappNumber={whatsappNumber} />
    </div>
  );
}
