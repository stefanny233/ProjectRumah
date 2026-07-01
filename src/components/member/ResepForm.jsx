import React from "react";
import { PlusCircle, CheckCircle2, Clock } from "lucide-react";

export default function ResepForm({ isRegistered, patientData, onChange, onSubmit, onReset }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#1d9e75", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 2 }}>Prescription Submission</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#0a1f0a" }}>Ajukan Penebusan Resep</div>
        <div style={{ fontSize: 12, color: "#5a6e5a", marginTop: 3 }}>Kirim data resep, obat akan disiapkan sebelum kamu tiba di loket.</div>
      </div>

      <div style={{ background: "#fff", border: "0.5px solid #d4ddd4", borderRadius: 16, padding: 20 }}>
        {!isRegistered ? (
          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#4a5e4a", display: "block", marginBottom: 6 }}>Nama Lengkap Pasien</label>
                <input type="text" name="patientName" required placeholder="Contoh: Budi Sudarsono" value={patientData.patientName} onChange={onChange} style={{ width: "100%", padding: "10px 14px", fontSize: 13, border: "0.5px solid #c4d4c4", borderRadius: 10, background: "#fff", color: "#1a1f1a", outline: "none", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#4a5e4a", display: "block", marginBottom: 6 }}>No. ID Resep Dokter</label>
                <input type="text" name="prescriptionId" required placeholder="RSP-2026-8812" value={patientData.prescriptionId} onChange={onChange} style={{ width: "100%", padding: "10px 14px", fontSize: 13, border: "0.5px solid #c4d4c4", borderRadius: 10, background: "#fff", color: "#1a1f1a", outline: "none", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#4a5e4a", display: "block", marginBottom: 6 }}>Metode Pengambilan</label>
                <select name="serviceChoice" required value={patientData.serviceChoice} onChange={onChange} style={{ width: "100%", padding: "10px 14px", fontSize: 13, border: "0.5px solid #c4d4c4", borderRadius: 10, background: "#fff", color: "#1a1f1a", outline: "none", fontFamily: "inherit" }}>
                  <option value="">Pilih Layanan</option>
                  <option value="Ambil Langsung via Jalur Cepat VIP">Ambil Langsung via Jalur VIP</option>
                  <option value="Kirim Gratis ke Alamat Rumah">Kirim Gratis ke Rumah</option>
                  <option value="Konsultasi Obat Dulu di Ruang Farmasi">Siapkan + Konsultasi Apoteker</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#4a5e4a", display: "block", marginBottom: 6 }}>Catatan (Alergi / Permintaan Merk)</label>
              <textarea name="notes" rows={3} required placeholder="Alergi antibiotik tertentu, atau catatan pengantaran..." value={patientData.notes} onChange={onChange} style={{ width: "100%", padding: "10px 14px", fontSize: 13, border: "0.5px solid #c4d4c4", borderRadius: 10, background: "#fff", color: "#1a1f1a", outline: "none", fontFamily: "inherit", resize: "vertical" }} />
            </div>
            <button type="submit" style={{ background: "#1d9e75", color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <PlusCircle style={{ width: 15, height: 15 }} /> Ajukan Penebusan Resep
            </button>
          </form>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 44, height: 44, background: "#e1f5ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CheckCircle2 style={{ width: 22, height: 22, color: "#0f6e56" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1f0a", marginBottom: 5 }}>Tiket Resep Berhasil Masuk Sistem!</div>
              <p style={{ fontSize: 13, color: "#4a5e4a", lineHeight: 1.6, marginBottom: 8 }}>
                Halo <strong>{patientData.patientName}</strong>, resep ID <strong>{patientData.prescriptionId}</strong> sedang divalidasi apoteker via <strong>{patientData.serviceChoice}</strong>.
              </p>
              <div style={{ fontSize: 12, color: "#0f6e56", fontWeight: 500, display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
                <Clock style={{ width: 13, height: 13 }} /> Waktu tunggu kamu sudah dipotong. Silakan duduk di ruang tunggu Gold ber-AC.
              </div>
              <button onClick={onReset} style={{ background: "transparent", border: "0.5px solid #c4d4c4", borderRadius: 10, padding: "9px 18px", fontSize: 12, fontWeight: 500, color: "#2a3b2a", cursor: "pointer" }}>
                Ajukan Resep Lain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}