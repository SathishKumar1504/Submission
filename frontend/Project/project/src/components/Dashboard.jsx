import React, { useEffect, useState } from "react";

const API_URL = "https://localhost:7092/api/User";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Analytics
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.userType === "Admin").length;
  const totalManagers = users.filter((u) => u.userType === "Manager").length;
  const totalCustomers = users.filter((u) => u.userType === "Customer").length;

  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;
  const deletedUsers = users.filter((u) => u.status === "deleted").length;

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>📊 Dashboard Overview</h1>
        <p>Smart insights about your users</p>
      </div>

      {loading ? (
        <p className="loading">Loading data...</p>
      ) : (
        <>
          {/* Stats Section */}
          <h2 className="section-title">📌 User Summary</h2>
          <div className="grid">
            <div className="glass-card blue">
              <h3>{totalUsers}</h3>
              <p>Total Users</p>
            </div>

            <div className="glass-card green">
              <h3>{activeUsers}</h3>
              <p>Active Users</p>
            </div>

            <div className="glass-card orange">
              <h3>{inactiveUsers}</h3>
              <p>Inactive Users</p>
            </div>

            <div className="glass-card red">
              <h3>{deletedUsers}</h3>
              <p>Deleted Users</p>
            </div>
          </div>

          {/* Roles Section */}
          <h2 className="section-title">👤 User Roles</h2>
          <div className="grid">
            <div className="glass-card purple">
              <h3>{totalAdmins}</h3>
              <p>Admins</p>
            </div>

            <div className="glass-card teal">
              <h3>{totalManagers}</h3>
              <p>Managers</p>
            </div>

            <div className="glass-card yellow">
              <h3>{totalCustomers}</h3>
              <p>Customers</p>
            </div>
          </div>
        </>
      )}

      {/* Styles */}
      <style>{`
  /* --- PAGE CONTAINER --- */
  .dashboard-container {
    padding: 32px 20px;
    max-width: 1200px;
    margin: auto;
    font-family: "Inter", "Segoe UI", sans-serif;
    color: #1e293b;
  }

  /* --- HEADER --- */
  .header {
    text-align: center;
    margin-bottom: 45px;
    background: #ffffff;
    padding: 36px;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    animation: fadeIn 0.5s ease;
  }

  .header h1 {
    font-size: 2.3rem;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .header p {
    font-size: 1rem;
    opacity: 0.8;
    margin-top: 2px;
  }

  /* --- SECTION TITLE --- */
  .section-title {
    margin: 32px 0 12px;
    font-size: 1.35rem;
    font-weight: 600;
    color: #111827;
  }

  /* --- GRID --- */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 22px;
    margin-bottom: 40px;
  }

  /* --- MODERN CARDS --- */
  .glass-card {
    padding: 24px;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 6px 20px rgba(0,0,0,0.05);
    text-align: left;
    position: relative;
    overflow: hidden;
    transition: 0.25s ease;
    animation: slideUp 0.4s ease;
  }

  /* Neon Accent Bar */
  .glass-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 5px;
    width: 100%;
    background: linear-gradient(90deg, #6366f1, #3b82f6);
  }

  .glass-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 35px rgba(0,0,0,0.12);
  }

  /* Numbers */
  .glass-card h3 {
    font-size: 2rem;
    margin: 0;
    font-weight: 700;
    color: #111827;
  }

  /* Label text */
  .glass-card p {
    margin-top: 6px;
    font-size: 0.95rem;
    font-weight: 500;
    opacity: 0.75;
  }

  /* --- COLOR THEMES --- */
  .blue::before { background: linear-gradient(90deg, #3b82f6, #2563eb); }
  .green::before { background: linear-gradient(90deg, #22c55e, #16a34a); }
  .orange::before { background: linear-gradient(90deg, #f97316, #ea580c); }
  .red::before { background: linear-gradient(90deg, #ef4444, #dc2626); }
  .purple::before { background: linear-gradient(90deg, #a855f7, #7c3aed); }
  .teal::before { background: linear-gradient(90deg, #2dd4bf, #14b8a6); }
  .yellow::before { background: linear-gradient(90deg, #facc15, #eab308); }

  /* --- ANIMATIONS --- */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 600px) {
    .header h1 { font-size: 1.8rem; }
    .glass-card { padding: 20px; }
    .glass-card h3 { font-size: 1.6rem; }
  }
`}</style>


    </div>
  );
};

export default Dashboard;
