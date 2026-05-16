/// <reference types="vite/client" />

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module 'autofit.js' {
  interface AutofitOptions {
    dh?: number
    dw?: number
    el?: string
    resize?: boolean
  }

  const autofit: {
    init: (options?: AutofitOptions) => void
  };

  export default autofit;
}

declare module 'react-grab';
