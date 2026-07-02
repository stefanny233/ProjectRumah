import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import { Pill, Sparkles } from "lucide-react";
import { userService } from "../../userService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.role
    ) {
      setAlert({
        type: "error",
        text: "Registrasi Gagal: Semua kolom wajib diisi mase!",
      });
      return;
    }

    setLoading(true);
    setAlert({ type: "", text: "" });

    try {
      // Mengirim data ke tabel kustom 'user' di database Supabase Anda
      await userService.createUser({
        name: formData.fullName,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
      });

      setAlert({
        type: "success",
        text: "Registrasi Berhasil! Akun disimpan ke Supabase.",
      });
      setFormData({ fullName: "", email: "", password: "", role: "" });

      // Tunggu 2 detik kemudian alihkan ke halaman Login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setAlert({ type: "error", text: `Registrasi Gagal: ${error.message}` });
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

      {/* ─── SISI KIRI: BACKGROUND APOTEK & LOGO BRAND ─── */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative items-center p-16"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop')`,
        }}
      >
        {/* Deep Teal & Gold Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/80 via-teal-900/60 to-amber-950/20 backdrop-blur-[2px]"></div>

        <div className="relative z-10 text-white max-w-md text-left">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
              <Pill className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xl font-master-title tracking-wider uppercase text-white">
              SIAPOTEK
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-master-bold leading-tight mb-4 text-white">
            Gabung dalam Ekosistem Kami.
          </h1>
          <p className="text-teal-100/80 text-sm leading-relaxed font-medium">
            Daftarkan diri Anda untuk menikmati kemudahan menebus resep online tanpa antre, kumpulkan poin loyalitas, serta konsultasi farmasi prioritas 24 jam.
          </p>
        </div>
      </div>

      {/* ─── SISI KANAN: FORM REGISTER UTAMA ─── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto border-l border-[#c4b599]/20">
        <div className="w-full max-w-[380px] py-8 text-left">
          
          {/* Logo mobile */}
          <div className="md:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 bg-teal-950 rounded-xl flex items-center justify-center text-amber-400">
              <Pill className="w-4.5 h-4.5" />
            </div>
            <span className="text-lg font-master-title uppercase tracking-wider text-teal-950">
              SIAPOTEK
            </span>
          </div>

          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-teal-950 mb-2 tracking-tight">
              Create an Account
            </h2>
            <p className="text-slate-500 text-xs font-medium">Daftar akun baru untuk mulai menggunakan layanan.</p>
          </div>

          {/* ALERT NOTIFIKASI */}
          {alert.text && (
            <div
              className={`p-4 mb-6 text-xs font-bold rounded-xl text-center border ${alert.type === "success" ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}
            >
              {alert.text}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* INPUT FULL NAME */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 py-3 text-slate-800 outline-none transition-all disabled:opacity-50 bg-[#faf8f5]/40 font-medium text-xs"
                placeholder="Nama Lengkap Anda"
              />
            </div>

            {/* INPUT EMAIL ADDRESS */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 py-3 text-slate-800 outline-none transition-all disabled:opacity-50 bg-[#faf8f5]/40 font-medium text-xs"
                placeholder="john.doe@gmail.com"
              />
            </div>

            {/* INPUT PASSWORD */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength="6"
                className="w-full border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 py-3 text-slate-800 outline-none transition-all disabled:opacity-50 bg-[#faf8f5]/40 font-medium text-xs"
                placeholder="••••••••••••"
              />
            </div>

            {/* DROPDOWN SELECT ROLE */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                Join As (Role)
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 py-3 text-slate-800 outline-none transition-all disabled:opacity-50 bg-[#faf8f5]/40 font-medium text-xs cursor-pointer"
              >
                <option value="" disabled>
                  Pilih Role Anda
                </option>
                <option value="member">Member (Pasien)</option>
                <option value="admin">Admin Apotek</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-950 hover:bg-teal-900 hover:scale-[1.01] text-white py-3.5 rounded-xl font-bold flex items-center justify-center relative shadow-lg shadow-teal-950/10 transition-all active:scale-[0.98] disabled:opacity-50 text-xs tracking-wider uppercase mt-6"
            >
              <span>{loading ? "Memproses..." : "Get Started"}</span>
              <div className="absolute right-4 bg-white/10 p-1 rounded-full border border-white/10">
                <MdArrowForward className="text-base text-amber-400" />
              </div>
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-400">
            Sudah memiliki akun?{" "}
            <Link to="/login" className="text-amber-600 font-bold hover:underline ml-1">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}