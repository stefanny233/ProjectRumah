import React from "react";
import { Gift, Heart, Pill, ChevronRight } from "lucide-react";

const vouchers = [
  {
    icon: <Gift className="w-5 h-5 text-emerald-600" />, iconBg: "bg-emerald-50",
    badge: "Klaim Kuota", badgeBg: "bg-amber-50 text-amber-800 border-amber-100",
    title: "Diskon 20% Obat Racikan Resep",
    desc: "Berlaku khusus obat sirup, puyer, atau kapsul racikan non-BPJS.",
    btnText: "Gunakan Voucher",
    code: "LUNA-RACIK20",
  },
  {
    icon: <Heart className="w-5 h-5 text-teal-600" />, iconBg: "bg-teal-50",
    badge: "Spesial Poin", badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-100",
    title: "Gratis 1 Paket Vitamin Imun",
    desc: "Tukarkan poin dengan 1 strip Vitamin C / Zink dosis tinggi.",
    btnText: "Tukar 300 Poin",
    code: "LUNA-FREEVIT",
  },
  {
    icon: <Pill className="w-5 h-5 text-indigo-600" />, iconBg: "bg-indigo-50",
    badge: "Subsidi Pasien", badgeBg: "bg-rose-50 text-rose-800 border-rose-100",
    title: "Potongan Rp30.000 Obat OTC",
    desc: "Berlaku untuk suplemen, alat kesehatan, atau obat tanpa resep.",
    btnText: "Gunakan Voucher",
    code: "LUNA-HEALTH30K",
  },
];

export default function VoucherSection({ onVoucherClick }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-left">
          <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-widest block mb-0.5">Exclusive Rewards</span>
          <h2 className="text-lg font-bold text-slate-800">Voucher & Subsidi Bulan Ini</h2>
        </div>
        <button className="flex items-center gap-1 bg-white border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 hover:border-emerald-500 hover:text-[#10b981] transition cursor-pointer shadow-sm">
          Semua <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vouchers.map((v, i) => (
          <div 
            key={i} 
            className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between gap-5 hover:border-[#10b981]/30 hover:shadow-lg transition-all duration-300 cursor-default text-left"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className={`w-9 h-9 ${v.iconBg} rounded-xl flex items-center justify-center`}>
                  {v.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${v.badgeBg}`}>{v.badge}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1.5 leading-snug">{v.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
            <button
              onClick={() => onVoucherClick({ title: v.title, code: v.code })}
              className="w-full bg-slate-950 hover:bg-[#059669] text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
            >
              {v.btnText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}