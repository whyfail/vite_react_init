import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { handleUnauthorized } from '@/app/navigation';
import { notify } from '@/app/notifications';
import { getToken } from '@/features/auth/session';

interface ApiErrorData {
  msg?: string
}

interface ApiError {
  status?: number
  message: string
  raw?: unknown
}

const http = axios.create({
  timeout: 5000,
});

function toApiError(error: AxiosError<ApiErrorData>): ApiError {
  return {
    status: error.response?.status,
    message: error.response?.data?.msg || error.message || '请求失败，请稍后重试',
    raw: error,
  };
}

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
  },
  error => Promise.reject(error),
);

http.interceptors.response.use(
  (response) => {
    if (response?.data?.msg === '请求过于频繁，请稍后再试') {
      console.error(response.data.msg);
    }

    return response.data;
  },
  (error: AxiosError<ApiErrorData>) => {
    const { response } = error;
    const apiError = toApiError(error);

    if (!response) {
      notify.error('网络错误，请检查网络连接');

      return Promise.reject(apiError);
    }

    const errorHandlers: Partial<Record<number, () => void>> = {
      401: handleUnauthorized,
      403: () => notify.error('无访问权限'),
      404: () => notify.error('请求资源不存在'),
      500: () => notify.error('服务器错误，请稍后重试'),
      502: () => notify.error('网关错误'),
      503: () => notify.error('服务不可用'),
      504: () => notify.error('请求超时，请稍后重试'),
    };

    const handler = errorHandlers[response.status];

    if (handler) {
      handler();
    } else {
      notify.error(apiError.message);
    }

    return Promise.reject(apiError);
  },
);

function request<T>(config: AxiosRequestConfig): Promise<T> {
  return http.request<unknown, T>(config);
}

export type { ApiError };
export { http, request };
