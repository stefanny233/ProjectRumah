import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pill, LogIn, ShieldCheck, Clock, Activity, Truck,
  ChevronDown, Phone
} from "lucide-react";

/**
 * PRD v2 - INTERMEDIATE LANDING PAGE
 * =====================================
 * Tambahan dari PRD v1:
 * - Hero Stats (total transaksi & pelanggan semi-statis)
 * - Core Capabilities Grid (4 keunggulan apotek)
 * - Operational Workflow Steps (4 langkah cara kerja)
 * - FAQ Section interaktif (accordion)
 * - Emergency Contact CTA (tombol WhatsApp)
 */
export default function GuestHome_PRD2() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", medicineType: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const stats = { totalCustomers: 120, totalTransactions: 234 };

  const capabilities = [
    { icon: <ShieldCheck size={32} color="#16a34a" />, title: "Obat Asli Bersertifikat BPOM", desc: "Semua produk obat kami telah mendapatkan sertifikasi resmi dari BPOM." },
    { icon: <Activity size={32} color="#16a34a" />, title: "Diverifikasi Apoteker Berlisensi", desc: "Setiap resep diperiksa dan diverifikasi oleh apoteker berpengalaman." },
    { icon: <Clock size={32} color="#16a34a" />, title: "Penyiapan Obat Cepat & Tepat", desc: "Estimasi waktu penyiapan obat racikan kurang dari 30 menit." },
    { icon: <Truck size={32} color="#16a34a" />, title: "Rekam Riwayat Alergi Pasien", desc: "Sistem mencatat riwayat alergi untuk keamanan pemberian obat." },
  ];

  const workflow = [
    { step: "01", title: "Input Data Pasien", desc: "Masukkan nama, nomor telepon, dan jenis obat yang dibutuhkan." },
    { step: "02", title: "Verifikasi Apoteker", desc: "Tim apoteker kami memeriksa ketersediaan dan kelayakan obat." },
    { step: "03", title: "Penyiapan & Pengemasan", desc: "Obat disiapkan secara higienis sesuai standar farmasi." },
    { step: "04", title: "Serah Terima Obat", desc: "Ambil obat di apotek atau kami antarkan ke lokasi Anda." },
  ];

  const faqs = [
    { q: "Apakah obat yang dijual sudah terdaftar BPOM?", a: "Ya, 100% produk kami telah mendapatkan izin edar resmi dari BPOM." },
    { q: "Berapa lama waktu penyiapan obat racikan?", a: "Rata-rata 20-30 menit tergantung jumlah dan jenis racikan." },
    { q: "Apakah bisa memesan tanpa resep dokter?", a: "Untuk obat bebas (OTC) bisa langsung, untuk obat keras wajib melampirkan resep dokter." },
    { q: "Apakah ada layanan antar obat ke rumah?", a: "Saat ini layanan antar tersedia dalam radius 5 km dari apotek." },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.phone) setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f9fafb" }}>
      {/* HEADER */}
      <header style={{
        background: "#15803d", color: "white", padding: "1rem 2.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Pill size={26} />
          <span style={{ fontWeight: "700", fontSize: "1.3rem" }}>SIApotek</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "white", color: "#15803d", border: "none",
            padding: "0.5rem 1.5rem", borderRadius: "0.5rem",
            cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.4rem"
          }}
        >
          <LogIn size={16} /> Masuk
        </button>
      </header>

      {/* HERO + STATS */}
      <section style={{ background: "linear-gradient(135deg, #15803d, #22c55e)", color: "white", padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: "1rem", fontWeight: "800" }}>
          Farmasi Modern Lebih Mudah & Cepat
        </h1>
        <p style={{ fontSize: "1.15rem", maxWidth: "600px", margin: "0 auto 2.5rem", opacity: 0.9 }}>
          Pesan obat, verifikasi resep, dan kelola kebutuhan farmasi Anda dengan sistem digital terintegrasi.
        </p>
        {/* HERO STATS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>{stats.totalCustomers}+</div>
            <div style={{ opacity: 0.85 }}>Pelanggan Terdaftar</div>
          </div>
          <div>
            <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>{stats.totalTransactions}+</div>
            <div style={{ opacity: 0.85 }}>Total Transaksi</div>
          </div>
          <div>
            <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>100%</div>
            <div style={{ opacity: 0.85 }}>Produk Bersertifikat BPOM</div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section style={{ padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", color: "#15803d", fontSize: "1.8rem", marginBottom: "2.5rem" }}>
          Keunggulan Layanan Kami
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {capabilities.map((c, i) => (
            <div key={i} style={{
              background: "white", padding: "1.5rem", borderRadius: "1rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.07)", textAlign: "center"
            }}>
              <div style={{ marginBottom: "0.75rem" }}>{c.icon}</div>
              <h3 style={{ color: "#15803d", fontSize: "0.95rem", marginBottom: "0.5rem" }}>{c.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section style={{ background: "#f0fdf4", padding: "4rem 2rem" }}>
        <h2 style={{ textAlign: "center", color: "#15803d", fontSize: "1.8rem", marginBottom: "2.5rem" }}>
          Cara Kerja SIApotek
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", maxWidth: "900px", margin: "0 auto" }}>
          {workflow.map((w, i) => (
            <div key={i} style={{
              background: "white", padding: "1.5rem", borderRadius: "1rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.07)", flex: "1 1 180px", maxWidth: "210px"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#bbf7d0" }}>{w.step}</div>
              <h3 style={{ color: "#15803d", fontSize: "0.95rem", margin: "0.5rem 0" }}>{w.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section style={{ padding: "4rem 2rem", maxWidth: "500px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", color: "#15803d", fontSize: "1.8rem", marginBottom: "1.5rem" }}>
          Buat Pesanan
        </h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{
            background: "white", padding: "2rem", borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            {[
              { label: "Nama Pasien", key: "name", type: "text", placeholder: "Nama lengkap" },
              { label: "Nomor Telepon", key: "phone", type: "tel", placeholder: "08xxxxxxxxxx" },
              { label: "Jenis Obat", key: "medicineType", type: "text", placeholder: "Contoh: Obat Bebas, Racikan..." },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.3rem", color: "#374151", fontWeight: "500" }}>{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  required
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.3rem", color: "#374151", fontWeight: "500" }}>Catatan Tambahan</label>
              <textarea
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="Tuliskan catatan atau resep dokter Anda..."
                rows={3}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", boxSizing: "border-box", resize: "vertical" }}
              />
            </div>
            <button type="submit" style={{
              width: "100%", background: "#16a34a", color: "white",
              padding: "0.75rem", borderRadius: "0.5rem", border: "none",
              fontSize: "1rem", fontWeight: "bold", cursor: "pointer"
            }}>Kirim Pesanan</button>
          </form>
        ) : (
          <div style={{
            background: "white", padding: "2.5rem", borderRadius: "1rem",
            textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontSize: "3rem" }}>✅</div>
            <h3 style={{ color: "#16a34a" }}>Pesanan Terkirim!</h3>
            <p style={{ color: "#6b7280" }}>Tim kami akan menghubungi {form.name} di nomor {form.phone}.</p>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section style={{ background: "#f9fafb", padding: "4rem 2rem", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", color: "#15803d", fontSize: "1.8rem", marginBottom: "2rem" }}>
          Pertanyaan Umum (FAQ)
        </h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: "0.75rem", background: "white", borderRadius: "0.75rem", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                width: "100%", padding: "1rem 1.25rem", background: "none", border: "none",
                textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer", fontWeight: "600", color: "#1f2937", fontSize: "0.95rem"
              }}
            >
              {faq.q}
              <ChevronDown size={18} style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
            </button>
            {openFaq === i && (
              <div style={{ padding: "0.75rem 1.25rem", color: "#6b7280", borderTop: "1px solid #f3f4f6" }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* EMERGENCY CTA */}
      <section style={{ background: "#14532d", color: "white", padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>Butuh Konsultasi Darurat?</h2>
        <p style={{ opacity: 0.85, marginBottom: "1.5rem" }}>Tim apoteker kami siap membantu Anda 24 jam via WhatsApp.</p>
        <a
          href="https://wa.me/628111234567"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#22c55e", color: "white", padding: "0.75rem 2rem",
            borderRadius: "2rem", textDecoration: "none", fontWeight: "bold",
            display: "inline-flex", alignItems: "center", gap: "0.5rem"
          }}
        >
          <Phone size={18} /> Hubungi via WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#15803d", color: "white", textAlign: "center", padding: "1.5rem" }}>
        <p>© 2026 SIApotek — Sistem Informasi Apotek. All rights reserved.</p>
      </footer>
    </div>
  );
}
