/**
 * 用户相关接口
 */
import http, { BASE_NAME } from './index';

interface UserLoginParams {
  name: string
  password: string
  checked?: boolean
}

/**
 * 登录
 */
export async function userLoginApi(value: UserLoginParams): Promise<unknown> {
  try {
    const data = await http.post(`${BASE_NAME}/login`, value);

    return data;
  } catch (error: unknown) {
    console.error(error);
  }
}
