import React from "react";
import { Pill, Sparkles, FileText, Truck, MessageCircle, Star, ChevronRight, HelpCircle, ChevronDown } from "lucide-react";

const quickActions = [
  { icon: <FileText className="w-4 h-4" />, label: "Lihat Riwayat Resep", color: "text-emerald-600 bg-emerald-50" },
  { icon: <Truck className="w-4 h-4" />, label: "Lacak Pengiriman Obat", color: "text-blue-600 bg-blue-50" },
  { icon: <MessageCircle className="w-4 h-4" />, label: "Chat Apoteker", color: "text-purple-600 bg-purple-50" },
  { icon: <Star className="w-4 h-4" />, label: "Tukar Poin Reward", color: "text-amber-600 bg-amber-50" },
];

const recentActivities = [
  { label: "Penebusan Resep #RSP-2026-0041", time: "2 jam lalu", status: "Selesai", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-100" },
  { label: "Tukar Poin — Vitamin C Strip", time: "Kemarin", status: "Diproses", statusColor: "text-amber-700 bg-amber-50 border-amber-100" },
  { label: "Konsultasi Apoteker Online", time: "3 hari lalu", status: "Selesai", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-100" },
];

const faqs = [
  { q: "Apakah diskon 15% berlaku untuk obat resep dokter luar?", a: "Berlaku mase! Diskon member Gold Care kami mencakup seluruh obat generik maupun paten yang sah secara medis." },
  { q: "Bagaimana cara kerja pengiriman obat gratis ke rumah?", a: "Setelah resep dikirim, apoteker akan mengemas obat secara higienis, lalu kurir kami mengantarkan ke rumah tanpa ongkos kirim." },
  { q: "Apakah rekam medis digital bisa digunakan di cabang lain?", a: "Sangat bisa mase! Sistem Luna Apotek sudah tersinkronisasi secara cloud di seluruh jaringan cabang kota." },
];

export default function MemberSidebar({ userData, onProfileOpen, openFaq, setOpenFaq }) {
  return (
    <div className="flex flex-col gap-6 text-left">

      {/* MEMBER CARD MINI */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
          <Pill className="w-24 h-24 text-white" />
        </div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Luna Priority Card</span>
            <h3 className="text-base font-bold text-white">{userData.name}</h3>
          </div>
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-950 fill-amber-950" /> Gold
          </span>
        </div>
        <div className="border-t border-slate-800 pt-4 flex justify-between items-end">
          <div>
            <span className="text-[9px] text-slate-400 block">No. Rekam Medis</span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#e1f5ee]">{userData.patientRecordId}</span>
          </div>
          <button 
            onClick={onProfileOpen} 
            className="bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/30 text-[#9fe1cb] rounded-lg px-3 py-1.5 text-[10px] font-bold transition cursor-pointer active:scale-95"
          >
            Detail Kartu
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Aksi Cepat</h3>
        <div className="divide-y divide-slate-100">
          {quickActions.map((a, i) => (
            <button 
              key={i} 
              className="w-full bg-transparent border-none py-3.5 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold group-hover:text-[#10b981] transition">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.color}`}>
                  {a.icon}
                </div>
                {a.label}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* AKTIVITAS TERKINI */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Aktivitas Terkini</h3>
        <div className="divide-y divide-slate-100">
          {recentActivities.map((a, i) => (
            <div key={i} className="py-3 flex justify-between items-center text-xs">
              <div>
                <h4 className="font-bold text-slate-800 mb-1">{a.label}</h4>
                <span className="text-[10px] text-slate-400">{a.time}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${a.statusColor}`}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
        <h3 className="p-5 pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">FAQ Layanan</h3>
        <div className="divide-y divide-slate-100">
          {faqs.map((f, i) => (
            <div key={i}>
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                type="button" 
                className="w-full text-left bg-transparent border-none cursor-pointer p-4 text-xs font-bold text-slate-700 flex justify-between items-center gap-3 hover:bg-slate-50/50"
              >
                <span className="flex items-center gap-2 flex-1">
                  <HelpCircle className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  <span className="line-height-1.4">{f.q}</span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#10b981] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 pl-9 text-xs text-slate-400 leading-relaxed border-t border-slate-50/50 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}