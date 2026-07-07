import type { AppRouteObject } from './types';
import { isValidElement } from 'react';
import { transformRoutes } from './routeUtils';

describe('route utilities', () => {
  it('wraps route elements and recursively transforms children', () => {
    const routes: AppRouteObject[] = [
      {
        path: '/',
        element: <div>Home</div>,
        meta: { needLogin: false },
        children: [
          {
            path: 'docs',
            element: <div>Docs</div>,
            meta: { needLogin: true },
          },
        ],
      },
    ];

    const [route] = transformRoutes(routes);

    expect(isValidElement(route.element)).toBe(true);
    expect(isValidElement(route.children?.[0].element)).toBe(true);
    expect('meta' in route).toBe(false);
  });

  it('turns redirect routes into Navigate elements', () => {
    const [route] = transformRoutes([{ path: '/', redirect: '/docs' }]);

    expect(isValidElement(route.element)).toBe(true);
    expect('redirect' in route).toBe(false);
  });
});
