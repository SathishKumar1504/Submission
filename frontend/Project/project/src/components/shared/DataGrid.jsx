// src/components/shared/DataGrid.jsx
import React from "react";

export default function DataGrid({
  columns = [],
  items = [],
  total = 0,
  page = 1,
  pageSize = 20,
  onPage,
  onSort,
  onSearch,
  loading
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <input placeholder="Search..." onChange={(e) => onSearch?.(e.target.value)} />
        </div>
        <div>
          Page {page} / {totalPages}
          <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}>Prev</button>
          <button onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ borderBottom: "1px solid #ddd", padding: 8, textAlign: "left" }}>
                <span style={{ cursor: c.sortable ? "pointer" : "default" }} onClick={() => c.sortable && onSort?.(c.key)}>
                  {c.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} style={{ padding: 16 }}>Loading...</td></tr>
          ) : items.length === 0 ? (
            <tr><td colSpan={columns.length} style={{ padding: 16 }}>No results</td></tr>
          ) : items.map((r, idx) => (
            <tr key={r.id || idx}>
              {columns.map((c) => <td key={c.key} style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{c.render ? c.render(r) : r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
