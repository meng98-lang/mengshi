import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

export const dynamic = "force-dynamic";

const FALLBACK = {
  siteName: "百年孟氏济善堂参茸商行",
  whatsappNumber: "",
  whatsappMessage: "",
  adminPassword: "mengshi2024",
  currency: "USD",
  facebookPixelId: "",
  googleAnalyticsId: "",
  tiktokPixelId: "",
};

async function getRealPassword(): Promise<string> {
  try {
    const client = getSupabaseClient();
    const { data } = await client
      .from("ms_settings")
      .select("admin_password")
      .eq("id", 1)
      .maybeSingle();
    return data?.admin_password || FALLBACK.adminPassword;
  } catch {
    return FALLBACK.adminPassword;
  }
}

// GET: 返回设置
export async function GET(req: NextRequest) {
  const admin = req.nextUrl.searchParams.get("admin");
  try {
    const client = getSupabaseClient();
    const { data } = await client
      .from("ms_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (!data) {
      return NextResponse.json({ success: true, data: FALLBACK });
    }

    const settings = {
      siteName: data.site_name ?? FALLBACK.siteName,
      whatsappNumber: data.whatsapp_number ?? "",
      whatsappMessage: data.whatsapp_message ?? "",
      adminPassword: admin ? data.admin_password : undefined,
      currency: data.currency ?? "USD",
      facebookPixelId: data.facebook_pixel_id ?? "",
      googleAnalyticsId: data.google_analytics_id ?? "",
      tiktokPixelId: data.tiktok_pixel_id ?? "",
    };
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("[Settings GET] error:", error);
    return NextResponse.json({ success: true, data: FALLBACK });
  }
}

// PUT: 更新设置（需管理员密码）
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, ...updates } = body as Record<string, string> & {
      password?: string;
    };

    const realPassword = await getRealPassword();
    if (!password || password !== realPassword) {
      return NextResponse.json({ success: false, error: "未授权" }, { status: 401 });
    }

    const dbUpdates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (updates.siteName !== undefined) dbUpdates.site_name = updates.siteName;
    if (updates.whatsappNumber !== undefined)
      dbUpdates.whatsapp_number = updates.whatsappNumber;
    if (updates.whatsappMessage !== undefined)
      dbUpdates.whatsapp_message = updates.whatsappMessage;
    if (updates.adminPassword !== undefined && updates.adminPassword)
      dbUpdates.admin_password = updates.adminPassword;
    if (updates.currency !== undefined) dbUpdates.currency = updates.currency;
    if (updates.facebookPixelId !== undefined)
      dbUpdates.facebook_pixel_id = updates.facebookPixelId;
    if (updates.googleAnalyticsId !== undefined)
      dbUpdates.google_analytics_id = updates.googleAnalyticsId;
    if (updates.tiktokPixelId !== undefined)
      dbUpdates.tiktok_pixel_id = updates.tiktokPixelId;

    const client = getSupabaseClient();
    const { error } = await client
      .from("ms_settings")
      .update(dbUpdates)
      .eq("id", 1);
    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Settings PUT] error:", error);
    return NextResponse.json({ success: false, error: "服务器错误" }, { status: 500 });
  }
}
