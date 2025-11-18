import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMyAccounts,
  createAccount,
  closeAccount
} from "../../redux/accountsSlice";

import {
  fetchMyTransactions,
  createTransaction
} from "../../redux/transactionsSlice";

const AccountsPage = () => {
  const dispatch = useDispatch();

  const { accounts } = useSelector((s) => s.accounts);
  const { list: transactions } = useSelector((s) => s.transactions);
  const { decodedToken } = useSelector((s) => s.user);

  const userRole = decodedToken?.role || decodedToken?.userType || "User";
  const isUser = userRole === "User"; // KEY: Only User can access transactions

  const [openTxView, setOpenTxView] = useState(null);

  const [newAcc, setNewAcc] = useState({
    accountType: "saving",
    branchId: "",
    initialDeposit: 0
  });

  const [txn, setTxn] = useState({
    accountId: "",
    amount: ""
  });

  useEffect(() => {
    dispatch(fetchMyAccounts());
    if (isUser) dispatch(fetchMyTransactions());
  }, [dispatch, isUser]);


  const selectedAccount = accounts.find(
    (a) => a.accountId === Number(txn.accountId)
  );

  const handleCreate = () => {
    if (!isUser) return;

    dispatch(createAccount(newAcc)).then(() => {
      dispatch(fetchMyAccounts());
    });
  };

  const handleTxn = (type) => {
    if (!isUser) return;

    if (!txn.accountId) return alert("Select an account");
    if (!txn.amount || Number(txn.amount) <= 0)
      return alert("Enter valid amount");

    if (selectedAccount && selectedAccount.status === "closed") {
      alert("This account is closed. Transactions are not allowed.");
      return;
    }

    if (selectedAccount && type === "withdraw") {
      if (Number(txn.amount) > selectedAccount.balance) {
        alert("Insufficient balance");
        return;
      }
    }

    dispatch(
      createTransaction({
        accountId: Number(txn.accountId),
        amount: Number(txn.amount),
        transactionType: type,
        remarks: "User action"
      })
    ).then(() => {
      dispatch(fetchMyAccounts());
      dispatch(fetchMyTransactions());
      setTxn({ accountId: "", amount: "" });
    });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🏦 My Accounts Dashboard</h1>

      {/* ============================
           CREATE ACCOUNT — USER ONLY
         ============================ */}
      {isUser && (
        <div style={styles.card}>
          <h3 style={styles.cardHeader}>Create New Bank Account</h3>

          <div style={styles.inputRow}>
            <input
              style={styles.input}
              type="text"
              placeholder="Branch ID"
              value={newAcc.branchId}
              onChange={(e) =>
                setNewAcc({ ...newAcc, branchId: e.target.value })
              }
            />

            <select
              style={styles.input}
              value={newAcc.accountType}
              onChange={(e) =>
                setNewAcc({ ...newAcc, accountType: e.target.value })
              }
            >
              <option value="saving">Saving Account</option>
              <option value="current">Current Account</option>
            </select>

            <input
              style={styles.input}
              type="number"
              placeholder="Initial Deposit"
              value={newAcc.initialDeposit}
              onChange={(e) =>
                setNewAcc({ ...newAcc, initialDeposit: Number(e.target.value) })
              }
            />

            <button style={styles.btnPrimary} onClick={handleCreate}>
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* ============================
           TRANSACTION SECTION — USER ONLY
         ============================ */}
      {isUser && (
        <div style={styles.card}>
          <h3 style={styles.cardHeader}>Make a Transaction</h3>

          <div style={styles.inputRow}>
            <select
              style={styles.input}
              value={txn.accountId}
              onChange={(e) => setTxn({ ...txn, accountId: e.target.value })}
            >
              <option value="">Select Account</option>
              {accounts.map((acc) => (
                <option key={acc.accountId} value={acc.accountId}>
                  {acc.accountNumber} — {acc.accountType.toUpperCase()} (₹
                  {acc.balance})
                </option>
              ))}
            </select>

            <input
              style={styles.input}
              type="number"
              placeholder="Amount"
              value={txn.amount}
              onChange={(e) => setTxn({ ...txn, amount: e.target.value })}
            />

            <button
              style={{
                ...styles.btnSuccess,
                ...(selectedAccount?.status === "closed" && styles.disabledBtn)
              }}
              disabled={!selectedAccount || selectedAccount.status === "closed"}
              onClick={() => handleTxn("deposit")}
            >
              Deposit
            </button>

            <button
              style={{
                ...styles.btnWarning,
                ...(selectedAccount?.status === "closed" && styles.disabledBtn)
              }}
              disabled={!selectedAccount || selectedAccount.status === "closed"}
              onClick={() => handleTxn("withdraw")}
            >
              Withdraw
            </button>
          </div>

          {selectedAccount?.status === "closed" && (
            <p style={styles.closedWarning}>
              ❌ This account is closed. No transactions allowed.
            </p>
          )}
        </div>
      )}

      {/* ============================
           ACCOUNTS GRID — ALL ROLES
         ============================ */}
      <div style={styles.card}>
        <h3 style={styles.cardHeader}>Your Accounts</h3>

        <div style={styles.grid}>
          {accounts.map((acc) => (
            <div key={acc.accountId} style={styles.gridItem}>
              <div style={styles.gridHeader}>
                <h4>Account #{acc.accountNumber}</h4>
                <span
                  style={{
                    ...styles.statusBadge,
                    background: acc.status === "active" ? "#4caf50" : "#e53935"
                  }}
                >
                  {acc.status.toUpperCase()}
                </span>
              </div>

              <p>Type: {acc.accountType}</p>
              <p>Balance: ₹{acc.balance}</p>

              {/* USER-ONLY BUTTONS */}
              {isUser && (
                <>
                  <button
                    style={styles.btnSecondary}
                    onClick={() =>
                      setOpenTxView(
                        openTxView === acc.accountId ? null : acc.accountId
                      )
                    }
                  >
                    {openTxView === acc.accountId
                      ? "Hide Transactions"
                      : "View Transactions"}
                  </button>

                  {acc.status === "active" && (
                    <button
                      style={styles.btnDanger}
                      onClick={() => dispatch(closeAccount(acc.accountId))}
                    >
                      Close Account
                    </button>
                  )}
                </>
              )}

              {/* ============================
                   TRANSACTIONS TABLE — USER ONLY
                 ============================ */}
              {isUser && openTxView === acc.accountId && (
                <div style={styles.txBox}>
                  <h4>Transactions</h4>

                  {transactions.filter(
                    (t) => t.account.accountId === acc.accountId
                  ).length === 0 ? (
                    <p>No transactions yet</p>
                  ) : (
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions
                          .filter(
                            (t) => t.account.accountId === acc.accountId
                          )
                          .map((t) => (
                            <tr key={t.transactionId}>
                              <td>{t.transactionId}</td>
                              <td>{t.transactionType}</td>
                              <td>₹{t.amount}</td>
                              <td>
                                {new Date(t.transDate).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;

/* ------------------ STYLES ---------------------- */
const styles = {
  page: {
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#eef1ff",
    minHeight: "100vh"
  },

  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
    color: "#3f51b5"
  },

  card: {
    background: "#ffffff",
    padding: "18px",
    margin: "15px 0",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  cardHeader: {
    marginBottom: "12px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#333"
  },

  inputRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center"
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    flex: "1"
  },

  btnPrimary: {
    padding: "10px 15px",
    background: "#3f51b5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  btnSuccess: {
    padding: "10px 15px",
    background: "#4caf50",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none"
  },

  btnWarning: {
    padding: "10px 15px",
    background: "#ff9800",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none"
  },

  btnDanger: {
    padding: "8px 12px",
    background: "#d32f2f",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    marginTop: "10px"
  },

  btnSecondary: {
    padding: "8px 12px",
    background: "#2196f3",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    marginTop: "10px"
  },

  disabledBtn: {
    background: "#9e9e9e",
    cursor: "not-allowed"
  },

  closedWarning: {
    color: "red",
    marginTop: "10px",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "15px"
  },

  gridItem: {
    background: "#f9f9ff",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

  gridHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  statusBadge: {
    padding: "5px 10px",
    color: "#fff",
    borderRadius: "20px",
    fontSize: "12px"
  },

  txBox: {
    marginTop: "10px",
    background: "#fff",
    padding: "10px",
    borderRadius: "8px"
  },

  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse"
  }
};
