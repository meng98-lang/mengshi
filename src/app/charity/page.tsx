import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CharityClient } from "@/components/charity-client";

export const metadata: Metadata = {
  title: "公益慈善 | 百年孟氏济善堂参茸商行",
  description: "孟氏济善堂热心公益，长期捐助敬老院、儿童福利院，传承孟子仁爱精神，回馈社会。",
};

export default function CharityPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F5F0E8]">
        <Header />
        <main>
          <CharityClient />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
