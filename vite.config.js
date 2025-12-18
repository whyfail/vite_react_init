import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import million from 'million/compiler';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import Printer from 'unplugin-printer/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import vitePluginNoBug from 'vite-plugin-no-bug';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      million.vite({
        auto: {
          threshold: 0.05,
        },
      }),
      codeInspectorPlugin({
        bundler: 'vite',
      }),
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
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
      Printer({
        info: [
          ({ lightCyan, green, bold }) => {
            return `  ${green('➜')}  ${bold('官网')}:  ${lightCyan('https://whyfail.github.io/cwa-docs')}`;
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
        output: {
          advancedChunks: {
            groups: [
              { name: 'react', test: /node_modules\/react(?:-dom)?/ },
              { name: 'reactRouter', test: /node_modules\/react-router/ },
              { name: 'lodashEs', test: /node_modules\/lodash-es/ },
              { name: 'antd', test: /node_modules\/antd/ },
              { name: 'ahooks', test: /node_modules\/ahooks/ },
              { name: 'antdStyle', test: /node_modules\/antd-style/ },
              { name: 'zustand', test: /node_modules\/zustand/ },
            ],
          },
          minify: {
            compress: {
              dropConsole: true,
              dropDebugger: true,
            },
          },
        },
      },
    },
  };
});
