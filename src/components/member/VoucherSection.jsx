import React from "react";
import { Gift, Heart, Pill, ChevronRight } from "lucide-react";

const vouchers = [
  {
    icon: <Gift style={{ width: 18, height: 18 }} />, iconBg: "#e1f5ee", iconColor: "#0f6e56",
    badge: "Klaim Kuota", badgeBg: "#fef3c7", badgeColor: "#92400e",
    title: "Diskon 20% Obat Racikan Resep",
    desc: "Berlaku khusus obat sirup, puyer, atau kapsul racikan non-BPJS.",
    btnBg: "#1d9e75", btnHover: "#0f6e56", btnText: "Gunakan Voucher",
    code: "LUNA-RACIK20",
  },
  {
    icon: <Heart style={{ width: 18, height: 18 }} />, iconBg: "#0a1f0a", iconColor: "#9fe1cb",
    badge: "Spesial Poin", badgeBg: "#e1f5ee", badgeColor: "#0f6e56",
    title: "Gratis 1 Paket Vitamin Imun",
    desc: "Tukarkan poin dengan 1 strip Vitamin C / Zink dosis tinggi.",
    btnBg: "#0a1f0a", btnHover: "#000", btnText: "Tukar 300 Poin",
    code: "LUNA-FREEVIT",
  },
  {
    icon: <Pill style={{ width: 18, height: 18 }} />, iconBg: "#fef3c7", iconColor: "#92400e",
    badge: "Subsidi Pasien", badgeBg: "#fef2f2", badgeColor: "#991b1b",
    title: "Potongan Rp30.000 Obat OTC",
    desc: "Berlaku untuk suplemen, alat kesehatan, atau obat tanpa resep.",
    btnBg: "#1d9e75", btnHover: "#0f6e56", btnText: "Gunakan Voucher",
    code: "LUNA-HEALTH30K",
  },
];

export default function VoucherSection({ onVoucherClick }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, color: "#6b7c6b", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 2 }}>Exclusive Rewards</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#0a1f0a" }}>Voucher & Subsidi Bulan Ini</div>
        </div>
        <button style={{ background: "transparent", border: "0.5px solid #c4d4c4", borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 500, color: "#2a3b2a", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          Semua <ChevronRight style={{ width: 12, height: 12 }} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {vouchers.map((v, i) => (
          <div key={i} style={{ background: "#fff", border: "0.5px solid #d4ddd4", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14, transition: "all .15s", cursor: "default" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d9e75"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(29,158,117,.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#d4ddd4"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, background: v.iconBg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: v.iconColor }}>
                  {v.icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: v.badgeBg, color: v.badgeColor }}>{v.badge}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0a1f0a", marginBottom: 5, lineHeight: 1.4 }}>{v.title}</div>
              <div style={{ fontSize: 12, color: "#5a6e5a", lineHeight: 1.5 }}>{v.desc}</div>
            </div>
            <button
              onClick={() => onVoucherClick({ title: v.title, code: v.code })}
              style={{ width: "100%", background: v.btnBg, color: "#fff", border: "none", borderRadius: 10, padding: "9px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = v.btnHover}
              onMouseLeave={e => e.currentTarget.style.background = v.btnBg}
            >
              {v.btnText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}