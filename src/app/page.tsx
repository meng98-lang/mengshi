import { Suspense } from "react";
import { HomeClient } from "@/components/home-client";
import { getProducts, getSettings } from "@/lib/store";
import { defaultLocale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, settings] = await Promise.all([
    getProducts(defaultLocale).catch(() => []),
    getSettings().catch(() => null),
  ]);

  return (
    <Suspense>
      <HomeClient
        products={products}
        whatsappNumber={settings?.whatsappNumber ?? ""}
      />
    </Suspense>
  );
}
