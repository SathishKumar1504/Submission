import React from 'react';
import { useSelector } from 'react-redux';
import LoginChild from './LoginChild';

const LoginParent = () => {
  const user = useSelector((state) => state.user);

  // Prepare JSON data to display
  const jsonData = {
    username: user.username,
    email: user.email,
    password: user.password,
  };

  return (
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

      <style jsx>{`
        .parent-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .output-box {
          margin-top: 20px;
          width: 340px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #f9f9f9;
          text-align: left;
        }
        .json-box {
          background: #222;
          color: #00ff7f;
          padding: 10px;
          border-radius: 6px;
          font-family: monospace;
          font-size: 14px;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
};

export default LoginParent;
