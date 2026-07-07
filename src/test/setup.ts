import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest';
import { server } from './server';
import '@testing-library/jest-dom/vitest';

expect.extend(toHaveNoViolations);

vi.mock('ogl', () => {
  class Renderer {
    gl = {
      canvas: document.createElement('canvas'),
      drawingBufferWidth: 1,
      drawingBufferHeight: 1,
      DEPTH_TEST: 0x0B71,
      CULL_FACE: 0x0B44,
      BLEND: 0x0BE2,
      disable: vi.fn(),
      enable: vi.fn(),
    };

    setSize = vi.fn();
    render = vi.fn();
  }

  class Program {
    uniforms: Record<string, { value: unknown }>;

    constructor(_gl: unknown, options: { uniforms?: Record<string, { value: unknown }> }) {
      this.uniforms = options.uniforms ?? {};
    }
  }

  class Mesh {
    constructor(_gl: unknown, _options: unknown) {}
  }

  class Triangle {
    constructor(_gl: unknown) {}
  }

  return { Mesh, Program, Renderer, Triangle };
});

class ResizeObserverMock implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock,
});

HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  canvas: document.createElement('canvas'),
  clearColor: vi.fn(),
  clear: vi.fn(),
  createBuffer: vi.fn(),
  bindBuffer: vi.fn(),
  bufferData: vi.fn(),
  createProgram: vi.fn(() => ({})),
  createShader: vi.fn(() => ({})),
  shaderSource: vi.fn(),
  compileShader: vi.fn(),
  getShaderParameter: vi.fn(() => true),
  getShaderInfoLog: vi.fn(() => ''),
  attachShader: vi.fn(),
  linkProgram: vi.fn(),
  getProgramParameter: vi.fn(() => true),
  getProgramInfoLog: vi.fn(() => ''),
  useProgram: vi.fn(),
  getUniformLocation: vi.fn(() => ({})),
  uniform1f: vi.fn(),
  uniform1i: vi.fn(),
  uniform2fv: vi.fn(),
  uniformMatrix3fv: vi.fn(),
  getAttribLocation: vi.fn(() => 0),
  enableVertexAttribArray: vi.fn(),
  vertexAttribPointer: vi.fn(),
  viewport: vi.fn(),
  drawArrays: vi.fn(),
  disable: vi.fn(),
  enable: vi.fn(),
  blendFunc: vi.fn(),
  getExtension: vi.fn(),
  drawingBufferWidth: 1,
  drawingBufferHeight: 1,
  DEPTH_TEST: 0x0B71,
  CULL_FACE: 0x0B44,
  BLEND: 0x0BE2,
  ARRAY_BUFFER: 0x8892,
  STATIC_DRAW: 0x88E4,
  TRIANGLES: 0x0004,
  FLOAT: 0x1406,
  VERTEX_SHADER: 0x8B31,
  FRAGMENT_SHADER: 0x8B30,
  COMPILE_STATUS: 0x8B81,
  LINK_STATUS: 0x8B82,
})) as unknown as HTMLCanvasElement['getContext'];

vi.stubGlobal('requestAnimationFrame', vi.fn(() => 0));
vi.stubGlobal('cancelAnimationFrame', vi.fn());

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
  vi.clearAllMocks();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
