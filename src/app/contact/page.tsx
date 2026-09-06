import { Suspense } from "react";
import { ContactClient } from "@/components/contact-client";
import { getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "联系咨询 | WhatsApp 微信 咨询订购",
};

export default async function ContactPage() {
  const settings = await getSettings().catch(() => null);
  return (
    <Suspense>
      <ContactClient whatsappNumber={settings?.whatsappNumber ?? ""} />
    </Suspense>
  );
}
