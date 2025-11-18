// src/components/accounts/ConfirmCloseModal.jsx

import React from "react";
import "./accounts.css";

const API_CLOSE = "https://localhost:7092/api/accounts/close";

const ConfirmCloseModal = ({ account, close, refresh }) => {
  const token = localStorage.getItem("token");

  const handleClose = async () => {
    const res = await fetch(`${API_CLOSE}/${account.accountId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Account closed successfully!");
      refresh();
      close();
    } else {
      alert("Failed to close account");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>Close Account?</h3>
        <p>Account Number: <b>{account.accountNumber}</b></p>

        <p>Are you sure you want to close this account?</p>

        <div className="modal-buttons">
          <button className="btn-red" onClick={handleClose}>Yes, Close</button>
          <button className="btn-blue" onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCloseModal;
