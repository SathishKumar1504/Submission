import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BANK_API = "https://localhost:7092/api/admin/banks";
const BRANCH_API = "https://localhost:7092/api/admin/branches";
const USER_API = "https://localhost:7092/api/admin/users";

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

// ----- Thunks -----
export const fetchBanks = createAsyncThunk('admin/fetchBanks', async (_, t) => {
  const res = await fetch(BANK_API, { headers: authHeader() });
  const json = await res.json();
  return res.ok ? json : t.rejectWithValue(json);
});
export const createBank = createAsyncThunk('admin/createBank', async (bank, t) => {
  const res = await fetch(BANK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(bank) });
  const json = await res.json();
  return res.ok ? json : t.rejectWithValue(json);
});
export const deleteBank = createAsyncThunk('admin/deleteBank', async (id, t) => {
  const res = await fetch(`${BANK_API}/${id}`, { method: 'DELETE', headers: authHeader() });
  const json = await res.json().catch(() => ({}));
  return res.ok ? json : t.rejectWithValue(json);
});

export const fetchBranches = createAsyncThunk('admin/fetchBranches', async (_, t) => {
  const res = await fetch(BRANCH_API, { headers: authHeader() });
  const json = await res.json();
  return res.ok ? json : t.rejectWithValue(json);
});
export const createBranch = createAsyncThunk('admin/createBranch', async (b, t) => {
  const res = await fetch(BRANCH_API, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(b) });
  const json = await res.json();
  return res.ok ? json : t.rejectWithValue(json);
});
export const deleteBranch = createAsyncThunk('admin/deleteBranch', async (id, t) => {
  const res = await fetch(`${BRANCH_API}/${id}`, { method: 'DELETE', headers: authHeader() });
  const json = await res.json().catch(() => ({}));
  return res.ok ? json : t.rejectWithValue(json);
});

export const fetchUsersAdmin = createAsyncThunk('admin/fetchUsers', async (_, t) => {
  const res = await fetch(USER_API, { headers: authHeader() });
  const json = await res.json();
  return res.ok ? json : t.rejectWithValue(json);
});
export const createUserAdmin = createAsyncThunk('admin/createUser', async (u, t) => {
  const res = await fetch(USER_API, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(u) });
  const json = await res.json();
  return res.ok ? json : t.rejectWithValue(json);
});
export const deleteUserAdmin = createAsyncThunk('admin/deleteUser', async (id, t) => {
  const res = await fetch(`${USER_API}/${id}`, { method: 'DELETE', headers: authHeader() });
  const json = await res.json().catch(() => ({}));
  return res.ok ? json : t.rejectWithValue(json);
});

// ----- Slice -----
const initialState = {
  banks: [],
  branches: [],
  users: [],
  status: 'idle',
  error: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchBanks
    builder.addCase(fetchBanks.pending, (state) => { state.status = 'loading'; state.error = null; });
    builder.addCase(fetchBanks.fulfilled, (state, action) => {
      const payload = action.payload;
      // Support both { success:true, banks:[...] } and raw array [...]
      state.banks = Array.isArray(payload) ? payload : (payload?.banks ?? payload?.data ?? []);
      state.status = 'succeeded';
    });
    builder.addCase(fetchBanks.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload ?? action.error.message;
    });

    // createBank
    builder.addCase(createBank.fulfilled, (state, action) => {
      const payload = action.payload;
      // if API returns { success:true, bank: {...} } or { bank: {...} } or returns created object directly
      const created = payload?.bank ?? payload?.data ?? (Array.isArray(payload) ? payload[0] : payload);
      if (created && created.bankId) state.banks.push(created);
    });
    builder.addCase(createBank.rejected, (state, action) => { state.error = action.payload ?? action.error.message; });

    // deleteBank
    builder.addCase(deleteBank.fulfilled, (state, action) => {
      // if API returns { success:true, id: x } or { id: x } or empty
      const payload = action.payload || {};
      const id = payload?.id ?? payload?.bankId ?? null;
      if (id) state.banks = state.banks.filter(b => b.bankId !== id);
    });

    // fetchBranches
    builder.addCase(fetchBranches.pending, (state) => { state.status = 'loading'; state.error = null; });
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      const payload = action.payload;
      state.branches = Array.isArray(payload) ? payload : (payload?.branches ?? payload?.data ?? []);
      state.status = 'succeeded';
    });
    builder.addCase(fetchBranches.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload ?? action.error.message;
    });

    // createBranch
    builder.addCase(createBranch.fulfilled, (state, action) => {
      const payload = action.payload;
      const created = payload?.branch ?? payload?.data ?? payload;
      if (created && created.branchId) state.branches.push(created);
    });

    // deleteBranch
    builder.addCase(deleteBranch.fulfilled, (state, action) => {
      const payload = action.payload || {};
      const id = payload?.id ?? payload?.branchId ?? null;
      if (id) state.branches = state.branches.filter(b => b.branchId !== id);
    });

    // fetchUsersAdmin
    builder.addCase(fetchUsersAdmin.pending, (state) => { state.status = 'loading'; state.error = null; });
    builder.addCase(fetchUsersAdmin.fulfilled, (state, action) => {
      const payload = action.payload;
      // If API returns { success:true, users: [...] } or raw [...]
      state.users = Array.isArray(payload) ? payload : (payload?.users ?? payload?.data ?? []);
      state.status = 'succeeded';
    });
    builder.addCase(fetchUsersAdmin.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload ?? action.error.message;
    });

    // createUserAdmin
    builder.addCase(createUserAdmin.fulfilled, (state, action) => {
      const payload = action.payload;
      const created = payload?.user ?? payload?.data ?? payload;
      if (created && created.userId) state.users.push(created);
    });

    // deleteUserAdmin
    builder.addCase(deleteUserAdmin.fulfilled, (state, action) => {
      const payload = action.payload || {};
      const id = payload?.id ?? payload?.userId ?? null;
      if (id) state.users = state.users.filter(u => u.userId !== id);
    });

    // generic rejected matcher (optional)
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.error = action.payload ?? action.error?.message ?? 'Unknown error';
      }
    );
  }
});

export default adminSlice.reducer;
