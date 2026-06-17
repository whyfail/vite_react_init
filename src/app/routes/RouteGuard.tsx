import type { ReactElement, ReactNode } from 'react';
import type { RouteMeta } from '@/app/routes/types';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { notify } from '@/app/notifications';
import { isAuthenticated } from '@/features/auth/session';

interface RouteGuardProps {
  meta?: RouteMeta
  children?: ReactNode
}

function usePageTitle(title?: string): void {
  useEffect(() => {
    if (title) {
      document.title = `${import.meta.env.VITE_APP_NAME} - ${title}`;
    }
  }, [title]);
}

function RouteGuard(props: RouteGuardProps): ReactElement {
  const { meta, children } = props;

  usePageTitle(meta?.title);

  // 权限登录校验
  const needLogin = meta && meta.needLogin && !isAuthenticated();

  useEffect(() => {
    if (needLogin) {
      notify.error('请先登录!');
    }
  }, [needLogin]);

  if (needLogin) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <>{children}</>;
}

export default RouteGuard;
