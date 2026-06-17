const KEY_TOKEN = 'xxx_web_app_token';

function isAuthenticated(): boolean {
  return !!localStorage.getItem(KEY_TOKEN) || !!sessionStorage.getItem(KEY_TOKEN);
}

function getToken(): string | null {
  return localStorage.getItem(KEY_TOKEN) || sessionStorage.getItem(KEY_TOKEN);
}

function setToken(token: string, persist = false): void {
  sessionStorage.setItem(KEY_TOKEN, token);

  if (persist) {
    localStorage.setItem(KEY_TOKEN, token);
  }
}

function clearSession(): void {
  localStorage.removeItem(KEY_TOKEN);
  sessionStorage.removeItem(KEY_TOKEN);
}

export {
  clearSession,
  clearSession as clearToken,
  getToken,
  isAuthenticated,
  isAuthenticated as isLogin,
  setToken,
};
