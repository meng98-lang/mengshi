"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("ms_admin_auth", "1");
        localStorage.setItem("ms_admin_pwd", password);
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "密码错误");
      }
    } catch {
      setError("登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-red-950 to-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-600/20 flex items-center justify-center mb-4 border border-amber-700/40">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-black text-amber-50">百年孟氏济善堂</h1>
          <p className="text-stone-400 text-sm mt-2">参茸商行 · 后台管理系统</p>
        </div>

        <form onSubmit={handleLogin} className="bg-stone-900/80 backdrop-blur border border-stone-700 rounded-2xl p-8">
          <label className="block text-stone-300 text-sm mb-2 font-medium">管理密码</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入管理密码"
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-stone-800 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-600"
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-amber-700 hover:bg-amber-600 disabled:opacity-60 text-amber-50 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            登录管理后台
          </button>
          <p className="text-stone-500 text-xs text-center mt-4">默认密码：mengshi2024</p>
        </form>
      </div>
    </div>
  );
}
