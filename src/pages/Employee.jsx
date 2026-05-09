import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { MdAdd, MdClose, MdPerson, MdWork, MdBadge } from "react-icons/md";

// IMPORT DATA DUMMY DARI JSON
import dataApotek from "../data/dataApotek.json";

export default function Employee() {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk Search

  const { employees } = dataApotek;

  // --- LOGIC SEARCH & FILTER ---
  const filteredEmployees = employees.filter((emp) => {
    const _searchTerm = searchTerm.toLowerCase();
    return (
      emp.name.toLowerCase().includes(_searchTerm) ||
      emp.role.toLowerCase().includes(_searchTerm)
    );
  });

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      {/* HEADER SECTION */}
      <PageHeader
        title="Staff & Employee"
        breadcrumb="Employee"
        onSearch={setSearchTerm} // Kirim fungsi search ke Header
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:scale-105 active:scale-95 transition-all flex items-center italic uppercase text-sm tracking-widest"
        >
          <MdAdd className="mr-2 text-xl" /> Tambah Staff
        </button>
      </PageHeader>

      {/* GRID STAFF CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white p-8 rounded-[3rem] border border-garis shadow-sm hover:border-primary transition-all group relative overflow-hidden"
            >
              {/* Dekorasi Background */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-latar rounded-full opacity-50 group-hover:bg-primary/10 transition-all" />

              <div className="flex flex-col items-center text-center relative z-10">
                {/* Profile Image Container */}
                <div className="w-24 h-24 bg-latar rounded-[2rem] p-2 mb-4 border border-garis group-hover:border-primary transition-all flex items-center justify-center overflow-hidden">
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h4 className="font-black text-teks text-xl mb-1">
                  {emp.name}
                </h4>
                <p className="text-primary font-black text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-1.5 rounded-full mb-4">
                  {emp.role}
                </p>

                <div className="w-full border-t border-garis pt-5 mt-2 flex justify-between items-center">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[9px] text-teks-samping uppercase font-black tracking-widest">
                      Status
                    </span>
                    <span
                      className={`text-xs font-black flex items-center gap-1 ${emp.status === "Active" ? "text-emerald-500" : "text-orange-500"}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {emp.status}
                    </span>
                  </div>
                  <button className="text-[10px] font-black text-teks-samping hover:text-primary uppercase tracking-widest transition-colors">
                    Detail Profil
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State jika tidak ada hasil search */
          <div className="col-span-full py-20 text-center">
            <p className="text-teks-samping font-black italic uppercase tracking-widest">
              Staff "{searchTerm}" tidak ditemukan...
            </p>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH STAFF */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-teks/40 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white w-full max-w-md rounded-[3.5rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-3xl font-black text-teks italic uppercase tracking-tighter">
                  New Staff
                </h3>
                <p className="text-sm text-teks-samping font-medium">
                  Daftarkan anggota tim baru
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-latar rounded-2xl text-teks-samping hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <MdClose size={28} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-teks-samping uppercase ml-2 tracking-widest">
                  Nama Lengkap
                </label>
                <div className="relative group">
                  <MdPerson className="absolute left-5 top-1/2 -translate-y-1/2 text-teks-samping text-xl group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-14 pr-6 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none transition-all font-bold text-sm"
                    placeholder="Contoh: Dr. Amanda"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-teks-samping uppercase ml-2 tracking-widest">
                  Posisi Kerja
                </label>
                <div className="relative group">
                  <MdWork className="absolute left-5 top-1/2 -translate-y-1/2 text-teks-samping text-xl group-focus-within:text-primary transition-colors" />
                  <select className="w-full pl-14 pr-6 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none transition-all font-bold text-sm appearance-none cursor-pointer">
                    <option>Apoteker Utama</option>
                    <option>Asisten Apoteker</option>
                    <option>Staff Gudang</option>
                    <option>Kasir Farmasi</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-teks-samping uppercase ml-2 tracking-widest">
                  ID Karyawan
                </label>
                <div className="relative group">
                  <MdBadge className="absolute left-5 top-1/2 -translate-y-1/2 text-teks-samping text-xl group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-14 pr-6 py-4 bg-latar border-2 border-transparent focus:border-primary rounded-2xl outline-none transition-all font-bold text-sm"
                    placeholder="Contoh: QWU-001"
                  />
                </div>
              </div>

              <button className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-emerald-100 hover:bg-primary-hover hover:-translate-y-1 transition-all mt-4 uppercase tracking-[0.2em]">
                Simpan Data Staf
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
