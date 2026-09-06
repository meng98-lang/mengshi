import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      productId,
      productName,
      quantity,
      totalUsd,
      customerName,
      customerPhone,
      customerEmail,
      customerWechat,
      contactMethod,
      country,
      address,
      message,
      locale,
    } = body ?? {};

    if (!productName || !customerName || !customerPhone) {
      return NextResponse.json(
        { success: false, error: "缺少必填信息（药材、称呼、电话）" },
        { status: 400 }
      );
    }

    const orderNumber = await createOrder({
      productId: productId ?? null,
      productName: String(productName),
      quantity: Number(quantity) || 1,
      totalUsd: Number(totalUsd) || 0,
      customerName: String(customerName),
      customerPhone: String(customerPhone),
      customerEmail: customerEmail ? String(customerEmail) : undefined,
      customerWechat: customerWechat ? String(customerWechat) : undefined,
      contactMethod: contactMethod ? String(contactMethod) : "whatsapp",
      country: country ? String(country) : undefined,
      address: address ? String(address) : undefined,
      message: message ? String(message) : undefined,
      locale: locale ? String(locale) : "zh-CN",
    });

    return NextResponse.json({ success: true, orderNumber });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "order failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
