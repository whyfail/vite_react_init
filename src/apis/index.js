import { message } from 'antd';
import axios from 'axios';
import { clearToken, getToken } from '@/utils/auth.js';

// 访问前缀（线下）
export const BASE_NAME = '/API_BASE'; // 测试版本

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
  error => Promise.reject(error),
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
    const { response } = error;

    // 网络错误
    if (!response) {
      message.error('网络错误，请检查网络连接');

      return Promise.reject(error);
    }

    // 错误状态码处理映射
    const errorHandlers = {
      401: () => {
        message.error('登录已过期，请重新登录');
        clearToken();

        // 延迟跳转，避免多次请求时重复跳转
        setTimeout(() => {
          if (window.location.hash !== '#/login') {
            window.location.hash = '#/login';
          }
        }, 500);
      },
      403: () => message.error('无访问权限'),
      404: () => message.error('请求资源不存在'),
      500: () => message.error('服务器错误，请稍后重试'),
      502: () => message.error('网关错误'),
      503: () => message.error('服务不可用'),
      504: () => message.error('请求超时，请稍后重试'),
    };

    const handler = errorHandlers[response.status];

    if (handler) {
      handler();
    } else {
      message.error(response?.data?.msg || '请求失败，请稍后重试');
    }

    return Promise.reject(error);
  },
);

export default http;
