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

  const inputContainer = "flex flex-col gap-2";
  const labelClass = "text-xs font-semibold text-gray-500 ml-1";
  const inputClass =
    "w-full bg-[#F9FAFB] border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-[#5065f6] focus:border-transparent transition-all outline-none placeholder:text-gray-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-[28px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header Modal */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Add New Drug</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Form Body - 12 Items */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-h-[65vh] overflow-y-auto">
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
              placeholder="6435876534657436"
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

          {/* 6. Barcode Dropdown */}
          <div className={inputContainer}>
            <label className={labelClass}>Barcode Type</label>
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
                className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"
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
            <input type="text" placeholder="$1,000.00" className={inputClass} />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-8 pb-8 pt-4 flex gap-4 border-t border-gray-50">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold py-3.5 rounded-xl transition-all text-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-[#5065f6] hover:bg-[#4052d6] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#5065f6]/10 transition-all text-sm">
            Save Product
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
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans text-gray-900 antialiased">
      {/* Header Title Section */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Product List</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
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
                ? "bg-[#5065f6] text-white shadow-md shadow-[#5065f6]/10"
                : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter Area */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-0.5">
                Select Product
              </span>
              <select className="bg-[#F9FAFB] border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-600 w-44 outline-none focus:bg-white focus:ring-2 focus:ring-[#5065f6]/20 transition-all">
                <option>Select one</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-0.5">
                Product Code
              </span>
              <input
                type="text"
                placeholder="e.g. B-63215..."
                className="bg-[#F9FAFB] border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-600 w-44 outline-none focus:bg-white focus:ring-2 focus:ring-[#5065f6]/20 transition-all"
              />
            </div>

            <button className="bg-[#28B95E] hover:bg-[#22a652] p-2.5 rounded-xl text-white transition-all self-end shadow-sm shadow-[#28B95E]/10">
              <MdSearch size={18} />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#5065f6] hover:bg-[#4052d6] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md shadow-[#5065f6]/10 transition-all self-end sm:self-auto"
          >
            <MdAdd size={18} /> ADD PRODUCT
          </button>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB]/50 border-b border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <th className="pl-6 pr-4 py-4 w-12 text-center">SI</th>
                <th className="px-4 py-4">Supplier</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Product Code</th>
                <th className="px-4 py-4">Price</th>
                <th className="pl-4 pr-6 py-4 text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-50">
              {products.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#F9FAFB]/60 transition-colors"
                >
                  <td className="pl-6 pr-4 py-4 text-center font-medium text-gray-400">{i + 1}</td>
                  <td className="px-4 py-4 font-medium text-gray-500">
                    {item.supplier}
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-700">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-gray-500 font-medium tracking-tight">{item.code}</td>
                  <td className="px-4 py-4 font-bold text-gray-800">
                    {item.price}
                  </td>
                  <td className="pl-4 pr-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:text-[#5065f6] hover:bg-blue-50 transition-all">
                        <MdVisibility size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all">
                        <MdEdit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-50 bg-[#F9FAFB]/20">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
            <span>Show up to</span>
            <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none text-gray-600 font-semibold focus:border-[#5065f6]">
              <option>100</option>
              <option>50</option>
              <option>25</option>
            </select>
            <span>Entries</span>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all">
              <MdChevronLeft size={18} />
            </button>
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  n === 3 
                    ? "bg-[#5065f6] text-white shadow-sm" 
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
            <button className="p-1.5 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all">
              <MdChevronRight size={18} />
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