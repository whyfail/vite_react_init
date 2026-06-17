/* eslint-disable react-refresh/only-export-components */
import type { AppRouteObject } from './types';
import { lazy } from 'react';
import AppLayout from '@/app/AppLayout';
import CommonError from '@/shared/components/CommonError';
import Router404 from '@/shared/components/Router404';

// 路由懒加载
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const DocsPage = lazy(() => import('@/features/docs/pages/DocsPage'));

const routes: AppRouteObject[] = [
  {
    path: '/',
    redirect: '/docs',
  },
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <CommonError />,
    meta: {
      title: '文档',
      needLogin: true,
    },
    children: [
      {
        path: 'docs',
        element: <DocsPage />,
        meta: {
          title: '文档',
          needLogin: true,
        },
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
    meta: {
      title: '登录页',
      needLogin: false,
    },
  },
  // 放最后
  {
    path: '*',
    element: <Router404 />,
    meta: {
      title: '404',
      needLogin: true,
    },
  },
];

export default routes;
