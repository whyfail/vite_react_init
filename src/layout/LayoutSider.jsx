import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useLocation } from 'react-router-dom';
import { DesktopOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const useStyle = createUseStyles({
  root: {
    height: '100%',
  },
});

const LayoutSider = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [getItem('首页', '/home', <HomeOutlined />), getItem('other', '/other', <DesktopOutlined />)];

  const handleSelect = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      className={classes.root}
      mode="inline"
      items={items}
      onSelect={handleSelect}
      defaultSelectedKeys={[location.pathname]}
    />
  );
};

export default LayoutSider;
