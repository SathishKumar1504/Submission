// src/components/admin/AddBank.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBank, fetchBanks } from "../../redux/banksSlice";

export default function AddBank() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const submit = async () => {
    if (!name) return alert("Enter name");
    try {
      await dispatch(createBank({ name, code })).unwrap();
      alert("Bank created");
      dispatch(fetchBanks());
      setName(""); setCode("");
    } catch (err) { alert(err.message || "Failed"); }
  };

  return (
    <div>
      <input placeholder="Bank name" value={name} onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Code" value={code} onChange={(e)=>setCode(e.target.value)} />
      <button onClick={submit}>Create Bank</button>
    </div>
  );
}
