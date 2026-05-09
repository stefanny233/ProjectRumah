import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    // Background dibuat pakai bg-latar (kalau kamu pakai variabel warna) atau bg-slate-50
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      {/* Container Putih Utama */}
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl shadow-emerald-900/5 border border-slate-100 p-10 md:p-12 animate-in zoom-in duration-500">

        {/* Tempat munculnya Login / Register / Forgot Password */}
        <div className="relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
