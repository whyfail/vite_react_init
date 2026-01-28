/**
 * 性能监控工具模块
 * 使用 Web Vitals 5.1.0 API 监控核心 Web 性能指标
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

// 性能指标评分阈值
const PerformanceRating = {
  good: 'good',
  needsImprovement: 'needs-improvement',
  poor: 'poor',
};

// Web Vitals 阈值配置
const VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 }, // 累积布局偏移
  FCP: { good: 1800, poor: 3000 }, // 首次内容绘制
  LCP: { good: 2500, poor: 4000 }, // 最大内容绘制
  // 注意：web-vitals 5.1.0 已移除 FID，使用 INP 替代
  INP: { good: 200, poor: 500 }, // 交互到下一次绘制（替代 FID）
  TTFB: { good: 800, poor: 1800 }, // 首字节时间
};

/**
 * 获取性能评分
 * @param {string} metricName - 指标名称
 * @param {number} value - 指标值
 * @returns {string} 评分等级
 */
function getRating(metricName, value) {
  const thresholds = VITALS_THRESHOLDS[metricName];

  if (!thresholds) return PerformanceRating.good;

  if (value <= thresholds.good) return PerformanceRating.good;
  if (value <= thresholds.poor) return PerformanceRating.needsImprovement;

  return PerformanceRating.poor;
}

/**
 * 格式化指标值
 * @param {string} metricName - 指标名称
 * @param {number} value - 指标值
 * @returns {string} 格式化后的值
 */
function formatMetric(metricName, value) {
  switch (metricName) {
    case 'CLS':
      return value.toFixed(4);

    case 'FCP':
      return `${value.toFixed(0)}ms`;

    case 'LCP':
      return `${value.toFixed(0)}ms`;

    case 'INP': // 替代 FID
      return `${value.toFixed(0)}ms`;

    case 'TTFB':
      return `${value.toFixed(0)}ms`;

    default:
      return value.toString();
  }
}

/**
 * 控制台输出性能指标
 * @param {object} metric - Web Vitals 指标对象
 */
function logMetric(metric) {
  const { name, value, rating } = metric;
  const formattedValue = formatMetric(name, value);

  // 根据评分设置不同的样式
  const styles = {
    'good': 'background-color: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px;',
    'needs-improvement': 'background-color: #FF9800; color: white; padding: 4px 8px; border-radius: 4px;',
    'poor': 'background-color: #F44336; color: white; padding: 4px 8px; border-radius: 4px;',
  };

  console.debug(
    `%c ${name} `,
    styles[rating],
    formattedValue,
    rating === PerformanceRating.good ? '✓' : rating === PerformanceRating.needsImprovement ? '⚠' : '✗',
  );
}

/**
 * 性能指标上报（可扩展为上报到监控系统）
 * @param {object} metric - Web Vitals 指标对象
 */
function reportMetric(metric) {
  const { name, value, rating, delta, id } = metric;

  // 控制台输出
  logMetric(metric);

  // 开发环境下输出详细信息
  if (import.meta.env.DEV) {
    console.debug(`%c性能指标详情 - ${name}`, 'color: #2196F3; font-weight: bold;', {
      value,
      rating,
      delta,
      id,
      timestamp: new Date().toISOString(),
    });
  }

  // TODO: 生产环境可集成上报到监控系统（如 Sentry、DataDog 等）
  // sendToAnalytics({
  //   name,
  //   value,
  //   rating,
  //   delta,
  //   id,
  //   url: window.location.href,
  //   userAgent: navigator.userAgent,
  // });
}

/**
 * 初始化 Web Vitals 监控（使用 web-vitals 5.1.0 新 API）
 */
