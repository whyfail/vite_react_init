// 示例代码，请根据实际情况修改
import { useStoreUser } from '@/stores/index.js';

const setUserNumber = useStoreUser.getState().setUserNumber;

/**
 * 组件外修改局全局变量（示例）
 * @param {*} value
 */
export function nonComponentsChange(value) {
  setUserNumber(value);
}
