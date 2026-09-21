import type { AxiosRequestConfig } from 'axios';
import { request } from './http';

// Orval 生成的 client 统一通过该包装发请求，以复用 http.ts 的
// 认证头、401 处理与错误归一拦截器，而不是使用裸 axios 实例。
export function customInstance<T>(config: AxiosRequestConfig): Promise<T> {
  return request<T>(config);
}
