import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import postCssPxToRem from 'postcss-pxtorem';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import Printer from 'unplugin-printer/vite';
import TurboConsole from 'unplugin-turbo-console/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import vitePluginNoBug from 'vite-plugin-no-bug';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    visualizer({ gzipSize: true }),
    viteCompression({
      algorithm: 'gzip',
      verbose: false,
      filter: /\.(js)$/,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    UnoCSS({
      configFile: './unocss.config.js',
    }),
    vitePluginNoBug(),
    TurboConsole({
      prefix: '___________打印 ↓_____________',
      suffix: '___________打印 ↑_____________',
    }),
    Printer({
      info: [
        ({ lightCyan, green, bold }) => {
          return `  ${green('➜')}  ${bold('官网')}:  ${lightCyan('https://whyfail.gitee.io/cwa-document/')}`;
        },
      ],
    }),
    webUpdateNotice({
      notificationProps: {
        title: '系统升级通知',
        description: '检测到当前系统版本已更新，请刷新页面后使用',
        buttonText: '刷新',
        dismissButtonText: '忽略',
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ['#root'],
        }),
        autoprefixer({
          grid: true,
          overrideBrowserslist: ['> 1%'],
        }),
      ],
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
        rewrite: (path) => path.replace(/^\/PROXY/, ''),
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'], // 删除 所有的console 和 debugger
  },
  build: {
    chunkSizeWarningLimit: 1500,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 1000,
        manualChunks: {
          react: ['react', 'react-router-dom'],
          lodashEs: ['lodash-es'],
          antd: ['antd'],
          ahooks: ['ahooks'],
          reactJss: ['react-jss'],
          recoil: ['recoil'],
        },
      },
    },
  },
});
