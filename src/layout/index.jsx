import { Layout } from 'antd';
import { memo } from 'react';
import useStoreSystem from '@/stores/storeSystem.js';
import LayoutContent from './LayoutContent.jsx';
import LayoutHeader from './LayoutHeader.jsx';
import LayoutSider from './LayoutSider.jsx';

const LayoutIndex = memo(() => {
  const systemMenuFull = useStoreSystem(state => state.systemMenuFull);

  return (
    <Layout className="h-full">
      <Layout.Header className="z-99 bg-#ffffff px-20px py-0px shadow-[1px_1px_3px_#cbced1,-1px_-1px_3px_white]">
        <LayoutHeader />
      </Layout.Header>
      <Layout hasSider>
        <Layout.Sider theme="light" collapsed={!systemMenuFull}>
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
