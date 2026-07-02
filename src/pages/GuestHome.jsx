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

  // STATE MANAGEMENT
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
            setDbErrorMsg("Tabel 'orders' belum dibuat.");
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
        setDbErrorMsg("Tidak terhubung ke Supabase.");
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
      warning = "Wajib menyerahkan lembar resep asli kepada Apoteker saat pengambilan.";
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
      setOrderLogs((prev) => [newOrder, ...prev]);
      setIsOrdered(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({ customerName: "", phone: "", medicineType: "", notes: "" });
    setIsOrdered(false);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-850 antialiased flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
        
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-master-bold { font-family: 'Poppins', sans-serif !important; font-weight: 800 !important; letter-spacing: -0.02em !important; }
        .font-master-title { font-family: 'Poppins', sans-serif !important; font-weight: 700 !important; }
        
        .glass-nav-luxury {
          background: rgba(250, 248, 245, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(217, 119, 6, 0.15);
        }

        /* 3D Floating Animation for Queue Tracker Card */
        @keyframes floatCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-card {
          animation: floatCard 4s ease-in-out infinite;
        }

        .gold-border-glow {
          border: 1px solid rgba(217, 119, 6, 0.25);
          box-shadow: 0 10px 30px -10px rgba(217, 119, 6, 0.15);
        }

        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #faf8f5; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dcd7cc; border-radius: 10px; }
      `}</style>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 glass-nav-luxury px-6 lg:px-10 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-teal-900 rounded-xl flex items-center justify-center text-amber-400 shadow-md border border-amber-500/20">
            <Pill className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-master-title text-teal-950 leading-none">SIApotek</h1>
            <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-widest block mt-1">GOLDEN CARE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")} className="text-xs font-bold text-teal-900 hover:text-amber-700 transition">
            Sign In
          </button>
          <button onClick={() => navigate("/register")} className="text-xs font-bold text-teal-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-650 px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition">
            Daftar Sekarang
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden pt-24 pb-28 px-6 lg:px-10">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[130px] -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-400/30 text-amber-800 text-xs font-bold px-4 py-2 rounded-full mb-6">
              Sistem Manajemen Pasien
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-master-bold text-teal-950 leading-[1.12] mb-6">
              Optimalkan Relasi Pasien dengan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-900 via-amber-600 to-amber-500">
                Apotek Modern
              </span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-600 max-w-xl leading-relaxed mb-8 font-medium">
              SIApotek menggabungkan portal reservasi publik dengan dasbor manajemen apotek cerdas. Pantau antrean, kelola loyalitas member, dan proses dispensing secara <span className="text-teal-700 font-semibold">real-time.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button onClick={() => document.getElementById("order-section").scrollIntoView({ behavior: "smooth" })} className="bg-teal-950 hover:bg-teal-900 text-white px-8 py-3.5 rounded-full font-bold shadow-md transition active:scale-95">
                Mulai Sekarang
              </button>
              <button onClick={() => document.getElementById("simulator-section").scrollIntoView({ behavior: "smooth" })} className="bg-white border border-amber-500/20 text-teal-950 px-8 py-3.5 rounded-full font-bold hover:bg-[#faf5eb] transition active:scale-95 flex items-center justify-center gap-2">
                <PlayCircle className="w-4 h-4 text-amber-600" /> Lihat Simulator
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Total Pasien</span>
                <span className="text-2xl font-black text-teal-950">{stats.totalCustomers}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">Transaksi</span>
                <span className="text-2xl font-black text-teal-950">{stats.totalTransactions}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">Tier Teraktif</span>
                <span className="text-2xl font-black text-amber-600">Gold</span>
              </div>
            </div>
          </div>

          {/* Right Widget */}
          <div className="lg:col-span-6 relative">
            <div className="bg-white rounded-[2rem] p-6 shadow-2xl animate-float-card gold-border-glow text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <span className="text-xs font-black text-teal-950 uppercase tracking-widest">CRM Terminal</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded-md font-bold">ONLINE</span>
              </div>
              
              <div className="bg-[#faf8f5] rounded-xl p-4 font-mono text-xs space-y-2.5 h-[160px] overflow-y-auto border border-[#c4b599]/20 custom-scrollbar shadow-inner">
                {orderLogs.length === 0 ? (
                  <div className="text-slate-400 italic h-full flex flex-col items-center justify-center text-center gap-2">
                    <Activity className="w-5 h-5 text-teal-700 animate-pulse" />
                    Menunggu transaksi masuk...
                  </div>
                ) : (
                  orderLogs.map((log, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm hover:border-amber-400 transition-colors">
                      <span className="text-teal-950 font-bold">✓ {log.customer_name}</span>
                      <span className="text-slate-400 text-[10px]">{log.medicine_type}</span>
                      <span className="text-amber-800 font-extrabold bg-amber-100/65 px-2 py-0.5 rounded border border-amber-200">+{log.points_earned} Pts</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE FEATURES */}
      <section className="bg-white py-16 px-6 border-y border-[#c4b599]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck className="w-6 h-6 text-amber-600" />, title: "Obat Asli & BPOM", desc: "Semua produk obat kami telah mendapatkan sertifikasi resmi dari BPOM." },
            { icon: <Clock className="w-6 h-6 text-amber-600" />, title: "Penyiapan Cepat", desc: "Estimasi waktu penyiapan obat racikan kurang dari 30 menit saja." },
            { icon: <Truck className="w-6 h-6 text-amber-600" />, title: "Riwayat Alergi Pasien", desc: "Sistem mencatat riwayat alergi untuk keamanan pemberian obat." }
          ].map((k, i) => (
            <div key={i} className="text-left p-6 bg-[#faf8f3] rounded-2xl border border-slate-100 hover:border-amber-500/30 hover:shadow-md transition">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm border border-amber-500/10">{k.icon}</div>
              <h3 className="text-sm font-extrabold text-teal-950 uppercase tracking-wide mb-2">{k.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{k.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="simulator-section" className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {/* Points Widget */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-500/10 flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-4 text-teal-900">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-black uppercase tracking-wider">Simulator Poin Loyalitas</h3>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Nilai Transaksi:</span>
                  <span className="text-sm font-extrabold text-teal-950">Rp {simPurchaseValue.toLocaleString("id-ID")}</span>
                </div>
                <input type="range" min="10000" max="600000" step="1000" value={simPurchaseValue} onChange={(e) => setSimPurchaseValue(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
              </div>
            </div>
            <div className="bg-[#faf8f3] border border-amber-500/20 rounded-2xl p-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Poin</span>
                <span className="text-xl font-black text-[#d97706]">{simPoints} Pts</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Tier Level</span>
                <span className="text-xl font-black text-teal-950">{simTier}</span>
              </div>
            </div>
          </div>

          {/* Time Calculator */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-500/10 flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-4 text-teal-900">
                <Calculator className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-black uppercase tracking-wider">Kalkulator Waktu Tunggu Apotek</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold text-slate-500 mb-1.5">Tipe Obat</label>
                  <select value={estType} onChange={(e) => setEstType(e.target.value)} className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer">
                    <option value="Obat Bebas / Vitamin">Obat Bebas</option>
                    <option value="Tebus Resep Dokter">Tebus Resep</option>
                    <option value="Alat Kesehatan Medis">Alat Medis</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-semibold text-slate-500 mb-1.5">Jumlah Item</label>
                  <input type="number" min="1" max="20" value={estQty} onChange={(e) => setEstQty(Number(e.target.value))} className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500" />
                </div>
              </div>
            </div>
            <div className="bg-[#faf8f3] border border-amber-500/20 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">Waktu Penyiapan</span>
              <span className="text-xl font-black text-teal-950">{estTime} Menit</span>
            </div>
          </div>
        </div>
      </section>

      {/* FORM RESERVASI */}
      <section id="order-section" className="bg-white py-16 px-6 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">Direct Submission</span>
            <h2 className="text-2xl font-master-title text-teal-950">Form Penebusan Resep Online</h2>
          </div>
          <div className="bg-[#faf8f3] border border-amber-500/15 rounded-3xl p-8 shadow-sm">
            {!isOrdered ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <label className="text-[11px] font-semibold text-slate-600 mb-2">Nama Pasien</label>
                    <input ref={nameInputRef} type="text" name="customerName" required placeholder="Sesuai KTP" value={formData.customerName} onChange={handleInputChange} className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[11px] font-semibold text-slate-600 mb-2">Nomor Telepon</label>
                    <input type="tel" name="phone" required placeholder="08..." value={formData.phone} onChange={handleInputChange} className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[11px] font-semibold text-slate-600 mb-2">Pilihan Layanan</label>
                    <select name="medicineType" required value={formData.medicineType} onChange={handleInputChange} className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800 cursor-pointer">
                      <option value="">Pilih Layanan</option>
                      <option value="Obat Bebas / Vitamin">Penebusan Obat Bebas</option>
                      <option value="Tebus Resep Dokter">Penebusan Resep Dokter</option>
                      <option value="Alat Kesehatan Medis">Alat Kesehatan Medis</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-semibold text-slate-600 mb-2">Detail Catatan Resep</label>
                  <textarea name="notes" rows="3" required placeholder="Tuliskan nama obat, merk, atau dosis..." value={formData.notes} onChange={handleInputChange} className="w-full text-xs px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800 resize-y" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-teal-950 hover:bg-teal-900 text-white text-xs font-bold py-3.5 rounded-xl transition shadow-md">
                  {loading ? "Menyimpan Data..." : "Kirim Pengajuan Resep"}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-master-title text-slate-900 mb-2">Resep Berhasil Diajukan</h3>
                <p className="text-xs text-slate-500 mb-6">Apoteker kami akan segera memproses antrean Anda.</p>
                <button onClick={handleResetForm} className="bg-white border border-slate-200 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition">
                  Kirim Pengajuan Baru
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf8f3] py-16 px-6 border-t border-[#c4b599]/15">
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="text-2xl font-master-title text-teal-950 mb-8 text-center">Tanya Jawab Seputar Layanan</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:border-amber-500/20 transition-all duration-300">
                <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between px-6 py-4 font-bold text-xs text-teal-950 hover:bg-slate-50 transition cursor-pointer">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === index ? "rotate-180 text-amber-600" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 pt-1 text-[11px] text-slate-500 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-teal-950 text-white pt-16 pb-8 px-8 border-t border-amber-500/20 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-teal-900 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-base font-master-title text-amber-400">SIApotek CRM</span>
            </div>
            <p className="text-xs text-teal-200/70 leading-relaxed">Penyedia solusi farmasi digital modern dengan prioritas kenyamanan dan hubungan erat pasien.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">Lokasi</h4>
            <p className="text-xs text-teal-250 flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" /> Pekanbaru, Riau, Indonesia</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">Program Reward</h4>
            <button onClick={() => navigate("/register")} className="text-xs font-bold text-teal-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-xl transition shadow-md shadow-amber-500/10">
              Daftar Member Sekarang
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-teal-250/50">
          <p>&copy; {new Date().getFullYear()} SIApotek CRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}