import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://localhost:7092/api/customer";
// const API = "http://localhost:5107/api/customer";
const getToken = () => localStorage.getItem("token");

// GET all my transactions
export const fetchMyTransactions = createAsyncThunk(
  "tx/fetch",
  async (_, thunkAPI) => {
    const res = await fetch(`${API}/transactions`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) return thunkAPI.rejectWithValue(await res.text());
    return await res.json();
  }
);

// CREATE transaction (deposit/withdraw)
export const createTransaction = createAsyncThunk(
  "tx/create",
  async (dto, thunkAPI) => {
    const res = await fetch(`${API}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(dto)
    });

    if (!res.ok) return thunkAPI.rejectWithValue(await res.text());
    return await res.json();
  }
);

const slice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTransactions.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchMyTransactions.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.list = a.payload;
      })
      .addCase(fetchMyTransactions.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      });
  }
});

export default slice.reducer;
