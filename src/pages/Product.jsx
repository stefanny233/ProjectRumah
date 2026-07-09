import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import dataApotek from "../data/dataApotek.json";
import {
  MdSearch, MdAdd, MdEdit, MdClose, MdVisibility,
  MdChevronLeft, MdChevronRight, MdRefresh
} from "react-icons/md";

const TABLE_NAME = "products"; 

/* -------------------------------------------------
   MODAL – Tambah Obat Baru
------------------------------------------------- */
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

      const { error } = await supabase.from(TABLE_NAME).insert([payload]);
      if (error) throw error;

      const localProducts = JSON.parse(localStorage.getItem("local_products") || "[]");
      const savedPayload = { ...payload, id: Date.now(), price: formatPriceForUI(payload.price) };
      localStorage.setItem("local_products", JSON.stringify([savedPayload, ...localProducts]));

      onRefresh(savedPayload);
      alert("✅ Produk berhasil ditambahkan ke Supabase!");
      onClose();
    } catch (err) {
      const fallbackPayload = {
        id: Date.now(), name: formData.name, brand: formData.brand || "Generic", code: formData.code,
        expiry: formData.expiry, type: formData.type, price: formatPriceForUI(formatPriceForDB(formData.price)),
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

  const inputContainer = "flex flex-col gap-1 text-left";
  const labelClass = "text-xs font-medium text-gray-400 mb-1 ml-0.5";
  const inputClass =
    "w-full bg-[#F8F9FB] border border-gray-150 rounded-xl px-4 py-3 text-sm font-normal text-gray-700 focus:bg-white focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition-all outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-[20px] font-normal text-gray-900">Add New Drug</h2>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-gray-50 text-gray-450 hover:text-gray-700 hover:bg-gray-100 cursor-pointer">
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSaveProduct}>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-h-[55vh] overflow-y-auto">
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
          <div className="px-8 pb-8 pt-4 flex gap-4 border-t border-gray-50 bg-[#faf8f5]/20">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-500 font-medium py-3.5 rounded-xl text-xs cursor-pointer">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-teal-950 hover:bg-teal-900 text-white font-bold py-3.5 rounded-xl text-xs shadow-md cursor-pointer transition-colors">
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
      const key = `${item.name}-${item.code || item.id}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique.map(item => ({ ...item, price: formatPriceForUI(item.price) }));
  };

  const [productList, setProductList] = useState(loadLocalProducts);

  // --- STATE UNTUK BRANDS, CATEGORIES, RACKS, & TYPES ---
  const [brands, setBrands] = useState(() => {
    const saved = localStorage.getItem("local_brands");
    return saved ? JSON.parse(saved) : [
      { name: "Kimia Farma", desc: "BUMN Farmasi Indonesia", status: "Active" },
      { name: "Kalbe Farma", desc: "Produsen obat multinasional", status: "Active" },
      { name: "Sanbe Farma", desc: "Industri formulasi farmasi", status: "Active" },
      { name: "Generic", desc: "Obat generik standar BPOM", status: "Active" }
    ];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("local_categories");
    return saved ? JSON.parse(saved) : [
      { name: "Medicine", desc: "Kategori umum obat-obatan medis" },
      { name: "Syrup", desc: "Larutan obat cair berkadar gula tinggi" },
      { name: "Liquid", desc: "Obat luar atau dalam berbentuk cairan encer" },
      { name: "Tablet", desc: "Sediaan padat kemasan strip" }
    ];
  });

  const [racks, setRacks] = useState(() => {
    const saved = localStorage.getItem("local_racks");
    return saved ? JSON.parse(saved) : [
      { code: "Rak A-1", floor: "Lantai 1 - Loket Depan", capacity: "80%" },
      { code: "Rak B-3", floor: "Lantai 1 - Samping Kasir", capacity: "45%" },
      { code: "Rak C-2", floor: "Lantai 2 - Ruang Gudang", capacity: "90%" }
    ];
  });

  const [types, setTypes] = useState(() => {
    const saved = localStorage.getItem("local_types");
    return saved ? JSON.parse(saved) : [
      { name: "Tablet", desc: "Kemasan bulat/oval padat cetak" },
      { name: "Capsule", desc: "Cangkang gelatin berisi serbuk/cair" },
      { name: "Syrup", desc: "Kemasan botol cairan manis" },
      { name: "Liquid", desc: "Kemasan vial/ampul cairan encer" }
    ];
  });

  // State Form Inline untuk masing-masing tab
  const [newBrand, setNewBrand] = useState({ name: "", desc: "" });
  const [newCategory, setNewCategory] = useState({ name: "", desc: "" });
  const [newRack, setNewRack] = useState({ code: "", floor: "", capacity: "50%" });
  const [newType, setNewType] = useState({ name: "", desc: "" });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from(TABLE_NAME).select("*");
      if (searchName) query = query.ilike("name", `%${searchName}%`);
      if (searchCode) query = query.ilike("code", `%${searchCode}%`);

      const { data, error } = await query;
      if (error) throw error;

      const localSaved = JSON.parse(localStorage.getItem("local_products") || "[]");
      const jsonProducts = dataApotek.products || [];
      const mergedList = data && data.length > 0 
        ? [...localSaved, ...data, ...jsonProducts] 
        : [...localSaved, ...jsonProducts];

      const unique = [];
      const seen = new Set();
      for (const item of mergedList) {
        const key = `${item.name}-${item.code || item.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(item);
        }
      }

      let filteredList = unique;
      if (searchName) filteredList = filteredList.filter(i => i.name.toLowerCase().includes(searchName.toLowerCase()));
      if (searchCode) filteredList = filteredList.filter(i => i.code.toLowerCase().includes(searchCode.toLowerCase()));

      setProductList(filteredList.map(item => ({ ...item, price: formatPriceForUI(item.price) })));
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

  // Fungsi Tambah Merek Baru
  const addBrand = (e) => {
    e.preventDefault();
    if (!newBrand.name) return;
    const updated = [...brands, { name: newBrand.name, desc: newBrand.desc, status: "Active" }];
    setBrands(updated);
    localStorage.setItem("local_brands", JSON.stringify(updated));
    setNewBrand({ name: "", desc: "" });
  };

  // Fungsi Tambah Kategori Baru
  const addCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name) return;
    const updated = [...categories, { name: newCategory.name, desc: newCategory.desc }];
    setCategories(updated);
    localStorage.setItem("local_categories", JSON.stringify(updated));
    setNewCategory({ name: "", desc: "" });
  };

  // Fungsi Tambah Rak Baru
  const addRack = (e) => {
    e.preventDefault();
    if (!newRack.code) return;
    const updated = [...racks, { code: newRack.code, floor: newRack.floor, capacity: newRack.capacity }];
    setRacks(updated);
    localStorage.setItem("local_racks", JSON.stringify(updated));
    setNewRack({ code: "", floor: "", capacity: "50%" });
  };

  // Fungsi Tambah Tipe Baru
  const addType = (e) => {
    e.preventDefault();
    if (!newType.name) return;
    const updated = [...types, { name: newType.name, desc: newType.desc }];
    setTypes(updated);
    localStorage.setItem("local_types", JSON.stringify(updated));
    setNewType({ name: "", desc: "" });
  };

  // Penghitung Relasi Jumlah Produk secara Dinamis
  const getProductCountByBrand = (brandName) => {
    return productList.filter(p => (p.brand || "").toLowerCase() === brandName.toLowerCase()).length;
  };

  const getProductCountByType = (typeName) => {
    return productList.filter(p => (p.type || "").toLowerCase() === typeName.toLowerCase()).length;
  };

  return (
    <div 
      className="p-8 bg-[#F8F9FB] min-h-screen text-left select-none"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
        .font-master-title { font-family: 'Poppins', sans-serif !important; font-weight: 700 !important; }
      `}</style>

      {/* 1. TITLE SECTION */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-950 font-master-title">
          {activeTab}
        </h1>
        {activeTab === "Product List" && (
          <button onClick={fetchProducts} className="px-4 py-2.5 bg-white border border-gray-150 rounded-xl hover:bg-slate-50 text-gray-500 flex items-center gap-1.5 text-xs font-semibold shadow-inner cursor-pointer">
            <MdRefresh size={16} className={loading ? "animate-spin text-blue-500" : "text-gray-300"} /> Sync Data
          </button>
        )}
      </div>

      {/* Tabs Menu Navigasi */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
        {["Product List", "Manage Brands", "Manage Categories", "Manage Product Raks", "Mange Type"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeTab === tab ? "bg-teal-950 text-white shadow-xs" : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"}`}>{tab}</button>
        ))}
      </div>

      {/* 2. MAIN CARD CONTAINER */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-200/60 overflow-hidden">
        
        {/* --- VIEW 1: PRODUCT LIST --- */}
        {activeTab === "Product List" && (
          <>
            <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-50 bg-white">
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cari Obat</span>
                  <input type="text" placeholder="Nama obat..." value={searchName} onChange={(e) => setSearchName(e.target.value)} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-44 outline-none focus:bg-white" />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Code</span>
                  <input type="text" placeholder="e.g. PRC-001..." value={searchCode} onChange={(e) => setSearchCode(e.target.value)} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-44 outline-none focus:bg-white" />
                </div>
                <button onClick={fetchProducts} className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-xl text-gray-500 cursor-pointer self-end"><MdSearch size={18} /></button>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="bg-teal-950 hover:bg-teal-900 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"><MdAdd size={18} /> ADD PRODUCT</button>
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
                  {productList.length > 0 ? (
                    productList.map((item, i) => (
                      <tr key={item.id || i} className="hover:bg-[#F9FAFB]/60 transition-colors">
                        <td className="pl-6 pr-4 py-4 text-center text-gray-450 font-mono">{i + 1}</td>
                        <td className="px-4 py-4 text-slate-500 font-medium">{item.supplier}</td>
                        <td className="px-4 py-4 font-bold text-teal-950">{item.name}</td>
                        <td className="px-4 py-4 text-slate-400 font-medium">{item.brand || "-"}</td>
                        <td className="px-4 py-4 text-slate-500 font-mono">{item.code || "-"}</td>
                        <td className="px-4 py-4 text-slate-450 font-medium">{item.type || "-"}</td>
                        <td className="px-4 py-4 text-slate-400 font-mono">{item.expiry || "-"}</td>
                        <td className="px-4 py-4 font-bold text-amber-700">{item.price}</td>
                        <td className="pl-4 pr-6 py-4">
                          <div className="flex justify-center items-center gap-2">
                            <button className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-slate-100 cursor-pointer"><MdVisibility size={16} /></button>
                            <button className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:text-amber-700 hover:bg-slate-100 cursor-pointer"><MdEdit size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-12 text-gray-400 text-sm">Obat tidak ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- VIEW 2: MANAGE BRANDS --- */}
        {activeTab === "Manage Brands" && (
          <div>
            {/* Form Input Brand */}
            <form onSubmit={addBrand} className="p-6 bg-[#faf8f5]/20 border-b border-gray-50 flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama Merek / Brand</span>
                <input type="text" placeholder="Kalbe Farma, Sanbe..." required value={newBrand.name} onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-60 outline-none focus:bg-white" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deskripsi</span>
                <input type="text" placeholder="Produsen multinasional..." value={newBrand.desc} onChange={(e) => setNewBrand({ ...newBrand, desc: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-96 outline-none focus:bg-white" />
              </div>
              <button type="submit" className="bg-teal-950 hover:bg-teal-900 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer">ADD BRAND</button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB]/50 border-b border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <th className="pl-6 pr-4 py-4 w-12 text-center">No</th>
                    <th className="px-4 py-4">Nama Merek</th>
                    <th className="px-4 py-4">Deskripsi</th>
                    <th className="px-4 py-4 text-center">Total Produk Obat</th>
                    <th className="pl-4 pr-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-gray-50">
                  {brands.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F9FAFB]/60 transition-colors">
                      <td className="pl-6 pr-4 py-4 text-center font-mono text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-4 font-bold text-teal-950">{item.name}</td>
                      <td className="px-4 py-4 text-slate-500 font-medium">{item.desc || "-"}</td>
                      <td className="px-4 py-4 text-center font-extrabold text-teal-950">{getProductCountByBrand(item.name)} Obat</td>
                      <td className="pl-4 pr-6 py-4 text-right">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2.5 py-1 rounded-full">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VIEW 3: MANAGE CATEGORIES --- */}
        {activeTab === "Manage Categories" && (
          <div>
            <form onSubmit={addCategory} className="p-6 bg-[#faf8f5]/20 border-b border-gray-50 flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama Kategori</span>
                <input type="text" placeholder="Obat Keras, Vitamin..." required value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-60 outline-none focus:bg-white" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deskripsi</span>
                <input type="text" placeholder="Deskripsi ringkas..." value={newCategory.desc} onChange={(e) => setNewCategory({ ...newCategory, desc: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-96 outline-none focus:bg-white" />
              </div>
              <button type="submit" className="bg-teal-950 hover:bg-teal-900 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer">ADD CATEGORY</button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB]/50 border-b border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <th className="pl-6 pr-4 py-4 w-12 text-center">No</th>
                    <th className="px-4 py-4">Nama Kategori</th>
                    <th className="pl-4 pr-6 py-4">Deskripsi</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-gray-50">
                  {categories.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F9FAFB]/60 transition-colors">
                      <td className="pl-6 pr-4 py-4 text-center font-mono text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-4 font-bold text-teal-950">{item.name}</td>
                      <td className="pl-4 pr-6 py-4 text-slate-500 font-medium">{item.desc || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VIEW 4: MANAGE PRODUCT RACKS --- */}
        {activeTab === "Manage Product Raks" && (
          <div>
            <form onSubmit={addRack} className="p-6 bg-[#faf8f5]/20 border-b border-gray-50 flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kode Rak</span>
                <input type="text" placeholder="Rak A-1, Rak D-3..." required value={newRack.code} onChange={(e) => setNewRack({ ...newRack, code: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-44 outline-none focus:bg-white" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Lokasi / Lantai</span>
                <input type="text" placeholder="Lantai 1 - Depan..." required value={newRack.floor} onChange={(e) => setNewRack({ ...newRack, floor: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-60 outline-none focus:bg-white" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kapasitas Rak</span>
                <select value={newRack.capacity} onChange={(e) => setNewRack({ ...newRack, capacity: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-36 outline-none focus:bg-white cursor-pointer">
                  <option value="20%">20% (Hampir Kosong)</option>
                  <option value="50%">50% (Setengah Isi)</option>
                  <option value="80%">80% (Hampir Penuh)</option>
                  <option value="100%">100% (Penuh)</option>
                </select>
              </div>
              <button type="submit" className="bg-teal-950 hover:bg-teal-900 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer">ADD RACK</button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB]/50 border-b border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <th className="pl-6 pr-4 py-4 w-12 text-center">No</th>
                    <th className="px-4 py-4">Kode Lokasi Rak</th>
                    <th className="px-4 py-4">Lantai Penempatan</th>
                    <th className="pl-4 pr-6 py-4 text-right">Kapasitas Terisi</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-gray-50">
                  {racks.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F9FAFB]/60 transition-colors">
                      <td className="pl-6 pr-4 py-4 text-center font-mono text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-4 font-bold text-teal-950">{item.code}</td>
                      <td className="px-4 py-4 text-slate-500 font-medium">{item.floor}</td>
                      <td className="pl-4 pr-6 py-4 text-right">
                        <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${
                          item.capacity === "90%" || item.capacity === "80%"
                            ? "bg-rose-50 text-rose-800 border-rose-100" 
                            : "bg-emerald-50 text-emerald-800 border-emerald-100"
                        }`}>{item.capacity}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VIEW 5: MANAGE TYPE --- */}
        {activeTab === "Mange Type" && (
          <div>
            <form onSubmit={addType} className="p-6 bg-[#faf8f5]/20 border-b border-gray-50 flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama Tipe Sediaan</span>
                <input type="text" placeholder="Kapsul, Tablet, Injeksi..." required value={newType.name} onChange={(e) => setNewType({ ...newType, name: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-60 outline-none focus:bg-white" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deskripsi</span>
                <input type="text" placeholder="Kemasan padat..." value={newType.desc} onChange={(e) => setNewType({ ...newType, desc: e.target.value })} className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-96 outline-none focus:bg-white" />
              </div>
              <button type="submit" className="bg-teal-950 hover:bg-teal-900 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer">ADD TYPE</button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB]/50 border-b border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <th className="pl-6 pr-4 py-4 w-12 text-center">No</th>
                    <th className="px-4 py-4">Nama Tipe Sediaan</th>
                    <th className="px-4 py-4">Deskripsi</th>
                    <th className="pl-4 pr-6 py-4 text-right">Total Produk Obat</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-gray-50">
                  {types.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F9FAFB]/60 transition-colors">
                      <td className="pl-6 pr-4 py-4 text-center font-mono text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-4 font-bold text-teal-950">{item.name}</td>
                      <td className="px-4 py-4 text-slate-500 font-medium">{item.desc || "-"}</td>
                      <td className="pl-4 pr-6 py-4 text-right font-extrabold text-teal-950">{getProductCountByType(item.name)} Obat</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. PAGINATION (Hanya Tampil di Tab List Utama) */}
        {activeTab === "Product List" && (
          <div className="px-8 py-8 flex justify-center md:justify-end border-t border-gray-50">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-300 hover:text-gray-650 cursor-pointer"><MdChevronLeft size={20} /></button>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg bg-teal-950 text-white text-xs font-bold shadow-sm cursor-pointer">1</button>
                <button className="w-8 h-8 rounded-lg text-xs font-semibold text-gray-400 hover:bg-gray-50 cursor-pointer">2</button>
                <button className="w-8 h-8 rounded-lg text-xs font-semibold text-gray-400 hover:bg-gray-50 cursor-pointer">3</button>
              </div>
              <button className="p-2 text-gray-450 hover:text-gray-650 cursor-pointer"><MdChevronRight size={20} /></button>
            </div>
          </div>
        )}

      </div>
      <AddDrugModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRefresh={handleAddNewProductState} />
    </div>
  );
}