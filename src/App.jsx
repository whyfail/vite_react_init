import React from 'react';
import Index from './components';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

dayjs.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <Index />
    </ConfigProvider>
  );
};

export default App;
