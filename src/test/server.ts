import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.post('/API_BASE/login', async ({ request }) => {
    const body = await request.json() as { name?: string, password?: string };

    if (body.name === 'admin' && body.password === 'admin') {
      return HttpResponse.json({ token: '123' });
    }

    return HttpResponse.json({ msg: '登录失败' }, { status: 401 });
  }),
  http.get('/API_BASE/profile', ({ request }) => {
    return HttpResponse.json({
      authorization: request.headers.get('authorization') ?? '',
      name: 'Admin',
    });
  }),
  http.get('/API_BASE/forbidden', () => {
    return HttpResponse.json({ msg: '无访问权限' }, { status: 403 });
  }),
  http.get('/API_BASE/server-error', () => {
    return HttpResponse.json({ msg: '服务器错误' }, { status: 500 });
  }),
);

export { server };
