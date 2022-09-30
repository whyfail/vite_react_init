/**
 * 用户相关接口
 */
import axios, { BASE_NAME } from './index';

/**
 * 登录
 */
export const userLoginApi = async (value) => {
  try {
    const data = await axios.post(`${BASE_NAME}/login`, value);

    return data;
  } catch (error) {
    console.error(error);

    return;
  }
};
