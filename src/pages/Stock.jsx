import React, { useState } from "react";
import {
  MdSearch,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineFileDownload,
  MdClose
} from "react-icons/md";

// Membaca data asli dari JSON
import dataApotek from "../data/dataApotek.json";

/* -------------------------------------------------
   MODAL – Preview & Ekspor Laporan Stok
------------------------------------------------- */
const ExportModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const totalQty = data.reduce((sum, item) => sum + (item.stock || 0), 0);
  const totalValue = data.reduce((sum, item) => sum + ((item.stock || 0) * 2500), 0);
  const adminName = localStorage.getItem("userName") || "Admin Apotek";

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate isi data CSV secara dinamis
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Medicine Name,Strength,Batch,Expiry Date,Stock,Est. Value (IDR)\r\n";
    data.forEach(item => {
      const val = (item.stock || 0) * 2500;
      csvContent += `"${item.name}","${item.strength}","${item.batch}","${item.expiry}",${item.stock},${val}\r\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Stok_Apotek_${new Date().toLocaleDateString("id-ID")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans text-left">
      <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-amber-500/10">
        
        {/* Header Preview */}
        <div className="px-8 py-5 flex justify-between items-center border-b border-gray-150/60 bg-[#faf8f5]/40">
          <h2 className="text-lg font-bold text-teal-950 font-master-title">Preview Laporan Stok</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-650 cursor-pointer">
            <MdClose size={20} />
          </button>
        </div>

        {/* Isi Rincian Laporan */}
        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Metadata Cetak */}
          <div className="grid grid-cols-2 gap-4 bg-[#faf8f5] p-5 rounded-2xl border border-amber-200/20">
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tanggal Cetak</p>
              <p className="text-xs font-bold text-teal-950 font-mono">{new Date().toLocaleString("id-ID")}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Petugas / Operator</p>
              <p className="text-xs font-bold text-teal-950 uppercase">{adminName}</p>
            </div>
            <div className="mt-2">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Varian Obat</p>
              <p className="text-xs font-bold text-teal-950">{data.length} Item</p>
            </div>
            <div className="mt-2">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Unit Stok di Rak</p>
              <p className="text-xs font-bold text-teal-950">{totalQty} Unit</p>
            </div>
          </div>

          {/* Kotak Nilai Aset */}
          <div className="bg-teal-950 text-white p-5 rounded-2xl flex justify-between items-center shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Total Nilai Aset Inventaris</span>
            <span className="text-xl font-black text-white">Rp {totalValue.toLocaleString("id-ID")}</span>
          </div>

          {/* Tabel Sampel Data */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] text-gray-400 font-bold uppercase">
                  <th className="px-4 py-3">Nama Obat</th>
                  <th className="px-4 py-3">Batch</th>
                  <th className="px-4 py-3 text-center">Stok</th>
                  <th className="px-4 py-3 text-right">Taksiran Nilai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.slice(0, 5).map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-teal-950">{item.name}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{item.batch}</td>
                    <td className="px-4 py-3 text-center font-bold text-slate-700">{item.stock}</td>
                    <td className="px-4 py-3 text-right font-semibold text-amber-700">Rp {((item.stock || 0) * 2500).toLocaleString("id-ID")}</td>
                  </tr>
                ))}
                {data.length > 5 && (
                  <tr>
                    <td colSpan="4" className="text-center py-2 text-[10px] text-slate-400 italic bg-gray-50/50">...dan {data.length - 5} item obat lainnya...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="px-8 pb-8 pt-4 flex gap-4 border-t border-gray-50 bg-[#faf8f5]/20">
          <button onClick={onClose} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-500 font-medium py-3.5 rounded-xl text-xs cursor-pointer">Batal</button>
          <button onClick={handleDownload} className="flex-1 bg-teal-900 hover:bg-teal-950 text-white font-bold py-3.5 rounded-xl text-xs shadow-md cursor-pointer transition-colors">Download CSV</button>
          <button onClick={handlePrint} className="flex-1 bg-amber-400 hover:bg-amber-300 text-teal-950 font-bold py-3.5 rounded-xl text-xs shadow-md cursor-pointer transition-colors">Cetak PDF</button>
        </div>
      </div>
    </div>
  );
};


export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { inventory } = dataApotek;

  // Filter pencarian berdasarkan nama obat
  const filteredData = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans text-slate-855 antialiased text-left select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-master-title { font-family: 'Poppins', sans-serif !important; font-weight: 700 !important; }
      `}</style>

      {/* 1. TITLE SECTION */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-teal-950 font-master-title">
          Stock Report
        </h1>
      </div>

      {/* 2. CARD CONTAINER */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-200/60 overflow-hidden">
        
        {/* Table Top Controls & Search */}
        <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-50 bg-white">
          <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cari Nama Obat</span>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Nama obat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-64 outline-none focus:bg-white"
                />
                <button className="absolute right-2 text-gray-400 hover:text-teal-950 cursor-pointer">
                  <MdSearch size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsExportOpen(true)}
            className="bg-teal-950 hover:bg-teal-900 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <MdOutlineFileDownload size={18} className="text-amber-400" />
            EXPORT REPORT
          </button>
        </div>

        {/* 3. TABLE SECTION */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB]/50 border-b border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <th className="pl-6 pr-4 py-4">Medicine Name</th>
                <th className="px-4 py-4">Strength</th>
                <th className="px-4 py-4">Batch</th>
                <th className="px-4 py-4">Expiry Date</th>
                <th className="px-4 py-4 text-center">In Qty</th>
                <th className="px-4 py-4 text-center">Out Qty</th>
                <th className="px-4 py-4 text-center">Stock</th>
                <th className="px-4 py-4 text-center">Box</th>
                <th className="pl-4 pr-6 py-4 text-right">Est. Value (IDR)</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-50">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-[#F9FAFB]/60 transition-colors">
                    <td className="pl-6 pr-4 py-4 font-bold text-teal-950">{item.name}</td>
                    <td className="px-4 py-4 text-slate-500 font-medium">{item.strength}</td>
                    <td className="px-4 py-4 text-slate-400 font-mono">{item.batch}</td>
                    <td className="px-4 py-4 text-slate-400 font-mono">{item.expiry}</td>
                    <td className="px-4 py-4 text-slate-500 font-medium text-center">{item.inQty}</td>
                    <td className="px-4 py-4 text-slate-500 font-medium text-center">{item.outQty}</td>
                    <td className="px-4 py-4 font-extrabold text-teal-950 text-center">{item.stock}</td>
                    <td className="px-4 py-4 text-slate-450 font-medium text-center">{item.box}</td>
                    <td className="pl-4 pr-6 py-4 font-bold text-amber-700 text-right">
                      {(item.stock * 2500).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-12 text-gray-400 text-sm font-normal">
                    Obat tidak ditemukan di rak inventaris.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION */}
        <div className="px-8 py-6 flex justify-center md:justify-end border-t border-gray-50">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-300 hover:text-gray-650 cursor-pointer">
              <MdChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-teal-950 text-white text-xs font-bold shadow-sm cursor-pointer">
                1
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-semibold text-gray-400 hover:bg-gray-50 cursor-pointer">
                2
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-semibold text-gray-400 hover:bg-gray-50 cursor-pointer">
                3
              </button>
            </div>
            <button className="p-2 text-gray-450 hover:text-gray-650 cursor-pointer">
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* RENDER MODAL EKSPOR PREVIEW */}
      <ExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        data={filteredData} 
      />
    </div>
  );
}