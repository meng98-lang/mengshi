import { NextResponse } from "next/server";
import { getProducts, getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: Record<string, unknown> = {
    env: {
      url: process.env.COZE_SUPABASE_URL ? "set" : "MISSING",
      anon: process.env.COZE_SUPABASE_ANON_KEY ? "set" : "MISSING",
      service: process.env.COZE_SUPABASE_SERVICE_ROLE_KEY ? "set" : "MISSING",
      secret: process.env.COZE_SUPABASE_SECRET_KEY ? "set" : "MISSING",
    },
  };
  try {
    const products = await getProducts("en");
    result.productsCount = Array.isArray(products) ? products.length : -1;
    result.firstProduct = Array.isArray(products) && products[0]
      ? { name: products[0].name, slug: products[0].slug }
      : null;
  } catch (e) {
    result.productsError = e instanceof Error ? e.message : String(e);
  }
  try {
    const settings = await getSettings();
    result.settings = settings ? { siteName: settings.siteName, wa: settings.whatsappNumber } : null;
  } catch (e) {
    result.settingsError = e instanceof Error ? e.message : String(e);
  }
  return NextResponse.json(result);
}
