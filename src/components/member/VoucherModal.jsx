import React from "react";
import { FileText } from "lucide-react";

export default function VoucherModal({ activeVoucher, onClose }) {
  if (!activeVoucher) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 9999 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 400, padding: 24, border: "0.5px solid #d4ddd4", textAlign: "center" }}>

        <div style={{ width: 52, height: 52, background: "#e1f5ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: "0.5px solid #9fe1cb" }}>
          <FileText style={{ width: 22, height: 22, color: "#0f6e56" }} />
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: "#0a1f0a", marginBottom: 5 }}>Voucher Berhasil Diaktifkan!</div>
        <p style={{ fontSize: 13, color: "#5a6e5a", lineHeight: 1.6, marginBottom: 16 }}>
          Kode diskon untuk <strong style={{ color: "#0a1f0a" }}>"{activeVoucher.title}"</strong> sudah tersambung ke kasir.
        </p>

        <div style={{ background: "#f4f6f3", border: "1.5px dashed #9ab09a", borderRadius: 12, padding: "12px 20px", fontFamily: "monospace", fontSize: 18, fontWeight: 700, letterSpacing: ".15em", color: "#1d9e75", marginBottom: 16, userSelect: "all" }}>
          {activeVoucher.code}
        </div>

        <p style={{ fontSize: 11, color: "#9ab09a", lineHeight: 1.6, marginBottom: 20 }}>
          *Tunjukkan kode ini atau scan barcode rekam medis digital di kasir Luna Apotek.
        </p>

        <button onClick={onClose} style={{ width: "100%", background: "#1d9e75", color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Selesai & Tutup
        </button>
      </div>
    </div>
  );
}