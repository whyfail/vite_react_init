/**
 *  改变窗口大小时重新设置 rem
 */
import { BASE_FONT_SIZE, BASE_MIN_VW_VH } from './common-const';

// 设置 rem 函数
export const setHtmlRem = () => {
  let basePc = BASE_FONT_SIZE / 1920; // 表示1920的设计图,使用16PX的默认值
  let vW = window.innerWidth; // 当前窗口的宽度
  let vH = window.innerHeight; // 当前窗口的高度
  // 非正常屏幕下的尺寸换算
  let dueH = (vW * 1080) / 1920;

  // 最小适配分辨率
  if (vW < BASE_MIN_VW_VH.VW || vH < BASE_MIN_VW_VH.VH) {
    document.querySelector('#root').style.minWidth = `${BASE_MIN_VW_VH.VW}px`;
    document.querySelector('#root').style.minHeight = `${BASE_MIN_VW_VH.VH}px`;

    let rem = BASE_MIN_VW_VH.VW * basePc; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值

    document.documentElement.style.fontSize = rem + 'px';

    return;
  }

  if (vH < dueH) {
    // 当前屏幕高度小于应有的屏幕高度，就需要根据当前屏幕高度重新计算屏幕宽度
    vW = (vH * 1920) / 1080;
  }

  let rem = vW * basePc; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值

  document.documentElement.style.fontSize = rem + 'px';
};
