import React from "react";
import { 
  MdPeople, 
  MdTrendingUp, 
  MdAccountBalanceWallet, 
  MdReportProblem,
  MdRefresh 
} from "react-icons/md";

export default function Dashboard() {
  const expiringData = [
    { name: "Doxycycline", date: "24 Dec 2021", qty: 40 },
    { name: "Abetis", date: "24 Dec 2021", qty: 40 },
    { name: "Diasulin 10ml", date: "24 Dec 2021", qty: 40 },
    { name: "Cerox CV", date: "24 Dec 2021", qty: 40 },
  ];

  const recentOrders = [
    { name: "Paricel 15mg", batch: "783627 834", qty: 40, status: "Delivered", price: "$23.00" },
    { name: "Abetis 20mg", batch: "88832 433", qty: 40, status: "Pending", price: "$23.00" },
    { name: "Cerox CV", batch: "767676 344", qty: 40, status: "Cancelled", price: "$23.00" },
    { name: "Abetis 20mg", batch: "45578 866", qty: 40, status: "Delivered", price: "$23.00" },
    { name: "Cerox CV", batch: "767676 344", qty: 40, status: "Cancelled", price: "$23.00" },
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Persentase tinggi bar untuk menyamai naik turunnya grafik di figma mase
  const progressValues = [72, 45, 52, 78, 18, 42, 85, 48, 68, 48, 62, 32]; 

  return (
    <div className="w-full bg-[#F8F9FB] font-sans antialiased text-gray-600 select-none flex flex-col gap-6">
      
      {/* ROW 1: 4 STATISTIC CARDS (Sangat Mirip Figma) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Customer */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] min-h-[130px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EEF0FF] text-[#5065f6] rounded-full flex items-center justify-center">
              <MdPeople size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-400">Total Customer</span>
              <span className="text-2xl font-bold text-gray-800 tracking-tight mt-0.5">120</span>
            </div>
          </div>
          <button className="text-[10px] font-bold text-[#28B95E] uppercase tracking-wider text-left hover:underline w-max">Show Details</button>
        </div>

        {/* Card 2: Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] min-h-[130px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EBF7EE] text-[#28B95E] rounded-full flex items-center justify-center">
              <MdTrendingUp size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-400">Total Sals</span>
              <span className="text-2xl font-bold text-gray-800 tracking-tight mt-0.5">234</span>
            </div>
          </div>
          <button className="text-[10px] font-bold text-[#28B95E] uppercase tracking-wider text-left hover:underline w-max">Show Details</button>
        </div>

        {/* Card 3: Total Profit */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] min-h-[130px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFF9E6] text-[#F5B800] rounded-full flex items-center justify-center">
              <MdAccountBalanceWallet size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-400">Total Profit</span>
              <span className="text-2xl font-bold text-gray-800 tracking-tight mt-0.5">$456</span>
            </div>
          </div>
          <button className="text-[10px] font-bold text-[#28B95E] uppercase tracking-wider text-left hover:underline w-max">Show Details</button>
        </div>

        {/* Card 4: Out of Stock */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] min-h-[130px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFEBEB] text-[#FF4D4D] rounded-full flex items-center justify-center">
              <MdReportProblem size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-400">Out of Stock</span>
              <span className="text-2xl font-bold text-gray-800 tracking-tight mt-0.5">56</span>
            </div>
          </div>
          <button className="text-[10px] font-bold text-[#28B95E] uppercase tracking-wider text-left hover:underline w-max">Show Details</button>
        </div>

      </div>

      {/* ROW 2: TABLES AREA (EXPIRING LIST & RECENT ORDERS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* TABEL KIRI: Expiring List */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-700 tracking-tight">Expiring List</h3>
            <button className="text-[11px] font-semibold text-[#5065f6] hover:underline flex items-center gap-0.5">See All <span className="text-[9px]">›</span></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50 font-bold uppercase tracking-wider">
                  <th className="pb-2.5 font-semibold">Medicine name ⇅</th>
                  <th className="pb-2.5 font-semibold">Expire Date ⇅</th>
                  <th className="pb-2.5 font-semibold">Quantity ⇅</th>
                  <th className="pb-2.5 font-semibold text-center">Chart ⇅</th>
                  <th className="pb-2.5 font-semibold text-center">Return ⇅</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
                {expiringData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50">
                    <td className="py-3 font-semibold text-gray-700">{item.name}</td>
                    <td className="py-3 text-gray-400">{item.date}</td>
                    <td className="py-3 font-semibold text-gray-700">{item.qty}</td>
                    <td className="py-3 flex justify-center items-center">
                      <svg width="36" height="12" viewBox="0 0 36 12" fill="none">
                        <path d="M1 8C4 8 6 3 9 3C12 3 14 7 18 7C22 7 24 2 29 2C32 2 33 5 35 5" stroke="#28B95E" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </td>
                    <td className="py-3 text-center">
                      <button className="text-gray-300 hover:text-gray-500 bg-gray-50 p-1 rounded transition-colors">
                        <MdRefresh size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TABEL KANAN: Recent Order's */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-700 tracking-tight">Recent Order's</h3>
            <button className="text-[11px] font-semibold text-[#5065f6] hover:underline flex items-center gap-0.5">See All <span className="text-[9px]">›</span></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50 font-bold uppercase tracking-wider">
                  <th className="pb-2.5 font-semibold">Medicine name ⇅</th>
                  <th className="pb-2.5 font-semibold">Batch No ⇅</th>
                  <th className="pb-2.5 font-semibold">Quantity ⇅</th>
                  <th className="pb-2.5 font-semibold">Status ⇅</th>
                  <th className="pb-2.5 font-semibold text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
                {recentOrders.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50">
                    <td className="py-3 font-semibold text-gray-700">{item.name}</td>
                    <td className="py-3 text-gray-400 whitespace-pre-line max-w-[80px] leading-tight">{item.batch}</td>
                    <td className="py-3 font-semibold text-gray-700">{item.qty}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide ${
                        item.status === "Delivered" ? "bg-[#EEF0FF] text-[#5065f6]" :
                        item.status === "Pending" ? "bg-[#FFF9E6] text-[#F5B800]" : "bg-[#FFEBEB] text-[#FF4D4D]"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-gray-700 text-right">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ROW 3: PROGRESS & TOTAL EARNING GRAPHICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* KIRI: Monthly Progress (Bar Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] lg:col-span-2 flex flex-col">
          <h3 className="text-sm font-bold text-gray-700 tracking-tight mb-8">Monthly Progress</h3>
          
          <div className="flex items-end justify-between h-40 px-2 relative border-b border-gray-100 pb-2">
            {/* Background Grid Lines Indikator Angka Tiruan */}
            <div className="absolute left-0 bottom-10 w-full border-t border-dashed border-gray-100"></div>
            <div className="absolute left-0 bottom-20 w-full border-t border-dashed border-gray-100"></div>
            <div className="absolute left-0 bottom-30 w-full border-t border-dashed border-gray-100"></div>

            {months.map((month, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2.5 flex-1 group relative z-10">
                
                {/* TOOLTIP MELAYANG PADA BULAN JULI (Sesuai Gambar Figma) */}
                {month === "Jul" && (
                  <div className="absolute -top-11 bg-[#23262F] text-white text-[9px] font-semibold px-2 py-1 rounded flex flex-col items-center shadow-lg z-20">
                    <span className="text-gray-400 text-[8px] font-normal">September</span>
                    <span className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-[#28B95E] rounded-xs"></span> 20k
                    </span>
                    {/* Segitiga kecil lancip ke bawah */}
                    <div className="w-1.5 h-1.5 bg-[#23262F] rotate-45 absolute -bottom-0.5 left-1/2 -translate-x-1/2"></div>
                  </div>
                )}
                
                {/* Batang Utama */}
                <div className="w-3.5 bg-[#F4F5F6] rounded-t-xs h-32 flex items-end overflow-hidden">
                  <div 
                    style={{ height: `${progressValues[idx]}%` }}
                    className={`w-full rounded-t-xs transition-all duration-500 ${month === "Jul" ? "bg-gray-900" : "bg-[#28B95E]"}`}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-gray-300 tracking-wide">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KANAN: Total Earning (Circular Ring) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[230px]">
          <div>
            <h3 className="text-sm font-bold text-gray-700 tracking-tight">Total Earning</h3>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-gray-800 tracking-tight">$5098.00</span>
              <span className="text-[10px] font-bold text-[#28B95E] flex items-center">35% ↗</span>
            </div>
          </div>

          {/* Render Lingkaran Donut Berlapis dengan SVG Presisi Tinggi */}
          <div className="flex justify-center items-center my-3">
            <svg width="120" height="120" viewBox="0 0 36 36" className="transform -rotate-90">
              {/* Ring 1: Merah (Paling Luar) */}
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#FFEBEB" strokeWidth="2"></circle>
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#FF4D4D" strokeWidth="2" strokeDasharray="75 100"></circle>
              
              {/* Ring 2: Kuning */}
              <circle cx="18" cy="18" r="13.2" fill="transparent" stroke="#FFF9E6" strokeWidth="2"></circle>
              <circle cx="18" cy="18" r="13.2" fill="transparent" stroke="#F5B800" strokeWidth="2" strokeDasharray="60 100" strokeDashoffset="-8"></circle>

              {/* Ring 3: Blue */}
              <circle cx="18" cy="18" r="10.4" fill="transparent" stroke="#EEF0FF" strokeWidth="2"></circle>
              <circle cx="18" cy="18" r="10.4" fill="transparent" stroke="#5065f6" strokeWidth="2" strokeDasharray="45 100" strokeDashoffset="-16"></circle>

              {/* Ring 4: Hijau (Paling Dalam) */}
              <circle cx="18" cy="18" r="7.6" fill="transparent" stroke="#EBF7EE" strokeWidth="2"></circle>
              <circle cx="18" cy="18" r="7.6" fill="transparent" stroke="#28B95E" strokeWidth="2" strokeDasharray="30 100" strokeDashoffset="-24"></circle>
            </svg>
          </div>

          {/* Legenda Indikator */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D]"></span> Total Purchase</div>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]"></span> Cash Received</div>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#5065f6]"></span> Bank Receive</div>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#28B95E]"></span> Total Service</div>
          </div>
        </div>

      </div>

    </div>
  );
}