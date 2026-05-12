import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MdAdd,
  MdSearch,
  MdClose,
  MdCloudUpload,
  MdEdit,
  MdDeleteOutline,
  MdMoreVert,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

// Ambil data dari JSON yang kamu buat tadi
import dataApotek from "../data/dataApotek.json";

export default function Employee() {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  const renderContent = () => {
    switch (currentTab) {
      case "attendance":
        return <AttendanceModule />;
      case "payroll":
        return <PayrollModule />;
      case "expense":
        return <ExpenseModule />;
      default:
        return <EmployeeListModule />;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 bg-[#F8F9FD] min-h-screen">
      {renderContent()}
    </div>
  );
}

// ==========================================
// 1. EMPLOYEE LIST (CARD VIEW)
// ==========================================
function EmployeeListModule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { employees } = dataApotek;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D5FEF] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all"
        >
          <MdAdd size={20} /> Add New Employee
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm gap-4">
        <div className="flex gap-4 flex-1 items-center">
          <div className="relative max-w-xs w-full">
            <MdSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by anything"
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl outline-none text-sm border border-transparent focus:border-indigo-200 transition-all"
            />
          </div>
          <select className="bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 outline-none border-none">
            <option>Position</option>
          </select>
          <button className="bg-[#47C363] text-white p-2.5 rounded-xl shadow-sm">
            <MdSearch size={20} />
          </button>
        </div>
        <div className="flex gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50 p-3 px-6 rounded-2xl">
          <div>
            Vacation <span className="text-[#5D5FEF] ml-1">14</span>
          </div>
          <div>
            Day Off <span className="text-red-500 ml-1">04</span>
          </div>
          <div>
            At Office <span className="text-green-500 ml-1">● 50</span>
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all relative group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={emp.image}
                  alt=""
                  className="w-14 h-14 rounded-2xl object-cover bg-amber-100"
                />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm leading-tight">
                    {emp.name}
                  </h3>
                  <span className="text-[10px] text-blue-500 font-bold px-2 py-0.5 bg-blue-50 rounded-md">
                    Service Provider
                  </span>
                </div>
              </div>
              <MdMoreVert className="text-gray-300 cursor-pointer" size={20} />
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400 font-bold uppercase">Phone</span>
                <span className="text-gray-700 font-bold">{emp.phone}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400 font-bold uppercase">
                  Blood Group
                </span>
                <span className="text-gray-700 font-bold">A+ (Positive)</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400 font-bold uppercase">Email</span>
                <span className="text-gray-700 font-bold">{emp.email}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400 font-bold uppercase">
                  Hourly Rate/Salary
                </span>
                <span className="text-gray-700 font-bold">$3456.00</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Simpel */}
      <div className="mt-10 flex justify-end items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-indigo-600">
          <MdChevronLeft size={24} />
        </button>
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            className={`w-8 h-8 rounded-lg text-xs font-bold ${n === 3 ? "bg-indigo-600 text-white shadow-md" : "text-gray-400"}`}
          >
            {n}
          </button>
        ))}
        <button className="p-2 text-gray-400 hover:text-indigo-600">
          <MdChevronRight size={24} />
        </button>
      </div>

      {isModalOpen && (
        <AddEmployeeModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

// ==========================================
// 2. ATTENDANCE (VIEW BORDER & PAGINATION)
// ==========================================
function AttendanceModule() {
  const [showAdd, setShowAdd] = useState(false);
  const { attendance } = dataApotek;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance</h2>

      <div className="bg-white p-6 rounded-3xl border border-gray-50 flex items-end gap-4 mb-8 shadow-sm">
        <div className="flex-1 max-w-xs">
          <InputGroup label="Employee Name" type="select" />
        </div>
        <div className="flex gap-4">
          <InputGroup label="Date & Time" type="date" />
        </div>
        <button className="bg-indigo-600 text-white p-3 rounded-xl shadow-md">
          <MdSearch size={22} />
        </button>
        <button
          onClick={() => setShowAdd(true)}
          className="ml-auto bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm"
        >
          + Add Attendance
        </button>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black text-gray-300 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Employee Name</th>
              <th className="p-5">Date</th>
              <th className="p-5">Start Time</th>
              <th className="p-5">End Time</th>
              <th className="p-5">Stay Time</th>
              <th className="p-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {attendance.map((atd) => (
              <tr
                key={atd.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-all font-medium text-gray-600"
              >
                <td className="px-8 py-4 flex items-center gap-3 font-bold text-gray-700">
                  <img
                    src={atd.img}
                    className="w-9 h-9 rounded-full bg-gray-100"
                    alt=""
                  />
                  {atd.name}
                </td>
                <td className="p-5 text-gray-400">{atd.date}</td>
                <td className="p-5 font-bold">{atd.start}</td>
                <td className="p-5 font-bold">{atd.end}</td>
                <td className="p-5">{atd.stay}</td>
                <td className="p-5 text-center">
                  {/* Border Biru di View sesuai request */}
                  <button className="text-[#5D5FEF] font-bold border border-blue-100 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`w-8 h-8 rounded-lg text-xs font-bold ${n === 3 ? "bg-indigo-600 text-white shadow-md" : "text-gray-400"}`}
          >
            {n}
          </button>
        ))}
      </div>

      {showAdd && <AddAttendancePopup onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ==========================================
// 3. PAYROLL (DUMMY DATA INCLUDED)
// ==========================================
function PayrollModule() {
  const payrollData = [
    { id: 1, name: "Eid Bonus", type: "Add", status: "Active" },
    { id: 2, name: "Transport Fee", type: "Add", status: "Active" },
    { id: 3, name: "Baby Bonus", type: "Add", status: "Active" },
    { id: 4, name: "Daily Reward", type: "Add", status: "Active" },
  ];

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl w-fit shadow-sm">
        {["Benefits List", "Salary Setup", "Salary Sheet"].map((tab, i) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${i === 0 ? "bg-indigo-600 text-white" : "text-gray-400"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm min-h-[400px]">
        <h3 className="text-2xl font-bold mb-6">Benefits List</h3>
        <table className="w-full text-left">
          <thead className="text-[11px] text-gray-300 font-bold uppercase tracking-widest">
            <tr className="border-b">
              <th className="py-4">SI</th>
              <th>Benefit Name</th>
              <th>Type</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((item, i) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 text-sm font-bold text-gray-600 hover:bg-gray-50/50"
              >
                <td className="py-4">{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>
                  <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-[10px]">
                    ● {item.status}
                  </span>
                </td>
                <td className="text-center space-x-2">
                  <button className="text-gray-300 hover:text-indigo-600">
                    <MdEdit size={18} />
                  </button>
                  <button className="text-gray-300 hover:text-red-500">
                    <MdDeleteOutline size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Tombol sudah dihapus sesuai request */}
      </div>
    </div>
  );
}

// ==========================================
// 4. EXPENSE (ADD POPUP INCLUDED)
// ==========================================
function ExpenseModule() {
  const { expenses } = dataApotek;
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-8">
        {["Expense Item List", "Expense List", "Expense Statement"].map(
          (tab, i) => (
            <button
              key={tab}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${i === 0 ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-400"}`}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-gray-800 font-black uppercase text-xs tracking-widest">
            Expense Items
          </h3>
          <div className="relative w-64">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border-none rounded-lg outline-none"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="text-[11px] font-black text-gray-300 uppercase tracking-widest">
            <tr className="border-b">
              <th className="py-4">
                <input type="checkbox" className="accent-indigo-600" />
              </th>
              <th>SI</th>
              <th>Expense Item Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, i) => (
              <tr
                key={exp.id}
                className="border-b border-gray-50 hover:bg-gray-50/50"
              >
                <td className="py-4">
                  <input type="checkbox" className="accent-indigo-600" />
                </td>
                <td className="font-bold text-gray-400">{i + 1}</td>
                <td className="font-bold text-gray-700">{exp.name}</td>
                <td className="text-center">
                  <div className="flex justify-center gap-3">
                    <button className="text-gray-300 hover:text-indigo-600">
                      <MdEdit size={18} />
                    </button>
                    <button className="text-gray-300 hover:text-red-500">
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Button sekarang di dalam div putih (bg-white) */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => setShowAdd(true)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-transform active:scale-95"
          >
            Add Expense
          </button>
        </div>
      </div>
      {showAdd && <AddExpensePopup onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ==========================================
// REUSABLE COMPONENTS & MODALS
// ==========================================
function InputGroup({ label, placeholder, type = "text" }) {
  return (
    <div className="w-full">
      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
        {label}
      </label>
      {type === "select" ? (
        <select className="w-full p-3 bg-gray-50 rounded-xl font-bold text-gray-700 outline-none border-none text-xs">
          <option>Select Option</option>
          <option>Thomas Flecture</option>
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-3 bg-gray-50 rounded-xl font-bold text-gray-700 outline-none border-none text-xs"
        />
      )}
    </div>
  );
}

// 2ND PAGE EMPLOYEE (ADD EMPLOYEE)
function AddEmployeeModal({ onClose }) {
  const roles = [
    {
      name: "Director",
      desc: "The role of director differs from business operations of the production",
    },
    {
      name: "Manager",
      desc: "A person responsible for controlling or administering organization",
    },
    {
      name: "Assistant Manager",
      desc: "Assistant Managers are often in charge of daily business",
    },
    {
      name: "Team Leader",
      desc: "A team leader is a person who provides guidance, instruction",
    },
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6 overflow-y-auto">
      <div className="bg-[#F8F9FD] w-full max-w-6xl rounded-[3rem] p-12 relative animate-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 font-bold hover:text-indigo-600"
        >
          <MdChevronLeft size={24} /> Back
        </button>
        <h2 className="text-4xl font-light text-gray-800 mb-10 mt-6">
          Add Employee
        </h2>

        {/* Choose Designation */}
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
          Choose Employee Designation
        </h4>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {roles.map((role) => (
            <div
              key={role.name}
              className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4 cursor-pointer hover:border-indigo-300 transition-all"
            >
              <input
                type="radio"
                name="role"
                className="mt-1 accent-indigo-600 h-4 w-4"
              />
              <div>
                <p className="font-bold text-sm text-gray-800">{role.name}</p>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  {role.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Grid */}
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
          Personal Information
        </h4>
        <div className="grid grid-cols-3 gap-8">
          <InputGroup label="Full Name" placeholder="Thomas Flecture" />
          <InputGroup label="Phone Number" placeholder="(406) 555-0120" />
          <InputGroup
            label="Email Address"
            placeholder="uihutofficial@gmail.com"
          />
          <InputGroup label="Birth Day" type="date" />
          <InputGroup label="Hour Rate/Salary" placeholder="$1000.00" />
          <InputGroup label="Salary Type" type="select" />
        </div>

        <div className="mt-12 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-10 py-3 text-gray-400 font-bold"
          >
            Cancel
          </button>
          <button className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100">
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}

// POPUP EXPENSE ITEM
function AddExpensePopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded-[2rem] w-[400px] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          Add Expense Item
        </h3>
        <InputGroup label="Expense Item Name" type="select" />
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-50 rounded-xl font-bold text-gray-400"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 bg-indigo-600 rounded-xl font-bold text-white shadow-lg shadow-indigo-100">
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

// POPUP ATTENDANCE
function AddAttendancePopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded-[2rem] w-[450px] shadow-2xl animate-in fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-6">Add Attendance</h3>
        <div className="space-y-6">
          <InputGroup label="Employee" type="select" />
          <InputGroup label="Date & Time" type="date" />
          <InputGroup label="Start Time" type="time" />
        </div>
        <div className="flex gap-4 mt-10">
          <button
            onClick={onClose}
            className="flex-1 py-3 font-bold text-gray-400"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
