import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { MdAdd, MdClose, MdLocalPharmacy, MdLabel } from "react-icons/md";

// --- IMPORT DATA DARI JSON ---
import dataApotek from "../data/dataApotek.json";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. TAMBAHKAN STATE SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  
  const { products } = dataApotek;

  // 2. TAMBAHKAN LOGIC FILTER (Berdasarkan nama dan kategori)
  const _searchTerm = searchTerm.toLowerCase();
  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(_searchTerm) || 
      p.cat.toLowerCase().includes(_searchTerm)
    );
  });

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      {/* HEADER - Tambahkan props onSearch */}
      <PageHeader 
        title="Katalog Produk" 
        breadcrumb="Product" 
        onSearch={setSearchTerm} // Mengirim fungsi ke Header
      >
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:scale-105 active:scale-95 transition-all flex items-center italic uppercase text-sm tracking-widest"
        >
          <MdAdd className="mr-2 text-xl" /> Tambah Obat
        </button>
      </PageHeader>

      {/* GRID PRODUK - Ubah mapping ke filteredProducts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] border border-garis p-2 hover:border-primary transition-all group shadow-sm hover:shadow-xl hover:-translate-y-2 duration-500">
              {/* Image Container */}
              <div className="aspect-square bg-latar rounded-[2rem] mb-4 flex items-center justify-center p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-contain relative z-10 group-hover:rotate-12 transition-transform duration-500"
                  />
              </div>

              <div className="px-5 pb-6">
                  <div className="flex items-center gap-1 mb-2">
                      <MdLabel className="text-primary text-xs" />
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{p.cat}</p>
                  </div>
                  <h4 className="font-black text-teks text-xl mb-1 truncate">{p.name}</h4>
                  <p className="text-xs font-bold text-teks-samping mb-5 italic">Ready Stock: {p.stock} Unit</p>
                  
                  <div className="flex justify-between items-center border-t border-garis pt-5">
                      <div className="flex flex-col">
                          <span className="text-[9px] font-black text-teks-samping uppercase tracking-widest">Harga</span>
                          <span className="font-black text-lg text-teks tracking-tighter">{p.price}</span>
                      </div>
                      <button className="bg-latar hover:bg-primary hover:text-white p-3 rounded-xl text-primary transition-all font-bold text-xs uppercase tracking-widest">
                          Edit
                      </button>
                  </div>
              </div>
            </div>
          ))
        ) : (
          // Pesan jika produk tidak ditemukan
          <div className="col-span-full py-20 text-center">
            <p className="text-teks-samping font-bold italic">Obat "{searchTerm}" tidak ditemukan...</p>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH PRODUK (Tetap sama) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-teks/40 backdrop-blur-md" 
            onClick={() => setIsModalOpen(false)} 
          />
          <div className="relative bg-white w-full max-w-md rounded-[3.5rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-3xl font-black text-teks italic uppercase tracking-tighter">New Product</h3>
                <p className="text-sm text-teks-samping font-medium">Input data obat ke sistem</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-12 h-12 flex items-center justify-center bg-latar rounded-2xl text-teks-samping hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <MdClose size={28} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="ml-2 text-[10px] font-black uppercase text-teks-samping tracking-widest">Nama Produk</label>
                <input type="text" className="w-full px-7 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold transition-all" placeholder="Misal: Vitamin C" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="ml-2 text-[10px] font-black uppercase text-teks-samping tracking-widest">Kategori</label>
                    <select className="w-full px-5 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold appearance-none transition-all">
                        <option>Obat Bebas</option>
                        <option>Obat Keras</option>
                        <option>Alat Medis</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="ml-2 text-[10px] font-black uppercase text-teks-samping tracking-widest">Stok Awal</label>
                    <input type="number" className="w-full px-5 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold transition-all" placeholder="0" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="ml-2 text-[10px] font-black uppercase text-teks-samping tracking-widest">Harga Jual (Rp)</label>
                <input type="text" className="w-full px-7 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold transition-all" placeholder="0" />
              </div>

              <button className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg mt-4 shadow-xl shadow-emerald-100 hover:bg-primary-hover hover:-translate-y-1 transition-all uppercase tracking-[0.2em]">
                Simpan Katalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}