// src/components/shared/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRoles");

    navigate("/home");   // ✔ send to home
  };

  return (
    <div style={{
      background: "#1f2937",
      color: "#fff",
      padding: 12,
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/" style={{ color: "#fff" }}>Home</Link>
        <Link to="/accounts" style={{ color: "#fff" }}>Accounts</Link>
        <Link to="/transactions" style={{ color: "#fff" }}>Transactions</Link>
        <Link to="/admin/banks" style={{ color: "#fff" }}>Manage Banks</Link>
      </div>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
