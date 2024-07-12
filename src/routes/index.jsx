/**
 * 路由配置文件
 */
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import CommonError from '@/components/CommonError';
import Router404 from '@/components/Router404';
import RouterAuth from '@/components/RouterAuth';

// 路由懒加载
const Index = lazy(() => import('../pages'));
const LoginIndex = lazy(() => import('../pages/module-login'));
const HomeIndex = lazy(() => import('../pages/module-home'));
const TextIndex = lazy(() => import('../pages/module-test'));

const routes = [
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
      {
        path: 'test',
        element: <TextIndex />,
        meta: {
          title: '测试页面',
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

// HOC
const authLoad = (element, meta = {}) => {
  return <RouterAuth meta={meta}>{element}</RouterAuth>;
};

// 路由配置列表数据转换
export const transformRoutes = (routes) => {
  const list = [];

  routes.forEach((route) => {
    const obj = { ...route };

    if (obj.redirect) {
      obj.element = <Navigate to={obj.redirect} replace={true} />;
    }

    if (obj.element) {
      obj.element = authLoad(obj.element, obj.meta);
    }

    delete obj.redirect;
    delete obj.meta;

    if (obj.children) {
      obj.children = transformRoutes(obj.children);
    }

    list.push(obj);
  });

  return list;
};

export default routes;
