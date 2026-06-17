import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app/App';
import ErrorBoundary from './shared/components/ErrorBoundary';
import Loading from './shared/components/Loading';
import { performanceMonitor } from './utils/performance';
import './app/styles/index.css';
import 'animate.css';

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
