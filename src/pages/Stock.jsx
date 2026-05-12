import React, { useState, useRef, useEffect } from "react";
import {
  MdSearch,
  MdFileDownload,
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

// Import data dari file JSON kamu
import dataApotek from "../data/dataApotek.json";

export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mengambil data inventory dari JSON
  const { inventory } = dataApotek;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 bg-[#F8F9FB] min-h-screen font-sans animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Stock Report 
        </h1>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <span>Home</span>
          <MdChevronRight />
          <span>Explore</span>
          <MdChevronRight />
          <span className="text-emerald-600">Stock Report   </span>
        </div>
      </div>

      {/* SEARCH & EXPORT BAR */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />
          <input
            type="text"
            placeholder="Search medications..."
            className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 p-2.5 rounded-xl text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100">
            <MdSearch size={20} />
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsExportOpen(!isExportOpen)}
            className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-600 shadow-sm hover:bg-gray-50 transition-all"
          >
            <MdFileDownload className="text-emerald-500" size={18} />
            Export Data
            <MdKeyboardArrowDown
              className={`transition-transform text-gray-300 ${isExportOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isExportOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-50 py-2 z-50 animate-in zoom-in-95 duration-200">
              <button className="w-full px-5 py-3 text-left text-[11px] font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                Export to Excel
              </button>
              <button className="w-full px-5 py-3 text-left text-[11px] font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors border-t border-gray-50">
                Export to PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center gap-3">
          {/* Tampilan Polos: Hanya teks dan select tanpa box/border hijau */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Show up to
            </span>

            <div className="relative flex items-center">
              <select className="appearance-none bg-transparent text-sm font-black text-gray-700 focus:outline-none cursor-pointer pr-4 z-10">
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              {/* Icon panah kecil agar tetap terlihat seperti dropdown */}
              <MdKeyboardArrowDown
                className="absolute right-0 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>

            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Entries
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5">Drug Name</th>
                <th className="px-6 py-5">Strength</th>
                <th className="px-6 py-5">Batch ID</th>
                <th className="px-6 py-5">Expiry Date</th>
                <th className="px-6 py-5 text-center">In Qty</th>
                <th className="px-6 py-5 text-center">Out Qty</th>
                <th className="px-6 py-5 text-center">Stock</th>
                <th className="px-8 py-5 text-center">Stock Box</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-emerald-50/20 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">
                    {item.strength}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-lg uppercase">
                      {item.batch}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">
                    {item.expiry}
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-600 text-center">
                    {item.inQty}
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-600 text-center">
                    {item.outQty}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-black text-emerald-600">
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-sm font-black text-gray-700">
                      {item.box}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-8 border-t border-gray-50 flex justify-between items-center bg-gray-50/10">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
            Showing{" "}
            <span className="text-emerald-600">{filteredData.length}</span> of
            20 entries
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-300 hover:text-emerald-500 transition-colors">
              <MdChevronLeft size={24} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${page === 1 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-gray-400 hover:bg-gray-100"}`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 text-gray-300 hover:text-emerald-500 transition-colors">
              <MdChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
