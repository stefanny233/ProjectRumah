import React from "react";
import { CreditCard, X, QrCode, Sparkles } from "lucide-react";

// Import Helper Logic
import { getMemberTierInfo } from "../../pages/MemberList";

export default function ProfileModal({ userData, memberPoints, onClose }) {
  if (!userData) return null;

  // Gunakan Unified Helper agar 100% SINKRON dengan MemberList (Admin)
  const tierInfo = getMemberTierInfo(memberPoints);

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[99999]"
    >
      <div 
        onClick={e => e.stopPropagation()} 
        className="bg-white rounded-3xl w-full max-w-md p-6 border border-slate-200/60 shadow-2xl relative text-left"
      >
        {/* HEADER MODAL */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#10b981]" />
            <span className="text-sm font-bold text-slate-800">Patient Priority Pass</span>
          </div>
          <button 
            onClick={onClose} 
            type="button"
            className="w-7 h-7 rounded-full bg-slate-50 border-none flex items-center justify-center cursor-pointer hover:bg-slate-100 transition text-slate-400 active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* KARTU MEMBER DINAMIS */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white mb-5 relative overflow-hidden shadow-md">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Luna Digital Pharmacy Card</span>
              <h4 className="text-base font-bold text-white">{userData.name}</h4>
            </div>
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-955 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-955 fill-amber-955 animate-pulse" /> {tierInfo.label}
            </div>
          </div>
          <div className="flex justify-between items-end border-t border-slate-800 pt-4">
            <div>
              <span className="text-[9px] text-slate-400 block mb-0.5">No. Rekam Medis (RM)</span>
              <span className="text-xs font-mono font-bold tracking-widest text-[#e1f5ee]">{userData.patientRecordId}</span>
            </div>
            <div className="bg-white p-1 rounded-lg shadow-sm">
              <QrCode className="w-9 h-9 text-slate-950" />
            </div>
          </div>
        </div>

        {/* DETAIL INFO */}
        <div className="divide-y divide-slate-100 mb-6">
          {[
            { label: "Email Pasien", value: userData.email },
            { label: "Nomor Telepon", value: userData.phone },
            { label: "Tanggal Registrasi Sesi", value: userData.joinDate },
            { label: "Total Poin Terkumpul", value: `${memberPoints || 0} Pts` },
            { label: "Status Akses", value: userData.status, bold: true, color: "text-[#10b981]" },
          ].map((row, i) => (
            <div key={i} className="flex justify-between py-3 text-xs">
              <span className="text-slate-400">{row.label}</span>
              <span className={`font-semibold ${row.color || "text-slate-800"}`}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* TOMBOL KEMBALI */}
        <button 
          onClick={onClose} 
          type="button"
          className="w-full bg-slate-950 hover:bg-[#059669] text-white text-xs font-bold py-3 rounded-xl transition cursor-pointer active:scale-95"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}