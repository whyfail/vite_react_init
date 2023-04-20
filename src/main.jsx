import React from 'react';
import { Inspector } from 'react-dev-inspector';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import App from './App';
import './assets/css/normalize.less';
import './common/common-jss-plugin';
import './store/plugin-log';

const isDev = import.meta.env.MODE === 'development';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
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
