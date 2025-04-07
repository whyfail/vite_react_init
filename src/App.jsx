import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { useEventListener } from 'ahooks';
import { App as AntdApp, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { setHtmlRem } from './plugins/plugin-set-rem.js';
import routes, { transformRoutes } from './routes/index.jsx';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const isUseRem = import.meta.env.VITE_USE_REM === 'true';

function App() {
  const pages = useRoutes(transformRoutes(routes));
  const [px2rem, setPx2rem] = useState(
    px2remTransformer({
      rootValue: 16,
    }),
  );

  // 设置rem执行函数
  const handleSetRem = () => {
    setHtmlRem();
    setPx2rem(px2remTransformer({ rootValue: document.documentElement.style.fontSize.replace('px', '') }));
  };

  // 改变窗口大小时重新设置单位大小
  useEventListener('resize', () => isUseRem && handleSetRem());

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: true,
        token: {
          colorPrimary: '#00b96b',
          borderRadius: 4,
        },
      }}
    >
      <AntdApp message={{ maxCount: 1 }} style={{ width: '100%', height: '100%' }}>
        {isUseRem ? <StyleProvider transformers={[px2rem]}>{pages}</StyleProvider> : pages}
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
