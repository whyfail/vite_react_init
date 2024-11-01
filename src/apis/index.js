import axios from 'axios';
import { getToken } from '@/utils/auth.js';

// 访问前缀（线下）
export const BASE_NAME = '/API_BASE'; //测试版本

// 响应码
export const ResponseCode = {
  successCode: 200,
  outTimeCode: 504,
  InvalidTokenCode: 401,
  OtherLoading: 403,
};

const http = axios.create({
  timeout: 5000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 接口带token
    config.headers.Authorization = getToken() ? `Bearer ${getToken()}` : '';

    return config;
  },
  (error) => Promise.reject(error),
);

//  响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response?.data?.msg === '请求过于频繁，请稍后再试') {
      console.error(response.data.msg);
    }

    return response.data;
  },
  (error) => {
    if (error?.response?.status === ResponseCode.outTimeCode) {
      console.error('请求超时,请稍后重试');
    }

    return Promise.reject(error);
  },
);

export default http;
