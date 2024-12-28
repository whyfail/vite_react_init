/**
 * 用户相关接口
 */
import http, { BASE_NAME } from './index.js';

/**
 * 登录
 */
export async function userLoginApi(value) {
  try {
    const data = await http.post(`${BASE_NAME}/login`, value);

    return data;
  } catch (error) {
    console.error(error);
  }
}
