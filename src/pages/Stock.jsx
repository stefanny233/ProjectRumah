import React, { useState } from "react";
import {
  MdSearch,
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineFileDownload,
} from "react-icons/md";

// Membaca data asli dari JSON kamu
import dataApotek from "../data/dataApotek.json";

export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const { inventory } = dataApotek;

  // Filter pencarian berdasarkan nama obat asli dari JSON
  const filteredData = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="p-8 bg-[#F8F9FB] min-h-screen"
      style={{ fontFamily: "'TT Commons', sans-serif" }}
    >
      {/* 1. TITLE SECTION */}
      <div className="mb-6">
        <h1 className="text-[32px] font-normal text-gray-900 tracking-tight">
          Stock Report
        </h1>
      </div>

      {/* 2. SEARCH SECTION */}
      <div className="mb-6">
        <p className="text-[14px] text-gray-400 mb-2 font-normal">Search</p>
        <div className="flex gap-3 items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-5 pr-12 py-3 bg-white border-none rounded-xl text-[14px] font-normal text-gray-600 shadow-sm focus:ring-1 focus:ring-blue-500/20 outline-none placeholder:text-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#28B95E] p-2 rounded-lg text-white cursor-pointer">
              <MdSearch size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. TABLE CARD */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Top Controls */}
        <div className="px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
              Show up to
            </span>
            <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-100 rounded-lg text-sm text-gray-600) cursor-pointer">
              <span>100</span>
              <MdKeyboardArrowDown className="text-gray-400" />
            </div>
            <span className="text-xs font-medium text-gray-400">Entries</span>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-xs font-medium text-gray-400 hover:bg-gray-50 transition-all">
            <MdOutlineFileDownload size={18} className="text-gray-300" />
            Export
          </button>
        </div>

        {/* 4. TABLE SECTION (Disesuaikan dengan properti asli JSON kamu) */}
        <div className="overflow-x-auto px-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-[11px] font-medium text-gray-400 uppercase tracking-wider border-b border-gray-50">
                <th className="px-4 py-5 text-left font-medium">Medicine Name</th>
                <th className="px-4 py-5 text-left font-medium">Strength</th>
                <th className="px-4 py-5 text-left font-medium">Batch</th>
                <th className="px-4 py-5 text-left font-medium">Expiry Date</th>
                <th className="px-4 py-5 text-center font-medium">In Qty</th>
                <th className="px-4 py-5 text-center font-medium">Out Qty</th>
                <th className="px-4 py-5 text-center font-medium">Stock</th>
                <th className="px-4 py-5 text-center font-medium">Box</th>
                <th className="px-4 py-5 text-right font-medium">Est. Value (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-5 text-sm text-gray-600 font-normal">
                      {item.name}
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-400 font-normal">
                      {item.strength}
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-500 font-normal">
                      {item.batch}
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-400 font-normal">
                      {item.expiry}
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-500 text-center font-normal">
                      {item.inQty}
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-500 text-center font-normal">
                      {item.outQty}
                    </td>
                    <td className="px-4 py-5 text-sm font-semibold text-center text-gray-700">
                      {item.stock}
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-500 text-center font-normal">
                      {item.box}
                    </td>
                    <td className="px-4 py-5 text-sm text-gray-600 text-right font-medium">
                      {/* Kalkulasi tiruan sekadar pemanis UI agar kolom harga terisi */}
                      {(item.stock * 2500).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-gray-400 text-sm">
                    Obat tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. PAGINATION */}
        <div className="px-8 py-8 flex justify-center md:justify-end">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-300 hover:text-gray-600">
              <MdChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-[#5065f6] text-white text-xs font-medium shadow-md shadow-blue-200/50">
                1
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-medium text-gray-400 hover:bg-gray-50">
                2
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-medium text-gray-400 hover:bg-gray-50">
                3
              </button>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}