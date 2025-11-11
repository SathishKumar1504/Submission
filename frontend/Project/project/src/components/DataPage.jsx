import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DataPage = () => {
  const user = useSelector((state) => state.user);
  const jsonData = {
    username: user.username,
    email: user.email,
    password: user.password,
  };

  return (
    <div className="data-container">
      <h2>📦 Submitted Data (JSON)</h2>
      {user.submitted ? (
        <pre className="json-box">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      ) : (
        <p>No data found. Please fill out the form first.</p>
      )}
      <Link to="/" className="back-btn">← Back to Login</Link>

      <style jsx>{`
        .data-container {
          text-align: center;
          margin: 50px auto;
          width: 400px;
          padding: 20px;
          border-radius: 10px;
          background: #fafafa;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
        .json-box {
          background: #222;
          color: #00ff7f;
          text-align: left;
          padding: 10px;
          border-radius: 8px;
          font-family: monospace;
          font-size: 14px;
        }
        .back-btn {
          display: inline-block;
          margin-top: 20px;
          text-decoration: none;
          background: #007bff;
          color: white;
          padding: 8px 16px;
          border-radius: 5px;
        }
        .back-btn:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default DataPage;
