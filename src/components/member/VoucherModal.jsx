import React from "react";
import { FileText, X } from "lucide-react";

export default function VoucherModal({ activeVoucher, onClose }) {
  if (!activeVoucher) return null;

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
    >
      <div 
        onClick={e => e.stopPropagation()} 
        className="bg-white rounded-3xl w-full max-w-xs p-6 border border-slate-200/60 shadow-2xl relative text-center"
      >
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <FileText className="w-5 h-5 text-emerald-600" />
        </div>

        <h3 className="text-sm font-bold text-slate-800 mb-1">Voucher Berhasil Diaktifkan!</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          Kode diskon untuk <strong>"{activeVoucher.title}"</strong> telah terhubung ke sistem kasir.
        </p>

        <div className="bg-slate-50 border-2 border-dashed border-emerald-300 rounded-xl py-3 px-4 font-mono text-lg font-black tracking-widest text-[#10b981] mb-4 select-all">
          {activeVoucher.code}
        </div>

        <p className="text-[10px] text-slate-400 leading-normal mb-5">
          *Tunjukkan kode ini atau sebutkan nomor rekam medis Anda ke kasir Luna Apotek saat melakukan pembayaran.
        </p>

        <button 
          onClick={onClose} 
          className="w-full bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold py-3 rounded-xl transition cursor-pointer active:scale-95"
        >
          Selesai & Tutup
        </button>
      </div>
    </div>
  );
}