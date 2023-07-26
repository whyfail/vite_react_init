import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { KEY_TOKEN } from '@/apis';
import { App as AntdApp } from 'antd';

const RouterAuth = (props) => {
  const { meta } = props;
  const { message } = AntdApp.useApp();

  // 设置标题
  if (meta && meta.title) {
    document.title = meta.title;
  }

  // 获取登录Token
  const token = localStorage.getItem(KEY_TOKEN);

  // 权限登录校验
  const needLogin = meta && meta.needLogin && !token;

  useEffect(() => {
    if (needLogin) {
      message.error('请先登录!');
    }
  }, [meta, token, message]);

  if (needLogin) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <>{props.children}</>;
};

export default RouterAuth;
