"use client";

import Link from "next/link";
import { Star, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Product } from "@/lib/shared";

export function ProductCard({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber: string;
}) {
  const { t } = useLanguage();

  const waMsg = encodeURIComponent(
    `${t("order.product")}: ${product.name} (${product.unit})`
  );
  const waLink = `https://wa.me/${whatsappNumber}?text=${waMsg}`;
  const img = product.images[0] || "/images/ejiao.jpg";

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden bg-stone-100 aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-red-800 text-amber-50 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {product.origin}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
            />
          ))}
          <span className="text-xs text-stone-500 ml-1">
            {product.rating} ({product.reviewsCount} {t("products.reviews")})
          </span>
        </div>

        <h3 className="font-bold text-lg text-stone-900 leading-snug">
          <Link href={`/products/${product.slug}`} className="hover:text-red-800 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-red-800/80 mt-1">{product.subtitle}</p>
        <p className="text-xs text-stone-500 mt-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {t("products.origin")}: {product.origin} · {product.unit}
        </p>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-2xl font-bold text-red-800">
            ${product.priceUsd}
          </span>
          {product.comparePriceUsd && (
            <span className="text-sm text-stone-400 line-through mb-0.5">
              ${product.comparePriceUsd}
            </span>
          )}
          <span className="text-xs text-stone-400 mb-0.5">
            {t("common.currency")}
          </span>
        </div>

        <div className="mt-4 flex gap-2 pt-4 border-t border-stone-100">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center px-3 py-2.5 border border-stone-300 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            {t("products.details")}
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg text-sm font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {t("products.contactBuy")}
          </a>
        </div>
      </div>
    </div>
  );
}
