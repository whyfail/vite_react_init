import { atom } from 'recoil';

const commonMenuFull = atom({
  key: 'common-menu-full', // 唯一ID（相对于其他原子/选择器）
  default: true, // 默认值（又名初始值）
});

export { commonMenuFull };
