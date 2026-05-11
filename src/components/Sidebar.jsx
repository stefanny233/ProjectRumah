import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdInventory,
  MdMedication,
  MdExpandMore,
} from "react-icons/md";

export default function Sidebar() {
  const location = useLocation();

  // Logic: Dropdown otomatis terbuka kalau URL mengandung kata "/product"
  const [isProductOpen, setIsProductOpen] = useState(
    location.pathname.includes("/product"),
  );
  const [isStockOpen, setIsStockOpen] = useState(
    location.pathname.includes("/stock"),
  );

  // Efek ini menjaga dropdown tetap terbuka kalau user akses URL langsung
  useEffect(() => {
    if (location.pathname.includes("/product")) {
      setIsProductOpen(true);
      if (location.pathname.includes("/stock")) setIsStockOpen(true);
    }
  }, [location.pathname]);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "Employee", path: "/employee", icon: <MdPeople /> },
  ];

  const productSubMenu = [
    { name: "Product List", path: "/product/list" },
    { name: "Product Package", path: "/product/category" },
    { name: "Product Damage", path: "/product/brand" },
  ];
  const stockSubMenu = [
    { name: "Stock Report", path: "/stock" },
    { name: "Stock Report (Batch)", path: "/stock/report-batch" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col min-h-screen sticky top-0">
      {/* LOGO */}
      <div className="p-8">
        <h1 className="text-3xl font-black text-emerald-600 tracking-tighter uppercase italic">
          Apotek <span className="text-gray-800">QWU</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 ml-4">
          Main Menu
        </p>

        {/* MENU UTAMA (Dashboard & Employee) */}
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-5 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-emerald-50 text-emerald-600 font-bold shadow-sm"
                  : "text-gray-400 hover:bg-gray-50 hover:text-emerald-600"
              }`
            }
          >
            <span className="text-2xl mr-4">{item.icon}</span>
            <span className="text-sm font-bold uppercase tracking-tight">
              {item.name}
            </span>
          </NavLink>
        ))}

        {/* --- DROPDOWN STOCK --- */}
        <div className="flex flex-col">
          <button
            onClick={() => setIsStockOpen(!isStockOpen)}
            className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
              location.pathname.includes("/stock")
                ? "bg-emerald-50 text-emerald-600 font-bold"
                : "text-gray-400 hover:bg-gray-50 hover:text-emerald-600"
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4">
                <MdInventory />
              </span>
              <span className="text-sm font-bold uppercase tracking-tight">
                Stock
              </span>
            </div>
            <MdExpandMore
              className={`text-2xl transition-transform duration-300 ${isStockOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isStockOpen ? "max-h-60 mt-2 opacity-100" : "max-h-0 opacity-0"}`}
          >
            {stockSubMenu.map((sub) => (
              <NavLink
                key={sub.path}
                to={sub.path}
                className={({ isActive }) =>
                  `flex items-center pl-14 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? "text-emerald-600 italic scale-105"
                      : "text-gray-300 hover:text-emerald-600"
                  }`
                }
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mr-3 transition-all ${location.pathname === sub.path ? "bg-emerald-600 scale-125 shadow-lg" : "bg-gray-200"}`}
                />
                {sub.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* --- DROPDOWN PRODUCT --- */}
        <div className="flex flex-col">
          <button
            onClick={() => setIsProductOpen(!isProductOpen)}
            className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
              location.pathname.includes("/product")
                ? "bg-emerald-50 text-emerald-600 font-bold"
                : "text-gray-400 hover:bg-gray-50 hover:text-emerald-600"
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4">
                <MdMedication />
              </span>
              <span className="text-sm font-bold uppercase tracking-tight">
                Product
              </span>
            </div>
            <MdExpandMore
              className={`text-2xl transition-transform duration-300 ${isProductOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isProductOpen ? "max-h-60 mt-2 opacity-100" : "max-h-0 opacity-0"}`}
          >
            {productSubMenu.map((sub) => (
              <NavLink
                key={sub.path}
                to={sub.path}
                className={({ isActive }) =>
                  `flex items-center pl-14 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? "text-emerald-600 italic scale-105"
                      : "text-gray-300 hover:text-emerald-600"
                  }`
                }
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mr-3 transition-all ${location.pathname === sub.path ? "bg-emerald-600 scale-125 shadow-lg" : "bg-gray-200"}`}
                />
                {sub.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* FOOTER VERSION */}
      <div className="p-8 border-t border-gray-100">
        <div className="bg-gray-50 p-4 rounded-2xl">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
            Apotek System
          </p>
          <p className="text-xs font-bold text-emerald-600">v1.0.4-Stable</p>
        </div>
      </div>
    </aside>
  );
}
