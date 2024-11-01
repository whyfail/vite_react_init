/**
 * 公共方法
 */
import { getRecoil, setRecoil } from 'recoil-nexus';
import { userNumber } from '@/stores/store-user.js';

// !示范用例，可删除
export const nonComponentsChangeRecoil = () => {
  setRecoil(userNumber, getRecoil(userNumber) + 1);
};
