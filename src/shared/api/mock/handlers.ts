import { http, HttpResponse } from 'msw';

// 演示账号与契约形状的固定响应。仅在显式开启 VITE_ENABLE_MOCK 时启用，
// 组合模式（create-wl-app preset）不会引入该模块。
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'admin';

// 43+ 字符的不透明 token，满足 LoginResponse 的 minLength 约束
const DEMO_TOKEN = 'mock-opaque-token-abcdefghijklmnopqrstuvwxyz0123456789abcdef';

const DEMO_USER = {
  publicId: '9f1c3b2a-4d5e-4f60-8a71-2b3c4d5e6f70',
  username: DEMO_USERNAME,
  displayName: 'Administrator',
  enabled: true,
  roles: ['ADMIN'],
  permissions: ['user:read', 'user:create', 'user:update'],
} as const;

function problemResponse(status: number, code: string, msg: string) {
  return HttpResponse.json(
    {
      type: `https://httpstatuses.io/${status}`,
      title: msg,
      status,
      code,
      msg,
      requestId: 'mock-request-id',
      timestamp: new Date().toISOString(),
    },
    { status, headers: { 'Content-Type': 'application/problem+json' } },
  );
}

const authHandlers = [
  http.post('/api/v1/login', async ({ request }) => {
    const body = await request.json() as { username?: string, password?: string };

    if (body.username === DEMO_USERNAME && body.password === DEMO_PASSWORD) {
      return HttpResponse.json({
        token: DEMO_TOKEN,
        tokenType: 'Bearer',
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        user: DEMO_USER,
      });
    }

    return problemResponse(401, 'AUTH_INVALID_CREDENTIALS', '用户名或密码错误');
  }),
  http.post('/api/v1/logout', () => new HttpResponse(null, { status: 204 })),
  http.get('/api/v1/me', () => HttpResponse.json(DEMO_USER)),
];

export { authHandlers };
