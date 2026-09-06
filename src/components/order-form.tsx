"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Product } from "@/lib/shared";

export function OrderForm({
  products,
  presetProduct,
  whatsappNumber,
}: {
  products: Product[];
  presetProduct?: string;
  whatsappNumber: string;
}) {
  const { t, locale } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [wechat, setWechat] = useState("");
  const [method, setMethod] = useState("whatsapp");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (presetProduct && products.length) {
      const p = products.find((x) => x.slug === presetProduct);
      if (p) {
        setProductId(p.id);
        setProductName(p.name);
      }
    } else if (products.length && !productId) {
      setProductId(products[0].id);
      setProductName(products[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, presetProduct]);

  const selected = products.find((p) => p.id === productId);
  const total = selected ? selected.priceUsd * quantity : 0;

  function onSelect(id: string) {
    setProductId(id);
    const p = products.find((x) => x.id === id);
    if (p) setProductName(p.name);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim() || !productName.trim()) {
      setError(t("order.name") + " / " + t("order.phone") + " ?");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          productName,
          quantity,
          totalUsd: total,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          customerWechat: wechat,
          contactMethod: method,
          country,
          address,
          message,
          locale,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Error");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    const waText = encodeURIComponent(
      `Order: ${productName} x${quantity}, Name: ${name}, Phone: ${phone}`
    );
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center shadow-sm">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-stone-900 mb-2">
          {t("order.success")}
        </h3>
        <p className="text-stone-500 mb-6">
          {t("order.estimatedTotal")}: <span className="font-bold text-red-800">${total.toFixed(2)}</span>
        </p>
        <a
          href={`https://wa.me/${(whatsappNumber || "85265131587").replace(/[^0-9]/g, "")}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg font-semibold"
        >
          <MessageCircle className="w-5 h-5" />
          {t("contact.whatsapp")}
        </a>
      </div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-red-700 focus:ring-2 focus:ring-red-100 outline-none transition text-stone-800";
  const labelCls = "block text-sm font-medium text-stone-700 mb-1.5";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-5"
    >
      {/* 产品选择 */}
      <div>
        <label className={labelCls}>{t("order.product")} *</label>
        <select
          value={productId}
          onChange={(e) => onSelect(e.target.value)}
          className={inputCls}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.unit}) - ${p.priceUsd}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>{t("order.quantity")}</label>
          <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-3 text-xl text-stone-600 hover:bg-stone-100"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="flex-1 text-center py-3 outline-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-3 text-xl text-stone-600 hover:bg-stone-100"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className={labelCls}>{t("order.estimatedTotal")}</label>
          <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-800 font-bold text-xl">
            ${total.toFixed(2)} {t("common.currency")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>{t("order.name")} *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("order.namePlaceholder")}
            className={inputCls}
            required
          />
        </div>
        <div>
          <label className={labelCls}>{t("order.phone")} *</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("order.phonePlaceholder")}
            className={inputCls}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>{t("order.email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("order.emailPlaceholder")}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{t("order.wechat")}</label>
          <input
            value={wechat}
            onChange={(e) => setWechat(e.target.value)}
            placeholder={t("order.wechatPlaceholder")}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>{t("order.country")}</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder={t("order.countryPlaceholder")}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{t("order.method")}</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className={inputCls}
          >
            <option value="whatsapp">{t("order.whatsapp")}</option>
            <option value="wechat">{t("order.wechatMethod")}</option>
            <option value="email">{t("order.emailMethod")}</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>{t("order.address")}</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t("order.addressPlaceholder")}
          className={inputCls}
        />
      </div>

      <div>
        <label className={labelCls}>{t("order.message")}</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder={t("order.messagePlaceholder")}
          className={inputCls}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-4 bg-red-800 hover:bg-red-900 disabled:bg-stone-400 text-amber-50 rounded-lg font-bold text-lg transition-colors shadow"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t("order.submitting")}
          </>
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
        {!submitting && t("order.submit")}
      </button>
    </form>
  );
}
