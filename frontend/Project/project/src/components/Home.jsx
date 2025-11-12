import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isLoggedIn, decodedToken } = useSelector((state) => state.user);
  const userRole = decodedToken?.userType || decodedToken?.role || 'Guest';

  // ✅ Show dashboard only for Admin or Manager
  const canAccessDashboard = userRole === 'Admin' || userRole === 'Manager';

  return (
    <div className="home-container">
      {/* 🌟 Welcome Section */}
      <header className="welcome-section">
        <h1>
          🏦 Welcome to <span>SmartBank</span>
        </h1>

        {isLoggedIn ? (
          <>
            <p className="subtitle">
              👋 Hello, <b>{userRole}</b> — manage your banking operations securely and efficiently.
            </p>

            {/* 🚀 Show Dashboard Button for Admin & Manager */}
            {canAccessDashboard && (
              <Link to="/data" className="dashboard-btn">
                Go to Dashboard →
              </Link>
            )}
          </>
        ) : (
          <p className="subtitle">
            Please <b>log in</b> to access your personalized banking dashboard.
          </p>
        )}
      </header>

      {/* 🌐 Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} SmartBank | Empowering Digital Banking</p>
      </footer>

      {/* 💅 Styles */}
      <style jsx>{`
        /* 🧭 Layout */
        .home-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(to bottom, #f7faff, #ffffff);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 20px 0;
          color: #333;
          overflow-x: hidden;
        }

        /* 🌟 Welcome Section */
        .welcome-section {
          text-align: center;
          margin-top: 60px;
          animation: fadeIn 1s ease-in-out;
        }

        .welcome-section h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #004aad;
        }

        .welcome-section h1 span {
          color: #007bff;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #555;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
          animation: slideUp 1.2s ease;
        }

        /* 🚀 Dashboard Button */
        .dashboard-btn {
          display: inline-block;
          margin-top: 25px;
          background: #007bff;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .dashboard-btn:hover {
          background: #0056b3;
          transform: translateY(-2px);
        }

        /* 🌐 Footer */
        .footer {
          text-align: center;
          margin-top: auto;
          padding: 20px;
          color: #777;
          background: #f1f3f6;
          width: 100%;
          border-top: 1px solid #ddd;
          font-size: 0.95rem;
        }

        /* ✨ Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 📱 Responsive */
        @media (max-width: 768px) {
          .welcome-section h1 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
            padding: 0 15px;
          }

          .dashboard-btn {
            padding: 10px 18px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
