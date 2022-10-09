import React from 'react';
import Index from './components';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

moment.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Index />
    </ConfigProvider>
  );
};

export default App;
