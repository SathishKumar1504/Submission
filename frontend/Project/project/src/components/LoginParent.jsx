// src/components/LoginParent.jsx
import React from "react";
import { useSelector } from "react-redux";
import LoginChild from "./LoginChild";
import "./LoginParent.css";

const LoginParent = () => {
  const user = useSelector((state) => state.user);

  const jsonData = {
    username: user.username,
    email: user.email,
    password: user.password,
  };

  return (
    <div className="login-parent-bg">
      <div className="parent-container">
        <LoginChild />

        {user.submitted && (
          <div className="output-box">
            <h3>Submitted Data (JSON Format)</h3>
            <pre className="json-box">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginParent;
