import React from "react";
import { Star, FileText, Package, MessageCircle } from "lucide-react";

export default function StatCards({ memberPoints }) {
  const stats = [
    { label: "Poin Reward", value: memberPoints.toLocaleString() + " Pts", icon: <Star className="w-4.5 h-4.5" />, color: "text-amber-500 bg-amber-50" },
    { label: "Resep Aktif", value: "3 Resep", icon: <FileText className="w-4.5 h-4.5" />, color: "text-emerald-600 bg-emerald-50" },
    { label: "Obat Diambil", value: "24 Item", icon: <Package className="w-4.5 h-4.5" />, color: "text-blue-600 bg-blue-50" },
    { label: "Konsultasi", value: "7 Sesi", icon: <MessageCircle className="w-4.5 h-4.5" />, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((s, i) => (
        <div 
          key={i} 
          className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default text-left"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
            {s.icon}
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">{s.label}</span>
            <span className="text-lg font-bold text-slate-800 mt-1 block">{s.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}