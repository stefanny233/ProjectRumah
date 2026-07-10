import React, { useState, useEffect } from "react";
import { Phone, MapPin, Search, Plus, Minus, ShoppingCart, CheckCircle, Trash2 } from "lucide-react";
import { supabase } from "../supabaseClient";
import dataApotek from "../data/dataApotek.json";

import MemberNavbar    from "../components/member/MemberNavbar";
import MemberTabs      from "../components/member/MemberTabs";
import MemberHero      from "../components/member/MemberHero";
import StatCards       from "../components/member/StatCards";
import VoucherSection  from "../components/member/VoucherSection";
import TierSection     from "../components/member/TierSection";
import MemberSidebar   from "../components/member/MemberSidebar";
import ProfileModal    from "../components/member/ProfileModal";
import VoucherModal    from "../components/member/VoucherModal";

export default function MemberHome() {
  const [activeTab,    setActiveTab]    = useState("beranda");
  const [isOrdered,    setIsOrdered]    = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [openFaq,      setOpenFaq]      = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState(null);
  
  // State Poin & Transaksi Member Dinamis
  const [memberPoints, setMemberPoints] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  
  // State E-Shop Pemesanan Obat Member
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recipeNote, setRecipeNote] = useState("");
  const [lastPoinEarned, setLastPoinEarned] = useState(0);

  const [userData, setUserData] = useState({
    name: "VIP Member",
    email: "member@gmail.com",
    phone: "+62 812-3456-7890",
    joinDate: "12 Januari 2025",
    patientRecordId: "RM-LUNA-9921B",
    status: "Active Priority Patient",
  });

  const formatRupiah = (num) => "Rp " + Number(num || 0).toLocaleString("id-ID");

  const parsePrice = (val) => {
    if (typeof val === "number") return val;
    const cleaned = String(val || "").replace(/[^\d]/g, "");
    return cleaned ? parseInt(cleaned, 10) : 0;
  };

  // 1. Fetch Sesi Member & Live Merge Poin dari Supabase + Local Storage dengan Normalisasi Nama
  const fetchMemberData = async () => {
    const storedName = localStorage.getItem("userName") || "VIP Member";
    const storedEmail = localStorage.getItem("userEmail");
    
    if (storedName || storedEmail) {
      setUserData(prev => ({
        ...prev,
        name: storedName || prev.name,
        email: storedEmail || prev.email,
      }));
    }

    try {
      // ─── AMBIL DARI SUPABASE ───
      let dbOrders = [];
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*");
        
        if (data && !error) {
          // Melakukan filter transaksi berdasarkan nama member yang dinormalisasi (lowercase & trim)
          dbOrders = data.filter(order => {
            const orderName = (order.customer_name || "").toLowerCase().trim();
            const myName = storedName.toLowerCase().trim();
            return orderName === myName;
          });
        }
      } catch (err) {
        console.warn("Supabase RLS/Offline, gunakan local storage.");
      }

      // ─── AMBIL DARI LOCAL STORAGE ───
      const localTrans = JSON.parse(localStorage.getItem("local_transactions") || "[]");
      const filteredLocal = localTrans.filter(order => {
        const orderName = (order.customer_name || "").toLowerCase().trim();
        const myName = storedName.toLowerCase().trim();
        return orderName === myName;
      });

      // Gabungkan & Hilangkan duplikasi transaksi
      const combined = [...dbOrders, ...filteredLocal];
      const uniqueOrders = [];
      const seen = new Set();
      combined.forEach(o => {
        const key = o.created_at || o.id || Math.random().toString();
        if (!seen.has(key)) {
          seen.add(key);
          uniqueOrders.push(o);
        }
      });

      // Hitung total poin secara riil
      const totalPoints = uniqueOrders.reduce((sum, order) => sum + (order.points_earned || 0), 0);
      setMemberPoints(totalPoints);
      setOrderHistory(uniqueOrders);
    } catch (err) {
      console.warn("Gagal sinkronisasi data member:", err);
    }
  };

  // 2. Fetch Data Obat untuk Katalog
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      const jsonProducts = dataApotek.products || [];
      let combined = jsonProducts;
      if (!error && data && data.length > 0) {
        combined = [...data, ...jsonProducts];
      }
      
      const unique = [];
      const seen = new Set();
      for (const item of combined) {
        const key = item.name;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(item);
        }
      }
      setProducts(unique.map(p => ({ ...p, priceNumeric: parsePrice(p.price) })));
    } catch (err) {
      console.warn("Offline, menggunakan katalog lokal.");
    }
  };

  useEffect(() => {
    fetchMemberData();
    fetchProducts();
  }, []);

  // Hitung Tier Keanggotaan Dinamis
  const getTier = (points) => {
    if (points >= 2000) return "Platinum Care Member";
    if (points >= 1000) return "Gold Care Member";
    if (points >= 500) return "Silver Care Member";
    return "Bronze Care Member";
  };

  const memberTier = getTier(memberPoints);
  const nextTierPoints = memberPoints >= 2000 ? 5000 : (memberPoints >= 1000 ? 2000 : (memberPoints >= 500 ? 1000 : 500));
  const progressPct = Math.min(100, Math.round((memberPoints / nextTierPoints) * 100));

  // Diskon Tier Pasien
  const getDiscountRate = () => {
    if (memberPoints >= 2000) return 0.15;
    if (memberPoints >= 1000) return 0.10;
    if (memberPoints >= 500) return 0.05;
    return 0;
  };
  const discountRate = getDiscountRate();

  const categories = ["All", ...new Set(products.map(p => p.type || "Tablet").filter(Boolean))];
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || (p.type || "Tablet") === selectedCategory;
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.id === product.id);
      return exist 
        ? prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.id === productId);
      if (!exist) return prev;
      return exist.quantity === 1
        ? prev.filter(item => item.product.id !== productId)
        : prev.map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const deleteFromCart = (productId) => setCart(prev => prev.filter(item => item.product.id !== productId));

  const subTotal = cart.reduce((sum, item) => sum + (item.product.priceNumeric * item.quantity), 0);
  const discountAmount = Math.round(subTotal * discountRate);
  const finalTotal = Math.max(0, subTotal - discountAmount);
  const pointsEarned = Math.floor(finalTotal / 1000);

  // Proses Checkout
  const handlePurchase = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Pilih obat terlebih dahulu mase!");
    
    setLoading(true);

    const payload = {
      customer_name: userData.name.trim(), // Pastikan nama di-trim
      phone: userData.phone,
      medicine_type: cart.map(item => `${item.product.name} (x${item.quantity})`).join(", "),
      notes: recipeNote ? `Pesan: ${recipeNote}` : "Pemesanan Obat via E-Shop Portal Member",
      price: finalTotal,
      points_earned: pointsEarned,
      status: "completed",
      created_at: new Date().toISOString()
    };

    try {
      // 1. Simpan ke Supabase
      const { error } = await supabase.from("orders").insert([payload]);
      if (error) throw error;
      
      setLastPoinEarned(pointsEarned);
      setIsOrdered(true);
      
      // Simpan cadangan ke local storage juga biar database status tersinkronisasi
      const localTrans = JSON.parse(localStorage.getItem("local_transactions") || "[]");
      localStorage.setItem("local_transactions", JSON.stringify([payload, ...localTrans]));

      setCart([]);
      setRecipeNote("");
      fetchMemberData();
    } catch (err) {
      console.warn("Gagal online, simpan ke lokal:", err.message);
      // Fallback lokal jika jaringan gagal
      const localTrans = JSON.parse(localStorage.getItem("local_transactions") || "[]");
      localStorage.setItem("local_transactions", JSON.stringify([payload, ...localTrans]));
      
      setLastPoinEarned(pointsEarned);
      setIsOrdered(true);
      setCart([]);
      setRecipeNote("");
      fetchMemberData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans antialiased text-slate-800 flex flex-col relative overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .bg-emerald-650 { background-color: #0f766e !important; }
        .hover\:bg-emerald-700:hover { background-color: #115e59 !important; }
        .bg-emerald-50 { background-color: #f0fdfa !important; }
        .bg-emerald-100 { background-color: #ccfbf1 !important; }
        .text-emerald-600 { color: #0d9488 !important; }
        .text-emerald-700 { color: #0f766e !important; }
        .text-emerald-800 { color: #115e59 !important; }
        .border-emerald-100 { border-color: rgba(13, 148, 136, 0.2) !important; }
        .border-emerald-200 { border-color: rgba(13, 148, 136, 0.3) !important; }
        .gradient-green { background: linear-gradient(135deg, #0f766e 0%, #115e59 100%) !important; }
        .shadow-emerald-500\/20 { box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.1), 0 4px 6px -4px rgba(13, 148, 136, 0.1) !important; }
        .bg-white, .bg-white\/80 { background-color: #fafcfb !important; border-color: rgba(196, 181, 153, 0.25) !important; }
        .text-slate-900, .text-slate-800 { color: #042f2e !important; }
        .text-slate-505, .text-slate-400 { color: #475569 !important; }
      `}</style>

      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-amber-500/5 via-teal-500/5 to-transparent blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-teal-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* HEADER NAVBAR */}
      <MemberNavbar
        userData={userData}
        memberTier={memberTier}
        onProfileOpen={() => setIsProfileOpen(true)}
      />

      {/* TABS MENU */}
      <MemberTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-grow">
        
        {activeTab === "beranda" && (
          <>
            {/* PROMO POINT BANNER */}
            <div className="bg-gradient-to-r from-teal-950 to-emerald-900 text-white rounded-3xl p-6 mb-8 border border-emerald-800/30 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-md">
              <div className="text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-400 text-teal-950 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Program Poin Loyalitas Apotek
                </div>
                <h3 className="text-base font-bold text-white">Makin Sering Belanja, Makin Banyak Untung! 💊</h3>
                <p className="text-xs text-teal-200/80 leading-relaxed max-w-xl">
                  Setiap pembelanjaan senilai **Rp 1.000** bernilai **1 Poin Member**. Tingkatkan peringkat Anda untuk menikmati potongan resep langsung s.d 15%, bebas antre, dan konsultasi gratis!
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center w-full md:w-auto">
                <div className="bg-teal-900/40 p-3 rounded-2xl border border-teal-800/40">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest block mb-0.5">Bronze</span>
                  <span className="text-[10px] text-teal-200 font-bold">Mulai</span>
                </div>
                <div className="bg-teal-900/40 p-3 rounded-2xl border border-teal-800/40">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest block mb-0.5">Silver</span>
                  <span className="text-[10px] text-slate-300 font-bold">500 Pts</span>
                </div>
                <div className="bg-teal-900/40 p-3 rounded-2xl border border-teal-800/40">
                  <span className="text-[8px] text-gray-455 uppercase tracking-widest block mb-0.5">Gold</span>
                  <span className="text-[10px] text-yellow-400 font-bold">1000 Pts</span>
                </div>
                <div className="bg-teal-900/40 p-3 rounded-2xl border border-teal-800/40">
                  <span className="text-[8px] text-gray-455 uppercase tracking-widest block mb-0.5">Platinum</span>
                  <span className="text-[10px] text-purple-400 font-bold">2000 Pts</span>
                </div>
              </div>
            </div>

            {/* HERO PANEL */}
            <MemberHero
              userData={userData}
              memberPoints={memberPoints}
              nextTierPoints={nextTierPoints}
              progressPct={progressPct}
              onProfileOpen={() => setIsProfileOpen(true)}
              setActiveTab={setActiveTab}
            />
            {/* STATS CARDS */}
            <StatCards memberPoints={memberPoints} />

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-8">
              <div className="lg:col-span-2 space-y-8">
                <VoucherSection onVoucherClick={setActiveVoucher} />
                <TierSection />
              </div>

              <div className="lg:col-span-1">
                <MemberSidebar
                  userData={userData}
                  onProfileOpen={() => setIsProfileOpen(true)}
                  openFaq={openFaq}
                  setOpenFaq={setOpenFaq}
                />
              </div>
            </div>
          </>
        )}

        {/* TAB TEBUS RESEP */}
        {activeTab === "resep" && (
          <div className="w-full flex flex-col gap-6 text-left">
            <h2 className="text-xl font-bold text-teal-955 font-master-title">Beli Obat & Tebus Resep Prioritas</h2>
            <p className="text-xs text-slate-500 -mt-4">
              Silakan pilih obat di bawah. Diskon khusus tier <span className="font-extrabold text-amber-600 uppercase">{memberTier.split(" ")[0]} ({discountRate * 100}%)</span> akan langsung dipotong otomatis saat pemesanan!
            </p>

            {isOrdered ? (
              <div className="bg-white border border-[#c4b599]/20 rounded-3xl p-8 max-w-lg mx-auto text-center space-y-4 shadow-md">
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Transaksi Belanja Berhasil!</h3>
                <p className="text-xs text-slate-505 max-w-sm mx-auto leading-relaxed">
                  Pesanan obat Anda telah diterima dan langsung masuk antrean prioritas dispensing apoteker.
                </p>
                <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-2xl p-4 text-xs font-bold w-max mx-auto">
                  🎉 Anda baru saja mendapatkan +{lastPoinEarned} Poin Loyalitas!
                </div>
                <div className="pt-2 flex gap-3 justify-center">
                  <button onClick={() => { setIsOrdered(false); fetchMemberData(); }} className="bg-teal-900 text-white hover:bg-teal-955 text-xs font-bold px-6 py-3 rounded-xl cursor-pointer">Belanja Lagi</button>
                  <button onClick={() => setActiveTab("riwayat")} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-3 rounded-xl cursor-pointer">Lihat Riwayat</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* KATALOG OBAT */}
                <div className="lg:col-span-7 bg-white border border-[#c4b599]/20 rounded-3xl p-6 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <span className="text-sm font-bold text-teal-955">Daftar Obat Apotek</span>
                    <div className="relative w-full sm:w-60 flex items-center">
                      <span className="absolute left-3 text-slate-400"><Search className="w-4 h-4" /></span>
                      <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari obat..."
                        className="w-full bg-slate-50 border border-slate-150/60 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none text-slate-700 font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {categories.map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap ${
                          selectedCategory === cat ? "bg-teal-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[480px] overflow-y-auto pr-1">
                    {filteredProducts.map((p) => (
                      <div key={p.id} className="border border-slate-100 hover:border-teal-800/10 rounded-2xl p-3 flex flex-col justify-between hover:shadow-md transition bg-white">
                        <div className="h-20 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden mb-2">
                          <img 
                            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80" 
                            alt={p.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="text-left space-y-1">
                          <span className="text-[9px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md uppercase tracking-wider">{p.type || "Tablet"}</span>
                          <h4 className="text-[11px] font-extrabold text-slate-800 truncate leading-tight mt-1">{p.name}</h4>
                          <p className="text-[10px] font-mono text-amber-705 font-bold">{formatRupiah(p.priceNumeric)}</p>
                        </div>
                        <button 
                          onClick={() => addToCart(p)}
                          className="mt-3 w-full bg-slate-50 hover:bg-teal-50 hover:text-teal-800 text-slate-505 py-1.5 rounded-xl text-[10px] font-extrabold transition cursor-pointer flex items-center justify-center gap-1 border border-slate-100"
                        >
                          <Plus className="w-3 h-3" /> Tambah
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RINGKASAN BELANJA */}
                <div className="lg:col-span-5 bg-white border border-[#c4b599]/20 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[500px]">
                  <div>
                    <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-4 text-teal-955">
                      <ShoppingCart className="w-4 h-4" />
                      <h3 className="text-sm font-bold">Keranjang Obat VIP</h3>
                    </div>

                    <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                      {cart.length === 0 ? (
                        <p className="text-center py-12 text-slate-400 text-xs">Pilih obat di katalog sebelah kiri mase</p>
                      ) : (
                        cart.map((item) => (
                          <div key={item.product.id} className="flex justify-between items-center text-xs text-slate-700 border-b border-slate-50 pb-2">
                            <div className="text-left flex-1 pr-2">
                              <h4 className="font-bold truncate">{item.product.name}</h4>
                              <span className="text-[10px] text-slate-400 font-mono">{formatRupiah(item.product.priceNumeric)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded px-1 w-max">
                              <button onClick={() => removeFromCart(item.product.id)} className="text-slate-400 hover:text-slate-705"><Minus className="w-3 h-3" /></button>
                              <span className="text-[10px] font-bold">{item.quantity}</span>
                              <button onClick={() => addToCart(item.product)} className="text-slate-400 hover:text-slate-705"><Plus className="w-3 h-3" /></button>
                            </div>
                            <div className="w-20 text-right font-bold text-slate-800 flex items-center justify-end gap-2 ml-2">
                              <span>{formatRupiah(item.product.priceNumeric * item.quantity)}</span>
                              <button onClick={() => deleteFromCart(item.product.id)} className="text-slate-300 hover:text-rose-500">✕</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <form onSubmit={handlePurchase} className="border-t border-slate-100 pt-4 space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Catatan Dokter / Catatan Pengiriman</label>
                      <textarea 
                        value={recipeNote}
                        onChange={(e) => setRecipeNote(e.target.value)}
                        placeholder="Contoh: Lampirkan info aturan minum obat racikan, atau tulis alamat antar..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-700 focus:outline-none h-16 resize-none"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl space-y-2 text-xs text-slate-505">
                      <div className="flex justify-between"><span>Subtotal Belanja</span><span className="font-bold text-slate-700">{formatRupiah(subTotal)}</span></div>
                      
                      {discountRate > 0 && (
                        <div className="flex justify-between text-teal-800">
                          <span>Diskon VIP Tier ({discountRate * 100}%)</span>
                          <span className="font-bold">-{formatRupiah(discountAmount)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between font-bold text-slate-800 border-t border-slate-200/50 pt-2 text-sm">
                        <span>Total Bayar</span>
                        <span className="text-teal-900">{formatRupiah(finalTotal)}</span>
                      </div>
                      
                      {pointsEarned > 0 && (
                        <div className="flex justify-between items-center bg-amber-50 border border-amber-200 rounded-lg p-2 mt-1.5 text-[10px] text-amber-800 font-bold">
                          <span>Estimasi Poin Diperoleh:</span>
                          <span>+{pointsEarned} Pts</span>
                        </div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading || cart.length === 0}
                      className="w-full bg-teal-900 text-white hover:bg-teal-955 disabled:bg-slate-150 disabled:text-slate-400 text-xs font-bold py-3.5 rounded-xl transition shadow-md cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" /> 
                      {loading ? "Memproses Transaksi..." : "Bayar & Tebus Sekarang"}
                    </button>
                  </form>
                </div>

              </div>
            )}
          </div>
        )}

        {activeTab === "reward" && (
          <div className="space-y-8">
            <VoucherSection onVoucherClick={setActiveVoucher} />
            <TierSection />
          </div>
        )}

        {activeTab === "riwayat" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-[#c4b599]/20 rounded-3xl p-6 shadow-md shadow-slate-100">
              <h2 className="text-lg font-bold text-teal-955 mb-4 text-left">Riwayat Aktivitas & Layanan VIP</h2>
              <div className="space-y-4">
                {orderHistory.length === 0 ? (
                  <p className="text-center py-10 text-slate-400 text-xs font-bold">Belum ada riwayat transaksi poin</p>
                ) : (
                  orderHistory.map((act, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border border-slate-100 hover:border-teal-800/20 hover:bg-[#faf8f5] rounded-2xl transition">
                      <div className="text-left flex-1 pr-4">
                        <h3 className="text-sm font-bold text-slate-800">{act.medicine_type || "Penebusan Resep"}</h3>
                        <p className="text-xs text-slate-505 mt-1">{act.notes || "Poin Belanja Apotek"}</p>
                        <span className="text-[10px] text-slate-400 block mt-2">
                          {new Date(act.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-teal-850 bg-[#e6f4f1] border border-teal-100 px-2 py-1 rounded-md">+{act.points_earned} Poin</span>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full border bg-teal-50 text-teal-700 border-teal-100 capitalize">{act.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* EMERGENCY CONSULTATION BANNER */}
        <div className="mt-12 bg-teal-950 text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-lg border border-teal-900/10">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-lg font-bold text-white mb-2">Butuh Konsultasi Obat Darurat?</h2>
            <p className="text-xs text-teal-200/80 leading-relaxed">
              Apoteker priority kami siaga 24 jam untuk menjawab pertanyaan seputar efek samping obat keras, aturan pakai sirup anak, dan interaksi obat.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 w-full md:w-auto justify-center">
            <a 
              href="https://wa.me/62899998888" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-teal-950 text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-md no-underline cursor-pointer active:scale-95 animate-bounce"
            >
              <Phone className="w-4 h-4 text-teal-950" /> Call Center 24 Jam
            </a>
            <div className="flex items-center gap-2 bg-[#092921] text-amber-400 border border-teal-900/30 text-xs font-bold px-6 py-3.5 rounded-xl">
              <MapPin className="w-4 h-4 text-amber-400" /> Pekanbaru, Riau
            </div>
          </div>
        </div>
      </main>

      {/* POPUP MODAL */}
      {isProfileOpen && (
        <ProfileModal
          userData={userData}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      <VoucherModal
        activeVoucher={activeVoucher}
        onClose={() => setActiveVoucher(null)}
      />
    </div>
  );
}