// uno.config.ts
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
import { defineConfig, presetAttributify, presetMini, presetWind3 } from 'unocss';

export default defineConfig({
  presets: [presetMini(), presetWind3(), presetAttributify()],
  transformers: [transformerAttributifyJsx()],
  rules: [
    // 省略样式规则
    [
      /^e-(\d+)$/,
      ([, number]) => {
        if (number === '1') {
          return {
            'overflow': 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
          };
        } else {
          return {
            'overflow': 'hidden',
            'text-overflow': 'ellipsis',
            'display': '-webkit-box',
            '-webkit-line-clamp': number,
            '-webkit-box-orient': 'vertical',
          };
        }
      },
    ],
  ],
});
