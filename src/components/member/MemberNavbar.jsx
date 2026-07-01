import React from "react";
import { useNavigate } from "react-router-dom";
import { Pill, LogOut, Bell, User, Sparkles } from "lucide-react";

export default function MemberNavbar({ userData, memberTier, onProfileOpen }) {
  const navigate = useNavigate();

  return (
    <nav style={{ background: "#fff", borderBottom: "0.5px solid #d4ddd4", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50, height: 60 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, background: "#1d9e75", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Pill style={{ width: 18, height: 18, color: "#fff" }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1f0a", display: "flex", alignItems: "center", gap: 6 }}>
            Apotek
            <span style={{ fontSize: 10, background: "#e1f5ee", color: "#0f6e56", border: "0.5px solid #9fe1cb", padding: "2px 7px", borderRadius: 6, fontWeight: 700, letterSpacing: ".05em" }}>PRIORITY</span>
          </div>
          <div style={{ fontSize: 11, color: "#6b7c6b" }}>Digital Pharmacy System</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button style={{ position: "relative", width: 36, height: 36, background: "#f4f6f3", border: "0.5px solid #d4ddd4", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Bell style={{ width: 16, height: 16, color: "#5a6e5a" }} />
          <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "#1d9e75", borderRadius: "50%", border: "1.5px solid #fff" }} />
        </button>

        <button onClick={onProfileOpen} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f4f6f3", border: "0.5px solid #d4ddd4", borderRadius: 10, padding: "6px 12px 6px 6px", cursor: "pointer" }}>
          <div style={{ width: 28, height: 28, background: "#1d9e75", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User style={{ width: 14, height: 14, color: "#fff" }} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#0a1f0a", lineHeight: 1.3 }}>{userData.name.split(" ").slice(0, 2).join(" ")}</div>
            <div style={{ fontSize: 10, color: "#1d9e75", fontWeight: 500, display: "flex", alignItems: "center", gap: 3 }}>
              <Sparkles style={{ width: 10, height: 10, fill: "#f59e0b", color: "#f59e0b" }} /> {memberTier}
            </div>
          </div>
        </button>

        <button onClick={() => navigate("/login")} style={{ width: 34, height: 34, background: "#fef2f2", border: "0.5px solid #fecaca", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <LogOut style={{ width: 15, height: 15, color: "#ef4444" }} />
        </button>
      </div>
    </nav>
  );
}