/**
 * 日志打印插件
 */
import { spy } from 'mobx';

(function () {
  if (import.meta.env.MODE !== 'development') return;
  spy((e) => {
    if (e.type === 'update') {
      console.debug(`${new Date().toLocaleString()} %c${e.debugObjectName} 中的 ${e.name}状态改变：`, 'color: red');
      console.debug(` `, e);
    }

    if (e.type === 'action') {
      console.debug(`${new Date().toLocaleString()} %c${e.name} 方法调用：`, 'color: red');
      console.debug(` `, e);
    }
  });
})();
