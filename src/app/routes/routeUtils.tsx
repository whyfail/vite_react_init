import type { ReactElement } from 'react';
import type { RouteObject } from 'react-router-dom';
import type { AppRouteObject, RouteMeta } from './types';
import { Navigate } from 'react-router-dom';
import RouteGuard from './RouteGuard';

// HOC
function authLoad(element: AppRouteObject['element'], meta: RouteMeta = {}): ReactElement {
  return <RouteGuard meta={meta}>{element}</RouteGuard>;
}

// 路由配置列表数据转换
export function transformRoutes(routes: AppRouteObject[]): RouteObject[] {
  const list: RouteObject[] = [];

  routes.forEach((route) => {
    const obj: AppRouteObject = { ...route };

    if (obj.redirect) {
      obj.element = <Navigate to={obj.redirect} replace />;
    }

    if (obj.element) {
      obj.element = authLoad(obj.element, obj.meta);
    }

    delete obj.redirect;
    delete obj.meta;

    if (obj.children) {
      obj.children = transformRoutes(obj.children);
    }

    list.push(obj as RouteObject);
  });

  return list;
}
