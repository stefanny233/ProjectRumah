import React from 'react';
import { Link } from 'react-router-dom';
import { MdMailOutline, MdArrowBack } from 'react-icons/md';

export default function Forgot() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-teks uppercase italic tracking-tighter">Forgot Password</h2>
        <p className="text-sm text-teks-samping font-medium">Masukkan email untuk reset password</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="ml-2 text-[10px] font-black uppercase text-teks-samping tracking-widest">Registered Email</label>
          <div className="relative group">
            <MdMailOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-teks-samping group-focus-within:text-primary transition-colors" />
            <input type="email" className="w-full pl-14 pr-7 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold transition-all text-sm" placeholder="email@qwu.com" />
          </div>
        </div>

        <button className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-emerald-100 hover:bg-primary-hover transition-all uppercase tracking-[0.2em]">
          Send Reset Link
        </button>
      </form>

      <Link to="/login" className="flex items-center justify-center mt-8 text-xs font-black text-primary uppercase tracking-widest gap-2 hover:gap-4 transition-all">
        <MdArrowBack size={18} /> Kembali ke Login
      </Link>
    </div>
  );
}