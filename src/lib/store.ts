import { getSupabaseClient } from "@/storage/database/supabase-client";
import type { Locale } from "@/lib/i18n/config";

// ---------- 多语言辅助 ----------
type I18nText = Partial<Record<Locale, string>>;

export function pickLocale<T>(
  field: Partial<Record<Locale, T>> | null | undefined,
  locale: Locale,
  fallback: T
): T {
  if (!field) return fallback;
  // 1. 精确匹配 2. 中文之间回退 3. 英文 4. fallback
  if (field[locale] != null) return field[locale] as T;
  if (locale === "zh-TW" && field["zh-CN"] != null)
    return field["zh-CN"] as T;
  if (locale === "zh-CN" && field["zh-TW"] != null)
    return field["zh-TW"] as T;
  if (field.en != null) return field.en as T;
  const first = Object.values(field)[0];
  return (first as T) ?? fallback;
}

// ---------- 类型 ----------
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

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "百年孟氏济善堂参茸商行",
  whatsappNumber: "8613800000000",
  whatsappMessage: "您好，我对贵店药材有兴趣，想咨询订购。",
  adminPassword: "mengshi2024",
  currency: "USD",
  facebookPixelId: "",
  googleAnalyticsId: "",
  tiktokPixelId: "",
};

interface RawProduct {
  id: string;
  slug: string;
  category: string;
  name_i18n: I18nText;
  subtitle_i18n: I18nText | null;
  description_i18n: I18nText | null;
  origin_i18n: I18nText | null;
  unit_i18n: I18nText | null;
  price_usd: string;
  compare_price_usd: string | null;
  images: string[] | null;
  highlights_i18n: Record<Locale, string[]> | null;
  rating: string | null;
  reviews_count: number | null;
  sort_order: number | null;
}

// ---------- 设置 ----------
export async function getSettings(): Promise<SiteSettings> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("ms_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw new Error(`查询设置失败: ${error.message}`);
    if (!data) {
      // 首次访问，写入默认设置
      const { error: insErr } = await client
        .from("ms_settings")
        .insert({ id: 1 })
        .select()
        .maybeSingle();
      if (insErr && insErr.code !== "23505") {
        // 非重复键错误才抛出
      }
      return DEFAULT_SETTINGS;
    }
    return {
      siteName: data.site_name ?? DEFAULT_SETTINGS.siteName,
      whatsappNumber: data.whatsapp_number ?? DEFAULT_SETTINGS.whatsappNumber,
      whatsappMessage:
        data.whatsapp_message ?? DEFAULT_SETTINGS.whatsappMessage,
      adminPassword: data.admin_password ?? DEFAULT_SETTINGS.adminPassword,
      currency: data.currency ?? DEFAULT_SETTINGS.currency,
      facebookPixelId: data.facebook_pixel_id ?? "",
      googleAnalyticsId: data.google_analytics_id ?? "",
      tiktokPixelId: data.tiktok_pixel_id ?? "",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(
  patch: Partial<SiteSettings>
): Promise<void> {
  const client = getSupabaseClient();
  const dbPatch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.siteName != null) dbPatch.site_name = patch.siteName;
  if (patch.whatsappNumber != null)
    dbPatch.whatsapp_number = patch.whatsappNumber;
  if (patch.whatsappMessage != null)
    dbPatch.whatsapp_message = patch.whatsappMessage;
  if (patch.adminPassword != null)
    dbPatch.admin_password = patch.adminPassword;
  if (patch.currency != null) dbPatch.currency = patch.currency;
  if (patch.facebookPixelId != null)
    dbPatch.facebook_pixel_id = patch.facebookPixelId;
  if (patch.googleAnalyticsId != null)
    dbPatch.google_analytics_id = patch.googleAnalyticsId;
  if (patch.tiktokPixelId != null)
    dbPatch.tiktok_pixel_id = patch.tiktokPixelId;

  const { error } = await client
    .from("ms_settings")
    .update(dbPatch)
    .eq("id", 1);
  if (error) throw new Error(`更新设置失败: ${error.message}`);
}

// ---------- 产品 ----------
function mapProduct(raw: RawProduct, locale: Locale): Product {
  return {
    id: raw.id,
    slug: raw.slug,
    category: raw.category,
    name: pickLocale(raw.name_i18n, locale, raw.slug),
    subtitle: pickLocale(raw.subtitle_i18n, locale, ""),
    description: pickLocale(raw.description_i18n, locale, ""),
    origin: pickLocale(raw.origin_i18n, locale, ""),
    unit: pickLocale(raw.unit_i18n, locale, ""),
    priceUsd: parseFloat(raw.price_usd) || 0,
    comparePriceUsd: raw.compare_price_usd
      ? parseFloat(raw.compare_price_usd)
      : null,
    images: Array.isArray(raw.images) && raw.images.length ? raw.images : [],
    highlights: raw.highlights_i18n
      ? pickLocale<string[]>(
          raw.highlights_i18n as unknown as Partial<Record<Locale, string[]>>,
          locale,
          []
        )
      : [],
    rating: raw.rating ? parseFloat(raw.rating) : 4.9,
    reviewsCount: raw.reviews_count ?? 0,
    sortOrder: raw.sort_order ?? 0,
  };
}

export async function getProducts(locale: Locale): Promise<Product[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("ms_products")
    .select("*")
    .eq("enabled", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`查询产品失败: ${error.message}`);
  return (data as RawProduct[]).map((r) => mapProduct(r, locale));
}

export async function getProductBySlug(
  slug: string,
  locale: Locale
): Promise<Product | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("ms_products")
    .select("*")
    .eq("slug", slug)
    .eq("enabled", true)
    .maybeSingle();
  if (error) throw new Error(`查询产品失败: ${error.message}`);
  if (!data) return null;
  return mapProduct(data as RawProduct, locale);
}

