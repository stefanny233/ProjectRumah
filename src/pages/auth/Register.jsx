import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
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
      await userService.createUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setAlert({
        type: "success",
        text: "Registrasi Berhasil! Akun disimpan ke Supabase.",
      });
      setFormData({ fullName: "", email: "", password: "", role: "" });

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
    <div className="fixed inset-0 bg-[#F3F4F6] flex font-sans">
      {/* ─── SISI KIRI: GAMBAR APOTEKER / OBAT ESTETIK ─── */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative items-center p-16"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1200&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-black tracking-wider uppercase border-b-2 border-[#FFD700]">
              SIAPOTEK
            </span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            Let's Get You Started...
          </h1>
          <p className="text-gray-200 text-lg font-light leading-relaxed">
            Bergabunglah bersama jaringan manajemen apotik modern untuk memantau
            sirkulasi resep dan pasien secara real-time.
          </p>
        </div>
      </div>

      {/* ─── SISI KANAN: FORM REGISTER UTAMA ─── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-[420px] py-8">
          {/* Logo mobile */}
          <div className="md:hidden flex items-center gap-2 mb-6 justify-center">
            <span className="text-xl font-black uppercase tracking-wider text-gray-800">
              SIAPOTEK
            </span>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
              Create an Account
            </h2>
            <p className="text-gray-400 text-sm">Daftar akun baru di sini</p>
          </div>

          {/* ALERT NOTIFIKASI */}
          {alert.text && (
            <div
              className={`p-4 mb-6 text-xs font-bold rounded-xl text-center border-2 ${alert.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"}`}
            >
              {alert.text}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* INPUT FULL NAME */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border-2 border-gray-100 focus:border-[#5D5FEF] rounded-xl px-4 py-3.5 text-gray-700 outline-none transition-all bg-gray-50/50 focus:bg-white font-medium text-sm"
                placeholder="Nama Lengkap"
              />
            </div>

            {/* INPUT EMAIL ADDRESS */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border-2 border-gray-100 focus:border-[#5D5FEF] rounded-xl px-4 py-3.5 text-gray-700 outline-none transition-all bg-gray-50/50 focus:bg-white font-medium text-sm"
                placeholder="john.doe@qwu.com"
              />
            </div>

            {/* INPUT PASSWORD */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">
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
                className="w-full border-2 border-gray-100 focus:border-[#5D5FEF] rounded-xl px-4 py-3.5 text-gray-700 outline-none transition-all bg-gray-50/50 focus:bg-white font-medium text-sm"
                placeholder="••••••••••••"
              />
            </div>

            {/* DROPDOWN SELECT ROLE */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">
                Join As (Role)
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border-2 border-gray-100 focus:border-[#5D5FEF] rounded-xl px-4 py-3.5 text-gray-700 outline-none transition-all bg-gray-50/50 focus:bg-white font-medium text-sm cursor-pointer"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center relative shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 text-sm tracking-wide uppercase mt-8"
            >
              <span>{loading ? "Memproses..." : "Get Started"}</span>
              <div className="absolute right-4 bg-white/20 p-1 rounded-full">
                <MdArrowForward className="text-lg" />
              </div>
            </button>
          </form>

          <div className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#5D5FEF] font-bold hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
