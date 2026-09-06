import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/language-context";

export const metadata: Metadata = {
  title: {
    default: "百年孟氏济善堂参茸商行 | 道地名贵中药材 · 海外直邮",
    template: "%s | 孟氏济善堂",
  },
  description:
    "百年孟氏济善堂参茸商行，源承亚圣孟子家风，恪守瑞蚨祥孟洛川儒商诚信。精选东阿阿胶、冬虫夏草、藏红花、长白山野山参、灵芝、鹿茸、天山雪莲等名贵滋补中药材，面向海外华人直邮。",
  keywords: [
    "东阿阿胶",
    "冬虫夏草",
    "藏红花",
    "长白山野山参",
    "灵芝",
    "鹿茸",
    "天山雪莲",
    "中药材",
    "参茸",
    "滋补品",
    "海外华人",
    "孟氏济善堂",
    "Meng Jishantang",
    "Chinese herbs",
    "cordyceps",
    "ginseng",
  ],
  openGraph: {
    title: "百年孟氏济善堂参茸商行",
    description:
      "孟府传世好药，道地参茸滋补。源承孟子家风、瑞蚨祥儒商诚信，名贵中药材海外直邮。",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased bg-[#faf6ef] text-stone-800 font-serif">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
