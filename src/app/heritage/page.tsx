import { HeritageClient } from "@/components/heritage-client";
import { getSettings } from "@/lib/store";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "孟氏家风 · 百年传承 | 孟子 孟母三迁 孟洛川 瑞蚨祥",
};

export default async function HeritagePage() {
  const settings = await getSettings().catch(() => null);
  return (
    <Suspense>
      <HeritageClient whatsappNumber={settings?.whatsappNumber ?? ""} />
    </Suspense>
  );
}
