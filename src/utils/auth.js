/**
 * token管理
 */

/** token 存储key */
const KEY_TOKEN = 'xxx_web_app_token';

/**
 * 是否登录
 * @returns {boolean} 返回true表示已登录，false表示未登录
 */
function isLogin() {
  return !!localStorage.getItem(KEY_TOKEN) || !!sessionStorage.getItem(KEY_TOKEN);
}

/**
 * 获取token
 * @returns {string} 返回token
 */
function getToken() {
  return localStorage.getItem(KEY_TOKEN) || sessionStorage.getItem(KEY_TOKEN);
}

/**
 * 设置token
 * @returns {void}
 */
function setToken(token, needLocal = false) {
  sessionStorage.setItem(KEY_TOKEN, token);
  needLocal && localStorage.setItem(KEY_TOKEN, token);
}

/**
 * 清除token
 * @returns {void}
 */
function clearToken() {
  localStorage.removeItem(KEY_TOKEN);
  sessionStorage.removeItem(KEY_TOKEN);
}

export { clearToken, getToken, isLogin, setToken };
