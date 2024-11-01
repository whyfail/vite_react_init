import React, { Suspense } from 'react';
import { Inspector } from 'react-dev-inspector';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import 'animate.css';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import 'virtual:uno.css';
import App from './App.jsx';
import './assets/css/index.less';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Loading from './components/Loading.jsx';
import RecoilDebugLog from './components/RecoilDebugLog.jsx';
import './plugins/plugin-jss.js';

const isDev = import.meta.env.MODE === 'development';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RecoilRoot>
      {isDev && <RecoilDebugLog />}
      <RecoilNexus />

      <HashRouter>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </HashRouter>
    </RecoilRoot>
    {isDev && (
      <Inspector
        keys={['control', 'y']}
        onClickElement={({ codeInfo }) => {
          if (!codeInfo?.absolutePath) return;

          const { absolutePath, lineNumber, columnNumber } = codeInfo;

          // you can change the url protocol if you are using in Web IDE
          window.open(`vscode://file/${absolutePath}:${lineNumber}:${columnNumber}`);
        }}
      />
    )}
  </>,
);
