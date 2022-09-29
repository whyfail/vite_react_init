import { makeAutoObservable } from 'mobx';

class storeOther {
  number = 0;

  // 响应式
  constructor() {
    makeAutoObservable(this);
  }

  // 增加
  addNumber = () => {
    this.number += 1;
  };

  // 减少
  subtractNumber = () => {
    this.number -= 1;
  };
}

const otherMobx = new storeOther();

// 导出实力
export default otherMobx;
