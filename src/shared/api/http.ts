import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { handleUnauthorized } from '@/app/navigation';
import { notify } from '@/app/notifications';
import { getToken } from '@/features/auth/session';

// 后端 Problem Details（application/problem+json）顶层字段。
// 与生成目录中的 Problem 模型保持同构；此处独立声明以避免 http -> generated 的循环依赖。
interface ProblemDetailsData {
  code?: string
  msg?: string
  detail?: string
  requestId?: string
}

interface ApiError {
  status?: number
  message: string
  code?: string
  requestId?: string
  raw?: unknown
}

const http = axios.create({
  timeout: 5000,
});

function toApiError(error: AxiosError<ProblemDetailsData>): ApiError {
  const problem = error.response?.data;

  return {
    status: error.response?.status,
    message: problem?.msg || problem?.detail || error.message || '请求失败，请稍后重试',
    code: problem?.code,
    requestId: problem?.requestId,
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
  (error: AxiosError<ProblemDetailsData>) => {
    const { response } = error;
    const apiError = toApiError(error);

    if (!response) {
      notify.error('网络错误，请检查网络连接');

      return Promise.reject(apiError);
    }

    // 登录接口的 401 表示凭据错误，由登录页自行提示，不走会话过期流程
    const isLoginRequest = Boolean(error.config?.url?.endsWith('/login'));

    if (response.status === 401 && isLoginRequest) {
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
  // The response interceptor unwraps response.data, which Axios cannot infer.
  return http.request<unknown, unknown>(config) as Promise<T>;
}

function isApiError(value: unknown): value is ApiError {
  return typeof value === 'object' && value !== null && 'message' in value;
}

export type { ApiError };
export { http, isApiError, request };
