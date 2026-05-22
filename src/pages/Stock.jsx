import React, { useState } from "react";
import {
  MdSearch,
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineFileDownload,
} from "react-icons/md";

// Import data (asumsi data lo ada field: name, manufacturer, salePrice, purchasePrice, inQty, stock, box)
import dataApotek from "../data/dataApotek.json";

export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const { inventory } = dataApotek;

  const filteredData = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className="p-8 bg-[#F8F9FB] min-h-screen"
      style={{ fontFamily: "'TT Commons', sans-serif" }}
    >
      {/* 1. TITLE SECTION - Heading_1 (32px, font-normal/light style) */}
      <div className="mb-6">
        <h1 className="text-[32px] font-normal text-gray-900 tracking-tight">
          Stock Report
        </h1>
      </div>

      {/* 2. SEARCH SECTION - Borderless Soft Interface style */}
      <div className="mb-6">
        <p className="text-[14px] text-gray-400 mb-2 font-normal">Search</p>
        <div className="flex gap-3 items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="search anythings"
              className="w-full pl-5 pr-12 py-3 bg-white border-none rounded-xl text-[14px] font-normal text-gray-600 shadow-sm focus:ring-1 focus:ring-blue-500/20 outline-none placeholder:text-gray-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#28B95E] p-2 rounded-lg text-white cursor-pointer">
              <MdSearch size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. TABLE CARD - bg-white, rounded-2xl, border-gray-100 */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Top Controls */}
        <div className="px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
              Show up to
            </span>
            <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-100 rounded-lg text-sm text-gray-600">
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

        {/* 4. TABLE SECTION - Following image_09547a logic */}
        <div className="overflow-x-auto px-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-[11px] font-medium text-gray-400 uppercase tracking-wider border-b border-gray-50">
                <th className="px-4 py-5 text-left font-medium">
                  Medicine Name
                </th>
                <th className="px-4 py-5 text-left font-medium">
                  Manufacturer Name
                </th>
                <th className="px-4 py-5 text-left font-medium">Sale Price</th>
                <th className="px-4 py-5 text-left font-medium">
                  Purchase Price
                </th>
                <th className="px-4 py-5 text-center font-medium">In Qty</th>
                <th className="px-4 py-5 text-center font-medium">Stock</th>
                <th className="px-4 py-5 text-center font-medium">Stock Box</th>
                <th className="px-4 py-5 text-right font-medium">
                  Stock Sale Price
                </th>
                <th className="px-4 py-5 text-right font-medium">
                  Stock Purchase Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-5 text-sm text-gray-600 font-normal">
                    {item.name}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-400 font-normal">
                    {item.manufacturer}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-600 font-normal">
                    ${item.salePrice}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-400 font-normal">
                    ${item.purchasePrice}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-500 text-center font-normal">
                    {item.inQty}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-500 text-center font-normal">
                    {item.stock}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-500 text-center font-normal">
                    {item.box}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-600 text-right font-normal">
                    $948.55
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-600 text-right font-normal">
                    $328.85
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. PAGINATION - image_095b9e Style */}
        <div className="px-8 py-8 flex justify-center md:justify-end">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-300 hover:text-gray-600">
              <MdChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  className="w-8 h-8 rounded-lg text-xs font-medium text-gray-400 hover:bg-gray-50"
                >
                  {n}
                </button>
              ))}
              <button className="w-8 h-8 rounded-lg bg-[#5065f6] text-white text-xs font-medium shadow-md shadow-blue-200/50">
                3
              </button>
              {[4, 5, 6].map((n) => (
                <button
                  key={n}
                  className="w-8 h-8 rounded-lg text-xs font-medium text-gray-400 hover:bg-gray-50"
                >
                  {n}
                </button>
              ))}
              <span className="px-1 text-gray-300">...</span>
              {[38, 39, 40].map((n) => (
                <button
                  key={n}
                  className="w-8 h-8 rounded-lg text-xs font-medium text-gray-400 hover:bg-gray-50"
                >
                  {n}
                </button>
              ))}
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
