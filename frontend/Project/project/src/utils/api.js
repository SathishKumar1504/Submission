import { store } from "../redux/store";
import { setTokens, logout } from "../redux/userSlice";

const API_BASE = "https://localhost:7092/api";

function buildUrl(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "")
      url.searchParams.append(k, v);
  });
  return url.toString();
}

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { message: text }; }
    throw new Error(data?.message || res.statusText || "Request failed");
  }
  const txt = await res.text();
  try { return JSON.parse(txt); } catch { return txt; }
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const data = await res.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);

  store.dispatch(
    setTokens({
      token: data.token,
      refreshToken: data.refreshToken,
    })
  );

  return data.token;
}

// 🔥 Wrapper to auto-refresh token
async function fetchWithRefresh(url, options = {}) {
  const token = localStorage.getItem("token");

  options.headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  let res = await fetch(url, options);

  // If token expired → try refresh
  if (res.status === 401) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      store.dispatch(logout());
      throw new Error("Session expired. Please login again.");
    }

    // 🔄 Retry the original request
    options.headers.Authorization = `Bearer ${newToken}`;
    res = await fetch(url, options);
  }

  return handleResponse(res);
}

const api = {
  get: (path, { params } = {}) => {
    const url = buildUrl(path, params);
    return fetchWithRefresh(url, { method: "GET" });
  },

  post: (path, body = {}, { params } = {}) => {
    const url = buildUrl(path, params);
    return fetchWithRefresh(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  },

  put: (path, body = {}, { params } = {}) => {
    const url = buildUrl(path, params);
    return fetchWithRefresh(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  },

  delete: (path, { params } = {}) => {
    const url = buildUrl(path, params);
    return fetchWithRefresh(url, { method: "DELETE" });
  },
};

export default api;
