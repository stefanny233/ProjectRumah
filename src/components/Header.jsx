import React from "react";
import { 
  MdHome, 
  MdPlace, 
  MdAccountBalanceWallet, 
  MdGroup, 
  MdHandshake, 
  MdOutlineHelpOutline,
  MdMoreVert
} from "react-icons/md"; 

// 1. IMPORT FOTO PROFIL KAMU DARI FOLDER ASSETS MASE
import fotoStefanny from "../assets/profile.jpg";

export default function Header() {
  // Data profil Stefanny
  const user = {
    name: "STEFANNY",
    role: "System Administrator",
    // 2. MASUKKAN VARIABEL FOTO YANG SUDAH DI-IMPORT TADI DI SINI
    avatarUrl: fotoStefanny 
  };

  // Fungsi otomatis untuk mengambil inisial jika foto bermasalah / tidak ada
  const getInitial = (name) => {
    if (!name) return "ST";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-20 bg-[#F8F9FB]/80 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-8 sticky top-0 z-30 select-none">
      
      {/* KIRI: Logo Dua Daun Hijau Gelap dalam Kotak */}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-[#153421] rounded-xl flex items-center justify-center shadow-sm">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 21C2 11.5 9.5 4 19 4M19 4C19 9 14.5 16.5 7 20M19 4L7 20" stroke="#EBF7EE" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7 20C4.5 16.5 4 13 5 10" stroke="#EBF7EE" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* TENGAH: Menu Navigasi Utama */}
      <nav className="flex items-center gap-8 text-sm font-medium text-slate-800">
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group">
          <MdHome size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>Home</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group">
          <MdPlace size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>Explore</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group">
          <MdAccountBalanceWallet size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>My Accounts</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group">
          <MdGroup size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>Eccountants</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group">
          <MdHandshake size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>Stakeholders</span>
        </button>
      </nav>

      {/* KANAN: Card Avatar Stefanny & Tombol Help */}
      <div className="flex items-center gap-5">
        
        <button className="p-1 text-slate-500 hover:text-[#5065f6] transition-colors">
          <MdOutlineHelpOutline size={22} />
        </button>

        {/* CARD AVATAR PREMIUM GELAP */}
        <div className="bg-[#153421] text-white px-4 py-2 rounded-2xl flex items-center gap-3 shadow-md border border-[#1d422b]">
          
          {/* Box Lingkaran Gambar / Inisial */}
          <div className="relative w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-xs tracking-wider shadow-inner text-purple-100 overflow-hidden">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-xl"
                // Jika gambar gagal di-load (salah path/format), otomatis fallback ke text inisial mase
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <span>{getInitial(user.name)}</span>
            )}
          </div>

          {/* Info Nama & Jabatan Stefanny */}
          <div className="flex flex-col text-left pr-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-white leading-tight">
              {user.name}
            </span>
            <span className="text-[9px] text-gray-400 font-medium tracking-wide">
              {user.role}
            </span>
          </div>

          <button className="text-gray-400 hover:text-white transition-colors ml-1">
            <MdMoreVert size={16} />
          </button>
          
        </div>

      </div>

    </header>
  );
}