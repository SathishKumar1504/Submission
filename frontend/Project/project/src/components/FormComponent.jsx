import React from 'react';

const FormComponent = ({ user, handleChange, handleSubmit, handleReset }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Username Field */}
      <div className="form-group">
        <label htmlFor="username">Username:</label><br />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Buttons */}
      <div className="btn-group">
        <button type="submit" className="submit-btn">Submit</button>
        <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
      </div>

      {/* Inline CSS for layout */}
      <style jsx>{`
        .form-group {
          text-align: left;
          width: 90%;
          margin: 10px auto;
        }
        label {
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
          color: #333;
        }
        input {
          padding: 8px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
        }
        .btn-group {
          margin-top: 15px;
          text-align: center;
        }
        button {
          margin: 6px;
          padding: 8px 14px;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          font-weight: 500;
        }
        .submit-btn { background: #007bff; }
        .reset-btn { background: #dc3545; }
        button:hover { opacity: 0.85; }
      `}</style>
    </form>
  );
};

export default FormComponent;
