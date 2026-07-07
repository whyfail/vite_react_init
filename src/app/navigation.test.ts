import { vi } from 'vitest';
import { setToken } from '@/features/auth/session';
import { handleUnauthorized, navigateToLogin } from './navigation';

const notifyError = vi.hoisted(() => vi.fn());

vi.mock('./notifications', () => ({
  notify: {
    error: notifyError,
  },
}));

describe('navigation helpers', () => {
  it('navigates to login only when needed', () => {
    window.location.hash = '#/docs';

    navigateToLogin();

    expect(window.location.hash).toBe('#/login');

    navigateToLogin();

    expect(window.location.hash).toBe('#/login');
  });

  it('clears session and schedules login navigation for unauthorized users', () => {
    vi.useFakeTimers();
    setToken('abc', true);
    window.location.hash = '#/docs';

    handleUnauthorized();

    expect(sessionStorage.getItem('xxx_web_app_token')).toBeNull();
    expect(localStorage.getItem('xxx_web_app_token')).toBeNull();
    expect(notifyError).toHaveBeenCalledWith('登录已过期，请重新登录');

    vi.advanceTimersByTime(500);

    expect(window.location.hash).toBe('#/login');
    vi.useRealTimers();
  });
});
