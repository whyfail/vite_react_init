import { userLoginApi } from './userApi';

describe('user api', () => {
  it('posts login credentials through the shared request client', async () => {
    await expect(userLoginApi({ name: 'admin', password: 'admin' })).resolves.toEqual({ token: '123' });
  });

  it('rejects invalid credentials with an api error', async () => {
    await expect(userLoginApi({ name: 'guest', password: 'bad' })).rejects.toMatchObject({
      message: '登录失败',
      status: 401,
    });
  });
});
