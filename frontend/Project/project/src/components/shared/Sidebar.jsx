// src/components/shared/Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import "./Sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((s) => s.user || {});
  const { isLoggedIn = false, decodedToken = {} } = userState;

  // ⭐ FIXED USERNAME + ROLE HERE
  const userRole =
    decodedToken?.role ||
    decodedToken?.UserType ||
    "User";

  const userName =
    decodedToken?.username ||                 // <-- correct from JWT
    decodedToken?.unique_name ||
    decodedToken?.name ||
    decodedToken?.sub?.split("@")[0] ||       // fallback from email
    "User";

  const toggleSidebar = () => setCollapsed((c) => !c);

  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch {}

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRoles");

    navigate("/home");
  };

  const navClass = ({ isActive }) =>
    `sidebar-link-pro ${isActive ? "active" : ""}`;

  return (
    <div className={`sidebar-pro ${collapsed ? "collapsed" : ""}`}>

      {/* HEADER */}
      <div className="sidebar-header-pro">
        <span className="brand-icon">🏦</span>
        {!collapsed && <span className="brand-text">SmartBank</span>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* PROFILE CARD */}
      {!collapsed && isLoggedIn && (
        <div className="profile-card">
          <div className="avatar">👤</div>
          <div>
            <div className="profile-name">{userName}</div>
            <div className="profile-role">{userRole}</div>
          </div>
        </div>
      )}

      {/* MENU */}
      <div className="sidebar-menu-pro">

        {/* Public */}
        <NavLink to="/home" className={navClass}>
          <span className="icon">🏠</span>
          {!collapsed && <span>Home</span>}
        </NavLink>

        <NavLink to="/about" className={navClass}>
          <span className="icon">ℹ️</span>
          {!collapsed && <span>About</span>}
        </NavLink>

        <NavLink to="/contact" className={navClass}>
          <span className="icon">📞</span>
          {!collapsed && <span>Contact</span>}
        </NavLink>

        {/* Login Link */}
        {!isLoggedIn && (
          <NavLink to="/login" className={navClass}>
            <span className="icon">🔐</span>
            {!collapsed && <span>Login</span>}
          </NavLink>
        )}

        {/* User Only */}
        {isLoggedIn && userRole === "User" && (
          <>
            <NavLink to="/accounts" className={navClass}>
              <span className="icon">💳</span>
              {!collapsed && <span>Accounts</span>}
            </NavLink>

            <NavLink to="/transactions" className={navClass}>
              <span className="icon">📄</span>
              {!collapsed && <span>Transactions</span>}
            </NavLink>
          </>
        )}

        {/* Manager / Admin */}
        {isLoggedIn && (userRole === "Manager" || userRole === "Admin") && (
          <NavLink to="/dashboard" className={navClass}>
            <span className="icon">📊</span>
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
        )}

        {/* Admin Only */}
        {isLoggedIn && userRole === "Admin" && (
          <>
            <NavLink to="/users" className={navClass}>
              <span className="icon">👥</span>
              {!collapsed && <span>Users</span>}
            </NavLink>

            <NavLink to="/admin/banks" className={navClass}>
              <span className="icon">🏦</span>
              {!collapsed && <span>Banks</span>}
            </NavLink>

            <NavLink to="/admin/banks/new" className={navClass}>
              <span className="icon">➕</span>
              {!collapsed && <span>Create Bank</span>}
            </NavLink>
          </>
        )}
      </div>

      {/* LOGOUT */}
      {isLoggedIn && (
        <div className="sidebar-footer-pro">
          <button className="logout-pro" onClick={handleLogout}>
            <span className="icon">🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
