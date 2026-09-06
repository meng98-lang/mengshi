"use client";

import Link from "next/link";
import { Star, MapPin, Check, MessageCircle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { OrderForm } from "@/components/order-form";
import type { Product } from "@/lib/shared";

export function ProductDetailClient({
  product,
  products,
  whatsappNumber,
}: {
  product: Product | null;
  products: Product[];
  whatsappNumber: string;
}) {
  const { t } = useLanguage();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header whatsappNumber={whatsappNumber} />
        <div className="flex-1 flex flex-col items-center justify-center py-32">
          <p className="text-stone-500 mb-4">Product not found</p>
          <Link href="/products" className="text-red-800 font-semibold">
            ← {t("products.viewAll")}
          </Link>
        </div>
        <Footer whatsappNumber={whatsappNumber} />
      </div>
    );
  }

  const img = product.images[0] || "/images/ejiao.jpg";
  const waMsg = encodeURIComponent(
    `${t("order.product")}: ${product.name} (${product.unit})`
  );
  const waLink = `https://wa.me/${whatsappNumber}?text=${waMsg}`;
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header whatsappNumber={whatsappNumber} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 w-full py-4 flex items-center gap-2 text-sm text-stone-500">
        <Link href="/" className="hover:text-red-800">{t("nav.home")}</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-red-800">{t("nav.products")}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-stone-800 truncate">{product.name}</span>
      </div>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={product.name} className="w-full aspect-square object-cover" />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm text-stone-500 ml-2">
              {product.rating} · {product.reviewsCount} {t("products.reviews")}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg text-red-800 mt-2 font-medium">{product.subtitle}</p>

          <div className="flex items-center gap-2 mt-4 text-sm text-stone-600">
            <MapPin className="w-4 h-4 text-red-800" />
            {t("products.origin")}: <span className="font-medium">{product.origin}</span>
            <span className="mx-2 text-stone-300">|</span>
            {t("products.spec")}: <span className="font-medium">{product.unit}</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-black text-red-800">${product.priceUsd}</span>
            {product.comparePriceUsd && (
              <span className="text-xl text-stone-400 line-through mb-1">
                ${product.comparePriceUsd}
              </span>
            )}
            <span className="text-stone-500 mb-1">{t("common.currency")}</span>
          </div>

          {product.highlights.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-stone-900 mb-3">{t("products.highlights")}</h3>
              <ul className="space-y-2">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-700">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg font-bold text-lg transition-colors shadow"
            >
              <MessageCircle className="w-5 h-5" />
              {t("products.contactBuy")}
            </a>
            <a
              href="#order"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-800 hover:bg-red-900 text-amber-50 rounded-lg font-bold text-lg transition-colors shadow"
            >
              {t("nav.order")}
            </a>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl border border-stone-200 p-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">{product.name}</h2>
          <p className="text-stone-700 leading-loose text-base">{product.description}</p>
        </div>
      </section>

      {/* Order form */}
      <section id="order" className="bg-stone-100 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-stone-900 mb-2">
            {t("order.title")}
          </h2>
          <p className="text-stone-500 text-center mb-8">{t("order.subtitle")}</p>
          <OrderForm
            products={products}
            presetProduct={product.slug}
            whatsappNumber={whatsappNumber}
          />
        </div>
      </section>

      <Footer whatsappNumber={whatsappNumber} />
      <WhatsappFloat whatsappNumber={whatsappNumber} />
    </div>
  );
}
