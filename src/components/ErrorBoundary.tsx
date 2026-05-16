import type { ErrorInfo, ReactNode } from 'react';
// ErrorBoundary.js
import { Component } from 'react';
import CommonError from './CommonError';

interface ErrorBoundaryProps {
  children?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: string | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    // 更新状态以便下一个渲染可以显示降级UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 你也可以将错误日志记录到错误报告服务
    console.error(error, errorInfo);
    this.setState({ error: error.toString() });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="relative h-full w-full">
          {/* !开发环境下显示错误信息 */}
          {import.meta.env.MODE === 'development' && (
            <div className="absolute left-20% top-12% z-9 text-red font-bold">{this.state.error}</div>
          )}
          <CommonError />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
