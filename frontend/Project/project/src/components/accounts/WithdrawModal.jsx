// src/components/accounts/WithdrawModal.jsx

import React, { useState } from "react";

const API = "https://localhost:7092/api/customer/transaction";

export default function WithdrawModal({ account, onClose, onDone }) {
  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    if (!amount) return alert("Enter amount");

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        accountId: account.accountId,
        amount: parseFloat(amount),
        transactionType: "withdraw",
        remarks: "withdraw"
      }),
    });

    if (!res.ok) {
      alert(await res.text());
      return;
    }

    onDone();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-header">Withdraw Money</h3>

        <p>Account: {account.accountNumber}</p>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={handleWithdraw}>Withdraw</button>
        </div>
      </div>
    </div>
  );
}
