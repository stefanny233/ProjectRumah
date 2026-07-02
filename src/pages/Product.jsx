import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import dataApotek from "../data/dataApotek.json";
import {
  MdSearch, MdAdd, MdEdit, MdClose, MdVisibility,
  MdChevronLeft, MdChevronRight, MdCalendarToday, MdRefresh
} from "react-icons/md";

const TABLE_NAME = "products"; 

const AddDrugModal = ({ isOpen, onClose, onRefresh }) => {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", brand: "", code: "", expiry: "", type: "Tablet", price: "", supplier: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPriceForDB = (raw) => {
    const digits = raw.replace(/[^\d]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const formatPriceForUI = (num) => `Rp ${num.toLocaleString("id-ID")}`;

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.expiry) return alert("⚠️ Expiry Date wajib diisi.");

      const payload = {
        name: formData.name,
        brand: formData.brand || "Generic",
        code: formData.code,
        expiry: formData.expiry,
        type: formData.type,
        price: formatPriceForDB(formData.price),
        supplier: formData.supplier || "PT. Kimia Farma"
      };

      // Simpan ke Supabase
      const { error } = await supabase.from(TABLE_NAME).insert([payload]);
      if (error) throw error;

      // Simpan di Local Storage agar langsung terhubung ke POS Dispenser
      const localProducts = JSON.parse(localStorage.getItem("local_products") || "[]");
      const savedPayload = { ...payload, id: Date.now(), price: formatPriceForUI(payload.price) };
      localStorage.setItem("local_products", JSON.stringify([savedPayload, ...localProducts]));

      onRefresh(savedPayload);
      alert("✅ Produk berhasil ditambahkan ke Supabase!");
      onClose();
    } catch (err) {
      console.warn("Gagal simpan ke Supabase, menyimpan secara lokal:", err.message);
      
      const fallbackPayload = {
        id: Date.now(),
        name: formData.name,
        brand: formData.brand || "Generic",
        code: formData.code,
        expiry: formData.expiry,
        type: formData.type,
        price: formatPriceForUI(formatPriceForDB(formData.price)),
        supplier: formData.supplier || "PT. Kimia Farma"
      };

      const localProducts = JSON.parse(localStorage.getItem("local_products") || "[]");
      localStorage.setItem("local_products", JSON.stringify([fallbackPayload, ...localProducts]));

      onRefresh(fallbackPayload);
      alert("⚠️ Tersimpan di penyimpanan lokal browser.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const inputContainer = "flex flex-col gap-2 text-left";
  const labelClass = "text-xs font-semibold text-gray-500 ml-1 capitalize";
  const inputClass =
    "w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-700/20 focus:border-teal-900 transition-all outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-[28px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-lg font-bold text-teal-950 font-master-title">Add New Drug</h2>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer">
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSaveProduct}>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-h-[60vh] overflow-y-auto">
            <div className={inputContainer}>
              <label className={labelClass}>Drug Name*</label>
              <input type="text" name="name" required placeholder="Contoh: Paracetamol" value={formData.name} onChange={handleChange} className={inputClass} />
            </div>
            <div className={inputContainer}>
              <label className={labelClass}>Brand</label>
              <input type="text" name="brand" placeholder="Contoh: generic" value={formData.brand} onChange={handleChange} className={inputClass} />
            </div>
            <div className={inputContainer}>
              <label className={labelClass}>Product Code*</label>
              <input type="text" name="code" required placeholder="e.g. PRC-001" value={formData.code} onChange={handleChange} className={inputClass} />
            </div>
            <div className={inputContainer}>
              <label className={labelClass}>Expiry Date*</label>
              <input type="date" name="expiry" required value={formData.expiry} onChange={handleChange} className={inputClass} />
            </div>
            <div className={inputContainer}>
              <label className={labelClass}>Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className={inputClass + " cursor-pointer"}>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Liquid">Liquid</option>
                <option value="Syrup">Syrup</option>
                <option value="Caplet">Caplet</option>
                <option value="Injection">Injection</option>
              </select>
            </div>
            <div className={inputContainer}>
              <label className={labelClass}>Supplier</label>
              <input type="text" name="supplier" placeholder="PT. Kimia Farma" value={formData.supplier} onChange={handleChange} className={inputClass} />
            </div>
            <div className={inputContainer}>
              <label className={labelClass}>Price (Harga Jual)*</label>
              <input type="text" name="price" required placeholder="Contoh: 15000" value={formData.price} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="px-8 pb-8 pt-4 flex gap-4 border-t border-gray-100 bg-[#faf8f5]/30">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-xl text-sm cursor-pointer">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-teal-950 hover:bg-teal-900 text-white font-bold py-3.5 rounded-xl shadow-lg text-sm cursor-pointer">
              {loading ? "Saving Product…" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Product List");
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");

  const formatPriceForUI = (priceVal) => {
    if (typeof priceVal === "number") return `Rp ${priceVal.toLocaleString("id-ID")}`;
    const cleaned = String(priceVal || "").replace(/[^\d]/g, "");
    return cleaned ? `Rp ${parseInt(cleaned, 10).toLocaleString("id-ID")}` : "Rp 0";
  };

  const loadLocalProducts = () => {
    const localSaved = JSON.parse(localStorage.getItem("local_products") || "[]");
    const jsonProducts = dataApotek.products || [];
    const combined = [...localSaved, ...jsonProducts];
    const unique = [];
    const seen = new Set();
    for (const item of combined) {
      const key = item.code || item.id;
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique.map(item => ({ ...item, price: formatPriceForUI(item.price) }));
  };

  const [productList, setProductList] = useState(loadLocalProducts);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from(TABLE_NAME).select("*");
      if (searchName) query = query.ilike("name", `%${searchName}%`);
      if (searchCode) query = query.ilike("code", `%${searchCode}%`);

      const { data, error } = await query;
      if (error) throw error;

      const localData = loadLocalProducts();
      const mergedList = data && data.length > 0 ? [...data, ...localData] : localData;

      const unique = [];
      const seen = new Set();
      for (const item of mergedList) {
        const key = item.code || item.id;
        if (key && !seen.has(key)) {
          seen.add(key);
          unique.push(item);
        }
      }

      setProductList(unique.map(item => ({ ...item, price: formatPriceForUI(item.price) })));
    } catch (err) {
      let localData = loadLocalProducts();
      if (searchName) localData = localData.filter((i) => i.name.toLowerCase().includes(searchName.toLowerCase()));
      if (searchCode) localData = localData.filter((i) => i.code.toLowerCase().includes(searchCode.toLowerCase()));
      setProductList(localData);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewProductState = (newProduct) => {
    setProductList((prev) => [newProduct, ...prev]);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchName, searchCode]);

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans text-slate-800 antialiased text-left">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-master-title { font-family: 'Poppins', sans-serif !important; font-weight: 700 !important; }
      `}</style>

      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-950 font-master-title">Product List</h1>
        <button onClick={fetchProducts} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-slate-50 text-gray-700 flex items-center gap-1.5 text-xs font-bold shadow-sm cursor-pointer">
          <MdRefresh size={16} className={loading ? "animate-spin text-teal-700" : ""} /> Refresh
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
        {["Product List", "Manage Brands", "Manage Categories", "Manage Product Raks", "Mange Type"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab ? "bg-teal-950 text-white shadow-md" : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50 cursor-pointer"}`}>{tab}</button>
        ))}
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-200/60 overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-50">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cari Nama Obat</span>
              <input type="text" placeholder="Nama obat..." value={searchName} onChange={(e) => setSearchName(e.target.value)} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-48 outline-none focus:bg-white" />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Code</span>
              <input type="text" placeholder="e.g. PRC-001..." value={searchCode} onChange={(e) => setSearchCode(e.target.value)} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-48 outline-none focus:bg-white" />
            </div>
            <button onClick={fetchProducts} className="bg-teal-950 hover:bg-teal-900 p-2.5 rounded-xl text-white cursor-pointer"><MdSearch size={18} /></button>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-teal-950 hover:bg-teal-900 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"><MdAdd size={18} /> ADD PRODUCT</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB]/50 border-b border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <th className="pl-6 pr-4 py-4 w-12 text-center">No</th>
                <th className="px-4 py-4">Supplier</th>
                <th className="px-4 py-4">Nama Obat</th>
                <th className="px-4 py-4">Brand</th>
                <th className="px-4 py-4">Product Code</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Expiry Date</th>
                <th className="px-4 py-4">Harga Jual</th>
                <th className="pl-4 pr-6 py-4 text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-50">
              {productList.map((item, i) => (
                <tr key={item.id || i} className="hover:bg-[#F9FAFB]/60 transition-colors">
                  <td className="pl-6 pr-4 py-4 text-center font-medium text-gray-400">{i + 1}</td>
                  <td className="px-4 py-4 font-medium text-slate-500">{item.supplier}</td>
                  <td className="px-4 py-4 font-bold text-teal-950">{item.name}</td>
                  <td className="px-4 py-4 text-slate-500 font-medium">{item.brand || "-"}</td>
                  <td className="px-4 py-4 text-slate-400 font-mono">{item.code || "-"}</td>
                  <td className="px-4 py-4 text-slate-500 font-medium">{item.type || "-"}</td>
                  <td className="px-4 py-4 text-slate-400 font-mono">{item.expiry || "-"}</td>
                  <td className="px-4 py-4 font-bold text-amber-700">{item.price}</td>
                  <td className="pl-4 pr-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:text-teal-700 hover:bg-slate-100 cursor-pointer"><MdVisibility size={16} /></button>
                      <button className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:text-amber-700 hover:bg-slate-100 cursor-pointer"><MdEdit size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddDrugModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRefresh={handleAddNewProductState} />
    </div>
  );
}