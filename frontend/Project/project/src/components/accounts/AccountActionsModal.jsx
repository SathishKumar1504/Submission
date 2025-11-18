// src/components/accounts/AccountActionsModal.jsx

import React, { useState } from "react";
import "./accounts.css";

const API_TRANSACTION = "https://localhost:7092/api/customer/transaction";

const AccountActionsModal = ({ account, close, refresh }) => {
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const token = localStorage.getItem("token");

  const handleTransaction = async (type) => {
    if (!amount) return alert("Enter amount");

    const res = await fetch(API_TRANSACTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        accountId: account.accountId,
        amount: parseFloat(amount),
        transactionType: type,
        remarks,
      }),
    });

    if (!res.ok) {
      alert(await res.text());
      return;
    }

    alert(`${type} successful!`);
    refresh();
    close();
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>Account Actions</h3>
        <p><b>{account.accountNumber}</b></p>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn-green" onClick={() => handleTransaction("deposit")}>
            Deposit
          </button>

          <button className="btn-blue" onClick={() => handleTransaction("withdraw")}>
            Withdraw
          </button>

          <button className="btn-red" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountActionsModal;
