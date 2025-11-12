import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/userSlice';
import LoginChild from './components/LoginChild';
import DataPage from './components/DataPage';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

// ✅ Navbar Component
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, decodedToken } = useSelector((state) => state.user);

  const currentPath = location.pathname;
  const userRole = decodedToken?.userType || decodedToken?.role || '';

  const getLinkClass = (path, isLogin = false) => {
    const isActive = currentPath === path;
    if (isLogin) return isActive ? 'active-link login-link' : 'inactive-link login-link';
    return isActive ? 'active-link' : 'inactive-link';
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <nav className="navbar">
      {/* Left side */}
      <div className="nav-left">
        <span className="brand">🏦 SmartBank</span>
        <Link to="/home" className={getLinkClass('/home')}>Home</Link>
        <Link to="/about" className={getLinkClass('/about')}>About</Link>

        {isLoggedIn && (userRole === 'Admin' || userRole === 'Manager') && (
          <Link to="/data" className={getLinkClass('/data')}>Data</Link>
        )}

        {isLoggedIn && (
          <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
        )}
      </div>

      {/* Right side */}
      <div className="nav-right">
        {!isLoggedIn ? (
          <Link to="/login" className={getLinkClass('/login', true)}>Login</Link>
        ) : (
          <>
            <div className="welcome-msg">👋Welcome Back ! {userRole}</div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

// ✅ Main App Component
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginChild />} />
          <Route
            path="/data"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <DataPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* ✅ Clean, Fixed, Overflow-Free Styles */}
      <style jsx>{`
        /* Prevent horizontal overflow globally */
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* 🌐 Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          box-sizing: border-box;
        }

        .brand {
          font-weight: 600;
          font-size: 1.1rem;
          margin-right: 15px;
        }

        .nav-left {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .nav-right {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* 🔗 Links */
        .active-link,
        .inactive-link {
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 5px;
          transition: 0.2s;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .active-link {
          background: #fff700;
          color: #222;
          font-weight: 600;
        }

        .inactive-link {
          color: #fff;
        }

        .inactive-link:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* 🔐 Login */
        .login-link {
          background: #0056b3;
        }

        .login-link:hover {
          background: #004099;
        }

        /* 🚪 Logout */
        .logout-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 5px 12px;
          border-radius: 5px;
          font-weight: 500;
          cursor: pointer;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .logout-btn:hover {
          background: #b02a37;
        }

        /* 👋 Welcome text */
        .welcome-msg {
          background: rgba(255, 255, 255, 0.15);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #fff;
        }

        /* ✅ Prevent overlap from fixed navbar */
        .page-container {
          padding-top: 65px;
          min-height: 100vh;
          background: linear-gradient(to bottom right, #e3f2fd, #ffffff);
        }

        /* 📱 Mobile View */
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 15px;
          }

          .nav-left, .nav-right {
            width: 100%;
            justify-content: space-between;
          }

          .nav-left {
            margin-bottom: 8px;
          }

          .brand {
            margin-bottom: 5px;
          }
        }
      `}</style>
    </Router>
  );
};

export default App;
