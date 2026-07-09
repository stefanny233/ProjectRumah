import React, { useState } from "react";
import { 
  MdHome, 
  MdPlace, 
  MdAccountBalanceWallet, 
  MdGroup, 
  MdHandshake, 
  MdOutlineHelpOutline,
  MdMoreVert
} from "react-icons/md"; 

// Import foto profil cadangan
import fotoStefanny from "../assets/profile.jpg";

export default function Header() {
  // State untuk mendeteksi apakah gambar gagal dimuat mase
  const [imgError, setImgError] = useState(false);

  // Membaca nama dan peran secara dinamis dari localStorage
  const storedName = localStorage.getItem("userName") || "Admin Apotek";
  const storedRole = localStorage.getItem("userRole") || "System Administrator";

  const user = {
    name: storedName.toUpperCase(),
    role: storedRole.toLowerCase() === "admin" ? "System Administrator" : storedRole.toUpperCase(),
    avatarUrl: fotoStefanny 
  };

  // Fungsi pemotong inisial nama (jika nama terisi, ambil 2 huruf depan)
  const getInitial = (name) => {
    if (!name) return "AD";
    const cleanName = name.replace(/[^a-zA-Z ]/g, "").trim();
    const parts = cleanName.split(" ");
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return cleanName.substring(0, 2).toUpperCase();
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
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group cursor-pointer">
          <MdHome size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>Home</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group cursor-pointer">
          <MdPlace size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>Explore</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group cursor-pointer">
          <MdAccountBalanceWallet size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>My Accounts</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group cursor-pointer">
          <MdGroup size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>Eccountants</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#5065f6] transition-colors group cursor-pointer">
          <MdHandshake size={18} className="text-slate-400 group-hover:text-[#5065f6] transition-colors" />
          <span>Stakeholders</span>
        </button>
      </nav>

      {/* KANAN: Card Avatar User & Tombol Help */}
      <div className="flex items-center gap-5">
        
        <button className="p-1 text-slate-500 hover:text-[#5065f6] transition-colors cursor-pointer">
          <MdOutlineHelpOutline size={22} />
        </button>

        {/* CARD AVATAR PREMIUM GELAP APOTEK */}
        <div className="bg-[#153421] text-white px-4 py-2 rounded-2xl flex items-center gap-3 shadow-md border border-[#1d422b]">
          
          {/* Box Lingkaran Gambar / Fallback Inisial Hijau Emas */}
          <div className="relative w-9 h-9 rounded-xl bg-[#1d422b] text-amber-400 border border-amber-500/25 flex items-center justify-center font-bold text-xs tracking-wider shadow-inner overflow-hidden">
            {user.avatarUrl && !imgError ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-xl"
                onError={() => setImgError(true)} // Jika gagal load, langsung set error agar inisial teks muncul
              />
            ) : (
              <span>{getInitial(user.name)}</span>
            )}
          </div>

          {/* Info Nama & Jabatan Dinamis */}
          <div className="flex flex-col text-left pr-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-white leading-tight">
              {user.name}
            </span>
            <span className="text-[9px] text-gray-400 font-medium tracking-wide">
              {user.role}
            </span>
          </div>

          <button className="text-gray-400 hover:text-white transition-colors ml-1 cursor-pointer">
            <MdMoreVert size={16} />
          </button>
          
        </div>

      </div>

    </header>
  );
}