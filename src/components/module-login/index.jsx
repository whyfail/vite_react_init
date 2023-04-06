import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginIndex = () => {
  const navigate = useNavigate();

  return (
    <center style={{ paddingTop: '20%' }}>
      <Button onClick={() => navigate('/')}>跳转主页</Button>
    </center>
  );
};

export default LoginIndex;
