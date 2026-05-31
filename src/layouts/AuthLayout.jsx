import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const isAuthenticated = false; 

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
        {/* Logo / Brand Aplikasi */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#5065f6] tracking-tight">luna<span className="text-gray-900">.app</span></h2>
          <p className="text-xs text-gray-400 mt-1">Pharmacy Management System</p>
        </div>

        <Outlet />
      </div>
    </div>
  );
}