import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { KEY_TOKEN } from '@/apis';

const LoginIndex = () => {
  const navigate = useNavigate();

  return (
    <center style={{ paddingTop: '20%' }}>
      <Button onClick={() => navigate('/')}>跳转主页</Button>
      <Button
        onClick={() => {
          localStorage.setItem(KEY_TOKEN, '123');
          navigate('/');
        }}
      >
        添加token跳转主页
      </Button>
    </center>
  );
};

export default LoginIndex;
