import { Suspense } from "react";
import { ProductsClient } from "@/components/products-client";
import { getProducts, getSettings } from "@/lib/store";
import { defaultLocale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "名贵滋补中药材 | 东阿阿胶 冬虫夏草 藏红花 野山参",
};

export default async function ProductsPage() {
  const [products, settings] = await Promise.all([
    getProducts(defaultLocale).catch(() => []),
    getSettings().catch(() => null),
  ]);
  return (
    <Suspense>
      <ProductsClient
        products={products}
        whatsappNumber={settings?.whatsappNumber ?? ""}
      />
    </Suspense>
  );
}
