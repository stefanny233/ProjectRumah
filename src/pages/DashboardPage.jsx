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
  MdLocalPharmacy,
  MdPeople,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";

// --- IMPORT DATA DUMMY ---
import dataApotek from "../data/dataApotek.json";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);

  const { obatList, chartData } = dataApotek;

  const filteredObat = obatList.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.produsen.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      {/* HEADER SECTION */}
      <PageHeader title="Ringkasan Apotek" breadcrumb="Dashboard">
        <button
          onClick={() => setIsReportOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center gap-2 text-sm"
        >
          <MdPrint className="text-xl" /> Cetak Laporan
        </button>
      </PageHeader>

      {/* STATS CARDS - DESAIN ELEGAN & CLEAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Card 1: Total Pendapatan */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl">
              <MdAttachMoney />
            </div>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
              +12%
            </span>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Total Pendapatan
            </p>
            <h4 className="text-2xl font-bold text-gray-800 mt-1">
              Rp 12.500.000
            </h4>
          </div>
        </div>

        {/* Card 2: Stok Obat */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl">
              <MdLocalPharmacy />
            </div>
            <span className="text-blue-500 text-xs font-bold bg-blue-50 px-2 py-1 rounded-lg">
              Stabil
            </span>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Stok Obat Aktif
            </p>
            <h4 className="text-2xl font-bold text-gray-800 mt-1">
              1,240{" "}
              <span className="text-sm font-medium text-gray-400">Item</span>
            </h4>
          </div>
        </div>

        {/* Card 3: Pelanggan */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl">
              <MdPeople />
            </div>
            <span className="text-purple-500 text-xs font-bold bg-purple-50 px-2 py-1 rounded-lg">
              +54
            </span>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Total Pelanggan
            </p>
            <h4 className="text-2xl font-bold text-gray-800 mt-1">
              842{" "}
              <span className="text-sm font-medium text-gray-400">Orang</span>
            </h4>
          </div>
        </div>

        {/* Card 4: Inventory Value */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-2xl">
              <MdInventory />
            </div>
            <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded-lg">
              Low Stock
            </span>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Nilai Inventori
            </p>
            <h4 className="text-2xl font-bold text-gray-800 mt-1">Rp 45.2M</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TABLE SECTION (Left) */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Daftar Inventori Obat
              </h3>
              <p className="text-sm text-gray-400">
                Kelola stok dan harga obat apotek
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Cari obat atau produsen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white w-full transition-all text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto px-4 pb-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[11px] uppercase tracking-widest border-b border-gray-50">
                  <th className="px-6 py-4 font-bold">Informasi Obat</th>
                  <th className="px-6 py-4 font-bold">Produsen</th>
                  <th className="px-6 py-4 font-bold">Harga Satuan</th>
                  <th className="px-6 py-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredObat.length > 0 ? (
                  filteredObat.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center font-bold text-white shadow-sm`}
                          >
                            {item.initial}
                          </div>
                          <div>
                            <p className="font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
                              {item.nama}
                            </p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                              ID: #{item.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-gray-500">
                          {item.produsen}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-gray-800">
                          Rp {item.harga.toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                            <MdEdit size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-20 text-gray-400 italic"
                    >
                      Data tidak ditemukan...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CHART SECTION (Right) */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="mb-8">
            <h3 className="font-bold text-lg text-gray-800">Tren Penjualan</h3>
            <p className="text-sm text-gray-400">Statistik 7 hari terakhir</p>
          </div>

          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f8fafc"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="#059669"
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-700 uppercase">
                Performa
              </span>
              <span className="text-xs font-black text-emerald-700">
                +12.5%
              </span>
            </div>
            <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2">
              <div
                className="bg-emerald-600 h-1.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PREVIEW */}
      {isReportOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setIsReportOpen(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-bold">Preview Laporan</h3>
              <button
                onClick={() => setIsReportOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Periode</span>
                  <span className="font-semibold text-gray-800">Mei 2024</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Total Transaksi</span>
                  <span className="font-semibold text-gray-800">1,242</span>
                </div>
              </div>
              <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                <MdPrint size={20} /> Unduh Laporan PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
