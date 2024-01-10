/**
 * 布局
 */
import React, { memo } from 'react';
import { Layout } from 'antd';
import { useRecoilState } from 'recoil';
import { commonMenuFull } from '@/stores/store-common';
import LayoutContent from './LayoutContent';
import LayoutHeader from './LayoutHeader';
import LayoutSider from './LayoutSider';

const LayoutIndex = memo(() => {
  const [commonMenuFullVal] = useRecoilState(commonMenuFull);

  return (
    <Layout className="h-full">
      <Layout.Header className="z-99 bg-#ffffff px-20px py-0px shadow-[1px_1px_3px_#cbced1,-1px_-1px_3px_white]">
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
