import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://localhost:7092/api/User';

// =============================
// 🔹 GET all users
// =============================
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// =============================
// 🔹 ADD user
// =============================
export const addUser = createAsyncThunk('user/addUser', async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to add user');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// =============================
// 🔹 UPDATE user
// =============================
export const updateUser = createAsyncThunk('user/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/${userData.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// =============================
// 🔹 DELETE user
// =============================
export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// =============================
// 🧩 Slice
// =============================
const userCrudSlice = createSlice({
  name: 'userCrud',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Get all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // Update
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.userId === action.payload.userId);
        if (index !== -1) state.users[index] = action.payload;
      })

      // Delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.userId !== action.payload);
      });
  },
});

export default userCrudSlice.reducer;
