import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import CommonRouterTransition from '../../common/CommonRouterTransition';

const LoginIndex = () => {
  const navigate = useNavigate();

  return (
    <center style={{ paddingTop: '20%' }}>
      <Button onClick={() => navigate('/')}>跳转主页</Button>
      <Button onClick={() => navigate('/login/other')} type="link">
        跳转其他页
      </Button>
      {/* 嵌套路由必须添加 Outlet */}
      <CommonRouterTransition>
        <Outlet />
      </CommonRouterTransition>
    </center>
  );
};

export default LoginIndex;
