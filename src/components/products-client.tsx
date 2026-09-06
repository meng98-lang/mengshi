"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/shared";

export function ProductsClient({
  products,
  whatsappNumber,
}: {
  products: Product[];
  whatsappNumber: string;
}) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header whatsappNumber={whatsappNumber} />

      <section className="bg-gradient-to-br from-red-950 to-stone-900 text-amber-50 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            {t("products.title")}
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 flex-1">
        {products.length === 0 ? (
          <p className="text-center text-stone-500 py-20">Loading…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>
        )}
      </section>

      <Footer whatsappNumber={whatsappNumber} />
      <WhatsappFloat whatsappNumber={whatsappNumber} />
    </div>
  );
}
