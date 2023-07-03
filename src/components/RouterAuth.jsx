import React from 'react';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';
import { KEY_TOKEN } from '@/apis';

const RouterAuth = (props) => {
  const { meta } = props;

  // 设置标题
  if (meta && meta.title) {
    document.title = meta.title;
  }

  const token = localStorage.getItem(KEY_TOKEN);

  // 权限校验，需要token但是没有token就重定向去登录页
  if (meta && meta.needLogin && !token) {
    message.error('请先登录!');

    return <Navigate to="/login" replace></Navigate>;
  }

  return <>{props.children}</>;
};

export default RouterAuth;
