import type { ReactElement } from 'react';
import { App as AntdApp, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import dayjs from 'dayjs';
import { useRoutes } from 'react-router-dom';
import routes from './routes/index';
import { transformRoutes } from './routes/routeUtils';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

function App(): ReactElement {
  const pages = useRoutes(transformRoutes(routes));

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: {},
        token: {
          // colorPrimary: '#00b96b',
        },
      }}
    >
      <AntdApp message={{ maxCount: 1 }} style={{ width: '100%', height: '100%' }}>
        {pages}
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
