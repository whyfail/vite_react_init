import { atom } from 'recoil';

const userNumber = atom({
  key: 'userNumber', // 唯一ID（相对于其他原子/选择器）
  default: 0, // 默认值（又名初始值）
});

const userInfo = atom({
  key: 'userInfo',
  default: {
    name: '小磊同学',
    age: 18,
  },
});

export { userInfo, userNumber };
