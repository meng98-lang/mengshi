"use client";

import { MessageCircle } from "lucide-react";

export function WhatsappFloat({ whatsappNumber }: { whatsappNumber: string }) {
  // 规范化为纯数字，空值时使用默认号码
  const num = (whatsappNumber || "").replace(/[^0-9]/g, "") || "85265131587";
  return (
    <a
      href={`https://wa.me/${num}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp 咨询"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
