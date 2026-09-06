import { Suspense } from "react";
import { ProductDetailClient } from "@/components/product-detail-client";
import { getProducts, getProductBySlug, getSettings } from "@/lib/store";
import { defaultLocale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, products, settings] = await Promise.all([
    getProductBySlug(slug, defaultLocale).catch(() => null),
    getProducts(defaultLocale).catch(() => []),
    getSettings().catch(() => null),
  ]);

  return (
    <Suspense>
      <ProductDetailClient
        product={product}
        products={products}
        whatsappNumber={settings?.whatsappNumber ?? ""}
      />
    </Suspense>
  );
}
