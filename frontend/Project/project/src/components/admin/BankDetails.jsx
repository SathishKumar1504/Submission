import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API = "https://localhost:7092/api/banks";

export default function BankDetails() {
  const { id } = useParams();
  const [bank, setBank] = useState(null);
  const [branchName, setBranchName] = useState("");

  const loadBank = async () => {
    const res = await fetch(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    const data = await res.json();
    setBank(data.bank);
  };

  const addBranch = async () => {
    await fetch(`${API}/${id}/branches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ branchName })
    });

    setBranchName("");
    loadBank();
  };

  useEffect(() => { loadBank(); }, []);

  if (!bank) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{bank.bankName}</h2>

      <h3>Branches</h3>

      <table>
        <thead>
          <tr>
            <th>Branch Name</th>
          </tr>
        </thead>
        <tbody>
          {bank.branches.map(br => (
            <tr key={br.branchId}>
              <td>{br.branchName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Add Branch</h4>
      <input
        type="text"
        placeholder="Branch Name"
        value={branchName}
        onChange={e => setBranchName(e.target.value)}
      />
      <button className="primary-btn" onClick={addBranch}>Add</button>
    </div>
  );
}
