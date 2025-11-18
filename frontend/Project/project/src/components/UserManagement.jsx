import React, { useEffect, useState } from "react";

const API_URL = "https://localhost:7092/api/User";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passwordHash: "",
    phone: "",
    userType: "User",
    dateOfBirth: "",
    status: "active",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
      setFiltered(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let data = [...users];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      data = data.filter(
        (u) =>
          (u.username || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q)
      );
    }

    if (filterRole !== "All") data = data.filter((u) => u.userType === filterRole);
    if (filterStatus !== "All") data = data.filter((u) => u.status === filterStatus);

    if (sortColumn) {
      data.sort((a, b) => {
        let A = a[sortColumn] ?? "";
        let B = b[sortColumn] ?? "";

        if (sortColumn === "userId") return sortOrder === "asc" ? A - B : B - A;

        if (sortColumn === "dateOfBirth") {
          return sortOrder === "asc"
            ? new Date(A) - new Date(B)
            : new Date(B) - new Date(A);
        }

        A = A.toString().toLowerCase();
        B = B.toString().toLowerCase();

        if (A < B) return sortOrder === "asc" ? -1 : 1;
        if (A > B) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFiltered(data);
    setPage(1);
  }, [search, filterRole, filterStatus, sortColumn, sortOrder, users]);

  const handleSort = (col) => {
    if (sortColumn === col) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortColumn(col);
      setSortOrder("asc");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const payload = {
        username: formData.username,
        email: formData.email,
        ...(formData.passwordHash
          ? { passwordHash: formData.passwordHash }
          : {}),
        phone: formData.phone,
        userType: formData.userType,
        dateOfBirth: formData.dateOfBirth || null,
        status: formData.status,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      setMessage(editingId ? "User updated!" : "User added!");
      setEditingId(null);
      setFormData({
        username: "",
        email: "",
        passwordHash: "",
        phone: "",
        userType: "User",
        dateOfBirth: "",
        status: "active",
      });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (u) => {
    setFormData({
      username: u.username,
      email: u.email,
      passwordHash: "",
      phone: u.phone,
      userType: u.userType,
      dateOfBirth: u.dateOfBirth?.split("T")[0] || "",
      status: u.status,
    });
    setEditingId(u.userId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setMessage("User deleted!");
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const start = (page - 1) * rowsPerPage;
  const paginated = filtered.slice(start, start + rowsPerPage);
  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;

  const getSortArrow = (c) =>
    sortColumn === c ? (sortOrder === "asc" ? "↑" : "↓") : "⇅";

  return (
    <div className="user-container">
      <h2>User Management</h2>

      {/* FILTERS */}
      <div className="filter-bar">
        <input
          placeholder="Search username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
          <option value="User">User</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>

      {/* FORM */}
      <form className="user-form" onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="passwordHash" type="password" placeholder={editingId ? "New Password (optional)" : "Password"} value={formData.passwordHash} onChange={handleChange} required={!editingId} />

        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
          <option value="User">User</option>
        </select>

        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="deleted">Deleted</option>
        </select>

        <button className="save-btn">
          {editingId ? "Update User" : "Add User"}
        </button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("userId")}>ID {getSortArrow("userId")}</th>
              <th onClick={() => handleSort("username")}>Username {getSortArrow("username")}</th>
              <th onClick={() => handleSort("email")}>Email {getSortArrow("email")}</th>
              <th onClick={() => handleSort("phone")}>Phone {getSortArrow("phone")}</th>
              <th onClick={() => handleSort("userType")}>Role {getSortArrow("userType")}</th>
              <th onClick={() => handleSort("status")}>Status {getSortArrow("status")}</th>
              <th onClick={() => handleSort("dateOfBirth")}>DOB {getSortArrow("dateOfBirth")}</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length > 0 ? (
              paginated.map((u) => (
                <tr key={u.userId}>
                  <td>{u.userId}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || "-"}</td>
                  <td>{u.userType}</td>
                  <td>{u.status}</td>
                  <td>{u.dateOfBirth?.split("T")[0] || "-"}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(u)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(u.userId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8" className="no-data">No results found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {/* FINAL POLISHED CSS */}
      <style jsx>{`
        .user-container {
          padding: 32px;
          font-family: "Inter", sans-serif;
          background: #f5f7fb;
        }
        h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #1e293b;
        }

        /* FILTER BAR */
        .filter-bar {
          display: flex;
          gap: 14px;
          margin-bottom: 22px;
          padding: 16px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
          border: 1px solid #e2e8f0;
        }

        /* INPUT ALIGNMENT FIX */
        input, select {
          height: 44px !important;
          padding: 0 14px !important;
          font-size: 14px;
          border-radius: 10px;
          border: 1px solid #cfd8e3;
          background: #eef2f7;
        }

        input[type="date"] {
          line-height: 44px !important;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='black' width='12' height='12' xmlns='http://www.w3.org/2000/svg'><path d='M2 4l4 4 4-4z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px !important;
        }

        /* FORM */
        .user-form {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          background: white;
          padding: 24px;
          border-radius: 18px;
          border: 1px solid #e5e9f1;
          box-shadow: 0 6px 16px rgba(0,0,0,0.05);
          margin-bottom: 24px;
        }

        @media(max-width:900px){ .user-form{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:600px){ .user-form{grid-template-columns:1fr;} }

        /* SAVE BUTTON */
        .save-btn {
          grid-column: 1 / -1;
          width: 60%;
          justify-self: center;
          height: 46px;
          border-radius: 10px;
          font-size: 16px;
          border: none;
          background: #2563eb;
          color: white;
          font-weight: 600;
        }
        .save-btn:hover { background:#1d4ed8; }

        /* TABLE */
        .table-container {
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        th, td {
          padding: 12px 14px;
          height: 48px;
          vertical-align: middle;
          font-size: 14px;
          border-bottom: 1px solid #e2e8f0;
        }
        thead th {
          background: #1746a2;
          color: white;
          cursor: pointer;
          font-size: 14px;
          top: 0;
          position: sticky;
        }
        tbody tr:hover { background:#f1f5f9; }

        /* ACTION BUTTONS */
        .edit-btn {
          background: #fde047;
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
        }
        .delete-btn {
          background: #ef4444;
          color:white;
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
        }

        /* PAGINATION */
        .pagination {
          margin-top: 20px;
          display: flex;
          gap: 14px;
          justify-content: center;
          align-items: center;
        }
        .pagination button {
          padding: 8px 14px;
          background:#2563eb;
          color:white;
          border:none;
          border-radius:8px;
        }
      `}</style>

    </div>
  );
};

export default UserManagement;
