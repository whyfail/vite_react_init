import AssetLogoFull from '@/assets/images/login/assets-logo-full.svg';
import AssetLogo from '@/assets/images/login/assets-t-logo.svg';
import { useStoreSystem } from '@/stores/index.js';
import { clearToken } from '@/utils/auth.js';
import { DownOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useSize } from 'ahooks';
import { Button, Image, Popover, Space } from 'antd';
import { memo, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const LayoutHeader = memo(() => {
  const classes = useStyle();
  const navigate = useNavigate();
  const ref = useRef(null);
  const size = useSize(ref);

  const { systemMenuFull, setSystemMenuFull } = useStoreSystem();

  useEffect(() => {
    size?.width && setSystemMenuFull(size?.width > 1400);
  }, [size]);

  return (
    <div className={classes.root} ref={ref}>
      <Space>
        <Image src={systemMenuFull ? AssetLogoFull : AssetLogo} height={33} preview={false} />
        <Button
          type="link"
          icon={<MenuOutlined />}
          size={33}
          onClick={() => setSystemMenuFull(!systemMenuFull)}
        />
      </Space>
      <Popover
        content={(
          <Space direction="vertical" style={{ width: '120px' }}>
            <Button type="text" icon={<UserOutlined />}>
              用户中心
            </Button>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => {
                clearToken();
                navigate('/login');
              }}
            >
              退出登录
            </Button>
          </Space>
        )}
        trigger="click"
        placement="bottom"
      >
        <Button type="link" icon={<UserOutlined />}>
          admin
          {' '}
          <DownOutlined />
        </Button>
      </Popover>
    </div>
  );
});

LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
