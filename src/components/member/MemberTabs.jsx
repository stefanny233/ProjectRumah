import React from "react";

const navTabs = [
  { id: "beranda", label: "Beranda" },
  { id: "resep", label: "Tebus Resep" },
  { id: "reward", label: "Reward & Tier" },
  { id: "riwayat", label: "Riwayat Transaksi" },
];

export default function MemberTabs({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white/60 backdrop-blur-md border-b border-slate-200/60 px-6 py-2 flex gap-2 justify-center sticky top-[72px] z-30">
      <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
        {navTabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === t.id 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}