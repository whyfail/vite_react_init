import { clearSession, getToken, isAuthenticated, setToken } from './index';

describe('auth session', () => {
  it('stores short-lived tokens in session storage', () => {
    setToken('session-token');

    expect(getToken()).toBe('session-token');
    expect(isAuthenticated()).toBe(true);
    expect(localStorage.getItem('xxx_web_app_token')).toBeNull();
  });

  it('stores remembered tokens in both storage buckets', () => {
    setToken('remembered-token', true);

    expect(sessionStorage.getItem('xxx_web_app_token')).toBe('remembered-token');
    expect(localStorage.getItem('xxx_web_app_token')).toBe('remembered-token');
  });

  it('clears every token source', () => {
    setToken('remembered-token', true);

    clearSession();

    expect(getToken()).toBeNull();
    expect(isAuthenticated()).toBe(false);
  });
});
