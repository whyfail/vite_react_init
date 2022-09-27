import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.less';
import App from './App';
import './assets/css/normalize.less';
import { Inspector } from 'react-dev-inspector';

const isDev = process.env.NODE_ENV === 'development';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
