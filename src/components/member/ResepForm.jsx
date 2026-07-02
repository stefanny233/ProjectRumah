import React from "react";
import { PlusCircle, CheckCircle2, Clock } from "lucide-react";

export default function ResepForm({ isRegistered, patientData, onChange, onSubmit, onReset }) {
  return (
    <div className="mb-8">
      <div className="mb-4 text-left">
        <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-widest block mb-0.5">Prescription Submission</span>
        <h2 className="text-lg font-bold text-slate-800">Ajukan Penebusan Resep VIP</h2>
        <p className="text-xs text-slate-400 mt-1">Kirim data resep sekarang, obat akan disiapkan dan siap diambil lewat jalur antrean prioritas.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        {!isRegistered ? (
          <form onSubmit={onSubmit} className="space-y-5 text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-slate-600 mb-2">Nama Lengkap Pasien</label>
                <input 
                  type="text" 
                  name="patientName" 
                  required 
                  placeholder="Contoh: Budi Sudarsono" 
                  value={patientData.patientName} 
                  onChange={onChange} 
                  className="w-full text-xs px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 text-slate-800" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-slate-600 mb-2">No. ID Resep Dokter</label>
                <input 
                  type="text" 
                  name="prescriptionId" 
                  required 
                  placeholder="RSP-2026-8812" 
                  value={patientData.prescriptionId} 
                  onChange={onChange} 
                  className="w-full text-xs px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 text-slate-800" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-slate-600 mb-2">Metode Pengambilan</label>
                <select 
                  name="serviceChoice" 
                  required 
                  value={patientData.serviceChoice} 
                  onChange={onChange} 
                  className="w-full text-xs px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 text-slate-800 cursor-pointer"
                >
                  <option value="">Pilih Layanan</option>
                  <option value="Ambil Langsung via Jalur Cepat VIP">Ambil Langsung via Jalur VIP</option>
                  <option value="Kirim Gratis ke Alamat Rumah">Kirim Gratis ke Rumah</option>
                  <option value="Konsultasi Obat Dulu di Ruang Farmasi">Siapkan + Konsultasi Apoteker</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold text-slate-600 mb-2">Catatan (Alergi / Permintaan Merk)</label>
              <textarea 
                name="notes" 
                rows={3} 
                required 
                placeholder="Alergi antibiotik tertentu, atau catatan pengantaran..." 
                value={patientData.notes} 
                onChange={onChange} 
                className="w-full text-xs px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 text-slate-800 resize-y" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              <PlusCircle className="w-4 h-4" /> Ajukan Penebusan Resep
            </button>
          </form>
        ) : (
          <div className="flex items-start gap-4 py-4 text-left">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0 border border-emerald-100">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800 mb-1">Tiket Resep Berhasil Masuk Sistem!</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Halo <strong>{patientData.patientName}</strong>, resep ID <strong>{patientData.prescriptionId}</strong> sedang divalidasi apoteker via <strong>{patientData.serviceChoice}</strong>.
              </p>
              <div className="text-xs text-emerald-600 font-bold bg-emerald-50 w-fit px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-1.5 mb-4">
                <Clock className="w-4 h-4 animate-pulse" /> Waktu tunggu Anda dipotong. Silakan langsung ke loket priority.
              </div>
              <button 
                onClick={onReset} 
                className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-5 py-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                Ajukan Resep Lain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}