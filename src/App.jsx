import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// Layouts
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

// Pages
const Dashboard = lazy(() => import("./pages/DashboardPage"));
const Employee  = lazy(() => import("./pages/Employee"));
const Stock     = lazy(() => import("./pages/Stock"));
const Product   = lazy(() => import("./pages/Product"));

// Auth Pages
const Login     = lazy(() => import("./pages/auth/Login"));
const Register  = lazy(() => import("./pages/auth/Register"));
const Forgot    = lazy(() => import("./pages/auth/Forgot")); 

// Error Component
const ErrorPage = lazy(() => import("./components/ErrorPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* === AUTHENTICATION ROUTES === */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Variabel Forgot sekarang sudah sesuai dengan import di atas */}
          <Route path="/forgot-password" element={<Forgot />} />
        </Route>

        {/* === MAIN APPLICATION ROUTES === */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee"  element={<Employee />} />
          <Route path="/stock"     element={<Stock />} />
          <Route path="/product"   element={<Product />} />

          {/* === ERROR PAGES (PERTEMUAN 6) === */}
          <Route
            path="/error-400"
            element={
              <ErrorPage
                code="400"
                description="Bad Request! Permintaan tidak dikenali."
                image="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              />
            }
          />

          <Route
            path="/error-401"
            element={
              <ErrorPage
                code="401"
                description="Unauthorized! Akses ditolak, silakan login."
                image="https://cdn-icons-png.flaticon.com/512/564/564619.png"
              />
            }
          />

          <Route
            path="/error-403"
            element={
              <ErrorPage
                code="403"
                description="Forbidden! Kamu dilarang masuk ke area ini."
                image="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
              />
            }
          />
        </Route>

        {/* === CATCH-ALL 404 ROUTE === */}
        <Route
          path="*"
          element={
            <ErrorPage
              code="404"
              description="Page Not Found! Halaman tidak ditemukan."
              image="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;