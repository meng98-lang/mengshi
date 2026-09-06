import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

export const dynamic = "force-dynamic";

const DEFAULT_PASSWORD = "mengshi2024";

async function getAdminPassword(): Promise<string> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("ms_settings")
      .select("admin_password")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return DEFAULT_PASSWORD;
    return data.admin_password || DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = (body?.password ?? "").trim();
    if (!password) {
      return NextResponse.json({ success: false, error: "请输入密码" }, { status: 400 });
    }
    const realPassword = await getAdminPassword();
    if (password === realPassword) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: "密码错误" }, { status: 401 });
  } catch (error) {
    console.error("[Auth] error:", error);
    return NextResponse.json({ success: false, error: "服务器错误" }, { status: 500 });
  }
}
