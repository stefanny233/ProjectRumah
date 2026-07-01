import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pill, LogIn } from "lucide-react";

/**
 * PRD v1 - BASIC LANDING PAGE
 * ============================
 * Versi paling dasar: Header, Hero, Form Lead Capture sederhana, Footer.
 * Tidak ada koneksi database, tidak ada fitur CRM, murni statis.
 */
export default function GuestHome_PRD1() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.phone) setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f0fdf4" }}>
      {/* HEADER */}
      <header style={{
        background: "#16a34a", color: "white", padding: "1rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Pill size={24} />
          <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>SIApotek</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "white", color: "#16a34a", border: "none",
            padding: "0.5rem 1.25rem", borderRadius: "0.5rem",
            cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.4rem"
          }}
        >
          <LogIn size={16} /> Sign In
        </button>
      </header>

      {/* HERO SECTION */}
      <section style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#15803d", marginBottom: "1rem" }}>
          Farmasi Modern Lebih Mudah & Cepat
        </h1>
        <p style={{ color: "#4b5563", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
          Pesan obat Anda secara online dengan mudah, aman, dan cepat.
          Kami hadir untuk membantu kebutuhan kesehatan Anda setiap hari.
        </p>

        {/* LEAD CAPTURE FORM */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white", padding: "2rem", borderRadius: "1rem",
              maxWidth: "400px", margin: "0 auto", boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
            }}
          >
            <h2 style={{ color: "#16a34a", marginBottom: "1.5rem" }}>Pesan Sekarang</h2>
            <div style={{ marginBottom: "1rem", textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.3rem", color: "#374151", fontWeight: "500" }}>
                Nama Pasien
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Masukkan nama lengkap"
                required
                style={{
                  width: "100%", padding: "0.65rem", borderRadius: "0.5rem",
                  border: "1px solid #d1d5db", fontSize: "1rem", boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.3rem", color: "#374151", fontWeight: "500" }}>
                Nomor Telepon
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="08xxxxxxxxxx"
                required
                style={{
                  width: "100%", padding: "0.65rem", borderRadius: "0.5rem",
                  border: "1px solid #d1d5db", fontSize: "1rem", boxSizing: "border-box"
                }}
              />
            </div>
            <button type="submit" style={{
              width: "100%", background: "#16a34a", color: "white",
              padding: "0.75rem", borderRadius: "0.5rem", border: "none",
              fontSize: "1rem", fontWeight: "bold", cursor: "pointer"
            }}>
              Kirim Permintaan
            </button>
          </form>
        ) : (
          <div style={{
            background: "white", padding: "2rem", borderRadius: "1rem",
            maxWidth: "400px", margin: "0 auto", boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "3rem" }}>✅</div>
            <h3 style={{ color: "#16a34a" }}>Terima Kasih, {form.name}!</h3>
            <p style={{ color: "#6b7280" }}>Tim kami akan menghubungi Anda di nomor {form.phone}.</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#15803d", color: "white", textAlign: "center", padding: "1.5rem" }}>
        <p>© 2026 SIApotek — Sistem Informasi Apotek. All rights reserved.</p>
      </footer>
    </div>
  );
}
