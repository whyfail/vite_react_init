import { Navigate } from 'react-router-dom';
import RouterAuth from '@/components/RouterAuth.jsx';

// HOC
function authLoad(element, meta = {}) {
  return <RouterAuth meta={meta}>{element}</RouterAuth>;
}

// 路由配置列表数据转换
export function transformRoutes(routes) {
  const list = [];

  routes.forEach((route) => {
    const obj = { ...route };

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

    list.push(obj);
  });

  return list;
}
