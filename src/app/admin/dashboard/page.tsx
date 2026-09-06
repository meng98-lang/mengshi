import { Suspense } from "react";
import { AdminDashboard } from "@/components/admin-dashboard";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-100" />}>
      <AdminDashboard />
    </Suspense>
  );
}
