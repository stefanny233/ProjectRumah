import React from "react";
import { Star, FileText, Package, MessageCircle } from "lucide-react";

export default function StatCards({ memberPoints }) {
  const stats = [
    { label: "Poin Reward", value: memberPoints.toLocaleString(), icon: <Star style={{ width: 16, height: 16 }} />, color: "#f59e0b" },
    { label: "Resep Aktif", value: "3", icon: <FileText style={{ width: 16, height: 16 }} />, color: "#1d9e75" },
    { label: "Obat Diambil", value: "24", icon: <Package style={{ width: 16, height: 16 }} />, color: "#3b82f6" },
    { label: "Konsultasi", value: "7", icon: <MessageCircle style={{ width: 16, height: 16 }} />, color: "#8b5cf6" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "#fff", border: "0.5px solid #d4ddd4", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, transition: "transform .15s", cursor: "default" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
            {s.icon}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#6b7c6b", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#0a1f0a" }}>{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}