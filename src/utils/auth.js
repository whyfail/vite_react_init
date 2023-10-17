/**
 * token管理
 */
const KEY_TOKEN = 'xxx_web_app_token';

const isLogin = () => {
  return !!localStorage.getItem(KEY_TOKEN);
};

const getToken = () => {
  return localStorage.getItem(KEY_TOKEN);
};

const setToken = (token) => {
  localStorage.setItem(KEY_TOKEN, token);
};

const clearToken = () => {
  localStorage.removeItem(KEY_TOKEN);
};

export { isLogin, getToken, setToken, clearToken };
