/**
 * token管理
 */

/** token 存储key */
const KEY_TOKEN = 'xxx_web_app_token';

/**
 * 是否登录
 * @returns {boolean} 返回true表示已登录，false表示未登录
 */
function isLogin(): boolean {
  return !!localStorage.getItem(KEY_TOKEN) || !!sessionStorage.getItem(KEY_TOKEN);
}

/**
 * 获取token
 * @returns {string} 返回token
 */
function getToken(): string | null {
  return localStorage.getItem(KEY_TOKEN) || sessionStorage.getItem(KEY_TOKEN);
}

/**
 * 设置token
 * @returns {void}
 */
function setToken(token: string, needLocal = false): void {
  sessionStorage.setItem(KEY_TOKEN, token);
  needLocal && localStorage.setItem(KEY_TOKEN, token);
}

/**
 * 清除token
 * @returns {void}
 */
function clearToken(): void {
  localStorage.removeItem(KEY_TOKEN);
  sessionStorage.removeItem(KEY_TOKEN);
}

export { clearToken, getToken, isLogin, setToken };
