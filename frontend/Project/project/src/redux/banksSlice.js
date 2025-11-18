// src/redux/banksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchBanks = createAsyncThunk("banks/fetchBanks", async (params = {}) => {
  const res = await api.get("/banks", { params });
  return res;
});

export const createBank = createAsyncThunk("banks/createBank", async (body) => {
  const res = await api.post("/banks", body);
  return res;
});

export const fetchBankDetails = createAsyncThunk("banks/fetchBankDetails", async (id) => {
  const res = await api.get(`/banks/${id}`);
  return res;
});

export const addBranch = createAsyncThunk("banks/addBranch", async ({ bankId, body }) => {
  const res = await api.post(`/banks/${bankId}/branches`, body);
  return res;
});

const banksSlice = createSlice({
  name: "banks",
  initialState: { items: [], current: null, total: 0, loading: false, error: null },
  reducers: { clearBanks(state) { state.items = []; state.current = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanks.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchBanks.fulfilled, (s, a) => { s.loading = false; s.items = a.payload.items || a.payload; s.total = a.payload.total ?? s.items.length; })
      .addCase(fetchBanks.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(createBank.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(fetchBankDetails.fulfilled, (s, a) => { s.current = a.payload; })
      .addCase(addBranch.fulfilled, (s, a) => { 
         if (s.current && s.current.id === a.payload.bankId) {
           s.current.branches = s.current.branches || [];
           s.current.branches.push(a.payload);
         }
      });
  }
});

export const { clearBanks } = banksSlice.actions;
export default banksSlice.reducer;
