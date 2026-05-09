import React from "react";
import { Link } from "react-router-dom";
import { MdPersonOutline, MdMailOutline, MdLockOutline } from "react-icons/md";

export default function Register() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-teks uppercase italic tracking-tighter">
          Join QWU Team
        </h2>
        <p className="text-sm text-teks-samping font-medium">
          Daftar akun staf baru di sini
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="ml-2 text-[10px] font-black uppercase text-teks-samping tracking-widest">
            Full Name
          </label>
          <div className="relative group">
            <MdPersonOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-teks-samping group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              className="w-full pl-14 pr-7 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold transition-all text-sm"
              placeholder="Nama Lengkap"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="ml-2 text-[10px] font-black uppercase text-teks-samping tracking-widest">
            Email Address
          </label>
          <div className="relative group">
            <MdMailOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-teks-samping group-focus-within:text-primary transition-colors" />
            <input
              type="email"
              className="w-full pl-14 pr-7 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold transition-all text-sm"
              placeholder="email@qwu.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="ml-2 text-[10px] font-black uppercase text-teks-samping tracking-widest">
            Password
          </label>
          <div className="relative group">
            <MdLockOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-teks-samping group-focus-within:text-primary transition-colors" />
            <input
              type="password"
              className="w-full pl-14 pr-7 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold transition-all text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg mt-4 shadow-xl shadow-emerald-100 hover:bg-primary-hover hover:-translate-y-1 transition-all uppercase tracking-[0.2em]">
          Create Account
        </button>
      </form>

      <p className="text-center mt-8 text-xs font-bold text-teks-samping uppercase tracking-widest">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Login Sekarang
        </Link>
      </p>
    </div>
  );
}
