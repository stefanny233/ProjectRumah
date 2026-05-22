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

/**
 * CATATAN PENTING:
 * Font diatur ke 'Inter' atau 'Geist' sebagai alternatif TT Commons.
 * Semua font-weight diturunkan dari bold/black ke Medium/Semi-Bold agar lebih "santai".
 */

export default function Dashboard() {
  const { obatList, chartData } = dataApotek;

  return (
    <div
      className="bg-[#FDFDFD] min-h-screen px-8 pt-2 pb-8 animate-in fade-in duration-700"
      style={{
        fontFamily: "'Inter', 'Geist', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* STATS CARDS - Warna Primer & Sekunder Figma */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Customer"
          value="120"
          iconColor="bg-[#5065f6]"
          icon={<MdPeople />}
        />
        <StatCard
          label="Total Sals"
          value="234"
          iconColor="bg-[#28B95E]"
          icon={<MdShoppingCart />}
        />
        <StatCard
          label="Total Profit"
          value="$456"
          iconColor="bg-[#FFDB45]"
          icon={<MdAttachMoney />}
        />
        <StatCard
          label="Out of Stock"
          value="56"
          iconColor="bg-[#F04B69]"
          icon={<MdInventory2 />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KIRI: Expiring List & Monthly Progress */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-semibold text-[#111827]">
                Expiring List
              </h3>
              <button className="text-[#5065f6] text-[13px] font-medium hover:underline">
                See All &rsaquo;
              </button>
            </div>
            <table className="w-full text-[14px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50 text-left">
                  <th className="pb-4 font-medium uppercase text-[10px] tracking-[0.1em]">
                    Medicine name
                  </th>
                  <th className="pb-4 font-medium uppercase text-[10px] tracking-[0.1em]">
                    Expire Date
                  </th>
                  <th className="pb-4 font-medium uppercase text-[10px] tracking-[0.1em]">
                    Quantity
                  </th>
                  <th className="pb-4 font-medium uppercase text-[10px] tracking-[0.1em]">
                    Chart
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {obatList.slice(0, 4).map((item, i) => (
                  <tr key={i} className="text-gray-600">
                    <td className="py-4 font-medium text-[#111827]">
                      {item.nama}
                    </td>
                    <td className="py-4 text-gray-400 font-normal">
                      24 Dec 2021
                    </td>
                    <td className="py-4 font-medium">40</td>
                    <td className="py-4 text-[#28B95E]">
                      <MdTrendingUp className="text-xl" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Monthly Progress */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-[18px] font-semibold text-[#111827] mb-6">
              Monthly Progress
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} stroke="#F9FAFB" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 500 }}
                  />
                  <Tooltip cursor={{ fill: "#F9FAFB" }} />
                  <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={16}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 6 ? "#111827" : "#A7F3D0"}
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
              <h3 className="text-[18px] font-semibold text-[#111827]">
                Recent Order's
              </h3>
              <button className="text-[#5065f6] text-[13px] font-medium hover:underline">
                See All &rsaquo;
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Paricel 15mg",
                  status: "Delivered",
                  color: "text-[#5065f6] bg-[#EEF2FF]",
                  batch: "783627",
                },
                {
                  name: "Abetis 20mg",
                  status: "Pending",
                  color: "text-[#FFDB45] bg-[#FFFBEB]",
                  batch: "888324",
                },
                {
                  name: "Cerox CV",
                  status: "Cancelled",
                  color: "text-[#F04B69] bg-[#FFF1F2]",
                  batch: "767676",
                },
              ].map((order, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-[14px] border-b border-gray-50 pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium text-[#111827]">{order.name}</p>
                    <p className="text-[11px] text-gray-400 font-normal">
                      Batch No: {order.batch}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase ${order.color}`}
                    >
                      {order.status}
                    </span>
                    <p className="font-medium text-[#111827] w-12 text-right">
                      $23.00
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earning Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 flex flex-col items-center">
            <h3 className="text-gray-400 text-[10px] font-medium uppercase tracking-[0.15em] mb-2">
              Total Earning
            </h3>
            <p className="text-[32px] font-semibold text-[#111827] tracking-tight">
              $5098.00
            </p>
            <p className="text-[#28B95E] text-[13px] font-medium mt-1">35% ↑</p>

            <div className="mt-8 relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#F3F4F6"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#5065f6"
                  strokeWidth="12"
                  strokeDasharray="440"
                  strokeDashoffset="110"
                  strokeLinecap="round"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="55"
                  stroke="#28B95E"
                  strokeWidth="10"
                  strokeDasharray="345"
                  strokeDashoffset="200"
                  strokeLinecap="round"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="40"
                  stroke="#FFDB45"
                  strokeWidth="8"
                  strokeDasharray="250"
                  strokeDashoffset="180"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8 w-full">
              <LegendItem color="bg-[#F04B69]" label="Total Purchase" />
              <LegendItem color="bg-[#FFDB45]" label="Cash Received" />
              <LegendItem color="bg-[#5065f6]" label="Bank Receive" />
              <LegendItem color="bg-[#28B95E]" label="Total Service" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, iconColor, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-50 flex items-center gap-4 transition-all hover:shadow-md">
      <div
        className={`w-11 h-11 ${iconColor} rounded-xl flex items-center justify-center text-white text-xl shadow-inner`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <h4 className="text-[22px] font-semibold text-[#111827] leading-none mb-1">
          {value}
        </h4>
        <button className="text-[10px] text-[#28B95E] font-medium hover:underline">
          Show Details
        </button>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`}></span>
      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
