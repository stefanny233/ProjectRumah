import React from "react";
import { CreditCard, QrCode } from "lucide-react";

export default function WelcomeBanner({ userData, memberPoints, nextTierPoints, progressPct, onProfileOpen }) {
  return (
    <div style={{ background: "#0a1f0a", borderRadius: 20, padding: "28px 32px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", right: -30, top: -30, width: 180, height: 180, background: "rgba(29,158,117,.08)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", right: 60, bottom: -40, width: 120, height: 120, background: "rgba(29,158,117,.05)", borderRadius: "50%" }} />

      <div style={{ zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ background: "rgba(29,158,117,.2)", color: "#5dcaa5", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: "0.5px solid rgba(93,202,165,.2)" }}>
            Selamat datang kembali 👋
          </span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6, lineHeight: 1.3 }}>
          Halo, {userData.name.split(" ")[0]}!
        </h1>
        <p style={{ fontSize: 13, color: "#5dcaa5", maxWidth: 440, lineHeight: 1.6 }}>
          Kamu punya <strong style={{ color: "#9fe1cb" }}>{memberPoints} poin</strong> aktif. Tinggal {nextTierPoints - memberPoints} poin lagi untuk naik ke tier Platinum!
        </p>
        <div style={{ marginTop: 14, maxWidth: 320 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#5dcaa5", marginBottom: 5 }}>
            <span>Gold Care</span>
            <span>{memberPoints} / {nextTierPoints} poin</span>
            <span>Platinum</span>
          </div>
          <div style={{ height: 6, background: "#e1f5ee", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #1d9e75, #5dcaa5)", borderRadius: 99, width: `${progressPct}%`, transition: "width .6s" }} />
          </div>
        </div>
      </div>

      <div style={{ zIndex: 1, display: "flex", gap: 10 }}>
        <button onClick={onProfileOpen} style={{ background: "#1d9e75", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <CreditCard style={{ width: 14, height: 14 }} /> Kartu Member
        </button>
        <button style={{ background: "rgba(255,255,255,.07)", border: "0.5px solid rgba(255,255,255,.15)", color: "#9fe1cb", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <QrCode style={{ width: 14, height: 14 }} /> Scan Kartu
        </button>
      </div>
    </div>
  );
}