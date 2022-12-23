import React, { useEffect, useState } from 'react';
import Index from './components';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { setHtmlRem } from './common/common-set-rem';

dayjs.locale('zh-cn');

const App = () => {
  const [antdThemeUnit, setAntdThemeUnit] = useState({
    fontSize: 14,
    controlHeight: 32,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontSizeXL: 20,
    sizeLG: 24,
    sizeMD: 20,
    sizeMS: 16,
    sizeSM: 12,
    sizeXL: 32,
    sizeXS: 8,
    sizeXXL: 48,
    sizeXXS: 4,
    controlInteractiveSize: 16,
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    fontSizeIcon: 12,
    margin: 16,
    marginLG: 24,
    marginMD: 20,
    marginSM: 12,
    marginXL: 32,
    marginXS: 8,
    marginXXL: 48,
    marginXXS: 4,
    padding: 16,
    paddingContentHorizontal: 16,
    paddingContentHorizontalLG: 24,
    paddingContentHorizontalSM: 16,
    paddingContentVertical: 12,
    paddingContentVerticalLG: 16,
    paddingContentVerticalSM: 8,
    paddingLG: 24,
    paddingMD: 20,
    paddingSM: 12,
    paddingXL: 32,
    paddingXS: 8,
    paddingXXS: 4,
    screenLG: 992,
    screenLGMax: 1199,
    screenLGMin: 992,
    screenMD: 768,
    screenMDMax: 991,
    screenMDMin: 768,
    screenSM: 576,
    screenSMMax: 767,
    screenSMMin: 576,
    screenXL: 1200,
    screenXLMax: 1599,
    screenXLMin: 1200,
    screenXS: 480,
    screenXSMax: 575,
    screenXSMin: 480,
    screenXXL: 1600,
    screenXXLMin: 1600,
  });

  // 自适应修改antd样式单位
  const changeAntdThemeUnit = () => {
    let vW = window.innerWidth; // 当前窗口的宽度
    let vH = window.innerHeight; // 当前窗口的高度
    const allStyleVal = {};

    for (const key in antdThemeUnit) {
      let basePc = antdThemeUnit[key] / 1920; // 表示1920的设计图,使用16PX的默认值
      // 非正常屏幕下的尺寸换算
      let dueH = (vW * 1080) / 1920;

      // 最小适配分辨率
      if (vW < 1660 || vH < 900) {
        let rem = 1660 * basePc; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值

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

  // 改变窗口大小时重新设置单位大小
  useEffect(() => {
    changeAntdThemeUnit();
    setHtmlRem();

    window.onresize = function () {
      changeAntdThemeUnit();
      setHtmlRem();
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
      <Index />
    </ConfigProvider>
  );
};

export default App;
