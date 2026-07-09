import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // <-- Ini dia yang tadi terlewat mase!
import {
  MdChevronLeft, MdExpandMore, MdAdd, MdOutlineSearch, MdPhone, MdOutlineMail, 
  MdOutlineWaterDrop, MdRefresh, MdPeopleOutline, MdWorkOutline, MdCreditCard
} from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import { userService } from "../userService";
import dataApotek from "../data/dataApotek.json";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

export default function EmployeePage() {
  const location = useLocation();
  const isAttendanceView = location.pathname.includes("attendance");

  const [view, setView] = useState("list");
  
  // Memuat data lokal gabungan secara aman dengan fallback nama/ID jika email kosong
  const loadLocalEmployees = () => {
    const localSaved = JSON.parse(localStorage.getItem("local_employees") || "[]");
    const jsonEmployees = dataApotek.employees || [];
    const combined = [...localSaved, ...jsonEmployees];
    
    const unique = [];
    const seen = new Set();
    for (const item of combined) {
      const key = (item.email || item.id || item.name || "").toLowerCase().trim();
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(item);
      } else if (!key) {
        unique.push(item);
      }
    }
    return unique;
  };

  const [users, setUsers] = useState(loadLocalEmployees);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All Positions");

  // State Kehadiran (Attendance)
  const loadLocalAttendance = () => {
    const local = localStorage.getItem("local_attendance");
    if (local) return JSON.parse(local);
    const seed = [
      { id: 1, name: "Dr. Luna Amanda", date: new Date().toLocaleDateString("id-ID"), clockIn: "08:00", clockOut: "17:00", status: "Hadir", hours: "9 Jam" },
      { id: 2, name: "Budi Setiawan", date: new Date().toLocaleDateString("id-ID"), clockIn: "08:15", clockOut: "17:00", status: "Hadir", hours: "8.75 Jam" },
      { id: 3, name: "Budi Sudarsono", date: new Date().toLocaleDateString("id-ID"), clockIn: "-", clockOut: "-", status: "Sakit", hours: "-" },
    ];
    localStorage.setItem("local_attendance", JSON.stringify(seed));
    return seed;
  };

  const [attendanceList, setAttendanceList] = useState(loadLocalAttendance);
  const [clockInEmp, setClockInEmp] = useState("");
  const [clockInStatus, setClockInStatus] = useState("Hadir");
  const [liveTime, setLiveTime] = useState(new Date().toLocaleTimeString("id-ID"));

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString("id-ID"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userService.fetchUsers();
      const localData = loadLocalEmployees();
      const merged = data && data.length > 0 ? [...data, ...localData] : localData;

      const unique = [];
      const seen = new Set();
      for (const item of merged) {
        const key = (item.email || item.id || item.name || "").toLowerCase().trim();
        if (key && !seen.has(key)) {
          seen.add(key);
          unique.push(item);
        } else if (!key) {
          unique.push(item);
        }
      }
      setUsers(unique);
      if (unique.length > 0) setClockInEmp(unique[0].name);
    } catch (err) {
      const fallbackList = loadLocalEmployees();
      setUsers(fallbackList);
      if (fallbackList.length > 0) setClockInEmp(fallbackList[0].name);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        name: dataForm.name,
        email: dataForm.email,
        password: dataForm.password || "123456",
        phone: dataForm.phone,
        bloodGroup: dataForm.bloodGroup,
        salary: dataForm.salary || "-",
        role: dataForm.role,
      };

      await userService.createUser(payload);

      const localEmployees = JSON.parse(localStorage.getItem("local_employees") || "[]");
      localStorage.setItem("local_employees", JSON.stringify([payload, ...localEmployees]));

      setSuccess("Karyawan baru berhasil ditambahkan!");
      setDataForm({ name: "", email: "", password: "", phone: "", bloodGroup: "", salary: "", role: "Director" });
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
      setView("list");
    } catch (err) {
      const fallbackPayload = {
        id: Date.now(), name: dataForm.name, email: dataForm.email, phone: dataForm.phone,
        bloodGroup: dataForm.bloodGroup, salary: dataForm.salary || "-", role: dataForm.role,
      };
      const localEmployees = JSON.parse(localStorage.getItem("local_employees") || "[]");
      localStorage.setItem("local_employees", JSON.stringify([fallbackPayload, ...localEmployees]));

      setSuccess("Tersimpan di penyimpanan lokal browser.");
      setDataForm({ name: "", email: "", password: "", phone: "", bloodGroup: "", salary: "", role: "Director" });
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
      setView("list");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus karyawan ini?");
    if (!konfirmasi) return;

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await userService.deleteUser(id);
      const localSaved = JSON.parse(localStorage.getItem("local_employees") || "[]");
      localStorage.setItem("local_employees", JSON.stringify(localSaved.filter(emp => emp.id !== id)));
      setSuccess("Data karyawan berhasil dihapus!");
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
    } catch (err) {
      const localSaved = JSON.parse(localStorage.getItem("local_employees") || "[]");
      localStorage.setItem("local_employees", JSON.stringify(localSaved.filter(emp => emp.id !== id && emp.email !== id)));
      setSuccess("Dihapus dari penyimpanan lokal.");
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
    } finally {
      setLoading(false);
    }
  };

  // Logika Presensi (Attendance)
  const handleClockIn = () => {
    if (!clockInEmp) return alert("Pilih staf terlebih dahulu!");
    const tgl = new Date().toLocaleDateString("id-ID");
    const jam = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    
    const exist = attendanceList.find(a => a.name === clockInEmp && a.date === tgl);
    if (exist) return alert(`⚠️ ${clockInEmp} sudah melakukan presensi masuk hari ini!`);

    const newRecord = {
      id: Date.now(),
      name: clockInEmp,
      date: tgl,
      clockIn: clockInStatus === "Hadir" ? jam : "-",
      clockOut: "-",
      status: clockInStatus,
      hours: "-"
    };

    const updated = [newRecord, ...attendanceList];
    setAttendanceList(updated);
    localStorage.setItem("local_attendance", JSON.stringify(updated));
    alert(`✅ ${clockInEmp} berhasil masuk (Clock In) pukul ${jam}!`);
  };

  const handleClockOut = () => {
    if (!clockInEmp) return alert("Pilih staf terlebih dahulu!");
    const tgl = new Date().toLocaleDateString("id-ID");
    const jam = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    const idx = attendanceList.findIndex(a => a.name === clockInEmp && a.date === tgl && a.clockOut === "-");
    if (idx === -1) return alert(`⚠️ ${clockInEmp} tidak memiliki rekaman Clock In aktif hari ini!`);

    const updated = [...attendanceList];
    updated[idx].clockOut = jam;
    updated[idx].hours = "9 Jam (Est)";
    
    setAttendanceList(updated);
    localStorage.setItem("local_attendance", JSON.stringify(updated));
    alert(`🚀 ${clockInEmp} berhasil pulang (Clock Out) pukul ${jam}!`);
  };

  const getRoleTheme = (role) => {
    const r = (role || "").toLowerCase();
    if (r.includes("director")) return "from-teal-950 via-emerald-800 to-emerald-950 text-teal-900 bg-emerald-50";
    if (r.includes("assistant")) return "from-amber-400 via-amber-500 to-amber-600 text-amber-800 bg-amber-50";
    if (r.includes("manager")) return "from-teal-900 via-teal-800 to-emerald-850 text-teal-950 bg-teal-50";
    return "from-amber-300 via-yellow-400 to-emerald-600 text-teal-900 bg-yellow-50/60"; 
  };

  const getAvatarBg = (name) => {
    const char = name ? name.charAt(0).toUpperCase() : "E";
    const styles = {
      A: "bg-teal-50 text-teal-600 border-teal-200", B: "bg-teal-50 text-teal-600 border-teal-200",
      C: "bg-emerald-50 text-emerald-850 border-emerald-200", D: "bg-emerald-50 text-emerald-850 border-emerald-200",
      E: "bg-amber-50 text-amber-850 border-amber-200", F: "bg-amber-50 text-amber-850 border-amber-200",
      G: "bg-amber-100/60 text-amber-900 border-amber-300/45", H: "bg-amber-100/60 text-amber-900 border-amber-300/45",
      I: "bg-teal-50 text-teal-800 border-teal-200", J: "bg-teal-50 text-teal-800 border-teal-200",
      M: "bg-amber-50 text-amber-850 border-amber-200", N: "bg-amber-50 text-amber-850 border-amber-200",
      S: "bg-emerald-50 text-emerald-850 border-emerald-200", T: "bg-emerald-50 text-emerald-850 border-emerald-200"
    };
    return styles[char] || "bg-[#faf8f5] text-teal-950 border-amber-200";
  };

  const getRoleBadgeStyle = (role) => {
    const r = (role || "").toLowerCase();
    if (r.includes("director")) return "bg-teal-50 text-teal-950 border border-teal-200/50";
    if (r.includes("assistant")) return "bg-amber-50 text-amber-800 border border-amber-200/50";
    if (r.includes("manager")) return "bg-emerald-50 text-emerald-950 border border-emerald-200/50";
    return "bg-[#faf8f5] text-teal-950 border border-amber-200/50";
  };

  // Filter pencarian staf dengan pengaman null-safety
  const filteredUsers = users.filter((emp) => {
    const matchesSearch = 
      !searchTerm ||
      (emp.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.phone || "").toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesPosition = 
      !selectedPosition ||
      selectedPosition === "All Positions" || 
      (emp.role || "").toLowerCase().trim() === selectedPosition.toLowerCase().trim();

    return matchesSearch && matchesPosition;
  });

  // --- RENDER 1: HALAMAN ATTENDANCE (PRESENSI) ---
  if (isAttendanceView) {
    return (
      <div className="p-8 bg-[#faf8f5] min-h-screen font-sans text-left select-none antialiased relative">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
          .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
          .font-master-title { font-family: 'Poppins', sans-serif !important; font-weight: 700 !important; }
        `}</style>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-master-title text-teal-950 tracking-tight">Presensi Kehadiran</h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">Pencatatan waktu kerja staf secara real-time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Card Jam Digital */}
          <div className="bg-white p-6 rounded-[28px] border border-amber-200/40 shadow-xs flex flex-col justify-between h-[200px]">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Waktu Sekarang</p>
              <h2 className="text-[36px] font-black text-teal-950 font-mono tracking-wider">{liveTime}</h2>
            </div>
            <div className="text-xs text-slate-500 font-semibold bg-[#faf8f5] px-4 py-2.5 rounded-xl border border-amber-500/10">
              📆 {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>

          {/* Form Input Clock-In/Out */}
          <div className="bg-white p-6 rounded-[28px] border border-amber-200/40 shadow-xs lg:col-span-2 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Pilih Staf Apotek</label>
                <select 
                  value={clockInEmp} 
                  onChange={(e) => setClockInEmp(e.target.value)} 
                  className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-teal-950 outline-none cursor-pointer"
                >
                  {users.map((u, i) => (
                    <option key={i} value={u.name}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Status Kehadiran</label>
                <select 
                  value={clockInStatus} 
                  onChange={(e) => setClockInStatus(e.target.value)} 
                  className="w-full bg-[#faf8f5] border border-gray-200 rounded-xl p-3 text-xs font-semibold text-teal-950 outline-none cursor-pointer"
                >
                  <option value="Hadir">Hadir Tepat Waktu</option>
                  <option value="Izin">Izin / Cuti Staf</option>
                  <option value="Sakit">Sakit / Istirahat Medis</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6 pt-4 border-t border-gray-50">
              <button 
                onClick={handleClockIn} 
                className="flex-1 bg-[#28B95E] hover:bg-green-600 text-white font-bold py-3 rounded-xl text-xs transition shadow-md shadow-green-100 cursor-pointer"
              >
                📥 CLOCK IN (MASUK)
              </button>
              <button 
                onClick={handleClockOut} 
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl text-xs transition shadow-md shadow-rose-100 cursor-pointer"
              >
                📤 CLOCK OUT (PULANG)
              </button>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-[28px] border border-amber-200/40 shadow-xs overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-50 bg-[#faf8f5]/40 flex justify-between items-center">
            <h3 className="text-sm font-bold text-teal-950">Riwayat Presensi Mingguan</h3>
            <span className="text-[10px] bg-teal-50 text-teal-900 border border-teal-100 px-3 py-1 rounded-full font-bold">Auto Synchronized</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB]/50 border-b border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <th className="pl-6 pr-4 py-4">Nama Staf</th>
                  <th className="px-4 py-4">Tanggal</th>
                  <th className="px-4 py-4 text-center">Clock In</th>
                  <th className="px-4 py-4 text-center">Clock Out</th>
                  <th className="px-4 py-4 text-center">Total Jam</th>
                  <th className="pl-4 pr-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-gray-50">
                {attendanceList.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-[#F9FAFB]/60 transition-colors">
                    <td className="pl-6 pr-4 py-4 font-bold text-teal-950">{item.name}</td>
                    <td className="px-4 py-4 text-slate-500 font-medium font-mono">{item.date}</td>
                    <td className="px-4 py-4 text-center font-bold text-emerald-600 font-mono">{item.clockIn}</td>
                    <td className="px-4 py-4 text-center font-bold text-rose-600 font-mono">{item.clockOut}</td>
                    <td className="px-4 py-4 text-center text-slate-500 font-medium">{item.hours}</td>
                    <td className="pl-4 pr-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-full font-bold text-[9px] border ${
                        item.status === "Hadir" 
                          ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
                          : item.status === "Izin" 
                            ? "bg-amber-50 text-amber-800 border-amber-100" 
                            : "bg-rose-50 text-rose-800 border-rose-100"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER 2: HALAMAN LIST EMPLOYEE ---
  if (view === "list") {
    return (
      <div className="p-8 bg-[#faf8f5] min-h-screen font-sans text-left select-none antialiased">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
          .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
          .font-master-title { font-family: 'Poppins', sans-serif !important; font-weight: 700 !important; }
        `}</style>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-master-title text-teal-950 tracking-tight">Employee Directory</h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">Kelola data karyawan apotek & otorisasi sistem</p>
          </div>
          
          <button
            onClick={() => setView("add")}
            className="bg-teal-950 hover:bg-teal-900 text-amber-300 hover:text-white px-5.5 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-md shadow-teal-950/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <MdAdd size={20} />
            ADD NEW EMPLOYEE
          </button>
        </div>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        {/* Stats widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-amber-200/40 shadow-xs flex items-center gap-4.5">
            <span className="p-3.5 bg-teal-50 text-teal-900 rounded-2xl border border-teal-100"><MdPeopleOutline size={22} /></span>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Total Karyawan</p>
              <p className="text-xl font-bold text-teal-950">{filteredUsers.length} Orang</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-amber-200/40 shadow-xs flex items-center gap-4.5">
            <span className="p-3.5 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100"><MdWorkOutline size={22} /></span>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Jabatan Staf</p>
              <p className="text-xl font-bold text-teal-950">4 Struktur Utama</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-amber-200/40 shadow-xs flex items-center gap-4.5">
            <span className="p-3.5 bg-emerald-50 text-emerald-850 rounded-2xl border border-emerald-100"><MdCreditCard size={22} /></span>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Status Kepegawaian</p>
              <p className="text-xl font-bold text-teal-950">100% Aktif</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-[28px] border border-amber-200/40 shadow-xs flex flex-wrap gap-4 justify-between items-center mb-8">
          <div className="flex gap-4 flex-1 max-w-2xl">
            <div className="relative flex items-center flex-1">
              <span className="absolute left-3.5 text-gray-400"><MdOutlineSearch size={20} /></span>
              <input
                type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari karyawan berdasarkan nama, email, telp..."
                className="w-full bg-[#faf8f5]/55 border border-gray-200 rounded-2xl p-3.5 pl-11 pr-4 text-xs font-semibold focus:outline-none focus:border-teal-700 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <div className="w-52 relative">
              <select 
                value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full bg-[#faf8f5]/55 border border-gray-200 rounded-2xl p-3.5 text-xs font-bold text-teal-900 outline-none cursor-pointer hover:bg-white transition-colors appearance-none"
              >
                <option value="All Positions">All Positions</option>
                <option value="Director">Director</option>
                <option value="Manager">Manager</option>
                <option value="Assistant Manager">Assistant Manager</option>
                <option value="Team Leader">Team Leader</option>
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><MdExpandMore size={18} /></span>
            </div>
          </div>
          <button onClick={loadUsers} className="p-2.5 bg-[#faf8f5] hover:bg-white border border-gray-200 rounded-2xl transition text-teal-950 flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"><MdRefresh size={16} /> Sync Database</button>
        </div>

        {loading && <LoadingSpinner text="Memuat berkas profil karyawan..." />}

        {!loading && filteredUsers.length === 0 && (
          <EmptyState text="Karyawan tidak ditemukan. Coba filter dengan kata kunci lain!" />
        )}

        {/* Grid Kartu Karyawan */}
        {!loading && filteredUsers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUsers.map((emp, index) => {
              const roleTheme = getRoleTheme(emp.role);
              return (
                <div
                  key={emp.id || index}
                  className="bg-white rounded-[32px] border border-amber-200/25 relative group overflow-hidden shadow-xs hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between text-left"
                >
                  <div className={`h-2.5 w-full bg-gradient-to-r ${roleTheme.split(" ").slice(0, 3).join(" ")}`} />

                  <button 
                    onClick={() => handleDelete(emp.id || emp.email)}
                    className="absolute top-5 right-5 text-gray-300 hover:text-rose-500 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                    disabled={loading}
                  >
                    <AiFillDelete size={18} />
                  </button>

                  <div className="p-6 pb-4 text-center flex flex-col items-center flex-1">
                    <div className="relative mb-4 mt-2">
                      <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center font-bold text-2xl shadow-sm ${getAvatarBg(emp.name)}`}>
                        {emp.name ? emp.name.charAt(0).toUpperCase() : "E"}
                      </div>
                      <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
                    </div>

                    <h3 className="text-base font-bold text-teal-950 leading-snug line-clamp-1 px-1" title={emp.name}>
                      {emp.name}
                    </h3>
                    
                    <span className={`text-[9px] px-3.5 py-1.5 rounded-full font-bold mt-3 tracking-wider uppercase border ${roleTheme.split(" ").slice(3).join(" ")}`}>
                      {emp.role || "Member"}
                    </span>

                    <div className="w-full space-y-3 mt-6 pt-5 border-t border-gray-100 text-left">
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 bg-[#faf8f5] text-teal-900 rounded-lg"><MdPhone size={14} /></span>
                        <div>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">Telepon</p>
                          <p className="text-xs font-semibold text-gray-700 truncate">{emp.phone || "-"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 bg-[#faf8f5] text-teal-900 rounded-lg"><MdOutlineWaterDrop size={14} /></span>
                        <div>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">Gol. Darah</p>
                          <p className="text-xs font-bold text-gray-700">{emp.bloodGroup || "-"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 bg-[#faf8f5] text-teal-900 rounded-lg"><MdOutlineMail size={14} /></span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">Email</p>
                          <p className="text-xs font-semibold text-gray-700 truncate" title={emp.email}>{emp.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#faf8f5] px-6 py-4 flex justify-between items-center border-t border-gray-100 rounded-b-[32px]">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Rate Gaji</span>
                    <span className="text-xs font-bold text-teal-950 bg-gradient-to-r from-amber-300 to-amber-400 px-3 py-1 rounded-lg shadow-sm">{emp.salary || "-"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // --- RENDER 3: ADD NEW EMPLOYEE ---
  return (
    <div className="bg-white rounded-[32px] p-8 border border-amber-200/30 shadow-sm max-w-4xl mx-auto animate-in slide-in-from-right duration-300">
      <button
        onClick={() => setView("list")}
        className="flex items-center gap-1.5 text-gray-400 hover:text-teal-950 mb-5 group cursor-pointer"
      >
        <MdChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold">Back to directory</span>
      </button>

      <h1 className="text-3xl font-bold text-teal-950 mb-8 tracking-tight font-master-title">Add New Employee</h1>

      <form onSubmit={handleSubmit}>
        
        {/* Designation */}
        <div className="mb-10 text-left">
          <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-5">
            Choose Employee Designation
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Director", "Manager", "Assistant Manager", "Team Leader"].map((role) => {
              const isSelected = dataForm.role === role;
              return (
                <label
                  key={role}
                  className={`bg-white p-5 rounded-3xl border flex gap-4 cursor-pointer hover:border-teal-950 shadow-xs hover:shadow transition-all duration-200 ${
                    isSelected ? "border-teal-950 ring-1 ring-teal-950 bg-teal-50/20" : "border-gray-100"
                  }`}
                >
                  <input
                    type="radio" name="role" value={role} checked={isSelected}
                    onChange={handleChange} disabled={loading}
                    className="mt-1 w-4 h-4 accent-teal-950 cursor-pointer"
                  />
                  <div>
                    <span className="text-[14px] font-bold text-teal-950 block mb-1">{role}</span>
                    <span className="text-[10px] text-gray-400 leading-snug block">
                      Akses kasir POS, daftar obat, & laporan apotek.
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Input fields */}
        <div className="mb-10 text-left">
          <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-5">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <InputBox label="Full Name" name="name" value={dataForm.name} placeholder="Thomas Flecture" onChange={handleChange} disabled={loading} required />
            <InputBox label="Phone Number" name="phone" value={dataForm.phone} placeholder="(406) 555-0120" onChange={handleChange} disabled={loading} />
            <InputBox label="Email Address" name="email" type="email" value={dataForm.email} placeholder="thomas@apotek.com" onChange={handleChange} disabled={loading} required />
            <InputBox label="Password" name="password" type="password" value={dataForm.password} placeholder="••••••••" onChange={handleChange} disabled={loading} required />
            <InputBox label="Blood Group" name="bloodGroup" value={dataForm.bloodGroup} placeholder="O / A / B / AB" onChange={handleChange} disabled={loading} />
            <InputBox label="Salary" name="salary" value={dataForm.salary} placeholder="Rp 5.500.000" onChange={handleChange} disabled={loading} />
          </div>
        </div>

        {/* Form actions */}
        <div className="mt-12 flex justify-end items-center gap-6 border-t pt-8">
          <button
            type="button" onClick={() => setView("list")}
            className="text-sm font-bold text-gray-450 hover:text-gray-650 cursor-pointer" disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit" disabled={loading}
            className="px-10 py-4 bg-teal-950 hover:bg-teal-900 text-amber-300 hover:text-white rounded-2xl text-xs font-extrabold shadow-md shadow-amber-500/5 transition-colors cursor-pointer"
          >
            {loading ? "Mohon Tunggu..." : "ADD EMPLOYEE"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputBox({ label, name, type = "text", value, placeholder, onChange, disabled, required }) {
  return (
    <div className="flex flex-col w-full text-left">
      <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-0.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type} name={name} value={value} placeholder={placeholder}
        onChange={onChange} disabled={disabled} required={required}
        className="w-full bg-[#faf8f5]/60 border border-gray-200 p-3.5 rounded-xl text-xs font-semibold outline-none focus:border-teal-700 focus:bg-white transition-all disabled:opacity-50"
      />
    </div>
  );
}