import React, { useState, useEffect } from "react";
import {
  MdChevronLeft,
  MdExpandMore,
  MdCalendarToday,
  MdAdd,
  MdMoreVert,
  MdOutlineSearch,
} from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

// 🔥 HUBUNGKAN KE AXIOS SERVICE & REUSABLE COMPONENTS MASI
import { userService } from "../userService";
import GenericTable from "../components/GenericTable";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

export default function EmployeePage() {
  const [view, setView] = useState("list");
  
  // State manajemen data sesuai modul praktikum
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // State Form Tambah Data
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "", // Ditambahkan karena tabel user Supabase mase butuh password
    phone: "",
    bloodGroup: "",
    salary: "",
    role: "Director", // Default role radio button pertama
  });

  // Load data dari Supabase saat halaman dibuka (Langkah 6 Modul)
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userService.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data dari Supabase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle perubahan nilai input form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Handle submit tambah data ke Supabase (Langkah 5 Modul)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Kirim data form ke Supabase via Axios
      await userService.createUser({
        name: dataForm.name,
        email: dataForm.email,
        password: dataForm.password || "123456", // Fallback password jika kosong
        phone: dataForm.phone,
        bloodGroup: dataForm.bloodGroup,
        salary: dataForm.salary,
        role: dataForm.role,
      });

      setSuccess("Karyawan baru berhasil ditambahkan!");
      
      // Reset form
      setDataForm({
        name: "", email: "", password: "", phone: "", bloodGroup: "", salary: "", role: "Director"
      });

      setTimeout(() => setSuccess(""), 3000);
      loadUsers(); // Refresh data tabel otomatis
      setView("list"); // Balik ke tampilan daftar kartu
    } catch (err) {
      setError(`Gagal menambahkan data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle aksi hapus data (Langkah 7 Modul)
  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus karyawan ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await userService.deleteUser(id);

      setSuccess("Data karyawan berhasil dihapus!");
      setTimeout(() => setSuccess(""), 3000);
      loadUsers(); // Refresh data
    } catch (err) {
      setError(`Gagal menghapus: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- TAMPILAN HALAMAN LIST EMPLOYEE ---
  if (view === "list") {
    return (
      <div className="p-8 bg-[#F8F9FB] min-h-screen font-sans">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-gray-500">Employee List</h1>
          <button
            onClick={() => setView("add")}
            className="bg-[#5065f6] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg shadow-blue-200"
          >
            <MdAdd size={20} />
            Add New Employee
          </button>
        </div>

        {/* Notifikasi Alert Box */}
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        {/* Filter & Stats Section */}
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div className="flex gap-4 flex-1 max-w-2xl">
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-2">Search By</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by anything"
                  className="w-full bg-white border-none rounded-lg p-3 text-sm shadow-sm outline-none"
                />
                <MdOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div className="w-48">
              <label className="text-xs text-gray-400 block mb-2">Position</label>
              <div className="relative">
                <select className="w-full bg-white border-none rounded-lg p-3 text-sm shadow-sm appearance-none outline-none text-gray-400">
                  <option>Position</option>
                </select>
                <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <button className="bg-[#28B95E] text-white p-3 rounded-lg self-end shadow-sm">
              <MdOutlineSearch size={24} />
            </button>
          </div>
          

          {/* Mini Stats Card */}
          <div className="bg-white p-3 rounded-xl shadow-sm flex gap-6 px-6 border border-gray-50">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase">Total Staff</p>
              <p className="text-sm font-bold text-blue-500">{users.length}</p>
            </div>
          </div>
        </div>

        {/* JALUR KONDISI LOADING, KOSONG & REAL DATA (UX MODUL KAMPUS) */}
        {loading && <LoadingSpinner text="Menghubungkan ke database Supabase..." />}

        {!loading && users.length === 0 && !error && (
          <EmptyState text="Belum ada karyawan terdaftar. Silakan klik Add New Employee!" />
        )}

        {/* RENDER GRID CARD DARI SUPABASE */}
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {users.map((emp, index) => (
              <div
                key={emp.id || index}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 relative group hover:shadow-md transition-all"
              >
                {/* Tombol Delete langsung dipasang di ikon tong sampah pojok kanan atas kartu */}
                <button 
                  onClick={() => handleDelete(emp.id)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                  disabled={loading}
                  title="Hapus Karyawan"
                >
                  <AiFillDelete size={18} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center font-bold text-lg text-white bg-indigo-500">
                    {emp.name ? emp.name.charAt(0).toUpperCase() : "E"}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 leading-tight truncate max-w-[120px]">
                      {emp.name}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-bold mt-1 inline-block">
                      {emp.role || "Member"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase">Phone</p>
                    <p className="text-[11px] font-semibold text-gray-700 truncate">{emp.phone || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase">Blood Group</p>
                    <p className="text-[11px] font-semibold text-gray-700">{emp.bloodGroup || "-"}</p>
                  </div>
                  <div className="col-span-1 overflow-hidden">
                    <p className="text-[9px] text-gray-400 uppercase">Email</p>
                    <p className="text-[11px] font-semibold text-gray-700 truncate" title={emp.email}>
                      {emp.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase">Salary</p>
                    <p className="text-[11px] font-semibold text-gray-700 truncate">{emp.salary || "-"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- TAMPILAN HALAMAN ADD EMPLOYEE (FORM SUBMIT KE SUPABASE) ---
  return (
    <div className="bg-[#FDFDFD] min-h-screen px-8 pt-4 pb-12 animate-in slide-in-from-right duration-500 font-sans">
      <button
        onClick={() => setView("list")}
        className="flex items-center gap-1 text-gray-400 hover:text-gray-600 mb-4 group"
      >
        <MdChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <h1 className="text-[32px] font-semibold text-[#111827] mb-8">Add Employee</h1>

      <form onSubmit={handleSubmit}>
        {/* Role Designation Radio Buttons */}
        <div className="mb-10">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
            Choose Employee Designation
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Director", "Manager", "Assistant Manager", "Team Leader"].map((role) => (
              <label
                key={role}
                className={`bg-white p-6 rounded-2xl border flex gap-4 cursor-pointer hover:border-[#5065f6] shadow-sm transition-all ${
                  dataForm.role === role ? "border-[#5065f6] ring-1 ring-[#5065f6]" : "border-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={dataForm.role === role}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-1 w-4 h-4 accent-[#5065f6]"
                />
                <div>
                  <span className="text-[15px] font-semibold text-[#111827] block mb-1">{role}</span>
                  <span className="text-[11px] text-gray-400 leading-relaxed font-normal">
                    Description based on roles...
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Input Fields Form Personal Information */}
        <div className="mb-10">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <InputBox label="Full Name" name="name" value={dataForm.name} placeholder="Thomas Flecture" onChange={handleChange} disabled={loading} required />
            <InputBox label="Phone Number" name="phone" value={dataForm.phone} placeholder="(406) 555-0120" onChange={handleChange} disabled={loading} />
            <InputBox label="Email Address" name="email" type="email" value={dataForm.email} placeholder="uihutofficial@gmail.com" onChange={handleChange} disabled={loading} required />
            <InputBox label="Password" name="password" type="password" value={dataForm.password} placeholder="••••••••" onChange={handleChange} disabled={loading} required />
            <InputBox label="Blood Group" name="bloodGroup" value={dataForm.bloodGroup} placeholder="O / A / B / AB" onChange={handleChange} disabled={loading} />
            <InputBox label="Salary / Rate" name="salary" value={dataForm.salary} placeholder="$1000.00" onChange={handleChange} disabled={loading} />
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="mt-12 flex justify-end items-center gap-6 border-t pt-8">
          <button
            type="button"
            onClick={() => setView("list")}
            className="text-sm font-semibold text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3.5 bg-[#5065f6] disabled:bg-blue-300 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-200 transition-colors"
          >
            {loading ? "Mohon Tunggu..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable InputBox Sub-component
function InputBox({ label, name, type = "text", value, placeholder, onChange, disabled, required }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-[11px] font-bold text-gray-400 uppercase mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="w-full bg-[#F8F9FB] p-3.5 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-blue-400 transition-all disabled:opacity-50"
        />
      </div>
    </div>
  );
}