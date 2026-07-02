import React from "react";
import { useNavigate } from "react-router-dom";
import { Pill, LogOut, Bell, User, Sparkles } from "lucide-react";

export default function MemberNavbar({ userData, memberTier, onProfileOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-slate-200/50 px-6 lg:px-10 py-4 flex justify-between items-center shadow-sm">
      {/* SISI KIRI: LOGO */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <Pill className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-800 flex items-center gap-2 leading-none">
            <span>SIApotek</span>
            <span className="text-[8px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              PRIORITY
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider mt-1">
            Digital Pharmacy System
          </span>
        </div>
      </div>

      {/* SISI KANAN: MENU USER & LOGOUT */}
      <div className="flex items-center gap-3">
        {/* Notifikasi */}
        <button className="relative w-9 h-9 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 transition cursor-pointer active:scale-95">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-white" />
        </button>

        {/* Profil Member */}
        <button 
          onClick={onProfileOpen} 
          className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl p-1 pr-3 transition cursor-pointer active:scale-95"
        >
          <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              {userData.name.split(" ").slice(0, 2).join(" ")}
            </div>
            <div className="text-[9px] text-[#10b981] font-bold flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-amber-500 animate-bounce" /> {memberTier}
            </div>
          </div>
        </button>

        {/* Tombol Logout */}
        <button 
          onClick={handleLogout} 
          className="w-9 h-9 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 text-rose-600 rounded-xl flex items-center justify-center transition cursor-pointer active:scale-95"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}