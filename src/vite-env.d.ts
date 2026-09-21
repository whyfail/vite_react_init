/// <reference types="vite/client" />

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module 'react-grab';

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_TARGET: string
  readonly VITE_ENABLE_MOCK?: string
  readonly VITE_ENABLE_DEVTOOLS?: string
  readonly VITE_ENABLE_CODE_INSPECTOR?: string
  readonly VITE_ENABLE_PERFORMANCE_MONITOR?: string
  readonly VITE_ENABLE_COMPRESSION?: string
  readonly VITE_ENABLE_LEGACY?: string
  readonly VITE_ENABLE_WEB_UPDATE_NOTICE?: string
  readonly VITE_ENABLE_MILLION?: string
  readonly VITE_ENABLE_REACT_COMPILER?: string
  readonly VITE_ENABLE_NO_BUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
