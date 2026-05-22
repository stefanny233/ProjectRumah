import React, { useState } from "react";
import {
  MdChevronLeft,
  MdExpandMore,
  MdCalendarToday,
  MdAdd,
  MdSearch,
  MdMoreVert,
  MdOutlineSearch,
} from "react-icons/md";

export default function EmployeePage() {
  const [view, setView] = useState("list");

  // Data Dummy berdasarkan gambar image_0958b6.png
  const employeeData = [
    {
      id: 1,
      name: "Darlene Robertson",
      role: "Service Provider",
      phone: "(406) 555-0120",
      blood: "A+ (Positive)",
      email: "jane@gmail.com",
      salary: "$3456.00",
      img: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Jacob Jones",
      role: "Service Provider",
      phone: "(406) 555-0120",
      blood: "A+ (Positive)",
      email: "jane@gmail.com",
      salary: "$3456.00",
      img: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Cody Fisher",
      role: "Service Provider",
      phone: "(406) 555-0120",
      blood: "A+ (Positive)",
      email: "jane@gmail.com",
      salary: "$3456.00",
      img: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: 4,
      name: "Esther Howard",
      role: "Service Provider",
      phone: "(406) 555-0120",
      blood: "A+ (Positive)",
      email: "jane@gmail.com",
      salary: "$3456.00",
      img: "https://i.pravatar.cc/150?u=4",
    },
    {
      id: 5,
      name: "Jerome Bell",
      role: "Service Provider",
      phone: "(406) 555-0120",
      blood: "A+ (Positive)",
      email: "jane@gmail.com",
      salary: "$3456.00",
      img: "https://i.pravatar.cc/150?u=5",
    },
    {
      id: 6,
      name: "Dianne Russell",
      role: "Service Provider",
      phone: "(406) 555-0120",
      blood: "A+ (Positive)",
      email: "jane@gmail.com",
      salary: "$3456.00",
      img: "https://i.pravatar.cc/150?u=6",
    },
  ];

  // --- HALAMAN LIST EMPLOYEE (SUDAH DISAMAKAN DENGAN GAMBAR) ---
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

        {/* Filter & Stats Section */}
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div className="flex gap-4 flex-1 max-w-2xl">
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-2">
                Search By
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by anything"
                  className="w-full bg-white border-none rounded-lg p-3 text-sm shadow-sm outline-none"
                />
                <MdOutlineSearch
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <div className="w-48">
              <label className="text-xs text-gray-400 block mb-2">
                Position
              </label>
              <div className="relative">
                <select className="w-full bg-white border-none rounded-lg p-3 text-sm shadow-sm appearance-none outline-none text-gray-400">
                  <option>Position</option>
                </select>
                <MdExpandMore
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <button className="bg-[#28B95E] text-white p-3 rounded-lg self-end shadow-sm">
              <MdOutlineSearch size={24} />
            </button>
          </div>

          {/* Mini Stats Card (Right) */}
          <div className="bg-white p-3 rounded-xl shadow-sm flex gap-6 px-6 border border-gray-50">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase">Vaction</p>
              <p className="text-sm font-bold text-blue-500">14</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase">Day Off</p>
              <p className="text-sm font-bold text-red-400">04</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase">At Office</p>
              <p className="text-sm font-bold text-green-500">50</p>
            </div>
          </div>
        </div>

        {/* EMPLOYEE GRID CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {employeeData.map((emp) => (
            <div
              key={emp.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 relative group hover:shadow-md transition-all"
            >
              <MdMoreVert className="absolute top-4 right-4 text-gray-300 cursor-pointer" />
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={emp.img}
                  alt={emp.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 leading-tight">
                    {emp.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-bold mt-1 inline-block">
                    {emp.role}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Phone</p>
                  <p className="text-[11px] font-semibold text-gray-700">
                    {emp.phone}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">
                    Blood Group
                  </p>
                  <p className="text-[11px] font-semibold text-gray-700">
                    {emp.blood}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Email</p>
                  <p className="text-[11px] font-semibold text-gray-700">
                    {emp.email}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">
                    Hourly Rate/Salary
                  </p>
                  <p className="text-[11px] font-semibold text-gray-700">
                    {emp.salary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-10 gap-2 items-center">
          <button className="p-2 text-gray-400">
            <MdChevronLeft />
          </button>
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 rounded-lg text-xs font-bold ${n === 3 ? "bg-[#5065f6] text-white" : "text-gray-400"}`}
            >
              {n}
            </button>
          ))}
          <span className="text-gray-400 text-xs">...</span>
          <button className="w-8 h-8 rounded-lg text-xs font-bold text-gray-400">
            40
          </button>
          <button className="p-2 text-gray-400 rotate-180">
            <MdChevronLeft />
          </button>
        </div>
      </div>
    );
  }

  // --- HALAMAN ADD EMPLOYEE (TETAP SESUAI FIGMA) ---
  return (
    <div className="bg-[#FDFDFD] min-h-screen px-8 pt-4 pb-12 animate-in slide-in-from-right duration-500 font-sans">
      <button
        onClick={() => setView("list")}
        className="flex items-center gap-1 text-gray-400 hover:text-gray-600 mb-4 group"
      >
        <MdChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium">Back</span>
      </button>

      <h1 className="text-[32px] font-semibold text-[#111827] mb-8">
        Add Employee
      </h1>

      <div className="mb-10">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
          Choose Employee Designation
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Director", "Manager", "Assistant Manager", "Team Leader"].map(
            (role, idx) => (
              <label
                key={role}
                className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4 cursor-pointer hover:border-[#5065f6] shadow-sm"
              >
                <input
                  type="radio"
                  name="designation"
                  defaultChecked={idx === 0}
                  className="mt-1 w-4 h-4 accent-[#5065f6]"
                />
                <div>
                  <span className="text-[15px] font-semibold text-[#111827] block mb-1">
                    {role}
                  </span>
                  <span className="text-[11px] text-gray-400 leading-relaxed font-normal">
                    Description based on roles...
                  </span>
                </div>
              </label>
            ),
          )}
        </div>
      </div>

      <div className="mb-10">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <InputBox label="Full Name" placeholder="Thomas Flecture" />
          <InputBox label="Phone Number" placeholder="(406) 555-0120" />
          <InputBox
            label="Email Address"
            placeholder="uihutofficial@gmail.com"
          />
          <InputBox label="Birth Day" placeholder="12 Feb 2022" isDate />
          <InputBox label="Hour Rate/Salary" placeholder="$1000.00" isSelect />
          <InputBox label="Salary Type" placeholder="Select Option" isSelect />
          <InputBox label="Gender" placeholder="Select" isSelect />
          <InputBox label="City" placeholder="Sylhet" isSelect />
          <InputBox label="Zip Code" placeholder="Bangladesh" isSelect />
        </div>
      </div>

      <div className="mt-12 flex justify-end items-center gap-6 border-t pt-8">
        <button
          onClick={() => setView("list")}
          className="text-sm font-semibold text-gray-400 hover:text-gray-600"
        >
          Cancel
        </button>
        <button className="px-10 py-3.5 bg-[#5065f6] text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-200">
          Add Employee
        </button>
      </div>
    </div>
  );
}

function InputBox({ label, placeholder, isSelect, isDate }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-[11px] font-bold text-gray-400 uppercase mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-[#F8F9FB] p-3.5 rounded-xl text-sm font-medium outline-none"
        />
        {isSelect && (
          <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        {isDate && (
          <MdCalendarToday className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
        )}
      </div>
    </div>
  );
}
