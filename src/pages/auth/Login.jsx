import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { Pill, Sparkles, Database } from "lucide-react";

// Hubungkan ke konfigurasi Supabase Client
import { supabase } from "../../supabaseClient";

export default function Login() {
  const navigate = useNavigate();

  // STATE MANAGEMENT FOR LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIC HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Ambil data nama, role, dan password berdasarkan email dari Supabase
      const { data: userData, error: dbError } = await supabase
        .from("user")
        .select("name, role, password")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (dbError) throw dbError;

      if (!userData) {
        throw new Error("Akun email tidak terdaftar di sistem!");
      }

      // 2. Cocokkan password
      if (userData.password !== password) {
        throw new Error("Password yang mase masukkan salah!");
      }

      const userRole = userData?.role?.toLowerCase(); 

      // 3. Simpan Sesi Login ke LocalStorage
      localStorage.setItem("userEmail", email.trim().toLowerCase());
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userName", userData?.name || "User");

      // 4. Arahkan ke rute berdasarkan role
      if (userRole === "admin" || userRole === "director" || userRole === "manager") {
        navigate("/dashboard"); 
      } else {
        navigate("/member");    
      }

    } catch (err) {
      setError(err.message || "Kredensial salah atau akun tidak terdaftar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#faf8f5] flex font-sans selection:bg-amber-100 selection:text-amber-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-master-bold { font-family: 'Poppins', sans-serif !important; font-weight: 850 !important; letter-spacing: -0.03em !important; }
        .font-master-title { font-family: 'Poppins', sans-serif !important; font-weight: 700 !important; }
      `}</style>

      {/* ─── SISI KIRI: BACKGROUND KLINIK & LOGO BRAND ─── */}
      <div 
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative items-center p-16"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?q=80&w=1200&auto=format&fit=crop')` 
        }}
      >
        {/* Deep Teal & Gold Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/80 via-teal-900/60 to-amber-950/20 backdrop-blur-[2px]"></div>
        
        {/* Konten Slogan */}
        <div className="relative z-10 text-white max-w-md text-left">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
              <Pill className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xl font-master-title tracking-wider uppercase text-white">SIApotek</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-master-bold leading-tight mb-4 text-white">
            Satu Sentuhan untuk <br /> Layanan Kesehatan.
          </h1>
          <p className="text-teal-100/80 text-sm leading-relaxed font-medium">
            Masuk untuk mengakses dasbor monitoring resep, rekam medis, antrean prioritas, serta integrasi Supabase secara terpadu.
          </p>
        </div>
      </div>

      {/* ─── SISI KANAN: FORM LOGIN UTAMA ─── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto border-l border-[#c4b599]/20">
        <div className="w-full max-w-[380px] py-8 text-left">
          
          {/* Logo mobile */}
          <div className="md:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 bg-teal-950 rounded-xl flex items-center justify-center text-amber-400">
              <Pill className="w-4.5 h-4.5" />
            </div>
            <span className="text-lg font-master-title uppercase tracking-wider text-teal-950">SIApotek</span>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-teal-950 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 text-xs font-medium">Masukkan email dan password untuk masuk ke sistem.</p>
          </div>

          {/* FEEDBACK ERROR MESSAGE */}
          {error && (
            <p className="text-rose-600 text-[10px] mb-6 font-black uppercase tracking-widest text-center bg-rose-50 p-4 rounded-xl border border-rose-100/50">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* FIELD INPUT EMAIL */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
              <input
                type="email"
                disabled={loading}
                className="w-full border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 py-3 text-slate-800 outline-none transition-all disabled:opacity-50 bg-[#faf8f5]/40 font-medium text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@gmail.com"
                required
              />
            </div>

            {/* FIELD INPUT PASSWORD */}
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-amber-700 hover:text-amber-800 transition">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                disabled={loading}
                className="w-full border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 py-3 text-slate-800 outline-none transition-all disabled:opacity-50 bg-[#faf8f5]/40 font-medium text-xs"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-950 hover:bg-teal-900 hover:scale-[1.01] text-white py-3.5 rounded-xl font-bold flex items-center justify-center relative shadow-lg shadow-teal-950/10 transition-all active:scale-[0.98] disabled:opacity-50 text-xs tracking-wider uppercase mt-8"
            >
              <span>{loading ? "Verifikasi Akun..." : "Continue"}</span>
              <div className="absolute right-4 bg-white/10 p-1 rounded-full border border-white/10">
                <MdArrowForward className="text-base text-amber-400" />
              </div>
            </button>
          </form>

          <div className="mt-10 text-center text-xs text-slate-400">
            Belum memiliki akun?{" "}
            <Link to="/register" className="text-amber-600 font-bold hover:underline ml-1">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}