import React, { useState } from "react";
import {
  MdAdd,
  MdClose,
  MdPerson,
  MdSearch,
  MdPhone,
  MdBloodtype,
  MdTransgender,
  MdFilterList,
} from "react-icons/md";

// Shared Components
import PageHeader from "../components/PageHeader";

// IMPORT DATA DUMMY
import dataApotek from "../data/dataApotek.json";

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("All Position");

  const { employees } = dataApotek;

  // 1. Logic Filtering yang lebih bersih
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPosition =
      filterPosition === "All Position" || emp.role === filterPosition;
    return matchesSearch && matchesPosition;
  });

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      {/* 2. PageHeader yang reusable (Gacor!) */}
      <PageHeader title="Staff & Employee" breadcrumb="Human Resources">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:bg-emerald-700 hover:scale-105 transition-all flex items-center gap-2 text-sm"
        >
          <MdAdd className="text-xl" /> Add New Staff
        </button>
      </PageHeader>

      {/* 3. Filter & Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 mt-6">
        <div className="relative flex-1 group">
          <MdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by employee name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border-2 border-transparent rounded-2xl shadow-sm focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-sm font-medium"
          />
        </div>

        <div className="relative w-full md:w-72 group">
          <MdFilterList className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl group-focus-within:text-emerald-500 transition-colors" />
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="w-full pl-14 pr-10 py-4 bg-white border-2 border-transparent rounded-2xl shadow-sm focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-sm appearance-none cursor-pointer font-bold text-gray-600"
          >
            <option>All Position</option>
            <option>Apoteker Utama</option>
            <option>Asisten Apoteker</option>
            <option>Staff Gudang</option>
            <option>Kasir Farmasi</option>
          </select>
        </div>
      </div>

      {/* 4. Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <EmployeeCard key={emp.id} emp={emp} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      {/* 5. Modal Section */}
      {isModalOpen && (
        <AddEmployeeModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS (Biar file utama nggak kepanjangan) ---

function EmployeeCard({ emp }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-5">
          <img
            src={emp.image || "https://ui-avatars.com/api/?name=" + emp.name}
            alt={emp.name}
            className="w-28 h-28 rounded-[2.2rem] object-cover ring-8 ring-emerald-50 shadow-xl group-hover:ring-emerald-100 transition-all"
          />
          <div
            className={`absolute bottom-1 right-1 w-6 h-6 border-4 border-white rounded-full ${emp.status === "Active" ? "bg-emerald-500" : "bg-orange-500"}`}
          />
        </div>
        <h4 className="font-black text-gray-800 text-xl tracking-tight">
          {emp.name}
        </h4>
        <div className="mt-2 inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
          {emp.role}
        </div>
      </div>

      <div className="space-y-4 bg-gray-50/80 p-5 rounded-[1.5rem]">
        <InfoRow
          icon={<MdPhone className="text-emerald-500" />}
          label="Phone"
          value={emp.phone || "0812-xxxx"}
        />
        <InfoRow
          icon={<MdBloodtype className="text-red-500" />}
          label="Blood"
          value={emp.bloodType || "O+"}
        />
        <InfoRow
          icon={<MdTransgender className="text-blue-500" />}
          label="Gender"
          value={emp.gender || "Male"}
        />
      </div>

      <button className="w-full mt-6 py-3 rounded-xl border-2 border-gray-50 text-gray-400 hover:text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50 font-bold text-xs transition-all uppercase tracking-[0.2em]">
        View Details
      </button>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-gray-400">
        <div className="p-1.5 bg-white rounded-lg shadow-sm">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-gray-800 font-bold text-xs">{value}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-gray-50">
      <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <MdSearch className="text-gray-300 text-4xl" />
      </div>
      <p className="text-gray-400 font-bold">Staff member not found...</p>
    </div>
  );
}

function AddEmployeeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-black text-gray-800 tracking-tighter">
            Registration
          </h3>
          <button
            onClick={onClose}
            className="bg-gray-100 p-3 rounded-2xl text-gray-400 hover:text-red-500 transition-all"
          >
            <MdClose size={24} />
          </button>
        </div>
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-bold"
              placeholder="Ex: Dr. Smith"
            />
          </div>
          {/* ... input lainnya ... */}
          <button className="col-span-2 bg-emerald-600 text-white py-5 rounded-2xl font-black shadow-2xl shadow-emerald-200 mt-6 uppercase tracking-widest text-xs">
            Save Employee
          </button>
        </form>
      </div>
    </div>
  );
}
