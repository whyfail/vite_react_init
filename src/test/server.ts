import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { authHandlers } from '@/shared/api/mock/handlers';

const server = setupServer(
  ...authHandlers,
  http.get('/api/v1/profile', ({ request }) => {
    return HttpResponse.json({
      authorization: request.headers.get('authorization') ?? '',
      name: 'Admin',
    });
  }),
  http.get('/api/v1/forbidden', () => {
    return HttpResponse.json({ msg: '无访问权限' }, { status: 403 });
  }),
  http.get('/api/v1/server-error', () => {
    return HttpResponse.json({ msg: '服务器错误' }, { status: 500 });
  }),
);

export { server };
