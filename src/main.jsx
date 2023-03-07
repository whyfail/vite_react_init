import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import './store/plugin-log';
import './assets/css/normalize.less';
import { Inspector } from 'react-dev-inspector';
import './common/common-jss-plugin';

const isDev = process.env.NODE_ENV === 'development';

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
