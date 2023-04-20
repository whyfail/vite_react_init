/**
 * 路由配置文件
 */
import React, { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import CommonRouterTransition from './CommonRouterTransition';

// 路由懒加载
const LoginIndex = lazy(() => import('../components/module-login'));
const Index = lazy(() => import('../components'));

const routes = [
  {
    path: '/',
    element: <CommonRouterTransition />,
    children: [
      {
        path: '/',
        name: 'index',
        element: <Index />,
      },
      {
        path: 'login',
        name: 'Login',
        element: <LoginIndex />,
        children: [
          {
            path: 'other',
            name: 'other',
            element: <div>other页面</div>,
          },
        ],
      },
      { path: '*', name: '404', element: <div>404页面</div> },
    ],
  },
];

export default createHashRouter(routes);
