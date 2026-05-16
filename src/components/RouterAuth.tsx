import type { ReactElement, ReactNode } from 'react';
import type { RouteMeta } from '@/routes/types';
import { App as AntdApp } from 'antd';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '@/utils/auth';

interface RouterAuthProps {
  meta?: RouteMeta
  children?: ReactNode
}

function RouterAuth(props: RouterAuthProps): ReactElement {
  const { meta, children } = props;
  const { message } = AntdApp.useApp();

  // 设置标题
  useEffect(() => {
    if (meta && meta.title) {
      document.title = `${import.meta.env.VITE_APP_NAME} - ${meta.title}`;
    }
  }, [meta]);

  // 权限登录校验
  const needLogin = meta && meta.needLogin && !isLogin();

  useEffect(() => {
    if (needLogin) {
      message.error('请先登录!');
    }
  }, [message, needLogin]);

  if (needLogin) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <>{children}</>;
}

export default RouterAuth;
