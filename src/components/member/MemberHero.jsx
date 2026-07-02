import React from "react";
import { Sparkles, CreditCard, ArrowRight, Pill, Award, Flame } from "lucide-react";

export default function MemberHero({ userData, memberPoints, nextTierPoints, progressPct, onProfileOpen, setActiveTab }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#042f2e] via-[#083e37] to-[#042f2e] text-white rounded-3xl p-8 lg:p-10 mb-8 border border-teal-900/30 shadow-2xl">
      
      {/* Background Mesh Glows - Warm Amber & Jade Mint */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/10 to-teal-400/10 blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-teal-400/10 to-amber-500/5 blur-[80px] pointer-events-none -z-10" />
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Sisi Kiri: Informasi Keanggotaan & CTA */}
        <div className="lg:col-span-7 text-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-400 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-amber-500/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            Portal Priority Member Aktif
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-master-bold text-white tracking-tight leading-tight">
              Selamat Datang Kembali, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-200 to-amber-100">
                {userData.name.split(" ")[0]}!
              </span>
            </h1>
            <p className="text-teal-100/80 text-xs md:text-sm max-w-lg leading-relaxed font-medium">
              Akses cepat seluruh layanan apotek eksklusif Anda di sini. Nikmati fasilitas VIP bebas antre, konsultasi prioritas, dan diskon langsung 15% setiap penebusan obat.
            </p>
          </div>

          {/* Progress Loyalitas - Luxury Teal & Gold styling */}
          <div className="bg-teal-950/40 backdrop-blur-md border border-teal-900/40 rounded-2xl p-5 max-w-md">
            <div className="flex justify-between items-center text-xs text-teal-200/70 mb-2">
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-400" /> Gold Care</span>
              <span className="font-bold text-amber-400">{memberPoints} / {nextTierPoints} Pts</span>
            </div>
            <div className="h-2 bg-teal-950 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[10px] text-teal-200/60 flex items-center gap-1.5 leading-normal">
              <Flame className="w-3 h-3 text-amber-500" />
              Tinggal <strong className="text-amber-400 font-bold">{nextTierPoints - memberPoints} poin</strong> lagi untuk otomatis naik ke tier **Platinum**!
            </p>
          </div>

          {/* Tombol Navigasi Instan */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              onClick={() => setActiveTab("resep")}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-teal-950 text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-amber-500/10 hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              Tebus Resep VIP <ArrowRight className="w-4 h-4 text-teal-950" />
            </button>
            <button 
              onClick={() => setActiveTab("reward")}
              className="bg-teal-900/50 hover:bg-teal-955 hover:text-white text-amber-300 border border-teal-800 text-xs font-bold px-6 py-3.5 rounded-xl transition active:scale-95 cursor-pointer"
            >
              Lihat Voucher Saya
            </button>
          </div>
        </div>

        {/* Sisi Kanan: Kartu Prioritas Digital Pearl Gold (Hover Interactive) */}
        <div className="lg:col-span-5 flex justify-center">
          <div 
            onClick={onProfileOpen}
            className="w-full max-w-[340px] aspect-[1.586/1] bg-gradient-to-br from-[#fcfbf9] via-[#f5f2eb] to-[#e8e4d9] rounded-2xl p-5 text-teal-950 shadow-2xl border border-[#c4b599]/30 relative overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-amber-500/10"
          >
            {/* Glowing Ring Effect on Card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Decorative Holographic Chip */}
            <div className="absolute top-5 right-5 w-10 h-8 bg-gradient-to-br from-amber-500 via-yellow-300 to-amber-600 rounded-md opacity-90 shadow-sm border border-amber-400/30" />
            
            {/* Brand Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-teal-900 rounded-lg flex items-center justify-center text-white">
                <Pill className="w-4 h-4 text-amber-300" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold font-master-title tracking-wide block leading-none text-teal-950">SIApotek</span>
                <span className="text-[7px] text-amber-700 uppercase tracking-widest font-black">Priority</span>
              </div>
            </div>

            {/* Member Details */}
            <div className="text-left mt-auto space-y-4">
              <div>
                <span className="text-[8px] text-slate-500 uppercase tracking-widest block mb-0.5">Nama Pasien VIP</span>
                <div className="text-sm font-bold tracking-wide truncate text-teal-950">{userData.name}</div>
              </div>

              <div className="flex justify-between items-end border-t border-[#c4b599]/30 pt-3">
                <div>
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block mb-0.5">No. Rekam Medis (RM)</span>
                  <span className="text-xs font-mono font-bold tracking-widest text-teal-900">{userData.patientRecordId}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black text-amber-750 text-amber-800 bg-amber-550/10 bg-amber-100 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5 fill-amber-600 animate-pulse text-amber-600" /> Gold Card
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}