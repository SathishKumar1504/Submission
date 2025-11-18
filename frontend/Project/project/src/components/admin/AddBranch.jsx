// src/components/admin/AddBranch.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBranch } from "../../redux/banksSlice";

export default function AddBranch({ bankId }) {
  const [name, setName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const submit = async () => {
    if (!name) return alert("Enter name");
    try {
      await dispatch(addBranch({ bankId, body: { name, branchCode, city } })).unwrap();
      setName(""); setBranchCode(""); setCity("");
      alert("Branch added");
    } catch (err) { alert(err.message || "Failed"); }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h4>Add Branch</h4>
      <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Code" value={branchCode} onChange={(e)=>setBranchCode(e.target.value)} />
      <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} />
      <button onClick={submit}>Add Branch</button>
    </div>
  );
}
