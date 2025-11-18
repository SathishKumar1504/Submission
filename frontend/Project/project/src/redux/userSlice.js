import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// ===========================
// LOGIN THUNK
// ===========================
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://localhost:7092/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let msg = "Login failed";
        const text = await response.text();

        try {
          const json = JSON.parse(text);
          msg = json.message || json.detail || json.title || text;
        } catch {
          msg = text;
        }

        return rejectWithValue(msg);
      }

      const data = await response.json();

      // Save to localStorage
      if (data.token) localStorage.setItem("token", data.token);
      if (data.refreshToken)
        localStorage.setItem("refreshToken", data.refreshToken);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===========================
// SLICE
// ===========================
const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    decodedToken: null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.refreshToken = null;
      state.decodedToken = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },

    // ⭐ Used by API auto-refresh
    setTokens: (state, action) => {
      const { token, refreshToken } = action.payload;

      state.token = token;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
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
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);

        try {
          state.decodedToken = jwtDecode(action.payload.token);
        } catch {
          state.decodedToken = null;
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout, setTokens } = userSlice.actions;
export default userSlice.reducer;
