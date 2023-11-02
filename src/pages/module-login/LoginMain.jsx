import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, RedoOutlined } from '@ant-design/icons';
import { useCountDown } from 'ahooks';
import { Form, Input, Checkbox, Button, QRCode, Space, App } from 'antd';
import clsx from 'clsx';
import { setToken } from '@/utils/auth';

const useStyle = createUseStyles({
  itemContainer: {
    width: 400,
    marginTop: 48,
  },

  checkContainer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: 'var(--td-text-color-secondary)',
  },
  rememberPwd: {
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  tipContainer: {
    width: 192,
    marginBottom: 16,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-between',
    '& .refresh': {
      cursor: 'pointer',
      color: '#1677ff',
    },
  },
  verificationBtn: {
    flexShrink: 0,
    width: 102,
    height: 40,
    marginLeft: 11,
  },
  btnContainer: {
    marginTop: 48,
  },
  switchContainer: {
    marginTop: 24,
    cursor: 'pointer',
  },
  root_yzm: {
    width: '100%',
    '& .ant-space-item:first-child': {
      width: '70%',
    },
  },
});

const LoginMain = () => {
  const classes = useStyle();
  const formRef = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [targetDate, setTargetDate] = useState(undefined);
  const [countdown] = useCountDown({ targetDate });
  const [loginType, changeLoginType] = useState('password');

  const onFinish = async (e) => {
    try {
      if (e.name === 'admin' && e.password === 'admin') {
        message.success('登录成功');
        setToken('123');
        navigate('/');
      } else {
        message.error('登录失败');
      }
    } catch (e) {
      message.error('登录失败');
    }
  };

  const switchType = (val) => {
    formRef.current?.reset?.();
    changeLoginType(val);
  };

  return (
    <div>
      <Form form={form} className={classes.itemContainer} onFinish={onFinish}>
        {loginType === 'password' && (
          <>
            <Form.Item name="name" rules={[{ required: true, message: '账号必填', type: 'error' }]}>
              <Input size="large" placeholder="请输入账号：admin" prefix={<UserOutlined />}></Input>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '密码必填', type: 'error' }]}>
              <Input.Password size="large" placeholder="请输入登录密码：admin" suffix={<LockOutlined />} />
            </Form.Item>
            <div className={clsx(classes.checkContainer, classes.rememberPwd)}>
              <Checkbox>记住账号</Checkbox>
            </div>
          </>
        )}

        {/* 扫码登陆 */}
        {loginType === 'qrcode' && (
          <>
            <div className={classes.tipContainer}>
              <span className="tip">请使用微信扫一扫登录</span>
              <span className="refresh">
                刷新 <RedoOutlined />
              </span>
            </div>
            <QRCode value="https://ant.design/" size={200} />
          </>
        )}
        {/* // 手机号登陆 */}
        {loginType === 'phone' && (
          <>
            <Form.Item name="phone" rules={[{ required: true, message: '手机号必填', type: 'error' }]}>
              <Input maxLength={11} size="large" placeholder="请输入您的手机号" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="verifyCode" rules={[{ required: true, message: '验证码必填', type: 'error' }]}>
              <Space direction="horizontal" className={classes.root_yzm}>
                <Input size="large" placeholder="请输入验证码" />
                <Button
                  className={classes.verificationBtn}
                  disabled={countdown > 0}
                  onClick={() => setTargetDate(Date.now() + 60000)}
                  type="primary"
                >
                  {countdown === 0 ? '发送验证码' : `${Math.round(countdown / 1000)}秒`}
                </Button>
              </Space>
            </Form.Item>
          </>
        )}
        {loginType !== 'qrcode' && (
          <Form.Item className={classes.btnContainer}>
            <Button block size="large" type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        )}
        <div className={classes.switchContainer}>
          <Space>
            {loginType !== 'password' && (
              <Button type="link" size="small" onClick={() => switchType('password')}>
                使用账号密码登录
              </Button>
            )}
            {loginType !== 'qrcode' && (
              <Button type="link" size="small" onClick={() => switchType('qrcode')}>
                使用微信扫码登录
              </Button>
            )}
            {loginType !== 'phone' && (
              <Button type="link" size="small" onClick={() => switchType('phone')}>
                使用手机号登录
              </Button>
            )}
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default LoginMain;
