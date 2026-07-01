import React from "react";
import { Pill, Sparkles, FileText, Truck, MessageCircle, Star, ChevronRight, HelpCircle, ChevronDown } from "lucide-react";

const quickActions = [
  { icon: <FileText style={{ width: 14, height: 14 }} />, label: "Lihat Riwayat Resep", color: "#1d9e75" },
  { icon: <Truck style={{ width: 14, height: 14 }} />, label: "Lacak Pengiriman Obat", color: "#3b82f6" },
  { icon: <MessageCircle style={{ width: 14, height: 14 }} />, label: "Chat Apoteker", color: "#8b5cf6" },
  { icon: <Star style={{ width: 14, height: 14 }} />, label: "Tukar Poin Reward", color: "#f59e0b" },
];

const recentActivities = [
  { label: "Penebusan Resep #RSP-2026-0041", time: "2 jam lalu", status: "Selesai", statusColor: "#1d9e75" },
  { label: "Tukar Poin — Vitamin C Strip", time: "Kemarin", status: "Diproses", statusColor: "#f59e0b" },
  { label: "Konsultasi Apoteker Online", time: "3 hari lalu", status: "Selesai", statusColor: "#1d9e75" },
];

const faqs = [
  { q: "Apakah diskon 15% berlaku untuk obat resep dokter luar?", a: "Berlaku mase! Diskon member Gold Care kami mencakup seluruh obat generik maupun paten yang sah secara medis." },
  { q: "Bagaimana cara kerja pengiriman obat gratis ke rumah?", a: "Setelah resep dikirim, apoteker akan mengemas obat secara higienis, lalu kurir kami mengantarkan ke rumah tanpa ongkos kirim." },
  { q: "Apakah rekam medis digital bisa digunakan di cabang lain?", a: "Sangat bisa mase! Sistem Luna Apotek sudah tersinkronisasi secara cloud di seluruh jaringan cabang kota." },
];

export default function MemberSidebar({ userData, onProfileOpen, openFaq, setOpenFaq }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* MEMBER CARD MINI */}
      <div style={{ background: "#0a1f0a", borderRadius: 16, padding: 20, color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, bottom: -20, opacity: .05 }}>
          <Pill style={{ width: 100, height: 100 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 10, color: "#5dcaa5", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600, marginBottom: 3 }}>Luna Priority Card</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{userData.name}</div>
          </div>
          <span style={{ background: "#f59e0b", color: "#451a03", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 6, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 3 }}>
            <Sparkles style={{ width: 9, height: 9, fill: "#451a03" }} /> Gold
          </span>
        </div>
        <div style={{ borderTop: "0.5px solid #1a3a1a", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 10, color: "#5dcaa5", marginBottom: 2 }}>No. Rekam Medis</div>
            <div style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 600, letterSpacing: ".08em", color: "#e1f5ee" }}>{userData.patientRecordId}</div>
          </div>
          <button onClick={onProfileOpen} style={{ background: "rgba(29,158,117,.2)", border: "0.5px solid rgba(93,202,165,.2)", color: "#9fe1cb", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
            Detail Kartu
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ background: "#fff", border: "0.5px solid #d4ddd4", borderRadius: 16, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1f0a", marginBottom: 12 }}>Aksi Cepat</div>
        {quickActions.map((a, i) => (
          <button key={i} style={{ width: "100%", background: "transparent", border: "none", padding: "10px 0", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", borderBottom: i < quickActions.length - 1 ? "0.5px solid #e8f0e8" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#2a3b2a", fontWeight: 500 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color }}>
                {a.icon}
              </div>
              {a.label}
            </div>
            <ChevronRight style={{ width: 14, height: 14, color: "#9ab09a" }} />
          </button>
        ))}
      </div>

      {/* AKTIVITAS TERKINI */}
      <div style={{ background: "#fff", border: "0.5px solid #d4ddd4", borderRadius: 16, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1f0a", marginBottom: 12 }}>Aktivitas Terkini</div>
        {recentActivities.map((a, i) => (
          <div key={i} style={{ padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < recentActivities.length - 1 ? "0.5px solid #e8f0e8" : "none" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1f1a", marginBottom: 2 }}>{a.label}</div>
              <div style={{ fontSize: 11, color: "#8a9e8a" }}>{a.time}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: a.statusColor, background: `${a.statusColor}18`, padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap" }}>{a.status}</span>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ background: "#fff", border: "0.5px solid #d4ddd4", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px 12px", fontSize: 13, fontWeight: 700, color: "#0a1f0a" }}>FAQ Layanan</div>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderTop: "0.5px solid #e8f0e8" }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} type="button" style={{ width: "100%", textAlign: "left", background: "#fff", border: "none", cursor: "pointer", padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#1a1f1a", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                <HelpCircle style={{ width: 13, height: 13, color: "#1d9e75", flexShrink: 0 }} />
                <span style={{ fontSize: 12, lineHeight: 1.4 }}>{f.q}</span>
              </span>
              <ChevronDown style={{ width: 13, height: 13, color: "#1d9e75", transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
            </button>
            {openFaq === i && (
              <div style={{ padding: "0 16px 14px 37px", fontSize: 12, color: "#4a5e4a", lineHeight: 1.6, borderTop: "0.5px solid #e8f0e8" }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}