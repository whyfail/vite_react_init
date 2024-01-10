import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Image, Popover, Space } from 'antd';
import { useRecoilState } from 'recoil';
import AssetLogoFull from '@/assets/images/login/assets-logo-full.svg';
import AssetLogo from '@/assets/images/login/assets-t-logo.svg';
import { commonMenuFull } from '@/stores/store-common';
import { clearToken } from '@/utils/auth';

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

  const [commonMenuFullVal, setCommonMenuFullVal] = useRecoilState(commonMenuFull);

  return (
    <div className={classes.root}>
      <Space>
        <Image src={commonMenuFullVal ? AssetLogoFull : AssetLogo} height={33} preview={false} />
        <Button
          type="link"
          icon={<MenuOutlined />}
          size={33}
          onClick={() => setCommonMenuFullVal(!commonMenuFullVal)}
        />
      </Space>
      <Popover
        content={
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
        }
        trigger="click"
        placement="bottom"
      >
        <Button type="link" icon={<UserOutlined />}>
          admin <DownOutlined />
        </Button>
      </Popover>
    </div>
  );
});

LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
