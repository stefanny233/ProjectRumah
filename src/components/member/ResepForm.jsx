import React from "react";
import { CheckCircle2, Clock } from "lucide-react";

export default function ResepForm({ isOrdered, formData, onChange, onSubmit, onReset, loading }) {
  return (
    <div className="mb-8">
      <div className="mb-4 text-left">
        <span className="text-[10px] text-amber-700 font-bold uppercase tracking-widest block mb-0.5">Direct Submission</span>
        <h2 className="text-lg font-bold text-teal-950">Form Penebusan Resep Online</h2>
        <p className="text-xs text-slate-500 mt-1">Kirim data resep sekarang, obat akan disiapkan dan siap diambil lewat jalur antrean prioritas.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-md border border-amber-500/15 rounded-3xl p-6 shadow-sm">
        {!isOrdered ? (
          <form onSubmit={onSubmit} className="space-y-5 text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-slate-600 mb-2">Nama Pasien</label>
                <input 
                  type="text" 
                  name="customerName" 
                  required 
                  placeholder="Sesuai KTP" 
                  value={formData.customerName} 
                  onChange={onChange} 
                  className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-slate-600 mb-2">Nomor Telepon</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="08..." 
                  value={formData.phone} 
                  onChange={onChange} 
                  className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-slate-600 mb-2">Pilihan Layanan</label>
                <select 
                  name="medicineType" 
                  required 
                  value={formData.medicineType} 
                  onChange={onChange} 
                  className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800 cursor-pointer"
                >
                  <option value="">Pilih Layanan</option>
                  <option value="Obat Bebas / Vitamin">Penebusan Obat Bebas</option>
                  <option value="Tebus Resep Dokter">Penebusan Resep Dokter</option>
                  <option value="Alat Kesehatan Medis">Alat Kesehatan Medis</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold text-slate-600 mb-2">Detail Catatan Resep</label>
              <textarea 
                name="notes" 
                rows="3" 
                required 
                placeholder="Tuliskan nama obat, merk, atau dosis..." 
                value={formData.notes} 
                onChange={onChange} 
                className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800 resize-y" 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-teal-950 hover:bg-teal-900 text-white text-xs font-bold py-3.5 rounded-xl transition shadow-md cursor-pointer"
            >
              {loading ? "Menyimpan Data..." : "Kirim Pengajuan Resep"}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-master-title text-slate-900 mb-2">Resep Berhasil Diajukan</h3>
            <p className="text-xs text-slate-500 mb-6">Apoteker kami akan segera memproses antrean Anda.</p>
            <div className="text-xs text-emerald-600 font-bold bg-emerald-50 w-fit px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-1.5 mx-auto mb-5">
              <Clock className="w-4 h-4 animate-pulse" /> Nomor antrean prioritas Anda telah aktif. Silakan menuju apotek.
            </div>
            <button 
              onClick={onReset} 
              className="bg-white border border-slate-200 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer text-slate-750"
            >
              Kirim Pengajuan Baru
            </button>
          </div>
        )}
      </div>
    </div>
  );
}