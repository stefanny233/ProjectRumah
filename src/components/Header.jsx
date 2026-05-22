import React from "react";
import {
  MdOutlineHelpOutline,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import {
  HiOutlineHome,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { PiPlantLight } from "react-icons/pi";

export default function Header() {
  const navItems = [
    { name: "Home", icon: <HiOutlineHome /> },
    { name: "Explore", icon: <HiOutlineLocationMarker /> },
    { name: "My Eccounts", icon: <PiPlantLight /> },
    { name: "Eccountants", icon: <HiOutlineUserGroup /> },
    { name: "Stakeholders", icon: <HiOutlineUserGroup /> },
  ];

  return (
    <header className="w-full h-20 bg-white flex justify-between items-center px-10 border-b border-gray-100">
      {/* KIRI: Kosong agar Navigasi Tengah tetap di posisi Figma */}
      <div className="flex-1 invisible md:visible"></div>

      {/* TENGAH: Navigasi Horizontal */}
      <nav className="flex items-center gap-10">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 cursor-pointer group transition-all"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="text-[13px] font-semibold tracking-tight">
              {item.name}
            </span>
          </div>
        ))}
      </nav>

      {/* KANAN: User Profile & Help */}
      <div className="flex-1 flex justify-end items-center gap-6">
        <MdOutlineHelpOutline className="text-2xl text-gray-400 cursor-pointer hover:text-gray-600" />
        <MdOutlineNotificationsNone className="text-2xl text-gray-400 cursor-pointer hover:text-gray-600" />
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm cursor-pointer">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=random"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
