import React, { useState } from "react";

export default function UserList({ users }) {
  // ✅ State for role filter
  const [selectedRole, setSelectedRole] = useState("All");

  // ✅ Check for valid data
  const hasData = Array.isArray(users) && users.length > 0;

  // ✅ Extract unique roles (for dropdown)
  const roles = hasData
    ? ["All", ...new Set(users.map((user) => user.role))]
    : [];

  // ✅ Apply filter
  const filteredUsers =
    hasData &&
    (selectedRole === "All"
      ? users
      : users.filter((user) => user.role === selectedRole));

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      {/* ===== Header + Count ===== */}
      <h2 style={{ textAlign: "left" }}>
        Team Members{" "}
        <span style={{ color: "#555" }}>
          ({filteredUsers ? filteredUsers.length : 0})
        </span>
      </h2>

      {/* ===== Filter Dropdown ===== */}
      <div style={{ textAlign: "left", marginTop: "15px" }}>
        <label style={{ marginRight: "10px", fontWeight: "500" }}>
          Filter by Role:
        </label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          // style={{
          //   padding: "8px 12px",
          //   border: "1px solid #ccc",
          //   borderRadius: "5px",
          //   fontSize: "14px",
          //   outline: "none",
          // }}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* ===== No Data / Filtered List ===== */}
      {!hasData ? (
        <p
          // style={{
          //   textAlign: "center",
          //   color: "#888",
          //   fontStyle: "italic",
          //   marginTop: "30px",
          // }}
        >
          ❌ No data found
        </p>
      ) : filteredUsers.length === 0 ? (
        <p
          // style={{
          //   textAlign: "center",
          //   color: "#888",
          //   fontStyle: "italic",
          //   marginTop: "30px",
          // }}
        >
          ❌ No matching results
        </p>
      ) : (
        <div
          // style={{
          //   display: "flex",
          //   gap: "20px",
          //   justifyContent: "center",
          //   marginTop: "20px",
          //   flexWrap: "wrap",
          // }}
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              // style={{
              //   border: "1px solid #ddd",
              //   borderRadius: "10px",
              //   padding: "15px",
              //   width: "200px",
              //   textAlign: "center",
              //   boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              // }}
            >
              <img
                src={user.image}
                alt={user.name}
                // style={{
                //   width: "100px",
                //   height: "100px",
                //   borderRadius: "50%",
                //   objectFit: "cover",
                // }}
              />
              <h3 style={{ margin: "10px 0 5px" }}>{user.name}</h3>
              <p style={{ color: "#555" }}>{user.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
