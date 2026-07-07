import { vi } from 'vitest';

const webVitalObservers = vi.hoisted(() => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onINP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}));

vi.mock('web-vitals', () => webVitalObservers);

describe('performance monitor utilities', () => {
  it('rates web vitals against configured thresholds', async () => {
    const { performanceMonitor } = await import('./performance');

    expect(performanceMonitor.getRating('CLS', 0.1)).toBe('good');
    expect(performanceMonitor.getRating('CLS', 0.2)).toBe('needs-improvement');
    expect(performanceMonitor.getRating('CLS', 0.3)).toBe('poor');
    expect(performanceMonitor.getRating('CUSTOM', 100)).toBe('good');
  });

  it('formats web vital values', async () => {
    const { performanceMonitor } = await import('./performance');

    expect(performanceMonitor.formatMetric('CLS', 0.123456)).toBe('0.1235');
    expect(performanceMonitor.formatMetric('FCP', 1234.56)).toBe('1235ms');
    expect(performanceMonitor.formatMetric('LCP', 1234.56)).toBe('1235ms');
    expect(performanceMonitor.formatMetric('INP', 1234.56)).toBe('1235ms');
    expect(performanceMonitor.formatMetric('TTFB', 1234.56)).toBe('1235ms');
    expect(performanceMonitor.formatMetric('CUSTOM', 42)).toBe('42');
  });

  it('registers every web-vitals observer when supported', async () => {
    const { performanceMonitor } = await import('./performance');
    const observe = vi.fn();

    vi.stubGlobal('PerformanceObserver', class {
      observe = observe;
    });

    performanceMonitor.init();

    expect(webVitalObservers.onCLS).toHaveBeenCalledTimes(1);
    expect(webVitalObservers.onFCP).toHaveBeenCalledTimes(1);
    expect(webVitalObservers.onINP).toHaveBeenCalledTimes(1);
    expect(webVitalObservers.onLCP).toHaveBeenCalledTimes(1);
    expect(webVitalObservers.onTTFB).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith({ entryTypes: ['navigation'] });
    expect(observe).toHaveBeenCalledWith({ entryTypes: ['resource'] });
  });

  it('skips web-vitals setup when PerformanceObserver is unavailable', async () => {
    const { performanceMonitor } = await import('./performance');

    vi.unstubAllGlobals();
    Reflect.deleteProperty(window, 'PerformanceObserver');
    webVitalObservers.onCLS.mockClear();

    performanceMonitor.init();

    expect(webVitalObservers.onCLS).not.toHaveBeenCalled();
  });

  it('reads page navigation timing data', async () => {
    const { performanceMonitor } = await import('./performance');

    vi.spyOn(window.performance, 'getEntriesByType').mockReturnValue([{
      connectEnd: 30,
      connectStart: 10,
      domComplete: 120,
      domContentLoadedEventEnd: 100,
      domInteractive: 80,
      domainLookupEnd: 10,
      domainLookupStart: 2,
      loadEventStart: 140,
      requestStart: 30,
      responseEnd: 60,
      responseStart: 50,
      startTime: 0,
    } as PerformanceNavigationTiming]);

    expect(performanceMonitor.getPageData()).toEqual({
      dns: 8,
      tcp: 20,
      request: 30,
      domParse: 40,
      resource: 40,
      firstPaint: 50,
      firstContentfulPaint: 100,
    });
  });

  it('returns null when navigation timing is unavailable', async () => {
    const { performanceMonitor } = await import('./performance');

    vi.spyOn(window.performance, 'getEntriesByType').mockReturnValue([]);

    expect(performanceMonitor.getPageData()).toBeNull();
  });

  it('observes long tasks when the browser supports them', async () => {
    const { performanceMonitor } = await import('./performance');
    const observe = vi.fn();

    vi.stubGlobal('PerformanceObserver', class {
      observe = observe;
    });

    performanceMonitor.observeLongTasks();

    expect(observe).toHaveBeenCalledWith({ entryTypes: ['longtask'] });
  });

  it('ignores unsupported long task observers', async () => {
    const { performanceMonitor } = await import('./performance');

    vi.stubGlobal('PerformanceObserver', class {
      constructor() {
        throw new Error('unsupported');
      }
    });

    expect(() => performanceMonitor.observeLongTasks()).not.toThrow();
  });
});
