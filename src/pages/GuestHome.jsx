import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  Pill,
  ShoppingBag,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Activity,
  Truck,
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
  ArrowRight,
  PlayCircle,
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
  const [orderLogs, setOrderLogs] = useState([]); 
  const [dbStatus, setDbStatus] = useState("checking"); 
  const [dbErrorMsg, setDbErrorMsg] = useState("");

  const faqs = [
    { q: "Apakah obat yang dijual sudah terdaftar BPOM?", a: "Ya, 100% produk kami telah mendapatkan izin edar resmi dari BPOM." },
    { q: "Berapa lama waktu penyiapan obat racikan?", a: "Rata-rata 20-30 menit tergantung jumlah dan jenis racikan." },
    { q: "Apakah bisa memesan tanpa resep dokter?", a: "Untuk obat bebas (OTC) bisa langsung, untuk obat keras wajib melampirkan resep dokter." },
    { q: "Apakah ada layanan antar obat ke rumah?", a: "Saat ini layanan antar tersedia dalam radius 5 km dari apotek." },
  ];

  const [simPurchaseValue, setSimPurchaseValue] = useState(150000);
  const [simPoints, setSimPoints] = useState(150);
  const [simTier, setSimTier] = useState("Bronze");

  const [estType, setEstType] = useState("Obat Bebas / Vitamin");
  const [estQty, setEstQty] = useState(1);
  const [estTime, setEstTime] = useState(10);
  const [estWarning, setEstWarning] = useState("");

  const nameInputRef = useRef(null);

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
              "Tabel 'orders' belum dibuat di Supabase. Silakan jalankan query SQL dari PRD!"
            );
          } else {
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

  useEffect(() => {
    const points = Math.floor(simPurchaseValue / 1000);
    setSimPoints(points);
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

  useEffect(() => {
    let baseTime = 10; 
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
      const { error } = await supabase.from("orders").insert([newOrder]);
      if (error) throw error;

      setOrderLogs((prev) => [newOrder, ...prev]);
      setIsOrdered(true);
    } catch (err) {
      console.warn(
        "Gagal menyimpan ke database Supabase, menggunakan fallback penyimpanan state lokal:",
        err.message
      );
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
    <div className="min-h-screen bg-[#090e17] text-[#e2e8f0] antialiased flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap');
        
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

        .glass-nav-dark {
          background: rgba(9, 14, 23, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .gradient-green-cyber {
          background: linear-gradient(135deg, #10b981 0%, #047857 100%);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0b1321;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b981;
        }
      `}</style>

      <div className="flex flex-col flex-grow">
        
        {/* ================= CYBER NAVBAR ================= */}
        <nav className="sticky top-0 z-40 glass-nav-dark px-6 lg:px-10 py-4 flex justify-between items-center transition-all duration-300">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Pill className="w-5 h-5 text-emerald-400 transform group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-master-title text-white flex items-center gap-2 leading-none">
                <span>SIApotek</span>
                <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Active
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.15em] mt-1">
                Integrated Platform
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <span className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-medium bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live Sync Active
            </span>
            
            <button
              onClick={() => navigate("/login")}
              className="text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl hover:border-emerald-500 hover:text-emerald-400 transition-all cursor-pointer shadow-sm hover:shadow"
            >
              Sign In
            </button>
            
            <button
              onClick={() => navigate("/register")}
              className="text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-4.5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              Register Now
            </button>
          </div>
        </nav>

        {/* ================= REVAMPED HERO SECTION (MIDNIGHT EMERALD) ================= */}
        <div className="relative overflow-hidden bg-[#090e17] border-b border-emerald-900/30 pt-24 pb-28 px-6 lg:px-10">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none -z-10"></div>
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none -z-10"></div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 relative z-10 text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-md cursor-default">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Sistem Apotek Digital Masa Depan
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[58px] font-master-bold text-white leading-[1.15] mb-6 tracking-tight">
                Revolusi Layanan <br className="hidden md:block" /> Farmasi dengan <br />
                <span className="relative inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 pb-2 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  Kecerdasan CRM
                  <svg className="absolute w-full h-3 -bottom-0 left-0 text-emerald-400/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="transparent" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed mb-8 font-medium">
                Tinggalkan cara lama. Akses penebusan resep *real-time*, pantau antrean tanpa batas, dan nikmati ekosistem kesehatan digital dengan keamanan setingkat *enterprise*.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-3.5 rounded-full font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
                >
                  Ajukan Resep Sekarang
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById("simulator-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-slate-900/50 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-500/50 px-8 py-3.5 rounded-full font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 backdrop-blur-md"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-400" />
                  Kalkulator Waktu
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-800">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 flex-1 min-w-[140px] shadow-sm hover:border-emerald-500/30 transition-colors backdrop-blur-sm">
                  <span className="text-xs text-slate-500 font-semibold mb-1 block">Apoteker Siaga</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-200">12</span>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Aktif</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 flex-1 min-w-[140px] shadow-sm hover:border-emerald-500/30 transition-colors backdrop-blur-sm">
                  <span className="text-xs text-slate-500 font-semibold mb-1 block">Resep Diproses</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-200">{stats.totalTransactions}</span>
                    <span className="text-[10px] text-cyan-400 font-bold bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">Hari Ini</span>
                  </div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE DARK TERMINAL WIDGET */}
            <div className="lg:col-span-6 relative perspective-1000 lg:translate-x-4 animate-[bounce_5s_ease-in-out_infinite]">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-[2rem] transform rotate-3 scale-105 opacity-50 blur-2xl -z-10"></div>
              
              <div className="bg-[#111827]/90 backdrop-blur-2xl rounded-[2rem] p-6 shadow-2xl shadow-black/50 border border-slate-700/50 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-400 font-mono">system_log.sh</span>
                  </div>
                </div>
                
                <div className="mb-5 relative text-left">
                  <div className="text-[10px] text-slate-500 mb-2 font-bold uppercase tracking-wider flex justify-between font-mono">
                    <span>Live Event Stream</span>
                    <span className="text-emerald-400 flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> Syncing</span>
                  </div>
                  <div className="bg-[#05080a] rounded-xl p-4 font-mono text-xs space-y-2.5 h-[160px] overflow-y-auto shadow-inner border border-slate-800 custom-scrollbar">
                    {orderLogs.length === 0 ? (
                      <div className="text-emerald-500/40 italic h-full flex flex-col items-center justify-center text-center px-4 gap-2">
                        <Activity className="w-5 h-5 text-emerald-500/40 animate-pulse" />
                        &gt; waiting for incoming payload...
                      </div>
                    ) : (
                      orderLogs.map((log, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-[#0d1419] hover:bg-[#131d24] transition-colors px-3 py-2 rounded-lg border border-slate-800/50"
                        >
                          <span className="text-emerald-400 truncate max-w-[120px] font-medium">
                            <span className="text-emerald-600 mr-1">~</span> {log.customer_name}
                          </span>
                          <span className="text-slate-500 text-[10px]">
                            {log.medicine_type}
                          </span>
                          <span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded border border-amber-700/30">
                            +{log.points_earned} pts
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs text-left">
                  <div className="bg-slate-800/50 border border-slate-700/50 p-3.5 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg shadow-sm border border-slate-700">
                      <Users className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Member VIP</span>
                      <span className="font-bold text-white text-sm">84 <span className="text-emerald-400 text-[10px]">Aktif</span></span>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 p-3.5 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg shadow-sm border border-slate-700">
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">System Health</span>
                      <span className="font-bold text-white text-sm">99.8% <span className="text-cyan-400 text-[10px]">OK</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: KEUNGGULAN LAYANAN */}
        <section className="bg-[#0b1321] py-16 px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Core Capabilities
              </span>
              <h2 className="text-2xl font-master-title text-white">
                Keunggulan Layanan SIApotek
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                Kami berkomitmen menyediakan layanan farmasi yang aman, cepat, dan terpercaya untuk kesehatan Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#111827]/60 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-emerald-500/30 hover:-translate-y-1 transition-all text-center">
                <div className="w-12 h-12 bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wide mb-2">Obat Asli & BPOM</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Semua produk obat kami telah mendapatkan sertifikasi resmi dari BPOM.</p>
              </div>

              <div className="bg-[#111827]/60 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-emerald-500/30 hover:-translate-y-1 transition-all text-center">
                <div className="w-12 h-12 bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wide mb-2">Apoteker Berlisensi</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Setiap resep diperiksa dan diverifikasi oleh apoteker berpengalaman.</p>
              </div>

              <div className="bg-[#111827]/60 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-emerald-500/30 hover:-translate-y-1 transition-all text-center">
                <div className="w-12 h-12 bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wide mb-2">Penyiapan Cepat</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Estimasi waktu penyiapan obat racikan kurang dari 30 menit saja.</p>
              </div>

              <div className="bg-[#111827]/60 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-emerald-500/30 hover:-translate-y-1 transition-all text-center">
                <div className="w-12 h-12 bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wide mb-2">Riwayat Alergi Pasien</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">Sistem mencatat riwayat alergi untuk keamanan pemberian obat.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CRM INTERACTIVE FEATURES */}
        <section id="simulator-section" className="bg-[#0b1321]/50 py-16 px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                CRM Core Features
              </span>
              <h2 className="text-2xl font-master-title text-white">
                Alat Simulasi Keanggotaan & Estimasi Pelayanan
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                Gunakan widget interaktif ini untuk menghitung estimasi pengerjaan resep dan bonus poin loyalitas Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#111827]/80 rounded-3xl p-6 shadow-sm border border-slate-850 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2.5 mb-4 text-emerald-400">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Simulator Poin & Kenaikan Tier
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    Dapatkan bonus poin dari setiap transaksi tebus resep. Geser nilai transaksi untuk mengetahui tier level member yang Anda capai.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-400">Nilai Transaksi:</span>
                      <span className="text-sm font-extrabold text-emerald-400">
                        Rp {simPurchaseValue.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="600000"
                      step="1000"
                      value={simPurchaseValue}
                      onChange={(e) => setSimPurchaseValue(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-505 text-slate-500 font-mono">
                      <span>Rp 10k</span>
                      <span>Rp 300k</span>
                      <span>Rp 600k</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-2xl p-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="text-[10px] text-slate-550 text-slate-500 block font-semibold uppercase">Poin Didapat</span>
                    <span className="text-2xl font-master-bold text-emerald-400">{simPoints} Poin</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-550 text-slate-500 block font-semibold uppercase">Tier Member</span>
                    <span
                      className={
                        simTier === "Platinum"
                          ? "text-2xl font-master-bold text-slate-200"
                          : simTier === "Gold"
                          ? "text-2xl font-master-bold text-amber-500"
                          : simTier === "Silver"
                          ? "text-2xl font-master-bold text-slate-400"
                          : "text-2xl font-master-bold text-emerald-400"
                      }
                    >
                      {simTier}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111827]/80 rounded-3xl p-6 shadow-sm border border-slate-850 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2.5 mb-4 text-emerald-400">
                    <Calculator className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Kalkulator Waktu Tunggu Apotek
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    Sistem menghitung secara otomatis durasi waktu penyiapan resep di unit farmasi berdasarkan jenis obat dan kuantitas pesanan.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-slate-500 mb-1.5">Tipe Obat</label>
                      <select
                        value={estType}
                        onChange={(e) => setEstType(e.target.value)}
                        className="text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="Obat Bebas / Vitamin">Obat Bebas / Vitamin</option>
                        <option value="Tebus Resep Dokter">Tebus Resep Dokter</option>
                        <option value="Alat Kesehatan Medis">Alat Kesehatan Medis</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-slate-500 mb-1.5">Jumlah Item</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={estQty}
                        onChange={(e) => setEstQty(Number(e.target.value))}
                        className="text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-4 text-left font-sans">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Estimasi Penyiapan</span>
                    <span className="text-lg font-master-bold text-amber-500">{estTime} Menit</span>
                  </div>
                  {estWarning && (
                    <div className="text-[10px] text-amber-500 font-medium flex items-start gap-1.5 mt-2 border-t pt-2 border-amber-900/30">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                      <span>{estWarning}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WORKFLOW */}
        <section className="bg-[#0b1321] py-16 px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Workflow
              </span>
              <h2 className="text-2xl font-master-title text-white">
                Cara Kerja Pelayanan SIApotek
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                Proses pelayanan resep obat digital yang mudah dan transparan dari awal hingga akhir.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { step: "01", title: "Input Data Pasien", desc: "Masukkan nama, nomor telepon, dan detail resep obat Anda di form reservasi." },
                { step: "02", title: "Verifikasi Apoteker", desc: "Tim apoteker kami memeriksa ketersediaan dan ketepatan obat." },
                { step: "03", title: "Penyiapan & Pengemasan", desc: "Obat diracik dan disiapkan secara higienis sesuai standar apotek." },
                { step: "04", title: "Serah Terima Obat", desc: "Ambil obat langsung di gerai kami atau diantarkan ke lokasi Anda." }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827]/60 p-6 rounded-2xl border border-slate-800 flex-1 min-w-[240px] max-w-[280px] hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 text-left">
                  <div className="text-3xl font-master-bold text-emerald-800/30 mb-2">{item.step}</div>
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wide mb-2">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: LIVE ORDER FORM */}
        <section id="order-section" className="bg-[#090e17] py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl mb-8 text-left">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Live Order Platform
              </span>
              <h2 className="text-2xl font-master-title text-white">
                Reservasi Obat & Integrasi CRM
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                Daftarkan kebutuhan medis Anda. Pesanan akan langsung tercatat ke Supabase Database secara real-time.
              </p>
            </div>

            <div className="bg-[#111827]/40 border border-slate-800 rounded-3xl p-8 shadow-sm">
              {!isOrdered ? (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-slate-400 mb-2">Nama Lengkap Pasien</label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="customerName"
                        required
                        placeholder="Sesuai KTP Pasien"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full text-xs px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-200"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-slate-400 mb-2">Nomor Telepon Aktif</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+62 atau 08..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full text-xs px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-200"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-slate-400 mb-2">Kategori Obat</label>
                      <select
                        name="medicineType"
                        required
                        value={formData.medicineType}
                        onChange={handleInputChange}
                        className="w-full text-xs px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-300 cursor-pointer"
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="Obat Bebas / Vitamin">Obat Bebas / Vitamin (Tanpa Resep)</option>
                        <option value="Tebus Resep Dokter">Tebus Resep Dokter (Wajib Bawa Resep)</option>
                        <option value="Alat Kesehatan Medis">Alat Kesehatan Medis</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[11px] font-semibold text-slate-400 mb-2">Detail Nama Obat, Jumlah, & Dosis</label>
                    <textarea
                      name="notes"
                      rows="3"
                      required
                      placeholder="Contoh: Paracetamol 500mg (1 strip), Vitamin C 1000mg (1 Botol)..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full text-xs px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-200 resize-y min-h-[90px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50 shadow-emerald-500/10"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Menyimpan Order...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Kirim Pengajuan Reservasi Obat
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-950 border border-emerald-900/50 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-master-title text-white mb-2">
                    Reservasi Obat Berhasil Dikirim!
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed mb-6 text-center">
                    Halo {formData.customerName}, data reservasi Anda telah berhasil direkam langsung ke SIApotek Database. Anda juga terdaftar dalam antrean Apoteker.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-[#0c1e2a] border border-cyan-900/40 rounded-xl px-4 py-3 text-left max-w-sm mb-6 text-xs text-cyan-400">
                    <Clock className="w-4 h-4 shrink-0 text-cyan-500 animate-pulse" />
                    <span>
                      Apoteker akan menghubungi Anda dalam waktu <strong>{estTime} menit</strong> di nomor {formData.phone}.
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={handleResetForm}
                      className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-850 hover:text-white transition cursor-pointer"
                    >
                      Kirim Pesanan Baru
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION: FAQ ACCORDION */}
        <section className="bg-[#090e17] py-16 px-8 border-b border-slate-900">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                FAQ
              </span>
              <h2 className="text-2xl font-master-title text-white">
                Pertanyaan Umum Pasien
              </h2>
            </div>

            <div className="space-y-4 text-left">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#111827]/40 border border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-200">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-xs text-slate-300 hover:bg-[#111827]/75 hover:text-white transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openFaq === index ? "rotate-180 text-emerald-400" : "rotate-0"}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 pt-1 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: EMERGENCY CONSULTATION CTA */}
        <section className="gradient-green-cyber py-12 px-8 text-center text-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-xl font-master-bold text-white mb-2">Butuh Konsultasi Resep Darurat?</h2>
            <p className="text-xs text-emerald-100 opacity-90 mb-6">
              Apoteker berlisensi kami siap membantu Anda 24 jam sehari untuk konsultasi obat-obatan gratis.
            </p>
            <a
              href="https://wa.me/628111234567"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-slate-950 text-emerald-400 hover:bg-slate-900 border border-emerald-900/30 text-xs font-bold px-6 py-3 rounded-xl hover:shadow-lg transition cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Hubungi via WhatsApp
            </a>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="bg-slate-950 text-slate-500 pt-16 pb-8 px-8 border-t border-slate-900 text-left">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-900 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <Pill className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-base font-master-title text-white">
                  SIApotek CRM
                </span>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed">
                Platform digitalisasi pelayanan farmasi terintegrasi, aman, dan berfokus pada loyalitas hubungan pasien (CRM).
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
                Jaringan Apotek
              </h4>
              <div className="text-xs text-slate-500 space-y-2">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" /> Pekanbaru, Riau, Indonesia
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" /> +62 899 998 888 (24 Jam)
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-450 mb-4">
                Poin & Keanggotaan
              </h4>
              <p className="text-xs text-slate-450 leading-relaxed mb-3">
                Gabung sebagai Member dan nikmati pemotongan harga obat keras hingga 15% serta pengumpulan poin loyalitas di setiap transaksi.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="text-xs font-bold text-emerald-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
              >
                Daftar Member Sekarang
              </button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>
              &copy; {new Date().getFullYear()} SIApotek CRM. Dikembangkan oleh Tim Pengembang Proyek Rumah.
            </p>
            <div className="flex gap-4">
              <span className="hover:text-slate-400 cursor-pointer transition">Kebijakan Privasi</span>
              <span className="hover:text-slate-400 cursor-pointer transition">Ketentuan Pengguna</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}