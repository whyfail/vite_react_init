import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Loading from './components/Loading.jsx';
import { performanceMonitor } from './utils/performance.js';
import 'antd/dist/reset.css';
import 'animate.css';
import 'virtual:uno.css';
import './assets/css/index.less';

// 初始化性能监控
performanceMonitor.init();

// 监控长任务（仅在开发环境）
if (import.meta.env.DEV) {
  performanceMonitor.observeLongTasks();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </HashRouter>,
);
