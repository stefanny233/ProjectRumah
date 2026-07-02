import React from "react";
import { CheckCircle2 } from "lucide-react";

const tiers = [
  {
    name: "Silver Care", price: "Rp 50.000", period: "/tahun",
    active: false, dark: false,
    perks: [
      { text: "Potongan obat rutin 5%", ok: true },
      { text: "Konsultasi chat apoteker", ok: true },
      { text: "Jalur loket VIP prioritas", ok: false },
    ]
  },
  {
    name: "Gold Care", price: "Rp 120.000", period: "/tahun",
    active: true, dark: false, badge: "Aktif",
    perks: [
      { text: "Potongan semua obat 15%", ok: true },
      { text: "Antar obat gratis radius 5km", ok: true },
      { text: "Jalur loket VIP bebas antre", ok: true },
    ]
  },
  {
    name: "Chronic Disease Platinum", price: "Rp 250.000", period: "/tahun",
    active: false, dark: true,
    perks: [
      { text: "Diskon obat kronis 25%", ok: true },
      { text: "Konseling interaksi obat intensif", ok: true },
      { text: "Reminder minum obat otomatis", ok: true },
    ]
  },
];

export default function TierSection() {
  return (
    <div className="text-left">
      <div className="mb-4">
        <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-widest block mb-0.5">Pharmacy Tiers</span>
        <h2 className="text-lg font-bold text-slate-800">Pilihan Kelas Keanggotaan</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t, i) => (
          <div 
            key={i} 
            className={`rounded-3xl p-6 border relative flex flex-col justify-between transition-all duration-300 ${
              t.active 
                ? "border-[#10b981] bg-emerald-50/20 shadow-md shadow-emerald-500/5" 
                : t.dark 
                ? "bg-slate-900 border-slate-800 text-white shadow-sm" 
                : "bg-white/80 border-slate-200/60 shadow-sm"
            }`}
          >
            {t.badge && (
              <span className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {t.badge}
              </span>
            )}
            
            <div className="mb-6">
              <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                t.dark ? "text-emerald-400" : t.active ? "text-emerald-600" : "text-slate-400"
              }`}>
                {t.name}
              </span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-black">{t.price}</span>
                <span className={`text-xs ${t.dark ? "text-slate-400" : "text-slate-400"}`}>{t.period}</span>
              </div>
            </div>

            <ul className={`space-y-3 pt-5 border-t ${t.dark ? "border-slate-800" : "border-slate-100"}`}>
              {t.perks.map((p, j) => (
                <li 
                  key={j} 
                  className={`flex items-center gap-2 text-xs ${
                    p.ok 
                      ? t.dark ? "text-slate-200" : "text-slate-600" 
                      : "text-slate-300 line-through"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.ok ? "text-emerald-500" : "text-slate-300"}`} />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}