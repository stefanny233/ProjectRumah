import React, { useState, useRef, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import {
  MdInventory,
  MdWarning,
  MdError,
  MdLayers,
  MdArrowForwardIos,
  MdCheckCircle,
  MdFilterList,
  MdFileDownload,
  MdKeyboardArrowDown,
} from "react-icons/md";

// --- DATA JSON ---
import dataApotek from "../data/dataApotek.json";

export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { inventory } = dataApotek;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- LOGIC SEARCH & FILTER ---
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All Categories" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = inventory.filter((i) => i.status === "Low Stock").length;
  const outOfStockCount = inventory.filter((i) => i.status === "Out of Stock").length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Safe": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Low Stock": return "bg-orange-50 text-orange-600 border-orange-100";
      case "Out of Stock": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* 1. HEADER SECTION */}
      <PageHeader title="Inventory Stock" breadcrumb="Management">
        <div className="flex items-center gap-3">
          {/* DROPDOWN EXPORT */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="bg-white border-2 border-gray-100 text-gray-600 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm active:scale-95"
            >
              <MdFileDownload size={18} className="text-emerald-500" /> 
              Export Data
              <MdKeyboardArrowDown size={18} className={`transition-transform duration-300 ${isExportOpen ? 'rotate-180' : ''}`} />
            </button>

            {isExportOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[100] animate-in zoom-in-95 duration-200">
                <button className="w-full px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Stock Report
                </button>
                <button className="w-full px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center gap-3 border-t border-gray-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Stock Report (Batch)
                </button>
              </div>
            )}
          </div>

          <div className="bg-emerald-500/5 p-3 rounded-2xl border border-emerald-500/10 flex items-center gap-3 px-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
              Live Monitoring
            </span>
          </div>
        </div>
      </PageHeader>

      {/* 2. STATS MINI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-6">
        <StatCard icon={<MdLayers />} label="Total Items" value={inventory.length} unit="Kategori" color="primary" />
        <StatCard icon={<MdWarning />} label="Low Stock" value={lowStockCount} unit="Produk" color="orange" />
        <StatCard icon={<MdError />} label="Empty Stock" value={outOfStockCount} unit="Produk" color="red" />
      </div>

      {/* 3. FILTER & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <MdFilterList className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search product name or ID..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border-2 border-transparent rounded-[1.5rem] shadow-sm focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-sm font-bold text-gray-700"
          />
        </div>
        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-white border-2 border-transparent px-8 py-4 rounded-[1.5rem] shadow-sm outline-none text-sm font-black text-gray-600 cursor-pointer focus:border-emerald-500/20"
        >
          <option>All Categories</option>
          <option>Obat Bebas</option>
          <option>Obat Keras</option>
          <option>Alat Kesehatan</option>
        </select>
      </div>

      {/* 4. TABLE */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
              <MdInventory size={24} />
            </div>
            <div>
              <h3 className="font-black text-xl uppercase tracking-tighter text-gray-800">Stock Movement</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Latest Inventory Updates</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="p-7 pl-10">Product Details</th>
                <th className="p-7">Quantity</th>
                <th className="p-7">Category</th>
                <th className="p-7 text-center">Status Security</th>
                <th className="p-7 pr-10 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInventory.map((item, i) => (
                <tr key={i} className="group hover:bg-gray-50/80 transition-all">
                  <td className="p-7 pl-10">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-gray-800 group-hover:text-emerald-600 transition-colors tracking-tight">{item.name}</span>
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">SKU-{item.id}</span>
                    </div>
                  </td>
                  <td className="p-7">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-gray-800 tracking-tighter">{item.qty}</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase">{item.unit}</span>
                    </div>
                  </td>
                  <td className="p-7">
                    <span className="text-[10px] font-black text-gray-500 bg-gray-100 px-4 py-2 rounded-xl uppercase tracking-widest border border-gray-200/50">{item.category}</span>
                  </td>
                  <td className="p-7">
                    <div className="flex justify-center">
                      <span className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                        {item.status === "Safe" && <MdCheckCircle size={14} />}
                        {item.status === "Low Stock" && <MdWarning size={14} className="animate-bounce" />}
                        {item.status === "Out of Stock" && <MdError size={14} className="animate-pulse" />}
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-7 pr-10 text-right">
                    <button className="w-12 h-12 bg-white border border-gray-100 rounded-2xl inline-flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <MdArrowForwardIos size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, unit, color }) {
  const colors = {
    primary: "bg-emerald-50 text-emerald-500 border-emerald-100",
    orange: "bg-orange-50 text-orange-500 border-orange-100",
    red: "bg-red-50 text-red-500 border-red-100",
  };
  return (
    <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner border ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">{label}</p>
        <h3 className="text-2xl font-black text-gray-800 italic tracking-tighter">{value} <span className="text-sm font-bold text-gray-300 not-italic uppercase ml-1">{unit}</span></h3>
      </div>
    </div>
  );
}