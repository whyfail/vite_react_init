import { makeAutoObservable } from 'mobx';

class storeOther {
  // 监听的dom
  DOM = null;

  // 响应式
  constructor() {
    makeAutoObservable(this);
  }

  // dom赋值
  setDom = (val) => {
    this.DOM = val;
  };

  // DOM恢复到顶部
  setDomScroll = () => {
    if (this.DOM) this.DOM.scrollTop = 0;
  };
}

// 导出实力
export default storeOther;
