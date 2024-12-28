/**
 * 公共方法
 */
import { userNumber } from '@/stores/store-user.js';
import { getRecoil, setRecoil } from 'recoil-nexus';

// !示范用例，可删除
export function nonComponentsChangeRecoil() {
  setRecoil(userNumber, getRecoil(userNumber) + 1);
}
