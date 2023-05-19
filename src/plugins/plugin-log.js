/**
 * mobx日志打印插件
 */
import { spy } from 'mobx';

(function () {
  if (import.meta.env.MODE !== 'development') return;
  spy((e) => {
    if (e.type === 'update') {
      console.debug(
        `%c${new Date().toLocaleString()}：${e.debugObjectName} 中的 ${e.name}状态改变：`,
        'background-color: #00BCD4; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; font-weight: 600;',
      );
      console.debug(`   `, e);
    }

    if (e.type === 'action') {
      console.debug(
        `%c${new Date().toLocaleString()}： ${e.name} 方法调用：`,
        'background-color: #2196f3; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; font-weight: 600;',
      );
      console.debug(`   `, e);
    }
  });
})();
