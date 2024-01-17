/**
 * token管理
 */

/** token 存储key */
const KEY_TOKEN = 'xxx_web_app_token';

/**
 * 是否登录
 * @returns {boolean}
 */
const isLogin = () => {
  return !!localStorage.getItem(KEY_TOKEN) || !!sessionStorage.getItem(KEY_TOKEN);
};

/**
 * 获取token
 * @returns {string}
 */
const getToken = () => {
  return localStorage.getItem(KEY_TOKEN) || sessionStorage.getItem(KEY_TOKEN);
};

/**
 * 设置token
 * @returns {void}
 */
const setToken = (token, needLocal = false) => {
  sessionStorage.setItem(KEY_TOKEN, token);
  needLocal && localStorage.setItem(KEY_TOKEN, token);
};

/**
 * 清除token
 * @returns {void}
 */
const clearToken = () => {
  localStorage.removeItem(KEY_TOKEN);
  sessionStorage.removeItem(KEY_TOKEN);
};

export { isLogin, getToken, setToken, clearToken };