export async function getAllProductsAdmin(): Promise<Record<string, unknown>[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("ms_products")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`查询产品失败: ${error.message}`);
  return (data ?? []) as Record<string, unknown>[];
}

// ---------- 订单 ----------
export interface OrderInput {
  productId?: string | null;
  productName: string;
  quantity: number;
  totalUsd: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerWechat?: string;
  contactMethod: string;
  country?: string;
  address?: string;
  message?: string;
  locale: string;
}

export async function createOrder(input: OrderInput): Promise<string> {
  const client = getSupabaseClient();
  const orderNumber =
    "MS" +
    Date.now().toString().slice(-8) +
    Math.floor(Math.random() * 100).toString().padStart(2, "0");
  const { data, error } = await client
    .from("ms_orders")
    .insert({
      order_number: orderNumber,
      product_id: input.productId ?? null,
      product_name: input.productName,
      quantity: input.quantity,
      total_usd: input.totalUsd,
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      customer_email: input.customerEmail ?? null,
      customer_wechat: input.customerWechat ?? null,
      contact_method: input.contactMethod,
      country: input.country ?? null,
      address: input.address ?? null,
      message: input.message ?? null,
      locale: input.locale,
      status: "pending",
      is_read: false,
    })
    .select("id")
    .single();
  if (error) throw new Error(`创建订单失败: ${error.message}`);
  return orderNumber;
}

export interface Order {
  id: string;
  order_number: string;
  product_name: string;
  quantity: number;
  total_usd: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  customer_wechat: string | null;
  contact_method: string;
  country: string | null;
  address: string | null;
  message: string | null;
  locale: string;
  status: string;
  is_read: boolean;
  created_at: string;
}

export async function getOrders(): Promise<Order[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("ms_orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(`查询订单失败: ${error.message}`);
  return (data ?? []) as Order[];
}

export async function updateOrderStatus(
  id: string,
  patch: { status?: string; is_read?: boolean }
): Promise<void> {
  const client = getSupabaseClient();
  const dbPatch: Record<string, unknown> = {};
  if (patch.status != null) dbPatch.status = patch.status;
  if (patch.is_read != null) dbPatch.is_read = patch.is_read;
  const { error } = await client.from("ms_orders").update(dbPatch).eq("id", id);
  if (error) throw new Error(`更新订单失败: ${error.message}`);
}
