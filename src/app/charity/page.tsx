import { Suspense } from "react";
import type { Metadata } from "next";
import { CharityClient } from "@/components/charity-client";
import { getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "公益慈善 | 百年孟氏济善堂参茸商行",
  description:
    "孟氏济善堂热心公益，长期捐助敬老院、儿童福利院，送医送药送人参到山区，传承孟子仁爱精神，回馈社会。",
};

export default async function CharityPage() {
  const settings = await getSettings().catch(() => null);
  return (
    <Suspense>
      <CharityClient whatsappNumber={settings?.whatsappNumber ?? ""} />
    </Suspense>
  );
}
