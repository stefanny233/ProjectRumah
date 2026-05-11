import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { MdAdd, MdSettings, MdMoreVert, MdClose } from "react-icons/md";
import dataApotek from "../data/dataApotek.json";

export default function Product() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 8;

  const { products } = dataApotek;

  // Sinkronisasi Tab agar tidak Error 404
  const getActiveTab = () => {
    if (location.pathname.includes("/category")) return "Manage Categories";
    if (location.pathname.includes("/brand")) return "Manage Brands";
    return "Product List";
  };

  const activeTab = getActiveTab();

  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cat.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative">
      {/* === MODAL INPUT DATA === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black text-gray-800 italic uppercase tracking-tighter">
                    Add New Drug
                  </h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Pharmacy Master Data
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <MdClose size={24} />
                </button>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                    Drug Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Napa 500mg"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                    Brand
                  </label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none">
                    <option>Select Brand</option>
                    <option>Beximco</option>
                    <option>Square</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                    Category
                  </label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none">
                    <option>Select Category</option>
                    <option>Tablet</option>
                    <option>Syrup</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                    Sale Price
                  </label>
                  <input
                    type="text"
                    placeholder="Rp 0"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                  />
                </div>

                <div className="md:col-span-2 pt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black italic uppercase text-xs tracking-widest hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-black italic uppercase text-xs tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all"
                  >
                    Save Drug Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* HEADER UTAMA */}
      <PageHeader
        title={
          activeTab === "Product List"
            ? "Katalog Produk"
            : activeTab.replace("Manage ", "")
        }
        breadcrumb="Katalog"
        onSearch={setSearchTerm}
      >
        <div className="flex gap-3">
          <button className="bg-white border-2 border-gray-100 p-3.5 rounded-2xl text-gray-400 hover:text-emerald-600 transition-all shadow-sm">
            <MdSettings size={22} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-xl shadow-emerald-100 hover:bg-emerald-700 hover:scale-105 transition-all flex items-center italic uppercase text-sm tracking-widest"
          >
            <MdAdd className="mr-2 text-xl" /> Quick Add
          </button>
        </div>
      </PageHeader>

      {/* TABS VISUAL */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-gray-100 pb-2">
        <div className="flex gap-8 overflow-x-auto w-full no-scrollbar">
          {["Product List", "Manage Categories", "Manage Brands"].map((tab) => (
            <div
              key={tab}
              className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? "text-emerald-600"
                  : "text-gray-300 hover:text-gray-500"
              }`}
            >
              {tab === "Product List"
                ? "Product List"
                : tab.replace("Manage ", "")}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-600 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RENDER CONTENT */}
      {activeTab === "Product List" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentItems.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${
                    currentPage === i + 1
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                      : "bg-white text-gray-400 border border-gray-100 hover:border-emerald-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        /* UI UNTUK CATEGORY / BRAND */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex justify-between items-center group hover:border-emerald-500 transition-all"
            >
              <div>
                <h4 className="font-black text-gray-800 uppercase italic tracking-tighter">
                  {activeTab.replace("Manage ", "")} Item {item}
                </h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Master Data
                </p>
              </div>
              <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <MdMoreVert size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- SUB KOMPONEN: CARD PRODUK ---
function ProductCard({ product }) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-emerald-500 transition-all group relative overflow-hidden">
      {/* Badge Stok */}
      <div className="absolute top-5 right-5 z-10">
        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full uppercase border border-emerald-100">
          STOK: {product.stock}
        </span>
      </div>

      {/* Image Wrapper */}
      <div className="h-44 flex items-center justify-center mb-6 bg-gray-50/50 rounded-[2rem] group-hover:scale-105 transition-transform duration-500">
        <img
          src={product.image}
          alt={product.name}
          className="h-28 object-contain drop-shadow-xl"
        />
      </div>

      {/* Info Produk */}
      <div className="space-y-1">
        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">
          {product.cat}
        </p>
        <h4 className="font-black text-gray-800 uppercase italic tracking-tighter leading-tight group-hover:text-emerald-600 transition-colors min-h-[40px] text-lg">
          {product.name}
        </h4>

        <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-50">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase">
              Harga Satuan
            </p>
            <p className="font-black text-xl text-gray-900 tracking-tighter">
              {product.price}
            </p>
          </div>
          <button className="p-3 bg-gray-900 text-white rounded-2xl hover:bg-emerald-600 transition-all hover:rotate-12 shadow-lg">
            <MdAdd size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
