"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Package, Settings as SettingsIcon, ShoppingCart,
  Phone, Mail, MessageCircle, Globe, Check, CheckCheck, Loader2,
} from "lucide-react";

type Order = {
  id: string;
  orderNumber: string;
  productName: string | null;
  quantity: number;
  totalUsd: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  customerWechat: string | null;
  contactMethod: string;
  country: string | null;
  address: string | null;
  message: string | null;
  locale: string;
  status: string;
  isRead: boolean;
  createdAt: string;
};

type Settings = {
  siteName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  adminPassword: string;
  currency: string;
  facebookPixelId: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
};

const TABS = [
  { key: "orders", label: "订单咨询", icon: ShoppingCart },
  { key: "settings", label: "网站设置", icon: SettingsIcon },
] as const;

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "settings">("orders");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const authHeaders = (): HeadersInit => ({
    "x-admin-password": adminPassword || localStorage.getItem("ms_admin_pwd") || "",
  });

  useEffect(() => {
    setAdminPassword(localStorage.getItem("ms_admin_pwd") || "");
  }, []);

  useEffect(() => {
    if (localStorage.getItem("ms_admin_auth") !== "1") {
      router.replace("/admin");
      return;
    }
    setAuthed(true);
  }, [router]);

  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders", { headers: authHeaders() });
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch { /* ignore */ }
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.data) setSettings(data.data);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!authed) return;
    (async () => {
      setLoading(true);
      await Promise.all([loadOrders(), loadSettings()]);
      setLoading(false);
    })();
  }, [authed, loadOrders, loadSettings]);

  const handleStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ id, status }),
      });
      loadOrders();
    } catch { /* ignore */ }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, password: adminPassword || localStorage.getItem("ms_admin_pwd") }),
      });
      const data = await res.json();
      if (res.status === 401) {
        setMsg("请在下方输入当前管理密码以保存设置");
      } else if (data.success) {
        setMsg("设置已保存");
        // 若修改了密码，同步更新本地保存的密码
        const newPwd = (settings?.adminPassword || "").trim();
        if (newPwd && newPwd !== adminPassword) {
          localStorage.setItem("ms_admin_pwd", newPwd);
          setAdminPassword(newPwd);
        }
      } else {
        setMsg("保存失败");
      }
    } catch {
      setMsg("保存失败");
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("ms_admin_auth");
    router.replace("/admin");
  };

  if (!authed) return null;

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-stone-900 text-amber-50 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-black text-lg">百年孟氏济善堂 · 后台</h1>
            <p className="text-stone-400 text-xs">参茸商行管理系统</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-stone-300 hover:text-amber-50 text-sm">
            <LogOut className="w-4 h-4" /> 退出
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {TABS.map((tb) => {
            const Icon = tb.icon;
            return (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  tab === tb.key ? "bg-red-800 text-amber-50" : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tb.label}
                {tb.key === "orders" && pendingCount > 0 && (
                  <span className="ml-1 bg-amber-500 text-stone-900 text-xs font-bold rounded-full px-2 py-0.5">
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-stone-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> 加载中...
          </div>
        ) : tab === "orders" ? (
          <OrdersTab orders={orders} onStatus={handleStatus} />
        ) : (
          settings && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 space-y-5">
              <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-red-800" /> 网站设置
              </h2>

              <Field label="网站名称" icon={Package}>
                <input className={inputCls} value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
              </Field>

              <Field label="WhatsApp 客服号码（含国家区号，如 15550186688）" icon={Phone}>
                <input className={inputCls} value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} />
              </Field>

              <Field label="WhatsApp 预填留言" icon={MessageCircle}>
                <input className={inputCls} value={settings.whatsappMessage}
                  onChange={(e) => setSettings({ ...settings, whatsappMessage: e.target.value })} />
              </Field>

              <Field label="后台登录密码" icon={SettingsIcon}>
                <input className={inputCls} value={settings.adminPassword}
                  onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })} />
              </Field>

              <div className="border-t border-stone-200 pt-5">
                <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-red-800" /> 统计 / 追踪代码
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="Facebook Pixel ID">
                    <input className={inputCls} value={settings.facebookPixelId}
                      onChange={(e) => setSettings({ ...settings, facebookPixelId: e.target.value })} placeholder="如 1234567890" />
                  </Field>
                  <Field label="Google Analytics ID">
                    <input className={inputCls} value={settings.googleAnalyticsId}
                      onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })} placeholder="如 G-XXXXXXX" />
                  </Field>
                  <Field label="TikTok Pixel ID">
                    <input className={inputCls} value={settings.tiktokPixelId}
                      onChange={(e) => setSettings({ ...settings, tiktokPixelId: e.target.value })} placeholder="如 XXXXXXXX" />
                  </Field>
                </div>
              </div>

              {msg && <p className="text-sm font-medium text-red-700">{msg}</p>}

              <div className="border-t border-stone-200 pt-5">
                <Field label="验证密码（请输入当前管理密码以保存以上修改）" icon={SettingsIcon}>
                  <input type="password" className={inputCls} value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)} placeholder="输入当前管理密码" />
                </Field>
              </div>

              <button type="submit" disabled={saving}
                className="bg-red-800 hover:bg-red-900 disabled:opacity-60 text-amber-50 font-bold px-6 py-3 rounded-lg flex items-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} 保存设置
              </button>
            </form>
          )
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 text-stone-900";

