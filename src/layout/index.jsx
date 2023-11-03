/**
 * 布局
 */
import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Layout } from 'antd';
import LayoutContent from './LayoutContent';
import LayoutHeader from './LayoutHeader';
import LayoutSider from './LayoutSider';

const useStyle = createUseStyles({
  root: {
    height: '100%',
  },
  root_header: {
    color: '#fff',
    height: 57,
    paddingInline: 50,
    background: '#ffffff',
  },
  root_sider: {
    textAlign: 'center',
    color: '#fff',
  },
  root_content: {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
  },
  root_footer: {
    textAlign: 'center',
    color: '#fff',
  },
});

const LayoutIndex = memo(() => {
  const classes = useStyle();

  return (
    <Layout className={classes.root}>
      <Layout.Header className={classes.root_header}>
        <LayoutHeader />
      </Layout.Header>
      <Layout hasSider>
        <Layout.Sider className={classes.root_sider} theme="light">
          <LayoutSider />
        </Layout.Sider>
        <Layout.Content className={classes.root_content}>
          <LayoutContent />
        </Layout.Content>
      </Layout>
    </Layout>
  );
});

LayoutIndex.displayName = 'LayoutIndex';

export default LayoutIndex;
