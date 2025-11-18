// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

// Sidebar
import Sidebar from "./components/shared/Sidebar";

// Pages
import LoginChild from "./components/LoginChild";
import DataPage from "./components/DataPage";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserManagement from "./components/UserManagement";
import Dashboard from "./components/Dashboard";
import AccountsPage from "./components/accounts/AccountsPage";
import TransactionsPage from "./components/transactions/TransactionsPage";
import ManageBanks from "./components/admin/ManageBanks";
import BankDetails from "./components/admin/BankDetails";
import AddBank from "./components/admin/AddBank";

// ============================
// WRAPPER — Sidebar hidden on /login
// ============================
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* ❌ Do NOT show sidebar on login */}
      {!isLoginPage && <Sidebar />}

      {/* ❌ Do NOT shift login page right */}
      <div className={isLoginPage ? "" : "page-with-sidebar"}>
        {children}
      </div>
    </>
  );
};

// ============================
// MAIN APP
// ============================
const App = () => {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />

          {/* PUBLIC PAGES */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* LOGIN PAGE (FULLSCREEN, NO SIDEBAR) */}
          <Route path="/login" element={<LoginChild />} />

          {/* USER PAGES */}
          <Route
            path="/accounts"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <AccountsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />

          {/* MANAGER + ADMIN */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/data"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
                <DataPage />
              </ProtectedRoute>
            }
          /> */}

          {/* ADMIN ONLY */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banks"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <ManageBanks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banks/new"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AddBank />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banks/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <BankDetails />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
};

export default App;
