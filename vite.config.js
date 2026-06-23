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
import { defineConfig, loadEnv } from 'vite';
import { compression } from 'vite-plugin-compression2';
import vitePluginNoBug from 'vite-plugin-no-bug';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 显式加载 .env，避免依赖外部 shell 环境变量
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const on = key => env[key] === 'true';

  return {
    base: './',
    plugins: [
      on('VITE_ENABLE_DEVTOOLS') && DevTools(),
      on('VITE_ENABLE_DEVTOOLS') && DevToolsSelfInspect(),
      on('VITE_ENABLE_MILLION') && million.vite({
        auto: {
          threshold: 0.05,
        },
      }),
      on('VITE_ENABLE_CODE_INSPECTOR') && codeInspectorPlugin({
        bundler: 'vite',
      }),
      react({
        babel: on('VITE_ENABLE_REACT_COMPILER')
          ? {
              plugins: ['babel-plugin-react-compiler'],
            }
          : undefined,
      }),
      on('VITE_ENABLE_COMPRESSION') && compression({
        algorithms: ['gzip', 'brotliCompress'], // 压缩算法 nginx需增相应配置
      },
      ),
      on('VITE_ENABLE_LEGACY') && legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      tailwindcss(),
      on('VITE_ENABLE_NO_BUG') && vitePluginNoBug(),
      Printer({
        info: [
          ({ lightCyan, green, bold }) => {
            return `  ${green('➜')}  ${bold('官网')}:  ${lightCyan('https://whyfail.github.io/cwa-docs')}`;
          },
        ],
      }),
      on('VITE_ENABLE_WEB_UPDATE_NOTICE') && webUpdateNotice({
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
      rolldownOptions: {
        checks: {
          pluginTimings: false,
        },
      },
    },
  };
});
