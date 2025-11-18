import React, { useState } from "react";

const API = "https://localhost:7092/api/accounts";

export default function TransferModal({ account, onClose, onDone }) {
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    const res = await fetch(`${API}/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        fromAccountId: account.accountId,
        toAccountId: parseInt(toAccountId),
        amount: parseFloat(amount),
        remarks: "transfer"
      })
    });

    await res.json();
    onDone();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-header">Transfer Money</h3>

        <p>From: {account.accountNumber}</p>

        <input
          type="number"
          placeholder="To Account ID"
          value={toAccountId}
          onChange={e => setToAccountId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={handleTransfer}>Transfer</button>
        </div>
      </div>
    </div>
  );
}
