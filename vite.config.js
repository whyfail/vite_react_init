import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import million from 'million/compiler';
import UnoCSS from 'unocss/vite';
import Printer from 'unplugin-printer/vite';
import { defineConfig } from 'vite';
import { analyzer, unstableRolldownAdapter } from 'vite-bundle-analyzer';
import { compression } from 'vite-plugin-compression2';
import vitePluginNoBug from 'vite-plugin-no-bug';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: './',
  plugins: [
    // Million.js 性能优化
    // threshold: 优化阈值，0.05 表示组件渲染时间超过 5% 时才优化
    // 小型项目: 0.1-0.2 | 中型项目: 0.05 | 大型项目: 0.01-0.03
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
    unstableRolldownAdapter(analyzer({
      openAnalyzer: false, // 避免每次构建自动打开
      analyzerMode: 'server', // 按需开启
    })),
    compression({
      algorithms: ['gzip', 'brotliCompress'], // 压缩算法 nginx需增相应配置
    },
    ),
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
        codeSplitting: {
          groups: [
            // React 核心库（react + react-dom 合并）
            { name: 'react-vendor', test: /node_modules\/react(?:-dom)?/ },
            // 路由库
            { name: 'react-router', test: /node_modules\/react-router/ },
            // Ant Design 主库（排除 style）
            { name: 'antd', test: /node_modules\/antd(?!-style)/ },
            // Ant Design 样式库和相关
            { name: 'antd-style', test: /node_modules\/(?:antd-style|@ant-design)/ },
            // Hooks 工具库
            { name: 'hooks', test: /node_modules\/ahooks/ },
            // 状态管理和工具库
            { name: 'utils', test: /node_modules\/(?:zustand|lodash-es|dayjs|axios)/ },
            // 动画库
            { name: 'animations', test: /node_modules\/animate\.css/ },
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
}));
