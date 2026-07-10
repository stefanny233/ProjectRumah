import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdLocalPharmacy,
  MdInventory2,
  MdInventory,
  MdPeople,
  MdSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClose
} from "react-icons/md";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  // Hanya menyisakan dropdown Employee karena memiliki 2 modul aktif
  const [openDropdown, setOpenDropdown] = useState({
    employee: location.pathname.includes("employee"),
  });

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <>
      {/* OVERLAY BACKDROP: Hanya muncul di HP/Tablet ketika sidebar aktif */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* CONTAINER ASIDE: Bergeser secara dinamis di layar kecil dan permanen di md/desktop */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col select-none overflow-y-auto font-sans transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER MINI & BUTTON CLOSE: Hanya tampil di HP/Tablet */}
        <div className="flex md:hidden justify-between items-center px-6 pt-5 pb-2">
          <span className="text-[10px] font-extrabold text-[#5065f6] tracking-widest uppercase">SIAPOTEK MENU</span>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-650 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Navigation Menu List */}
        <div className="px-4 py-4 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase px-4 mb-2 block text-left">
            Main Menu
          </span>

          {/* 1. DASHBOARD */}
          <Link
            to="/dashboard"
            onClick={onClose} // Tutup sidebar otomatis setelah link diklik di HP
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
              location.pathname === "/dashboard"
                ? "bg-[#EEF0FF] text-[#5065f6]"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <MdDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          {/* 2. DISPENSER (POS) */}
          <Link
            to="/dispenser"
            onClick={onClose}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
              location.pathname === "/dispenser"
                ? "bg-[#EEF0FF] text-[#5065f6]"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <MdLocalPharmacy size={20} />
            <span>Dispenser</span>
          </Link>

          {/* 3. PRODUCT (Direct Link) */}
          <Link
            to="/product/list"
            onClick={onClose}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
              location.pathname.includes("product")
                ? "bg-[#EEF0FF] text-[#5065f6]"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <MdInventory2 size={20} />
            <span>Product</span>
          </Link>

          {/* 4. STOCK (Direct Link) */}
          <Link
            to="/stock"
            onClick={onClose}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
              location.pathname === "/stock"
                ? "bg-[#EEF0FF] text-[#5065f6]"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <MdInventory size={20} />
            <span>Stock</span>
          </Link>

          {/* 4.5 MEMBER LIST (NEW) */}
          <Link
            to="/member-list"
            onClick={onClose}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
              location.pathname === "/member-list"
                ? "bg-[#EEF0FF] text-[#5065f6]"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <MdPeople size={20} />
            <span>Member Points</span>
          </Link>

          {/* 5. EMPLOYEE (Dropdown Toggle) */}
          <div>
            <button
              onClick={() => toggleDropdown("employee")}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl cursor-pointer ${
                location.pathname.includes("employee")
                  ? "text-gray-500 bg-gray-50/50"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <MdPeople size={20} />
                <span>Employee</span>
              </div>
              {openDropdown.employee ? (
                <MdKeyboardArrowUp size={18} />
              ) : (
                <MdKeyboardArrowDown size={18} />
              )}
            </button>
            {openDropdown.employee && (
              <div className="pl-12 pr-2 py-1 flex flex-col gap-0.5">
                <Link
                  to="/employee/list"
                  onClick={onClose}
                  className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${
                    location.pathname === "/employee/list" ? "text-[#5065f6]" : "text-gray-300"
                  }`}
                >
                  <span className="text-[8px]">●</span> Employee List
                </Link>
                <Link
                  to="/employee/attendance"
                  onClick={onClose}
                  className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${
                    location.pathname === "/employee/attendance" ? "text-[#5065f6]" : "text-gray-300 hover:text-[#5065f6] transition-colors"
                  }`}
                >
                  <span className="text-[8px]">●</span> Attendance
                </Link>
              </div>
            )}
          </div>

          {/* 6. SETTINGS */}
          <Link
            to="/settings"
            onClick={onClose}
            className="flex items-center gap-4 px-4 py-3.5 text-xs font-bold text-gray-400 hover:bg-gray-50 uppercase tracking-wider rounded-2xl"
          >
            <MdSettings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}