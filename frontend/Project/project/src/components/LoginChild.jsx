import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginChild = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isLoggedIn, token, successMessage } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      setFormData({ email: '', password: '' });
      navigate('/home');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>🏦 SmartBank</h1>
        <h2>🔐 User Login</h2>
        <p className="subtitle">Secure access to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* ✅ Messages */}
        {error && <p className="error-msg">❌ {error}</p>}
        {successMessage && <p className="success-msg">{successMessage}</p>}

        {/* ✅ Token (Optional for Debug) */}
        {isLoggedIn && token && (
          <div className="token-box">
            <h4>🔑 Token Received:</h4>
            <p className="token">{token}</p>
          </div>
        )}
      </div>

      {/* 💅 Styles */}
      <style jsx>{`
        /* 🌈 Page Background */
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #c9e5ff, #ffffff);
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          padding: 20px;
          animation: fadeIn 1s ease-in-out;
        }

        /* 🪟 Glass Card */
        .login-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px 30px;
          width: 100%;
          max-width: 380px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          animation: slideUp 0.8s ease;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
        }

        /* 🏦 Branding */
        h1 {
          color: #007bff;
          margin-bottom: 5px;
          font-size: 1.8rem;
          letter-spacing: 0.5px;
        }

        h2 {
          margin-bottom: 10px;
          color: #004aad;
        }

        .subtitle {
          color: #555;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        /* 📋 Form */
        .form-group {
          margin-bottom: 18px;
          text-align: left;
        }

        label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
          font-size: 0.95rem;
        }

        input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 0.95rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        input:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
          outline: none;
        }

        /* 🔘 Button */
        .login-btn {
          width: 100%;
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 0;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-btn:hover {
          background: #0056b3;
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ✅ Messages */
        .error-msg {
          color: red;
          margin-top: 10px;
          font-size: 0.9rem;
        }

        .success-msg {
          color: green;
          margin-top: 10px;
          font-size: 0.9rem;
        }

        /* 🔑 Token Box */
        .token-box {
          margin-top: 15px;
          background: #eefce9;
          border: 1px solid #a3e29b;
          border-radius: 6px;
          padding: 10px;
          text-align: left;
        }

        .token {
          font-size: 0.8rem;
          word-break: break-all;
          background: #fff;
          padding: 6px;
          border-radius: 5px;
          color: #333;
        }

        /* ✨ Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 📱 Responsive */
        @media (max-width: 480px) {
          .login-card {
            padding: 30px 20px;
          }

          h1 {
            font-size: 1.5rem;
          }

          h2 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginChild;
