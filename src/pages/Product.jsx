import React, { useState } from "react";
import {
  MdSearch,
  MdAdd,
  MdEdit,
  MdClose,
  MdVisibility,
  MdChevronLeft,
  MdChevronRight,
  MdCalendarToday,
} from "react-icons/md";

// --- KOMPONEN MODAL (ADD NEW DRUG) ---
const AddDrugModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Styling berdasarkan panduan Breakdown Redesign
  const inputContainer = "flex flex-col gap-1.5";
  const labelClass = "text-[12px] font-bold text-gray-700 ml-1"; // font-bold (700)
  const inputClass =
    "w-full bg-[#F9FAFB] border-none rounded-xl px-4 py-3 text-sm font-medium text-gray-600 focus:ring-2 focus:ring-[#5065f6] transition-all outline-none placeholder:text-gray-300"; // bg-gray-50 & borderless

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header Modal */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-lg font-black text-[#111827]">Add New Drug</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Form Body - 12 Items sesuai image_08e437.png */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* 1. Drug Name */}
          <div className={inputContainer}>
            <label className={labelClass}>Drug Name*</label>
            <select className={inputClass}>
              <option>Napa 500mg</option>
            </select>
          </div>

          {/* 2. Brand */}
          <div className={inputContainer}>
            <label className={labelClass}>Brand</label>
            <select className={inputClass}>
              <option>Beximco</option>
            </select>
          </div>

          {/* 3. Data Matrix */}
          <div className={inputContainer}>
            <label className={labelClass}>Data Matrix</label>
            <input
              type="text"
              placeholder="678584536847"
              className={inputClass}
            />
          </div>

          {/* 4. Barcode */}
          <div className={inputContainer}>
            <label className={labelClass}>Barcode</label>
            <input
              type="text"
              placeholder="6435876534657436854354"
              className={inputClass}
            />
          </div>

          {/* 5. Category */}
          <div className={inputContainer}>
            <label className={labelClass}>Category</label>
            <select className={inputClass}>
              <option>Select One</option>
            </select>
          </div>

          {/* 6. Barcode (Dropdown) */}
          <div className={inputContainer}>
            <label className={labelClass}>Barcode</label>
            <select className={inputClass}>
              <option>Select One</option>
            </select>
          </div>

          {/* 7. Batch No */}
          <div className={inputContainer}>
            <label className={labelClass}>Batch No</label>
            <input type="text" placeholder="78943757" className={inputClass} />
          </div>

          {/* 8. Expiry Date */}
          <div className={inputContainer}>
            <label className={labelClass}>Expiry Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="19 Feb 2022"
                className={inputClass}
              />
              <MdCalendarToday
                className="absolute right-4 top-3.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* 9. Buy Price */}
          <div className={inputContainer}>
            <label className={labelClass}>Buy Price</label>
            <input type="text" placeholder="$46.00" className={inputClass} />
          </div>

          {/* 10. Sale Price */}
          <div className={inputContainer}>
            <label className={labelClass}>Sale Price</label>
            <input type="text" placeholder="$56.00" className={inputClass} />
          </div>

          {/* 11. Drug Quantity */}
          <div className={inputContainer}>
            <label className={labelClass}>Drug Quantity</label>
            <input type="text" placeholder="430" className={inputClass} />
          </div>

          {/* 12. Unit Total */}
          <div className={inputContainer}>
            <label className={labelClass}>Unit Total</label>
            <input type="text" placeholder="$1000.00" className={inputClass} />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-8 pb-8 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-[#F3F4F6] hover:bg-gray-200 text-gray-500 font-bold py-4 rounded-2xl transition-all"
          >
            Cancel
          </button>
          <button className="flex-1 bg-[#5065f6] hover:bg-[#4052d6] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#5065f6]/20 transition-all active:scale-95">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA ---
export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Product List");

  const products = Array(8).fill({
    supplier: "General Supplier",
    name: "Napa Extra",
    brand: "Beximco",
    code: "63264387",
    expiry: "25 Feb 2022",
    type: "Medicine",
    price: "$120.00",
  });

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-['Inter'] text-[#111827]">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          "Product List",
          "Manage Brands",
          "Manage Categories",
          "Manage Product Raks",
          "Mange Type",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-[#5065f6] text-white shadow-lg shadow-blue-100"
                : "bg-white text-gray-400 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter Area */}
        <div className="p-6 flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-400 ml-1">
                Select Product
              </label>
              <select className="bg-[#F3F4F6] border-none rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 w-44 outline-none">
                <option>Select one</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-400 ml-1">
                Product Code
              </label>
              <input
                type="text"
                placeholder="$B-63215..."
                className="bg-[#F3F4F6] border-none rounded-xl px-4 py-2.5 text-sm font-medium w-44 outline-none"
              />
            </div>
            <button className="bg-[#28B95E] p-3 rounded-xl text-white hover:opacity-90 transition-all self-end mb-0.5">
              <MdSearch size={20} />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#5065f6] hover:bg-[#4052d6] text-white px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg shadow-[#5065f6]/20 transition-all active:scale-95"
          >
            <MdAdd size={20} /> ADD PRODUCT
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                <th className="px-6 py-5">SI</th>
                <th className="py-5">Supplier</th>
                <th className="py-5">Name</th>
                <th className="py-5">Product Code</th>
                <th className="py-5">Price</th>
                <th className="py-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                  <td className="py-4 font-medium text-gray-600">
                    {item.supplier}
                  </td>
                  <td className="py-4 font-bold text-gray-800">{item.name}</td>
                  <td className="py-4 text-gray-500">{item.code}</td>
                  <td className="py-4 font-black text-gray-900">
                    {item.price}
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-3">
                      <button className="text-gray-300 hover:text-blue-500">
                        <MdVisibility size={20} />
                      </button>
                      <button className="text-gray-300 hover:text-green-500">
                        <MdEdit size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 flex justify-between items-center border-t border-gray-50">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <span>Show up to</span>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-1 py-0.5">
              <option>100</option>
            </select>
            <span>Entries</span>
          </div>
          <div className="flex gap-1">
            <button className="p-2 text-gray-300">
              <MdChevronLeft size={20} />
            </button>
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 rounded-lg text-xs font-bold ${n === 3 ? "bg-[#5065f6] text-white" : "text-gray-400 hover:bg-gray-100"}`}
              >
                {n}
              </button>
            ))}
            <button className="p-2 text-gray-300">
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <AddDrugModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