export function initPerformanceMonitoring() {
  if (!('PerformanceObserver' in window)) {
    console.warn('当前浏览器不支持 PerformanceObserver，性能监控功能已禁用');

    return;
  }

  console.debug('🚀 性能监控已启动...');

  // web-vitals 5.1.0 新 API：
  // 所有 on* 函数都接受一个 options 对象作为第二个参数
  // options 可以包含：reportAllChanges（报告所有变化）、durationThreshold（持续时间阈值）等

  // 监控 CLS - 累积布局偏移
  // 使用新 API 的 options 对象
  onCLS(metric => reportMetric(metric), {
    reportAllChanges: true, // 报告所有布局偏移变化
  });

  // 注意：web-vitals 5.1.0 已移除 onFID，改用 INP 作为交互性能指标
  // FID（首次输入延迟）已被 INP（交互到下一次绘制）取代，因为 INP 更能反映整体交互体验

  // 监控 LCP - 最大内容绘制
  onLCP(metric => reportMetric(metric), {
    reportAllChanges: true, // 报告所有 LCP 变化
  });

  // 监控 TTFB - 首字节时间
  onTTFB(metric => reportMetric(metric), {
    reportAllChanges: true, // 报告所有 TTFB 变化
  });

  // 监控 INP - 交互到下一次绘制（替代 FID，更准确的交互性能指标）
  // durationThreshold 默认为 40ms，可以自定义
  onINP(metric => reportMetric(metric), {
    reportAllChanges: true, // 报告所有 INP 变化
    // durationThreshold: 40, // 可选：设置交互持续时间阈值
  });

  // 监控 FCP - 首次内容绘制
  onFCP(metric => reportMetric(metric), {
    reportAllChanges: true, // 报告所有 FCP 变化
  });

  // 监控自定义性能指标
  observeCustomMetrics();
}

/**
 * 监控自定义性能指标
 */
function observeCustomMetrics() {
  // 监控 DOM 加载时间
  const domLoadObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();

    entries.forEach((entry) => {
      console.debug(
        '%c DOMContentLoaded ',
        'background-color: #00BCD4; color: white; padding: 4px 8px; border-radius: 4px;',
        `${entry.duration.toFixed(0)}ms`,
      );
    });
  });

  domLoadObserver.observe({ entryTypes: ['navigation'] });

  // 监控资源加载时间
  const resourceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const slowResources = entries.filter(entry => entry.duration > 1000);

    if (slowResources.length > 0) {
      console.warn('%c 慢速资源加载警告 ', 'background-color: #FF9800; color: white; padding: 4px 8px; border-radius: 4px;');
      slowResources.forEach((entry) => {
        console.debug(`  ${entry.name}: ${entry.duration.toFixed(0)}ms`);
      });
    }
  });

  resourceObserver.observe({ entryTypes: ['resource'] });
}

/**
 * 获取页面加载性能数据
 * @returns {object} 性能数据对象
 */
export function getPagePerformanceData() {
  const perfData = window.performance.getEntriesByType('navigation')[0];

  if (!perfData) {
    return null;
  }

  return {
    // DNS 查询时间
    dns: perfData.domainLookupEnd - perfData.domainLookupStart,
    // TCP 连接时间
    tcp: perfData.connectEnd - perfData.connectStart,
    // 请求响应时间
    request: perfData.responseEnd - perfData.requestStart,
    // DOM 解析时间
    domParse: perfData.domComplete - perfData.domInteractive,
    // 资源加载时间
    resource: perfData.loadEventStart - perfData.domContentLoadedEventEnd,
    // 首次绘制时间
    firstPaint: perfData.responseStart - perfData.navigationStart,
    // 首次内容绘制时间
    firstContentfulPaint: perfData.domContentLoadedEventEnd - perfData.navigationStart,
  };
}

/**
 * 检测长任务（阻塞主线程的任务）
 */
export function observeLongTasks() {
  if (!('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      if (entries.length > 0) {
        console.warn('%c 检测到长任务 ', 'background-color: #F44336; color: white; padding: 4px 8px; border-radius: 4px;');
        entries.forEach((entry) => {
          console.debug(`  持续时间: ${entry.duration.toFixed(0)}ms`);
          console.debug(`  开始时间: ${entry.startTime.toFixed(0)}ms`);
        });
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (error) {
    console.debug('长任务监控不支持:', error);
  }
}

/**
 * 性能监控 API 导出
 */
export const performanceMonitor = {
  init: initPerformanceMonitoring,
  getPageData: getPagePerformanceData,
  observeLongTasks,
  getRating,
  formatMetric,
};

export default performanceMonitor;
