import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  MdSearch,
  MdTrendingUp,
  MdInventory,
  MdAttachMoney,
  MdClose,
  MdEdit,
  MdDelete,
  MdPrint,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// --- IMPORT DATA DUMMY DARI JSON ---
import dataApotek from "../data/dataApotek.json";

export default function Dashboard() {
  // --- 1. STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Ambil data langsung dari file JSON
  const { obatList, chartData } = dataApotek;

  // --- 2. LOGIC FILTER SEARCH ---
  const filteredObat = obatList.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.produsen.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      {/* HEADER SECTION */}
      <PageHeader title="Dashboard Overview" breadcrumb="Dashboard">
        <button
          onClick={() => setIsReportOpen(true)}
          className="bg-white text-primary border-2 border-primary px-8 py-3.5 rounded-2xl font-bold shadow-sm hover:bg-primary hover:text-white transition-all flex items-center italic"
        >
          <MdTrendingUp className="mr-2 text-xl" /> Cetak Laporan
        </button>
      </PageHeader>

      {/* TOP SECTION: STATS & CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
          {/* Card Total Pendapatan */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-garis shadow-sm flex items-center gap-6 group hover:border-primary transition-all">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white transition-all">
              <MdAttachMoney />
            </div>
            <div>
              <p className="text-teks-samping text-sm font-medium">Total Pendapatan</p>
              <h4 className="text-2xl font-extrabold text-teks">Rp 12.5M</h4>
            </div>
          </div>

          {/* Card Stok Aktif */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-garis shadow-sm flex items-center gap-6 group hover:border-blue-500 transition-all">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-500 group-hover:text-white transition-all">
              <MdInventory />
            </div>
            <div>
              <p className="text-teks-samping text-sm font-medium">Stok Obat Aktif</p>
              <h4 className="text-2xl font-extrabold text-teks">1,240 unit</h4>
            </div>
          </div>
        </div>

        {/* Chart Section (Data unik dipertahankan) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-garis shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-xl text-teks">Tren Penjualan Mingguan</h3>
              <p className="text-xs text-teks-samping">Data update setiap jam 12 malam</p>
            </div>
            <div className="bg-emerald-50 px-4 py-2 rounded-xl text-primary font-bold text-sm flex items-center gap-2">
              <MdTrendingUp /> +12.5%
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: "15px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="sales" fill="#10B981" radius={[8, 8, 8, 8]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: TABLE */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-garis p-8">
        <div className="flex flex-col md:flex-row justify-between items-md-center mb-8 gap-4">
          <h3 className="text-xl font-bold text-teks">Manajemen Stok Terbaru</h3>
          <div className="relative group">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-teks-samping text-xl group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Cari nama atau produsen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-latar border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white w-full md:w-96 transition-all text-sm shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-xs font-bold text-teks-samping uppercase tracking-[0.2em]">
                <th className="pb-4 pl-8 text-center">ID</th>
                <th className="pb-4">Informasi Produk</th>
                <th className="pb-4">Produsen</th>
                <th className="pb-4">Harga Satuan</th>
                <th className="pb-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredObat.length > 0 ? (
                filteredObat.map((item) => (
                  <tr key={item.id} className="group hover:bg-latar/50 transition-all">
                    <td className="py-5 pl-8 text-center rounded-l-[1.5rem] font-bold text-primary italic bg-latar/30">{item.id}</td>
                    <td className="py-5 font-bold text-teks">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center font-black text-lg shadow-sm`}>{item.initial}</div>
                        <span className="group-hover:text-primary transition-colors">{item.nama}</span>
                      </div>
                    </td>
                    <td className="py-5 text-teks-samping font-semibold">{item.produsen}</td>
                    <td className="py-5 font-extrabold text-teks">Rp {item.harga.toLocaleString("id-ID")}</td>
                    <td className="py-5 rounded-r-[1.5rem] text-center bg-latar/30">
                      <div className="flex justify-center gap-2">
                        <button className="p-2.5 bg-white text-primary rounded-xl shadow-sm border border-garis hover:bg-primary hover:text-white transition-all"><MdEdit size={18} /></button>
                        <button className="p-2.5 bg-white text-red-500 rounded-xl shadow-sm border border-garis hover:bg-red-500 hover:text-white transition-all"><MdDelete size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-20 italic">Obat "{searchTerm}" tidak ditemukan...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PREVIEW LAPORAN */}
      {isReportOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-teks/40 backdrop-blur-md" onClick={() => setIsReportOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="bg-latar p-8 border-b border-garis flex justify-between items-center">
              <h3 className="text-2xl font-black italic">Preview Laporan</h3>
              <button onClick={() => setIsReportOpen(false)} className="text-teks-samping hover:text-red-500"><MdClose size={28} /></button>
            </div>
            <div className="p-8 space-y-4">
              <div className="border-2 border-dashed border-garis rounded-3xl p-6 bg-gray-50/50">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-teks-samping">Total Revenue</span>
                  <span className="font-bold text-primary">Rp 12.500.000</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-teks-samping">Transaksi</span>
                  <span className="font-bold text-teks">142 Pesanan</span>
                </div>
                <div className="pt-4 border-t border-garis flex justify-center italic text-[10px] text-teks-samping">
                  Laporan otomatis tanggal: {new Date().toLocaleDateString('id-ID')}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-hover transition-all shadow-lg shadow-emerald-100">
                  <MdPrint size={20} /> Print PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}