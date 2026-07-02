import React, { useState, useEffect } from "react";
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
  const [view, setView] = useState("list");
  
  const loadLocalEmployees = () => {
    const localSaved = JSON.parse(localStorage.getItem("local_employees") || "[]");
    const jsonEmployees = dataApotek.employees || [];
    const combined = [...localSaved, ...jsonEmployees];
    
    const unique = [];
    const seen = new Set();
    for (const item of combined) {
      if (item.email && !seen.has(item.email)) {
        seen.add(item.email);
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

  const [dataForm, setDataForm] = useState({
    name: "", email: "", password: "", phone: "", bloodGroup: "", salary: "", role: "Director",
  });

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
        if (item.email && !seen.has(item.email)) {
          seen.add(item.email);
          unique.push(item);
        }
      }
      setUsers(unique);
    } catch (err) {
      setUsers(loadLocalEmployees());
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

  // Modern SaaS Colors based on Role
  const getRoleBadgeStyle = (role) => {
    const r = (role || "").toLowerCase();
    if (r.includes("director")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (r.includes("manager")) return "bg-teal-100 text-teal-800 border-teal-200";
    if (r.includes("assistant")) return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getRoleTopBorder = (role) => {
    const r = (role || "").toLowerCase();
    if (r.includes("director")) return "bg-emerald-500";
    if (r.includes("manager")) return "bg-teal-500";
    if (r.includes("assistant")) return "bg-blue-500";
    return "bg-slate-400";
  };

  // Solid, clean avatars
  const getAvatarBg = (name) => {
    const char = name ? name.charAt(0).toUpperCase() : "E";
    const styles = {
      A: "bg-emerald-600", B: "bg-teal-600", C: "bg-cyan-600", 
      D: "bg-blue-600", E: "bg-indigo-600", F: "bg-violet-600", 
      G: "bg-purple-600", H: "bg-fuchsia-600", I: "bg-rose-600", 
      J: "bg-orange-600", M: "bg-emerald-700", N: "bg-teal-700", 
      S: "bg-blue-700", T: "bg-indigo-700"
    };
    return styles[char] || "bg-slate-700";
  };

  const filteredUsers = users.filter((emp) => {
    const matchesSearch = 
      (emp.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.phone || "").toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesPosition = 
      selectedPosition === "All Positions" || 
      (emp.role || "").toLowerCase() === selectedPosition.toLowerCase();

    return matchesSearch && matchesPosition;
  });

  return (
    <div className="p-6 lg:p-10 bg-[#F8FAFC] min-h-screen font-sans text-left text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
      
      {view === "list" ? (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Employee Directory
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Kelola data karyawan apotek & otorisasi sistem.
              </p>
            </div>
            
            <button
              onClick={() => setView("add")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <MdAdd size={20} />
              Add New Employee
            </button>
          </div>

          {error && <AlertBox type="error">{error}</AlertBox>}
          {success && <AlertBox type="success">{success}</AlertBox>}

          {/* STATS OVERVIEW PANEL (Clean & Modern) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <span className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><MdPeopleOutline size={26} /></span>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Karyawan</p>
                <p className="text-2xl font-extrabold text-slate-900">{filteredUsers.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <span className="p-4 bg-blue-50 text-blue-600 rounded-xl"><MdWorkOutline size={26} /></span>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Jabatan Aktif</p>
                <p className="text-2xl font-extrabold text-slate-900">4 Posisi</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <span className="p-4 bg-teal-50 text-teal-600 rounded-xl"><MdCreditCard size={26} /></span>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status Sistem</p>
                <p className="text-2xl font-extrabold text-slate-900">100% Aktif</p>
              </div>
            </div>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:max-w-2xl">
              <div className="relative flex items-center flex-1">
                <span className="absolute left-4 text-slate-400"><MdOutlineSearch size={22} /></span>
                <input
                  type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari nama, email, atau telp..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-12 pr-4 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="relative w-full sm:w-56">
                <select 
                  value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 px-4 text-sm font-semibold text-slate-700 outline-none cursor-pointer focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
                >
                  <option value="All Positions">All Positions</option>
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="Assistant Manager">Assistant Manager</option>
                  <option value="Team Leader">Team Leader</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><MdExpandMore size={20} /></span>
              </div>
            </div>
            <button onClick={loadUsers} className="w-full lg:w-auto px-5 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition text-slate-700 flex justify-center items-center gap-2 text-sm font-bold cursor-pointer">
              <MdRefresh size={18} className="text-slate-500" /> Sync
            </button>
          </div>

          {loading && <LoadingSpinner text="Sinkronisasi data karyawan..." />}

          {!loading && filteredUsers.length === 0 && (
            <EmptyState text="Karyawan tidak ditemukan. Coba filter dengan kata kunci lain!" />
          )}

          {/* PREMIUM PROFILE CARDS GRID */}
          {!loading && filteredUsers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map((emp, index) => {
                return (
                  <div
                    key={emp.id || index}
                    className="bg-white rounded-2xl border border-slate-200 relative group overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Top Accent Line */}
                    <div className={`h-1.5 w-full ${getRoleTopBorder(emp.role)}`} />

                    {/* Delete button (fades in on hover) */}
                    <button 
                      onClick={() => handleDelete(emp.id || emp.email)}
                      className="absolute top-4 right-4 p-2 bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-rose-100 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                      disabled={loading}
                      title="Hapus Karyawan"
                    >
                      <AiFillDelete size={18} />
                    </button>

                    <div className="p-6 text-center flex flex-col items-center flex-1">
                      {/* Avatar */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-sm mb-4 ${getAvatarBg(emp.name)}`}>
                        {emp.name ? emp.name.charAt(0).toUpperCase() : "E"}
                      </div>

                      {/* Name & Role */}
                      <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1" title={emp.name}>
                        {emp.name}
                      </h3>
                      <span className={`text-[10px] px-3 py-1 rounded-md font-bold uppercase tracking-wide border ${getRoleBadgeStyle(emp.role)}`}>
                        {emp.role || "Member"}
                      </span>

                      {/* Details (Divider + Rows) */}
                      <div className="w-full mt-6 space-y-3 border-t border-slate-100 pt-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                            <MdOutlineMail size={14} /> Email
                          </span>
                          <span className="text-xs font-semibold text-slate-800 truncate max-w-[120px]" title={emp.email}>
                            {emp.email}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                            <MdPhone size={14} /> Telp
                          </span>
                          <span className="text-xs font-semibold text-slate-800">
                            {emp.phone || "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                            <MdOutlineWaterDrop size={14} /> Gol. Darah
                          </span>
                          <span className="text-xs font-bold text-rose-500">
                            {emp.bloodGroup || "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer (Salary) */}
                    <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-100 mt-auto">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Salary Rate</span>
                      <span className="text-xs font-extrabold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">
                        {emp.salary || "-"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* VIEW ADD EMPLOYEE */
        <div className="max-w-4xl mx-auto animate-in slide-in-from-right duration-500">
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 mb-6 group cursor-pointer transition-colors font-medium"
          >
            <MdChevronLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Direktori
          </button>

          <div className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight border-b border-slate-100 pb-6">
              Registrasi Karyawan Baru
            </h1>

            <form onSubmit={handleSubmit}>
              
              {/* Designation Selector */}
              <div className="mb-10 text-left">
                <h4 className="text-xs font-bold text-slate-900 mb-4">
                  1. Pilih Posisi / Jabatan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Director", "Manager", "Assistant Manager", "Team Leader"].map((role) => {
                    const isSelected = dataForm.role === role;
                    return (
                      <label
                        key={role}
                        className={`relative p-5 rounded-xl border-2 flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                          isSelected 
                          ? "border-emerald-500 bg-emerald-50/30 shadow-sm" 
                          : "border-slate-200 hover:border-emerald-300 bg-white"
                        }`}
                      >
                        <input
                          type="radio" name="role" value={role} checked={isSelected}
                          onChange={handleChange} disabled={loading}
                          className="mt-0.5 w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div>
                          <span className={`text-sm font-bold block mb-1 ${isSelected ? "text-emerald-900" : "text-slate-700"}`}>
                            {role}
                          </span>
                          <span className="text-xs text-slate-500 leading-relaxed block">
                            Menentukan akses kontrol dan otorisasi dalam sistem apotek.
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Input Form Fields */}
              <div className="mb-8 text-left">
                <h4 className="text-xs font-bold text-slate-900 mb-4">
                  2. Informasi Personal
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                  <InputBox label="Nama Lengkap" name="name" value={dataForm.name} placeholder="Contoh: Budi Santoso" onChange={handleChange} disabled={loading} required />
                  <InputBox label="Email Aktif" name="email" type="email" value={dataForm.email} placeholder="budi@apotek.com" onChange={handleChange} disabled={loading} required />
                  <InputBox label="Password Akses" name="password" type="password" value={dataForm.password} placeholder="••••••••" onChange={handleChange} disabled={loading} required />
                  <InputBox label="Nomor Telepon" name="phone" value={dataForm.phone} placeholder="0812-3456-7890" onChange={handleChange} disabled={loading} />
                  <InputBox label="Golongan Darah" name="bloodGroup" value={dataForm.bloodGroup} placeholder="O / A / B / AB" onChange={handleChange} disabled={loading} />
                  <InputBox label="Gaji Pokok (Opsional)" name="salary" value={dataForm.salary} placeholder="Rp 5.500.000" onChange={handleChange} disabled={loading} />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row justify-end items-center gap-4 pt-6">
                <button
                  type="button" onClick={() => setView("list")}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer" 
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  type="submit" disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><MdRefresh className="animate-spin" size={18} /> Menyimpan...</>
                  ) : (
                    "Simpan Data Karyawan"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InputBox({ label, name, type = "text", value, placeholder, onChange, disabled, required }) {
  return (
    <div className="flex flex-col w-full text-left">
      <label className="text-xs font-bold text-slate-700 mb-2">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type} name={name} value={value} placeholder={placeholder}
        onChange={onChange} disabled={disabled} required={required}
        className="w-full bg-white border border-slate-200 p-3.5 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-60 disabled:bg-slate-50 shadow-sm"
      />
    </div>
  );
}