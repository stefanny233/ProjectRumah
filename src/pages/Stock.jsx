import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  MdInventory,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdLayers,
  MdArrowForwardIos,
} from "react-icons/md";

// --- IMPORT DATA DARI JSON ---
import dataApotek from "../data/dataApotek.json";

export default function Stock() {
  // --- STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState("");
  const { inventory } = dataApotek;

  // --- LOGIC SEARCH & FILTER ---
  const filteredInventory = inventory.filter((item) => {
    const _searchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(_searchTerm) ||
      item.id.toLowerCase().includes(_searchTerm) ||
      item.category.toLowerCase().includes(_searchTerm)
    );
  });

  // --- LOGIC STATS (Dinamis) ---
  const lowStockCount = inventory.filter(
    (i) => i.status === "Low Stock",
  ).length;
  const outOfStockCount = inventory.filter(
    (i) => i.status === "Out of Stock",
  ).length;

  // Helper styling status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Safe":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Low Stock":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "Out of Stock":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* HEADER SECTION */}
      <PageHeader
        title="Inventory Stock"
        breadcrumb="Stock"
        onSearch={setSearchTerm} // Menghubungkan fitur search
      >
        <div className="bg-white p-3 rounded-2xl border border-garis flex items-center gap-3 px-6 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-teks uppercase italic tracking-widest">
            Live Monitoring
          </span>
        </div>
      </PageHeader>

      {/* STATS MINI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-7 rounded-[2.5rem] border border-garis flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-latar rounded-2xl flex items-center justify-center text-primary text-2xl shadow-inner">
            <MdLayers />
          </div>
          <div>
            <p className="text-[10px] font-black text-teks-samping uppercase tracking-widest">
              Total Items
            </p>
            <h3 className="text-2xl font-black text-teks italic tracking-tighter">
              {inventory.length}{" "}
              <span className="text-sm font-bold text-teks-samping not-italic uppercase ml-1">
                Kategori
              </span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[2.5rem] border border-garis flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 text-2xl shadow-inner border border-orange-100">
            <MdWarning />
          </div>
          <div>
            <p className="text-[10px] font-black text-teks-samping uppercase tracking-widest">
              Low Stock
            </p>
            <h3 className="text-2xl font-black text-teks italic tracking-tighter">
              {lowStockCount}{" "}
              <span className="text-sm font-bold text-teks-samping not-italic uppercase ml-1">
                Produk
              </span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[2.5rem] border border-garis flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 text-2xl shadow-inner border border-red-100">
            <MdError />
          </div>
          <div>
            <p className="text-[10px] font-black text-teks-samping uppercase tracking-widest">
              Empty Stock
            </p>
            <h3 className="text-2xl font-black text-teks italic tracking-tighter">
              {outOfStockCount}{" "}
              <span className="text-sm font-bold text-teks-samping not-italic uppercase ml-1">
                Produk
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* INVENTORY TABLE CARD */}
      <div className="bg-white rounded-[3rem] border border-garis shadow-sm overflow-hidden">
        <div className="p-8 border-b border-garis flex justify-between items-center bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <MdInventory size={20} />
            </div>
            <h3 className="font-black italic text-xl uppercase tracking-tighter text-teks">
              Stock Movement
            </h3>
          </div>
          <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">
            Lihat Semua History
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-latar/50 text-[10px] font-black text-teks-samping uppercase tracking-[0.2em]">
                <th className="p-6 pl-10 border-b border-garis">
                  Product Details
                </th>
                <th className="p-6 border-b border-garis">Quantity</th>
                <th className="p-6 border-b border-garis">Category</th>
                <th className="p-6 border-b border-garis text-center">
                  Security Status
                </th>
                <th className="p-6 pr-10 border-b border-garis text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-garis">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-latar/30 transition-all"
                  >
                    <td className="p-6 pl-10">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-teks group-hover:text-primary transition-colors tracking-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-teks-samping font-black uppercase tracking-[0.15em] opacity-60">
                          ID: {item.id}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-teks tracking-tighter">
                          {item.qty}
                        </span>
                        <span className="text-[10px] font-black text-teks-samping uppercase tracking-widest">
                          {item.unit}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-[10px] font-black text-teks-samping bg-latar px-4 py-2 rounded-xl uppercase tracking-widest border border-garis/50">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex justify-center">
                        <span
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${getStatusStyle(item.status)}`}
                        >
                          {item.status === "Safe" && (
                            <MdCheckCircle
                              size={14}
                              className="animate-in zoom-in duration-300"
                            />
                          )}
                          {item.status === "Low Stock" && (
                            <MdWarning size={14} className="animate-bounce" />
                          )}
                          {item.status === "Out of Stock" && (
                            <MdError size={14} className="animate-pulse" />
                          )}
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 pr-10 text-right">
                      <button className="w-12 h-12 bg-latar rounded-2xl inline-flex items-center justify-center text-teks-samping group-hover:bg-primary group-hover:text-white group-hover:rotate-90 transition-all duration-500 shadow-sm border border-garis group-hover:border-primary">
                        <MdArrowForwardIos size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-20 text-center text-teks-samping font-black italic uppercase tracking-[0.2em]"
                  >
                    Item "{searchTerm}" Tidak Ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
