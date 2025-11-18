import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://localhost:7092/api/customer";
// const API = "http://localhost:5107/api/customer";
const getToken = () => localStorage.getItem("token");

// ================================
// GET MY ACCOUNTS
// ================================
export const fetchMyAccounts = createAsyncThunk(
  "accounts/fetchMy",
  async (_, thunkAPI) => {
    const res = await fetch(`${API}/accounts`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) return thunkAPI.rejectWithValue(await res.text());
    return await res.json();
  }
);

// ================================
// CREATE ACCOUNT
// ================================
export const createAccount = createAsyncThunk(
  "accounts/create",
  async (dto, thunkAPI) => {
    const res = await fetch(`${API}/accounts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) return thunkAPI.rejectWithValue(await res.text());
    return await res.json();
  }
);

// ================================
// CLOSE ACCOUNT
// ================================
export const closeAccount = createAsyncThunk(
  "accounts/close",
  async (id, thunkAPI) => {
    const res = await fetch(`${API}/accounts/close/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) return thunkAPI.rejectWithValue(await res.text());
    return await res.json();
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    accounts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAccounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accounts = action.payload;
      })
      .addCase(fetchMyAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(createAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })

      .addCase(closeAccount.fulfilled, (state, action) => {
        const closedId = action.payload.id;
        const acc = state.accounts.find((a) => a.accountId === closedId);
        if (acc) acc.status = "closed";
      });
  },
});

export default accountsSlice.reducer;
