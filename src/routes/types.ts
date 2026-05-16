import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';

export interface RouteMeta {
  title?: string
  needLogin?: boolean
}

export interface AppRouteObject extends Omit<RouteObject, 'children' | 'element'> {
  element?: ReactNode
  redirect?: string
  meta?: RouteMeta
  children?: AppRouteObject[]
}
