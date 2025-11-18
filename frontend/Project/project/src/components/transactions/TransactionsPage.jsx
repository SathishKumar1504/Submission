import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyTransactions } from "../../redux/transactionsSlice";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const { list: transactions } = useSelector((s) => s.transactions);

  // Filters
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterType, setFilterType] = useState("");

  // Sorting
  const [sortField, setSortField] = useState("transDate");
  const [sortOrder, setSortOrder] = useState("desc"); // asc / desc

  useEffect(() => {
    dispatch(fetchMyTransactions());
  }, [dispatch]);

  /* -------------------------------------------------
      FILTER LOGIC
  ---------------------------------------------------*/
  const filteredTx = transactions.filter((t) => {
    const matchSearch =
      t.account.accountNumber.includes(search) ||
      t.transactionType.toLowerCase().includes(search.toLowerCase()) ||
      String(t.amount).includes(search);

    const txDate = new Date(t.transDate);

    const matchFrom = fromDate ? txDate >= new Date(fromDate) : true;
    const matchTo = toDate ? txDate <= new Date(toDate) : true;

    const matchType = filterType ? t.transactionType === filterType : true;

    return matchSearch && matchFrom && matchTo && matchType;
  });

  /* -------------------------------------------------
      SORTING LOGIC
  ---------------------------------------------------*/
  const sortedTx = [...filteredTx].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "amount") {
      valA = Number(a.amount);
      valB = Number(b.amount);
    }

    if (sortField === "transDate") {
      valA = new Date(a.transDate);
      valB = new Date(b.transDate);
    }

    if (sortField === "transactionType") {
      valA = a.transactionType.toLowerCase();
      valB = b.transactionType.toLowerCase();
    }

    if (sortField === "account") {
      valA = a.account.accountNumber.toLowerCase();
      valB = b.account.accountNumber.toLowerCase();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  /* -------------------------------------------------
      CHANGE SORT FIELD
  ---------------------------------------------------*/
  const handleSort = (field) => {
    if (sortField === field) {
      // toggle between asc/desc
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // UI for sorting arrow
  const arrow = (field) =>
    sortField === field ? (sortOrder === "asc" ? " ↑" : " ↓") : "";

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>📄 Transaction History</h1>

      {/* FILTERS */}
      <div style={styles.card}>
        <h3 style={styles.cardHeader}>Advanced Filters</h3>

        <div style={styles.filterRow}>
          {/* Search */}
          <input
            style={styles.input}
            type="text"
            placeholder="Search (account, type, amount)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Type */}
          <select
            style={styles.input}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>

          {/* Date from */}
          <input
            style={styles.input}
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          {/* Date to */}
          <input
            style={styles.input}
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <button
            style={styles.btnClear}
            onClick={() => {
              setSearch("");
              setFilterType("");
              setFromDate("");
              setToDate("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.card}>
        <h3 style={styles.cardHeader}>All Transactions</h3>

        {sortedTx.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("transactionId")}>
                  ID {arrow("transactionId")}
                </th>

                <th onClick={() => handleSort("account")}>
                  Account {arrow("account")}
                </th>

                <th onClick={() => handleSort("transactionType")}>
                  Type {arrow("transactionType")}
                </th>

                <th onClick={() => handleSort("amount")}>
                  Amount {arrow("amount")}
                </th>

                <th onClick={() => handleSort("transDate")}>
                  Date {arrow("transDate")}
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedTx.map((tx) => (
                <tr key={tx.transactionId}>
                  <td>{tx.transactionId}</td>
                  <td>{tx.account.accountNumber}</td>

                  <td>
                    <span
                      style={{
                        ...styles.badge,
                        background:
                          tx.transactionType === "deposit"
                            ? "#4caf50"
                            : "#e53935"
                      }}
                    >
                      {tx.transactionType.toUpperCase()}
                    </span>
                  </td>

                  <td>₹{tx.amount}</td>

                  <td>{new Date(tx.transDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;

/* --------------------- STYLES --------------------- */

const styles = {
  page: {
    padding: "20px",
    background: "#eef1ff",
    minHeight: "100vh",
    fontFamily: "Segoe UI"
  },

  heading: {
    textAlign: "center",
    fontSize: "32px",
    color: "#3f51b5",
    marginBottom: "20px"
  },

  card: {
    background: "#fff",
    padding: "18px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.11)"
  },

  cardHeader: {
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "600"
  },

  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: 1
  },

  btnClear: {
    background: "#f44336",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    cursor: "pointer"
  },

  badge: {
    padding: "5px 10px",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "12px"
  }
};
