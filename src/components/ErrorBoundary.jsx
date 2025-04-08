// ErrorBoundary.js
import { Component } from 'react';
import CommonError from './CommonError.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError() {
    // 更新状态以便下一个渲染可以显示降级UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你也可以将错误日志记录到错误报告服务
    console.error(error, errorInfo);
    this.setState({ error: error.toString() });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full relative">
          {/* !开发环境下显示错误信息 */}
          {import.meta.env.MODE === 'development' && (
            <div className="text-red font-bold left-20% top-12% absolute z-9">{this.state.error}</div>
          )}
          <CommonError />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
