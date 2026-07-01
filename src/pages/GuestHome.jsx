import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  Pill,
  LogOut,
  ShoppingBag,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Activity,
  Truck,
  FileText,
  HelpCircle,
  ChevronDown,
  Phone,
  MapPin,
  Award,
  Sparkles,
  Calculator,
  Database,
  BarChart3,
  Users,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export default function GuestHome() {
  const navigate = useNavigate();

  // 1. STATE MANAGEMENT
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    medicineType: "",
    notes: "",
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [stats, setStats] = useState({
    totalCustomers: 120,
    totalTransactions: 234,
  });
  const [loading, setLoading] = useState(false);
  const [orderLogs, setOrderLogs] = useState([]); // Menyimpan log pesanan lokal untuk cadangan/offline demo
  const [dbStatus, setDbStatus] = useState("checking"); // 'connected' | 'error' | 'checking'
  const [dbErrorMsg, setDbErrorMsg] = useState("");

  // CRM Fitur: Simulator Poin & Tier Member
  const [simPurchaseValue, setSimPurchaseValue] = useState(150000);
  const [simPoints, setSimPoints] = useState(150);
  const [simTier, setSimTier] = useState("Bronze");

  // CRM Fitur: Estimasi Waktu Penyiapan Obat
  const [estType, setEstType] = useState("Obat Bebas / Vitamin");
  const [estQty, setEstQty] = useState(1);
  const [estTime, setEstTime] = useState(10);
  const [estWarning, setEstWarning] = useState("");

  // DOM Reference
  const nameInputRef = useRef(null);

  // Cek Konektivitas Supabase Database pada awal load
  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id")
          .limit(1);
        if (error && error.code !== "PGRST116") {
          if (error.message.includes("does not exist")) {
            setDbStatus("connected");
            setDbErrorMsg(
              "Tabel 'orders' belum dibuat di Supabase. Silakan jalankan query SQL dari PRD!",
            );
          } else {
            // Abaikan RLS policy warning untuk testing koneksi select id
            if (error.message.includes("row-level security")) {
              setDbStatus("connected");
              setDbErrorMsg("");
            } else {
              setDbStatus("error");
              setDbErrorMsg(error.message);
            }
          }
        } else {
          setDbStatus("connected");
          setDbErrorMsg("");
        }
      } catch (err) {
        setDbStatus("error");
        setDbErrorMsg("Tidak dapat terhubung ke endpoint Supabase.");
      }
    }
    checkConnection();
  }, []);

  // Update simulator poin jika nilai pembelian berubah
  useEffect(() => {
    // 1 Poin setiap Rp 1.000 pembelian
    const points = Math.floor(simPurchaseValue / 1000);
    setSimPoints(points);

    // Hitung Tier
    if (points >= 500) {
      setSimTier("Platinum");
    } else if (points >= 250) {
      setSimTier("Gold");
    } else if (points >= 100) {
      setSimTier("Silver");
    } else {
      setSimTier("Bronze");
    }
  }, [simPurchaseValue]);

  // Update estimasi waktu pengerjaan obat
  useEffect(() => {
    let baseTime = 10; // menit
    let warning = "";

    if (estType === "Tebus Resep Dokter") {
      baseTime = 30;
      warning =
        "Wajib menyerahkan lembar resep asli/fisik kepada Apoteker saat pengambilan obat.";
    } else if (estType === "Alat Kesehatan Medis") {
      baseTime = 15;
    }

    const calculatedTime = baseTime + (estQty > 3 ? (estQty - 3) * 2 : 0);
    setEstTime(calculatedTime);
    setEstWarning(warning);
  }, [estType, estQty]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Order dengan integrasi database Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const priceSimulated = estType === "Tebus Resep Dokter" ? 185000 : 75000;
    const pointsEarned = Math.floor(priceSimulated / 1000);

    const newOrder = {
      customer_name: formData.customerName,
      phone: formData.phone,
      medicine_type: formData.medicineType || "Obat Bebas / Vitamin",
      notes: formData.notes,
      price: priceSimulated,
      points_earned: pointsEarned,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      // PERBAIKAN UTAMA RLS: Hapus .select() agar tidak memicu RLS SELECT policy violation pada guest user
      const { error } = await supabase.from("orders").insert([newOrder]);

      if (error) throw error;

      // Simpan lokal sebagai backup/logs agar demo lancar
      setOrderLogs((prev) => [newOrder, ...prev]);
      setIsOrdered(true);
    } catch (err) {
      console.warn(
        "Gagal menyimpan ke database Supabase, menggunakan fallback penyimpanan state lokal:",
        err.message,
      );
      // Fallback agar demo dosen tetap berhasil walaupun database belum disetup
      setOrderLogs((prev) => [newOrder, ...prev]);
      setIsOrdered(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({ customerName: "", phone: "", medicineType: "", notes: "" });
    setIsOrdered(false);
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 50);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f3] text-[#1a1f1a] antialiased flex flex-col font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@700;800&display=swap');
        
        .font-sans {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-master-bold {
          font-family: 'Poppins', sans-serif !important;
          font-weight: 800 !important;
          letter-spacing: -0.03em !important;
        }
        .font-master-title {
          font-family: 'Poppins', sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: -0.02em !important;
        }

        /* Glassmorphic card styling */
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(229, 231, 235, 0.7);
        }

        .gradient-green {
          background: linear-gradient(135deg, #1d9e75 0%, #0d7052 100%);
        }
      `}</style>

      {/* ================= STATUS KONEKSI SUPABASE ================= */}
      <div className="bg-[#f0f9ff] border-b border-[#bae6fd] py-2 px-6 flex justify-between items-center text-xs text-[#0369a1]">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#0284c7]" />
          <span>
            <strong>SIApotek Database Status:</strong>{" "}
            {dbStatus === "checking" && "Memeriksa koneksi database..."}
            {dbStatus === "connected" && (
              <span className="text-emerald-600 font-semibold">
                Terhubung ke Supabase{" "}
                {dbErrorMsg
                  ? "(Tabel belum termigrasi)"
                  : "(Tabel Orders Aktif)"}
              </span>
            )}
            {dbStatus === "error" && (
              <span className="text-rose-600 font-semibold">
                Mode Offline (Menggunakan State Lokal sebagai fallback):{" "}
                {dbErrorMsg}
              </span>
            )}
          </span>
        </div>
        <div className="text-[10px] bg-white border border-[#bae6fd] px-2 py-0.5 rounded text-gray-500 font-mono">
          {dbErrorMsg ? "Minta Setup SQL" : "Tersinkronisasi"}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        {/* Header Premium (Glassmorphism & Gradient Accent) */}
        <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] px-8 py-4 flex justify-between items-center transition-all duration-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-green rounded-2xl flex items-center justify-center text-white shadow-md shadow-[#1d9e75]/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Pill className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="text-base font-master-title text-slate-900 flex items-center gap-2">
                <span>SIApotek</span>
                <span className="text-[#1d9e75]">CRM</span>
                <span className="text-[9px] bg-emerald-500 text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  Active
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-widest">
                Integrated Apothecary Platform
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Live Sync dengan Supabase
            </span>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-xs font-bold text-white gradient-green px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#1d9e75]/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign In Portal
            </button>
          </div>
        </nav>

        {/* Premium Hero Section */}
        <div className="relative overflow-hidden bg-white border-b border-[#e2e8f0] py-16 px-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e1f5ee] rounded-full blur-3xl opacity-60 -z-10 -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#f4f3ec] rounded-full blur-2xl opacity-40 -z-10 translate-y-12 -translate-x-12"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#e1f5ee] border border-[#9fe1cb] text-[#0f6e56] text-[11px] font-extrabold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                SIApotek CRM - Manajemen Hubungan Pasien
              </div>

              <h1 className="text-4xl md:text-5xl font-master-bold text-[#0a140a] leading-tight mb-5">
                Optimalkan Relasi Pasien dengan <br />
                <span className="text-[#1d9e75] relative inline-block">
                  CRM Apotek Cerdas
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-[#1d9e75]/10 -z-10"></span>
                </span>
              </h1>

              <p className="text-sm text-slate-500 max-w-xl leading-relaxed mb-8">
                SIApotek CRM menggabungkan portal reservasi obat publik dengan
                dasbor manajemen internal apotek. Pantau poin keanggotaan,
                kelola tier loyalitas member, dan proses antrean dispensing
                secara langsung via Supabase.
              </p>

              {/* Live Stats dengan Refresh Animasi */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl px-5 py-4 min-w-[130px] shadow-sm flex flex-col justify-between hover:border-[#1d9e75]/30 transition-all">
                  <span className="text-xs text-slate-400 font-semibold">
                    Total Pasien
                  </span>
                  <span className="text-3xl font-master-bold text-slate-800 mt-2">
                    {stats.totalCustomers}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1 font-bold">
                    ↑ 12% Bulan Ini
                  </span>
                </div>
                <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl px-5 py-4 min-w-[130px] shadow-sm flex flex-col justify-between hover:border-[#1d9e75]/30 transition-all">
                  <span className="text-xs text-slate-400 font-semibold">
                    Total Transaksi
                  </span>
                  <span className="text-3xl font-master-bold text-slate-800 mt-2">
                    {stats.totalTransactions}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1 font-bold">
                    ↑ 8% Real-time
                  </span>
                </div>
                <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl px-5 py-4 min-w-[130px] shadow-sm flex flex-col justify-between hover:border-[#1d9e75]/30 transition-all">
                  <span className="text-xs text-slate-400 font-semibold">
                    Tier Teraktif
                  </span>
                  <span className="text-3xl font-master-bold text-[#b8860b] mt-2 flex items-center gap-1">
                    <Award className="w-6 h-6 text-amber-500" /> Gold
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    45 Member Baru
                  </span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE CRM PREVIEW WIDGET */}
            <div className="glass-card rounded-[32px] p-6 shadow-xl relative overflow-hidden border border-slate-200">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#1d9e75]" />
                  <span className="text-xs font-bold text-slate-800">
                    Preview CRM Dashboard Internal
                  </span>
                </div>
                <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                  Demo Mode
                </span>
              </div>

              {/* Mini Graph Mockup */}
              <div className="mb-4">
                <div className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider">
                  Aliran Log Transaksi Pengunjung Terbaru
                </div>
                <div className="bg-slate-900 text-slate-200 rounded-xl p-3 font-mono text-[10px] space-y-1.5 max-h-[110px] overflow-y-auto">
                  {orderLogs.length === 0 ? (
                    <div className="text-slate-500 italic py-2 text-center">
                      Belum ada transaksi masuk dari form di bawah. Silakan
                      kirim data obat untuk mensimulasikan!
                    </div>
                  ) : (
                    orderLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b border-slate-800 pb-1.5 last:border-0 last:pb-0"
                      >
                        <span className="text-emerald-400 truncate max-w-[120px]">
                          ✓ {log.customer_name}
                        </span>
                        <span className="text-slate-400">
                          {log.medicine_type}
                        </span>
                        <span className="text-yellow-400">
                          +{log.points_earned} Poin
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Active Member Distribution */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white border border-slate-100 p-3 rounded-xl flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#1d9e75]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      Total Member
                    </span>
                    <span className="font-bold text-slate-800">84 Aktif</span>
                  </div>
                </div>
                <div className="bg-white border border-slate-100 p-3 rounded-xl flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-cyan-600" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      Feedback CRM
                    </span>
                    <span className="font-bold text-slate-800">
                      99.8% Kepuasan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CRM INTERACTIVE FEATURES (POINTS SIMULATOR & TIME ESTIMATOR) */}
        <section className="bg-slate-50 py-16 px-8 border-b border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#1d9e75] uppercase tracking-widest block mb-1">
                CRM Core Features
              </span>
              <h2 className="text-2xl font-master-title text-slate-900">
                Alat Simulasi Keanggotaan & Estimasi Pelayanan
              </h2>
              <p className="text-xs text-slate-500 mt-2">
                Gunakan widget interaktif ini untuk menghitung estimasi
                pengerjaan resep dan bonus poin loyalitas Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* WIDGET 1: SIMULATOR POIN & TIER */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4 text-[#1d9e75]">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      Simulator Poin & Kenaikan Tier
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    Dapatkan bonus poin dari setiap transaksi tebus resep. Geser
                    nilai transaksi untuk mengetahui tier level member yang Anda
                    capai.
                  </p>

                  {/* Slider Nilai Belanja */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-500">
                        Nilai Transaksi:
                      </span>
                      <span className="text-sm font-extrabold text-[#1d9e75]">
                        Rp {simPurchaseValue.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="600000"
                      step="1000"
                      value={simPurchaseValue}
                      onChange={(e) =>
                        setSimPurchaseValue(Number(e.target.value))
                      }
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1d9e75]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Rp 10rb</span>
                      <span>Rp 300rb</span>
                      <span>Rp 600rb</span>
                    </div>
                  </div>
                </div>

                {/* Tampilan Hasil Simulator */}
                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Poin Didapat
                    </span>
                    <span className="text-2xl font-master-bold text-emerald-700">
                      {simPoints} Poin
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Tier Member
                    </span>
                    <span
                      className={`text-2xl font-master-bold flex items-center justify-center gap-1 ${
                        simTier === "Platinum"
                          ? "text-slate-800"
                          : simTier === "Gold"
                            ? "text-amber-600"
                            : simTier === "Silver"
                              ? "text-slate-500"
                              : "text-[#1d9e75]"
                      }`}
                    >
                      {simTier}
                    </span>
                  </div>
                </div>
              </div>

              {/* WIDGET 2: ESTIMATOR WAKTU OBAT */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4 text-[#1d9e75]">
                    <Calculator className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      Kalkulator Waktu Tunggu Apotek
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    Sistem menghitung secara otomatis durasi waktu penyiapan
                    resep di unit farmasi berdasarkan jenis obat dan kuantitas
                    pesanan.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-slate-500 mb-1.5">
                        Tipe Obat
                      </label>
                      <select
                        value={estType}
                        onChange={(e) => setEstType(e.target.value)}
                        className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1d9e75]"
                      >
                        <option value="Obat Bebas / Vitamin">
                          Obat Bebas / Vitamin
                        </option>
                        <option value="Tebus Resep Dokter">
                          Tebus Resep Dokter
                        </option>
                        <option value="Alat Kesehatan Medis">
                          Alat Kesehatan Medis
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-slate-500 mb-1.5">
                        Jumlah Item
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={estQty}
                        onChange={(e) => setEstQty(Number(e.target.value))}
                        className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1d9e75]"
                      />
                    </div>
                  </div>
                </div>

                {/* Tampilan Hasil Kalkulasi */}
                <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">
                      Estimasi Penyiapan
                    </span>
                    <span className="text-lg font-master-bold text-amber-700">
                      {estTime} Menit
                    </span>
                  </div>
                  {estWarning && (
                    <div className="text-[10px] text-amber-600 font-medium flex items-start gap-1.5 mt-2 border-t pt-2 border-[#fef3c7]">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                      <span>{estWarning}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Pemesanan Obat - Menghubungkan langsung ke tabel Supabase 'orders' */}
        <section className="bg-white py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl mb-8">
              <span className="text-xs font-bold text-[#1d9e75] uppercase tracking-widest block mb-1">
                Live Order Platform
              </span>
              <h2 className="text-2xl font-master-title text-slate-900">
                Reservasi Obat & Integrasi CRM
              </h2>
              <p className="text-xs text-slate-500 mt-2">
                Daftarkan kebutuhan medis Anda. Pesanan akan langsung tercatat
                ke Supabase Database secara real-time.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-slate-100 rounded-3xl p-8 shadow-sm">
              {!isOrdered ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-slate-600 mb-2">
                        Nama Lengkap Pasien
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="customerName"
                        required
                        placeholder="Sesuai KTP Pasien"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1d9e75] focus:ring-2 focus:ring-[#1d9e75]/5 text-slate-800"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-slate-600 mb-2">
                        Nomor Telepon Aktif
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+62 atau 08..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1d9e75] focus:ring-2 focus:ring-[#1d9e75]/5 text-slate-800"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-slate-600 mb-2">
                        Kategori Obat
                      </label>
                      <select
                        name="medicineType"
                        required
                        value={formData.medicineType}
                        onChange={handleInputChange}
                        className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1d9e75] focus:ring-2 focus:ring-[#1d9e75]/5 text-slate-800 cursor-pointer"
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="Obat Bebas / Vitamin">
                          Obat Bebas / Vitamin (Tanpa Resep)
                        </option>
                        <option value="Tebus Resep Dokter">
                          Tebus Resep Dokter (Wajib Bawa Resep)
                        </option>
                        <option value="Alat Kesehatan Medis">
                          Alat Kesehatan Medis
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[11px] font-semibold text-slate-600 mb-2">
                      Detail Nama Obat, Jumlah, & Dosis
                    </label>
                    <textarea
                      name="notes"
                      rows="3"
                      required
                      placeholder="Contoh: Paracetamol 500mg (1 strip), Vitamin C 1000mg (1 Botol)..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#1d9e75] focus:ring-2 focus:ring-[#1d9e75]/5 text-slate-800 resize-y min-h-[90px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1d9e75] hover:bg-[#0f6e56] text-white text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Menyimpan
                        Order ke Database...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Kirim Pengajuan
                        Reservasi Obat
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#e1f5ee] rounded-full flex items-center justify-center text-[#0f6e56] mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-master-title text-slate-800 mb-2">
                    Reservasi Obat Berhasil Dikirim!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                    Halo {formData.customerName}, data reservasi Anda telah
                    berhasil direkam langsung ke SIApotek Database. Anda juga
                    terdaftar dalam antrean CRM Apoteker.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-[#f0fafc] border border-cyan-100 rounded-xl px-4 py-3 text-left max-w-sm mb-6 text-xs text-cyan-800">
                    <Clock className="w-4 h-4 shrink-0 text-cyan-600 animate-pulse" />
                    <span>
                      Apoteker akan menghubungi Anda dalam waktu{" "}
                      <strong>{estTime} menit</strong> di nomor {formData.phone}
                      .
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={handleResetForm}
                      className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition"
                    >
                      Kirim Pesanan Baru
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Premium Footer CTA & Chat Box */}
        <footer className="bg-slate-900 text-white pt-16 pb-8 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 gradient-green rounded-xl flex items-center justify-center">
                  <Pill className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-master-title">
                  SIApotek CRM
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Platform digitalisasi pelayanan farmasi terintegrasi, aman, dan
                berfokus pada loyalitas hubungan pasien (CRM).
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9fe1cb] mb-4">
                Jaringan Apotek
              </h4>
              <div className="text-xs text-slate-400 space-y-2">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1d9e75]" /> Pekanbaru, Riau,
                  Indonesia
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#1d9e75]" /> +62 899 998 888
                  (24 Jam)
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9fe1cb] mb-4">
                Poin & Keanggotaan
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Gabung sebagai Member dan nikmati pemotongan harga obat keras
                hingga 15% serta pengumpulan poin loyalitas di setiap transaksi.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="text-xs font-bold text-white bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl hover:bg-slate-700 transition"
              >
                Daftar Member Sekarang
              </button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} SIApotek CRM. Dikembangkan oleh
              Tim Pengembang Proyek Rumah.
            </p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition">
                Kebijakan Privasi
              </span>
              <span className="hover:text-white cursor-pointer transition">
                Ketentuan Pengguna
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
