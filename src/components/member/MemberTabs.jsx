import React from "react";

const navTabs = [
  { id: "beranda", label: "Beranda" },
  { id: "resep", label: "Tebus Resep" },
  { id: "reward", label: "Reward" },
  { id: "riwayat", label: "Riwayat" },
];

export default function MemberTabs({ activeTab, setActiveTab }) {
  return (
    <div 
      style={{ 
        background: "#fff", 
        borderBottom: "0.5px solid #d4ddd4", 
        padding: "0 24px", 
        display: "flex", 
        gap: 4,
        justifyContent: "center" // PERBAIKAN: Menyejajarkan tab ke posisi tengah layar
      }}
    >
      {navTabs.map(t => (
        <button
          key={t.id}
          onClick={() => setActiveTab(t.id)}
          style={{
            margin: "8px 0", padding: "8px 18px", borderRadius: 8, fontSize: 13,
            fontWeight: 500, cursor: "pointer", border: "none", transition: "all .15s",
            background: activeTab === t.id ? "#1d9e75" : "transparent",
            color: activeTab === t.id ? "#fff" : "#5a6e5a",
          }}
          onMouseEnter={e => { if (activeTab !== t.id) { e.currentTarget.style.background = "#e1f5ee"; e.currentTarget.style.color = "#0f6e56"; }}}
          onMouseLeave={e => { if (activeTab !== t.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#5a6e5a"; }}}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}