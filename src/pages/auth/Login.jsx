import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

// Hubungkan ke konfigurasi Supabase Client milik
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
      const { data: userData, error: dbError } = await supabase
        .from("user")
        .select("role, password")
        .eq("email", email)
        .maybeSingle();

      if (dbError) throw dbError;

      if (!userData) {
        throw new Error("Akun email tidak terdaftar di sistem!");
      }

      if (userData.password !== password) {
        throw new Error("Password yang mase masukkan salah!");
      }

      const userRole = userData?.role?.toLowerCase(); 

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
    <div className="fixed inset-0 bg-[#F3F4F6] flex font-sans">
      {/* ─── SISI KIRI: GAMBAR LINGKUNGAN APOTEK ESTETIK ─── */}
      <div 
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative items-center p-16"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1200&auto=format&fit=crop')` 
        }}
      >
        {/* Dark Overlay biar teks gampang dibaca */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        
        {/* Konten Slogan */}
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-black tracking-wider uppercase border-b-2 border-[#FFD700]">SIApotek</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            Building the Future of Pharmacy...
          </h1>
          <p className="text-gray-200 text-lg font-light leading-relaxed">
            Kelola data obat, inventaris, dan transaksi apotek dalam satu dashboard terintegrasi yang cepat dan aman.
          </p>
        </div>
      </div>

      {/* ─── SISI KANAN: FORM LOGIN UTAMA ─── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-[420px] py-8">
          
          {/* Logo Kecil untuk Mobile */}
          <div className="md:hidden flex items-center gap-2 mb-6 justify-center">
            <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <span className="text-xl font-black uppercase tracking-wider text-gray-800">Luna App</span>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Please enter your email and password to log in.</p>
          </div>

          {/* FEEDBACK ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-xs mb-6 font-bold uppercase tracking-widest text-center bg-red-50 p-4 rounded-xl border border-red-100 animate-pulse">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* FIELD INPUT EMAIL */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Email Address</label>
              <input
                type="email"
                disabled={loading}
                className="w-full border-2 border-gray-100 focus:border-[#5D5FEF] rounded-xl px-4 py-3.5 text-gray-700 outline-none transition-all disabled:opacity-50 bg-gray-50/50 focus:bg-white font-medium text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@gmail.com"
                required
              />
            </div>

            {/* FIELD INPUT PASSWORD */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-[#5D5FEF] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                disabled={loading}
                className="w-full border-2 border-gray-100 focus:border-[#5D5FEF] rounded-xl px-4 py-3.5 text-gray-700 outline-none transition-all disabled:opacity-50 bg-gray-50/50 focus:bg-white font-medium text-sm"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center relative shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 text-sm tracking-wide uppercase mt-8"
            >
              <span>{loading ? "Verifikasi Akun..." : "Continue"}</span>
              <div className="absolute right-4 bg-white/20 p-1 rounded-full">
                <MdArrowForward className="text-lg" />
              </div>
            </button>
          </form>

          <div className="mt-12 text-center text-sm text-gray-400">
            New User?{" "}
            <Link to="/register" className="text-[#5D5FEF] font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}