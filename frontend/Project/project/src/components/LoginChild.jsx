import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./LoginSuper.css";

const LoginChild = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginUser(data));

    if (res.meta.requestStatus === "fulfilled") {
      const role = res.payload.role?.toLowerCase();

      // 🔥 Auto redirect by role
      switch (role) {
        case "admin":
          navigate("/home");
          break;
        case "manager":
          navigate("/home");
          break;
        case "employee":
          navigate("/home");
          break;
        default:
          navigate("/home"); // regular user
      }
    }
  };

  return (
    <div className="super-login-wrapper">
      <div className="bg-animation"></div>

      <div className="super-login-card">
        <div className="super-logo">🏦</div>

        <h1 className="super-title">SmartBank Portal</h1>
        <p className="super-subtitle">Secure • Fast • Reliable Banking</p>

        <form onSubmit={handleSubmit} className="super-form">

          {/* EMAIL */}
          <div className="super-input-group">
            <input
              type="email"
              name="email"
              required
              placeholder=" "
              value={data.email}
              onChange={handleChange}
            />
            <label>Email Address</label>
            <span className="bar"></span>
          </div>

          {/* PASSWORD */}
          <div className="super-input-group">
            <input
              type="password"
              name="password"
              required
              placeholder=" "
              value={data.password}
              onChange={handleChange}
            />
            <label>Password</label>
            <span className="bar"></span>
          </div>

          <button type="submit" className="super-login-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        {error && <p className="super-error">❌ {error}</p>}

        <p className="super-footer">© 2025 SmartBank • All Rights Reserved</p>
      </div>
    </div>
  );
};

export default LoginChild;
