import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { 
  MdSearch, 
  MdPeople, 
  MdStars, 
  MdRefresh, 
  MdCardGiftcard 
} from "react-icons/md";

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState("All Tiers");

  const loadMemberPoints = async () => {
    setLoading(true);
    try {
      // 1. Ambil data user dari supabase
      const { data: usersData, error: userError } = await supabase
        .from("user")
        .select("*");
      
      if (userError) throw userError;

      // Filter khusus member / pasien
      const customersOnly = (usersData || []).filter(user => {
        const role = (user.role || "").toLowerCase().trim();
        return (
          role === "member" || 
          role === "patient" || 
          role === "user" || 
          role === ""
        );
      });

      // 2. Ambil data order untuk menghitung poin
      let dbOrders = [];
      try {
        const { data, error: orderError } = await supabase
          .from("orders")
          .select("customer_name, points_earned");
        if (!orderError && data) {
          dbOrders = data;
        }
      } catch (err) {
        console.warn("Gagal fetch orders dari Supabase.");
      }

      // 3. Gabungkan dengan data order dari Local Storage
      const localTrans = JSON.parse(localStorage.getItem("local_transactions") || "[]");
      const combinedOrders = [...dbOrders, ...localTrans];

      // 4. Hitung akumulasi poin per nama customer dengan NORMALISASI (lowercase & trim)
      const pointsMap = {};
      combinedOrders.forEach(order => {
        const rawName = order.customer_name || "";
        const cleanName = rawName.toLowerCase().trim(); // Normalisasi spasi dan huruf
        const pts = order.points_earned || 0;
        pointsMap[cleanName] = (pointsMap[cleanName] || 0) + pts;
      });

      // 5. Buat daftar member final
      const memberList = customersOnly.map(user => {
        const cleanUserName = (user.name || "").toLowerCase().trim(); // Normalisasi nama member
        const pts = pointsMap[cleanUserName] || 0; // Look-up poin berdasarkan nama yang dinormalisasi

        let tier = "Bronze";
        let tierColor = "bg-amber-50 text-amber-700 border-amber-200";
        if (pts >= 2000) {
          tier = "Platinum";
          tierColor = "bg-purple-50 text-purple-700 border-purple-250";
        } else if (pts >= 1000) {
          tier = "Gold";
          tierColor = "bg-yellow-50 text-yellow-750 border-yellow-250";
        } else if (pts >= 500) {
          tier = "Silver";
          tierColor = "bg-slate-50 text-slate-700 border-slate-200";
        }
        return {
          ...user,
          points: pts,
          tier,
          tierColor
        };
      });

      setMembers(memberList);
    } catch (err) {
      console.error("Gagal memuat data member & poin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemberPoints();
  }, []);

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === "All Tiers" || m.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const totalPointsIssued = members.reduce((sum, m) => sum + m.points, 0);
  const platinumCount = members.filter(m => m.tier === "Platinum").length;
  const goldCount = members.filter(m => m.tier === "Gold").length;

  return (
    <div className="w-full bg-[#F8F9FB] font-sans antialiased text-gray-600 select-none flex flex-col gap-6">
      {/* STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><MdPeople size={22} /></div>
          <div className="text-left">
            <span className="text-xs text-gray-400 font-medium">Total Member Aktif</span>
            <h3 className="text-xl font-bold text-gray-800 mt-0.5">{members.length}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center"><MdStars size={22} /></div>
          <div className="text-left">
            <span className="text-xs text-gray-400 font-medium">Poin Terdistribusi</span>
            <h3 className="text-xl font-bold text-gray-800 mt-0.5">{totalPointsIssued} Pts</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center"><MdCardGiftcard size={22} /></div>
          <div className="text-left">
            <span className="text-xs text-gray-400 font-medium">Platinum VIP</span>
            <h3 className="text-xl font-bold text-gray-800 mt-0.5">{platinumCount} Pasien</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center"><MdStars size={22} /></div>
          <div className="text-left">
            <span className="text-xs text-gray-400 font-medium">Gold VIP</span>
            <h3 className="text-xl font-bold text-gray-800 mt-0.5">{goldCount} Pasien</h3>
          </div>
        </div>
      </div>

      {/* FILTER & TABLE AREA */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-700 tracking-tight">Daftar Poin & Tier Member (Khusus Pasien)</h2>
            <button onClick={loadMemberPoints} className="p-1 hover:bg-gray-50 rounded text-gray-400 hover:text-gray-650 transition-colors"><MdRefresh size={18} /></button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative flex items-center w-full sm:w-60">
              <span className="absolute left-3 text-gray-300"><MdSearch size={16} /></span>
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Cari member..." 
                className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none"
              />
            </div>
            <select 
              value={selectedTier} 
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-bold text-gray-500 cursor-pointer focus:outline-none w-full sm:w-auto"
            >
              <option value="All Tiers">Semua Tier</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-gray-50 font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Nama Member</th>
                <th className="pb-3 font-semibold">Email / Kontak</th>
                <th className="pb-3 font-semibold">Total Poin</th>
                <th className="pb-3 font-semibold">Tier Keanggotaan</th>
                <th className="pb-3 font-semibold">Status Akun</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-300">Memuat data member...</td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-300 font-bold">Tidak ada data member ditemukan</td>
                </tr>
              ) : (
                filteredMembers.map((member, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-900 text-amber-400 flex items-center justify-center font-bold text-xs uppercase">
                          {member.name?.charAt(0)}
                        </div>
                        <div className="text-left">
                          <span className="font-bold text-gray-700 block">{member.name}</span>
                          <span className="text-[9px] text-gray-400">ID: MB-{member.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-left">
                      <span className="block text-gray-750">{member.email || "No Email"}</span>
                      <span className="text-[9px] text-gray-400">{member.role || "Member"}</span>
                    </td>
                    <td className="py-4 font-bold text-gray-700">{member.points} Pts</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${member.tierColor}`}>
                        {member.tier}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#EBF7EE] text-[#28B95E] uppercase tracking-wide">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}