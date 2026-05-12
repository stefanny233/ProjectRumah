import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MdSearch,
  MdAdd,
  MdEdit,
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
} from "react-icons/md";
import dataApotek from "../data/dataApotek.json";

export default function Product() {
  const [activeTab, setActiveTab] = useState("Product List");
  const [showPopup, setShowPopup] = useState(false);
  const { products, productRacks, productDamages } = dataApotek;
  

  // Render content berdasarkan tab yang dipilih
  const renderContent = () => {
    switch (activeTab) {
      case "Product List":
        return (
          <ProductListTable data={products} onAdd={() => setShowPopup(true)} />
        );
      case "Product Package":
        return (
          <ProductRackTable
            data={productRacks}
            onAdd={() => setShowPopup(true)}
          />
        );
      case "Product Damages":
        return (
          <ProductDamageTable
            data={productDamages}
            onAdd={() => setShowPopup(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-[#F8F9FB] min-h-screen font-sans">
      {/* 1. HEADER TABS */}
      <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl w-fit shadow-sm border border-gray-100">
        {["Product List", "Product Package", "Product Damages"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
                : "text-gray-400 hover:text-emerald-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2. SUB-NAVIGATION (Hanya muncul di Product List) */}
      {activeTab === "Product List" && (
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            "Product List",
            "Manage Brands",
            "Manage Categories",
            "Manage Product Racks",
            "Manage Type",
          ].map((sub, i) => (
            <button
              key={sub}
              className={`text-[10px] font-black uppercase tracking-tighter ${i === 0 ? "text-emerald-600" : "text-gray-400"}`}
            >
              {sub} {i !== 4 && <span className="ml-4 text-gray-200">|</span>}
            </button>
          ))}
        </div>
      )}

      {/* 3. MAIN TABLE CONTAINER */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {renderContent()}

        {/* PAGINATION FOOTER */}
        <div className="p-8 border-t border-gray-50 flex justify-between items-center bg-gray-50/10">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
            Showing 1 to 20 entries
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-300">
              <MdChevronLeft size={24} />
            </button>
            <button className="w-9 h-9 rounded-xl bg-emerald-500 text-white text-xs font-black shadow-lg">
              1
            </button>
            <button className="p-2 text-gray-300">
              <MdChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. POPUP MANAGER */}
      {showPopup && (
        <PopupManager type={activeTab} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS TABLES ---

function ProductListTable({ data, onAdd }) {
  return (
    <>
      <div className="p-8 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <select className="bg-gray-50 px-4 py-3 rounded-xl text-xs font-bold text-gray-500 border-none outline-none">
            <option>Select One</option>
          </select>
          <div className="relative">
            <MdSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-sm border-none outline-none w-64"
            />
          </div>
        </div>
        <button
          onClick={onAdd}
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2"
        >
          <MdAdd size={18} /> Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
            <tr>
              <th className="px-8 py-5">SI</th>
              <th>Supplier</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Code</th>
              <th>Expiry</th>
              <th>Type</th>
              <th>Price</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {data.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5 text-gray-400 font-bold">{i + 1}</td>
                <td className="font-bold text-gray-700">{item.supplier}</td>
                <td className="font-bold text-emerald-600">{item.name}</td>
                <td className="text-gray-500">{item.brand}</td>
                <td className="text-gray-500">{item.code}</td>
                <td className="text-gray-500">{item.expiry}</td>
                <td className="text-gray-500">{item.type}</td>
                <td className="font-black text-gray-700">{item.price}</td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button className="text-gray-300 hover:text-emerald-500">
                      <MdEdit size={20} />
                    </button>
                    <button className="text-gray-300 hover:text-red-500">
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProductRackTable({ data, onAdd }) {
  return (
    <>
      <div className="p-8 flex justify-between items-center">
        <div className="relative">
          <MdSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            size={20}
          />
          <input
            type="text"
            placeholder="Search rack..."
            className="pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-sm border-none outline-none w-64"
          />
        </div>
        <button
          onClick={onAdd}
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2"
        >
          <MdAdd size={18} /> Add Product Rack
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <tr>
            <th className="px-8 py-5">SI</th>
            <th>Product Rack Name</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item, i) => (
            <tr key={i} className="text-sm font-bold">
              <td className="px-8 py-5 text-gray-400">{i + 1}</td>
              <td className="text-gray-700">{item.name}</td>
              <td>
                <span
                  className={`px-4 py-1.5 rounded-full border text-[10px] uppercase font-black ${item.status === "Active" ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-red-50 border-red-200 text-red-600"}`}
                >
                  ● {item.status}
                </span>
              </td>
              <td className="text-center flex justify-center gap-2 py-5">
                <button className="text-gray-300 hover:text-emerald-500">
                  <MdEdit size={20} />
                </button>
                <button className="text-gray-300 hover:text-red-500">
                  <MdDeleteOutline size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function ProductDamageTable({ data, onAdd }) {
  return (
    <>
      <div className="p-8 flex justify-between items-center">
        <div className="relative">
          <MdSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            size={20}
          />
          <input
            type="text"
            placeholder="Search reference..."
            className="pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-sm border-none outline-none w-64"
          />
        </div>
        <button
          onClick={onAdd}
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2"
        >
          <MdAdd size={18} /> Add Damage
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <tr>
            <th className="px-8 py-5">SI</th>
            <th>Date</th>
            <th>Reference</th>
            <th>Amount</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item, i) => (
            <tr key={i} className="text-sm font-bold text-gray-700">
              <td className="px-8 py-5 text-gray-400">{i + 1}</td>
              <td>{item.date}</td>
              <td className="text-emerald-600 font-black tracking-tighter">
                {item.reference}
              </td>
              <td className="font-black text-gray-800">{item.amount}</td>
              <td className="text-center flex justify-center gap-2 py-5">
                <button className="text-gray-300 hover:text-emerald-500">
                  <MdEdit size={20} />
                </button>
                <button className="text-gray-300 hover:text-red-500">
                  <MdDeleteOutline size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// --- POPUP MANAGER COMPONENT ---

function PopupManager({ type, onClose }) {
  const titles = {
    "Product List": "Add Product",
    "Product Package": "Add Product Rack",
    "Product Damages": "Add Damage Report",
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">
            {titles[type]}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-8 grid grid-cols-2 gap-6">
          {type === "Product List" ? (
            <>
              <InputGroup label="Product Name" placeholder="e.g Paracetamol" />
              <InputGroup label="Brand" placeholder="Select Brand" />
              <InputGroup label="Category" placeholder="Select Category" />
              <InputGroup label="Product Code" placeholder="e.g PRC001" />
              <InputGroup label="Price" placeholder="0.00" />
              <InputGroup label="Expiry Date" type="date" />
            </>
          ) : (
            <>
              <InputGroup
                label="Name / Reference"
                placeholder="Enter details..."
              />
              <InputGroup
                label="Status / Amount"
                placeholder="Enter value..."
              />
            </>
          )}
        </div>

        <div className="p-8 border-t border-gray-50 flex justify-end gap-3 bg-gray-50/10">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-black text-[11px] uppercase text-gray-400 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-3 rounded-xl font-black text-[11px] uppercase bg-emerald-500 text-white shadow-lg shadow-emerald-100 transition-all active:scale-95">
            Save Data
          </button>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-gray-50 border-none rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-300"
      />
    </div>
  );
}
