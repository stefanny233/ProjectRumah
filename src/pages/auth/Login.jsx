import React, { useState } from "react"; // Tambah useState
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Tambah useNavigate

export default function Login() {
  const navigate = useNavigate();

  // 1. State untuk menangkap input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 2. Fungsi Login
  const handleLogin = (e) => {
    e.preventDefault();

    // Cek sesuai permintaanmu
    if (username === "pani" && password === "pani") {
      navigate("/dashboard"); // Jika benar, lempar ke dashboard
    } else {
      setError("Username atau Password salah!"); // Jika salah, muncul pesan
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F3F4F6] flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-[500px] rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 flex flex-col items-center">
        {/* LOGO BOX */}
        <div className="w-16 h-16 bg-[#FFD700] rounded-xl flex items-center justify-center mb-8">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
          </div>
        </div>

        <h2 className="text-[32px] font-normal text-gray-700 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-[15px] mb-12 text-center leading-relaxed">
          Please enter your email and password to log in.
        </p>

        {/* 3. Tampilkan Error jika ada */}
        {error && (
          <p className="text-red-500 text-xs mb-4 font-bold uppercase tracking-widest">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-8">
          <div className="relative">
            <label className="absolute -top-2.5 left-5 bg-white px-2 text-[12px] font-medium text-indigo-400 z-10">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-indigo-200 rounded-xl px-5 py-4 text-gray-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state username
              required
            />
          </div>

          <div className="relative">
            <label className="absolute -top-2.5 left-5 bg-white px-2 text-[12px] font-medium text-gray-400 z-10">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-600 focus:ring-2 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state password
              required
            />
          </div>

          <div className="text-center">
            <a
              href="#"
              className="text-[14px] font-medium text-indigo-500 hover:text-indigo-600"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5D5FEF] hover:bg-[#4B4DDE] text-white py-4 rounded-xl font-semibold flex items-center justify-center relative shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            <span>Continue</span>
            <div className="absolute right-5 bg-white/20 p-1 rounded-full">
              <MdArrowForward className="text-lg" />
            </div>
          </button>
        </form>

        <div className="mt-10 text-[14px] text-gray-400">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-500 font-bold hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
