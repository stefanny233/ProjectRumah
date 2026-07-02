import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Lock, 
  Palette, 
  HelpCircle,
  LogOut,
  CheckCircle2,
  Shield,
  Contact,
  Globe,
  Bell,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  Info
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  // STATE Halaman Utama
  const [activeMenu, setActiveMenu] = useState("profile"); // 'profile', 'preferences', 'security', 'help'
  const [userName, setUserName] = useState("STEFANNY");
  const [userRole, setUserRole] = useState("System Administrator");
  const [userEmail, setUserEmail] = useState("admin@apothecary.com");
  const [successMessage, setSuccessMessage] = useState("");

  // ================= STATE PER SUB-MENU =================
  
  // 1. Edit Profile State
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // 2. Preferences State
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("id");
  const [syncInterval, setSyncInterval] = useState("10");
  const [notificationSound, setNotificationSound] = useState(true);

  // 3. Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  // 4. Help Center State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const helpFaqs = [
    {
      q: "Bagaimana cara sinkronisasi data Supabase secara manual?",
      a: "Sistem melakukan auto-sync secara berkala (default 10 detik). Namun Anda dapat memaksa sinkronisasi dengan menekan tombol status 'Live Sync' di ujung kanan atas navigasi utama."
    },
    {
      q: "Bagaimana cara mereset password administrator?",
      a: "Buka menu keamanan 'Security' di sebelah kiri, masukkan password lama Anda, kemudian masukkan password baru dan simpan perubahan."
    },
    {
      q: "Mengapa koneksi Supabase berstatus 'Mode Offline'?",
      a: "Hal ini terjadi bila server internet terputus atau API Key di file 'supabaseClient.js' tidak valid. Sistem akan otomatis beralih ke local storage simulasi agar operasional kasir tetap berjalan."
    }
  ];

  // Load data admin saat halaman dimuat
  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "STEFANNY";
    const storedRole = localStorage.getItem("userRole") || "System Administrator";
    const storedEmail = localStorage.getItem("userEmail") || "admin@apothecary.com";
    
    // Preferences load
    const storedTheme = localStorage.getItem("prefTheme") || "light";
    const storedLang = localStorage.getItem("prefLang") || "id";
    const storedSync = localStorage.getItem("prefSync") || "10";

    setUserName(storedName);
    setUserRole(storedRole);
    setUserEmail(storedEmail);
    setEditName(storedName);
    setEditEmail(storedEmail);

    setTheme(storedTheme);
    setLanguage(storedLang);
    setSyncInterval(storedSync);
  }, []);

  // Save Profile Changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", editName);
    localStorage.setItem("userEmail", editEmail);
    
    setUserName(editName);
    setUserEmail(editEmail);
    
    showFeedback("Profil admin berhasil diperbarui!");
    setTimeout(() => {
      window.location.reload(); // Reload agar Header ikut terupdate
    }, 1000);
  };

  // Save Preferences Changes
  const handleSavePreferences = (e) => {
    e.preventDefault();
    localStorage.setItem("prefTheme", theme);
    localStorage.setItem("prefLang", language);
    localStorage.setItem("prefSync", syncInterval);

    showFeedback("Preferensi sistem berhasil disimpan!");
  };

  // Save Security Changes
  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Password baru dan konfirmasi password tidak cocok!");
      return;
    }
    
    // Simpan password ke localStorage sebagai demo
    localStorage.setItem("userPassword", newPassword);
    
    showFeedback("Pengaturan keamanan berhasil diperbarui!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Helper untuk menampilkan notifikasi sukses
  const showFeedback = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  // Handler Log Out
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto py-4 text-left font-sans select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-title { font-family: 'Poppins', sans-serif !important; font-weight: 700 !important; }
      `}</style>

      {/* HEADER PAGE */}
      <div className="mb-8">
        <h1 className="text-2xl font-title text-[#153421] mb-1">System Settings</h1>
        <p className="text-xs text-gray-400">Konfigurasi profile, preferensi dashboard, dan keamanan akun kasir apotek Anda.</p>
      </div>

      {/* FEEDBACK SUCCESS */}
      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl flex items-center gap-2.5 text-xs font-semibold animate-pulse">
          <CheckCircle2 size={18} className="text-emerald-600 animate-bounce" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= KOLOM KIRI: MENU SELECTOR ================= */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* PROFILE CARD */}
          <div className="bg-[#153421] text-white p-6 rounded-3xl shadow-sm border border-[#1d422b] relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-bold text-xl text-teal-950 shadow-inner mb-4">
                {userName.substring(0, 2).toUpperCase()}
              </div>
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">{userName}</h3>
              <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider mt-2">
                {userRole}
              </span>
              <p className="text-[10px] text-teal-200/60 mt-3 font-mono">{userEmail}</p>
            </div>
          </div>

          {/* TAB LIST NAVIGATION */}
          <div className="bg-white border border-gray-200/50 p-4 rounded-3xl space-y-1">
            <button 
              onClick={() => setActiveMenu("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${activeMenu === "profile" ? "text-[#153421] bg-gray-100 border border-gray-200" : "text-gray-400 hover:bg-gray-50"}`}
            >
              <User size={18} className={activeMenu === "profile" ? "text-teal-700" : ""} />
              <span>Edit Profile</span>
            </button>
            <button 
              onClick={() => setActiveMenu("preferences")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${activeMenu === "preferences" ? "text-[#153421] bg-gray-100 border border-gray-200" : "text-gray-400 hover:bg-gray-50"}`}
            >
              <Palette size={18} className={activeMenu === "preferences" ? "text-teal-700" : ""} />
              <span>Preferences</span>
            </button>
            <button 
              onClick={() => setActiveMenu("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${activeMenu === "security" ? "text-[#153421] bg-gray-100 border border-gray-200" : "text-gray-400 hover:bg-gray-50"}`}
            >
              <Shield size={18} className={activeMenu === "security" ? "text-teal-700" : ""} />
              <span>Security Settings</span>
            </button>
            <button 
              onClick={() => setActiveMenu("help")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${activeMenu === "help" ? "text-[#153421] bg-gray-100 border border-gray-200" : "text-gray-400 hover:bg-gray-50"}`}
            >
              <HelpCircle size={18} className={activeMenu === "help" ? "text-teal-700" : ""} />
              <span>Help Center</span>
            </button>
          </div>
        </div>

        {/* ================= KOLOM KANAN: DYNAMIC RENDER ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB: EDIT PROFILE */}
          {activeMenu === "profile" && (
            <div className="bg-white border border-gray-200/50 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Contact size={20} className="text-teal-700" />
                <h2 className="text-sm font-extrabold text-[#153421] uppercase tracking-wider">Account Credentials</h2>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full border border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 py-3 text-slate-800 outline-none transition-all text-xs font-medium"
                      placeholder="Nama Admin"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full border border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 py-3 text-slate-800 outline-none transition-all text-xs font-medium"
                      placeholder="admin@apotek.com"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#153421] hover:bg-[#1f4b30] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-md cursor-pointer"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: PREFERENCES */}
          {activeMenu === "preferences" && (
            <div className="bg-white border border-gray-200/50 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Palette size={20} className="text-teal-700" />
                <h2 className="text-sm font-extrabold text-[#153421] uppercase tracking-wider">System Preferences</h2>
              </div>

              <form onSubmit={handleSavePreferences} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pilihan Bahasa */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase pl-1 flex items-center gap-1">
                      <Globe size={12} /> Language / Bahasa
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full border border-gray-200 focus:border-amber-500 rounded-xl px-4 py-3 text-xs font-semibold bg-white cursor-pointer"
                    >
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English (US)</option>
                    </select>
                  </div>

                  {/* Interval Auto-Sync */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase pl-1 flex items-center gap-1">
                      <RefreshCw size={12} /> Auto-Sync Interval (Detik)
                    </label>
                    <select
                      value={syncInterval}
                      onChange={(e) => setSyncInterval(e.target.value)}
                      className="w-full border border-gray-200 focus:border-amber-500 rounded-xl px-4 py-3 text-xs font-semibold bg-white cursor-pointer"
                    >
                      <option value="5">Setiap 5 Detik</option>
                      <option value="10">Setiap 10 Detik</option>
                      <option value="30">Setiap 30 Detik</option>
                    </select>
                  </div>
                </div>

                {/* Notifikasi Suara */}
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Bell size={18} className="text-teal-700" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#153421]">Sound Notification</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">Bunyi peringatan untuk resep masuk baru.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSound}
                    onChange={(e) => setNotificationSound(e.target.checked)}
                    className="w-4 h-4 accent-teal-700 cursor-pointer"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#153421] hover:bg-[#1f4b30] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-md cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: SECURITY */}
          {activeMenu === "security" && (
            <div className="bg-white border border-gray-200/50 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Lock size={20} className="text-teal-700" />
                <h2 className="text-sm font-extrabold text-[#153421] uppercase tracking-wider">Security & Authentication</h2>
              </div>

              <form onSubmit={handleSaveSecurity} className="space-y-5">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-gray-200 focus:border-amber-500 rounded-xl px-4 py-3 text-slate-800 outline-none text-xs font-medium"
                    placeholder="••••••••••••"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-200 focus:border-amber-500 rounded-xl px-4 py-3 text-slate-800 outline-none text-xs font-medium"
                      placeholder="Minimal 6 karakter"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-200 focus:border-amber-500 rounded-xl px-4 py-3 text-slate-800 outline-none text-xs font-medium"
                      placeholder="Ulangi password baru"
                    />
                  </div>
                </div>

                {/* 2-Factor Authentication */}
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-teal-700" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#153421]">Two-Factor Authentication (2FA)</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">Amankan login kasir menggunakan kode SMS / OTP.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                    className="w-4 h-4 accent-teal-700 cursor-pointer"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#153421] hover:bg-[#1f4b30] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-md cursor-pointer"
                  >
                    Update Security Options
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: HELP CENTER */}
          {activeMenu === "help" && (
            <div className="bg-white border border-gray-200/50 p-6 rounded-3xl shadow-sm text-left">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <HelpCircle size={20} className="text-teal-700" />
                <h2 className="text-sm font-extrabold text-[#153421] uppercase tracking-wider">Help Center & FAQ</h2>
              </div>

              {/* System Version info card */}
              <div className="bg-[#f0fafc] border border-cyan-150 p-4 rounded-2xl flex gap-3 text-cyan-800 text-xs mb-6">
                <Info size={18} className="text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-0.5">SIApotek System Information</h4>
                  <p className="text-[11px] text-cyan-700 leading-relaxed">
                    Sistem saat ini berjalan pada versi <strong>v2.0 (Stable release)</strong>. Database terhubung ke skema tabel Supabase Core.
                  </p>
                </div>
              </div>

              {/* FAQ Accordion */}
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-950 mb-3 pl-1">Pertanyaan Sering Diajukan</h3>
              <div className="space-y-3 mb-6">
                {helpFaqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-[#faf8f5]/40 hover:bg-[#faf8f5]/90 text-left text-xs font-bold text-slate-800"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${openFaqIndex === idx ? "rotate-180 text-teal-700" : ""}`} />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-4 pb-3 pt-1 text-[11px] text-slate-500 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DANGER ZONE (TETAP RENDER DI BAWAH DARI SEMUA TAB MENU) */}
          <div className="bg-rose-50/50 border border-rose-100/80 p-6 rounded-3xl text-left">
            <h3 className="text-sm font-extrabold text-rose-800 uppercase tracking-wider mb-2">Danger Zone</h3>
            <p className="text-[11px] text-rose-700/80 mb-6 leading-relaxed">
              Keluar dari akun Anda untuk mengakhiri sesi. Data rekam medis dan database Supabase Anda akan tetap aman tersimpan.
            </p>
            <button
              onClick={handleLogout}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={16} />
              <span>Log Out dari SIApotek</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}