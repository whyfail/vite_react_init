import { setToken } from '@/utils/auth.js';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginMain = React.memo(() => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const onFinish = async (e) => {
    try {
      if (e.name === 'admin' && e.password === 'admin') {
        message.success('登录成功');
        navigate('/');
        setToken('123', e.checked);
      } else {
        message.error('登录失败');
      }
    } catch (e) {
      console.error(e.message);
      message.error('登录失败');
    }
  };

  return (
    <div>
      <Form
        form={form}
        className="mt-48px w-400px"
        onFinish={onFinish}
        initialValues={{ name: 'admin', password: 'admin' }}
      >
        <Form.Item name="name" rules={[{ required: true, message: '账号必填', type: 'error' }]}>
          <Input size="large" placeholder="请输入账号：admin" prefix={<UserOutlined />}></Input>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '密码必填', type: 'error' }]}>
          <Input.Password size="large" placeholder="请输入登录密码：admin" suffix={<LockOutlined />} />
        </Form.Item>
        <Form.Item name="checked" valuePropName="checked">
          <Checkbox>记住账号</Checkbox>
        </Form.Item>
        <Form.Item className="mt-48px">
          <Button block size="large" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

LoginMain.displayName = 'LoginMain';

export default LoginMain;
