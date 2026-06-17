import { clearSession } from '@/features/auth/session';
import { notify } from './notifications';

function navigateToLogin(): void {
  if (window.location.hash !== '#/login') {
    window.location.hash = '#/login';
  }
}

function handleUnauthorized(): void {
  notify.error('登录已过期，请重新登录');
  clearSession();

  setTimeout(navigateToLogin, 500);
}

export { handleUnauthorized, navigateToLogin };
