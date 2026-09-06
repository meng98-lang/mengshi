import type { Locale } from "@/lib/i18n/config";

// 客户端安全的纯函数模块（禁止引入任何 node-only / supabase 依赖）

// 多语言字段取值：精确匹配 → 简繁互退 → 英文 → 首个 → fallback
export function pickLocale<T>(
  field: Partial<Record<Locale, T>> | null | undefined,
  locale: Locale,
  fallback: T
): T {
  if (!field) return fallback;
  if (field[locale] != null) return field[locale] as T;
  if (locale === "zh-TW" && field["zh-CN"] != null) return field["zh-CN"] as T;
  if (locale === "zh-CN" && field["zh-TW"] != null) return field["zh-TW"] as T;
  if (field.en != null) return field.en as T;
  const first = Object.values(field)[0];
  return (first as T) ?? fallback;
}

// 生成 WhatsApp 联系链接
export function waLink(number: string, message?: string): string {
  const num = (number || "").replace(/[^0-9]/g, "");
  if (!num) return "#";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${num}${text}`;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  origin: string;
  unit: string;
  priceUsd: number;
  comparePriceUsd: number | null;
  images: string[];
  highlights: string[];
  rating: number;
  reviewsCount: number;
  sortOrder: number;
}

export interface SiteSettings {
  siteName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  adminPassword: string;
  currency: string;
  facebookPixelId: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
}
