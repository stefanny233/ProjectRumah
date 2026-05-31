import React, { useState } from "react";
import { 
  MdMenu, 
  MdPersonAddAlt1, 
  MdOutlineQrCodeScanner, 
  MdNotificationsNone,
  MdAdd
} from "react-icons/md";

export default function Dispenser() {
  const categories = ["All", "Medicine", "Syrup", "Liquid", "Tablet", "Oointment", "Cream"];
  const [activeTab, setActiveTab] = useState("All");

  // Array berisi 12 item obat (Bacitracin $09.00) dengan variasi warna latar belakang yang estetik sesuai mockup Figma
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Bacitracin",
    price: "$09.00",
    bgStyle: [
      "bg-sky-200", "bg-pink-300", "bg-sky-100", "bg-rose-200", "bg-sky-300", "bg-slate-300",
      "bg-blue-300", "bg-orange-300", "bg-stone-100", "bg-amber-100", "bg-cyan-200", "bg-amber-200"
    ][i % 12]
  }));

  return (
    <div className="w-full min-h-screen bg-[#F8F9FB] font-sans antialiased text-gray-600 p-2 select-none">
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] border border-gray-100 p-6">
        
        {/* TOP SUB-HEADER BAR (Sesuai Gambar POS Atas) */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors"><MdMenu size={22} /></button>
            <button className="bg-[#28B95E] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs hover:bg-green-600 transition-colors">
              New Sale
            </button>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-gray-600 transition-colors"><MdOutlineQrCodeScanner size={22} /></button>
            <div className="relative cursor-pointer">
              <button className="text-gray-400 hover:text-gray-600 transition-colors"><MdNotificationsNone size={22} /></button>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="avatar" 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div className="text-left">
                <p className="text-xs font-bold text-gray-800 leading-tight">Thomas F</p>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5">Admin ▾</p>
              </div>
            </div>
          </div>
        </div>

        {/* JUDUL UTAMA PAGE */}
        <h2 className="text-2xl font-normal text-gray-500 tracking-tight mb-5">Point Of Sale</h2>

        {/* LAYOUT KONTEN UTAMA (GRID SISTEM) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          
          {/* SISI KIRI: DATA PILIHAN OBAT & FILTERS */}
          <div className="xl:col-span-2 flex flex-col gap-4">
            
            {/* Bagian Pil Kategori Obat */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                    activeTab === cat 
                      ? "bg-[#3b52f6] text-white shadow-xs" 
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button className="p-1.5 bg-[#28B95E] text-white rounded-md hover:bg-green-600 transition-colors">
                <MdAdd size={16} />
              </button>
            </div>

            {/* Bagian Bar Pencarian & Nama Pelanggan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="search anythings" 
                className="bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-2 text-xs font-medium placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
              />
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  defaultValue="Walking Customer" 
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-lg pl-4 pr-10 py-2 text-xs font-bold text-gray-400 focus:outline-none"
                />
                <button className="absolute right-1.5 p-1.5 bg-[#3b52f6] text-white rounded-md hover:bg-blue-700 transition-colors">
                  <MdPersonAddAlt1 size={14} />
                </button>
              </div>
            </div>

            {/* GRID DATA KATALOG PRODUK KOTAK-KOTAK (Presisi Maksimal) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pr-1">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col relative group hover:shadow-md transition-all">
                  {/* Container Gambar Mini Kotak */}
                  <div className={`h-24 ${p.bgStyle} relative flex items-center justify-center p-2 transition-opacity group-hover:opacity-90`}>
                    <button className="absolute bottom-2 right-2 w-5 h-5 bg-white rounded-md flex items-center justify-center text-gray-300 shadow-xs hover:text-[#28B95E] transition-colors">
                      <MdAdd size={14} />
                    </button>
                  </div>
                  {/* Teks Deskripsi Obat */}
                  <div className="p-2.5 text-left bg-white">
                    <p className="text-[11px] font-bold text-gray-700 truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SISI KANAN: OVERVIEW STRUK / NOTA BELANJAAN (Sangat Akurat) */}
          <div className="bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] rounded-2xl p-5 flex flex-col justify-between min-h-[520px]">
            
            {/* Blok Atas: List Rincian Belanja */}
            <div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
                <h3 className="text-sm font-bold text-gray-700 tracking-tight">Overview</h3>
                <span className="text-[10px] font-bold text-gray-300">26 Feb 2022 at 1:05 pm</span>
              </div>

              {/* Sub-Title Kolom */}
              <div className="grid grid-cols-3 text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-3">
                <span>Medicine Name</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total Price</span>
              </div>

              {/* Item Keranjang Aktif */}
              <div className="flex flex-col gap-3.5">
                {[
                  { name: "Antiva 50ml", qty: 12, price: "$350" },
                  { name: "Ketoporfen 30gm", qty: 5, price: "$350" },
                  { name: "Tramadol 50mg", qty: 4, price: "$32.00" }
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-3 items-center text-xs font-medium text-gray-600">
                    <span className="font-bold text-gray-700 truncate">{item.name}</span>
                    <div className="flex items-center justify-center gap-2.5 bg-gray-50/50 border border-gray-100 rounded-md py-0.5 px-1.5 w-max mx-auto">
                      <button className="text-gray-300 text-sm font-bold px-0.5 hover:text-gray-600 transition-colors">-</button>
                      <span className="text-[11px] font-bold text-gray-700 px-0.5">{item.qty < 10 ? `0${item.qty}` : item.qty}</span>
                      <button className="text-gray-300 text-sm font-bold px-0.5 hover:text-gray-600 transition-colors">+</button>
                    </div>
                    <div className="text-right font-bold text-gray-700 flex items-center justify-end gap-2">
                      <span>{item.price}</span>
                      <button className="text-gray-300 hover:text-rose-500 transition-colors text-[9px] font-normal">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blok Bawah: Form Pembayaran & Tombol Eksekusi */}
            <div className="border-t border-gray-50 pt-4 mt-6">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Payment</h4>
              
              <div className="flex flex-col gap-2.5 text-xs font-medium text-gray-400 pb-4">
                <div className="flex justify-between text-gray-600"><span>Net Total</span><span className="font-bold text-gray-700">$123.00</span></div>
                <div className="flex justify-between"><span>Discount</span><span>00.00</span></div>
                <div className="flex justify-between"><span>Previous:</span><span>00.00</span></div>
                <div className="flex justify-between"><span>Paid Amount</span><span>00.00</span></div>
                <div className="flex justify-between"><span>Due Amount</span><span>00.00</span></div>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-bold text-gray-400">Payment Type</span>
                  <select className="bg-gray-50 border border-gray-100 rounded-md text-xs py-1 px-2 focus:outline-none font-bold text-gray-500 cursor-pointer">
                    <option>Cash</option>
                    <option>Bank</option>
                    <option>QRIS</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons: Reset & Save */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <button className="col-span-1 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-500 font-bold py-2.5 rounded-xl text-xs transition-colors">
                  Reset
                </button>
                <button className="col-span-2 bg-[#28B95E] text-white hover:bg-green-600 font-bold py-2.5 rounded-xl text-xs shadow-xs transition-colors">
                  Save
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}