function Field({ label, icon: Icon, children }: { label: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
        {Icon && <Icon className="w-4 h-4 text-stone-400" />}
        {label}
      </label>
      {children}
    </div>
  );
}

function OrdersTab({ orders, onStatus }: { orders: Order[]; onStatus: (id: string, status: string) => void }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center text-stone-400">
        <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-40" />
        暂无订购咨询
      </div>
    );
  }

  const statusLabel: Record<string, string> = {
    pending: "待处理", contacted: "已联系", completed: "已成交",
  };
  const statusColor: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    contacted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o.id} className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-stone-900">{o.customerName}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[o.status]}`}>
                  {statusLabel[o.status] || o.status}
                </span>
              </div>
              <div className="text-sm text-stone-500 mb-2">
                订单号 {o.orderNumber} · {new Date(o.createdAt).toLocaleString("zh-CN")} · 语言 {o.locale}
              </div>
              <div className="text-stone-800 text-sm">
                <span className="font-medium">{o.productName || "—"}</span>
                {o.quantity > 1 && <span> × {o.quantity}</span>}
                {Number(o.totalUsd) > 0 && <span className="ml-2 text-red-800 font-bold">${Number(o.totalUsd).toFixed(2)}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              {o.status === "pending" && (
                <button onClick={() => onStatus(o.id, "contacted")}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100">
                  <Check className="w-3.5 h-3.5" /> 已联系
                </button>
              )}
              {o.status !== "completed" && (
                <button onClick={() => onStatus(o.id, "completed")}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100">
                  <CheckCheck className="w-3.5 h-3.5" /> 已成交
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm border-t border-stone-100 pt-3">
            <ContactRow icon={Phone} label="电话" value={o.customerPhone} href={`tel:${o.customerPhone}`} />
            {o.customerEmail && <ContactRow icon={Mail} label="邮箱" value={o.customerEmail} href={`mailto:${o.customerEmail}`} />}
            {o.customerWechat && <ContactRow icon={MessageCircle} label="微信" value={o.customerWechat} />}
            {o.country && <ContactRow icon={Globe} label="国家/地区" value={o.country} />}
            {o.address && <ContactRow icon={Package} label="地址" value={o.address} />}
          </div>
          {o.message && (
            <div className="mt-3 text-sm text-stone-600 bg-stone-50 rounded-lg p-3">
              <span className="text-stone-400">留言：</span>{o.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const content = (
    <span className="flex items-center gap-1.5 text-stone-700">
      <Icon className="w-3.5 h-3.5 text-stone-400" />
      <span className="text-stone-400">{label}:</span>
      <span className="break-all">{value}</span>
    </span>
  );
  return href ? <a href={href} className="hover:text-red-800">{content}</a> : content;
}
