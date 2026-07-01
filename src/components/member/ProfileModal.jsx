import React from "react";
import { CreditCard, X, QrCode, Sparkles } from "lucide-react";

export default function ProfileModal({ userData, onClose }) {
  // Jika data belum siap, jangan render apa pun
  if (!userData) return null;

  return (
    <div 
      onClick={onClose} 
      style={{ 
        position: "fixed", 
        inset: 0, 
        background: "rgba(0,0,0,.55)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: 16, 
        zIndex: 99999, 
        backdropFilter: "blur(4px)" 
      }}
    >
      <div 
        onClick={e => e.stopPropagation()} 
        style={{ 
          background: "#fff", 
          borderRadius: 24, 
          width: "100%", 
          maxWidth: 440, 
          padding: 24, 
          border: "0.5px solid #d4ddd4",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        {/* HEADER MODAL */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CreditCard style={{ width: 18, height: 18, color: "#1d9e75" }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: "#0a1f0a" }}>Patient Priority Pass</span>
          </div>
          <button 
            onClick={onClose} 
            type="button"
            style={{ width: 28, height: 28, borderRadius: "50%", background: "#f4f6f3", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <X style={{ width: 14, height: 14, color: "#5a6e5a" }} />
          </button>
        </div>

        {/* KARTU MEMBER */}
        <div style={{ background: "#0a1f0a", borderRadius: 18, padding: 22, color: "#fff", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, background: "rgba(29,158,117,.1)", borderRadius: "50%" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 10, color: "#5dcaa5", textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 600, marginBottom: 4 }}>Luna Digital Pharmacy Card</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{userData.name}</div>
            </div>
            <div style={{ background: "#f59e0b", color: "#451a03", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 8, display: "flex", alignItems: "center", gap: 4, textTransform: "uppercase" }}>
              <Sparkles style={{ width: 10, height: 10, fill: "#451a03" }} /> Gold Care
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "0.5px solid #1a3a1a", paddingTop: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: "#5dcaa5", marginBottom: 3 }}>No. Rekam Medis (RM)</div>
              <div style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".1em" }}>{userData.patientRecordId}</div>
            </div>
            <div style={{ background: "#fff", padding: 6, borderRadius: 8 }}>
              <QrCode style={{ width: 36, height: 36, color: "#0a1f0a" }} />
            </div>
          </div>
        </div>

        {/* DETAIL INFO */}
        <div style={{ marginBottom: 16 }}>
          {[
            { label: "Email Pasien", value: userData.email },
            { label: "Nomor Telepon", value: userData.phone },
            { label: "Tanggal Registrasi", value: userData.joinDate },
            { label: "Status Akses", value: userData.status, bold: true, color: "#1d9e75" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "0.5px solid #e8f0e8" : "none", fontSize: 13 }}>
              <span style={{ color: "#8a9e8a" }}>{row.label}</span>
              <span style={{ fontWeight: row.bold ? 700 : 500, color: row.color || "#0a1f0a" }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* TOMBOL KEMBALI */}
        <button 
          onClick={onClose} 
          type="button"
          style={{ width: "100%", background: "#0a1f0a", color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}