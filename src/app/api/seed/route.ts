import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";
import { seedProducts } from "@/lib/seed-products";

// 初始化/同步产品种子数据（幂等，按 slug upsert）
export async function GET(_req: NextRequest) {
  try {
    const client = getSupabaseClient();

    // 确保设置存在
    const { error: setErr } = await client
      .from("ms_settings")
      .upsert({ id: 1 }, { onConflict: "id" });
    if (setErr) throw new Error(`设置初始化失败: ${setErr.message}`);

    // 同步产品（仅当产品为空时插入，避免覆盖后台修改）
    const { data: existing, error: exErr } = await client
      .from("ms_products")
      .select("slug");
    if (exErr) throw new Error(`查询产品失败: ${exErr.message}`);

    const existingSlugs = new Set((existing ?? []).map((r: { slug: string }) => r.slug));
    const toInsert = seedProducts
      .filter((p) => !existingSlugs.has(p.slug))
      .map((p) => ({
        slug: p.slug,
        category: p.category,
        name_i18n: p.name,
        subtitle_i18n: p.subtitle,
        description_i18n: p.description,
        origin_i18n: p.origin,
        unit_i18n: p.unit,
        price_usd: p.price,
        compare_price_usd: p.comparePrice,
        images: [p.image],
        highlights_i18n: p.highlights,
        rating: p.rating,
        reviews_count: p.reviews,
        enabled: true,
        sort_order: p.sort,
      }));

    let inserted = 0;
    if (toInsert.length > 0) {
      const { error: insErr } = await client.from("ms_products").insert(toInsert);
      if (insErr) throw new Error(`插入产品失败: ${insErr.message}`);
      inserted = toInsert.length;
    }

    return NextResponse.json({
      success: true,
      inserted,
      totalProducts: seedProducts.length,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "seed failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
