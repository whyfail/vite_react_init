import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DesktopOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const LayoutSider = () => {
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

  const items = [getItem('首页', '/home', <HomeOutlined />), getItem('test', '/test', <DesktopOutlined />)];

  const handleSelect = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      className="h-100%"
      mode="inline"
      items={items}
      onSelect={handleSelect}
      defaultSelectedKeys={[location.pathname]}
    />
  );
};

export default LayoutSider;
