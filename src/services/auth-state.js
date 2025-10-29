export const AUTH_STORAGE_KEY = "promptInsightAuth";

const safelyParse = (raw) => {
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("[AuthState] Failed to parse stored auth state", error);
    return null;
  }
};

export const getAuthState = () => {
  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  const parsed = safelyParse(raw);
  if (!parsed || !parsed.tokens?.accessToken) {
    return null;
  }
  return parsed;
};

export const setAuthState = (state) => {
  if (!state) return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
};

export const clearAuthState = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const hasAuthState = () => Boolean(getAuthState());
