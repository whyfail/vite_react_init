import { userLoginApi } from './userApi';

describe('user api', () => {
  it('posts canonical login credentials and resolves the contract response', async () => {
    const result = await userLoginApi({ username: 'admin', password: 'admin', remember: true });

    expect(result.tokenType).toBe('Bearer');
    expect(result.token.length).toBeGreaterThanOrEqual(43);
    expect(new Date(result.expiresAt).getTime()).toBeGreaterThan(Date.now());
    expect(result.user.username).toBe('admin');
    expect(result.user.roles).toContain('ADMIN');
  });

  it('rejects invalid credentials with problem details fields', async () => {
    await expect(userLoginApi({ username: 'guest', password: 'bad-password' })).rejects.toMatchObject({
      message: '用户名或密码错误',
      code: 'AUTH_INVALID_CREDENTIALS',
      requestId: 'mock-request-id',
      status: 401,
    });
  });
});
