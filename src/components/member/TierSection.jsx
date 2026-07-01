import React from "react";
import { CheckCircle2 } from "lucide-react";

const tiers = [
  {
    name: "Silver Care", price: "Rp 50.000", period: "/tahun",
    active: false, dark: false,
    perks: [
      { text: "Potongan obat rutin 5%", ok: true },
      { text: "Konsultasi chat apoteker", ok: true },
      { text: "Jalur loket VIP prioritas", ok: false },
    ]
  },
  {
    name: "Gold Care", price: "Rp 120.000", period: "/tahun",
    active: true, dark: false, badge: "Aktif",
    perks: [
      { text: "Potongan semua obat 15%", ok: true },
      { text: "Antar obat gratis radius 5km", ok: true },
      { text: "Jalur loket VIP bebas antre", ok: true },
    ]
  },
  {
    name: "Chronic Disease Platinum", price: "Rp 250.000", period: "/tahun",
    active: false, dark: true,
    perks: [
      { text: "Diskon obat kronis 25%", ok: true },
      { text: "Konseling interaksi obat intensif", ok: true },
      { text: "Reminder minum obat otomatis", ok: true },
    ]
  },
];

export default function TierSection() {
  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#6b7c6b", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 2 }}>Pharmacy Tiers</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#0a1f0a" }}>Pilihan Kelas Keanggotaan</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {tiers.map((t, i) => (
          <div key={i} style={{ borderRadius: 16, padding: 24, border: t.active ? "2px solid #1d9e75" : "0.5px solid #d4ddd4", background: t.dark ? "#0a1f0a" : "#fff", position: "relative" }}>
            {t.badge && (
              <span style={{ position: "absolute", top: -1, right: 20, transform: "translateY(-50%)", background: "#1d9e75", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{t.badge}</span>
            )}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: t.dark ? "#5dcaa5" : t.active ? "#1d9e75" : "#888", marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: t.dark ? "#fff" : "#0a1f0a" }}>
                {t.price}<span style={{ fontSize: 12, fontWeight: 400, color: t.dark ? "#5dcaa5" : "#888" }}>{t.period}</span>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: `0.5px solid ${t.dark ? "#1a3a1a" : "#e8f0e8"}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
              {t.perks.map((p, j) => (
                <li key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: p.ok ? (t.dark ? "#9fe1cb" : "#4a5e4a") : "#c4d4c4", textDecoration: p.ok ? "none" : "line-through" }}>
                  <CheckCircle2 style={{ width: 14, height: 14, color: p.ok ? "#1d9e75" : "#c4d4c4", flexShrink: 0 }} /> {p.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}