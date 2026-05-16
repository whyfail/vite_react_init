import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import { performanceMonitor } from './utils/performance';
import 'antd/dist/reset.css';
import 'animate.css';
import 'virtual:uno.css';
import './assets/css/index.less';

// 初始化性能监控
performanceMonitor.init();

// 监控长任务（仅在开发环境）
if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_PERFORMANCE_MONITOR === 'true') {
  performanceMonitor.observeLongTasks();
}

// 引入react-grab（仅在开发环境）
if (import.meta.env.DEV) {
  import('react-grab');
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root not found');
}

ReactDOM.createRoot(root).render(
  <HashRouter>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </HashRouter>,
);
