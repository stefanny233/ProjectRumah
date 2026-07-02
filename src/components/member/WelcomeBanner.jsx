import React from "react";
import { CreditCard, QrCode } from "lucide-react";

export default function WelcomeBanner({ userData, memberPoints, nextTierPoints, progressPct, onProfileOpen }) {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl border border-slate-800">
      {/* Decorative Blur Circles */}
      <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-12 -bottom-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex-1 text-left">
        <span className="inline-block bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider border border-emerald-500/10">
          Selamat datang kembali 👋
        </span>
        <h1 className="text-2xl md:text-3xl font-master-bold text-white mb-2 tracking-tight">
          Halo, {userData.name.split(" ")[0]}!
        </h1>
        <p className="text-xs text-slate-300 max-w-lg leading-relaxed mb-5">
          Kamu memiliki <strong className="text-emerald-400 font-bold">{memberPoints} poin</strong> aktif. Kumpulkan {nextTierPoints - memberPoints} poin lagi untuk otomatis naik ke tier Platinum!
        </p>
        <div className="max-w-xs">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-medium">
            <span>Gold Care</span>
            <span className="font-bold text-emerald-400">{memberPoints} / {nextTierPoints} Poin</span>
            <span>Platinum</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex gap-3 w-full md:w-auto">
        <button 
          onClick={onProfileOpen} 
          className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <CreditCard className="w-4 h-4" /> Kartu Member
        </button>
        <button 
          onClick={onProfileOpen} 
          className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 hover:border-slate-600 text-xs font-bold px-5 py-3 rounded-xl transition active:scale-95 cursor-pointer"
        >
          <QrCode className="w-4 h-4" /> Scan QR
        </button>
      </div>
    </div>
  );
}