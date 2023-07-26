import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ANTD_THEME_UNIT, BASE_MIN_VW_VH } from './common/common-const';
import { setHtmlRem } from './plugins/plugin-set-rem';
import routes, { transformRoutes } from './routes';
import { App as AntdApp } from 'antd';

dayjs.locale('zh-cn');

const App = () => {
  const [antdThemeUnit, setAntdThemeUnit] = useState({});
  const pages = useRoutes(transformRoutes(routes));

  // 自适应修改antd样式单位
  const changeAntdThemeUnit = () => {
    let vW = window.innerWidth; // 当前窗口的宽度
    let vH = window.innerHeight; // 当前窗口的高度
    const allStyleVal = {};

    for (const key in ANTD_THEME_UNIT) {
      let basePc = ANTD_THEME_UNIT[key] / 1920; // 表示1920的设计图,使用16PX的默认值
      // 非正常屏幕下的尺寸换算
      let dueH = (vW * 1080) / 1920;

      // 最小适配分辨率
      if (vW < BASE_MIN_VW_VH.VW || vH < BASE_MIN_VW_VH.VH) {
        let rem = BASE_MIN_VW_VH.VW * basePc; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值

        allStyleVal[key] = rem;
      } else {
        // 当前屏幕高度小于应有的屏幕高度，就需要根据当前屏幕高度重新计算屏幕宽度
        vH < dueH && (vW = (vH * 1920) / 1080);

        let rem = vW * basePc; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值

        allStyleVal[key] = rem;
      }
    }

    setAntdThemeUnit(allStyleVal);
  };

  // 设置rem执行函数
  const handleSetRem = () => {
    changeAntdThemeUnit();
    setHtmlRem();
  };

  // 改变窗口大小时重新设置单位大小
  useEffect(() => {
    handleSetRem();

    const resizeFun = window.addEventListener('resize', handleSetRem);

    return () => {
      window.removeEventListener('resize', resizeFun);
    };
  }, []);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#00b96b',
          borderRadius: 4,
          ...antdThemeUnit,
        },
      }}
    >
      <AntdApp message={{ maxCount: 1 }}>{pages}</AntdApp>
    </ConfigProvider>
  );
};

export default App;
