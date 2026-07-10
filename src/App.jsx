import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

const Dashboard = lazy(() => import("./pages/DashboardPage"));
const Employee = lazy(() => import("./pages/Employee"));
const Stock = lazy(() => import("./pages/Stock"));
const Product = lazy(() => import("./pages/Product"));
const MemberList = lazy(() => import("./pages/MemberList")); 
const GuestHome = lazy(() => import("./pages/GuestHome"));
const MemberHome = lazy(() => import("./pages/MemberHome")); 

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

const ErrorPage = lazy(() => import("./components/ErrorPage"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<Navigate to="/guest" replace />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
        </Route>

        <Route path="/guest" element={<GuestHome />} />

        <Route path="/member" element={<MemberHome />} />

        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="employee/list" element={<Employee />} />
          <Route path="employee/attendance" element={<Employee />} />
          <Route path="employee/payroll" element={<Employee />} />
          <Route path="employee/expense" element={<Employee />} />

          <Route path="stock" element={<Stock />} />
          <Route path="member-list" element={<MemberList />} /> 

          <Route path="product/list" element={<Product />} />
          <Route path="product/package" element={<Product />} />
          <Route path="product/damage" element={<Product />} />
          <Route path="settings" element={<Settings />} />

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