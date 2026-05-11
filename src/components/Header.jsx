// src/components/Header.jsx
import React from "react";
import { MdNotificationsNone, MdSearch } from "react-icons/md";

export default function Header() {
  return (
    <header className="w-full py-4 px-8 bg-white/50 backdrop-blur-md flex justify-between items-center border-b border-gray-50">
      {/* Search Global */}
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-xs outline-none w-64" />
      </div>

      {/* User Profile & Notif */}
      <div className="flex items-center gap-4">
        <MdNotificationsNone className="text-gray-500 text-xl cursor-pointer" />
        <div className="flex items-center gap-3 border-l pl-4">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-800">Admin Ganteng</p>
            <p className="text-[10px] text-emerald-500 font-bold uppercase">Manager</p>
          </div>
          <img src="https://ui-avatars.com/api/?name=Admin" className="w-8 h-8 rounded-lg" alt="profile" />
        </div>
      </div>
    </header>
  );
}