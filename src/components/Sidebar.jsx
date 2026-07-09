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
} from "react-icons/md";

export default function Sidebar() {
  const location = useLocation();

  // Hanya menyisakan dropdown Employee karena memiliki 2 modul aktif
  const [openDropdown, setOpenDropdown] = useState({
    employee: location.pathname.includes("employee"),
  });

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col select-none overflow-y-auto font-sans">
      {/* Navigation Menu List */}
      <div className="px-4 py-4 flex flex-col gap-1">
        <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase px-4 mb-2 block text-left">
          Main Menu
        </span>

        {/* 1. DASHBOARD */}
        <Link
          to="/dashboard"
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
          className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
            location.pathname === "/stock"
              ? "bg-[#EEF0FF] text-[#5065f6]"
              : "text-gray-400 hover:bg-gray-50"
          }`}
        >
          <MdInventory size={20} />
          <span>Stock</span>
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
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${
                  location.pathname === "/employee/list" ? "text-[#5065f6]" : "text-gray-300"
                }`}
              >
                <span className="text-[8px]">●</span> Employee List
              </Link>
              <Link
                to="/employee/attendance"
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
          className="flex items-center gap-4 px-4 py-3.5 text-xs font-bold text-gray-400 hover:bg-gray-50 uppercase tracking-wider rounded-2xl"
        >
          <MdSettings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}