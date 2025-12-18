import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@/utils/auth.js';
import LoginPrism from './LoginPrism.jsx';

function LoginIndex() {
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
    <div className="relative h-full w-full">
      <LoginPrism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0.5}
        glow={1}
      />
      <div className="absolute left-1/2 top-1/2 w-[520px] rd-[32px] bg-[#ecf0f350] p-8 shadow-[1px_1px_3px_#cbced1,-1px_-1px_3px_white] -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-center text-32px text-[#ffffff] font-bold text-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">登录</h2>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ name: 'admin', password: 'admin' }}
          size="large"
        >
          <Form.Item name="name" rules={[{ required: true, message: '账号必填', type: 'error' }]}>
            <Input placeholder="请输入账号：admin" suffix={<UserOutlined />}></Input>
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '密码必填', type: 'error' }]}>
            <Input.Password placeholder="请输入登录密码：admin" suffix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
          <Form.Item name="checked" valuePropName="checked">
            <div className="flex items-center justify-end">
              <Checkbox>记住账号</Checkbox>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginIndex;
