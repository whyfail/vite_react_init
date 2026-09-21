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
      url: '/api/v1/profile',
    })).resolves.toMatchObject({
      authorization: 'Bearer abc',
    });
  });

  it('normalizes server errors and calls status handlers', async () => {
    await expect(request({
      method: 'GET',
      url: '/api/v1/forbidden',
    })).rejects.toMatchObject({
      message: '无访问权限',
      status: 403,
    });

    expect(notifyError).toHaveBeenCalledWith('无访问权限');
  });

  it('extracts problem details fields from error responses', async () => {
    server.use(
      http.get('/api/v1/problem', () => HttpResponse.json(
        {
          type: 'https://httpstatuses.io/429',
          title: '请求过于频繁',
          status: 429,
          code: 'RATE_LIMITED',
          msg: '请求过于频繁，请稍后再试',
          requestId: 'req-123',
          timestamp: '2026-01-01T00:00:00Z',
        },
        { status: 429, headers: { 'Content-Type': 'application/problem+json' } },
      )),
    );

    await expect(request({
      method: 'GET',
      url: '/api/v1/problem',
    })).rejects.toMatchObject({
      message: '请求过于频繁，请稍后再试',
      code: 'RATE_LIMITED',
      requestId: 'req-123',
      status: 429,
    });
  });

  it('treats login 401 as credential failure without session teardown', async () => {
    const { handleUnauthorized } = await import('@/app/navigation');

    await expect(request({
      method: 'POST',
      url: '/api/v1/login',
      data: { username: 'guest', password: 'bad-password' },
    })).rejects.toMatchObject({
      message: '用户名或密码错误',
      status: 401,
    });

    expect(handleUnauthorized).not.toHaveBeenCalled();
  });

  it('normalizes network errors', async () => {
    server.use(
      http.get('/api/v1/network-error', () => HttpResponse.error()),
    );

    await expect(request({
      method: 'GET',
      url: '/api/v1/network-error',
    })).rejects.toMatchObject({
      message: 'Network Error',
    });

    expect(notifyError).toHaveBeenCalledWith('网络错误，请检查网络连接');
  });
});
