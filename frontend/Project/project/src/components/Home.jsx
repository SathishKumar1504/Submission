import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isLoggedIn, decodedToken } = useSelector((state) => state.user);

  const username =
    decodedToken?.username ||
    decodedToken?.unique_name ||
    "Guest";

  const userRole = decodedToken?.role || decodedToken?.userType;

  const isAdmin = userRole === "Admin";
  const isManager = userRole === "Manager";
  const isUser = userRole === "User";
  const isEmployee = userRole === "Employee";

  return (
    <div className="home-wrapper">

      {/* 🌟 HERO SECTION */}
      <div className="hero-box">
        <h1>
          Welcome to <span>SmartBank</span>
        </h1>

        {isLoggedIn ? (
          <p className="subtitle">
            👋 Hello <b>{username}</b>, welcome back!
          </p>
        ) : (
          <p className="subtitle">
            Bank smarter. Bank securely. Login to continue.
          </p>
        )}

        {!isLoggedIn && (
          <Link to="/login" className="primary-btn">
            Login Now →
          </Link>
        )}
      </div>

      {/* ===============================
          ROLE-BASED UI SECTIONS
      ================================== */}

      {/* USER SECTION */}
      {isLoggedIn && isUser && (
        <div className="role-panel user-panel">
          <h2>User Dashboard</h2>
          <p>Access your accounts and transactions.</p>

          <div className="card-grid">
            <Link to="/accounts" className="mini-card">💳 My Accounts</Link>
            <Link to="/transactions" className="mini-card">📄 My Transactions</Link>
            <Link to="/contact" className="mini-card">📞 Support</Link>
          </div>
        </div>
      )}

      {/* ADMIN SECTION */}
      {isLoggedIn && isAdmin && (
        <div className="role-panel admin-panel">
          <h2>Admin Dashboard</h2>
          <p>You have full system access.</p>

          <div className="card-grid">
            <Link to="/users" className="mini-card admin-card">👥 Manage Users</Link>
            <Link to="/admin/banks" className="mini-card admin-card">🏦 Manage Banks</Link>
            <Link to="/dashboard" className="mini-card admin-card">📊 System Dashboard</Link>
          </div>
        </div>
      )}

      {/* MANAGER SECTION */}
      {isLoggedIn && isManager && (
        <div className="role-panel manager-panel">
          <h2>Manager Panel</h2>
          <p>Branch level access and monitoring.</p>

          <div className="card-grid">
            <Link to="/dashboard" className="mini-card manager-card">📊 Manager Dashboard</Link>
            <Link to="/data" className="mini-card manager-card">📋 User Data</Link>
          </div>
        </div>
      )}

      {/* EMPLOYEE SECTION */}
      {isLoggedIn && isEmployee && (
        <div className="role-panel emp-panel">
          <h2>Employee Panel</h2>
          <p>Access assigned task modules.</p>

          <div className="card-grid">
            <Link to="/accounts" className="mini-card emp-card">📋 Customer Accounts</Link>
          </div>
        </div>
      )}

      {/* 🌐 FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} SmartBank — Powered by Secure Banking Tech
      </footer>

      {/* ==================== CSS ===================== */}
      <style>{`
        .home-wrapper {
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #eef2ff, #f8fbff);
          font-family: "Inter", sans-serif;
        }

        /* HERO */
        .hero-box {
          width: 100%;
          max-width: 900px;
          text-align: center;
          background: #ffffff;
          padding: 45px 35px;
          border-radius: 22px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
        }

        .hero-box::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 6px;
          background: linear-gradient(90deg, #6366f1, #2563eb);
        }

        .hero-box h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 15px;
        }

        .hero-box span {
          color: #2563eb;
        }

        .subtitle {
          font-size: 1.15rem;
          color: #475569;
          margin-bottom: 22px;
        }

        /* Primary Button */
        .primary-btn {
          background: #2563eb;
          color: white;
          padding: 12px 26px;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: 0.25s;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
        }

        .primary-btn:hover {
          background: #1d4ed8;
          transform: translateY(-3px);
        }

        /* ROLE PANELS */
        .role-panel {
          width: 100%;
          max-width: 850px;
          background: #ffffffcc;
          margin-top: 30px;
          padding: 25px;
          border-radius: 18px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.07);
          text-align: center;
        }

        .role-panel h2 {
          font-size: 1.7rem;
          margin-bottom: 10px;
        }

        .card-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        /* Mini dashboard cards */
        .mini-card {
          background: #f8f9ff;
          padding: 18px;
          border-radius: 14px;
          text-decoration: none;
          color: #334155;
          font-weight: 600;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.07);
          transition: 0.2s;
        }

        .mini-card:hover {
          transform: translateY(-4px);
          background: #eef2ff;
        }

        /* COLOR CODING */
        .admin-card {
          border-left: 6px solid #dc2626;
        }

        .manager-card {
          border-left: 6px solid #f59e0b;
        }

        .user-panel .mini-card {
          border-left: 6px solid #22c55e;
        }

        .emp-card {
          border-left: 6px solid #2563eb;
        }

        /* FOOTER */
        .footer {
          margin-top: auto;
          padding: 20px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Home;
