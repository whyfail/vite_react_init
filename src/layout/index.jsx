/**
 * 布局
 */
import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Layout } from 'antd';
import { useRecoilState } from 'recoil';
import { commonMenuFull } from '@/stores/store-common';
import LayoutContent from './LayoutContent';
import LayoutHeader from './LayoutHeader';
import LayoutSider from './LayoutSider';

const useStyle = createUseStyles({
  root: {
    height: '100%',
  },
  root_header: {
    background: '#ffffff',
    boxShadow: '1px 1px 3px #cbced1, -1px -1px 3px white',
    zIndex: 99,
    padding: '0 20px',
  },
});

const LayoutIndex = memo(() => {
  const classes = useStyle();
  const [commonMenuFullVal] = useRecoilState(commonMenuFull);

  return (
    <Layout className={classes.root}>
      <Layout.Header className={classes.root_header}>
        <LayoutHeader />
      </Layout.Header>
      <Layout hasSider>
        <Layout.Sider theme="light" collapsed={!commonMenuFullVal}>
          <LayoutSider />
        </Layout.Sider>
        <Layout.Content>
          <LayoutContent />
        </Layout.Content>
      </Layout>
    </Layout>
  );
});

LayoutIndex.displayName = 'LayoutIndex';

export default LayoutIndex;
