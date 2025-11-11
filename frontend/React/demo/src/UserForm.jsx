import React, { useState, useRef } from "react";
import "./UserForm.css"; // ✅ Import your simple CSS

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const nameInputRef = useRef(null);

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    setSubmittedData({ name, email, password });
    setShowPopup(true);

    // Reset fields
    setName("");
    setEmail("");
    setPassword("");

    // Focus back on first field
    nameInputRef.current?.focus();
  };

  // ✅ Clear handler
  const handleClear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setSubmittedData(null);
    setShowPopup(false);
    nameInputRef.current?.focus();
  };

  return (
    <div className="form-container">
      <h2>User Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Username:</label>
          <input
            type="text"
            ref={nameInputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Enter Username"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter Email"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter Password"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="clear-btn"
          >
            Clear
          </button>
        </div>
      </form>

      {/* ✅ Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>✅ Form submitted successfully!</h3>
            <button
              className="close-popup-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Submitted Data */}
      <div className="submitted-data">
        <h4>Submitted Data:</h4>
        {submittedData ? (
          <>
            <p><strong>Username:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Password:</strong> {submittedData.password}</p>
          </>
        ) : (
          <p style={{ color: "#888", fontStyle: "italic" }}>
            No data submitted yet 😐
          </p>
        )}
      </div>
    </div>
  );
}

export default UserForm;
