/* eslint-disable react-refresh/only-export-components */
import type { AppRouteObject } from './types';
import { lazy } from 'react';
import CommonError from '@/components/CommonError';
import Router404 from '@/components/Router404';

// 路由懒加载
const Index = lazy(() => import('@/pages/index'));
const LoginIndex = lazy(() => import('@/pages/module-login/index'));
const HomeIndex = lazy(() => import('@/pages/module-home/index'));

const routes: AppRouteObject[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    element: <Index />,
    errorElement: <CommonError />,
    meta: {
      title: '首页',
      needLogin: true,
    },
    children: [
      {
        path: 'home',
        element: <HomeIndex />,
        meta: {
          title: '首页',
          needLogin: true,
        },
      },
    ],
  },
  {
    path: 'login',
    element: <LoginIndex />,
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
