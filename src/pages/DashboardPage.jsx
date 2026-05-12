import React from "react";
import {
  MdTrendingUp,
  MdPeople,
  MdShoppingCart,
  MdAttachMoney,
  MdInventory2,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import dataApotek from "../data/dataApotek.json";

export default function Dashboard() {
  const { obatList, chartData } = dataApotek;

  return (
    // "pt-2" untuk merapatkan jarak dengan header
    <div className="bg-[#F9FAFB] min-h-screen px-8 pt-2 pb-8 animate-in fade-in duration-700">

      {/* STATS CARDS - Menggunakan warna icon yang lebih soft/bulat sesuai Figma */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Customer"
          value="120"
          iconColor="bg-[#6366F1]"
          icon={<MdPeople />}
        />
        <StatCard
          label="Total Sals"
          value="234"
          iconColor="bg-[#22C55E]"
          icon={<MdShoppingCart />}
        />
        <StatCard
          label="Total Profit"
          value="$456"
          iconColor="bg-[#FACC15]"
          icon={<MdAttachMoney />}
        />
        <StatCard
          label="Out of Stock"
          value="56"
          iconColor="bg-[#F87171]"
          icon={<MdInventory2 />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KIRI: Expiring List & Monthly Progress */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-700">Expiring List</h3>
              <button className="text-indigo-600 text-xs font-semibold">
                See All &rsaquo;
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50 text-left">
                  <th className="pb-2 font-medium">Medicine name</th>
                  <th className="pb-2 font-medium">Expire Date</th>
                  <th className="pb-2 font-medium">Quantity</th>
                  <th className="pb-2 font-medium">Chart</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {obatList.slice(0, 4).map((item, i) => (
                  <tr key={i} className="text-gray-600">
                    <td className="py-3 font-medium">{item.nama}</td>
                    <td className="py-3 text-gray-400">24 Dec 2021</td>
                    <td className="py-3">40</td>
                    <td className="py-3 text-green-500">
                      <MdTrendingUp />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Monthly Progress - Warna Hijau sesuai request */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-6">Monthly Progress</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#F9FAFB" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={15}>
                    {chartData.map((entry, index) => (
                      // Highlight satu bar dengan warna gelap (seperti di Figma), sisanya hijau pastel
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 6 ? "#111827" : "#86EFAC"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* KANAN: Recent Orders & Earnings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-700">Recent Order's</h3>
              <button className="text-indigo-600 text-xs font-semibold">
                See All &rsaquo;
              </button>
            </div>
            <div className="space-y-5">
              {[
                {
                  name: "Paricel 15mg",
                  status: "Delivered",
                  color: "text-indigo-600 bg-indigo-50",
                },
                {
                  name: "Abetis 20mg",
                  status: "Pending",
                  color: "text-yellow-600 bg-yellow-50",
                },
                {
                  name: "Cerox CV",
                  status: "Cancelled",
                  color: "text-red-600 bg-red-50",
                },
              ].map((order, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm border-b border-gray-50 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-bold text-gray-700">{order.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      Batch No: 783627
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${order.color}`}
                  >
                    {order.status}
                  </span>
                  <p className="font-bold text-gray-800">$23.00</p>
                </div>
              ))}
            </div>
          </div>

          {/* Earning Chart Lingkaran */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col items-center">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-1">
              Total Earning
            </h3>
            <p className="text-3xl font-black text-gray-800">
              $5098.00{" "}
              <span className="text-green-500 text-sm font-bold">35% ↑</span>
            </p>

            {/* Sederhanakan tampilan Radial Chart (Donut) */}
            <div className="mt-4 relative w-32 h-32 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-[12px] border-gray-50"></div>
              <div className="absolute w-full h-full rounded-full border-[12px] border-transparent border-t-indigo-500 border-r-green-400 rotate-45"></div>
              <div className="absolute w-[70%] h-[70%] rounded-full border-[8px] border-transparent border-b-yellow-400 -rotate-12"></div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6 w-full text-[10px] font-bold text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span> Total
                Purchase
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>{" "}
                Cash Received
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>{" "}
                Bank Receive
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>{" "}
                Total Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, iconColor, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
      <div
        className={`w-10 h-10 ${iconColor} rounded-xl flex items-center justify-center text-white text-lg`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight">
          {label}
        </p>
        <h4 className="text-xl font-black text-gray-800 leading-none mb-1">
          {value}
        </h4>
        <button className="text-[9px] text-green-500 font-bold hover:underline">
          Show Details
        </button>
      </div>
    </div>
  );
}
