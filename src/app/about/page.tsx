import { Suspense } from "react";
import { AboutClient } from "@/components/about-client";
import { getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "关于我们 | 百年孟氏济善堂参茸商行",
};

export default async function AboutPage() {
  const settings = await getSettings().catch(() => null);
  return (
    <Suspense>
      <AboutClient whatsappNumber={settings?.whatsappNumber ?? ""} />
    </Suspense>
  );
}
