/**
 * react-jss px转rem插件
 */
import { jss } from 'react-jss';
import { BASE_FONT_SIZE } from './common-const';

const pxToRem = (value, defaultValue) => {
  const parsedValue = parseInt(value, 10);

  if (Number.isNaN(parsedValue)) {
    return defaultValue || value;
  }

  return `${parsedValue / BASE_FONT_SIZE}rem`;
};

const pxToRemPlugin = {
  onProcessStyle: (style, rule) => {
    if (!rule || !rule.options) {
      return style;
    }

    const processedStyle = {};

    for (const property in style) {
      const value = style[property];

      if (typeof value === 'string' && value.includes('px')) {
        processedStyle[property] = value.replace(/(\d+)px/g, (match, p1) => {
          return pxToRem(p1, match);
        });
      } else {
        processedStyle[property] = value;
      }
    }

    return processedStyle;
  },
};

jss.use(pxToRemPlugin);
