import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://localhost:7092/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Login failed');
      }

      const data = await response.json(); // { token: "..." }
      console.log('✅ Token received:', data.token);

      // ✅ Save token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    isLoggedIn: !!localStorage.getItem('authToken'),
    token: localStorage.getItem('authToken') || null,
    decodedToken: null, // ✅ new field
    loading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.decodedToken = null;
      localStorage.removeItem('authToken');
      state.successMessage = '👋 Logged out successfully!';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;

        // ✅ Decode JWT token
        try {
          const decoded = jwtDecode(action.payload.token);
          console.log('🔍 Decoded Token:', decoded);
          state.decodedToken = decoded;
        } catch (err) {
          console.error('❌ Error decoding token:', err);
        }

        state.successMessage = '✅ Login successful!';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
