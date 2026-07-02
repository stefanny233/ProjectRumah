import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// Layouts
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

// Pages
const Dashboard = lazy(() => import("./pages/DashboardPage"));
const Employee = lazy(() => import("./pages/Employee"));
const Stock = lazy(() => import("./pages/Stock"));
const Product = lazy(() => import("./pages/Product"));
const Dispenser = lazy(() => import("./pages/Dispenser")); 

// Guest & Member Pages
const GuestHome = lazy(() => import("./pages/GuestHome"));
const MemberHome = lazy(() => import("./pages/MemberHome")); 

// Auth Pages
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

// Error Component
const ErrorPage = lazy(() => import("./components/ErrorPage"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* 1. Rute Paling Awal Langsung ke Guest (Tanpa Login) */}
        <Route index element={<Navigate to="/guest" replace />} />

        {/* 2. Auth Group (Login, Register, dll) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
        </Route>

        {/* 3. Guest Route (Halaman Publik Bebas Akses) */}
        <Route path="/guest" element={<GuestHome />} />

        {/* 4. Member Route (Bisa diakses mandiri mase) */}
        <Route path="/member" element={<MemberHome />} />

        {/* 5. Main Layout Group (Dashboard Admin & Fitur Internal) */}
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dispenser" element={<Dispenser />} />

          {/* Grouping Employee */}
          <Route path="employee/list" element={<Employee />} />
          <Route path="employee/attendance" element={<Employee />} />
          <Route path="employee/payroll" element={<Employee />} />
          <Route path="employee/expense" element={<Employee />} />

          <Route path="stock" element={<Stock />} />

          <Route path="product/list" element={<Product />} />
          <Route path="product/package" element={<Product />} />
          <Route path="product/damage" element={<Product />} />
          <Route path="settings" element={<Settings />} />

          {/* 🔥 KITA TAMBAHKAN PROPS redirectTo="/dashboard" DI SINI MASE */}
          <Route
            path="error-400"
            element={
              <ErrorPage
                code="400"
                description="Bad Request!"
                image="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                redirectTo="/dashboard"
              />
            }
          />
          <Route
            path="error-401"
            element={
              <ErrorPage
                code="401"
                description="Unauthorized!"
                image="https://cdn-icons-png.flaticon.com/512/564/564619.png"
                redirectTo="/dashboard"
              />
            }
          />
          <Route
            path="error-403"
            element={
              <ErrorPage
                code="403"
                description="Forbidden!"
                image="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                redirectTo="/dashboard"
              />
            }
          />
        </Route>

        {/* Rute 404 Global (Jika diklik, dia akan ngecek role via localStorage otomatis) */}
        <Route
          path="*"
          element={
            <ErrorPage
              code="404"
              description="Page Not Found!"
              image="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;