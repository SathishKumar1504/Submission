import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanks,
  createBank,
  deleteBank,
  fetchBranches,
  createBranch,
  deleteBranch,
  fetchUsersAdmin,
} from "../../redux/adminSlice";

export default function ManageBanks() {
  const dispatch = useDispatch();

  const banks = useSelector((s) => s.admin?.banks);
  const branches = useSelector((s) => s.admin?.branches);
  const users = useSelector((s) => s.admin?.users);

  const safeBanks = banks || [];
  const safeBranches = branches || [];
  const safeUsers = users || [];

  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  useEffect(() => {
    dispatch(fetchBanks());
    dispatch(fetchBranches());
    dispatch(fetchUsersAdmin());
  }, [dispatch]);

  const addBank = async () => {
    if (!bankName.trim()) return;
    await dispatch(createBank({ bankName, address: "" }));
    setBankName("");
    dispatch(fetchBanks());
  };

  const removeBank = async (id) => {
    if (!confirm("Delete bank?")) return;
    await dispatch(deleteBank(id));
    dispatch(fetchBanks());
  };

  const addBranch = async () => {
    if (!selectedBank) return alert("Select a bank first");
    if (!branchName.trim()) return;

    await dispatch(createBranch({ branchName, bankId: selectedBank }));
    setBranchName("");
    dispatch(fetchBranches());
  };

  const removeBranch = async (id) => {
    if (!confirm("Delete branch?")) return;
    await dispatch(deleteBranch(id));
    dispatch(fetchBranches());
  };

  return (
    <div className="page-container">
      <h1>Bank Management</h1>

      {/* CREATE BANK */}
      <div className="card">
        <h3>Create Bank</h3>
        <input
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="Bank Name"
        />
        <button className="btn btn-primary" onClick={addBank}>Create Bank</button>
      </div>

      {/* BANK LIST */}
      <div className="card">
        <h3>Bank List</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branches</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeBanks.map((b) => (
              <tr key={b.bankId}>
                <td>{b.bankName}</td>
                <td>{b.branches?.length || 0}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => setSelectedBank(b.bankId)}>
                    Select
                  </button>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => removeBank(b.bankId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE BRANCH */}
      <div className="card">
        <h3>Create Branch</h3>

        <select value={selectedBank} onChange={(e) => setSelectedBank(parseInt(e.target.value))}>
          <option value="">Select Bank</option>
          {safeBanks.map((b) => (
            <option key={b.bankId} value={b.bankId}>
              {b.bankName}
            </option>
          ))}
        </select>

        <input
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          placeholder="Branch Name"
        />

        <button className="btn btn-primary" onClick={addBranch}>Add Branch</button>

        <h3>Branches</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Bank</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeBranches.map((br) => (
              <tr key={br.branchId}>
                <td>{br.branchName}</td>
                <td>{br.bank?.bankName}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => removeBranch(br.branchId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADMIN USERS */}
      <div className="card">
        <h3>Admin Users</h3>

        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {safeUsers.map((u) => (
              <tr key={u.userId}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge badge-green">{u.userType}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
