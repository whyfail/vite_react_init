import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';
import { setToken } from '@/features/auth/session';
import { server } from '@/test/server';
import { request } from './http';

const notifyError = vi.hoisted(() => vi.fn());

vi.mock('@/app/navigation', () => ({
  handleUnauthorized: vi.fn(),
}));

vi.mock('@/app/notifications', () => ({
  notify: {
    error: notifyError,
    success: vi.fn(),
  },
}));

describe('http request client', () => {
  it('unwraps response data and injects bearer tokens', async () => {
    setToken('abc');

    await expect(request<{ authorization: string }>({
      method: 'GET',
      url: '/API_BASE/profile',
    })).resolves.toMatchObject({
      authorization: 'Bearer abc',
    });
  });

  it('normalizes server errors and calls status handlers', async () => {
    await expect(request({
      method: 'GET',
      url: '/API_BASE/forbidden',
    })).rejects.toMatchObject({
      message: '无访问权限',
      status: 403,
    });

    expect(notifyError).toHaveBeenCalledWith('无访问权限');
  });

  it('normalizes network errors', async () => {
    server.use(
      http.get('/API_BASE/network-error', () => HttpResponse.error()),
    );

    await expect(request({
      method: 'GET',
      url: '/API_BASE/network-error',
    })).rejects.toMatchObject({
      message: 'Network Error',
    });

    expect(notifyError).toHaveBeenCalledWith('网络错误，请检查网络连接');
  });
});
