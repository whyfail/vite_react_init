import React, { Suspense } from 'react';
import { Inspector } from 'react-dev-inspector';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import 'virtual:uno.css';
import App from './App';
import './assets/css/index.less';
import Loading from './components/Loading';
import RecoilDebugLog from './components/RecoilDebugLog';
import './plugins/plugin-jss';

const isDev = import.meta.env.MODE === 'development';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RecoilRoot>
      {isDev && <RecoilDebugLog />}
      <RecoilNexus />

      <HashRouter>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </HashRouter>
    </RecoilRoot>
    {isDev && (
      <Inspector
        keys={['control', 'y']}
        disableLaunchEditor={true}
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
