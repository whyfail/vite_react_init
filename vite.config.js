import process from 'node:process';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import tailwindcss from '@tailwindcss/vite';
import { DevTools } from '@vitejs/devtools';
import { DevToolsSelfInspect } from '@vitejs/devtools-self-inspect';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import million from 'million/compiler';
import Printer from 'unplugin-printer/vite';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import vitePluginNoBug from 'vite-plugin-no-bug';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: './',
  plugins: [
    process.env.VITE_ENABLE_DEVTOOLS === 'true' && DevTools(),
    process.env.VITE_ENABLE_DEVTOOLS === 'true' && DevToolsSelfInspect(),
    process.env.VITE_ENABLE_MILLION === 'true' && million.vite({
      auto: {
        threshold: 0.05,
      },
    }),
    process.env.VITE_ENABLE_CODE_INSPECTOR === 'true' && codeInspectorPlugin({
      bundler: 'vite',
    }),
    react({
      babel: process.env.VITE_ENABLE_REACT_COMPILER === 'true'
        ? {
            plugins: ['babel-plugin-react-compiler'],
          }
        : undefined,
    }),
    process.env.VITE_ENABLE_COMPRESSION === 'true' && compression({
      algorithms: ['gzip', 'brotliCompress'], // 压缩算法 nginx需增相应配置
    },
    ),
    process.env.VITE_ENABLE_LEGACY === 'true' && legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    tailwindcss(),
    process.env.VITE_ENABLE_NO_BUG === 'true' && vitePluginNoBug(),
    Printer({
      info: [
        ({ lightCyan, green, bold }) => {
          return `  ${green('➜')}  ${bold('官网')}:  ${lightCyan('https://whyfail.github.io/cwa-docs')}`;
        },
      ],
    }),
    process.env.VITE_ENABLE_WEB_UPDATE_NOTICE === 'true' && webUpdateNotice({
      notificationProps: {
        title: '系统升级通知',
        description: '检测到当前系统版本已更新，请刷新页面后使用',
        buttonText: '刷新',
        dismissButtonText: '忽略',
      },
    }),
  ].filter(Boolean),
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          grid: true,
          overrideBrowserslist: ['> 1%'],
        }),
      ].filter(Boolean),
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: true,
    open: true,
    proxy: {
      // 代理
      '/PROXY': {
        target: 'http://xxxx',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/PROXY/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    reportCompressedSize: true,
  },
}));
