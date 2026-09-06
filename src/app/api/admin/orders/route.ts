import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

export const dynamic = "force-dynamic";

const DEFAULT_PASSWORD = "mengshi2024";

async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const pwd = req.headers.get("x-admin-password") || "";
  if (!pwd) return false;
  try {
    const client = getSupabaseClient();
    const { data } = await client
      .from("ms_settings")
      .select("admin_password")
      .eq("id", 1)
      .maybeSingle();
    const real = data?.admin_password || DEFAULT_PASSWORD;
    return pwd === real;
  } catch {
    return pwd === DEFAULT_PASSWORD;
  }
}

// GET: 订单列表
export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ success: false, error: "未授权" }, { status: 401 });
  }
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("ms_orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);

    const orders = (data || []).map((r: Record<string, unknown>) => ({
      id: r.id,
      orderNumber: r.order_number,
      productName: r.product_name,
      quantity: r.quantity,
      totalUsd: r.total_usd,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      customerEmail: r.customer_email,
      customerWechat: r.customer_wechat,
      contactMethod: r.contact_method,
      country: r.country,
      address: r.address,
      message: r.message,
      locale: r.locale,
      status: r.status,
      isRead: r.is_read,
      createdAt: r.created_at,
    }));

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("[AdminOrders GET] error:", error);
    return NextResponse.json({ success: false, error: "服务器错误" }, { status: 500 });
  }
}

// PATCH: 更新订单状态
export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ success: false, error: "未授权" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, status } = body as { id: string; status: string };
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "缺少参数" }, { status: 400 });
    }
    const client = getSupabaseClient();
    const { error } = await client
      .from("ms_orders")
      .update({ status, is_read: true })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AdminOrders PATCH] error:", error);
    return NextResponse.json({ success: false, error: "服务器错误" }, { status: 500 });
  }
}
