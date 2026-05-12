import React from "react";
import { MdOutlineHelpOutline, MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineHome, HiOutlineLocationMarker, HiOutlineUserGroup } from "react-icons/hi";
import { PiPlantLight } from "react-icons/pi";

export default function Header() {
  const navItems = [
    { name: "Home", icon: <HiOutlineHome /> },
    { name: "Explore", icon: <HiOutlineLocationMarker /> },
    { name: "My Eccounts", icon: <PiPlantLight /> }, // Menggunakan icon tumbuhan sesuai logo figma
    { name: "Eccountants", icon: <HiOutlineUserGroup /> },
    { name: "Stakeholders", icon: <HiOutlineUserGroup /> },
  ];

  return (
    <header className="w-full py-4 px-8 bg-white flex justify-between items-center border-b border-gray-100">
      {/* Kiri: Kosong atau Logo kecil jika perlu */}
      <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center text-white text-xl">
         <PiPlantLight />
      </div>

      {/* Tengah: Navigasi Menu (Sesuai Figma) */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors">
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </nav>

      {/* Kanan: Icons */}
      <div className="flex items-center gap-4 text-gray-600">
        <MdOutlineAccountCircle className="text-2xl cursor-pointer" />
        <MdOutlineHelpOutline className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
}