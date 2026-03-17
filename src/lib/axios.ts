import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

// How many seconds before expiry we consider the token "near expiration"
const TOKEN_REFRESH_THRESHOLD_SECONDS = 45;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
function redirectToLogin() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}
function getTokenExpirySeconds(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (typeof payload.exp !== "number") return null;
    return payload.exp - Math.floor(Date.now() / 1000);
  } catch {
    return null;
  }
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(
    `${BASE_URL}/users/refresh`,
    null, // no request body
    {
      params: {
        refresh_token: refreshToken, // sent as query param: /users/refresh?refresh_token=...
      }
    }
  );

  const newAccessToken = response.data.access_token;
  localStorage.setItem("access_token", newAccessToken);
  return newAccessToken;
}

// ── Request interceptor ──────────────────────────────────────────────────────
// Proactively refreshes the token if it's within the threshold of expiring,
// so requests never go out with a token that's about to be invalid.
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token");

    if (token) {
      const secondsLeft = getTokenExpirySeconds(token);

      const isNearExpiry =
        secondsLeft !== null && secondsLeft < TOKEN_REFRESH_THRESHOLD_SECONDS;

      if (isNearExpiry) {
        try {
          token = await refreshAccessToken();
        } catch {
          redirectToLogin();
          return Promise.reject(new Error("Session expired. Redirecting to login."));
        }
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ─────────────────────────────────────────────────────
// Acts as a safety net for unexpected 401s that slip past the request check
// (e.g. clock skew, server-side revocation, token blacklisting).
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch {
        redirectToLogin();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);