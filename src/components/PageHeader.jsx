import React from "react";
import { MdSearch, MdNotificationsNone, MdPerson } from "react-icons/md";

export default function Header({ title, breadcrumb, onSearch, children }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-garis rounded-[2.5rem] p-4 mb-10 shadow-sm flex items-center justify-between sticky top-4 z-[100]">
      {/* KIRI: Judul & Breadcrumb (Dari PageHeader) */}
      <div className="pl-6 flex items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-teks tracking-tighter uppercase leading-none">
            {title}
          </h2>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">
            Home <span className="text-teks-samping mx-1 opacity-50">/</span>{" "}
            {breadcrumb}
          </p>
        </div>

        {/* Divider Vertical */}
        <div className="h-10 w-[1px] bg-garis hidden md:block" />

        {/* Search Bar Global */}
        <div className="relative group">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-teks-samping text-lg group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Cari data..."
            // SETIAP KALI USER MENGETIK, KIRIM NILAINYA KE PARENT
            onChange={(e) => onSearch(e.target.value)} 
            className="w-40 md:w-64 pl-10 pr-4 py-3 bg-latar/50 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary transition-all text-xs font-bold shadow-sm"
          />
        </div>
      </div>

      {/* KANAN: Action Buttons & Profile */}
      <div className="flex items-center gap-3 pr-2">
        {/* Tombol Tambah (Children) dikirim ke sini */}
        <div className="hidden md:flex gap-2 mr-2">{children}</div>

        {/* Notifikasi */}
        <button className="w-11 h-11 flex items-center justify-center bg-latar rounded-2xl text-teks hover:bg-primary/10 hover:text-primary transition-all relative">
          <MdNotificationsNone size={22} />
          <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 p-1.5 pl-4 bg-latar rounded-2xl border border-transparent hover:border-primary transition-all cursor-pointer group">
          <span className="text-xs font-black text-teks hidden sm:block">
            Admin QWU
          </span>
          <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
            <MdPerson size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
