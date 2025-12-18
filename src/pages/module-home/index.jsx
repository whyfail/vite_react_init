import autofit from 'autofit.js';
import { useEffect } from 'react';
import HomeCenter from './HomeCenter.jsx';

function Index() {
  useEffect(() => {
    // 适配(建议只给大屏开启)
    autofit.init({
      dh: 1080,
      dw: 1920,
      el: '#echarts',
      resize: true,
    });
  }, []);

  return (
    <div id="echarts" className="h-full w-full flex items-center justify-center">
      <HomeCenter />
    </div>
  );
}

export default Index;
