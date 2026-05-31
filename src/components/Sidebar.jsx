import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdShoppingCart,
  MdLocalPharmacy,
  MdInventory2,
  MdAssessment,
  MdInventory,
  MdBusiness,
  MdPeople,
  MdSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

export default function Sidebar() {
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState({
    purchase: false,
    dispenser: false,
    product: location.pathname.includes("product"),
    reports: false,
    stock: location.pathname.includes("stock"),
    manufacturer: location.pathname.includes("manufacturer"),
    employee: location.pathname.includes("employee"),
  });

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col select-none overflow-y-auto font-sans">
      {/* Navigation Menu List */}
      <div className="px-4 py-4 flex flex-col gap-1">
        <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase px-4 mb-2 block">
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

        {/* 2. PURCHASE */}
        <div>
          <button
            onClick={() => toggleDropdown("purchase")}
            className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold text-gray-400 hover:bg-gray-50 uppercase tracking-wider rounded-2xl"
          >
            <div className="flex items-center gap-4">
              <MdShoppingCart size={20} />
              <span>Purchase</span>
            </div>
            {openDropdown.purchase ? (
              <MdKeyboardArrowUp size={18} />
            ) : (
              <MdKeyboardArrowDown size={18} />
            )}
          </button>
        </div>

        {/* 3. DISPENSER */}
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

        {/* 4. PRODUCT */}
        <div>
          <button
            onClick={() => toggleDropdown("product")}
            className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl ${location.pathname.includes("product") ? "text-gray-500 bg-gray-50/50" : "text-gray-400 hover:bg-gray-50"}`}
          >
            <div className="flex items-center gap-4">
              <MdInventory2 size={20} />
              <span>Product</span>
            </div>
            {openDropdown.product ? (
              <MdKeyboardArrowUp size={18} />
            ) : (
              <MdKeyboardArrowDown size={18} />
            )}
          </button>
          {openDropdown.product && (
            <div className="pl-12 pr-2 py-1 flex flex-col gap-0.5">
              <Link
                to="/product/list"
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/product/list" ? "text-[#5065f6]" : "text-gray-300"}`}
              >
                <span className="text-[8px]">●</span> Product List
              </Link>
              <Link
                to="/error"
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/product/package" ? "text-[#5065f6]" : "text-gray-300 hover:text-red-400 transition-colors"}`}
              >
                <span className="text-[8px]">●</span> Product Package
              </Link>
              <Link
                to="/error"
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/product/damage" ? "text-[#5065f6]" : "text-gray-300 hover:text-red-400 transition-colors"}`}
              >
                <span className="text-[8px]">●</span> Product Damage
              </Link>
            </div>
          )}
        </div>

        {/* 5. REPORTS */}
        <div>
          <button
            onClick={() => toggleDropdown("reports")}
            className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold text-gray-400 hover:bg-gray-50 uppercase tracking-wider rounded-2xl"
          >
            <div className="flex items-center gap-4">
              <MdAssessment size={20} />
              <span>Reports</span>
            </div>
            {openDropdown.reports ? (
              <MdKeyboardArrowUp size={18} />
            ) : (
              <MdKeyboardArrowDown size={18} />
            )}
          </button>
        </div>

        {/* 6. STOCK */}
        <div>
          <button
            onClick={() => toggleDropdown("stock")}
            className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl ${location.pathname.includes("stock") ? "text-gray-500 bg-gray-50/50" : "text-gray-400 hover:bg-gray-50"}`}
          >
            <div className="flex items-center gap-4">
              <MdInventory size={20} />
              <span>Stock</span>
            </div>
            {openDropdown.stock ? (
              <MdKeyboardArrowUp size={18} />
            ) : (
              <MdKeyboardArrowDown size={18} />
            )}
          </button>

          {openDropdown.stock && (
            <div className="pl-12 pr-2 py-1 flex flex-col gap-0.5">
              {/* Menu ini tidak di-error-kan lagi, diarahkan ke file Stock.jsx kamu */}
              <Link
                to="/stock"
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/stock" ? "text-[#5065f6]" : "text-gray-300 hover:text-[#5065f6] transition-colors"}`}
              >
                <span className="text-[8px]">●</span> Stock Report
              </Link>

              {/* Menu yang ini tetap di-error-kan */}
              <Link
                to="/error"
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/stock/batch" ? "text-[#5065f6]" : "text-gray-300 hover:text-red-400 transition-colors"}`}
              >
                <span className="text-[8px]">●</span> Stock Report (Batch)
              </Link>
            </div>
          )}
        </div>

        {/* 7. MANUFACTURER */}
        <div>
          <button
            onClick={() => toggleDropdown("manufacturer")}
            className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl ${location.pathname.includes("manufacturer") ? "text-white bg-[#5065f6] shadow-md shadow-blue-100" : "text-gray-400 hover:bg-gray-50"}`}
          >
            <div className="flex items-center gap-4">
              <MdBusiness size={20} />
              <span>Manufacturer</span>
            </div>
            {openDropdown.manufacturer ? (
              <MdKeyboardArrowUp size={18} />
            ) : (
              <MdKeyboardArrowDown size={18} />
            )}
          </button>
          {openDropdown.manufacturer && (
            <div className="pl-12 pr-2 py-2 flex flex-col gap-0.5 bg-[#F8F9FB] rounded-xl mt-1">
              <Link
                to="/manufacturer/list"
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/manufacturer/list" ? "text-[#5065f6]" : "text-gray-400"}`}
              >
                <span className="text-[6px]">●</span> Manufacturer List
              </Link>
              <Link
                to="/manufacturer/ledger"
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/manufacturer/ledger" ? "text-[#5065f6]" : "text-gray-400"}`}
              >
                <span className="text-[6px]">●</span> Manufacturer Ledger
              </Link>
            </div>
          )}
        </div>

        {/* 8. EMPLOYEE */}
        <div>
          <button
            onClick={() => toggleDropdown("employee")}
            className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl ${location.pathname.includes("employee") ? "text-gray-500 bg-gray-50/50" : "text-gray-400 hover:bg-gray-50"}`}
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
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/employee/list" ? "text-[#5065f6]" : "text-gray-300"}`}
              >
                <span className="text-[8px]">●</span> Employee List
              </Link>
              <Link
                to="/error"
                className={`py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 ${location.pathname === "/employee/attendance" ? "text-[#5065f6]" : "text-gray-300 hover:text-red-400 transition-colors"}`}
              >
                <span className="text-[8px]">●</span> Attendance
              </Link>
            </div>
          )}
        </div>

        {/* 9. SETTINGS */}
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
